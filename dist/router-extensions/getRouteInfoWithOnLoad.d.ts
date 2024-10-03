import { GetRouteInfoWithOnLoadProps } from './types';

export declare const getRouteInfoWithOnLoad: ({ onLoad, singletonRouter, ...props }: GetRouteInfoWithOnLoadProps) => Promise<{
    type: "redirect-external";
    destination: string;
} | {
    type: "redirect-internal";
    newAs: string;
    newUrl: string;
} | import('next/dist/shared/lib/router/router').CompletePrivateRouteInfo | (Omit<import('next/dist/shared/lib/router/router').CompletePrivateRouteInfo, "styleSheets"> & {
    initial: true;
})>;
