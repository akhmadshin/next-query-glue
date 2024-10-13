import { buildRoute as B } from "./router-utils/build-route.js";
var U = {}, I = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function n(t, c) {
    for (var h in c) Object.defineProperty(t, h, {
      enumerable: !0,
      get: c[h]
    });
  }
  n(e, {
    DecodeError: function() {
      return P;
    },
    MiddlewareNotFoundError: function() {
      return j;
    },
    MissingStaticPage: function() {
      return M;
    },
    NormalizeError: function() {
      return y;
    },
    PageNotFoundError: function() {
      return m;
    },
    SP: function() {
      return g;
    },
    ST: function() {
      return v;
    },
    WEB_VITALS: function() {
      return a;
    },
    execOnce: function() {
      return o;
    },
    getDisplayName: function() {
      return r;
    },
    getLocationOrigin: function() {
      return s;
    },
    getURL: function() {
      return f;
    },
    isAbsoluteUrl: function() {
      return i;
    },
    isResSent: function() {
      return u;
    },
    loadGetInitialProps: function() {
      return p;
    },
    normalizeRepeatedSlashes: function() {
      return d;
    },
    stringifyError: function() {
      return A;
    }
  });
  const a = [
    "CLS",
    "FCP",
    "FID",
    "INP",
    "LCP",
    "TTFB"
  ];
  function o(t) {
    let c = !1, h;
    return function() {
      for (var O = arguments.length, _ = new Array(O), E = 0; E < O; E++)
        _[E] = arguments[E];
      return c || (c = !0, h = t(..._)), h;
    };
  }
  const l = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, i = (t) => l.test(t);
  function s() {
    const { protocol: t, hostname: c, port: h } = window.location;
    return t + "//" + c + (h ? ":" + h : "");
  }
  function f() {
    const { href: t } = window.location, c = s();
    return t.substring(c.length);
  }
  function r(t) {
    return typeof t == "string" ? t : t.displayName || t.name || "Unknown";
  }
  function u(t) {
    return t.finished || t.headersSent;
  }
  function d(t) {
    const c = t.split("?");
    return c[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (c[1] ? "?" + c.slice(1).join("?") : "");
  }
  async function p(t, c) {
    if (process.env.NODE_ENV !== "production") {
      var h;
      if ((h = t.prototype) != null && h.getInitialProps) {
        const E = '"' + r(t) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
        throw new Error(E);
      }
    }
    const O = c.res || c.ctx && c.ctx.res;
    if (!t.getInitialProps)
      return c.ctx && c.Component ? {
        pageProps: await p(c.Component, c.ctx)
      } : {};
    const _ = await t.getInitialProps(c);
    if (O && u(O))
      return _;
    if (!_) {
      const E = '"' + r(t) + '.getInitialProps()" should resolve to an object. But found "' + _ + '" instead.';
      throw new Error(E);
    }
    return process.env.NODE_ENV !== "production" && Object.keys(_).length === 0 && !c.ctx && console.warn("" + r(t) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps"), _;
  }
  const g = typeof performance < "u", v = g && [
    "mark",
    "measure",
    "getEntriesByName"
  ].every((t) => typeof performance[t] == "function");
  class P extends Error {
  }
  class y extends Error {
  }
  class m extends Error {
    constructor(c) {
      super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = "Cannot find module for page: " + c;
    }
  }
  class M extends Error {
    constructor(c, h) {
      super(), this.message = "Failed to load static file for page: " + c + " " + h;
    }
  }
  class j extends Error {
    constructor() {
      super(), this.code = "ENOENT", this.message = "Cannot find the middleware module";
    }
  }
  function A(t) {
    return JSON.stringify({
      message: t.message,
      stack: t.stack
    });
  }
})(I);
var b = { exports: {} }, L = {}, q = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "parsePath", {
    enumerable: !0,
    get: function() {
      return n;
    }
  });
  function n(a) {
    const o = a.indexOf("#"), l = a.indexOf("?"), i = l > -1 && (o < 0 || l < o);
    return i || o > -1 ? {
      pathname: a.substring(0, i ? l : o),
      query: i ? a.substring(l, o > -1 ? o : void 0) : "",
      hash: o > -1 ? a.slice(o) : ""
    } : {
      pathname: a,
      query: "",
      hash: ""
    };
  }
})(q);
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "pathHasPrefix", {
    enumerable: !0,
    get: function() {
      return a;
    }
  });
  const n = q;
  function a(o, l) {
    if (typeof o != "string")
      return !1;
    const { pathname: i } = (0, n.parsePath)(o);
    return i === l || i.startsWith(l + "/");
  }
})(L);
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), Object.defineProperty(n, "hasBasePath", {
    enumerable: !0,
    get: function() {
      return l;
    }
  });
  const a = L, o = process.env.__NEXT_ROUTER_BASEPATH || "";
  function l(i) {
    return (0, a.pathHasPrefix)(i, o);
  }
  (typeof n.default == "function" || typeof n.default == "object" && n.default !== null) && typeof n.default.__esModule > "u" && (Object.defineProperty(n.default, "__esModule", { value: !0 }), Object.assign(n.default, n), e.exports = n.default);
})(b, b.exports);
var W = b.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "isLocalURL", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const n = I, a = W;
  function o(l) {
    if (!(0, n.isAbsoluteUrl)(l)) return !0;
    try {
      const i = (0, n.getLocationOrigin)(), s = new URL(l, i);
      return s.origin === i && (0, a.hasBasePath)(s.pathname);
    } catch {
      return !1;
    }
  }
})(U);
var R = {}, N = {};
function T(e) {
  if (typeof WeakMap != "function") return null;
  var n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
  return (T = function(o) {
    return o ? a : n;
  })(e);
}
N._ = N._interop_require_wildcard = D;
function D(e, n) {
  if (!n && e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var a = T(n);
  if (a && a.has(e)) return a.get(e);
  var o = { __proto__: null }, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var s = l ? Object.getOwnPropertyDescriptor(e, i) : null;
      s && (s.get || s.set) ? Object.defineProperty(o, i, s) : o[i] = e[i];
    }
  return o.default = e, a && a.set(e, o), o;
}
var w = {}, S;
function Q() {
  return S || (S = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(s, f) {
      for (var r in f) Object.defineProperty(s, r, {
        enumerable: !0,
        get: f[r]
      });
    }
    n(e, {
      assign: function() {
        return i;
      },
      searchParamsToUrlQuery: function() {
        return a;
      },
      urlQueryToSearchParams: function() {
        return l;
      }
    });
    function a(s) {
      const f = {};
      return s.forEach((r, u) => {
        typeof f[u] > "u" ? f[u] = r : Array.isArray(f[u]) ? f[u].push(r) : f[u] = [
          f[u],
          r
        ];
      }), f;
    }
    function o(s) {
      return typeof s == "string" || typeof s == "number" && !isNaN(s) || typeof s == "boolean" ? String(s) : "";
    }
    function l(s) {
      const f = new URLSearchParams();
      return Object.entries(s).forEach((r) => {
        let [u, d] = r;
        Array.isArray(d) ? d.forEach((p) => f.append(u, o(p))) : f.set(u, o(d));
      }), f;
    }
    function i(s) {
      for (var f = arguments.length, r = new Array(f > 1 ? f - 1 : 0), u = 1; u < f; u++)
        r[u - 1] = arguments[u];
      return r.forEach((d) => {
        Array.from(d.keys()).forEach((p) => s.delete(p)), d.forEach((p, g) => s.append(g, p));
      }), s;
    }
  }(w)), w;
}
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function n(r, u) {
    for (var d in u) Object.defineProperty(r, d, {
      enumerable: !0,
      get: u[d]
    });
  }
  n(e, {
    formatUrl: function() {
      return i;
    },
    formatWithValidation: function() {
      return f;
    },
    urlObjectKeys: function() {
      return s;
    }
  });
  const o = /* @__PURE__ */ N._(Q()), l = /https?|ftp|gopher|file/;
  function i(r) {
    let { auth: u, hostname: d } = r, p = r.protocol || "", g = r.pathname || "", v = r.hash || "", P = r.query || "", y = !1;
    u = u ? encodeURIComponent(u).replace(/%3A/i, ":") + "@" : "", r.host ? y = u + r.host : d && (y = u + (~d.indexOf(":") ? "[" + d + "]" : d), r.port && (y += ":" + r.port)), P && typeof P == "object" && (P = String(o.urlQueryToSearchParams(P)));
    let m = r.search || P && "?" + P || "";
    return p && !p.endsWith(":") && (p += ":"), r.slashes || (!p || l.test(p)) && y !== !1 ? (y = "//" + (y || ""), g && g[0] !== "/" && (g = "/" + g)) : y || (y = ""), v && v[0] !== "#" && (v = "#" + v), m && m[0] !== "?" && (m = "?" + m), g = g.replace(/[?#]/g, encodeURIComponent), m = m.replace("#", "%23"), "" + p + y + g + m + v;
  }
  const s = [
    "auth",
    "hash",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "slashes"
  ];
  function f(r) {
    return process.env.NODE_ENV === "development" && r !== null && typeof r == "object" && Object.keys(r).forEach((u) => {
      s.includes(u) || console.warn("Unknown key passed via urlObject into url.format: " + u);
    }), i(r);
  }
})(R);
const F = ({
  href: e,
  singletonRouter: n
}) => {
  const a = typeof e == "string" ? e : R.formatWithValidation(e), o = B(n.route, n.query);
  if (!U.isLocalURL(a) || a.startsWith("#") || a.startsWith(`${o}#`))
    return;
  const i = n == null ? void 0 : n.router;
  !i || !i.getRouteInfoOnly || (i.getRouteInfo = i.getRouteInfoOnly);
};
export {
  F as prepareDirectNavigation
};
