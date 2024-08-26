import { denormalizePagePath } from 'next/dist/shared/lib/page-path/denormalize-page-path';
import { removeTrailingSlash } from './remove-trailing-slash';
import { isDynamicRoute } from 'next/dist/shared/lib/router/utils';
import { ModifiedRouter } from '../router-extensions/types';
import { getRouteRegex } from './route-regex';
import type { SingletonRouter } from 'next/router';

export async function resolveDynamicRoute(pathname: string, singletonRouter?: SingletonRouter) {
  const pageRouter = singletonRouter?.router as ModifiedRouter | null;
  if (!pageRouter) {
    throw new Error('router singleton is undefined');
  }

  const pageLoader = pageRouter.pageLoader;
  const pages = await pageLoader.getPageList();

  const cleanPathname = removeTrailingSlash(denormalizePagePath(pathname))
  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname
  }

  // handle resolving href for dynamic routes
  if (!pages.includes(cleanPathname)) {
    pages.some((page) => {
      if (isDynamicRoute(page) && getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page
        return true
      }
    })
  }
  return removeTrailingSlash(pathname)
}