import { buildRoute as c } from "./router-utils/build-route.js";
const y = async (r, t, o, s) => {
  const e = o == null ? void 0 : o.router;
  if (!e)
    throw new Error("router singleton is undefined");
  let a;
  e.onlyAHashChange = e.onlyAHashChangeNever, e.getRouteInfo = async (i) => e.getRouteInfoWithOnLoad({
    singletonRouter: o,
    ...i,
    onLoad: (n) => {
      var p, u;
      if ("type" in n && n.type === "redirect-internal")
        return e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, Promise.resolve();
      if ("props" in n) {
        if ((p = n.props) != null && p.notFound)
          return a = { notFound: !0 }, Promise.resolve();
        (u = n.props) != null && u.pageProps && (a = n.props.pageProps);
      }
      return Promise.resolve();
    }
  });
  const g = e.asPath, h = l(r, t, s);
  return await r.replace(h, g, { scroll: !1 }).catch((i) => {
    throw console.error(i), new Error(i);
  }), e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, !a || "notFound" in a ? Promise.reject() : a;
}, d = (r, t, o) => l(r, t, o), l = (r, t, o) => {
  const s = r.asPath.split("#")[0].split("?")[1];
  let e = c(r.route, r.query, t);
  return s && (e = `${e}?${s}`), o ? o(e) : e;
};
export {
  y as getQueryFn,
  d as getQueryKey
};
