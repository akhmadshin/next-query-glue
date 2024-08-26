import type { Router } from 'next/dist/client/router';
import type { AppComponent, PrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import type { ParsedUrlQuery } from 'querystring';
import type { SingletonRouter } from 'next/router';

export interface GetRouteInfoProps {
  route: string
  pathname: string
  query: ParsedUrlQuery
  as: string
  resolvedAs: string
  hasMiddleware?: boolean
  routeProps: RouteProperties
  locale: string | undefined
  isPreview: boolean
  unstable_skipClientCache?: boolean
  isQueryUpdating?: boolean
  isMiddlewareRewrite?: boolean
  isNotFound?: boolean
}

type GetRouteInfoPropsWithRouter = GetRouteInfoProps & {
  singletonRouter?: SingletonRouter;
}
interface RouteProperties {
  shallow: boolean;
}

export type PathnameModifier = (pathname: string) => string;

export type GetRouteInfo<T extends GetRouteInfoProps = GetRouteInfoProps> = (props: T) => Promise<GetRouteInfoResponse>

export type GetRouteInfoResponse = {
  type: "redirect-external";
  destination: string;
} | {
  type: "redirect-internal";
  newAs: string;
  newUrl: string;
} | PrivateRouteInfo;

export type GetRouteInfoWithPathnameModifierProps = GetRouteInfoPropsWithRouter & { pathnameModifier: PathnameModifier };
export type GetRouteInfoWithOnLoadProps = GetRouteInfoPropsWithRouter & {
  onLoad: (res: GetRouteInfoResponse) => Promise<void>;
};

export type Subscription = (data: PrivateRouteInfo, App: AppComponent, resetScroll: {
  x: number;
  y: number;
} | null) => Promise<void>;

export type OnlyHashChange = (as: string) => boolean

export type ModifiedRouter = Router & {
  getRouteInfoOrig: GetRouteInfo
  getRouteInfoOnly: GetRouteInfo<GetRouteInfoWithPathnameModifierProps>
  getRouteInfoWithOnLoad: GetRouteInfo<GetRouteInfoWithOnLoadProps>
  onlyAHashChangeNever: OnlyHashChange
  onlyAHashChangeOrig: OnlyHashChange
  subOrig: Subscription
  subModified: Subscription
}