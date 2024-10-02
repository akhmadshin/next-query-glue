import { buildRoute as f } from "./router-utils/build-route.js";
const y = async (r, n, o, s) => {
  const e = o == null ? void 0 : o.router;
  if (!e)
    throw new Error("router singleton is undefined");
  let a;
  e.onlyAHashChange = e.onlyAHashChangeNever, e.getRouteInfo = async (i) => e.getRouteInfoWithOnLoad({
    singletonRouter: o,
    ...i,
    onLoad: (t) => {
      var u, p;
      if ("type" in t && t.type === "redirect-internal")
        return e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, Promise.resolve();
      if ("props" in t) {
        if ((u = t.props) != null && u.notFound)
          return a = { notFound: !0 }, Promise.resolve();
        (p = t.props) != null && p.pageProps && (a = t.props.pageProps);
      }
      return Promise.resolve();
    }
  });
  const g = e.asPath, l = h(r, n, s);
  return await r.push(l, g, { scroll: !1 }).catch((i) => {
    throw new Error(i);
  }), e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, !a || "notFound" in a ? Promise.reject() : a;
}, d = (r, n, o) => h(r, n, o), h = (r, n, o) => {
  const s = r.asPath.split("#")[0].split("?")[1];
  let e = f(r.route, r.query, n);
  return s && (e = `${e}?${s}`), o ? o(e) : e;
};
export {
  y as getQueryFn,
  d as getQueryKey
};
