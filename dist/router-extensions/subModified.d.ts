import { AppComponent, PrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import { SingletonRouter } from 'next/router';

export declare const subModified: (info: PrivateRouteInfo, App: AppComponent, scroll: {
    x: number;
    y: number;
} | null, singletonRouter?: SingletonRouter) => Promise<void>;
