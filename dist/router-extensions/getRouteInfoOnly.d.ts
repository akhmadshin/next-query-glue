import { PrivateRouteInfo } from 'next/dist/shared/lib/router/router';
import { GetRouteInfoWithPathnameModifierProps } from './types';

export declare const getRouteInfoOnly: ({ singletonRouter, ...props }: GetRouteInfoWithPathnameModifierProps) => Promise<{
    type: "redirect-external";
    destination: string;
} | {
    type: "redirect-internal";
    newAs: string;
    newUrl: string;
} | PrivateRouteInfo>;
