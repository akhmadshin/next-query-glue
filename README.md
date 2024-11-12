# next-query-glue

> Use that compact 1.4 KB library to manually run route data requests (getServerSideProps and getStaticProps) during soft navigation. By using this library with Tanstack Query, you can unlock extensive client-side optimizations provided by react-query.

## Installation


```sh
$ npm install next-query-glue
```
```sh
$ yarn add next-query-glue
```

## Getting started
[with react-query](docs%2Fwith-react-query%2FREADME.md)

## Starters
[react-query + View Transitions API](https://github.com/akhmadshin/next-query-glue-starter)

## That library exports:
- NextQueryGlueProvider that should wrap your application. It will slightly modify router singltone.
- prepareDirectNavigation, function that makes pages router skip next data/middleware call and display page immediately. Should be called before navigation.
- getQueryKey is a function that returns key for the current page. Basically, it's just an url of the page, but without a hash part.
- getQueryFn is an async function that calls route data/middleware.


## Benefits
1) usePageData() for getting route data, no more props drilling.
2) Fetch library agnostic, you can use anything.
3) Supports most next.js versions.
4) Doesn't break default router behaviour.
5) View Transitions API works better.
6) Lets your api work slow. Potentially, 300-600 ms lag can be invisible within optimistic navigation.
7) All the benefits of react-query/rtk-query/swr. Like caching, optimistic navigation, persistence storage etc.


## Drawbacks:
1) Complicates the code. Now your components needs to handle situation when route data is loading.
2) Routes that trigger NextResponse.rewrite will act like prepareDirectNavigation     wasn't called. As workaround, you can pass pathModifier function in NextQueryGlueProvider to rewrite paths on the client side.