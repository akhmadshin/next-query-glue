const h = async ({ onLoad: o, singletonRouter: r, ...n }) => {
  const e = r == null ? void 0 : r.router;
  if (!e)
    throw new Error("router singleton is undefined");
  return e.getRouteInfoOrig({
    ...n
  }).then((t) => (o && o(t).catch((a) => {
    throw a.message.startsWith("Invariant: attempted to hard navigate to the same URL") && window.__NEXT_OPTIMISTIC_LINK_RENDERED_PATHNAME === window.location.pathname && e.reload(), new Error(a);
  }), t)).catch((t) => {
    throw console.error(t), new Error(t);
  });
};
export {
  h as getRouteInfoWithOnLoad
};
