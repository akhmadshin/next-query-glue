import { removeTrailingSlash as h } from "./router-utils/remove-trailing-slash.js";
var d = {}, R = {}, _ = {};
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "ensureLeadingSlash", {
    enumerable: !0,
    get: function() {
      return u;
    }
  });
  function u(i) {
    return i.startsWith("/") ? i : "/" + i;
  }
})(_);
var E = {};
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function u(a, n) {
    for (var e in n)
      Object.defineProperty(a, e, {
        enumerable: !0,
        get: n[e]
      });
  }
  u(t, {
    DEFAULT_SEGMENT_KEY: function() {
      return c;
    },
    PAGE_SEGMENT_KEY: function() {
      return s;
    },
    isGroupSegment: function() {
      return i;
    }
  });
  function i(a) {
    return a[0] === "(" && a.endsWith(")");
  }
  const s = "__PAGE__", c = "__DEFAULT__";
})(E);
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function u(n, e) {
    for (var r in e)
      Object.defineProperty(n, r, {
        enumerable: !0,
        get: e[r]
      });
  }
  u(t, {
    normalizeAppPath: function() {
      return c;
    },
    normalizeRscURL: function() {
      return a;
    }
  });
  const i = _, s = E;
  function c(n) {
    return (0, i.ensureLeadingSlash)(n.split("/").reduce((e, r, o, f) => !r || (0, s.isGroupSegment)(r) || r[0] === "@" || (r === "page" || r === "route") && o === f.length - 1 ? e : e + "/" + r, ""));
  }
  function a(n) {
    return n.replace(
      /\.rsc($|\?)/,
      // $1 ensures `?` is preserved
      "$1"
    );
  }
})(R);
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function u(n, e) {
    for (var r in e)
      Object.defineProperty(n, r, {
        enumerable: !0,
        get: e[r]
      });
  }
  u(t, {
    INTERCEPTION_ROUTE_MARKERS: function() {
      return s;
    },
    extractInterceptionRouteInformation: function() {
      return a;
    },
    isInterceptionRouteAppPath: function() {
      return c;
    }
  });
  const i = R, s = [
    "(..)(..)",
    "(.)",
    "(..)",
    "(...)"
  ];
  function c(n) {
    return n.split("/").find((e) => s.find((r) => e.startsWith(r))) !== void 0;
  }
  function a(n) {
    let e, r, o;
    for (const f of n.split("/"))
      if (r = s.find((g) => f.startsWith(g)), r) {
        [e, o] = n.split(r, 2);
        break;
      }
    if (!e || !r || !o)
      throw new Error(`Invalid interception route: ${n}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
    switch (e = (0, i.normalizeAppPath)(e), r) {
      case "(.)":
        e === "/" ? o = `/${o}` : o = e + "/" + o;
        break;
      case "(..)":
        if (e === "/")
          throw new Error(`Invalid interception route: ${n}. Cannot use (..) marker at the root level, use (.) instead.`);
        o = e.split("/").slice(0, -1).concat(o).join("/");
        break;
      case "(...)":
        o = "/" + o;
        break;
      case "(..)(..)":
        const f = e.split("/");
        if (f.length <= 2)
          throw new Error(`Invalid interception route: ${n}. Cannot use (..)(..) marker at the root level or one level up.`);
        o = f.slice(0, -2).concat(o).join("/");
        break;
      default:
        throw new Error("Invariant: unexpected marker");
    }
    return {
      interceptingRoute: e,
      interceptedRoute: o
    };
  }
})(d);
var p = {};
(function(t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "escapeStringRegexp", {
    enumerable: !0,
    get: function() {
      return s;
    }
  });
  const u = /[|\\{}()[\]^$+*?.-]/, i = /[|\\{}()[\]^$+*?.-]/g;
  function s(c) {
    return u.test(c) ? c.replace(i, "\\$&") : c;
  }
})(p);
function l(t) {
  const u = t.startsWith("[") && t.endsWith("]");
  u && (t = t.slice(1, -1));
  const i = t.startsWith("...");
  return i && (t = t.slice(3)), { key: t, repeat: i, optional: u };
}
function P(t) {
  const u = h(t).slice(1).split("/"), i = {};
  let s = 1;
  return {
    parameterizedRoute: u.map((c) => {
      const a = d.INTERCEPTION_ROUTE_MARKERS.find(
        (e) => c.startsWith(e)
      ), n = c.match(/\[((?:\[.*\])|.+)\]/);
      if (a && n) {
        const { key: e, optional: r, repeat: o } = l(n[1]);
        return i[e] = { pos: s++, repeat: o, optional: r }, `/${p.escapeStringRegexp(a)}([^/]+?)`;
      } else if (n) {
        const { key: e, repeat: r, optional: o } = l(n[1]);
        return i[e] = { pos: s++, repeat: r, optional: o }, r ? o ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
      } else
        return `/${p.escapeStringRegexp(c)}`;
    }).join(""),
    groups: i
  };
}
function v(t) {
  const { parameterizedRoute: u, groups: i } = P(t);
  return {
    re: new RegExp(`^${u}(?:/)?$`),
    groups: i
  };
}
export {
  v as g,
  d as i
};
