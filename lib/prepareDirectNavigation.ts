import { isLocalURL } from 'next/dist/shared/lib/router/utils/is-local-url';
import type { ModifiedRouter } from './router-extensions/types.ts';
import type { SingletonRouter } from 'next/router';
import type { Url } from 'next/dist/shared/lib/router/router';
import { formatWithValidation } from 'next/dist/shared/lib/router/utils/format-url';
import { buildRoute } from './router-utils/build-route';

interface Props {
  href: Url,
  singletonRouter: SingletonRouter,
}
export const prepareDirectNavigation = ({
  href,
  singletonRouter,
}: Props) => {
  const urlAsString = typeof href === 'string' ? href : formatWithValidation(href);
  const pathname = buildRoute(singletonRouter.route, singletonRouter.query as Record<string, string>);

  const isLocal = isLocalURL(urlAsString);
  if (!isLocal) {
    return;
  }

  if (urlAsString.startsWith('#') || urlAsString.startsWith(`${pathname}#`)) {
    return;
  }

  const pageRouter = singletonRouter?.router as ModifiedRouter | null;
  if (!pageRouter || !pageRouter.getRouteInfoOnly) {
    return;
  }

  pageRouter.getRouteInfo = pageRouter.getRouteInfoOnly;
}