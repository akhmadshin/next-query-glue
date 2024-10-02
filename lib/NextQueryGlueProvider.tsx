import { createContext, FC, PropsWithChildren } from 'react';
import { getRouteInfoOnly } from './router-extensions/getRouteInfoOnly';
import { getRouteInfoWithOnLoad } from './router-extensions/getRouteInfoWithOnLoad';
import {
  GetRouteInfo,
  GetRouteInfoProps, GetRouteInfoWithOnLoadProps, GetRouteInfoWithPathnameModifierProps,
  ModifiedRouter, OnlyHashChange, Subscription
} from './router-extensions/types';
import { subModified } from './router-extensions/subModified';
import { onlyAHashChangeNever } from './router-extensions/onlyAHashChangeNever';
import type { SingletonRouter } from 'next/router';
import type { AppComponent, PrivateRouteInfo } from 'next/dist/shared/lib/router/router';

interface Props {
  pathModifier?: (path: string) => string;
  singletonRouter?: SingletonRouter;
}

export const NextQueryGlueContext = createContext<Props>({ pathModifier: undefined, singletonRouter: undefined });

export const patchRouter = (pathnameModifier: (pathname: string) => string = (route) => route, singletonRouter?: SingletonRouter) => {
  if (typeof window === 'undefined') {
    return;
  }

  const pageRouter = singletonRouter?.router as ModifiedRouter | null;
  if (!pageRouter) {
    return;
  }

  if (!pageRouter.getRouteInfoOrig) {
    pageRouter.getRouteInfoOrig = pageRouter.getRouteInfo.bind(pageRouter) as GetRouteInfo;
  }

  if (!pageRouter.getRouteInfoOnly) {
    pageRouter.getRouteInfoOnly = ((props: GetRouteInfoProps) => getRouteInfoOnly({
      ...props,
      pathnameModifier,
      singletonRouter,
    })).bind(pageRouter) as GetRouteInfo<GetRouteInfoWithPathnameModifierProps>;
  }

  if (!pageRouter.getRouteInfoWithOnLoad) {
    pageRouter.getRouteInfoWithOnLoad = getRouteInfoWithOnLoad.bind(pageRouter) as GetRouteInfo<GetRouteInfoWithOnLoadProps>;
  }
  if (!pageRouter.subOrig && pageRouter.sub) {
    pageRouter.subOrig = pageRouter.sub.bind(pageRouter) as Subscription;
  }
  pageRouter.sub = ((info: PrivateRouteInfo, App: AppComponent, scroll: { x: number; y: number } | null) => subModified(info, App, scroll, singletonRouter)).bind(pageRouter) as Subscription;

  if (!pageRouter.onlyAHashChangeOrig) {
    pageRouter.onlyAHashChangeOrig = pageRouter.onlyAHashChange.bind(pageRouter) as OnlyHashChange;
  }
  if (!pageRouter.onlyAHashChangeNever) {
    pageRouter.onlyAHashChangeNever = onlyAHashChangeNever.bind(pageRouter) as OnlyHashChange;
  }
}

export const NextQueryGlueProvider: FC<PropsWithChildren<Props>> = ({ pathModifier, singletonRouter, children }) => {
  patchRouter(pathModifier, singletonRouter);

  return (
    <NextQueryGlueContext.Provider value={{ pathModifier, singletonRouter }}>
      {children}
    </NextQueryGlueContext.Provider>
  )
}

