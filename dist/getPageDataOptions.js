import { buildRoute as h } from "./router-utils/build-route.js";
const f = async (o, r, t) => {
  const e = r == null ? void 0 : r.router;
  if (!e)
    throw new Error("router singleton is undefined");
  let n;
  e.onlyAHashChange = e.onlyAHashChangeNever, e.getRouteInfo = async (s) => e.getRouteInfoWithOnLoad({
    singletonRouter: r,
    ...s,
    onLoad: (a) => {
      var i, p;
      if ("type" in a && a.type === "redirect-internal")
        return e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, Promise.resolve();
      if ("props" in a) {
        if ((i = a.props) != null && i.notFound)
          return n = { notFound: !0 }, Promise.resolve();
        (p = a.props) != null && p.pageProps && (n = a.props.pageProps);
      }
      return Promise.resolve();
    }
  });
  const l = e.asPath, g = u(o, t);
  return await o.replace(g, l, { scroll: !1 }).catch((s) => {
    throw console.error(s), new Error(s);
  }), e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, !n || "notFound" in n ? Promise.reject() : n;
}, y = (o, r) => u(o, r), u = (o, r) => {
  let t = o.asPath.split("#")[0].split("?")[1], e = h(o.route, o.query);
  return t && (t = new URLSearchParams(t).toString(), e = `${e}?${t}`), r ? r(e) : e;
};
export {
  f as getQueryFn,
  y as getQueryKey
};
