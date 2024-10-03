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
      return s;
    },
    execOnce: function() {
      return o;
    },
    getDisplayName: function() {
      return r;
    },
    getLocationOrigin: function() {
      return i;
    },
    getURL: function() {
      return l;
    },
    isAbsoluteUrl: function() {
      return u;
    },
    isResSent: function() {
      return a;
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
  const s = [
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
  const f = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, u = (t) => f.test(t);
  function i() {
    const { protocol: t, hostname: c, port: h } = window.location;
    return t + "//" + c + (h ? ":" + h : "");
  }
  function l() {
    const { href: t } = window.location, c = i();
    return t.substring(c.length);
  }
  function r(t) {
    return typeof t == "string" ? t : t.displayName || t.name || "Unknown";
  }
  function a(t) {
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
    if (O && a(O))
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
  function n(s) {
    const o = s.indexOf("#"), f = s.indexOf("?"), u = f > -1 && (o < 0 || f < o);
    return u || o > -1 ? {
      pathname: s.substring(0, u ? f : o),
      query: u ? s.substring(f, o > -1 ? o : void 0) : "",
      hash: o > -1 ? s.slice(o) : ""
    } : {
      pathname: s,
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
      return s;
    }
  });
  const n = q;
  function s(o, f) {
    if (typeof o != "string")
      return !1;
    const { pathname: u } = (0, n.parsePath)(o);
    return u === f || u.startsWith(f + "/");
  }
})(L);
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: !0
  }), Object.defineProperty(n, "hasBasePath", {
    enumerable: !0,
    get: function() {
      return f;
    }
  });
  const s = L, o = process.env.__NEXT_ROUTER_BASEPATH || "";
  function f(u) {
    return (0, s.pathHasPrefix)(u, o);
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
  const n = I, s = W;
  function o(f) {
    if (!(0, n.isAbsoluteUrl)(f)) return !0;
    try {
      const u = (0, n.getLocationOrigin)(), i = new URL(f, u);
      return i.origin === u && (0, s.hasBasePath)(i.pathname);
    } catch {
      return !1;
    }
  }
})(U);
var R = {}, N = {};
function T(e) {
  if (typeof WeakMap != "function") return null;
  var n = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap();
  return (T = function(o) {
    return o ? s : n;
  })(e);
}
N._ = N._interop_require_wildcard = D;
function D(e, n) {
  if (!n && e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var s = T(n);
  if (s && s.has(e)) return s.get(e);
  var o = { __proto__: null }, f = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e)
    if (u !== "default" && Object.prototype.hasOwnProperty.call(e, u)) {
      var i = f ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(o, u, i) : o[u] = e[u];
    }
  return o.default = e, s && s.set(e, o), o;
}
var w = {}, S;
function Q() {
  return S || (S = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function n(i, l) {
      for (var r in l) Object.defineProperty(i, r, {
        enumerable: !0,
        get: l[r]
      });
    }
    n(e, {
      assign: function() {
        return u;
      },
      searchParamsToUrlQuery: function() {
        return s;
      },
      urlQueryToSearchParams: function() {
        return f;
      }
    });
    function s(i) {
      const l = {};
      return i.forEach((r, a) => {
        typeof l[a] > "u" ? l[a] = r : Array.isArray(l[a]) ? l[a].push(r) : l[a] = [
          l[a],
          r
        ];
      }), l;
    }
    function o(i) {
      return typeof i == "string" || typeof i == "number" && !isNaN(i) || typeof i == "boolean" ? String(i) : "";
    }
    function f(i) {
      const l = new URLSearchParams();
      return Object.entries(i).forEach((r) => {
        let [a, d] = r;
        Array.isArray(d) ? d.forEach((p) => l.append(a, o(p))) : l.set(a, o(d));
      }), l;
    }
    function u(i) {
      for (var l = arguments.length, r = new Array(l > 1 ? l - 1 : 0), a = 1; a < l; a++)
        r[a - 1] = arguments[a];
      return r.forEach((d) => {
        Array.from(d.keys()).forEach((p) => i.delete(p)), d.forEach((p, g) => i.append(g, p));
      }), i;
    }
  }(w)), w;
}
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function n(r, a) {
    for (var d in a) Object.defineProperty(r, d, {
      enumerable: !0,
      get: a[d]
    });
  }
  n(e, {
    formatUrl: function() {
      return u;
    },
    formatWithValidation: function() {
      return l;
    },
    urlObjectKeys: function() {
      return i;
    }
  });
  const o = /* @__PURE__ */ N._(Q()), f = /https?|ftp|gopher|file/;
  function u(r) {
    let { auth: a, hostname: d } = r, p = r.protocol || "", g = r.pathname || "", v = r.hash || "", P = r.query || "", y = !1;
    a = a ? encodeURIComponent(a).replace(/%3A/i, ":") + "@" : "", r.host ? y = a + r.host : d && (y = a + (~d.indexOf(":") ? "[" + d + "]" : d), r.port && (y += ":" + r.port)), P && typeof P == "object" && (P = String(o.urlQueryToSearchParams(P)));
    let m = r.search || P && "?" + P || "";
    return p && !p.endsWith(":") && (p += ":"), r.slashes || (!p || f.test(p)) && y !== !1 ? (y = "//" + (y || ""), g && g[0] !== "/" && (g = "/" + g)) : y || (y = ""), v && v[0] !== "#" && (v = "#" + v), m && m[0] !== "?" && (m = "?" + m), g = g.replace(/[?#]/g, encodeURIComponent), m = m.replace("#", "%23"), "" + p + y + g + m + v;
  }
  const i = [
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
  function l(r) {
    return process.env.NODE_ENV === "development" && r !== null && typeof r == "object" && Object.keys(r).forEach((a) => {
      i.includes(a) || console.warn("Unknown key passed via urlObject into url.format: " + a);
    }), u(r);
  }
})(R);
const F = ({
  href: e,
  singletonRouter: n,
  withTrailingSlash: s
}) => {
  const o = typeof e == "string" ? e : R.formatWithValidation(e), f = B(n.route, n.query, s);
  if (!U.isLocalURL(o) || o.startsWith("#") || o.startsWith(`${f}#`))
    return;
  const i = n == null ? void 0 : n.router;
  !i || !i.getRouteInfoOnly || (i.getRouteInfo = i.getRouteInfoOnly);
};
export {
  F as prepareDirectNavigation
};
