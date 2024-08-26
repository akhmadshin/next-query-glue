import { resolveDynamicRoute } from './router-utils/resolve-dynamic-route';
import { buildRoute } from './router-utils/build-route';
import type { NextRouter, SingletonRouter } from 'next/router';
import {
  GetRouteInfoProps,
  GetRouteInfoResponse,
  ModifiedRouter
} from './router-extensions/types';


export const getQueryFn = async (
  router: NextRouter,
  withTrailingSlash: boolean,
  singletonRouter?: SingletonRouter,
  pathModifier?: (path: string) => string,
): Promise<object> => {
  console.log('getQueryFn run = ');

  const pageRouter = singletonRouter?.router as ModifiedRouter;
  if (!pageRouter) {
    throw new Error('router singleton is undefined');
  }

    let pageProps: object | { notFound: true } | undefined = undefined;

    pageRouter.onlyAHashChange = pageRouter.onlyAHashChangeNever;
    pageRouter.getRouteInfo = async (props: GetRouteInfoProps) => pageRouter.getRouteInfoWithOnLoad({
      singletonRouter,
      ...props,
      onLoad: (res: GetRouteInfoResponse) => {
        if ('type' in res && res.type === 'redirect-internal') {
          pageRouter.getRouteInfo = pageRouter.getRouteInfoOrig;
          pageRouter.onlyAHashChange = pageRouter.onlyAHashChangeOrig;
          return Promise.resolve();
        }
        if ('props' in res) {
          if (res.props?.notFound) {
            pageProps = { notFound: true };
            return Promise.resolve();
          }
          if (res.props?.pageProps) {
            pageProps = res.props.pageProps as object;
          }
        }
        return Promise.resolve();
      },
    });

    const modifiedAsPath = pageRouter.asPath.split('#')[0].split('?')[0];
    const componentPath = await resolveDynamicRoute(pathModifier ? pathModifier(modifiedAsPath) : modifiedAsPath, singletonRouter);
    const asPath = pageRouter.asPath;
    const resolvedUrl = getResolvedUrl(router, withTrailingSlash, pathModifier);

  const routeData = pageRouter.components[componentPath];

  console.log('getQueryFn routeData old = ', pageRouter.components[componentPath]);
  if (routeData.__N_SSG === false && routeData.__N_SSP === false) {
    delete pageRouter.components[componentPath];
  }

  await router.push(resolvedUrl, asPath, { scroll: false }).catch((err) => {
    console.log('getQueryFn push error ', err);
  });

  if (routeData.__N_SSG === false && routeData.__N_SSP === false) {
    delete pageRouter.components[componentPath];
  }

  console.log('getQueryFn routeData new = ', pageRouter.components[componentPath]);

  pageRouter.getRouteInfo = pageRouter.getRouteInfoOrig;
  pageRouter.onlyAHashChange = pageRouter.onlyAHashChangeOrig;

  if (!pageProps) {
    return Promise.reject()
  }

  if ('notFound' in pageProps) {
    return Promise.reject();
  }
  return pageProps;
}

export const getQueryKey = (
  router: NextRouter,
  withTrailingSlash: boolean,
  pathModifier?: (path: string) => string,
) => {
  return getResolvedUrl(router, withTrailingSlash, pathModifier);
}

const getResolvedUrl = (
  router: NextRouter,
  withTrailingSlash: boolean,
  pathModifier?: (path: string) => string,
) => {
  const query = router.asPath.split('#')[0].split('?')[1];

  let pathname = buildRoute(router.route, router.query as Record<string, string>, withTrailingSlash);

  if (query) {
    pathname = `${pathname}?${query}`
  }

  return pathModifier ? pathModifier(pathname) : pathname
}