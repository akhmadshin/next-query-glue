# next-query-glue with @tanstack/react-query

### 1) Wrap _app into NextQueryGlueProvider and add additional code

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import singletonRouter from 'next/dist/client/router';
import { prepareDirectNavigation, NextQueryGlueProvider } from 'next-query-glue';
import { DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout } from '@/components/Layout';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { createRouteLoader } from 'next/dist/client/route-loader';

// Prefetch js chunks of the routes
(() => {
  if (typeof window === 'undefined') {
    return;
  }
  const routeLoader = createRouteLoader('');
  routeLoader.prefetch('/').catch((e: string) => { throw new Error(e) });
  routeLoader.prefetch('/blog/[slug]').catch((e: string) => { throw new Error(e) });
})()


export default function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState}>) {
  const router = useRouter();

  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      }
    }
  }))

  useIsomorphicLayoutEffect(() => {
    // disable router prefetch completely
    router.prefetch = async () => Promise.resolve(undefined);

    // makes navigation through history faster
    router.beforePopState((state) => {
      prepareDirectNavigation({
        href: state.as,
        singletonRouter,
        withTrailingSlash: Boolean(process.env.__NEXT_TRAILING_SLASH),
      });
      return true;
    });
  }, [router])

  return (
    <NextQueryGlueProvider singletonRouter={singletonRouter}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState} options={{
          defaultOptions: {},
        }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HydrationBoundary>
      </QueryClientProvider>
    </NextQueryGlueProvider>
  );
}
```

### 2) Wrap getServerSideProps/getStaticProps functions

<details>
<summary>Wrapper for getServerSideProps</summary>

Create a file withSSRTanStackQuery.ts

```ts
import type { ParsedUrlQuery } from 'querystring';
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function removeTrailingSlash(route: string) {
  return route.replace(/\/$/, '') || '/'
}

const normalizeResolvedUrl = (resolvedUrl: string) => {
  const pathnameAndQuery = resolvedUrl.split('?') as [string, string];
  let pathname = removeTrailingSlash(pathnameAndQuery[0]);
  let query = pathnameAndQuery[1];


  if (process.env.__NEXT_TRAILING_SLASH && pathname !== '/') {
    pathname = `${pathname}/`
  }
  if (query) {
    const params = new URLSearchParams(query);
    params.forEach((value, key) => {
      if (key.startsWith('nxtP')) {
        params.delete(key);
      }
    });
    query = params.toString();
    if (query)
      return `${pathname}?${query}`
  }
  return pathname;
}

export const withSSRTanStackQuery = <T extends object, Q extends ParsedUrlQuery = ParsedUrlQuery>(getServerSideProps: GetServerSideProps<T, Q>) => async (
  props: GetServerSidePropsContext<Q>,
) => {
  const queryKey = normalizeResolvedUrl(props.resolvedUrl);
  let result: GetServerSidePropsResult<T> | undefined = undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      result = await getServerSideProps(props) as { props: T | Promise<T> };
      return result?.props;
    }
  })

  if (!result) {
    return;
  }

  if (!(result as { props: T | Promise<T> }).props) {
    return result;
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
```

Wrap getServersideProps functions like this
```ts
export const getServerSideProps = withSSRTanStackQuery<ArticleItemApi, { slug: string }>(async ({ params }) => {
  const { slug } = params ?? {};
  try {
    const article = await fetchArticle(slug);
    return {
      props: article,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
})
```
</details>


<details>
<summary>Wrapper for getStaticProps</summary>

Create a file withSSGTanStackQuery.ts

```ts
import { ParsedUrlQuery } from 'querystring';
import {
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsContext
} from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

function removeTrailingSlash(route: string) {
  return route.replace(/\/$/, '') || '/'
}

const normalizePathname = (resolvedUrl: string) => {
  const normalizedResolvedUrl = removeTrailingSlash(resolvedUrl);
  let pathname = normalizedResolvedUrl.split('?')[0];
  if (process.env.__NEXT_TRAILING_SLASH) {
    pathname = `${pathname}/`
  }
  return pathname;
}

export const withSSGTanStackQuery = <T extends object, Q extends ParsedUrlQuery = ParsedUrlQuery>(getPath: (context: Q) => string, getStaticProps: GetStaticProps<T, Q>) => async (
  props: GetStaticPropsContext<Q>,
) => {
  const queryKey = normalizePathname(getPath(props.params!));
  let result: GetServerSidePropsResult<T> | undefined = undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      result = await getStaticProps(props) as { props: T | Promise<T> };
      return result?.props;
    }
  })

  if (!result) {
    return;
  }

  if (!(result as { props: T | Promise<T> }).props) {
    return result;
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
```
And wrap getStaticProps functions like this

```ts
export const getStaticProps = withSSGTanStackQuery<ArticleItemApi, { slug: string }>(({ slug }) => `/blog/${slug}/`, async ({ params }) => {
  const { slug } = params ?? {};
  try {
    const article = await fetchArticle(slug)
    return {
      props: article,
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
})
```
You must pass getPath function. That callback gets params as an argument and must return path of the page. In example above we return `/blog/${slug}/`
```text
pages/
└── blog/
    └── [slug]/
        └── index.tsx
```

</details>

### 3) Create usePageData hook
```ts
import { DehydratedState, useQuery, useQueryClient } from '@tanstack/react-query';
import { getQueryFn, getQueryKey } from 'next-query-glue';
import { useRouter } from 'next/router';
import singletonRouter from 'next/dist/client/router';

export const usePageData = <T>() => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const placeholderData = typeof window === 'undefined' ? undefined : window.placeholderData;
  const queryKey = [getQueryKey(router, Boolean(process.env.__NEXT_TRAILING_SLASH))]

  const res =  useQuery<unknown, unknown, T>({
    queryKey,
    queryFn: async () => {
      const serverData = queryClient.getQueryData([...queryKey]);
      if (serverData && !res.isStale) {
        return serverData;
      }
      return getQueryFn(router, Boolean(process.env.__NEXT_TRAILING_SLASH), singletonRouter).then((props) => {
        const res = props as { dehydratedState: DehydratedState};
        return res?.dehydratedState ? res.dehydratedState.queries[0].state.data : props;
      })
    },
    placeholderData,
  });
  return res;
}
```
And use it to get data from getServerSideProps/getStaticProps functions

```ts
const { data: article, isLoading, isFetching, isStale} = usePageData<BlogItemPageProps>();
```

### 4) Create Link component

```tsx
import NextLink, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import { prepareDirectNavigation } from 'next-query-glue';
import singletonRouter from 'next/router';

type NextLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps>

type Props = NextLinkProps & {
  placeholderData?: object;
  isDirect?: boolean;
}
export const Link = React.forwardRef<HTMLAnchorElement, Props>(function LinkComponent(props, ref) {
  const {
    placeholderData,
    onClick,
    isDirect = true,
    href,
    children,
    ...restProps
  } = props;
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (isDirect) {
      prepareDirectNavigation({
        href,
        singletonRouter,
        withTrailingSlash: Boolean(process.env.__NEXT_TRAILING_SLASH),
      });
      window.placeholderData = placeholderData;
    }
  }

  return (
    <NextLink
      onClick={handleClick}
      href={href}
      prefetch={false}
      ref={ref}
      {...restProps}
    >{children}</NextLink>
  )
})
```

Use Link component like regular next/link component