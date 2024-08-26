export const buildRoute = (route: string, params: Record<string, string>, withTrailingSlash: boolean): string => {
  const pathname = Object.keys(params).reduce((acc, key) => {
    return acc.replace(`[${key}]`, params[key]);
  }, route);

  if (withTrailingSlash && !pathname.endsWith('/')) {
    return `${pathname}/`;
  }
  return pathname;
};