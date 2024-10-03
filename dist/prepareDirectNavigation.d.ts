import { SingletonRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';

interface Props {
    href: Url;
    singletonRouter: SingletonRouter;
    withTrailingSlash: boolean;
}
export declare const prepareDirectNavigation: ({ href, singletonRouter, withTrailingSlash, }: Props) => void;
export {};
