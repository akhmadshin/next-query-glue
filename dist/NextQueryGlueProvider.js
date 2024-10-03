import { jsx as f } from "react/jsx-runtime";
import { createContext as u } from "react";
import { getRouteInfoOnly as a } from "./router-extensions/getRouteInfoOnly.js";
import { getRouteInfoWithOnLoad as d } from "./router-extensions/getRouteInfoWithOnLoad.js";
import { subModified as g } from "./router-extensions/subModified.js";
import { onlyAHashChangeNever as h } from "./router-extensions/onlyAHashChangeNever.js";
const b = u({ pathModifier: void 0, singletonRouter: void 0 }), m = (t = (o) => o, e) => {
  if (typeof window > "u")
    return;
  const o = e == null ? void 0 : e.router;
  o && (o.getRouteInfoOrig || (o.getRouteInfoOrig = o.getRouteInfo.bind(o)), o.getRouteInfoOnly || (o.getRouteInfoOnly = ((n) => a({
    ...n,
    pathnameModifier: t,
    singletonRouter: e
  })).bind(o)), o.getRouteInfoWithOnLoad || (o.getRouteInfoWithOnLoad = d.bind(o)), !o.subOrig && o.sub && (o.subOrig = o.sub.bind(o)), o.sub = ((n, r, i) => g(n, r, i, e)).bind(o), o.onlyAHashChangeOrig || (o.onlyAHashChangeOrig = o.onlyAHashChange.bind(o)), o.onlyAHashChangeNever || (o.onlyAHashChangeNever = h.bind(o)));
}, C = ({ pathModifier: t, singletonRouter: e, children: o }) => (m(t, e), /* @__PURE__ */ f(b.Provider, { value: { pathModifier: t, singletonRouter: e }, children: o }));
export {
  b as NextQueryGlueContext,
  C as NextQueryGlueProvider,
  m as patchRouter
};
