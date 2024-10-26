const f = async ({ singletonRouter: r, ...i }) => {
  const t = r == null ? void 0 : r.router;
  if (!t)
    throw new Error("router singleton is undefined");
  t.getRouteInfo = t.getRouteInfoOrig;
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isQueryUpdating: _,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isMiddlewareRewrite: o,
    ...n
  } = i;
  return t.getRouteInfoOrig({
    isQueryUpdating: !0,
    isMiddlewareRewrite: !1,
    ...n
  }).then((e) => (("__N_SSG" in e || "__N_SSP" in e) && (e.__N_SSG = !1, e.__N_SSP = !1), e));
};
export {
  f as getRouteInfoOnly
};
