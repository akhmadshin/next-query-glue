import { buildRoute as f } from "./router-utils/build-route.js";
const c = async (r, t, o, a) => {
  const e = o == null ? void 0 : o.router;
  if (!e)
    throw new Error("router singleton is undefined");
  let s;
  e.onlyAHashChange = e.onlyAHashChangeNever, e.getRouteInfo = async (l) => e.getRouteInfoWithOnLoad({
    singletonRouter: o,
    ...l,
    onLoad: (n) => {
      var i, u;
      if ("type" in n && n.type === "redirect-internal")
        return e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, Promise.resolve();
      if ("props" in n) {
        if ((i = n.props) != null && i.notFound)
          return s = { notFound: !0 }, Promise.resolve();
        (u = n.props) != null && u.pageProps && (s = n.props.pageProps);
      }
      return Promise.resolve();
    }
  });
  const g = e.asPath, h = p(r, t, a);
  return await r.push(h, g, { scroll: !1 }), e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, !s || "notFound" in s ? Promise.reject() : s;
}, d = (r, t, o) => p(r, t, o), p = (r, t, o) => {
  const a = r.asPath.split("#")[0].split("?")[1];
  let e = f(r.route, r.query, t);
  return a && (e = `${e}?${a}`), o ? o(e) : e;
};
export {
  c as getQueryFn,
  d as getQueryKey
};
