import { resolveDynamicRoute as m } from "./router-utils/resolve-dynamic-route.js";
import { buildRoute as P } from "./router-utils/build-route.js";
const v = async (t, s, o, n) => {
  console.log("getQueryFn run = ");
  const e = o == null ? void 0 : o.router;
  if (!e)
    throw new Error("router singleton is undefined");
  let a;
  e.onlyAHashChange = e.onlyAHashChangeNever, e.getRouteInfo = async (p) => e.getRouteInfoWithOnLoad({
    singletonRouter: o,
    ...p,
    onLoad: (r) => {
      var i, g;
      if ("type" in r && r.type === "redirect-internal")
        return e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, Promise.resolve();
      if ("props" in r) {
        if ((i = r.props) != null && i.notFound)
          return a = { notFound: !0 }, Promise.resolve();
        (g = r.props) != null && g.pageProps && (a = r.props.pageProps);
      }
      return Promise.resolve();
    }
  });
  const c = e.asPath.split("#")[0].split("?")[0], l = await m(n ? n(c) : c, o), h = e.asPath, y = f(t, s, n), u = e.components[l];
  return console.log("getQueryFn routeData old = ", e.components[l]), u.__N_SSG === !1 && u.__N_SSP === !1 && delete e.components[l], await t.push(y, h, { scroll: !1 }).catch((p) => {
    console.log("getQueryFn push error ", p);
  }), u.__N_SSG === !1 && u.__N_SSP === !1 && delete e.components[l], console.log("getQueryFn routeData new = ", e.components[l]), e.getRouteInfo = e.getRouteInfoOrig, e.onlyAHashChange = e.onlyAHashChangeOrig, !a || "notFound" in a ? Promise.reject() : a;
}, F = (t, s, o) => f(t, s, o), f = (t, s, o) => {
  const n = t.asPath.split("#")[0].split("?")[1];
  let e = P(t.route, t.query, s);
  return n && (e = `${e}?${n}`), o ? o(e) : e;
};
export {
  v as getQueryFn,
  F as getQueryKey
};
