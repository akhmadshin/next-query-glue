const _ = async ({ singletonRouter: i, ...o }) => {
  const t = i == null ? void 0 : i.router;
  if (!t)
    throw new Error("router singleton is undefined");
  t.getRouteInfo = t.getRouteInfoOrig;
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isQueryUpdating: n,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isMiddlewareRewrite: u,
    ...r
  } = o;
  return t.getRouteInfoOrig({
    isQueryUpdating: !0,
    isMiddlewareRewrite: !1,
    ...r
  }).then((e) => (("__N_SSG" in e || "__N_SSP" in e) && (e.__N_SSG = !1, e.__N_SSP = !1), setTimeout(() => {
    "route" in e && e.route && delete t.components[e.route];
  }, 0), e));
};
export {
  _ as getRouteInfoOnly
};
