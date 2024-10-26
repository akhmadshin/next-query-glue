const r = ({
  singletonRouter: t
}) => {
  const e = t == null ? void 0 : t.router;
  !e || !e.getRouteInfoOnly || (e.getRouteInfo = e.getRouteInfoOnly);
};
export {
  r as prepareDirectNavigation
};
