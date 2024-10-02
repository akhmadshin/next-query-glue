import { i as _, g as S } from "../route-regex-CxvJkuEQ.js";
import { removeTrailingSlash as p } from "./remove-trailing-slash.js";
var g = {}, f = {}, w = {};
(function(r) {
  Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "getSortedRoutes", {
    enumerable: !0,
    get: function() {
      return a;
    }
  });
  class s {
    insert(e) {
      this._insert(e.split("/").filter(Boolean), [], !1);
    }
    smoosh() {
      return this._smoosh();
    }
    _smoosh(e) {
      e === void 0 && (e = "/");
      const t = [
        ...this.children.keys()
      ].sort();
      this.slugName !== null && t.splice(t.indexOf("[]"), 1), this.restSlugName !== null && t.splice(t.indexOf("[...]"), 1), this.optionalRestSlugName !== null && t.splice(t.indexOf("[[...]]"), 1);
      const o = t.map((i) => this.children.get(i)._smoosh("" + e + i + "/")).reduce((i, n) => [
        ...i,
        ...n
      ], []);
      if (this.slugName !== null && o.push(...this.children.get("[]")._smoosh(e + "[" + this.slugName + "]/")), !this.placeholder) {
        const i = e === "/" ? "/" : e.slice(0, -1);
        if (this.optionalRestSlugName != null)
          throw new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + i + '" and "' + i + "[[..." + this.optionalRestSlugName + ']]").');
        o.unshift(i);
      }
      return this.restSlugName !== null && o.push(...this.children.get("[...]")._smoosh(e + "[..." + this.restSlugName + "]/")), this.optionalRestSlugName !== null && o.push(...this.children.get("[[...]]")._smoosh(e + "[[..." + this.optionalRestSlugName + "]]/")), o;
    }
    _insert(e, t, o) {
      if (e.length === 0) {
        this.placeholder = !1;
        return;
      }
      if (o)
        throw new Error("Catch-all must be the last part of the URL.");
      let i = e[0];
      if (i.startsWith("[") && i.endsWith("]")) {
        let c = function(m, l) {
          if (m !== null && m !== l)
            throw new Error("You cannot use different slug names for the same dynamic path ('" + m + "' !== '" + l + "').");
          t.forEach((d) => {
            if (d === l)
              throw new Error('You cannot have the same slug name "' + l + '" repeat within a single dynamic path');
            if (d.replace(/\W/g, "") === i.replace(/\W/g, ""))
              throw new Error('You cannot have the slug names "' + d + '" and "' + l + '" differ only by non-word symbols within a single dynamic path');
          }), t.push(l);
        }, n = i.slice(1, -1), h = !1;
        if (n.startsWith("[") && n.endsWith("]") && (n = n.slice(1, -1), h = !0), n.startsWith("...") && (n = n.substring(3), o = !0), n.startsWith("[") || n.endsWith("]"))
          throw new Error("Segment names may not start or end with extra brackets ('" + n + "').");
        if (n.startsWith("."))
          throw new Error("Segment names may not start with erroneous periods ('" + n + "').");
        if (o)
          if (h) {
            if (this.restSlugName != null)
              throw new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + e[0] + '" ).');
            c(this.optionalRestSlugName, n), this.optionalRestSlugName = n, i = "[[...]]";
          } else {
            if (this.optionalRestSlugName != null)
              throw new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + e[0] + '").');
            c(this.restSlugName, n), this.restSlugName = n, i = "[...]";
          }
        else {
          if (h)
            throw new Error('Optional route parameters are not yet supported ("' + e[0] + '").');
          c(this.slugName, n), this.slugName = n, i = "[]";
        }
      }
      this.children.has(i) || this.children.set(i, new s()), this.children.get(i)._insert(e.slice(1), t, o);
    }
    constructor() {
      this.placeholder = !0, this.children = /* @__PURE__ */ new Map(), this.slugName = null, this.restSlugName = null, this.optionalRestSlugName = null;
    }
  }
  function a(u) {
    const e = new s();
    return u.forEach((t) => e.insert(t)), e.smoosh();
  }
})(w);
var y = {};
(function(r) {
  Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "isDynamicRoute", {
    enumerable: !0,
    get: function() {
      return u;
    }
  });
  const s = _, a = /\/\[[^/]+?\](?=\/|$)/;
  function u(e) {
    return (0, s.isInterceptionRouteAppPath)(e) && (e = (0, s.extractInterceptionRouteInformation)(e).interceptedRoute), a.test(e);
  }
})(y);
(function(r) {
  Object.defineProperty(r, "__esModule", {
    value: !0
  });
  function s(e, t) {
    for (var o in t) Object.defineProperty(e, o, {
      enumerable: !0,
      get: t[o]
    });
  }
  s(r, {
    getSortedRoutes: function() {
      return a.getSortedRoutes;
    },
    isDynamicRoute: function() {
      return u.isDynamicRoute;
    }
  });
  const a = w, u = y;
})(f);
var R = {};
(function(r) {
  Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "normalizePathSep", {
    enumerable: !0,
    get: function() {
      return s;
    }
  });
  function s(a) {
    return a.replace(/\\/g, "/");
  }
})(R);
(function(r) {
  Object.defineProperty(r, "__esModule", {
    value: !0
  }), Object.defineProperty(r, "denormalizePagePath", {
    enumerable: !0,
    get: function() {
      return u;
    }
  });
  const s = f, a = R;
  function u(e) {
    let t = (0, a.normalizePathSep)(e);
    return t.startsWith("/index/") && !(0, s.isDynamicRoute)(t) ? t.slice(6) : t !== "/index" ? t : "/";
  }
})(g);
async function P(r, s) {
  const a = s == null ? void 0 : s.router;
  if (!a)
    throw new Error("router singleton is undefined");
  const e = await a.pageLoader.getPageList(), t = p(g.denormalizePagePath(r));
  return t === "/404" || t === "/_error" ? r : (e.includes(t) || e.some((o) => {
    if (f.isDynamicRoute(o) && S(o).re.test(t))
      return r = o, !0;
  }), p(r));
}
export {
  P as resolveDynamicRoute
};
