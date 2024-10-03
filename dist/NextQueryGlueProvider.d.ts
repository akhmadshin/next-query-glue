import { FC, PropsWithChildren } from 'react';
import { SingletonRouter } from 'next/router';

interface Props {
    pathModifier?: (path: string) => string;
    singletonRouter?: SingletonRouter;
}
export declare const NextQueryGlueContext: import('react').Context<Props>;
export declare const patchRouter: (pathnameModifier?: (pathname: string) => string, singletonRouter?: SingletonRouter) => void;
export declare const NextQueryGlueProvider: FC<PropsWithChildren<Props>>;
export {};
