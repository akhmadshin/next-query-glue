const N = (_, r, t, o) => {
  const e = o == null ? void 0 : o.router;
  if (!e)
    throw new Error("router singleton is undefined");
  const i = _.route;
  if (!i || i === "/_error")
    return e.subOrig(_, r, t);
  const n = e.components[i], E = n.__N_SSG === !1 && n.__N_SSP === !1;
  let s = !0;
  return E ? window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME = window.location.pathname : window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME === window.location.pathname && (s = !1), E || (window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME = void 0), s ? e.subOrig(_, r, t) : Promise.resolve();
};
export {
  N as subModified
};
