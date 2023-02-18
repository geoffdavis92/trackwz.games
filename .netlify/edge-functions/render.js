var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component4, name) {
  if (!component4 || !component4.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    Promise.resolve();
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index4 = 0;
      while (index4 < str.length) {
        var eqIdx = str.indexOf("=", index4);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index4);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index4, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index4 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers && input.headers["set-cookie"]) {
        input = input.headers["set-cookie"];
      } else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key2) {
          return key2.toLowerCase() === "set-cookie";
        })];
        if (!sch && input.headers.cookie && !options2.silent) {
          console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          );
        }
        input = sch;
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_chunks();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component, file, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/components/layout.svelte-c9345faf.js";
    imports = ["_app/immutable/components/layout.svelte-c9345faf.js", "_app/immutable/chunks/index-ac3afb59.js"];
    stylesheets = [];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        updated: stores.updated
      };
    };
    page = {
      /** @param {(value: any) => void} fn */
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/components/error.svelte-1f8769d7.js";
    imports2 = ["_app/immutable/components/error.svelte-1f8769d7.js", "_app/immutable/chunks/index-ac3afb59.js", "_app/immutable/chunks/singletons-b51cada9.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.js
var page_exports = {};
__export(page_exports, {
  load: () => load
});
async function load({ fetch: fetch2 }) {
  const res = await fetch2("/airtable");
  const payload = await res.json();
  return { payload };
}
var init_page = __esm({
  ".svelte-kit/output/server/entries/pages/_page.js"() {
  }
});

// .svelte-kit/output/server/chunks/constants.js
var MEMBERS;
var init_constants = __esm({
  ".svelte-kit/output/server/chunks/constants.js"() {
    MEMBERS = {
      NAME: "Name",
      PLAYED: "P",
      WINS: "W",
      KILLS: "K",
      DAMAGE: "DMG",
      FINAL_CIRCLE: "FC",
      WINS_PER_MATCH: "W/M",
      KILLS_PER_MATCH: "K/M",
      DAMAGE_PER_MATCH: "DMG/M",
      FINAL_CIRCLES_PER_MATCH: "FC/M",
      KILLS_PER_WIN: "K/W",
      DAMAGE_PER_WIN: "DMG/W",
      FINAL_CIRCLES_PER_WIN: "FC/W"
    };
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    init_constants();
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { data } = $$props;
      if ($$props.data === void 0 && $$bindings.data && data !== void 0)
        $$bindings.data(data);
      return `<table><tr><th>Player</th>
		<th>P</th>
		<th>W</th>
		<th>K</th>
		<th>DMG</th>
		<th>FC</th></tr>

	${each(data.payload, (member) => {
        return `<tr><td>${escape(member[MEMBERS.NAME])}</td>
			<td>${escape(member[MEMBERS.PLAYED])}</td>
			<td>${escape(member[MEMBERS.WINS])}</td>
			<td>${escape(member[MEMBERS.KILLS])}</td>
			<td>${escape(member[MEMBERS.DAMAGE])}</td>
			<td>${escape(member[MEMBERS.FINAL_CIRCLE])}</td>
		</tr>`;
      })}</table>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3,
  universal: () => page_exports,
  universal_id: () => universal_id
});
var index3, component3, file3, universal_id, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_page();
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file3 = "_app/immutable/components/pages/_page.svelte-41a1b633.js";
    universal_id = "src/routes/+page.js";
    imports3 = ["_app/immutable/components/pages/_page.svelte-41a1b633.js", "_app/immutable/chunks/index-ac3afb59.js", "_app/immutable/modules/pages/_page.js-ced49a5f.js", "_app/immutable/chunks/_page-6f8811dd.js"];
    stylesheets3 = [];
    fonts3 = [];
  }
});

// node_modules/airtable/lib/airtable.umd.js
var require_airtable_umd = __commonJS({
  "node_modules/airtable/lib/airtable.umd.js"(exports, module) {
    (function(f) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.Airtable = f();
      }
    })(function() {
      var define2, module2, exports2;
      return function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof __require && __require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        return r;
      }()({ 1: [function(require2, module3, exports3) {
        "use strict";
        var AbortController;
        var browserGlobal = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        if (!browserGlobal) {
          AbortController = require2("abort-controller");
        } else if ("signal" in new Request("")) {
          AbortController = browserGlobal.AbortController;
        } else {
          var polyfill = require2("abortcontroller-polyfill/dist/cjs-ponyfill");
          AbortController = polyfill.AbortController;
        }
        module3.exports = AbortController;
      }, { "abort-controller": 20, "abortcontroller-polyfill/dist/cjs-ponyfill": 19 }], 2: [function(require2, module3, exports3) {
        "use strict";
        var AirtableError = (
          /** @class */
          function() {
            function AirtableError2(error2, message, statusCode) {
              this.error = error2;
              this.message = message;
              this.statusCode = statusCode;
            }
            AirtableError2.prototype.toString = function() {
              return [
                this.message,
                "(",
                this.error,
                ")",
                this.statusCode ? "[Http code " + this.statusCode + "]" : ""
              ].join("");
            };
            return AirtableError2;
          }()
        );
        module3.exports = AirtableError;
      }, {}], 3: [function(require2, module3, exports3) {
        "use strict";
        var __assign = this && this.__assign || function() {
          __assign = Object.assign || function(t) {
            for (var s2, i = 1, n = arguments.length; i < n; i++) {
              s2 = arguments[i];
              for (var p in s2)
                if (Object.prototype.hasOwnProperty.call(s2, p))
                  t[p] = s2[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var get_1 = __importDefault(require2("lodash/get"));
        var isPlainObject_1 = __importDefault(require2("lodash/isPlainObject"));
        var keys_1 = __importDefault(require2("lodash/keys"));
        var fetch_1 = __importDefault(require2("./fetch"));
        var abort_controller_1 = __importDefault(require2("./abort-controller"));
        var object_to_query_param_string_1 = __importDefault(require2("./object_to_query_param_string"));
        var airtable_error_1 = __importDefault(require2("./airtable_error"));
        var table_1 = __importDefault(require2("./table"));
        var http_headers_1 = __importDefault(require2("./http_headers"));
        var run_action_1 = __importDefault(require2("./run_action"));
        var package_version_1 = __importDefault(require2("./package_version"));
        var exponential_backoff_with_jitter_1 = __importDefault(require2("./exponential_backoff_with_jitter"));
        var userAgent = "Airtable.js/" + package_version_1.default;
        var Base = (
          /** @class */
          function() {
            function Base2(airtable, baseId) {
              this._airtable = airtable;
              this._id = baseId;
            }
            Base2.prototype.table = function(tableName) {
              return new table_1.default(this, null, tableName);
            };
            Base2.prototype.makeRequest = function(options2) {
              var _this = this;
              var _a;
              if (options2 === void 0) {
                options2 = {};
              }
              var method = get_1.default(options2, "method", "GET").toUpperCase();
              var url = this._airtable._endpointUrl + "/v" + this._airtable._apiVersionMajor + "/" + this._id + get_1.default(options2, "path", "/") + "?" + object_to_query_param_string_1.default(get_1.default(options2, "qs", {}));
              var controller = new abort_controller_1.default();
              var headers = this._getRequestHeaders(Object.assign({}, this._airtable._customHeaders, (_a = options2.headers) !== null && _a !== void 0 ? _a : {}));
              var requestOptions = {
                method,
                headers,
                signal: controller.signal
              };
              if ("body" in options2 && _canRequestMethodIncludeBody(method)) {
                requestOptions.body = JSON.stringify(options2.body);
              }
              var timeout = setTimeout(function() {
                controller.abort();
              }, this._airtable._requestTimeout);
              return new Promise(function(resolve, reject) {
                fetch_1.default(url, requestOptions).then(function(resp) {
                  clearTimeout(timeout);
                  if (resp.status === 429 && !_this._airtable._noRetryIfRateLimited) {
                    var numAttempts_1 = get_1.default(options2, "_numAttempts", 0);
                    var backoffDelayMs = exponential_backoff_with_jitter_1.default(numAttempts_1);
                    setTimeout(function() {
                      var newOptions = __assign(__assign({}, options2), { _numAttempts: numAttempts_1 + 1 });
                      _this.makeRequest(newOptions).then(resolve).catch(reject);
                    }, backoffDelayMs);
                  } else {
                    resp.json().then(function(body) {
                      var err = _this._checkStatusForError(resp.status, body) || _getErrorForNonObjectBody(resp.status, body);
                      if (err) {
                        reject(err);
                      } else {
                        resolve({
                          statusCode: resp.status,
                          headers: resp.headers,
                          body
                        });
                      }
                    }).catch(function() {
                      var err = _getErrorForNonObjectBody(resp.status);
                      reject(err);
                    });
                  }
                }).catch(function(err) {
                  clearTimeout(timeout);
                  err = new airtable_error_1.default("CONNECTION_ERROR", err.message, null);
                  reject(err);
                });
              });
            };
            Base2.prototype.runAction = function(method, path, queryParams, bodyData, callback) {
              run_action_1.default(this, method, path, queryParams, bodyData, callback, 0);
            };
            Base2.prototype._getRequestHeaders = function(headers) {
              var result = new http_headers_1.default();
              result.set("Authorization", "Bearer " + this._airtable._apiKey);
              result.set("User-Agent", userAgent);
              result.set("Content-Type", "application/json");
              for (var _i = 0, _a = keys_1.default(headers); _i < _a.length; _i++) {
                var headerKey = _a[_i];
                result.set(headerKey, headers[headerKey]);
              }
              return result.toJSON();
            };
            Base2.prototype._checkStatusForError = function(statusCode, body) {
              var _a = (body !== null && body !== void 0 ? body : { error: {} }).error, error2 = _a === void 0 ? {} : _a;
              var type = error2.type, message = error2.message;
              if (statusCode === 401) {
                return new airtable_error_1.default("AUTHENTICATION_REQUIRED", "You should provide valid api key to perform this operation", statusCode);
              } else if (statusCode === 403) {
                return new airtable_error_1.default("NOT_AUTHORIZED", "You are not authorized to perform this operation", statusCode);
              } else if (statusCode === 404) {
                return new airtable_error_1.default("NOT_FOUND", message !== null && message !== void 0 ? message : "Could not find what you are looking for", statusCode);
              } else if (statusCode === 413) {
                return new airtable_error_1.default("REQUEST_TOO_LARGE", "Request body is too large", statusCode);
              } else if (statusCode === 422) {
                return new airtable_error_1.default(type !== null && type !== void 0 ? type : "UNPROCESSABLE_ENTITY", message !== null && message !== void 0 ? message : "The operation cannot be processed", statusCode);
              } else if (statusCode === 429) {
                return new airtable_error_1.default("TOO_MANY_REQUESTS", "You have made too many requests in a short period of time. Please retry your request later", statusCode);
              } else if (statusCode === 500) {
                return new airtable_error_1.default("SERVER_ERROR", "Try again. If the problem persists, contact support.", statusCode);
              } else if (statusCode === 503) {
                return new airtable_error_1.default("SERVICE_UNAVAILABLE", "The service is temporarily unavailable. Please retry shortly.", statusCode);
              } else if (statusCode >= 400) {
                return new airtable_error_1.default(type !== null && type !== void 0 ? type : "UNEXPECTED_ERROR", message !== null && message !== void 0 ? message : "An unexpected error occurred", statusCode);
              } else {
                return null;
              }
            };
            Base2.prototype.doCall = function(tableName) {
              return this.table(tableName);
            };
            Base2.prototype.getId = function() {
              return this._id;
            };
            Base2.createFunctor = function(airtable, baseId) {
              var base2 = new Base2(airtable, baseId);
              var baseFn = function(tableName) {
                return base2.doCall(tableName);
              };
              baseFn._base = base2;
              baseFn.table = base2.table.bind(base2);
              baseFn.makeRequest = base2.makeRequest.bind(base2);
              baseFn.runAction = base2.runAction.bind(base2);
              baseFn.getId = base2.getId.bind(base2);
              return baseFn;
            };
            return Base2;
          }()
        );
        function _canRequestMethodIncludeBody(method) {
          return method !== "GET" && method !== "DELETE";
        }
        function _getErrorForNonObjectBody(statusCode, body) {
          if (isPlainObject_1.default(body)) {
            return null;
          } else {
            return new airtable_error_1.default("UNEXPECTED_ERROR", "The response from Airtable was invalid JSON. Please try again soon.", statusCode);
          }
        }
        module3.exports = Base;
      }, { "./abort-controller": 1, "./airtable_error": 2, "./exponential_backoff_with_jitter": 6, "./fetch": 7, "./http_headers": 9, "./object_to_query_param_string": 11, "./package_version": 12, "./run_action": 16, "./table": 17, "lodash/get": 77, "lodash/isPlainObject": 89, "lodash/keys": 93 }], 4: [function(require2, module3, exports3) {
        "use strict";
        function callbackToPromise(fn, context, callbackArgIndex) {
          if (callbackArgIndex === void 0) {
            callbackArgIndex = void 0;
          }
          return function() {
            var callArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              callArgs[_i] = arguments[_i];
            }
            var thisCallbackArgIndex;
            if (callbackArgIndex === void 0) {
              thisCallbackArgIndex = callArgs.length > 0 ? callArgs.length - 1 : 0;
            } else {
              thisCallbackArgIndex = callbackArgIndex;
            }
            var callbackArg = callArgs[thisCallbackArgIndex];
            if (typeof callbackArg === "function") {
              fn.apply(context, callArgs);
              return void 0;
            } else {
              var args_1 = [];
              var argLen = Math.max(callArgs.length, thisCallbackArgIndex);
              for (var i = 0; i < argLen; i++) {
                args_1.push(callArgs[i]);
              }
              return new Promise(function(resolve, reject) {
                args_1.push(function(err, result) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                });
                fn.apply(context, args_1);
              });
            }
          };
        }
        module3.exports = callbackToPromise;
      }, {}], 5: [function(require2, module3, exports3) {
        "use strict";
        var didWarnForDeprecation = {};
        function deprecate(fn, key2, message) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (!didWarnForDeprecation[key2]) {
              didWarnForDeprecation[key2] = true;
              console.warn(message);
            }
            fn.apply(this, args);
          };
        }
        module3.exports = deprecate;
      }, {}], 6: [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var internal_config_json_1 = __importDefault(require2("./internal_config.json"));
        function exponentialBackoffWithJitter(numberOfRetries) {
          var rawBackoffTimeMs = internal_config_json_1.default.INITIAL_RETRY_DELAY_IF_RATE_LIMITED * Math.pow(2, numberOfRetries);
          var clippedBackoffTimeMs = Math.min(internal_config_json_1.default.MAX_RETRY_DELAY_IF_RATE_LIMITED, rawBackoffTimeMs);
          var jitteredBackoffTimeMs = Math.random() * clippedBackoffTimeMs;
          return jitteredBackoffTimeMs;
        }
        module3.exports = exponentialBackoffWithJitter;
      }, { "./internal_config.json": 10 }], 7: [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var node_fetch_1 = __importDefault(require2("node-fetch"));
        var browserGlobal = typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : null;
        module3.exports = !browserGlobal ? node_fetch_1.default : browserGlobal.fetch.bind(browserGlobal);
      }, { "node-fetch": 20 }], 8: [function(require2, module3, exports3) {
        "use strict";
        function has(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        }
        module3.exports = has;
      }, {}], 9: [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var keys_1 = __importDefault(require2("lodash/keys"));
        var isBrowser = typeof window !== "undefined";
        var HttpHeaders = (
          /** @class */
          function() {
            function HttpHeaders2() {
              this._headersByLowercasedKey = {};
            }
            HttpHeaders2.prototype.set = function(headerKey, headerValue) {
              var lowercasedKey = headerKey.toLowerCase();
              if (lowercasedKey === "x-airtable-user-agent") {
                lowercasedKey = "user-agent";
                headerKey = "User-Agent";
              }
              this._headersByLowercasedKey[lowercasedKey] = {
                headerKey,
                headerValue
              };
            };
            HttpHeaders2.prototype.toJSON = function() {
              var result = {};
              for (var _i = 0, _a = keys_1.default(this._headersByLowercasedKey); _i < _a.length; _i++) {
                var lowercasedKey = _a[_i];
                var headerDefinition = this._headersByLowercasedKey[lowercasedKey];
                var headerKey = void 0;
                if (isBrowser && lowercasedKey === "user-agent") {
                  headerKey = "X-Airtable-User-Agent";
                } else {
                  headerKey = headerDefinition.headerKey;
                }
                result[headerKey] = headerDefinition.headerValue;
              }
              return result;
            };
            return HttpHeaders2;
          }()
        );
        module3.exports = HttpHeaders;
      }, { "lodash/keys": 93 }], 10: [function(require2, module3, exports3) {
        module3.exports = {
          "INITIAL_RETRY_DELAY_IF_RATE_LIMITED": 5e3,
          "MAX_RETRY_DELAY_IF_RATE_LIMITED": 6e5
        };
      }, {}], 11: [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var isArray_1 = __importDefault(require2("lodash/isArray"));
        var isNil_1 = __importDefault(require2("lodash/isNil"));
        var keys_1 = __importDefault(require2("lodash/keys"));
        function buildParams(prefix2, obj, addFn) {
          if (isArray_1.default(obj)) {
            for (var index4 = 0; index4 < obj.length; index4++) {
              var value = obj[index4];
              if (/\[\]$/.test(prefix2)) {
                addFn(prefix2, value);
              } else {
                buildParams(prefix2 + "[" + (typeof value === "object" && value !== null ? index4 : "") + "]", value, addFn);
              }
            }
          } else if (typeof obj === "object") {
            for (var _i = 0, _a = keys_1.default(obj); _i < _a.length; _i++) {
              var key2 = _a[_i];
              var value = obj[key2];
              buildParams(prefix2 + "[" + key2 + "]", value, addFn);
            }
          } else {
            addFn(prefix2, obj);
          }
        }
        function objectToQueryParamString(obj) {
          var parts = [];
          var addFn = function(key3, value2) {
            value2 = isNil_1.default(value2) ? "" : value2;
            parts.push(encodeURIComponent(key3) + "=" + encodeURIComponent(value2));
          };
          for (var _i = 0, _a = keys_1.default(obj); _i < _a.length; _i++) {
            var key2 = _a[_i];
            var value = obj[key2];
            buildParams(key2, value, addFn);
          }
          return parts.join("&").replace(/%20/g, "+");
        }
        module3.exports = objectToQueryParamString;
      }, { "lodash/isArray": 79, "lodash/isNil": 85, "lodash/keys": 93 }], 12: [function(require2, module3, exports3) {
        "use strict";
        module3.exports = "0.11.6";
      }, {}], 13: [function(require2, module3, exports3) {
        "use strict";
        var __assign = this && this.__assign || function() {
          __assign = Object.assign || function(t) {
            for (var s2, i = 1, n = arguments.length; i < n; i++) {
              s2 = arguments[i];
              for (var p in s2)
                if (Object.prototype.hasOwnProperty.call(s2, p))
                  t[p] = s2[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var isFunction_1 = __importDefault(require2("lodash/isFunction"));
        var keys_1 = __importDefault(require2("lodash/keys"));
        var record_1 = __importDefault(require2("./record"));
        var callback_to_promise_1 = __importDefault(require2("./callback_to_promise"));
        var has_1 = __importDefault(require2("./has"));
        var query_params_1 = require2("./query_params");
        var object_to_query_param_string_1 = __importDefault(require2("./object_to_query_param_string"));
        var Query = (
          /** @class */
          function() {
            function Query2(table, params) {
              this._table = table;
              this._params = params;
              this.firstPage = callback_to_promise_1.default(firstPage, this);
              this.eachPage = callback_to_promise_1.default(eachPage, this, 1);
              this.all = callback_to_promise_1.default(all, this);
            }
            Query2.validateParams = function(params) {
              var validParams = {};
              var ignoredKeys = [];
              var errors = [];
              for (var _i = 0, _a = keys_1.default(params); _i < _a.length; _i++) {
                var key2 = _a[_i];
                var value = params[key2];
                if (has_1.default(Query2.paramValidators, key2)) {
                  var validator2 = Query2.paramValidators[key2];
                  var validationResult = validator2(value);
                  if (validationResult.pass) {
                    validParams[key2] = value;
                  } else {
                    errors.push(validationResult.error);
                  }
                } else {
                  ignoredKeys.push(key2);
                }
              }
              return {
                validParams,
                ignoredKeys,
                errors
              };
            };
            Query2.paramValidators = query_params_1.paramValidators;
            return Query2;
          }()
        );
        function firstPage(done) {
          if (!isFunction_1.default(done)) {
            throw new Error("The first parameter to `firstPage` must be a function");
          }
          this.eachPage(function(records) {
            done(null, records);
          }, function(error2) {
            done(error2, null);
          });
        }
        function eachPage(pageCallback, done) {
          var _this = this;
          if (!isFunction_1.default(pageCallback)) {
            throw new Error("The first parameter to `eachPage` must be a function");
          }
          if (!isFunction_1.default(done) && done !== void 0) {
            throw new Error("The second parameter to `eachPage` must be a function or undefined");
          }
          var params = __assign({}, this._params);
          var pathAndParamsAsString = "/" + this._table._urlEncodedNameOrId() + "?" + object_to_query_param_string_1.default(params);
          var queryParams = {};
          var requestData = null;
          var method;
          var path;
          if (params.method === "post" || pathAndParamsAsString.length > query_params_1.URL_CHARACTER_LENGTH_LIMIT) {
            requestData = params;
            method = "post";
            path = "/" + this._table._urlEncodedNameOrId() + "/listRecords";
            var paramNames = Object.keys(params);
            for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
              var paramName = paramNames_1[_i];
              if (query_params_1.shouldListRecordsParamBePassedAsParameter(paramName)) {
                queryParams[paramName] = params[paramName];
              } else {
                requestData[paramName] = params[paramName];
              }
            }
          } else {
            method = "get";
            queryParams = params;
            path = "/" + this._table._urlEncodedNameOrId();
          }
          var inner = function() {
            _this._table._base.runAction(method, path, queryParams, requestData, function(err, response, result) {
              if (err) {
                done(err, null);
              } else {
                var next = void 0;
                if (result.offset) {
                  params.offset = result.offset;
                  next = inner;
                } else {
                  next = function() {
                    done(null);
                  };
                }
                var records = result.records.map(function(recordJson) {
                  return new record_1.default(_this._table, null, recordJson);
                });
                pageCallback(records, next);
              }
            });
          };
          inner();
        }
        function all(done) {
          if (!isFunction_1.default(done)) {
            throw new Error("The first parameter to `all` must be a function");
          }
          var allRecords = [];
          this.eachPage(function(pageRecords, fetchNextPage) {
            allRecords.push.apply(allRecords, pageRecords);
            fetchNextPage();
          }, function(err) {
            if (err) {
              done(err, null);
            } else {
              done(null, allRecords);
            }
          });
        }
        module3.exports = Query;
      }, { "./callback_to_promise": 4, "./has": 8, "./object_to_query_param_string": 11, "./query_params": 14, "./record": 15, "lodash/isFunction": 83, "lodash/keys": 93 }], 14: [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        Object.defineProperty(exports3, "__esModule", { value: true });
        exports3.shouldListRecordsParamBePassedAsParameter = exports3.URL_CHARACTER_LENGTH_LIMIT = exports3.paramValidators = void 0;
        var typecheck_1 = __importDefault(require2("./typecheck"));
        var isString_1 = __importDefault(require2("lodash/isString"));
        var isNumber_1 = __importDefault(require2("lodash/isNumber"));
        var isPlainObject_1 = __importDefault(require2("lodash/isPlainObject"));
        var isBoolean_1 = __importDefault(require2("lodash/isBoolean"));
        exports3.paramValidators = {
          fields: typecheck_1.default(typecheck_1.default.isArrayOf(isString_1.default), "the value for `fields` should be an array of strings"),
          filterByFormula: typecheck_1.default(isString_1.default, "the value for `filterByFormula` should be a string"),
          maxRecords: typecheck_1.default(isNumber_1.default, "the value for `maxRecords` should be a number"),
          pageSize: typecheck_1.default(isNumber_1.default, "the value for `pageSize` should be a number"),
          offset: typecheck_1.default(isNumber_1.default, "the value for `offset` should be a number"),
          sort: typecheck_1.default(typecheck_1.default.isArrayOf(function(obj) {
            return isPlainObject_1.default(obj) && isString_1.default(obj.field) && (obj.direction === void 0 || ["asc", "desc"].includes(obj.direction));
          }), 'the value for `sort` should be an array of sort objects. Each sort object must have a string `field` value, and an optional `direction` value that is "asc" or "desc".'),
          view: typecheck_1.default(isString_1.default, "the value for `view` should be a string"),
          cellFormat: typecheck_1.default(function(cellFormat) {
            return isString_1.default(cellFormat) && ["json", "string"].includes(cellFormat);
          }, 'the value for `cellFormat` should be "json" or "string"'),
          timeZone: typecheck_1.default(isString_1.default, "the value for `timeZone` should be a string"),
          userLocale: typecheck_1.default(isString_1.default, "the value for `userLocale` should be a string"),
          method: typecheck_1.default(function(method) {
            return isString_1.default(method) && ["get", "post"].includes(method);
          }, 'the value for `method` should be "get" or "post"'),
          returnFieldsByFieldId: typecheck_1.default(isBoolean_1.default, "the value for `returnFieldsByFieldId` should be a boolean")
        };
        exports3.URL_CHARACTER_LENGTH_LIMIT = 15e3;
        exports3.shouldListRecordsParamBePassedAsParameter = function(paramName) {
          return paramName === "timeZone" || paramName === "userLocale";
        };
      }, { "./typecheck": 18, "lodash/isBoolean": 81, "lodash/isNumber": 86, "lodash/isPlainObject": 89, "lodash/isString": 90 }], 15: [function(require2, module3, exports3) {
        "use strict";
        var __assign = this && this.__assign || function() {
          __assign = Object.assign || function(t) {
            for (var s2, i = 1, n = arguments.length; i < n; i++) {
              s2 = arguments[i];
              for (var p in s2)
                if (Object.prototype.hasOwnProperty.call(s2, p))
                  t[p] = s2[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var callback_to_promise_1 = __importDefault(require2("./callback_to_promise"));
        var Record = (
          /** @class */
          function() {
            function Record2(table, recordId, recordJson) {
              this._table = table;
              this.id = recordId || recordJson.id;
              this.setRawJson(recordJson);
              this.save = callback_to_promise_1.default(save, this);
              this.patchUpdate = callback_to_promise_1.default(patchUpdate, this);
              this.putUpdate = callback_to_promise_1.default(putUpdate, this);
              this.destroy = callback_to_promise_1.default(destroy, this);
              this.fetch = callback_to_promise_1.default(fetch2, this);
              this.updateFields = this.patchUpdate;
              this.replaceFields = this.putUpdate;
            }
            Record2.prototype.getId = function() {
              return this.id;
            };
            Record2.prototype.get = function(columnName) {
              return this.fields[columnName];
            };
            Record2.prototype.set = function(columnName, columnValue) {
              this.fields[columnName] = columnValue;
            };
            Record2.prototype.setRawJson = function(rawJson) {
              this._rawJson = rawJson;
              this.fields = this._rawJson && this._rawJson.fields || {};
            };
            return Record2;
          }()
        );
        function save(done) {
          this.putUpdate(this.fields, done);
        }
        function patchUpdate(cellValuesByName, opts, done) {
          var _this = this;
          if (!done) {
            done = opts;
            opts = {};
          }
          var updateBody = __assign({ fields: cellValuesByName }, opts);
          this._table._base.runAction("patch", "/" + this._table._urlEncodedNameOrId() + "/" + this.id, {}, updateBody, function(err, response, results) {
            if (err) {
              done(err);
              return;
            }
            _this.setRawJson(results);
            done(null, _this);
          });
        }
        function putUpdate(cellValuesByName, opts, done) {
          var _this = this;
          if (!done) {
            done = opts;
            opts = {};
          }
          var updateBody = __assign({ fields: cellValuesByName }, opts);
          this._table._base.runAction("put", "/" + this._table._urlEncodedNameOrId() + "/" + this.id, {}, updateBody, function(err, response, results) {
            if (err) {
              done(err);
              return;
            }
            _this.setRawJson(results);
            done(null, _this);
          });
        }
        function destroy(done) {
          var _this = this;
          this._table._base.runAction("delete", "/" + this._table._urlEncodedNameOrId() + "/" + this.id, {}, null, function(err) {
            if (err) {
              done(err);
              return;
            }
            done(null, _this);
          });
        }
        function fetch2(done) {
          var _this = this;
          this._table._base.runAction("get", "/" + this._table._urlEncodedNameOrId() + "/" + this.id, {}, null, function(err, response, results) {
            if (err) {
              done(err);
              return;
            }
            _this.setRawJson(results);
            done(null, _this);
          });
        }
        module3.exports = Record;
      }, { "./callback_to_promise": 4 }], 16: [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var exponential_backoff_with_jitter_1 = __importDefault(require2("./exponential_backoff_with_jitter"));
        var object_to_query_param_string_1 = __importDefault(require2("./object_to_query_param_string"));
        var package_version_1 = __importDefault(require2("./package_version"));
        var fetch_1 = __importDefault(require2("./fetch"));
        var abort_controller_1 = __importDefault(require2("./abort-controller"));
        var userAgent = "Airtable.js/" + package_version_1.default;
        function runAction(base2, method, path, queryParams, bodyData, callback, numAttempts) {
          var url = base2._airtable._endpointUrl + "/v" + base2._airtable._apiVersionMajor + "/" + base2._id + path + "?" + object_to_query_param_string_1.default(queryParams);
          var headers = {
            authorization: "Bearer " + base2._airtable._apiKey,
            "x-api-version": base2._airtable._apiVersion,
            "x-airtable-application-id": base2.getId(),
            "content-type": "application/json"
          };
          var isBrowser = typeof window !== "undefined";
          if (isBrowser) {
            headers["x-airtable-user-agent"] = userAgent;
          } else {
            headers["User-Agent"] = userAgent;
          }
          var controller = new abort_controller_1.default();
          var normalizedMethod = method.toUpperCase();
          var options2 = {
            method: normalizedMethod,
            headers,
            signal: controller.signal
          };
          if (bodyData !== null) {
            if (normalizedMethod === "GET" || normalizedMethod === "HEAD") {
              console.warn("body argument to runAction are ignored with GET or HEAD requests");
            } else {
              options2.body = JSON.stringify(bodyData);
            }
          }
          var timeout = setTimeout(function() {
            controller.abort();
          }, base2._airtable._requestTimeout);
          fetch_1.default(url, options2).then(function(resp) {
            clearTimeout(timeout);
            if (resp.status === 429 && !base2._airtable._noRetryIfRateLimited) {
              var backoffDelayMs = exponential_backoff_with_jitter_1.default(numAttempts);
              setTimeout(function() {
                runAction(base2, method, path, queryParams, bodyData, callback, numAttempts + 1);
              }, backoffDelayMs);
            } else {
              resp.json().then(function(body) {
                var error2 = base2._checkStatusForError(resp.status, body);
                var r = {};
                Object.keys(resp).forEach(function(property) {
                  r[property] = resp[property];
                });
                r.body = body;
                r.statusCode = resp.status;
                callback(error2, r, body);
              }).catch(function() {
                callback(base2._checkStatusForError(resp.status));
              });
            }
          }).catch(function(error2) {
            clearTimeout(timeout);
            callback(error2);
          });
        }
        module3.exports = runAction;
      }, { "./abort-controller": 1, "./exponential_backoff_with_jitter": 6, "./fetch": 7, "./object_to_query_param_string": 11, "./package_version": 12 }], 17: [function(require2, module3, exports3) {
        "use strict";
        var __assign = this && this.__assign || function() {
          __assign = Object.assign || function(t) {
            for (var s2, i = 1, n = arguments.length; i < n; i++) {
              s2 = arguments[i];
              for (var p in s2)
                if (Object.prototype.hasOwnProperty.call(s2, p))
                  t[p] = s2[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var isPlainObject_1 = __importDefault(require2("lodash/isPlainObject"));
        var deprecate_1 = __importDefault(require2("./deprecate"));
        var query_1 = __importDefault(require2("./query"));
        var query_params_1 = require2("./query_params");
        var object_to_query_param_string_1 = __importDefault(require2("./object_to_query_param_string"));
        var record_1 = __importDefault(require2("./record"));
        var callback_to_promise_1 = __importDefault(require2("./callback_to_promise"));
        var Table = (
          /** @class */
          function() {
            function Table2(base2, tableId, tableName) {
              if (!tableId && !tableName) {
                throw new Error("Table name or table ID is required");
              }
              this._base = base2;
              this.id = tableId;
              this.name = tableName;
              this.find = callback_to_promise_1.default(this._findRecordById, this);
              this.select = this._selectRecords.bind(this);
              this.create = callback_to_promise_1.default(this._createRecords, this);
              this.update = callback_to_promise_1.default(this._updateRecords.bind(this, false), this);
              this.replace = callback_to_promise_1.default(this._updateRecords.bind(this, true), this);
              this.destroy = callback_to_promise_1.default(this._destroyRecord, this);
              this.list = deprecate_1.default(this._listRecords.bind(this), "table.list", "Airtable: `list()` is deprecated. Use `select()` instead.");
              this.forEach = deprecate_1.default(this._forEachRecord.bind(this), "table.forEach", "Airtable: `forEach()` is deprecated. Use `select()` instead.");
            }
            Table2.prototype._findRecordById = function(recordId, done) {
              var record = new record_1.default(this, recordId);
              record.fetch(done);
            };
            Table2.prototype._selectRecords = function(params) {
              if (params === void 0) {
                params = {};
              }
              if (arguments.length > 1) {
                console.warn("Airtable: `select` takes only one parameter, but it was given " + arguments.length + " parameters. Use `eachPage` or `firstPage` to fetch records.");
              }
              if (isPlainObject_1.default(params)) {
                var validationResults = query_1.default.validateParams(params);
                if (validationResults.errors.length) {
                  var formattedErrors = validationResults.errors.map(function(error2) {
                    return "  * " + error2;
                  });
                  throw new Error("Airtable: invalid parameters for `select`:\n" + formattedErrors.join("\n"));
                }
                if (validationResults.ignoredKeys.length) {
                  console.warn("Airtable: the following parameters to `select` will be ignored: " + validationResults.ignoredKeys.join(", "));
                }
                return new query_1.default(this, validationResults.validParams);
              } else {
                throw new Error("Airtable: the parameter for `select` should be a plain object or undefined.");
              }
            };
            Table2.prototype._urlEncodedNameOrId = function() {
              return this.id || encodeURIComponent(this.name);
            };
            Table2.prototype._createRecords = function(recordsData, optionalParameters, done) {
              var _this = this;
              var isCreatingMultipleRecords = Array.isArray(recordsData);
              if (!done) {
                done = optionalParameters;
                optionalParameters = {};
              }
              var requestData;
              if (isCreatingMultipleRecords) {
                requestData = __assign({ records: recordsData }, optionalParameters);
              } else {
                requestData = __assign({ fields: recordsData }, optionalParameters);
              }
              this._base.runAction("post", "/" + this._urlEncodedNameOrId() + "/", {}, requestData, function(err, resp, body) {
                if (err) {
                  done(err);
                  return;
                }
                var result;
                if (isCreatingMultipleRecords) {
                  result = body.records.map(function(record) {
                    return new record_1.default(_this, record.id, record);
                  });
                } else {
                  result = new record_1.default(_this, body.id, body);
                }
                done(null, result);
              });
            };
            Table2.prototype._updateRecords = function(isDestructiveUpdate, recordsDataOrRecordId, recordDataOrOptsOrDone, optsOrDone, done) {
              var _this = this;
              var opts;
              if (Array.isArray(recordsDataOrRecordId)) {
                var recordsData = recordsDataOrRecordId;
                opts = isPlainObject_1.default(recordDataOrOptsOrDone) ? recordDataOrOptsOrDone : {};
                done = optsOrDone || recordDataOrOptsOrDone;
                var method = isDestructiveUpdate ? "put" : "patch";
                var requestData = __assign({ records: recordsData }, opts);
                this._base.runAction(method, "/" + this._urlEncodedNameOrId() + "/", {}, requestData, function(err, resp, body) {
                  if (err) {
                    done(err);
                    return;
                  }
                  var result = body.records.map(function(record2) {
                    return new record_1.default(_this, record2.id, record2);
                  });
                  done(null, result);
                });
              } else {
                var recordId = recordsDataOrRecordId;
                var recordData = recordDataOrOptsOrDone;
                opts = isPlainObject_1.default(optsOrDone) ? optsOrDone : {};
                done = done || optsOrDone;
                var record = new record_1.default(this, recordId);
                if (isDestructiveUpdate) {
                  record.putUpdate(recordData, opts, done);
                } else {
                  record.patchUpdate(recordData, opts, done);
                }
              }
            };
            Table2.prototype._destroyRecord = function(recordIdsOrId, done) {
              var _this = this;
              if (Array.isArray(recordIdsOrId)) {
                var queryParams = { records: recordIdsOrId };
                this._base.runAction("delete", "/" + this._urlEncodedNameOrId(), queryParams, null, function(err, response, results) {
                  if (err) {
                    done(err);
                    return;
                  }
                  var records = results.records.map(function(_a) {
                    var id = _a.id;
                    return new record_1.default(_this, id, null);
                  });
                  done(null, records);
                });
              } else {
                var record = new record_1.default(this, recordIdsOrId);
                record.destroy(done);
              }
            };
            Table2.prototype._listRecords = function(pageSize, offset, opts, done) {
              var _this = this;
              if (!done) {
                done = opts;
                opts = {};
              }
              var pathAndParamsAsString = "/" + this._urlEncodedNameOrId() + "?" + object_to_query_param_string_1.default(opts);
              var path;
              var listRecordsParameters = {};
              var listRecordsData = null;
              var method;
              if (typeof opts !== "function" && opts.method === "post" || pathAndParamsAsString.length > query_params_1.URL_CHARACTER_LENGTH_LIMIT) {
                path = "/" + this._urlEncodedNameOrId() + "/listRecords";
                listRecordsData = __assign(__assign({}, pageSize && { pageSize }), offset && { offset });
                method = "post";
                var paramNames = Object.keys(opts);
                for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
                  var paramName = paramNames_1[_i];
                  if (query_params_1.shouldListRecordsParamBePassedAsParameter(paramName)) {
                    listRecordsParameters[paramName] = opts[paramName];
                  } else {
                    listRecordsData[paramName] = opts[paramName];
                  }
                }
              } else {
                method = "get";
                path = "/" + this._urlEncodedNameOrId() + "/";
                listRecordsParameters = __assign({ limit: pageSize, offset }, opts);
              }
              this._base.runAction(method, path, listRecordsParameters, listRecordsData, function(err, response, results) {
                if (err) {
                  done(err);
                  return;
                }
                var records = results.records.map(function(recordJson) {
                  return new record_1.default(_this, null, recordJson);
                });
                done(null, records, results.offset);
              });
            };
            Table2.prototype._forEachRecord = function(opts, callback, done) {
              var _this = this;
              if (arguments.length === 2) {
                done = callback;
                callback = opts;
                opts = {};
              }
              var limit = Table2.__recordsPerPageForIteration || 100;
              var offset = null;
              var nextPage = function() {
                _this._listRecords(limit, offset, opts, function(err, page2, newOffset) {
                  if (err) {
                    done(err);
                    return;
                  }
                  for (var index4 = 0; index4 < page2.length; index4++) {
                    callback(page2[index4]);
                  }
                  if (newOffset) {
                    offset = newOffset;
                    nextPage();
                  } else {
                    done();
                  }
                });
              };
              nextPage();
            };
            return Table2;
          }()
        );
        module3.exports = Table;
      }, { "./callback_to_promise": 4, "./deprecate": 5, "./object_to_query_param_string": 11, "./query": 13, "./query_params": 14, "./record": 15, "lodash/isPlainObject": 89 }], 18: [function(require2, module3, exports3) {
        "use strict";
        function check(fn, error2) {
          return function(value) {
            if (fn(value)) {
              return { pass: true };
            } else {
              return { pass: false, error: error2 };
            }
          };
        }
        check.isOneOf = function isOneOf(options2) {
          return options2.includes.bind(options2);
        };
        check.isArrayOf = function(itemValidator) {
          return function(value) {
            return Array.isArray(value) && value.every(itemValidator);
          };
        };
        module3.exports = check;
      }, {}], 19: [function(require2, module3, exports3) {
        "use strict";
        Object.defineProperty(exports3, "__esModule", { value: true });
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass)
            _setPrototypeOf(subClass, superClass);
        }
        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
            return o2.__proto__ || Object.getPrototypeOf(o2);
          };
          return _getPrototypeOf(o);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
            o2.__proto__ = p2;
            return o2;
          };
          return _setPrototypeOf(o, p);
        }
        function _assertThisInitialized(self2) {
          if (self2 === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return self2;
        }
        function _possibleConstructorReturn(self2, call) {
          if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
          }
          return _assertThisInitialized(self2);
        }
        function _superPropBase(object, property) {
          while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null)
              break;
          }
          return object;
        }
        function _get(target, property, receiver) {
          if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
          } else {
            _get = function _get2(target2, property2, receiver2) {
              var base2 = _superPropBase(target2, property2);
              if (!base2)
                return;
              var desc = Object.getOwnPropertyDescriptor(base2, property2);
              if (desc.get) {
                return desc.get.call(receiver2);
              }
              return desc.value;
            };
          }
          return _get(target, property, receiver || target);
        }
        var Emitter = /* @__PURE__ */ function() {
          function Emitter2() {
            _classCallCheck(this, Emitter2);
            Object.defineProperty(this, "listeners", {
              value: {},
              writable: true,
              configurable: true
            });
          }
          _createClass(Emitter2, [{
            key: "addEventListener",
            value: function addEventListener(type, callback) {
              if (!(type in this.listeners)) {
                this.listeners[type] = [];
              }
              this.listeners[type].push(callback);
            }
          }, {
            key: "removeEventListener",
            value: function removeEventListener(type, callback) {
              if (!(type in this.listeners)) {
                return;
              }
              var stack = this.listeners[type];
              for (var i = 0, l = stack.length; i < l; i++) {
                if (stack[i] === callback) {
                  stack.splice(i, 1);
                  return;
                }
              }
            }
          }, {
            key: "dispatchEvent",
            value: function dispatchEvent(event) {
              var _this = this;
              if (!(event.type in this.listeners)) {
                return;
              }
              var debounce = function debounce2(callback) {
                setTimeout(function() {
                  return callback.call(_this, event);
                });
              };
              var stack = this.listeners[event.type];
              for (var i = 0, l = stack.length; i < l; i++) {
                debounce(stack[i]);
              }
              return !event.defaultPrevented;
            }
          }]);
          return Emitter2;
        }();
        var AbortSignal = /* @__PURE__ */ function(_Emitter) {
          _inherits(AbortSignal2, _Emitter);
          function AbortSignal2() {
            var _this2;
            _classCallCheck(this, AbortSignal2);
            _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AbortSignal2).call(this));
            if (!_this2.listeners) {
              Emitter.call(_assertThisInitialized(_this2));
            }
            Object.defineProperty(_assertThisInitialized(_this2), "aborted", {
              value: false,
              writable: true,
              configurable: true
            });
            Object.defineProperty(_assertThisInitialized(_this2), "onabort", {
              value: null,
              writable: true,
              configurable: true
            });
            return _this2;
          }
          _createClass(AbortSignal2, [{
            key: "toString",
            value: function toString() {
              return "[object AbortSignal]";
            }
          }, {
            key: "dispatchEvent",
            value: function dispatchEvent(event) {
              if (event.type === "abort") {
                this.aborted = true;
                if (typeof this.onabort === "function") {
                  this.onabort.call(this, event);
                }
              }
              _get(_getPrototypeOf(AbortSignal2.prototype), "dispatchEvent", this).call(this, event);
            }
          }]);
          return AbortSignal2;
        }(Emitter);
        var AbortController = /* @__PURE__ */ function() {
          function AbortController2() {
            _classCallCheck(this, AbortController2);
            Object.defineProperty(this, "signal", {
              value: new AbortSignal(),
              writable: true,
              configurable: true
            });
          }
          _createClass(AbortController2, [{
            key: "abort",
            value: function abort() {
              var event;
              try {
                event = new Event("abort");
              } catch (e) {
                if (typeof document !== "undefined") {
                  if (!document.createEvent) {
                    event = document.createEventObject();
                    event.type = "abort";
                  } else {
                    event = document.createEvent("Event");
                    event.initEvent("abort", false, false);
                  }
                } else {
                  event = {
                    type: "abort",
                    bubbles: false,
                    cancelable: false
                  };
                }
              }
              this.signal.dispatchEvent(event);
            }
          }, {
            key: "toString",
            value: function toString() {
              return "[object AbortController]";
            }
          }]);
          return AbortController2;
        }();
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          AbortController.prototype[Symbol.toStringTag] = "AbortController";
          AbortSignal.prototype[Symbol.toStringTag] = "AbortSignal";
        }
        function polyfillNeeded(self2) {
          if (self2.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
            console.log("__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill");
            return true;
          }
          return typeof self2.Request === "function" && !self2.Request.prototype.hasOwnProperty("signal") || !self2.AbortController;
        }
        function abortableFetchDecorator(patchTargets) {
          if ("function" === typeof patchTargets) {
            patchTargets = {
              fetch: patchTargets
            };
          }
          var _patchTargets = patchTargets, fetch2 = _patchTargets.fetch, _patchTargets$Request = _patchTargets.Request, NativeRequest = _patchTargets$Request === void 0 ? fetch2.Request : _patchTargets$Request, NativeAbortController = _patchTargets.AbortController, _patchTargets$__FORCE = _patchTargets.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL, __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL = _patchTargets$__FORCE === void 0 ? false : _patchTargets$__FORCE;
          if (!polyfillNeeded({
            fetch: fetch2,
            Request: NativeRequest,
            AbortController: NativeAbortController,
            __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
          })) {
            return {
              fetch: fetch2,
              Request: Request2
            };
          }
          var Request2 = NativeRequest;
          if (Request2 && !Request2.prototype.hasOwnProperty("signal") || __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL) {
            Request2 = function Request3(input, init2) {
              var signal;
              if (init2 && init2.signal) {
                signal = init2.signal;
                delete init2.signal;
              }
              var request = new NativeRequest(input, init2);
              if (signal) {
                Object.defineProperty(request, "signal", {
                  writable: false,
                  enumerable: false,
                  configurable: true,
                  value: signal
                });
              }
              return request;
            };
            Request2.prototype = NativeRequest.prototype;
          }
          var realFetch = fetch2;
          var abortableFetch = function abortableFetch2(input, init2) {
            var signal = Request2 && Request2.prototype.isPrototypeOf(input) ? input.signal : init2 ? init2.signal : void 0;
            if (signal) {
              var abortError;
              try {
                abortError = new DOMException("Aborted", "AbortError");
              } catch (err) {
                abortError = new Error("Aborted");
                abortError.name = "AbortError";
              }
              if (signal.aborted) {
                return Promise.reject(abortError);
              }
              var cancellation = new Promise(function(_, reject) {
                signal.addEventListener("abort", function() {
                  return reject(abortError);
                }, {
                  once: true
                });
              });
              if (init2 && init2.signal) {
                delete init2.signal;
              }
              return Promise.race([cancellation, realFetch(input, init2)]);
            }
            return realFetch(input, init2);
          };
          return {
            fetch: abortableFetch,
            Request: Request2
          };
        }
        exports3.AbortController = AbortController;
        exports3.AbortSignal = AbortSignal;
        exports3.abortableFetch = abortableFetchDecorator;
      }, {}], 20: [function(require2, module3, exports3) {
      }, {}], 21: [function(require2, module3, exports3) {
        var hashClear = require2("./_hashClear"), hashDelete = require2("./_hashDelete"), hashGet = require2("./_hashGet"), hashHas = require2("./_hashHas"), hashSet = require2("./_hashSet");
        function Hash(entries) {
          var index4 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index4 < length) {
            var entry = entries[index4];
            this.set(entry[0], entry[1]);
          }
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        module3.exports = Hash;
      }, { "./_hashClear": 46, "./_hashDelete": 47, "./_hashGet": 48, "./_hashHas": 49, "./_hashSet": 50 }], 22: [function(require2, module3, exports3) {
        var listCacheClear = require2("./_listCacheClear"), listCacheDelete = require2("./_listCacheDelete"), listCacheGet = require2("./_listCacheGet"), listCacheHas = require2("./_listCacheHas"), listCacheSet = require2("./_listCacheSet");
        function ListCache(entries) {
          var index4 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index4 < length) {
            var entry = entries[index4];
            this.set(entry[0], entry[1]);
          }
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        module3.exports = ListCache;
      }, { "./_listCacheClear": 56, "./_listCacheDelete": 57, "./_listCacheGet": 58, "./_listCacheHas": 59, "./_listCacheSet": 60 }], 23: [function(require2, module3, exports3) {
        var getNative = require2("./_getNative"), root = require2("./_root");
        var Map2 = getNative(root, "Map");
        module3.exports = Map2;
      }, { "./_getNative": 42, "./_root": 72 }], 24: [function(require2, module3, exports3) {
        var mapCacheClear = require2("./_mapCacheClear"), mapCacheDelete = require2("./_mapCacheDelete"), mapCacheGet = require2("./_mapCacheGet"), mapCacheHas = require2("./_mapCacheHas"), mapCacheSet = require2("./_mapCacheSet");
        function MapCache(entries) {
          var index4 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index4 < length) {
            var entry = entries[index4];
            this.set(entry[0], entry[1]);
          }
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        module3.exports = MapCache;
      }, { "./_mapCacheClear": 61, "./_mapCacheDelete": 62, "./_mapCacheGet": 63, "./_mapCacheHas": 64, "./_mapCacheSet": 65 }], 25: [function(require2, module3, exports3) {
        var root = require2("./_root");
        var Symbol2 = root.Symbol;
        module3.exports = Symbol2;
      }, { "./_root": 72 }], 26: [function(require2, module3, exports3) {
        var baseTimes = require2("./_baseTimes"), isArguments = require2("./isArguments"), isArray = require2("./isArray"), isBuffer = require2("./isBuffer"), isIndex = require2("./_isIndex"), isTypedArray = require2("./isTypedArray");
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
          for (var key2 in value) {
            if ((inherited || hasOwnProperty.call(value, key2)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key2 == "offset" || key2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || // Skip index properties.
            isIndex(key2, length)))) {
              result.push(key2);
            }
          }
          return result;
        }
        module3.exports = arrayLikeKeys;
      }, { "./_baseTimes": 35, "./_isIndex": 51, "./isArguments": 78, "./isArray": 79, "./isBuffer": 82, "./isTypedArray": 92 }], 27: [function(require2, module3, exports3) {
        function arrayMap(array2, iteratee) {
          var index4 = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
          while (++index4 < length) {
            result[index4] = iteratee(array2[index4], index4, array2);
          }
          return result;
        }
        module3.exports = arrayMap;
      }, {}], 28: [function(require2, module3, exports3) {
        var eq = require2("./eq");
        function assocIndexOf(array2, key2) {
          var length = array2.length;
          while (length--) {
            if (eq(array2[length][0], key2)) {
              return length;
            }
          }
          return -1;
        }
        module3.exports = assocIndexOf;
      }, { "./eq": 76 }], 29: [function(require2, module3, exports3) {
        var castPath = require2("./_castPath"), toKey = require2("./_toKey");
        function baseGet(object, path) {
          path = castPath(path, object);
          var index4 = 0, length = path.length;
          while (object != null && index4 < length) {
            object = object[toKey(path[index4++])];
          }
          return index4 && index4 == length ? object : void 0;
        }
        module3.exports = baseGet;
      }, { "./_castPath": 38, "./_toKey": 74 }], 30: [function(require2, module3, exports3) {
        var Symbol2 = require2("./_Symbol"), getRawTag = require2("./_getRawTag"), objectToString = require2("./_objectToString");
        var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
        var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
        function baseGetTag(value) {
          if (value == null) {
            return value === void 0 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
        }
        module3.exports = baseGetTag;
      }, { "./_Symbol": 25, "./_getRawTag": 44, "./_objectToString": 70 }], 31: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isObjectLike = require2("./isObjectLike");
        var argsTag = "[object Arguments]";
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        module3.exports = baseIsArguments;
      }, { "./_baseGetTag": 30, "./isObjectLike": 88 }], 32: [function(require2, module3, exports3) {
        var isFunction = require2("./isFunction"), isMasked = require2("./_isMasked"), isObject = require2("./isObject"), toSource = require2("./_toSource");
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var funcProto = Function.prototype, objectProto = Object.prototype;
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var reIsNative = RegExp(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern2 = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern2.test(toSource(value));
        }
        module3.exports = baseIsNative;
      }, { "./_isMasked": 54, "./_toSource": 75, "./isFunction": 83, "./isObject": 87 }], 33: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isLength = require2("./isLength"), isObjectLike = require2("./isObjectLike");
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        module3.exports = baseIsTypedArray;
      }, { "./_baseGetTag": 30, "./isLength": 84, "./isObjectLike": 88 }], 34: [function(require2, module3, exports3) {
        var isPrototype = require2("./_isPrototype"), nativeKeys = require2("./_nativeKeys");
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result = [];
          for (var key2 in Object(object)) {
            if (hasOwnProperty.call(object, key2) && key2 != "constructor") {
              result.push(key2);
            }
          }
          return result;
        }
        module3.exports = baseKeys;
      }, { "./_isPrototype": 55, "./_nativeKeys": 68 }], 35: [function(require2, module3, exports3) {
        function baseTimes(n, iteratee) {
          var index4 = -1, result = Array(n);
          while (++index4 < n) {
            result[index4] = iteratee(index4);
          }
          return result;
        }
        module3.exports = baseTimes;
      }, {}], 36: [function(require2, module3, exports3) {
        var Symbol2 = require2("./_Symbol"), arrayMap = require2("./_arrayMap"), isArray = require2("./isArray"), isSymbol = require2("./isSymbol");
        var INFINITY = 1 / 0;
        var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result = value + "";
          return result == "0" && 1 / value == -INFINITY ? "-0" : result;
        }
        module3.exports = baseToString;
      }, { "./_Symbol": 25, "./_arrayMap": 27, "./isArray": 79, "./isSymbol": 91 }], 37: [function(require2, module3, exports3) {
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        module3.exports = baseUnary;
      }, {}], 38: [function(require2, module3, exports3) {
        var isArray = require2("./isArray"), isKey = require2("./_isKey"), stringToPath = require2("./_stringToPath"), toString = require2("./toString");
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        module3.exports = castPath;
      }, { "./_isKey": 52, "./_stringToPath": 73, "./isArray": 79, "./toString": 96 }], 39: [function(require2, module3, exports3) {
        var root = require2("./_root");
        var coreJsData = root["__core-js_shared__"];
        module3.exports = coreJsData;
      }, { "./_root": 72 }], 40: [function(require2, module3, exports3) {
        (function(global2) {
          var freeGlobal = typeof global2 == "object" && global2 && global2.Object === Object && global2;
          module3.exports = freeGlobal;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 41: [function(require2, module3, exports3) {
        var isKeyable = require2("./_isKeyable");
        function getMapData(map, key2) {
          var data = map.__data__;
          return isKeyable(key2) ? data[typeof key2 == "string" ? "string" : "hash"] : data.map;
        }
        module3.exports = getMapData;
      }, { "./_isKeyable": 53 }], 42: [function(require2, module3, exports3) {
        var baseIsNative = require2("./_baseIsNative"), getValue = require2("./_getValue");
        function getNative(object, key2) {
          var value = getValue(object, key2);
          return baseIsNative(value) ? value : void 0;
        }
        module3.exports = getNative;
      }, { "./_baseIsNative": 32, "./_getValue": 45 }], 43: [function(require2, module3, exports3) {
        var overArg = require2("./_overArg");
        var getPrototype = overArg(Object.getPrototypeOf, Object);
        module3.exports = getPrototype;
      }, { "./_overArg": 71 }], 44: [function(require2, module3, exports3) {
        var Symbol2 = require2("./_Symbol");
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var nativeObjectToString = objectProto.toString;
        var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = void 0;
            var unmasked = true;
          } catch (e) {
          }
          var result = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result;
        }
        module3.exports = getRawTag;
      }, { "./_Symbol": 25 }], 45: [function(require2, module3, exports3) {
        function getValue(object, key2) {
          return object == null ? void 0 : object[key2];
        }
        module3.exports = getValue;
      }, {}], 46: [function(require2, module3, exports3) {
        var nativeCreate = require2("./_nativeCreate");
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        module3.exports = hashClear;
      }, { "./_nativeCreate": 67 }], 47: [function(require2, module3, exports3) {
        function hashDelete(key2) {
          var result = this.has(key2) && delete this.__data__[key2];
          this.size -= result ? 1 : 0;
          return result;
        }
        module3.exports = hashDelete;
      }, {}], 48: [function(require2, module3, exports3) {
        var nativeCreate = require2("./_nativeCreate");
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function hashGet(key2) {
          var data = this.__data__;
          if (nativeCreate) {
            var result = data[key2];
            return result === HASH_UNDEFINED ? void 0 : result;
          }
          return hasOwnProperty.call(data, key2) ? data[key2] : void 0;
        }
        module3.exports = hashGet;
      }, { "./_nativeCreate": 67 }], 49: [function(require2, module3, exports3) {
        var nativeCreate = require2("./_nativeCreate");
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function hashHas(key2) {
          var data = this.__data__;
          return nativeCreate ? data[key2] !== void 0 : hasOwnProperty.call(data, key2);
        }
        module3.exports = hashHas;
      }, { "./_nativeCreate": 67 }], 50: [function(require2, module3, exports3) {
        var nativeCreate = require2("./_nativeCreate");
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        function hashSet(key2, value) {
          var data = this.__data__;
          this.size += this.has(key2) ? 0 : 1;
          data[key2] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
          return this;
        }
        module3.exports = hashSet;
      }, { "./_nativeCreate": 67 }], 51: [function(require2, module3, exports3) {
        var MAX_SAFE_INTEGER = 9007199254740991;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        module3.exports = isIndex;
      }, {}], 52: [function(require2, module3, exports3) {
        var isArray = require2("./isArray"), isSymbol = require2("./isSymbol");
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
        }
        module3.exports = isKey;
      }, { "./isArray": 79, "./isSymbol": 91 }], 53: [function(require2, module3, exports3) {
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        module3.exports = isKeyable;
      }, {}], 54: [function(require2, module3, exports3) {
        var coreJsData = require2("./_coreJsData");
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        module3.exports = isMasked;
      }, { "./_coreJsData": 39 }], 55: [function(require2, module3, exports3) {
        var objectProto = Object.prototype;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        module3.exports = isPrototype;
      }, {}], 56: [function(require2, module3, exports3) {
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        module3.exports = listCacheClear;
      }, {}], 57: [function(require2, module3, exports3) {
        var assocIndexOf = require2("./_assocIndexOf");
        var arrayProto = Array.prototype;
        var splice = arrayProto.splice;
        function listCacheDelete(key2) {
          var data = this.__data__, index4 = assocIndexOf(data, key2);
          if (index4 < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index4 == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index4, 1);
          }
          --this.size;
          return true;
        }
        module3.exports = listCacheDelete;
      }, { "./_assocIndexOf": 28 }], 58: [function(require2, module3, exports3) {
        var assocIndexOf = require2("./_assocIndexOf");
        function listCacheGet(key2) {
          var data = this.__data__, index4 = assocIndexOf(data, key2);
          return index4 < 0 ? void 0 : data[index4][1];
        }
        module3.exports = listCacheGet;
      }, { "./_assocIndexOf": 28 }], 59: [function(require2, module3, exports3) {
        var assocIndexOf = require2("./_assocIndexOf");
        function listCacheHas(key2) {
          return assocIndexOf(this.__data__, key2) > -1;
        }
        module3.exports = listCacheHas;
      }, { "./_assocIndexOf": 28 }], 60: [function(require2, module3, exports3) {
        var assocIndexOf = require2("./_assocIndexOf");
        function listCacheSet(key2, value) {
          var data = this.__data__, index4 = assocIndexOf(data, key2);
          if (index4 < 0) {
            ++this.size;
            data.push([key2, value]);
          } else {
            data[index4][1] = value;
          }
          return this;
        }
        module3.exports = listCacheSet;
      }, { "./_assocIndexOf": 28 }], 61: [function(require2, module3, exports3) {
        var Hash = require2("./_Hash"), ListCache = require2("./_ListCache"), Map2 = require2("./_Map");
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        module3.exports = mapCacheClear;
      }, { "./_Hash": 21, "./_ListCache": 22, "./_Map": 23 }], 62: [function(require2, module3, exports3) {
        var getMapData = require2("./_getMapData");
        function mapCacheDelete(key2) {
          var result = getMapData(this, key2)["delete"](key2);
          this.size -= result ? 1 : 0;
          return result;
        }
        module3.exports = mapCacheDelete;
      }, { "./_getMapData": 41 }], 63: [function(require2, module3, exports3) {
        var getMapData = require2("./_getMapData");
        function mapCacheGet(key2) {
          return getMapData(this, key2).get(key2);
        }
        module3.exports = mapCacheGet;
      }, { "./_getMapData": 41 }], 64: [function(require2, module3, exports3) {
        var getMapData = require2("./_getMapData");
        function mapCacheHas(key2) {
          return getMapData(this, key2).has(key2);
        }
        module3.exports = mapCacheHas;
      }, { "./_getMapData": 41 }], 65: [function(require2, module3, exports3) {
        var getMapData = require2("./_getMapData");
        function mapCacheSet(key2, value) {
          var data = getMapData(this, key2), size = data.size;
          data.set(key2, value);
          this.size += data.size == size ? 0 : 1;
          return this;
        }
        module3.exports = mapCacheSet;
      }, { "./_getMapData": 41 }], 66: [function(require2, module3, exports3) {
        var memoize = require2("./memoize");
        var MAX_MEMOIZE_SIZE = 500;
        function memoizeCapped(func) {
          var result = memoize(func, function(key2) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key2;
          });
          var cache = result.cache;
          return result;
        }
        module3.exports = memoizeCapped;
      }, { "./memoize": 94 }], 67: [function(require2, module3, exports3) {
        var getNative = require2("./_getNative");
        var nativeCreate = getNative(Object, "create");
        module3.exports = nativeCreate;
      }, { "./_getNative": 42 }], 68: [function(require2, module3, exports3) {
        var overArg = require2("./_overArg");
        var nativeKeys = overArg(Object.keys, Object);
        module3.exports = nativeKeys;
      }, { "./_overArg": 71 }], 69: [function(require2, module3, exports3) {
        var freeGlobal = require2("./_freeGlobal");
        var freeExports = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
        var freeModule = freeExports && typeof module3 == "object" && module3 && !module3.nodeType && module3;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        module3.exports = nodeUtil;
      }, { "./_freeGlobal": 40 }], 70: [function(require2, module3, exports3) {
        var objectProto = Object.prototype;
        var nativeObjectToString = objectProto.toString;
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        module3.exports = objectToString;
      }, {}], 71: [function(require2, module3, exports3) {
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        module3.exports = overArg;
      }, {}], 72: [function(require2, module3, exports3) {
        var freeGlobal = require2("./_freeGlobal");
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        module3.exports = root;
      }, { "./_freeGlobal": 40 }], 73: [function(require2, module3, exports3) {
        var memoizeCapped = require2("./_memoizeCapped");
        var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reEscapeChar = /\\(\\)?/g;
        var stringToPath = memoizeCapped(function(string) {
          var result = [];
          if (string.charCodeAt(0) === 46) {
            result.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result;
        });
        module3.exports = stringToPath;
      }, { "./_memoizeCapped": 66 }], 74: [function(require2, module3, exports3) {
        var isSymbol = require2("./isSymbol");
        var INFINITY = 1 / 0;
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result = value + "";
          return result == "0" && 1 / value == -INFINITY ? "-0" : result;
        }
        module3.exports = toKey;
      }, { "./isSymbol": 91 }], 75: [function(require2, module3, exports3) {
        var funcProto = Function.prototype;
        var funcToString = funcProto.toString;
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        module3.exports = toSource;
      }, {}], 76: [function(require2, module3, exports3) {
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        module3.exports = eq;
      }, {}], 77: [function(require2, module3, exports3) {
        var baseGet = require2("./_baseGet");
        function get(object, path, defaultValue) {
          var result = object == null ? void 0 : baseGet(object, path);
          return result === void 0 ? defaultValue : result;
        }
        module3.exports = get;
      }, { "./_baseGet": 29 }], 78: [function(require2, module3, exports3) {
        var baseIsArguments = require2("./_baseIsArguments"), isObjectLike = require2("./isObjectLike");
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var propertyIsEnumerable = objectProto.propertyIsEnumerable;
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        module3.exports = isArguments;
      }, { "./_baseIsArguments": 31, "./isObjectLike": 88 }], 79: [function(require2, module3, exports3) {
        var isArray = Array.isArray;
        module3.exports = isArray;
      }, {}], 80: [function(require2, module3, exports3) {
        var isFunction = require2("./isFunction"), isLength = require2("./isLength");
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        module3.exports = isArrayLike;
      }, { "./isFunction": 83, "./isLength": 84 }], 81: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isObjectLike = require2("./isObjectLike");
        var boolTag = "[object Boolean]";
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        module3.exports = isBoolean;
      }, { "./_baseGetTag": 30, "./isObjectLike": 88 }], 82: [function(require2, module3, exports3) {
        var root = require2("./_root"), stubFalse = require2("./stubFalse");
        var freeExports = typeof exports3 == "object" && exports3 && !exports3.nodeType && exports3;
        var freeModule = freeExports && typeof module3 == "object" && module3 && !module3.nodeType && module3;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var Buffer2 = moduleExports ? root.Buffer : void 0;
        var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
        var isBuffer = nativeIsBuffer || stubFalse;
        module3.exports = isBuffer;
      }, { "./_root": 72, "./stubFalse": 95 }], 83: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isObject = require2("./isObject");
        var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        module3.exports = isFunction;
      }, { "./_baseGetTag": 30, "./isObject": 87 }], 84: [function(require2, module3, exports3) {
        var MAX_SAFE_INTEGER = 9007199254740991;
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        module3.exports = isLength;
      }, {}], 85: [function(require2, module3, exports3) {
        function isNil(value) {
          return value == null;
        }
        module3.exports = isNil;
      }, {}], 86: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isObjectLike = require2("./isObjectLike");
        var numberTag = "[object Number]";
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        module3.exports = isNumber;
      }, { "./_baseGetTag": 30, "./isObjectLike": 88 }], 87: [function(require2, module3, exports3) {
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        module3.exports = isObject;
      }, {}], 88: [function(require2, module3, exports3) {
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        module3.exports = isObjectLike;
      }, {}], 89: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), getPrototype = require2("./_getPrototype"), isObjectLike = require2("./isObjectLike");
        var objectTag = "[object Object]";
        var funcProto = Function.prototype, objectProto = Object.prototype;
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objectCtorString = funcToString.call(Object);
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        module3.exports = isPlainObject;
      }, { "./_baseGetTag": 30, "./_getPrototype": 43, "./isObjectLike": 88 }], 90: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isArray = require2("./isArray"), isObjectLike = require2("./isObjectLike");
        var stringTag = "[object String]";
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        module3.exports = isString;
      }, { "./_baseGetTag": 30, "./isArray": 79, "./isObjectLike": 88 }], 91: [function(require2, module3, exports3) {
        var baseGetTag = require2("./_baseGetTag"), isObjectLike = require2("./isObjectLike");
        var symbolTag = "[object Symbol]";
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        module3.exports = isSymbol;
      }, { "./_baseGetTag": 30, "./isObjectLike": 88 }], 92: [function(require2, module3, exports3) {
        var baseIsTypedArray = require2("./_baseIsTypedArray"), baseUnary = require2("./_baseUnary"), nodeUtil = require2("./_nodeUtil");
        var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        module3.exports = isTypedArray;
      }, { "./_baseIsTypedArray": 33, "./_baseUnary": 37, "./_nodeUtil": 69 }], 93: [function(require2, module3, exports3) {
        var arrayLikeKeys = require2("./_arrayLikeKeys"), baseKeys = require2("./_baseKeys"), isArrayLike = require2("./isArrayLike");
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        module3.exports = keys;
      }, { "./_arrayLikeKeys": 26, "./_baseKeys": 34, "./isArrayLike": 80 }], 94: [function(require2, module3, exports3) {
        var MapCache = require2("./_MapCache");
        var FUNC_ERROR_TEXT = "Expected a function";
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key2 = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key2)) {
              return cache.get(key2);
            }
            var result = func.apply(this, args);
            memoized.cache = cache.set(key2, result) || cache;
            return result;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        module3.exports = memoize;
      }, { "./_MapCache": 24 }], 95: [function(require2, module3, exports3) {
        function stubFalse() {
          return false;
        }
        module3.exports = stubFalse;
      }, {}], 96: [function(require2, module3, exports3) {
        var baseToString = require2("./_baseToString");
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        module3.exports = toString;
      }, { "./_baseToString": 36 }], "airtable": [function(require2, module3, exports3) {
        "use strict";
        var __importDefault = this && this.__importDefault || function(mod) {
          return mod && mod.__esModule ? mod : { "default": mod };
        };
        var base_1 = __importDefault(require2("./base"));
        var record_1 = __importDefault(require2("./record"));
        var table_1 = __importDefault(require2("./table"));
        var airtable_error_1 = __importDefault(require2("./airtable_error"));
        var Airtable2 = (
          /** @class */
          function() {
            function Airtable3(opts) {
              if (opts === void 0) {
                opts = {};
              }
              var defaultConfig = Airtable3.default_config();
              var apiVersion = opts.apiVersion || Airtable3.apiVersion || defaultConfig.apiVersion;
              Object.defineProperties(this, {
                _apiKey: {
                  value: opts.apiKey || Airtable3.apiKey || defaultConfig.apiKey
                },
                _apiVersion: {
                  value: apiVersion
                },
                _apiVersionMajor: {
                  value: apiVersion.split(".")[0]
                },
                _customHeaders: {
                  value: opts.customHeaders || {}
                },
                _endpointUrl: {
                  value: opts.endpointUrl || Airtable3.endpointUrl || defaultConfig.endpointUrl
                },
                _noRetryIfRateLimited: {
                  value: opts.noRetryIfRateLimited || Airtable3.noRetryIfRateLimited || defaultConfig.noRetryIfRateLimited
                },
                _requestTimeout: {
                  value: opts.requestTimeout || Airtable3.requestTimeout || defaultConfig.requestTimeout
                }
              });
              if (!this._apiKey) {
                throw new Error("An API key is required to connect to Airtable");
              }
            }
            Airtable3.prototype.base = function(baseId) {
              return base_1.default.createFunctor(this, baseId);
            };
            Airtable3.default_config = function() {
              return {
                endpointUrl: "https://api.airtable.com",
                apiVersion: "0.1.0",
                apiKey: "",
                noRetryIfRateLimited: false,
                requestTimeout: 300 * 1e3
              };
            };
            Airtable3.configure = function(_a) {
              var apiKey = _a.apiKey, endpointUrl = _a.endpointUrl, apiVersion = _a.apiVersion, noRetryIfRateLimited = _a.noRetryIfRateLimited, requestTimeout = _a.requestTimeout;
              Airtable3.apiKey = apiKey;
              Airtable3.endpointUrl = endpointUrl;
              Airtable3.apiVersion = apiVersion;
              Airtable3.noRetryIfRateLimited = noRetryIfRateLimited;
              Airtable3.requestTimeout = requestTimeout;
            };
            Airtable3.base = function(baseId) {
              return new Airtable3().base(baseId);
            };
            Airtable3.Base = base_1.default;
            Airtable3.Record = record_1.default;
            Airtable3.Table = table_1.default;
            Airtable3.Error = airtable_error_1.default;
            return Airtable3;
          }()
        );
        module3.exports = Airtable2;
      }, { "./airtable_error": 2, "./base": 3, "./record": 15, "./table": 17 }] }, {}, ["airtable"])("airtable");
    });
  }
});

// .svelte-kit/output/server/entries/endpoints/airtable/_server.js
var server_exports = {};
__export(server_exports, {
  GET: () => GET
});
function toCamelCase(str) {
  return str.replace(/\s([a-z])/g, (match) => match.trim().toUpperCase());
}
async function GET() {
  const base2 = import_airtable.default.base(MWII_BASE_ID);
  const members = [];
  await new Promise(async (resolve, reject) => {
    base2(AIRTABLE_UTILS.TABLE.MEMBERS).select({}).eachPage(
      async function page2(records, fetchNextPage) {
        await asyncForEach(records, async (membersRecord) => {
          const memberData = {};
          if (membersRecord.get(MEMBERS.NAME) !== EMPTY_MEMBER_NAME) {
            Object.values(MEMBERS).forEach((memberFieldId) => {
              memberData[toCamelCase(memberFieldId)] = membersRecord.get(memberFieldId);
            });
            members.push(memberData);
          }
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
  return new Response(JSON.stringify(members));
}
var import_airtable, MWII_BASE_ID, AIRTABLE_UTILS, asyncForEach, AIRTABLE_API_KEY, EMPTY_MEMBER_NAME;
var init_server = __esm({
  ".svelte-kit/output/server/entries/endpoints/airtable/_server.js"() {
    init_constants();
    import_airtable = __toESM(require_airtable_umd(), 1);
    MWII_BASE_ID = "appYeVSeuftJC3hkP";
    AIRTABLE_UTILS = {
      TABLE: {
        MATCHES: "Matches",
        MEMBERS: "Members",
        STATS: "Stats"
      }
    };
    asyncForEach = async function asyncForEach2(arr, callback) {
      return new Promise((resolve) => {
        arr.forEach(async (record, recordIndex) => {
          await callback(record, recordIndex);
          if (recordIndex === arr.length - 1) {
            resolve();
          }
        });
      });
    };
    AIRTABLE_API_KEY = "patfqwOalD3i7CAr3.b6978cea73b943e6e5dba95b0ae25a1c4b795bfb78905568677f9154398c0516";
    import_airtable.default.configure({
      apiKey: AIRTABLE_API_KEY
    });
    EMPTY_MEMBER_NAME = "(empty)";
  }
});

// node_modules/devalue/src/utils.js
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\u0000",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  /**
   * @param {string} message
   * @param {string[]} keys
   */
  constructor(message, keys) {
    super(message);
    this.name = "DevalueError";
    this.path = keys.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function stringify_string(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code <= 31) {
      result += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

// node_modules/devalue/src/uneval.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}

// node_modules/devalue/src/constants.js
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index5 = p++;
    indexes.set(thing, index5);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index5] = `["${key2}",${flatten(value2)}]`;
        return index5;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index5] = str;
    return index5;
  }
  const index4 = flatten(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}

// .svelte-kit/output/server/index.js
init_chunks();

// .svelte-kit/output/server/chunks/internal.js
init_chunks();
var base = "";
var assets = base;
var version = "";
var public_env = {};
function set_public_env(environment) {
  public_env = environment;
}
function set_version(value) {
  version = value;
}
function afterUpdate() {
}
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      stores.page.set(page2);
    }
    $$rendered = `


${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`}

${``}`;
  } while (!$$settled);
  return $$rendered;
});
set_version("1676761175392");
var options = {
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  hooks: null,
  // added lazily, via `get_hooks`
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid #ccc;
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  }
};
function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type);
}
function is_form_content_type(request) {
  return is_content_type(request, "application/x-www-form-urlencoded", "multipart/form-data");
}
var HttpError = class HttpError2 {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class Redirect2 {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var ActionFailure = class ActionFailure2 {
  /**
   * @param {number} status
   * @param {T} [data]
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function error(status, message) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, message);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$1.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
var encoder$1 = new TextEncoder();
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$1.encode(body).byteLength.toString());
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {Redirect | HttpError | Error} */
    error2
  );
}
var GENERIC_ERROR = {
  id: "__error"
};
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  return text(options2.templates.error({ status, message }), {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function serialize_data_node(node) {
  if (!node)
    return "null";
  if (node.type === "error" || node.type === "skip") {
    return JSON.stringify(node);
  }
  const stringified = stringify(node.data);
  const uses = [];
  if (node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses.parent)
    uses.push(`"parent":1`);
  if (node.uses.route)
    uses.push(`"route":1`);
  if (node.uses.url)
    uses.push(`"url":1`);
  return `{"type":"data","data":${stringified},"uses":{${uses.join(",")}}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
}
async function render_endpoint(event, route, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method];
  if (!handler2 && method === "HEAD") {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.initiator) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  state.initiator = route;
  try {
    const response = await handler2(
      /** @type {import('types').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE" || method === "OPTIONS") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json({
        type: "redirect",
        status: err.status,
        location: err.location
      });
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error(`Cannot "throw fail()". Use "return fail()"`) : error2;
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      uses.dependencies.add(url2.href);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: {
      get id() {
        uses.route = true;
        return event.route.id;
      }
    },
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  validate_load_response(
    data,
    /** @type {string} */
    event.route.id
  );
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: init2?.headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function validate_load_response(data, routeId) {
  if (data != null && Object.getPrototypeOf(data) !== Object.prototype) {
    throw new Error(
      `a load function related to route '${routeId}' returned ${typeof data !== "object" ? `a ${typeof data}` : data instanceof Response ? "a Response object" : Array.isArray(data) ? "an array" : "a non-plain object"}, but must return a plain object at the top level (i.e. \`return {...}\`)`
    );
  }
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let vary = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
    if (key2 === "vary")
      vary = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !vary) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types').CspConfig} config
   * @param {import('./types').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { entry } = manifest2._;
  const stylesheets4 = new Set(entry.stylesheets);
  const modulepreloads = new Set(entry.imports);
  const fonts4 = new Set(manifest2._.entry.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data = {};
    for (let i = 0; i < branch.length; i += 1) {
      data = { ...data, ...branch[i].data };
      props[`data_${i}`] = data;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data,
      form: form_value
    };
    {
      rendered = options2.root.render(props);
    }
    for (const { node } of branch) {
      if (node.imports) {
        node.imports.forEach((url) => modulepreloads.add(url));
      }
      if (node.stylesheets) {
        node.stylesheets.forEach((url) => stylesheets4.add(url));
      }
      if (node.fonts) {
        node.fonts.forEach((url) => fonts4.add(url));
      }
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const target = hash(body);
  let resolved_assets;
  if (assets) {
    resolved_assets = assets;
  } else if (state.prerendering?.fallback) {
    resolved_assets = base;
  } else {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    resolved_assets = segments.length > 0 ? segments.map(() => "..").join("/") : ".";
  }
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${resolved_assets}/${path}`;
  };
  const serialized = { data: "", form: "null", error: "null" };
  try {
    serialized.data = `[${branch.map(({ server_data }) => {
      if (server_data?.type === "data") {
        const data = uneval(server_data.data);
        const uses = [];
        if (server_data.uses.dependencies.size > 0) {
          uses.push(`dependencies:${s(Array.from(server_data.uses.dependencies))}`);
        }
        if (server_data.uses.params.size > 0) {
          uses.push(`params:${s(Array.from(server_data.uses.params))}`);
        }
        if (server_data.uses.parent)
          uses.push(`parent:1`);
        if (server_data.uses.route)
          uses.push(`route:1`);
        if (server_data.uses.url)
          uses.push(`url:1`);
        return `{type:"data",data:${data},uses:{${uses.join(",")}}${server_data.slash ? `,slash:${s(server_data.slash)}` : ""}}`;
      }
      return s(server_data);
    }).join(",")}]`;
  } catch (e) {
    const error3 = (
      /** @type {any} */
      e
    );
    throw new Error(clarify_devalue_error(event, error3));
  }
  if (form_value) {
    serialized.form = uneval_action_response(
      form_value,
      /** @type {string} */
      event.route.id
    );
  }
  if (error2) {
    serialized.error = uneval(error2);
  }
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "css", path })) {
      const attributes = ['rel="stylesheet"'];
      if (inline_styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      } else {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
      head += `
		<link href="${path}" ${attributes.join(" ")}>`;
    }
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  if (page_config.csr) {
    const opts = [
      `assets: ${s(assets)}`,
      `env: ${s(public_env)}`,
      `target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode`,
      `version: ${s(version)}`
    ];
    if (page_config.ssr) {
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${serialized.data}`,
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      opts.push(`hydrate: {
					${hydrate.join(",\n					")}
				}`);
    }
    const init_app = `
			import { start } from ${s(prefixed(entry.file))};

			start({
				${opts.join(",\n				")}
			});
		`;
    for (const dep of modulepreloads) {
      const path = prefixed(dep);
      if (resolve_opts.preload({ type: "js", path })) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
  }
  if (page_config.ssr && page_config.csr) {
    body += `
	${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n	")}`;
  }
  if (options2.service_worker) {
    const opts = "";
    const init_service_worker = `
			if ('serviceWorker' in navigator) {
				addEventListener('load', function () {
					navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
				});
			}
		`;
    csp.add_script(init_service_worker);
    head += `
		<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: resolved_assets,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html",
    etag: `"${hash(transformed)}"`
  });
  if (!state.prerendering) {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  return text(transformed, {
    status,
    headers
  });
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {any} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.initiator = GENERIC_ERROR;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
async function render_page(event, route, page2, options2, manifest2, state, resolve_opts) {
  if (state.initiator === route) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  state.initiator = route;
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
      manifest2._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender");
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      if (should_prerender !== false && get_option(nodes, "ssr") === false && !leaf_node.server?.actions) {
        return await render_response({
          branch: [],
          fetched: [],
          page_config: {
            ssr: false,
            csr: get_option(nodes, "csr") ?? true
          },
          status,
          error: null,
          event,
          options: options2,
          manifest: manifest2,
          state,
          resolve_opts
        });
      }
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      const body = `{"type":"data","nodes":[${branch.map((node) => serialize_data_node(node?.server_data)).join(",")}]}`;
      state.prerendering.dependencies.set(data_pathname, {
        response: text(body),
        body
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    const value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      result[param.name] = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
      continue;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  state.initiator = route;
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data, parent.data);
                }
              }
              return data;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    try {
      const stubs = nodes.slice(0, length).map(serialize_data_node);
      const json2 = `{"type":"data","nodes":[${stubs.join(",")}]}`;
      return json_response(json2);
    } catch (e) {
      const error2 = (
        /** @type {any} */
        e
      );
      return json_response(JSON.stringify(clarify_devalue_error(event, error2)), 500);
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(JSON.stringify(await handle_error_and_jsonify(event, options2, error2)));
    }
  }
}
function json_response(json2, status = 200) {
  return text(json2, {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response(
    JSON.stringify({
      type: "redirect",
      location: redirect.location
    })
  );
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('types').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      {
        return cookie;
      }
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      let path = opts.path ?? default_path;
      new_cookies[name] = {
        name,
        value,
        options: {
          ...defaults,
          ...opts,
          path
        }
      };
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return (0, import_cookie.serialize)(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  return { cookies, new_cookies, get_cookie_header };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    const request_body = init2?.body;
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        let response;
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file4 = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file4), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (request_body && typeof request_body !== "string" && !ArrayBuffer.isView(request_body)) {
          throw new Error("Request body must be a string or TypedArray");
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        response = await respond(request, options2, manifest2, state);
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            event.cookies.set(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  const set = new Set(expected);
  function validate(module, file4) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || set.has(key2))
        continue;
      const hint = hint_for_supported_files(key2, file4?.slice(file4.lastIndexOf("."))) ?? `valid exports are ${expected.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file4 ? ` in ${file4}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  let supported_files = [];
  if (valid_common_exports.includes(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_page_server_exports.includes(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.includes(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.join(` or `)}`;
  }
}
var valid_common_exports = ["load", "prerender", "csr", "ssr", "trailingSlash", "config"];
var valid_page_server_exports = [
  "load",
  "prerender",
  "csr",
  "ssr",
  "actions",
  "trailingSlash",
  "config"
];
var valid_server_exports = [
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "prerender",
  "trailingSlash",
  "config"
];
var validate_common_exports = validator(valid_common_exports);
var validate_page_server_exports = validator(valid_page_server_exports);
var validate_server_exports = validator(valid_server_exports);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
async function respond(request, options2, manifest2, state) {
  let url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = request.method === "POST" && request.headers.get("origin") !== url.origin && is_form_content_type(request);
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("_").map(Boolean);
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route && !is_data_request) {
      if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
          manifest2._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
      if (normalized !== url.pathname && !state.prerendering?.fallback) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (
              // ensure paths starting with '//' are not treated as protocol-relative
              (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
            )
          }
        });
      }
    }
    const { cookies, new_cookies, get_cookie_header } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, route, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(
            event2,
            route,
            route.page,
            options2,
            manifest2,
            state,
            resolve_opts
          );
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.initiator === GENERIC_ERROR) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (!state.initiator) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var _options, _manifest;
var Server = class {
  /** @param {import('types').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('types').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    const entries = Object.entries(env);
    const prefix2 = __privateGet(this, _options).env_public_prefix;
    Object.fromEntries(entries.filter(([k]) => !k.startsWith(prefix2)));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith(prefix2)));
    set_public_env(pub);
    if (!__privateGet(this, _options).hooks) {
      const module = await get_hooks();
      __privateGet(this, _options).hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        // @ts-expect-error
        handleError: module.handleError || (({ error: error2 }) => console.error(error2?.stack)),
        handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
      };
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), options2);
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: { "file": "_app/immutable/start-cb3b0ab3.js", "imports": ["_app/immutable/start-cb3b0ab3.js", "_app/immutable/chunks/index-ac3afb59.js", "_app/immutable/chunks/singletons-b51cada9.js"], "stylesheets": [], "fonts": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      },
      {
        id: "/airtable",
        pattern: /^\/airtable\/?$/,
        params: [],
        page: null,
        endpoint: () => Promise.resolve().then(() => (init_server(), server_exports))
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
var prerendered = /* @__PURE__ */ new Set([]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file4 = pathname.substring(1);
  try {
    file4 = decodeURIComponent(file4);
  } catch (err) {
  }
  return manifest.assets.has(file4) || manifest.assets.has(file4 + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=render.js.map
