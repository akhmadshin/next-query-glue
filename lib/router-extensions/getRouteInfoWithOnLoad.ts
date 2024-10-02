import { GetRouteInfoWithOnLoadProps, ModifiedRouter } from './types';

export const getRouteInfoWithOnLoad = async ({ onLoad, singletonRouter, ...props}: GetRouteInfoWithOnLoadProps,
) => {
  const pageRouter = singletonRouter?.router as ModifiedRouter | null;

  if (!pageRouter) {
    throw new Error('router singleton is undefined');
  }

  return pageRouter.getRouteInfoOrig({
    ...props,
  }).then((res) => {
    if (onLoad) {
      onLoad(res).catch((err: { message: string }) => {
        if (
          err.message.startsWith('Invariant: attempted to hard navigate to the same URL') &&
          window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME === window.location.pathname
        ) {
          pageRouter.reload();
        }
        throw new Error(err as never as string);
      })
    }
    return res;
  }).catch((err) => {
    throw new Error(err);
  });
}