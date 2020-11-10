!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("checkoutpage-overlay.js", [], t) : "object" == typeof exports ? exports["checkoutpage-overlay.js"] = t() : e["checkoutpage-overlay.js"] = t()
}(window, function () {
    return function (e) {
        var t = {};

        function n(o) {
            if (t[o]) return t[o].exports;
            var r = t[o] = {i: o, l: !1, exports: {}};
            return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) {
                return e[t]
            }.bind(null, r));
            return o
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 0)
    }([function (e, t) {
        !function () {
            var e, t, n;

            function o(e, t) {
                return t && e ? "".concat("https://checkoutpage.co", "/overlay/").concat(e, "/").concat(t) : "".concat("https://checkoutpage.co", "/overlay")
            }

            function r(e) {
                "Escape" === e.key && c()
            }

            function c() {
                e.src = o(), t.style.width = "", t.style.height = "", document.removeEventListener("keydown", r, !1)
            }

            /iPad|iPhone|iPod/.test(navigator.userAgent) && window.MSStream, document.getElementById("cp-frame") || ((n = document.createElement("style")).type = "text/css", n.appendChild(document.createTextNode("\n      .cp-container {\n        position: fixed !important;\n        overflow: hidden !important;\n        background-color: rgba(0,0,0,0.25);\n        overflow-y: scroll;\n        z-index: 99998 !important;\n        top: 0 !important;\n        right: 0 !important;\n        width: 0px;\n        height: 0px;\n        border: none !important;\n        margin: 0 !important;\n        padding: 0 !important;\n        zoom: 1;\n        -webkit-overflow-scrolling: touch;\n      }\n    ")), document.head.appendChild(n), (t = document.createElement("div")).className = "cp-container", document.body.append(t), (e = document.createElement("iframe")).setAttribute("allowFullScreen", "allowfullscreen"), e.id = "cp-frame", e.style.width = "100%", e.style.height = "100%", e.style.border = "none", e.src = o(), window.addEventListener("message", function (e) {
                "https://checkoutpage.co" === e.origin && "close" === e.data && c()
            }, !1), t.append(e)), document.addEventListener("click", function (n) {
                if (n.target.className.includes("cp-button")) {
                    var o = n.target.dataset;
                    c = o.seller, i = o.checkout, a = void 0 !== o.testing, d = JSON.stringify({
                        seller: c,
                        checkout: i,
                        testing: a
                    }), e.contentWindow.postMessage(d, "*"), document.addEventListener("keydown", r, !1), t.style.width = "100%", t.style.height = "100%"
                }
                var c, i, a, d
            })
        }()
    }])
});