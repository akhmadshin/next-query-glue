import { NextRouter, SingletonRouter } from 'next/router';

export declare const getQueryFn: (router: NextRouter, singletonRouter: SingletonRouter, pathModifier?: (path: string) => string) => Promise<object>;
export declare const getQueryKey: (router: NextRouter, pathModifier?: (path: string) => string) => string;
