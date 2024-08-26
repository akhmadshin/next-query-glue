import { useCallback, useContext, useMemo } from 'react';
import { OptimisticRouterContext } from './OptimisticRouterProvider';
import { resolveDynamicRoute } from './router-utils/resolve-dynamic-route';
import type { GetRouteInfoProps, GetRouteInfoResponse, ModifiedRouter } from './router-extensions/types';
import { buildRoute } from './router-utils/build-route';
import type { NextRouter } from 'next/router';

export const usePageDataOptions = (router: NextRouter, withTrailingSlash: boolean) => {
  const { pathModifier, singletonRouter } = useContext(OptimisticRouterContext);

  const queryFn = useCallback(async (): Promise<object> => {
    const pageRouter = singletonRouter?.router as ModifiedRouter | null;
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

    const url = getResolvedUrl();

    delete pageRouter.components[componentPath];

    await router.push(url, asPath, { scroll: false }).catch((err) => {
      console.error('getQueryFn push err = ', err);
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
  }, [])

  const getResolvedUrl = () => {
    const query = router.asPath.split('#')[0].split('?')[1];

    let pathname = buildRoute(router.route, router.query as Record<string, string>, withTrailingSlash);

    if (query) {
      pathname = `${pathname}?${query}`
    }

    return pathModifier ? pathModifier(pathname) : pathname
  }

  const queryKey = useMemo(() => {
    const resolvedUrl = getResolvedUrl();
    return [resolvedUrl];
  }, [router, pathModifier])

  return {
    queryKey,
    queryFn,
  }
}