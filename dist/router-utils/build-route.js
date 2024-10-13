const u = (n, e) => Object.keys(e).reduce((r, t) => r.replace(`[${t}]`, e[t]), n);
export {
  u as buildRoute
};
