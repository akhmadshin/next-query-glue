import type { ModifiedRouter } from './router-extensions/types.ts';
import type { SingletonRouter } from 'next/router';

interface Props {
  singletonRouter: SingletonRouter,
}
export const prepareDirectNavigation = ({
  singletonRouter,
}: Props) => {
  const pageRouter = singletonRouter?.router as ModifiedRouter | null;
  if (!pageRouter || !pageRouter.getRouteInfoOnly) {
    return;
  }

  pageRouter.getRouteInfo = pageRouter.getRouteInfoOnly;
}