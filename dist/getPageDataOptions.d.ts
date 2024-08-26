import { NextRouter, SingletonRouter } from 'next/router';

export declare const getQueryFn: (router: NextRouter, withTrailingSlash: boolean, singletonRouter?: SingletonRouter, pathModifier?: (path: string) => string) => Promise<object>;
export declare const getQueryKey: (router: NextRouter, withTrailingSlash: boolean, pathModifier?: (path: string) => string) => string;
