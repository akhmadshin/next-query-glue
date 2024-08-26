const o = (n, t, u) => {
  const e = Object.keys(t).reduce((c, r) => c.replace(`[${r}]`, t[r]), n);
  return u && !e.endsWith("/") ? `${e}/` : e;
};
export {
  o as buildRoute
};
