import type { PrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import type { GetRouteInfoWithPathnameModifierProps, ModifiedRouter } from './types';

export const getRouteInfoOnly = async ({ singletonRouter, ...props}: GetRouteInfoWithPathnameModifierProps): Promise<{
  type: "redirect-external";
  destination: string;
} | {
  type: "redirect-internal";
  newAs: string;
  newUrl: string;
} | PrivateRouteInfo> => {
  const pageRouter = singletonRouter?.router as ModifiedRouter | null;

  if (!pageRouter) {
    throw new Error('router singleton is undefined');
  }

  pageRouter.getRouteInfo = pageRouter.getRouteInfoOrig;
  const {
    isQueryUpdating,
    isMiddlewareRewrite,
    ...restProps
  } = props;
  return pageRouter.getRouteInfoOrig({
    isQueryUpdating: true,
    isMiddlewareRewrite: false,
    ...restProps,
  }).then((res: any) => {
    res.__N_SSG = false;
    res.__N_SSP = false;
    return res;
  });
}