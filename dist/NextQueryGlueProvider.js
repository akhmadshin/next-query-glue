import { jsx as n } from "react/jsx-runtime";
import { createContext as i, useLayoutEffect as h } from "react";
import { getRouteInfoOnly as u } from "./router-extensions/getRouteInfoOnly.js";
import { getRouteInfoWithOnLoad as d } from "./router-extensions/getRouteInfoWithOnLoad.js";
import { subModified as g } from "./router-extensions/subModified.js";
import { onlyAHashChangeNever as O } from "./router-extensions/onlyAHashChangeNever.js";
const b = i({ pathModifier: void 0, singletonRouter: void 0 }), y = (f = (e) => e, r) => {
  if (typeof window > "u")
    return;
  const e = r == null ? void 0 : r.router;
  e && (e.getRouteInfoOrig || (e.getRouteInfoOrig = e.getRouteInfo.bind(e)), e.getRouteInfoOnly || (e.getRouteInfoOnly = ((o) => u({
    ...o,
    pathnameModifier: f,
    singletonRouter: r
  })).bind(e)), e.getRouteInfoWithOnLoad || (e.getRouteInfoWithOnLoad = d.bind(e)), !e.subOrig && e.sub && (e.subOrig = e.sub.bind(e)), e.sub = ((o, t, a) => g(o, t, a, r)).bind(e), e.onlyAHashChangeOrig || (e.onlyAHashChangeOrig = e.onlyAHashChange.bind(e)), e.onlyAHashChangeNever || (e.onlyAHashChangeNever = O.bind(e)));
}, c = ({ pathModifier: f, singletonRouter: r, children: e }) => {
  y(f, r);
  const o = () => {
    const t = r == null ? void 0 : r.router;
    !t || !t.getRouteInfoOrig || (t.getRouteInfo = t.getRouteInfoOrig);
  };
  return h(() => {
    if (!(!r || !r.router))
      return r.router.events.on("hashChangeStart", o), () => {
        var t;
        (t = r.router) == null || t.events.off("hashChangeStart", o);
      };
  }, []), /* @__PURE__ */ n(b.Provider, { value: { pathModifier: f, singletonRouter: r }, children: e });
};
export {
  b as NextQueryGlueContext,
  c as NextQueryGlueProvider,
  y as patchRouter
};
