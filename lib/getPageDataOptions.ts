import { buildRoute } from './router-utils/build-route';
import type { NextRouter, SingletonRouter } from 'next/router';
import {
  GetRouteInfoProps,
  GetRouteInfoResponse,
  ModifiedRouter
} from './router-extensions/types';


export const getQueryFn = async (
  router: NextRouter,
  singletonRouter: SingletonRouter,
  pathModifier?: (path: string) => string,
): Promise<object> => {
  const pageRouter = singletonRouter?.router as ModifiedRouter;
  if (!pageRouter) {
    throw new Error('router singleton is undefined');
  }

  let pageProps: object | { notFound: true } | undefined = undefined;

  pageRouter.onlyAHashChange = pageRouter.onlyAHashChangeNever;
  pageRouter.getRouteInfo = async (props: GetRouteInfoProps) => {
    return pageRouter.getRouteInfoWithOnLoad({
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
  }
  const asPath = pageRouter.asPath;
  const resolvedUrl = getResolvedUrl(router, pathModifier);

  await router.replace(resolvedUrl, asPath, { scroll: false }).catch((err) => {
    console.error(err);
    throw new Error(err);
  });

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
  pathModifier?: (path: string) => string,
) => {
  return getResolvedUrl(router, pathModifier);
}

const getResolvedUrl = (
  router: NextRouter,
  pathModifier?: (path: string) => string,
) => {
  let query = router.asPath.split('#')[0].split('?')[1];

  let pathname = buildRoute(router.route, router.query as Record<string, string>);

  if (query) {
    const params = new URLSearchParams(query);
    query = params.toString();
    pathname = `${pathname}?${query}`
  }

  return pathModifier ? pathModifier(pathname) : pathname
}