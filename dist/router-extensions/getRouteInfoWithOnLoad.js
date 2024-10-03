const h = async ({ onLoad: e, singletonRouter: r, ...n }) => {
  const a = r == null ? void 0 : r.router;
  if (!a)
    throw new Error("router singleton is undefined");
  return a.getRouteInfoOrig({
    ...n
  }).then((t) => (e && e(t).catch((o) => {
    throw o.message.startsWith("Invariant: attempted to hard navigate to the same URL") && window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME === window.location.pathname && a.reload(), new Error(o);
  }), t)).catch((t) => {
    throw new Error(t);
  });
};
export {
  h as getRouteInfoWithOnLoad
};
