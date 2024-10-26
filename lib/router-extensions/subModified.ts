import type { AppComponent, PrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import { ModifiedRouter } from './types';
import type { SingletonRouter } from 'next/router';

export const subModified = (info: PrivateRouteInfo, App: AppComponent, scroll: { x: number; y: number } | null, singletonRouter?: SingletonRouter) => {
  const pageRouter = singletonRouter?.router as ModifiedRouter | null;

  if (!pageRouter) {
    throw new Error('router singleton is undefined');
  }

  const infoRoute = info.route;
  if (!infoRoute || infoRoute === '/_error') {
    return pageRouter.subOrig(info, App, scroll);
  }

  const component = pageRouter.components[infoRoute];
  const isPageOptimisticallyLoaded = component.__N_SSG === false && component.__N_SSP === false;
  let withRerender = true;

  if (isPageOptimisticallyLoaded) {
    window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME = window.location.pathname;
  } else if (window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME === window.location.pathname) {
    withRerender = false;
  }
  if (!isPageOptimisticallyLoaded) {
    window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME = undefined;
  }

  if (withRerender) {
    return pageRouter.subOrig(info, App, scroll);
  }
  return Promise.resolve();
}