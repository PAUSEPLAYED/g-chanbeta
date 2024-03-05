(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s);
  new MutationObserver((s) => {
    for (const c of s)
      if (c.type === "childList")
        for (const u of c.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && n(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(s) {
    const c = {};
    return (
      s.integrity && (c.integrity = s.integrity),
      s.referrerPolicy && (c.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (c.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (c.credentials = "omit")
          : (c.credentials = "same-origin"),
      c
    );
  }
  function n(s) {
    if (s.ep) return;
    s.ep = !0;
    const c = r(s);
    fetch(s.href, c);
  }
})();
var Ta = (function () {
    function t(e, r) {
      r === void 0 && (r = []),
        (this._eventType = e),
        (this._eventFunctions = r);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._eventFunctions.forEach(function (r) {
          typeof window < "u" && window.addEventListener(e._eventType, r);
        });
      }),
      t
    );
  })(),
  ka = (function () {
    function t() {
      this._instances = {
        Accordion: {},
        Carousel: {},
        Collapse: {},
        Dial: {},
        Dismiss: {},
        Drawer: {},
        Dropdown: {},
        Modal: {},
        Popover: {},
        Tabs: {},
        Tooltip: {},
        InputCounter: {},
        CopyClipboard: {},
      };
    }
    return (
      (t.prototype.addInstance = function (e, r, n, s) {
        if ((s === void 0 && (s = !1), !this._instances[e]))
          return (
            console.warn("Flowbite: Component ".concat(e, " does not exist.")),
            !1
          );
        if (this._instances[e][n] && !s) {
          console.warn(
            "Flowbite: Instance with ID ".concat(n, " already exists.")
          );
          return;
        }
        s &&
          this._instances[e][n] &&
          this._instances[e][n].destroyAndRemoveInstance(),
          (this._instances[e][n || this._generateRandomId()] = r);
      }),
      (t.prototype.getAllInstances = function () {
        return this._instances;
      }),
      (t.prototype.getInstances = function (e) {
        return this._instances[e]
          ? this._instances[e]
          : (console.warn("Flowbite: Component ".concat(e, " does not exist.")),
            !1);
      }),
      (t.prototype.getInstance = function (e, r) {
        if (this._componentAndInstanceCheck(e, r)) {
          if (!this._instances[e][r]) {
            console.warn(
              "Flowbite: Instance with ID ".concat(r, " does not exist.")
            );
            return;
          }
          return this._instances[e][r];
        }
      }),
      (t.prototype.destroyAndRemoveInstance = function (e, r) {
        this._componentAndInstanceCheck(e, r) &&
          (this.destroyInstanceObject(e, r), this.removeInstance(e, r));
      }),
      (t.prototype.removeInstance = function (e, r) {
        this._componentAndInstanceCheck(e, r) && delete this._instances[e][r];
      }),
      (t.prototype.destroyInstanceObject = function (e, r) {
        this._componentAndInstanceCheck(e, r) &&
          this._instances[e][r].destroy();
      }),
      (t.prototype.instanceExists = function (e, r) {
        return !(!this._instances[e] || !this._instances[e][r]);
      }),
      (t.prototype._generateRandomId = function () {
        return Math.random().toString(36).substr(2, 9);
      }),
      (t.prototype._componentAndInstanceCheck = function (e, r) {
        return this._instances[e]
          ? this._instances[e][r]
            ? !0
            : (console.warn(
                "Flowbite: Instance with ID ".concat(r, " does not exist.")
              ),
              !1)
          : (console.warn("Flowbite: Component ".concat(e, " does not exist.")),
            !1);
      }),
      t
    );
  })(),
  at = new ka();
typeof window < "u" && (window.FlowbiteInstances = at);
var nn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (nn =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        nn.apply(this, arguments)
      );
    },
  rn = {
    alwaysOpen: !1,
    activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
    inactiveClasses: "text-gray-500 dark:text-gray-400",
    onOpen: function () {},
    onClose: function () {},
    onToggle: function () {},
  },
  Aa = { id: null, override: !0 },
  Hs = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = []),
        n === void 0 && (n = rn),
        s === void 0 && (s = Aa),
        (this._instanceId = s.id ? s.id : e.id),
        (this._accordionEl = e),
        (this._items = r),
        (this._options = nn(nn({}, rn), n)),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Accordion", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._items.length &&
          !this._initialized &&
          (this._items.forEach(function (r) {
            r.active && e.open(r.id);
            var n = function () {
              e.toggle(r.id);
            };
            r.triggerEl.addEventListener("click", n), (r.clickHandler = n);
          }),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._items.length &&
          this._initialized &&
          (this._items.forEach(function (e) {
            e.triggerEl.removeEventListener("click", e.clickHandler),
              delete e.clickHandler;
          }),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Accordion", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.getItem = function (e) {
        return this._items.filter(function (r) {
          return r.id === e;
        })[0];
      }),
      (t.prototype.open = function (e) {
        var r,
          n,
          s = this,
          c = this.getItem(e);
        this._options.alwaysOpen ||
          this._items.map(function (u) {
            var d, g;
            u !== c &&
              ((d = u.triggerEl.classList).remove.apply(
                d,
                s._options.activeClasses.split(" ")
              ),
              (g = u.triggerEl.classList).add.apply(
                g,
                s._options.inactiveClasses.split(" ")
              ),
              u.targetEl.classList.add("hidden"),
              u.triggerEl.setAttribute("aria-expanded", "false"),
              (u.active = !1),
              u.iconEl && u.iconEl.classList.add("rotate-180"));
          }),
          (r = c.triggerEl.classList).add.apply(
            r,
            this._options.activeClasses.split(" ")
          ),
          (n = c.triggerEl.classList).remove.apply(
            n,
            this._options.inactiveClasses.split(" ")
          ),
          c.triggerEl.setAttribute("aria-expanded", "true"),
          c.targetEl.classList.remove("hidden"),
          (c.active = !0),
          c.iconEl && c.iconEl.classList.remove("rotate-180"),
          this._options.onOpen(this, c);
      }),
      (t.prototype.toggle = function (e) {
        var r = this.getItem(e);
        r.active ? this.close(e) : this.open(e),
          this._options.onToggle(this, r);
      }),
      (t.prototype.close = function (e) {
        var r,
          n,
          s = this.getItem(e);
        (r = s.triggerEl.classList).remove.apply(
          r,
          this._options.activeClasses.split(" ")
        ),
          (n = s.triggerEl.classList).add.apply(
            n,
            this._options.inactiveClasses.split(" ")
          ),
          s.targetEl.classList.add("hidden"),
          s.triggerEl.setAttribute("aria-expanded", "false"),
          (s.active = !1),
          s.iconEl && s.iconEl.classList.add("rotate-180"),
          this._options.onClose(this, s);
      }),
      (t.prototype.updateOnOpen = function (e) {
        this._options.onOpen = e;
      }),
      (t.prototype.updateOnClose = function (e) {
        this._options.onClose = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function nr() {
  document.querySelectorAll("[data-accordion]").forEach(function (t) {
    var e = t.getAttribute("data-accordion"),
      r = t.getAttribute("data-active-classes"),
      n = t.getAttribute("data-inactive-classes"),
      s = [];
    t.querySelectorAll("[data-accordion-target]").forEach(function (c) {
      if (c.closest("[data-accordion]") === t) {
        var u = {
          id: c.getAttribute("data-accordion-target"),
          triggerEl: c,
          targetEl: document.querySelector(
            c.getAttribute("data-accordion-target")
          ),
          iconEl: c.querySelector("[data-accordion-icon]"),
          active: c.getAttribute("aria-expanded") === "true",
        };
        s.push(u);
      }
    }),
      new Hs(t, s, {
        alwaysOpen: e === "open",
        activeClasses: r || rn.activeClasses,
        inactiveClasses: n || rn.inactiveClasses,
      });
  });
}
typeof window < "u" && ((window.Accordion = Hs), (window.initAccordions = nr));
var sn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (sn =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        sn.apply(this, arguments)
      );
    },
  cs = {
    onCollapse: function () {},
    onExpand: function () {},
    onToggle: function () {},
  },
  Sa = { id: null, override: !0 },
  Gn = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = cs),
        s === void 0 && (s = Sa),
        (this._instanceId = s.id ? s.id : e.id),
        (this._targetEl = e),
        (this._triggerEl = r),
        (this._options = sn(sn({}, cs), n)),
        (this._visible = !1),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Collapse", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._triggerEl &&
          this._targetEl &&
          !this._initialized &&
          (this._triggerEl.hasAttribute("aria-expanded")
            ? (this._visible =
                this._triggerEl.getAttribute("aria-expanded") === "true")
            : (this._visible = !this._targetEl.classList.contains("hidden")),
          (this._clickHandler = function () {
            e.toggle();
          }),
          this._triggerEl.addEventListener("click", this._clickHandler),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._triggerEl &&
          this._initialized &&
          (this._triggerEl.removeEventListener("click", this._clickHandler),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Collapse", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.collapse = function () {
        this._targetEl.classList.add("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "false"),
          (this._visible = !1),
          this._options.onCollapse(this);
      }),
      (t.prototype.expand = function () {
        this._targetEl.classList.remove("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "true"),
          (this._visible = !0),
          this._options.onExpand(this);
      }),
      (t.prototype.toggle = function () {
        this._visible ? this.collapse() : this.expand(),
          this._options.onToggle(this);
      }),
      (t.prototype.updateOnCollapse = function (e) {
        this._options.onCollapse = e;
      }),
      (t.prototype.updateOnExpand = function (e) {
        this._options.onExpand = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function rr() {
  document.querySelectorAll("[data-collapse-toggle]").forEach(function (t) {
    var e = t.getAttribute("data-collapse-toggle"),
      r = document.getElementById(e);
    r
      ? at.instanceExists("Collapse", r.getAttribute("id"))
        ? new Gn(
            r,
            t,
            {},
            { id: r.getAttribute("id") + "_" + at._generateRandomId() }
          )
        : new Gn(r, t)
      : console.error(
          'The target element with id "'.concat(
            e,
            '" does not exist. Please check the data-collapse-toggle attribute.'
          )
        );
  });
}
typeof window < "u" && ((window.Collapse = Gn), (window.initCollapses = rr));
var Le =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (Le =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        Le.apply(this, arguments)
      );
    },
  tn = {
    defaultPosition: 0,
    indicators: {
      items: [],
      activeClasses: "bg-white dark:bg-gray-800",
      inactiveClasses:
        "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800",
    },
    interval: 3e3,
    onNext: function () {},
    onPrev: function () {},
    onChange: function () {},
  },
  La = { id: null, override: !0 },
  Ns = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = []),
        n === void 0 && (n = tn),
        s === void 0 && (s = La),
        (this._instanceId = s.id ? s.id : e.id),
        (this._carouselEl = e),
        (this._items = r),
        (this._options = Le(Le(Le({}, tn), n), {
          indicators: Le(Le({}, tn.indicators), n.indicators),
        })),
        (this._activeItem = this.getItem(this._options.defaultPosition)),
        (this._indicators = this._options.indicators.items),
        (this._intervalDuration = this._options.interval),
        (this._intervalInstance = null),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Carousel", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._items.length &&
          !this._initialized &&
          (this._items.map(function (r) {
            r.el.classList.add(
              "absolute",
              "inset-0",
              "transition-transform",
              "transform"
            );
          }),
          this.getActiveItem()
            ? this.slideTo(this.getActiveItem().position)
            : this.slideTo(0),
          this._indicators.map(function (r, n) {
            r.el.addEventListener("click", function () {
              e.slideTo(n);
            });
          }),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._initialized && (this._initialized = !1);
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Carousel", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.getItem = function (e) {
        return this._items[e];
      }),
      (t.prototype.slideTo = function (e) {
        var r = this._items[e],
          n = {
            left:
              r.position === 0
                ? this._items[this._items.length - 1]
                : this._items[r.position - 1],
            middle: r,
            right:
              r.position === this._items.length - 1
                ? this._items[0]
                : this._items[r.position + 1],
          };
        this._rotate(n),
          this._setActiveItem(r),
          this._intervalInstance && (this.pause(), this.cycle()),
          this._options.onChange(this);
      }),
      (t.prototype.next = function () {
        var e = this.getActiveItem(),
          r = null;
        e.position === this._items.length - 1
          ? (r = this._items[0])
          : (r = this._items[e.position + 1]),
          this.slideTo(r.position),
          this._options.onNext(this);
      }),
      (t.prototype.prev = function () {
        var e = this.getActiveItem(),
          r = null;
        e.position === 0
          ? (r = this._items[this._items.length - 1])
          : (r = this._items[e.position - 1]),
          this.slideTo(r.position),
          this._options.onPrev(this);
      }),
      (t.prototype._rotate = function (e) {
        if (
          (this._items.map(function (r) {
            r.el.classList.add("hidden");
          }),
          this._items.length === 1)
        ) {
          e.middle.el.classList.remove(
            "-translate-x-full",
            "translate-x-full",
            "translate-x-0",
            "hidden",
            "z-10"
          ),
            e.middle.el.classList.add("translate-x-0", "z-20");
          return;
        }
        e.left.el.classList.remove(
          "-translate-x-full",
          "translate-x-full",
          "translate-x-0",
          "hidden",
          "z-20"
        ),
          e.left.el.classList.add("-translate-x-full", "z-10"),
          e.middle.el.classList.remove(
            "-translate-x-full",
            "translate-x-full",
            "translate-x-0",
            "hidden",
            "z-10"
          ),
          e.middle.el.classList.add("translate-x-0", "z-30"),
          e.right.el.classList.remove(
            "-translate-x-full",
            "translate-x-full",
            "translate-x-0",
            "hidden",
            "z-30"
          ),
          e.right.el.classList.add("translate-x-full", "z-20");
      }),
      (t.prototype.cycle = function () {
        var e = this;
        typeof window < "u" &&
          (this._intervalInstance = window.setInterval(function () {
            e.next();
          }, this._intervalDuration));
      }),
      (t.prototype.pause = function () {
        clearInterval(this._intervalInstance);
      }),
      (t.prototype.getActiveItem = function () {
        return this._activeItem;
      }),
      (t.prototype._setActiveItem = function (e) {
        var r,
          n,
          s = this;
        this._activeItem = e;
        var c = e.position;
        this._indicators.length &&
          (this._indicators.map(function (u) {
            var d, g;
            u.el.setAttribute("aria-current", "false"),
              (d = u.el.classList).remove.apply(
                d,
                s._options.indicators.activeClasses.split(" ")
              ),
              (g = u.el.classList).add.apply(
                g,
                s._options.indicators.inactiveClasses.split(" ")
              );
          }),
          (r = this._indicators[c].el.classList).add.apply(
            r,
            this._options.indicators.activeClasses.split(" ")
          ),
          (n = this._indicators[c].el.classList).remove.apply(
            n,
            this._options.indicators.inactiveClasses.split(" ")
          ),
          this._indicators[c].el.setAttribute("aria-current", "true"));
      }),
      (t.prototype.updateOnNext = function (e) {
        this._options.onNext = e;
      }),
      (t.prototype.updateOnPrev = function (e) {
        this._options.onPrev = e;
      }),
      (t.prototype.updateOnChange = function (e) {
        this._options.onChange = e;
      }),
      t
    );
  })();
function sr() {
  document.querySelectorAll("[data-carousel]").forEach(function (t) {
    var e = t.getAttribute("data-carousel-interval"),
      r = t.getAttribute("data-carousel") === "slide",
      n = [],
      s = 0;
    t.querySelectorAll("[data-carousel-item]").length &&
      Array.from(t.querySelectorAll("[data-carousel-item]")).map(
        function (b, w) {
          n.push({ position: w, el: b }),
            b.getAttribute("data-carousel-item") === "active" && (s = w);
        }
      );
    var c = [];
    t.querySelectorAll("[data-carousel-slide-to]").length &&
      Array.from(t.querySelectorAll("[data-carousel-slide-to]")).map(
        function (b) {
          c.push({
            position: parseInt(b.getAttribute("data-carousel-slide-to")),
            el: b,
          });
        }
      );
    var u = new Ns(t, n, {
      defaultPosition: s,
      indicators: { items: c },
      interval: e || tn.interval,
    });
    r && u.cycle();
    var d = t.querySelector("[data-carousel-next]"),
      g = t.querySelector("[data-carousel-prev]");
    d &&
      d.addEventListener("click", function () {
        u.next();
      }),
      g &&
        g.addEventListener("click", function () {
          u.prev();
        });
  });
}
typeof window < "u" && ((window.Carousel = Ns), (window.initCarousels = sr));
var on =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (on =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        on.apply(this, arguments)
      );
    },
  us = {
    transition: "transition-opacity",
    duration: 300,
    timing: "ease-out",
    onHide: function () {},
  },
  Ia = { id: null, override: !0 },
  Ms = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = us),
        s === void 0 && (s = Ia),
        (this._instanceId = s.id ? s.id : e.id),
        (this._targetEl = e),
        (this._triggerEl = r),
        (this._options = on(on({}, us), n)),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Dismiss", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._triggerEl &&
          this._targetEl &&
          !this._initialized &&
          ((this._clickHandler = function () {
            e.hide();
          }),
          this._triggerEl.addEventListener("click", this._clickHandler),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._triggerEl &&
          this._initialized &&
          (this._triggerEl.removeEventListener("click", this._clickHandler),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Dismiss", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.hide = function () {
        var e = this;
        this._targetEl.classList.add(
          this._options.transition,
          "duration-".concat(this._options.duration),
          this._options.timing,
          "opacity-0"
        ),
          setTimeout(function () {
            e._targetEl.classList.add("hidden");
          }, this._options.duration),
          this._options.onHide(this, this._targetEl);
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      t
    );
  })();
function or() {
  document.querySelectorAll("[data-dismiss-target]").forEach(function (t) {
    var e = t.getAttribute("data-dismiss-target"),
      r = document.querySelector(e);
    r
      ? new Ms(r, t)
      : console.error(
          'The dismiss element with id "'.concat(
            e,
            '" does not exist. Please check the data-dismiss-target attribute.'
          )
        );
  });
}
typeof window < "u" && ((window.Dismiss = Ms), (window.initDismisses = or));
var Ht = "top",
  Yt = "bottom",
  qt = "right",
  Nt = "left",
  ar = "auto",
  mi = [Ht, Yt, qt, Nt],
  Ue = "start",
  pi = "end",
  Pa = "clippingParents",
  Ws = "viewport",
  li = "popper",
  Oa = "reference",
  hs = mi.reduce(function (t, e) {
    return t.concat([e + "-" + Ue, e + "-" + pi]);
  }, []),
  Rs = [].concat(mi, [ar]).reduce(function (t, e) {
    return t.concat([e, e + "-" + Ue, e + "-" + pi]);
  }, []),
  Da = "beforeRead",
  Ha = "read",
  Na = "afterRead",
  Ma = "beforeMain",
  Wa = "main",
  Ra = "afterMain",
  Ba = "beforeWrite",
  ja = "write",
  za = "afterWrite",
  Fa = [Da, Ha, Na, Ma, Wa, Ra, Ba, ja, za];
function ie(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Bt(t) {
  if (t == null) return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return (e && e.defaultView) || window;
  }
  return t;
}
function He(t) {
  var e = Bt(t).Element;
  return t instanceof e || t instanceof Element;
}
function Xt(t) {
  var e = Bt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function lr(t) {
  if (typeof ShadowRoot > "u") return !1;
  var e = Bt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Xa(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function (r) {
    var n = e.styles[r] || {},
      s = e.attributes[r] || {},
      c = e.elements[r];
    !Xt(c) ||
      !ie(c) ||
      (Object.assign(c.style, n),
      Object.keys(s).forEach(function (u) {
        var d = s[u];
        d === !1 ? c.removeAttribute(u) : c.setAttribute(u, d === !0 ? "" : d);
      }));
  });
}
function Ya(t) {
  var e = t.state,
    r = {
      popper: {
        position: e.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(e.elements.popper.style, r.popper),
    (e.styles = r),
    e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow),
    function () {
      Object.keys(e.elements).forEach(function (n) {
        var s = e.elements[n],
          c = e.attributes[n] || {},
          u = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]),
          d = u.reduce(function (g, b) {
            return (g[b] = ""), g;
          }, {});
        !Xt(s) ||
          !ie(s) ||
          (Object.assign(s.style, d),
          Object.keys(c).forEach(function (g) {
            s.removeAttribute(g);
          }));
      });
    }
  );
}
const qa = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Xa,
  effect: Ya,
  requires: ["computeStyles"],
};
function ee(t) {
  return t.split("-")[0];
}
var Oe = Math.max,
  an = Math.min,
  Ke = Math.round;
function Jn() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands)
    ? t.brands
        .map(function (e) {
          return e.brand + "/" + e.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function Bs() {
  return !/^((?!chrome|android).)*safari/i.test(Jn());
}
function Qe(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(),
    s = 1,
    c = 1;
  e &&
    Xt(t) &&
    ((s = (t.offsetWidth > 0 && Ke(n.width) / t.offsetWidth) || 1),
    (c = (t.offsetHeight > 0 && Ke(n.height) / t.offsetHeight) || 1));
  var u = He(t) ? Bt(t) : window,
    d = u.visualViewport,
    g = !Bs() && r,
    b = (n.left + (g && d ? d.offsetLeft : 0)) / s,
    w = (n.top + (g && d ? d.offsetTop : 0)) / c,
    S = n.width / s,
    I = n.height / c;
  return {
    width: S,
    height: I,
    top: w,
    right: b + S,
    bottom: w + I,
    left: b,
    x: b,
    y: w,
  };
}
function cr(t) {
  var e = Qe(t),
    r = t.offsetWidth,
    n = t.offsetHeight;
  return (
    Math.abs(e.width - r) <= 1 && (r = e.width),
    Math.abs(e.height - n) <= 1 && (n = e.height),
    { x: t.offsetLeft, y: t.offsetTop, width: r, height: n }
  );
}
function js(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e)) return !0;
  if (r && lr(r)) {
    var n = e;
    do {
      if (n && t.isSameNode(n)) return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function ae(t) {
  return Bt(t).getComputedStyle(t);
}
function Va(t) {
  return ["table", "td", "th"].indexOf(ie(t)) >= 0;
}
function xe(t) {
  return ((He(t) ? t.ownerDocument : t.document) || window.document)
    .documentElement;
}
function En(t) {
  return ie(t) === "html"
    ? t
    : t.assignedSlot || t.parentNode || (lr(t) ? t.host : null) || xe(t);
}
function fs(t) {
  return !Xt(t) || ae(t).position === "fixed" ? null : t.offsetParent;
}
function Ua(t) {
  var e = /firefox/i.test(Jn()),
    r = /Trident/i.test(Jn());
  if (r && Xt(t)) {
    var n = ae(t);
    if (n.position === "fixed") return null;
  }
  var s = En(t);
  for (lr(s) && (s = s.host); Xt(s) && ["html", "body"].indexOf(ie(s)) < 0; ) {
    var c = ae(s);
    if (
      c.transform !== "none" ||
      c.perspective !== "none" ||
      c.contain === "paint" ||
      ["transform", "perspective"].indexOf(c.willChange) !== -1 ||
      (e && c.willChange === "filter") ||
      (e && c.filter && c.filter !== "none")
    )
      return s;
    s = s.parentNode;
  }
  return null;
}
function vi(t) {
  for (var e = Bt(t), r = fs(t); r && Va(r) && ae(r).position === "static"; )
    r = fs(r);
  return r &&
    (ie(r) === "html" || (ie(r) === "body" && ae(r).position === "static"))
    ? e
    : r || Ua(t) || e;
}
function ur(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function hi(t, e, r) {
  return Oe(t, an(e, r));
}
function Ka(t, e, r) {
  var n = hi(t, e, r);
  return n > r ? r : n;
}
function zs() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Fs(t) {
  return Object.assign({}, zs(), t);
}
function Xs(t, e) {
  return e.reduce(function (r, n) {
    return (r[n] = t), r;
  }, {});
}
var Qa = function (e, r) {
  return (
    (e =
      typeof e == "function"
        ? e(Object.assign({}, r.rects, { placement: r.placement }))
        : e),
    Fs(typeof e != "number" ? e : Xs(e, mi))
  );
};
function Ga(t) {
  var e,
    r = t.state,
    n = t.name,
    s = t.options,
    c = r.elements.arrow,
    u = r.modifiersData.popperOffsets,
    d = ee(r.placement),
    g = ur(d),
    b = [Nt, qt].indexOf(d) >= 0,
    w = b ? "height" : "width";
  if (!(!c || !u)) {
    var S = Qa(s.padding, r),
      I = cr(c),
      D = g === "y" ? Ht : Nt,
      k = g === "y" ? Yt : qt,
      C =
        r.rects.reference[w] + r.rects.reference[g] - u[g] - r.rects.popper[w],
      T = u[g] - r.rects.reference[g],
      a = vi(c),
      W = a ? (g === "y" ? a.clientHeight || 0 : a.clientWidth || 0) : 0,
      H = C / 2 - T / 2,
      O = S[D],
      B = W - I[w] - S[k],
      Y = W / 2 - I[w] / 2 + H,
      U = hi(O, Y, B),
      tt = g;
    r.modifiersData[n] = ((e = {}), (e[tt] = U), (e.centerOffset = U - Y), e);
  }
}
function Ja(t) {
  var e = t.state,
    r = t.options,
    n = r.element,
    s = n === void 0 ? "[data-popper-arrow]" : n;
  s != null &&
    ((typeof s == "string" && ((s = e.elements.popper.querySelector(s)), !s)) ||
      (js(e.elements.popper, s) && (e.elements.arrow = s)));
}
const Za = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ga,
  effect: Ja,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function Ge(t) {
  return t.split("-")[1];
}
var $a = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function tl(t, e) {
  var r = t.x,
    n = t.y,
    s = e.devicePixelRatio || 1;
  return { x: Ke(r * s) / s || 0, y: Ke(n * s) / s || 0 };
}
function ds(t) {
  var e,
    r = t.popper,
    n = t.popperRect,
    s = t.placement,
    c = t.variation,
    u = t.offsets,
    d = t.position,
    g = t.gpuAcceleration,
    b = t.adaptive,
    w = t.roundOffsets,
    S = t.isFixed,
    I = u.x,
    D = I === void 0 ? 0 : I,
    k = u.y,
    C = k === void 0 ? 0 : k,
    T = typeof w == "function" ? w({ x: D, y: C }) : { x: D, y: C };
  (D = T.x), (C = T.y);
  var a = u.hasOwnProperty("x"),
    W = u.hasOwnProperty("y"),
    H = Nt,
    O = Ht,
    B = window;
  if (b) {
    var Y = vi(r),
      U = "clientHeight",
      tt = "clientWidth";
    if (
      (Y === Bt(r) &&
        ((Y = xe(r)),
        ae(Y).position !== "static" &&
          d === "absolute" &&
          ((U = "scrollHeight"), (tt = "scrollWidth"))),
      (Y = Y),
      s === Ht || ((s === Nt || s === qt) && c === pi))
    ) {
      O = Yt;
      var Q = S && Y === B && B.visualViewport ? B.visualViewport.height : Y[U];
      (C -= Q - n.height), (C *= g ? 1 : -1);
    }
    if (s === Nt || ((s === Ht || s === Yt) && c === pi)) {
      H = qt;
      var it =
        S && Y === B && B.visualViewport ? B.visualViewport.width : Y[tt];
      (D -= it - n.width), (D *= g ? 1 : -1);
    }
  }
  var G = Object.assign({ position: d }, b && $a),
    ut = w === !0 ? tl({ x: D, y: C }, Bt(r)) : { x: D, y: C };
  if (((D = ut.x), (C = ut.y), g)) {
    var lt;
    return Object.assign(
      {},
      G,
      ((lt = {}),
      (lt[O] = W ? "0" : ""),
      (lt[H] = a ? "0" : ""),
      (lt.transform =
        (B.devicePixelRatio || 1) <= 1
          ? "translate(" + D + "px, " + C + "px)"
          : "translate3d(" + D + "px, " + C + "px, 0)"),
      lt)
    );
  }
  return Object.assign(
    {},
    G,
    ((e = {}),
    (e[O] = W ? C + "px" : ""),
    (e[H] = a ? D + "px" : ""),
    (e.transform = ""),
    e)
  );
}
function el(t) {
  var e = t.state,
    r = t.options,
    n = r.gpuAcceleration,
    s = n === void 0 ? !0 : n,
    c = r.adaptive,
    u = c === void 0 ? !0 : c,
    d = r.roundOffsets,
    g = d === void 0 ? !0 : d,
    b = {
      placement: ee(e.placement),
      variation: Ge(e.placement),
      popper: e.elements.popper,
      popperRect: e.rects.popper,
      gpuAcceleration: s,
      isFixed: e.options.strategy === "fixed",
    };
  e.modifiersData.popperOffsets != null &&
    (e.styles.popper = Object.assign(
      {},
      e.styles.popper,
      ds(
        Object.assign({}, b, {
          offsets: e.modifiersData.popperOffsets,
          position: e.options.strategy,
          adaptive: u,
          roundOffsets: g,
        })
      )
    )),
    e.modifiersData.arrow != null &&
      (e.styles.arrow = Object.assign(
        {},
        e.styles.arrow,
        ds(
          Object.assign({}, b, {
            offsets: e.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: g,
          })
        )
      )),
    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
      "data-popper-placement": e.placement,
    }));
}
const il = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: el,
  data: {},
};
var Yi = { passive: !0 };
function nl(t) {
  var e = t.state,
    r = t.instance,
    n = t.options,
    s = n.scroll,
    c = s === void 0 ? !0 : s,
    u = n.resize,
    d = u === void 0 ? !0 : u,
    g = Bt(e.elements.popper),
    b = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return (
    c &&
      b.forEach(function (w) {
        w.addEventListener("scroll", r.update, Yi);
      }),
    d && g.addEventListener("resize", r.update, Yi),
    function () {
      c &&
        b.forEach(function (w) {
          w.removeEventListener("scroll", r.update, Yi);
        }),
        d && g.removeEventListener("resize", r.update, Yi);
    }
  );
}
const rl = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: nl,
  data: {},
};
var sl = { left: "right", right: "left", bottom: "top", top: "bottom" };
function en(t) {
  return t.replace(/left|right|bottom|top/g, function (e) {
    return sl[e];
  });
}
var ol = { start: "end", end: "start" };
function ps(t) {
  return t.replace(/start|end/g, function (e) {
    return ol[e];
  });
}
function hr(t) {
  var e = Bt(t),
    r = e.pageXOffset,
    n = e.pageYOffset;
  return { scrollLeft: r, scrollTop: n };
}
function fr(t) {
  return Qe(xe(t)).left + hr(t).scrollLeft;
}
function al(t, e) {
  var r = Bt(t),
    n = xe(t),
    s = r.visualViewport,
    c = n.clientWidth,
    u = n.clientHeight,
    d = 0,
    g = 0;
  if (s) {
    (c = s.width), (u = s.height);
    var b = Bs();
    (b || (!b && e === "fixed")) && ((d = s.offsetLeft), (g = s.offsetTop));
  }
  return { width: c, height: u, x: d + fr(t), y: g };
}
function ll(t) {
  var e,
    r = xe(t),
    n = hr(t),
    s = (e = t.ownerDocument) == null ? void 0 : e.body,
    c = Oe(
      r.scrollWidth,
      r.clientWidth,
      s ? s.scrollWidth : 0,
      s ? s.clientWidth : 0
    ),
    u = Oe(
      r.scrollHeight,
      r.clientHeight,
      s ? s.scrollHeight : 0,
      s ? s.clientHeight : 0
    ),
    d = -n.scrollLeft + fr(t),
    g = -n.scrollTop;
  return (
    ae(s || r).direction === "rtl" &&
      (d += Oe(r.clientWidth, s ? s.clientWidth : 0) - c),
    { width: c, height: u, x: d, y: g }
  );
}
function dr(t) {
  var e = ae(t),
    r = e.overflow,
    n = e.overflowX,
    s = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + s + n);
}
function Ys(t) {
  return ["html", "body", "#document"].indexOf(ie(t)) >= 0
    ? t.ownerDocument.body
    : Xt(t) && dr(t)
      ? t
      : Ys(En(t));
}
function fi(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = Ys(t),
    s = n === ((r = t.ownerDocument) == null ? void 0 : r.body),
    c = Bt(n),
    u = s ? [c].concat(c.visualViewport || [], dr(n) ? n : []) : n,
    d = e.concat(u);
  return s ? d : d.concat(fi(En(u)));
}
function Zn(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height,
  });
}
function cl(t, e) {
  var r = Qe(t, !1, e === "fixed");
  return (
    (r.top = r.top + t.clientTop),
    (r.left = r.left + t.clientLeft),
    (r.bottom = r.top + t.clientHeight),
    (r.right = r.left + t.clientWidth),
    (r.width = t.clientWidth),
    (r.height = t.clientHeight),
    (r.x = r.left),
    (r.y = r.top),
    r
  );
}
function gs(t, e, r) {
  return e === Ws ? Zn(al(t, r)) : He(e) ? cl(e, r) : Zn(ll(xe(t)));
}
function ul(t) {
  var e = fi(En(t)),
    r = ["absolute", "fixed"].indexOf(ae(t).position) >= 0,
    n = r && Xt(t) ? vi(t) : t;
  return He(n)
    ? e.filter(function (s) {
        return He(s) && js(s, n) && ie(s) !== "body";
      })
    : [];
}
function hl(t, e, r, n) {
  var s = e === "clippingParents" ? ul(t) : [].concat(e),
    c = [].concat(s, [r]),
    u = c[0],
    d = c.reduce(
      function (g, b) {
        var w = gs(t, b, n);
        return (
          (g.top = Oe(w.top, g.top)),
          (g.right = an(w.right, g.right)),
          (g.bottom = an(w.bottom, g.bottom)),
          (g.left = Oe(w.left, g.left)),
          g
        );
      },
      gs(t, u, n)
    );
  return (
    (d.width = d.right - d.left),
    (d.height = d.bottom - d.top),
    (d.x = d.left),
    (d.y = d.top),
    d
  );
}
function qs(t) {
  var e = t.reference,
    r = t.element,
    n = t.placement,
    s = n ? ee(n) : null,
    c = n ? Ge(n) : null,
    u = e.x + e.width / 2 - r.width / 2,
    d = e.y + e.height / 2 - r.height / 2,
    g;
  switch (s) {
    case Ht:
      g = { x: u, y: e.y - r.height };
      break;
    case Yt:
      g = { x: u, y: e.y + e.height };
      break;
    case qt:
      g = { x: e.x + e.width, y: d };
      break;
    case Nt:
      g = { x: e.x - r.width, y: d };
      break;
    default:
      g = { x: e.x, y: e.y };
  }
  var b = s ? ur(s) : null;
  if (b != null) {
    var w = b === "y" ? "height" : "width";
    switch (c) {
      case Ue:
        g[b] = g[b] - (e[w] / 2 - r[w] / 2);
        break;
      case pi:
        g[b] = g[b] + (e[w] / 2 - r[w] / 2);
        break;
    }
  }
  return g;
}
function gi(t, e) {
  e === void 0 && (e = {});
  var r = e,
    n = r.placement,
    s = n === void 0 ? t.placement : n,
    c = r.strategy,
    u = c === void 0 ? t.strategy : c,
    d = r.boundary,
    g = d === void 0 ? Pa : d,
    b = r.rootBoundary,
    w = b === void 0 ? Ws : b,
    S = r.elementContext,
    I = S === void 0 ? li : S,
    D = r.altBoundary,
    k = D === void 0 ? !1 : D,
    C = r.padding,
    T = C === void 0 ? 0 : C,
    a = Fs(typeof T != "number" ? T : Xs(T, mi)),
    W = I === li ? Oa : li,
    H = t.rects.popper,
    O = t.elements[k ? W : I],
    B = hl(He(O) ? O : O.contextElement || xe(t.elements.popper), g, w, u),
    Y = Qe(t.elements.reference),
    U = qs({ reference: Y, element: H, strategy: "absolute", placement: s }),
    tt = Zn(Object.assign({}, H, U)),
    Q = I === li ? tt : Y,
    it = {
      top: B.top - Q.top + a.top,
      bottom: Q.bottom - B.bottom + a.bottom,
      left: B.left - Q.left + a.left,
      right: Q.right - B.right + a.right,
    },
    G = t.modifiersData.offset;
  if (I === li && G) {
    var ut = G[s];
    Object.keys(it).forEach(function (lt) {
      var Ct = [qt, Yt].indexOf(lt) >= 0 ? 1 : -1,
        yt = [Ht, Yt].indexOf(lt) >= 0 ? "y" : "x";
      it[lt] += ut[yt] * Ct;
    });
  }
  return it;
}
function fl(t, e) {
  e === void 0 && (e = {});
  var r = e,
    n = r.placement,
    s = r.boundary,
    c = r.rootBoundary,
    u = r.padding,
    d = r.flipVariations,
    g = r.allowedAutoPlacements,
    b = g === void 0 ? Rs : g,
    w = Ge(n),
    S = w
      ? d
        ? hs
        : hs.filter(function (k) {
            return Ge(k) === w;
          })
      : mi,
    I = S.filter(function (k) {
      return b.indexOf(k) >= 0;
    });
  I.length === 0 && (I = S);
  var D = I.reduce(function (k, C) {
    return (
      (k[C] = gi(t, { placement: C, boundary: s, rootBoundary: c, padding: u })[
        ee(C)
      ]),
      k
    );
  }, {});
  return Object.keys(D).sort(function (k, C) {
    return D[k] - D[C];
  });
}
function dl(t) {
  if (ee(t) === ar) return [];
  var e = en(t);
  return [ps(t), e, ps(e)];
}
function pl(t) {
  var e = t.state,
    r = t.options,
    n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (
      var s = r.mainAxis,
        c = s === void 0 ? !0 : s,
        u = r.altAxis,
        d = u === void 0 ? !0 : u,
        g = r.fallbackPlacements,
        b = r.padding,
        w = r.boundary,
        S = r.rootBoundary,
        I = r.altBoundary,
        D = r.flipVariations,
        k = D === void 0 ? !0 : D,
        C = r.allowedAutoPlacements,
        T = e.options.placement,
        a = ee(T),
        W = a === T,
        H = g || (W || !k ? [en(T)] : dl(T)),
        O = [T].concat(H).reduce(function (Mt, kt) {
          return Mt.concat(
            ee(kt) === ar
              ? fl(e, {
                  placement: kt,
                  boundary: w,
                  rootBoundary: S,
                  padding: b,
                  flipVariations: k,
                  allowedAutoPlacements: C,
                })
              : kt
          );
        }, []),
        B = e.rects.reference,
        Y = e.rects.popper,
        U = new Map(),
        tt = !0,
        Q = O[0],
        it = 0;
      it < O.length;
      it++
    ) {
      var G = O[it],
        ut = ee(G),
        lt = Ge(G) === Ue,
        Ct = [Ht, Yt].indexOf(ut) >= 0,
        yt = Ct ? "width" : "height",
        wt = gi(e, {
          placement: G,
          boundary: w,
          rootBoundary: S,
          altBoundary: I,
          padding: b,
        }),
        Tt = Ct ? (lt ? qt : Nt) : lt ? Yt : Ht;
      B[yt] > Y[yt] && (Tt = en(Tt));
      var ce = en(Tt),
        Ut = [];
      if (
        (c && Ut.push(wt[ut] <= 0),
        d && Ut.push(wt[Tt] <= 0, wt[ce] <= 0),
        Ut.every(function (Mt) {
          return Mt;
        }))
      ) {
        (Q = G), (tt = !1);
        break;
      }
      U.set(G, Ut);
    }
    if (tt)
      for (
        var dt = k ? 3 : 1,
          Kt = function (kt) {
            var jt = O.find(function (zt) {
              var ne = U.get(zt);
              if (ne)
                return ne.slice(0, kt).every(function (Ze) {
                  return Ze;
                });
            });
            if (jt) return (Q = jt), "break";
          },
          It = dt;
        It > 0;
        It--
      ) {
        var bt = Kt(It);
        if (bt === "break") break;
      }
    e.placement !== Q &&
      ((e.modifiersData[n]._skip = !0), (e.placement = Q), (e.reset = !0));
  }
}
const gl = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: pl,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function ms(t, e, r) {
  return (
    r === void 0 && (r = { x: 0, y: 0 }),
    {
      top: t.top - e.height - r.y,
      right: t.right - e.width + r.x,
      bottom: t.bottom - e.height + r.y,
      left: t.left - e.width - r.x,
    }
  );
}
function vs(t) {
  return [Ht, qt, Yt, Nt].some(function (e) {
    return t[e] >= 0;
  });
}
function ml(t) {
  var e = t.state,
    r = t.name,
    n = e.rects.reference,
    s = e.rects.popper,
    c = e.modifiersData.preventOverflow,
    u = gi(e, { elementContext: "reference" }),
    d = gi(e, { altBoundary: !0 }),
    g = ms(u, n),
    b = ms(d, s, c),
    w = vs(g),
    S = vs(b);
  (e.modifiersData[r] = {
    referenceClippingOffsets: g,
    popperEscapeOffsets: b,
    isReferenceHidden: w,
    hasPopperEscaped: S,
  }),
    (e.attributes.popper = Object.assign({}, e.attributes.popper, {
      "data-popper-reference-hidden": w,
      "data-popper-escaped": S,
    }));
}
const vl = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ml,
};
function yl(t, e, r) {
  var n = ee(t),
    s = [Nt, Ht].indexOf(n) >= 0 ? -1 : 1,
    c = typeof r == "function" ? r(Object.assign({}, e, { placement: t })) : r,
    u = c[0],
    d = c[1];
  return (
    (u = u || 0),
    (d = (d || 0) * s),
    [Nt, qt].indexOf(n) >= 0 ? { x: d, y: u } : { x: u, y: d }
  );
}
function bl(t) {
  var e = t.state,
    r = t.options,
    n = t.name,
    s = r.offset,
    c = s === void 0 ? [0, 0] : s,
    u = Rs.reduce(function (w, S) {
      return (w[S] = yl(S, e.rects, c)), w;
    }, {}),
    d = u[e.placement],
    g = d.x,
    b = d.y;
  e.modifiersData.popperOffsets != null &&
    ((e.modifiersData.popperOffsets.x += g),
    (e.modifiersData.popperOffsets.y += b)),
    (e.modifiersData[n] = u);
}
const _l = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: bl,
};
function wl(t) {
  var e = t.state,
    r = t.name;
  e.modifiersData[r] = qs({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement,
  });
}
const El = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: wl,
  data: {},
};
function xl(t) {
  return t === "x" ? "y" : "x";
}
function Cl(t) {
  var e = t.state,
    r = t.options,
    n = t.name,
    s = r.mainAxis,
    c = s === void 0 ? !0 : s,
    u = r.altAxis,
    d = u === void 0 ? !1 : u,
    g = r.boundary,
    b = r.rootBoundary,
    w = r.altBoundary,
    S = r.padding,
    I = r.tether,
    D = I === void 0 ? !0 : I,
    k = r.tetherOffset,
    C = k === void 0 ? 0 : k,
    T = gi(e, { boundary: g, rootBoundary: b, padding: S, altBoundary: w }),
    a = ee(e.placement),
    W = Ge(e.placement),
    H = !W,
    O = ur(a),
    B = xl(O),
    Y = e.modifiersData.popperOffsets,
    U = e.rects.reference,
    tt = e.rects.popper,
    Q =
      typeof C == "function"
        ? C(Object.assign({}, e.rects, { placement: e.placement }))
        : C,
    it =
      typeof Q == "number"
        ? { mainAxis: Q, altAxis: Q }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, Q),
    G = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
    ut = { x: 0, y: 0 };
  if (Y) {
    if (c) {
      var lt,
        Ct = O === "y" ? Ht : Nt,
        yt = O === "y" ? Yt : qt,
        wt = O === "y" ? "height" : "width",
        Tt = Y[O],
        ce = Tt + T[Ct],
        Ut = Tt - T[yt],
        dt = D ? -tt[wt] / 2 : 0,
        Kt = W === Ue ? U[wt] : tt[wt],
        It = W === Ue ? -tt[wt] : -U[wt],
        bt = e.elements.arrow,
        Mt = D && bt ? cr(bt) : { width: 0, height: 0 },
        kt = e.modifiersData["arrow#persistent"]
          ? e.modifiersData["arrow#persistent"].padding
          : zs(),
        jt = kt[Ct],
        zt = kt[yt],
        ne = hi(0, U[wt], Mt[wt]),
        Ze = H
          ? U[wt] / 2 - dt - ne - jt - it.mainAxis
          : Kt - ne - jt - it.mainAxis,
        Cn = H
          ? -U[wt] / 2 + dt + ne + zt + it.mainAxis
          : It + ne + zt + it.mainAxis,
        Ne = e.elements.arrow && vi(e.elements.arrow),
        _i = Ne ? (O === "y" ? Ne.clientTop || 0 : Ne.clientLeft || 0) : 0,
        Me = (lt = G == null ? void 0 : G[O]) != null ? lt : 0,
        wi = Tt + Ze - Me - _i,
        Tn = Tt + Cn - Me,
        Ei = hi(D ? an(ce, wi) : ce, Tt, D ? Oe(Ut, Tn) : Ut);
      (Y[O] = Ei), (ut[O] = Ei - Tt);
    }
    if (d) {
      var xi,
        Ci = O === "x" ? Ht : Nt,
        Ti = O === "x" ? Yt : qt,
        Pt = Y[B],
        re = B === "y" ? "height" : "width",
        ki = Pt + T[Ci],
        Ai = Pt - T[Ti],
        $e = [Ht, Nt].indexOf(a) !== -1,
        ti = (xi = G == null ? void 0 : G[B]) != null ? xi : 0,
        Si = $e ? ki : Pt - U[re] - tt[re] - ti + it.altAxis,
        ue = $e ? Pt + U[re] + tt[re] - ti - it.altAxis : Ai,
        ei = D && $e ? Ka(Si, Pt, ue) : hi(D ? Si : ki, Pt, D ? ue : Ai);
      (Y[B] = ei), (ut[B] = ei - Pt);
    }
    e.modifiersData[n] = ut;
  }
}
const Tl = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Cl,
  requiresIfExists: ["offset"],
};
function kl(t) {
  return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
}
function Al(t) {
  return t === Bt(t) || !Xt(t) ? hr(t) : kl(t);
}
function Sl(t) {
  var e = t.getBoundingClientRect(),
    r = Ke(e.width) / t.offsetWidth || 1,
    n = Ke(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Ll(t, e, r) {
  r === void 0 && (r = !1);
  var n = Xt(e),
    s = Xt(e) && Sl(e),
    c = xe(e),
    u = Qe(t, s, r),
    d = { scrollLeft: 0, scrollTop: 0 },
    g = { x: 0, y: 0 };
  return (
    (n || (!n && !r)) &&
      ((ie(e) !== "body" || dr(c)) && (d = Al(e)),
      Xt(e)
        ? ((g = Qe(e, !0)), (g.x += e.clientLeft), (g.y += e.clientTop))
        : c && (g.x = fr(c))),
    {
      x: u.left + d.scrollLeft - g.x,
      y: u.top + d.scrollTop - g.y,
      width: u.width,
      height: u.height,
    }
  );
}
function Il(t) {
  var e = new Map(),
    r = new Set(),
    n = [];
  t.forEach(function (c) {
    e.set(c.name, c);
  });
  function s(c) {
    r.add(c.name);
    var u = [].concat(c.requires || [], c.requiresIfExists || []);
    u.forEach(function (d) {
      if (!r.has(d)) {
        var g = e.get(d);
        g && s(g);
      }
    }),
      n.push(c);
  }
  return (
    t.forEach(function (c) {
      r.has(c.name) || s(c);
    }),
    n
  );
}
function Pl(t) {
  var e = Il(t);
  return Fa.reduce(function (r, n) {
    return r.concat(
      e.filter(function (s) {
        return s.phase === n;
      })
    );
  }, []);
}
function Ol(t) {
  var e;
  return function () {
    return (
      e ||
        (e = new Promise(function (r) {
          Promise.resolve().then(function () {
            (e = void 0), r(t());
          });
        })),
      e
    );
  };
}
function Dl(t) {
  var e = t.reduce(function (r, n) {
    var s = r[n.name];
    return (
      (r[n.name] = s
        ? Object.assign({}, s, n, {
            options: Object.assign({}, s.options, n.options),
            data: Object.assign({}, s.data, n.data),
          })
        : n),
      r
    );
  }, {});
  return Object.keys(e).map(function (r) {
    return e[r];
  });
}
var ys = { placement: "bottom", modifiers: [], strategy: "absolute" };
function bs() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function (n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Hl(t) {
  t === void 0 && (t = {});
  var e = t,
    r = e.defaultModifiers,
    n = r === void 0 ? [] : r,
    s = e.defaultOptions,
    c = s === void 0 ? ys : s;
  return function (d, g, b) {
    b === void 0 && (b = c);
    var w = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, ys, c),
        modifiersData: {},
        elements: { reference: d, popper: g },
        attributes: {},
        styles: {},
      },
      S = [],
      I = !1,
      D = {
        state: w,
        setOptions: function (a) {
          var W = typeof a == "function" ? a(w.options) : a;
          C(),
            (w.options = Object.assign({}, c, w.options, W)),
            (w.scrollParents = {
              reference: He(d)
                ? fi(d)
                : d.contextElement
                  ? fi(d.contextElement)
                  : [],
              popper: fi(g),
            });
          var H = Pl(Dl([].concat(n, w.options.modifiers)));
          return (
            (w.orderedModifiers = H.filter(function (O) {
              return O.enabled;
            })),
            k(),
            D.update()
          );
        },
        forceUpdate: function () {
          if (!I) {
            var a = w.elements,
              W = a.reference,
              H = a.popper;
            if (bs(W, H)) {
              (w.rects = {
                reference: Ll(W, vi(H), w.options.strategy === "fixed"),
                popper: cr(H),
              }),
                (w.reset = !1),
                (w.placement = w.options.placement),
                w.orderedModifiers.forEach(function (it) {
                  return (w.modifiersData[it.name] = Object.assign(
                    {},
                    it.data
                  ));
                });
              for (var O = 0; O < w.orderedModifiers.length; O++) {
                if (w.reset === !0) {
                  (w.reset = !1), (O = -1);
                  continue;
                }
                var B = w.orderedModifiers[O],
                  Y = B.fn,
                  U = B.options,
                  tt = U === void 0 ? {} : U,
                  Q = B.name;
                typeof Y == "function" &&
                  (w = Y({ state: w, options: tt, name: Q, instance: D }) || w);
              }
            }
          }
        },
        update: Ol(function () {
          return new Promise(function (T) {
            D.forceUpdate(), T(w);
          });
        }),
        destroy: function () {
          C(), (I = !0);
        },
      };
    if (!bs(d, g)) return D;
    D.setOptions(b).then(function (T) {
      !I && b.onFirstUpdate && b.onFirstUpdate(T);
    });
    function k() {
      w.orderedModifiers.forEach(function (T) {
        var a = T.name,
          W = T.options,
          H = W === void 0 ? {} : W,
          O = T.effect;
        if (typeof O == "function") {
          var B = O({ state: w, name: a, instance: D, options: H }),
            Y = function () {};
          S.push(B || Y);
        }
      });
    }
    function C() {
      S.forEach(function (T) {
        return T();
      }),
        (S = []);
    }
    return D;
  };
}
var Nl = [rl, El, il, qa, _l, gl, Tl, Za, vl],
  pr = Hl({ defaultModifiers: Nl }),
  me =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (me =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        me.apply(this, arguments)
      );
    },
  qi =
    (globalThis && globalThis.__spreadArray) ||
    function (t, e, r) {
      if (r || arguments.length === 2)
        for (var n = 0, s = e.length, c; n < s; n++)
          (c || !(n in e)) &&
            (c || (c = Array.prototype.slice.call(e, 0, n)), (c[n] = e[n]));
      return t.concat(c || Array.prototype.slice.call(e));
    },
  ve = {
    placement: "bottom",
    triggerType: "click",
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    ignoreClickOutsideClass: !1,
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  Ml = { id: null, override: !0 },
  Vs = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = ve),
        s === void 0 && (s = Ml),
        (this._instanceId = s.id ? s.id : e.id),
        (this._targetEl = e),
        (this._triggerEl = r),
        (this._options = me(me({}, ve), n)),
        (this._popperInstance = null),
        (this._visible = !1),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Dropdown", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        this._triggerEl &&
          this._targetEl &&
          !this._initialized &&
          ((this._popperInstance = this._createPopperInstance()),
          this._setupEventListeners(),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        var e = this,
          r = this._getTriggerEvents();
        this._options.triggerType === "click" &&
          r.showEvents.forEach(function (n) {
            e._triggerEl.removeEventListener(n, e._clickHandler);
          }),
          this._options.triggerType === "hover" &&
            (r.showEvents.forEach(function (n) {
              e._triggerEl.removeEventListener(n, e._hoverShowTriggerElHandler),
                e._targetEl.removeEventListener(n, e._hoverShowTargetElHandler);
            }),
            r.hideEvents.forEach(function (n) {
              e._triggerEl.removeEventListener(n, e._hoverHideHandler),
                e._targetEl.removeEventListener(n, e._hoverHideHandler);
            })),
          this._popperInstance.destroy(),
          (this._initialized = !1);
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Dropdown", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype._setupEventListeners = function () {
        var e = this,
          r = this._getTriggerEvents();
        (this._clickHandler = function () {
          e.toggle();
        }),
          this._options.triggerType === "click" &&
            r.showEvents.forEach(function (n) {
              e._triggerEl.addEventListener(n, e._clickHandler);
            }),
          (this._hoverShowTriggerElHandler = function (n) {
            n.type === "click"
              ? e.toggle()
              : setTimeout(function () {
                  e.show();
                }, e._options.delay);
          }),
          (this._hoverShowTargetElHandler = function () {
            e.show();
          }),
          (this._hoverHideHandler = function () {
            setTimeout(function () {
              e._targetEl.matches(":hover") || e.hide();
            }, e._options.delay);
          }),
          this._options.triggerType === "hover" &&
            (r.showEvents.forEach(function (n) {
              e._triggerEl.addEventListener(n, e._hoverShowTriggerElHandler),
                e._targetEl.addEventListener(n, e._hoverShowTargetElHandler);
            }),
            r.hideEvents.forEach(function (n) {
              e._triggerEl.addEventListener(n, e._hoverHideHandler),
                e._targetEl.addEventListener(n, e._hoverHideHandler);
            }));
      }),
      (t.prototype._createPopperInstance = function () {
        return pr(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [
                  this._options.offsetSkidding,
                  this._options.offsetDistance,
                ],
              },
            },
          ],
        });
      }),
      (t.prototype._setupClickOutsideListener = function () {
        var e = this;
        (this._clickOutsideEventListener = function (r) {
          e._handleClickOutside(r, e._targetEl);
        }),
          document.body.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          );
      }),
      (t.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener(
          "click",
          this._clickOutsideEventListener,
          !0
        );
      }),
      (t.prototype._handleClickOutside = function (e, r) {
        var n = e.target,
          s = this._options.ignoreClickOutsideClass,
          c = !1;
        if (s) {
          var u = document.querySelectorAll(".".concat(s));
          u.forEach(function (d) {
            if (d.contains(n)) {
              c = !0;
              return;
            }
          });
        }
        n !== r &&
          !r.contains(n) &&
          !this._triggerEl.contains(n) &&
          !c &&
          this.isVisible() &&
          this.hide();
      }),
      (t.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "click"],
              hideEvents: ["mouseleave"],
            };
          case "click":
            return { showEvents: ["click"], hideEvents: [] };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return { showEvents: ["click"], hideEvents: [] };
        }
      }),
      (t.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show(),
          this._options.onToggle(this);
      }),
      (t.prototype.isVisible = function () {
        return this._visible;
      }),
      (t.prototype.show = function () {
        this._targetEl.classList.remove("hidden"),
          this._targetEl.classList.add("block"),
          this._popperInstance.setOptions(function (e) {
            return me(me({}, e), {
              modifiers: qi(
                qi([], e.modifiers, !0),
                [{ name: "eventListeners", enabled: !0 }],
                !1
              ),
            });
          }),
          this._setupClickOutsideListener(),
          this._popperInstance.update(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (t.prototype.hide = function () {
        this._targetEl.classList.remove("block"),
          this._targetEl.classList.add("hidden"),
          this._popperInstance.setOptions(function (e) {
            return me(me({}, e), {
              modifiers: qi(
                qi([], e.modifiers, !0),
                [{ name: "eventListeners", enabled: !1 }],
                !1
              ),
            });
          }),
          (this._visible = !1),
          this._removeClickOutsideListener(),
          this._options.onHide(this);
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function gr() {
  document.querySelectorAll("[data-dropdown-toggle]").forEach(function (t) {
    var e = t.getAttribute("data-dropdown-toggle"),
      r = document.getElementById(e);
    if (r) {
      var n = t.getAttribute("data-dropdown-placement"),
        s = t.getAttribute("data-dropdown-offset-skidding"),
        c = t.getAttribute("data-dropdown-offset-distance"),
        u = t.getAttribute("data-dropdown-trigger"),
        d = t.getAttribute("data-dropdown-delay"),
        g = t.getAttribute("data-dropdown-ignore-click-outside-class");
      new Vs(r, t, {
        placement: n || ve.placement,
        triggerType: u || ve.triggerType,
        offsetSkidding: s ? parseInt(s) : ve.offsetSkidding,
        offsetDistance: c ? parseInt(c) : ve.offsetDistance,
        delay: d ? parseInt(d) : ve.delay,
        ignoreClickOutsideClass: g || ve.ignoreClickOutsideClass,
      });
    } else
      console.error(
        'The dropdown element with id "'.concat(
          e,
          '" does not exist. Please check the data-dropdown-toggle attribute.'
        )
      );
  });
}
typeof window < "u" && ((window.Dropdown = Vs), (window.initDropdowns = gr));
var ln =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (ln =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        ln.apply(this, arguments)
      );
    },
  cn = {
    placement: "center",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    backdrop: "dynamic",
    closable: !0,
    onHide: function () {},
    onShow: function () {},
    onToggle: function () {},
  },
  Wl = { id: null, override: !0 },
  Us = (function () {
    function t(e, r, n) {
      e === void 0 && (e = null),
        r === void 0 && (r = cn),
        n === void 0 && (n = Wl),
        (this._eventListenerInstances = []),
        (this._instanceId = n.id ? n.id : e.id),
        (this._targetEl = e),
        (this._options = ln(ln({}, cn), r)),
        (this._isHidden = !0),
        (this._backdropEl = null),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Modal", this, this._instanceId, n.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._targetEl &&
          !this._initialized &&
          (this._getPlacementClasses().map(function (r) {
            e._targetEl.classList.add(r);
          }),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._initialized &&
          (this.removeAllEventListenerInstances(),
          this._destroyBackdropEl(),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Modal", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype._createBackdrop = function () {
        var e;
        if (this._isHidden) {
          var r = document.createElement("div");
          r.setAttribute("modal-backdrop", ""),
            (e = r.classList).add.apply(
              e,
              this._options.backdropClasses.split(" ")
            ),
            document.querySelector("body").append(r),
            (this._backdropEl = r);
        }
      }),
      (t.prototype._destroyBackdropEl = function () {
        this._isHidden || document.querySelector("[modal-backdrop]").remove();
      }),
      (t.prototype._setupModalCloseEventListeners = function () {
        var e = this;
        this._options.backdrop === "dynamic" &&
          ((this._clickOutsideEventListener = function (r) {
            e._handleOutsideClick(r.target);
          }),
          this._targetEl.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          )),
          (this._keydownEventListener = function (r) {
            r.key === "Escape" && e.hide();
          }),
          document.body.addEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (t.prototype._removeModalCloseEventListeners = function () {
        this._options.backdrop === "dynamic" &&
          this._targetEl.removeEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          ),
          document.body.removeEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (t.prototype._handleOutsideClick = function (e) {
        (e === this._targetEl ||
          (e === this._backdropEl && this.isVisible())) &&
          this.hide();
      }),
      (t.prototype._getPlacementClasses = function () {
        switch (this._options.placement) {
          case "top-left":
            return ["justify-start", "items-start"];
          case "top-center":
            return ["justify-center", "items-start"];
          case "top-right":
            return ["justify-end", "items-start"];
          case "center-left":
            return ["justify-start", "items-center"];
          case "center":
            return ["justify-center", "items-center"];
          case "center-right":
            return ["justify-end", "items-center"];
          case "bottom-left":
            return ["justify-start", "items-end"];
          case "bottom-center":
            return ["justify-center", "items-end"];
          case "bottom-right":
            return ["justify-end", "items-end"];
          default:
            return ["justify-center", "items-center"];
        }
      }),
      (t.prototype.toggle = function () {
        this._isHidden ? this.show() : this.hide(),
          this._options.onToggle(this);
      }),
      (t.prototype.show = function () {
        this.isHidden &&
          (this._targetEl.classList.add("flex"),
          this._targetEl.classList.remove("hidden"),
          this._targetEl.setAttribute("aria-modal", "true"),
          this._targetEl.setAttribute("role", "dialog"),
          this._targetEl.removeAttribute("aria-hidden"),
          this._createBackdrop(),
          (this._isHidden = !1),
          this._options.closable && this._setupModalCloseEventListeners(),
          document.body.classList.add("overflow-hidden"),
          this._options.onShow(this));
      }),
      (t.prototype.hide = function () {
        this.isVisible &&
          (this._targetEl.classList.add("hidden"),
          this._targetEl.classList.remove("flex"),
          this._targetEl.setAttribute("aria-hidden", "true"),
          this._targetEl.removeAttribute("aria-modal"),
          this._targetEl.removeAttribute("role"),
          this._destroyBackdropEl(),
          (this._isHidden = !0),
          document.body.classList.remove("overflow-hidden"),
          this._options.closable && this._removeModalCloseEventListeners(),
          this._options.onHide(this));
      }),
      (t.prototype.isVisible = function () {
        return !this._isHidden;
      }),
      (t.prototype.isHidden = function () {
        return this._isHidden;
      }),
      (t.prototype.addEventListenerInstance = function (e, r, n) {
        this._eventListenerInstances.push({ element: e, type: r, handler: n });
      }),
      (t.prototype.removeAllEventListenerInstances = function () {
        this._eventListenerInstances.map(function (e) {
          e.element.removeEventListener(e.type, e.handler);
        }),
          (this._eventListenerInstances = []);
      }),
      (t.prototype.getAllEventListenerInstances = function () {
        return this._eventListenerInstances;
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function mr() {
  document.querySelectorAll("[data-modal-target]").forEach(function (t) {
    var e = t.getAttribute("data-modal-target"),
      r = document.getElementById(e);
    if (r) {
      var n = r.getAttribute("data-modal-placement"),
        s = r.getAttribute("data-modal-backdrop");
      new Us(r, { placement: n || cn.placement, backdrop: s || cn.backdrop });
    } else
      console.error(
        "Modal with id ".concat(
          e,
          " does not exist. Are you sure that the data-modal-target attribute points to the correct modal id?."
        )
      );
  }),
    document.querySelectorAll("[data-modal-toggle]").forEach(function (t) {
      var e = t.getAttribute("data-modal-toggle"),
        r = document.getElementById(e);
      if (r) {
        var n = at.getInstance("Modal", e);
        if (n) {
          var s = function () {
            n.toggle();
          };
          t.addEventListener("click", s),
            n.addEventListenerInstance(t, "click", s);
        } else
          console.error(
            "Modal with id ".concat(
              e,
              " has not been initialized. Please initialize it using the data-modal-target attribute."
            )
          );
      } else
        console.error(
          "Modal with id ".concat(
            e,
            " does not exist. Are you sure that the data-modal-toggle attribute points to the correct modal id?"
          )
        );
    }),
    document.querySelectorAll("[data-modal-show]").forEach(function (t) {
      var e = t.getAttribute("data-modal-show"),
        r = document.getElementById(e);
      if (r) {
        var n = at.getInstance("Modal", e);
        if (n) {
          var s = function () {
            n.show();
          };
          t.addEventListener("click", s),
            n.addEventListenerInstance(t, "click", s);
        } else
          console.error(
            "Modal with id ".concat(
              e,
              " has not been initialized. Please initialize it using the data-modal-target attribute."
            )
          );
      } else
        console.error(
          "Modal with id ".concat(
            e,
            " does not exist. Are you sure that the data-modal-show attribute points to the correct modal id?"
          )
        );
    }),
    document.querySelectorAll("[data-modal-hide]").forEach(function (t) {
      var e = t.getAttribute("data-modal-hide"),
        r = document.getElementById(e);
      if (r) {
        var n = at.getInstance("Modal", e);
        if (n) {
          var s = function () {
            n.hide();
          };
          t.addEventListener("click", s),
            n.addEventListenerInstance(t, "click", s);
        } else
          console.error(
            "Modal with id ".concat(
              e,
              " has not been initialized. Please initialize it using the data-modal-target attribute."
            )
          );
      } else
        console.error(
          "Modal with id ".concat(
            e,
            " does not exist. Are you sure that the data-modal-hide attribute points to the correct modal id?"
          )
        );
    });
}
typeof window < "u" && ((window.Modal = Us), (window.initModals = mr));
var un =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (un =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        un.apply(this, arguments)
      );
    },
  Ie = {
    placement: "left",
    bodyScrolling: !1,
    backdrop: !0,
    edge: !1,
    edgeOffset: "bottom-[60px]",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  Rl = { id: null, override: !0 },
  Ks = (function () {
    function t(e, r, n) {
      e === void 0 && (e = null),
        r === void 0 && (r = Ie),
        n === void 0 && (n = Rl),
        (this._eventListenerInstances = []),
        (this._instanceId = n.id ? n.id : e.id),
        (this._targetEl = e),
        (this._options = un(un({}, Ie), r)),
        (this._visible = !1),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Drawer", this, this._instanceId, n.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._targetEl &&
          !this._initialized &&
          (this._targetEl.setAttribute("aria-hidden", "true"),
          this._targetEl.classList.add("transition-transform"),
          this._getPlacementClasses(this._options.placement).base.map(
            function (r) {
              e._targetEl.classList.add(r);
            }
          ),
          (this._handleEscapeKey = function (r) {
            r.key === "Escape" && e.isVisible() && e.hide();
          }),
          document.addEventListener("keydown", this._handleEscapeKey),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._initialized &&
          (this.removeAllEventListenerInstances(),
          this._destroyBackdropEl(),
          document.removeEventListener("keydown", this._handleEscapeKey),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Drawer", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.hide = function () {
        var e = this;
        this._options.edge
          ? (this._getPlacementClasses(
              this._options.placement + "-edge"
            ).active.map(function (r) {
              e._targetEl.classList.remove(r);
            }),
            this._getPlacementClasses(
              this._options.placement + "-edge"
            ).inactive.map(function (r) {
              e._targetEl.classList.add(r);
            }))
          : (this._getPlacementClasses(this._options.placement).active.map(
              function (r) {
                e._targetEl.classList.remove(r);
              }
            ),
            this._getPlacementClasses(this._options.placement).inactive.map(
              function (r) {
                e._targetEl.classList.add(r);
              }
            )),
          this._targetEl.setAttribute("aria-hidden", "true"),
          this._targetEl.removeAttribute("aria-modal"),
          this._targetEl.removeAttribute("role"),
          this._options.bodyScrolling ||
            document.body.classList.remove("overflow-hidden"),
          this._options.backdrop && this._destroyBackdropEl(),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      (t.prototype.show = function () {
        var e = this;
        this._options.edge
          ? (this._getPlacementClasses(
              this._options.placement + "-edge"
            ).active.map(function (r) {
              e._targetEl.classList.add(r);
            }),
            this._getPlacementClasses(
              this._options.placement + "-edge"
            ).inactive.map(function (r) {
              e._targetEl.classList.remove(r);
            }))
          : (this._getPlacementClasses(this._options.placement).active.map(
              function (r) {
                e._targetEl.classList.add(r);
              }
            ),
            this._getPlacementClasses(this._options.placement).inactive.map(
              function (r) {
                e._targetEl.classList.remove(r);
              }
            )),
          this._targetEl.setAttribute("aria-modal", "true"),
          this._targetEl.setAttribute("role", "dialog"),
          this._targetEl.removeAttribute("aria-hidden"),
          this._options.bodyScrolling ||
            document.body.classList.add("overflow-hidden"),
          this._options.backdrop && this._createBackdrop(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (t.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show();
      }),
      (t.prototype._createBackdrop = function () {
        var e,
          r = this;
        if (!this._visible) {
          var n = document.createElement("div");
          n.setAttribute("drawer-backdrop", ""),
            (e = n.classList).add.apply(
              e,
              this._options.backdropClasses.split(" ")
            ),
            document.querySelector("body").append(n),
            n.addEventListener("click", function () {
              r.hide();
            });
        }
      }),
      (t.prototype._destroyBackdropEl = function () {
        this._visible &&
          document.querySelector("[drawer-backdrop]") !== null &&
          document.querySelector("[drawer-backdrop]").remove();
      }),
      (t.prototype._getPlacementClasses = function (e) {
        switch (e) {
          case "top":
            return {
              base: ["top-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["-translate-y-full"],
            };
          case "right":
            return {
              base: ["right-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-x-full"],
            };
          case "bottom":
            return {
              base: ["bottom-0", "left-0", "right-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full"],
            };
          case "left":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"],
            };
          case "bottom-edge":
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["translate-y-full", this._options.edgeOffset],
            };
          default:
            return {
              base: ["left-0", "top-0"],
              active: ["transform-none"],
              inactive: ["-translate-x-full"],
            };
        }
      }),
      (t.prototype.isHidden = function () {
        return !this._visible;
      }),
      (t.prototype.isVisible = function () {
        return this._visible;
      }),
      (t.prototype.addEventListenerInstance = function (e, r, n) {
        this._eventListenerInstances.push({ element: e, type: r, handler: n });
      }),
      (t.prototype.removeAllEventListenerInstances = function () {
        this._eventListenerInstances.map(function (e) {
          e.element.removeEventListener(e.type, e.handler);
        }),
          (this._eventListenerInstances = []);
      }),
      (t.prototype.getAllEventListenerInstances = function () {
        return this._eventListenerInstances;
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function vr() {
  document.querySelectorAll("[data-drawer-target]").forEach(function (t) {
    var e = t.getAttribute("data-drawer-target"),
      r = document.getElementById(e);
    if (r) {
      var n = t.getAttribute("data-drawer-placement"),
        s = t.getAttribute("data-drawer-body-scrolling"),
        c = t.getAttribute("data-drawer-backdrop"),
        u = t.getAttribute("data-drawer-edge"),
        d = t.getAttribute("data-drawer-edge-offset");
      new Ks(r, {
        placement: n || Ie.placement,
        bodyScrolling: s ? s === "true" : Ie.bodyScrolling,
        backdrop: c ? c === "true" : Ie.backdrop,
        edge: u ? u === "true" : Ie.edge,
        edgeOffset: d || Ie.edgeOffset,
      });
    } else
      console.error(
        "Drawer with id ".concat(
          e,
          " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"
        )
      );
  }),
    document.querySelectorAll("[data-drawer-toggle]").forEach(function (t) {
      var e = t.getAttribute("data-drawer-toggle"),
        r = document.getElementById(e);
      if (r) {
        var n = at.getInstance("Drawer", e);
        if (n) {
          var s = function () {
            n.toggle();
          };
          t.addEventListener("click", s),
            n.addEventListenerInstance(t, "click", s);
        } else
          console.error(
            "Drawer with id ".concat(
              e,
              " has not been initialized. Please initialize it using the data-drawer-target attribute."
            )
          );
      } else
        console.error(
          "Drawer with id ".concat(
            e,
            " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"
          )
        );
    }),
    document
      .querySelectorAll("[data-drawer-dismiss], [data-drawer-hide]")
      .forEach(function (t) {
        var e = t.getAttribute("data-drawer-dismiss")
            ? t.getAttribute("data-drawer-dismiss")
            : t.getAttribute("data-drawer-hide"),
          r = document.getElementById(e);
        if (r) {
          var n = at.getInstance("Drawer", e);
          if (n) {
            var s = function () {
              n.hide();
            };
            t.addEventListener("click", s),
              n.addEventListenerInstance(t, "click", s);
          } else
            console.error(
              "Drawer with id ".concat(
                e,
                " has not been initialized. Please initialize it using the data-drawer-target attribute."
              )
            );
        } else
          console.error(
            "Drawer with id ".concat(
              e,
              " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id"
            )
          );
      }),
    document.querySelectorAll("[data-drawer-show]").forEach(function (t) {
      var e = t.getAttribute("data-drawer-show"),
        r = document.getElementById(e);
      if (r) {
        var n = at.getInstance("Drawer", e);
        if (n) {
          var s = function () {
            n.show();
          };
          t.addEventListener("click", s),
            n.addEventListenerInstance(t, "click", s);
        } else
          console.error(
            "Drawer with id ".concat(
              e,
              " has not been initialized. Please initialize it using the data-drawer-target attribute."
            )
          );
      } else
        console.error(
          "Drawer with id ".concat(
            e,
            " not found. Are you sure that the data-drawer-target attribute points to the correct drawer id?"
          )
        );
    });
}
typeof window < "u" && ((window.Drawer = Ks), (window.initDrawers = vr));
var hn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (hn =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        hn.apply(this, arguments)
      );
    },
  fn = {
    defaultTabId: null,
    activeClasses:
      "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
    inactiveClasses:
      "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
    onShow: function () {},
  },
  Bl = { id: null, override: !0 },
  Qs = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = []),
        n === void 0 && (n = fn),
        s === void 0 && (s = Bl),
        (this._instanceId = s.id ? s.id : e.id),
        (this._tabsEl = e),
        (this._items = r),
        (this._activeTab = n ? this.getTab(n.defaultTabId) : null),
        (this._options = hn(hn({}, fn), n)),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Tabs", this, this._tabsEl.id, !0),
        at.addInstance("Tabs", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._items.length &&
          !this._initialized &&
          (this._activeTab || this.setActiveTab(this._items[0]),
          this.show(this._activeTab.id, !0),
          this._items.map(function (r) {
            r.triggerEl.addEventListener("click", function (n) {
              n.preventDefault(), e.show(r.id);
            });
          }));
      }),
      (t.prototype.destroy = function () {
        this._initialized && (this._initialized = !1);
      }),
      (t.prototype.removeInstance = function () {
        this.destroy(), at.removeInstance("Tabs", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.getActiveTab = function () {
        return this._activeTab;
      }),
      (t.prototype.setActiveTab = function (e) {
        this._activeTab = e;
      }),
      (t.prototype.getTab = function (e) {
        return this._items.filter(function (r) {
          return r.id === e;
        })[0];
      }),
      (t.prototype.show = function (e, r) {
        var n,
          s,
          c = this;
        r === void 0 && (r = !1);
        var u = this.getTab(e);
        (u === this._activeTab && !r) ||
          (this._items.map(function (d) {
            var g, b;
            d !== u &&
              ((g = d.triggerEl.classList).remove.apply(
                g,
                c._options.activeClasses.split(" ")
              ),
              (b = d.triggerEl.classList).add.apply(
                b,
                c._options.inactiveClasses.split(" ")
              ),
              d.targetEl.classList.add("hidden"),
              d.triggerEl.setAttribute("aria-selected", "false"));
          }),
          (n = u.triggerEl.classList).add.apply(
            n,
            this._options.activeClasses.split(" ")
          ),
          (s = u.triggerEl.classList).remove.apply(
            s,
            this._options.inactiveClasses.split(" ")
          ),
          u.triggerEl.setAttribute("aria-selected", "true"),
          u.targetEl.classList.remove("hidden"),
          this.setActiveTab(u),
          this._options.onShow(this, u));
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      t
    );
  })();
function yr() {
  document.querySelectorAll("[data-tabs-toggle]").forEach(function (t) {
    var e = [],
      r = t.getAttribute("data-tabs-active-classes"),
      n = t.getAttribute("data-tabs-inactive-classes"),
      s = null;
    t.querySelectorAll('[role="tab"]').forEach(function (c) {
      var u = c.getAttribute("aria-selected") === "true",
        d = {
          id: c.getAttribute("data-tabs-target"),
          triggerEl: c,
          targetEl: document.querySelector(c.getAttribute("data-tabs-target")),
        };
      e.push(d), u && (s = d.id);
    }),
      new Qs(t, e, {
        defaultTabId: s,
        activeClasses: r || fn.activeClasses,
        inactiveClasses: n || fn.inactiveClasses,
      });
  });
}
typeof window < "u" && ((window.Tabs = Qs), (window.initTabs = yr));
var ye =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (ye =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        ye.apply(this, arguments)
      );
    },
  Vi =
    (globalThis && globalThis.__spreadArray) ||
    function (t, e, r) {
      if (r || arguments.length === 2)
        for (var n = 0, s = e.length, c; n < s; n++)
          (c || !(n in e)) &&
            (c || (c = Array.prototype.slice.call(e, 0, n)), (c[n] = e[n]));
      return t.concat(c || Array.prototype.slice.call(e));
    },
  dn = {
    placement: "top",
    triggerType: "hover",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  jl = { id: null, override: !0 },
  Gs = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = dn),
        s === void 0 && (s = jl),
        (this._instanceId = s.id ? s.id : e.id),
        (this._targetEl = e),
        (this._triggerEl = r),
        (this._options = ye(ye({}, dn), n)),
        (this._popperInstance = null),
        (this._visible = !1),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Tooltip", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        this._triggerEl &&
          this._targetEl &&
          !this._initialized &&
          (this._setupEventListeners(),
          (this._popperInstance = this._createPopperInstance()),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        var e = this;
        if (this._initialized) {
          var r = this._getTriggerEvents();
          r.showEvents.forEach(function (n) {
            e._triggerEl.removeEventListener(n, e._showHandler);
          }),
            r.hideEvents.forEach(function (n) {
              e._triggerEl.removeEventListener(n, e._hideHandler);
            }),
            this._removeKeydownListener(),
            this._removeClickOutsideListener(),
            this._popperInstance && this._popperInstance.destroy(),
            (this._initialized = !1);
        }
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Tooltip", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype._setupEventListeners = function () {
        var e = this,
          r = this._getTriggerEvents();
        (this._showHandler = function () {
          e.show();
        }),
          (this._hideHandler = function () {
            e.hide();
          }),
          r.showEvents.forEach(function (n) {
            e._triggerEl.addEventListener(n, e._showHandler);
          }),
          r.hideEvents.forEach(function (n) {
            e._triggerEl.addEventListener(n, e._hideHandler);
          });
      }),
      (t.prototype._createPopperInstance = function () {
        return pr(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
        });
      }),
      (t.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"],
            };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
        }
      }),
      (t.prototype._setupKeydownListener = function () {
        var e = this;
        (this._keydownEventListener = function (r) {
          r.key === "Escape" && e.hide();
        }),
          document.body.addEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (t.prototype._removeKeydownListener = function () {
        document.body.removeEventListener(
          "keydown",
          this._keydownEventListener,
          !0
        );
      }),
      (t.prototype._setupClickOutsideListener = function () {
        var e = this;
        (this._clickOutsideEventListener = function (r) {
          e._handleClickOutside(r, e._targetEl);
        }),
          document.body.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          );
      }),
      (t.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener(
          "click",
          this._clickOutsideEventListener,
          !0
        );
      }),
      (t.prototype._handleClickOutside = function (e, r) {
        var n = e.target;
        n !== r &&
          !r.contains(n) &&
          !this._triggerEl.contains(n) &&
          this.isVisible() &&
          this.hide();
      }),
      (t.prototype.isVisible = function () {
        return this._visible;
      }),
      (t.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show();
      }),
      (t.prototype.show = function () {
        this._targetEl.classList.remove("opacity-0", "invisible"),
          this._targetEl.classList.add("opacity-100", "visible"),
          this._popperInstance.setOptions(function (e) {
            return ye(ye({}, e), {
              modifiers: Vi(
                Vi([], e.modifiers, !0),
                [{ name: "eventListeners", enabled: !0 }],
                !1
              ),
            });
          }),
          this._setupClickOutsideListener(),
          this._setupKeydownListener(),
          this._popperInstance.update(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (t.prototype.hide = function () {
        this._targetEl.classList.remove("opacity-100", "visible"),
          this._targetEl.classList.add("opacity-0", "invisible"),
          this._popperInstance.setOptions(function (e) {
            return ye(ye({}, e), {
              modifiers: Vi(
                Vi([], e.modifiers, !0),
                [{ name: "eventListeners", enabled: !1 }],
                !1
              ),
            });
          }),
          this._removeClickOutsideListener(),
          this._removeKeydownListener(),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function br() {
  document.querySelectorAll("[data-tooltip-target]").forEach(function (t) {
    var e = t.getAttribute("data-tooltip-target"),
      r = document.getElementById(e);
    if (r) {
      var n = t.getAttribute("data-tooltip-trigger"),
        s = t.getAttribute("data-tooltip-placement");
      new Gs(r, t, {
        placement: s || dn.placement,
        triggerType: n || dn.triggerType,
      });
    } else
      console.error(
        'The tooltip element with id "'.concat(
          e,
          '" does not exist. Please check the data-tooltip-target attribute.'
        )
      );
  });
}
typeof window < "u" && ((window.Tooltip = Gs), (window.initTooltips = br));
var be =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (be =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        be.apply(this, arguments)
      );
    },
  Ui =
    (globalThis && globalThis.__spreadArray) ||
    function (t, e, r) {
      if (r || arguments.length === 2)
        for (var n = 0, s = e.length, c; n < s; n++)
          (c || !(n in e)) &&
            (c || (c = Array.prototype.slice.call(e, 0, n)), (c[n] = e[n]));
      return t.concat(c || Array.prototype.slice.call(e));
    },
  di = {
    placement: "top",
    offset: 10,
    triggerType: "hover",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  zl = { id: null, override: !0 },
  Js = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = di),
        s === void 0 && (s = zl),
        (this._instanceId = s.id ? s.id : e.id),
        (this._targetEl = e),
        (this._triggerEl = r),
        (this._options = be(be({}, di), n)),
        (this._popperInstance = null),
        (this._visible = !1),
        (this._initialized = !1),
        this.init(),
        at.addInstance(
          "Popover",
          this,
          s.id ? s.id : this._targetEl.id,
          s.override
        );
    }
    return (
      (t.prototype.init = function () {
        this._triggerEl &&
          this._targetEl &&
          !this._initialized &&
          (this._setupEventListeners(),
          (this._popperInstance = this._createPopperInstance()),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        var e = this;
        if (this._initialized) {
          var r = this._getTriggerEvents();
          r.showEvents.forEach(function (n) {
            e._triggerEl.removeEventListener(n, e._showHandler),
              e._targetEl.removeEventListener(n, e._showHandler);
          }),
            r.hideEvents.forEach(function (n) {
              e._triggerEl.removeEventListener(n, e._hideHandler),
                e._targetEl.removeEventListener(n, e._hideHandler);
            }),
            this._removeKeydownListener(),
            this._removeClickOutsideListener(),
            this._popperInstance && this._popperInstance.destroy(),
            (this._initialized = !1);
        }
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Popover", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype._setupEventListeners = function () {
        var e = this,
          r = this._getTriggerEvents();
        (this._showHandler = function () {
          e.show();
        }),
          (this._hideHandler = function () {
            setTimeout(function () {
              e._targetEl.matches(":hover") || e.hide();
            }, 100);
          }),
          r.showEvents.forEach(function (n) {
            e._triggerEl.addEventListener(n, e._showHandler),
              e._targetEl.addEventListener(n, e._showHandler);
          }),
          r.hideEvents.forEach(function (n) {
            e._triggerEl.addEventListener(n, e._hideHandler),
              e._targetEl.addEventListener(n, e._hideHandler);
          });
      }),
      (t.prototype._createPopperInstance = function () {
        return pr(this._triggerEl, this._targetEl, {
          placement: this._options.placement,
          modifiers: [
            { name: "offset", options: { offset: [0, this._options.offset] } },
          ],
        });
      }),
      (t.prototype._getTriggerEvents = function () {
        switch (this._options.triggerType) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"],
            };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
        }
      }),
      (t.prototype._setupKeydownListener = function () {
        var e = this;
        (this._keydownEventListener = function (r) {
          r.key === "Escape" && e.hide();
        }),
          document.body.addEventListener(
            "keydown",
            this._keydownEventListener,
            !0
          );
      }),
      (t.prototype._removeKeydownListener = function () {
        document.body.removeEventListener(
          "keydown",
          this._keydownEventListener,
          !0
        );
      }),
      (t.prototype._setupClickOutsideListener = function () {
        var e = this;
        (this._clickOutsideEventListener = function (r) {
          e._handleClickOutside(r, e._targetEl);
        }),
          document.body.addEventListener(
            "click",
            this._clickOutsideEventListener,
            !0
          );
      }),
      (t.prototype._removeClickOutsideListener = function () {
        document.body.removeEventListener(
          "click",
          this._clickOutsideEventListener,
          !0
        );
      }),
      (t.prototype._handleClickOutside = function (e, r) {
        var n = e.target;
        n !== r &&
          !r.contains(n) &&
          !this._triggerEl.contains(n) &&
          this.isVisible() &&
          this.hide();
      }),
      (t.prototype.isVisible = function () {
        return this._visible;
      }),
      (t.prototype.toggle = function () {
        this.isVisible() ? this.hide() : this.show(),
          this._options.onToggle(this);
      }),
      (t.prototype.show = function () {
        this._targetEl.classList.remove("opacity-0", "invisible"),
          this._targetEl.classList.add("opacity-100", "visible"),
          this._popperInstance.setOptions(function (e) {
            return be(be({}, e), {
              modifiers: Ui(
                Ui([], e.modifiers, !0),
                [{ name: "eventListeners", enabled: !0 }],
                !1
              ),
            });
          }),
          this._setupClickOutsideListener(),
          this._setupKeydownListener(),
          this._popperInstance.update(),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (t.prototype.hide = function () {
        this._targetEl.classList.remove("opacity-100", "visible"),
          this._targetEl.classList.add("opacity-0", "invisible"),
          this._popperInstance.setOptions(function (e) {
            return be(be({}, e), {
              modifiers: Ui(
                Ui([], e.modifiers, !0),
                [{ name: "eventListeners", enabled: !1 }],
                !1
              ),
            });
          }),
          this._removeClickOutsideListener(),
          this._removeKeydownListener(),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function _r() {
  document.querySelectorAll("[data-popover-target]").forEach(function (t) {
    var e = t.getAttribute("data-popover-target"),
      r = document.getElementById(e);
    if (r) {
      var n = t.getAttribute("data-popover-trigger"),
        s = t.getAttribute("data-popover-placement"),
        c = t.getAttribute("data-popover-offset");
      new Js(r, t, {
        placement: s || di.placement,
        offset: c ? parseInt(c) : di.offset,
        triggerType: n || di.triggerType,
      });
    } else
      console.error(
        'The popover element with id "'.concat(
          e,
          '" does not exist. Please check the data-popover-target attribute.'
        )
      );
  });
}
typeof window < "u" && ((window.Popover = Js), (window.initPopovers = _r));
var pn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (pn =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        pn.apply(this, arguments)
      );
    },
  $n = {
    triggerType: "hover",
    onShow: function () {},
    onHide: function () {},
    onToggle: function () {},
  },
  Fl = { id: null, override: !0 },
  Zs = (function () {
    function t(e, r, n, s, c) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = null),
        s === void 0 && (s = $n),
        c === void 0 && (c = Fl),
        (this._instanceId = c.id ? c.id : n.id),
        (this._parentEl = e),
        (this._triggerEl = r),
        (this._targetEl = n),
        (this._options = pn(pn({}, $n), s)),
        (this._visible = !1),
        (this._initialized = !1),
        this.init(),
        at.addInstance("Dial", this, this._instanceId, c.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        if (this._triggerEl && this._targetEl && !this._initialized) {
          var r = this._getTriggerEventTypes(this._options.triggerType);
          (this._showEventHandler = function () {
            e.show();
          }),
            r.showEvents.forEach(function (n) {
              e._triggerEl.addEventListener(n, e._showEventHandler),
                e._targetEl.addEventListener(n, e._showEventHandler);
            }),
            (this._hideEventHandler = function () {
              e._parentEl.matches(":hover") || e.hide();
            }),
            r.hideEvents.forEach(function (n) {
              e._parentEl.addEventListener(n, e._hideEventHandler);
            }),
            (this._initialized = !0);
        }
      }),
      (t.prototype.destroy = function () {
        var e = this;
        if (this._initialized) {
          var r = this._getTriggerEventTypes(this._options.triggerType);
          r.showEvents.forEach(function (n) {
            e._triggerEl.removeEventListener(n, e._showEventHandler),
              e._targetEl.removeEventListener(n, e._showEventHandler);
          }),
            r.hideEvents.forEach(function (n) {
              e._parentEl.removeEventListener(n, e._hideEventHandler);
            }),
            (this._initialized = !1);
        }
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("Dial", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.hide = function () {
        this._targetEl.classList.add("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "false"),
          (this._visible = !1),
          this._options.onHide(this);
      }),
      (t.prototype.show = function () {
        this._targetEl.classList.remove("hidden"),
          this._triggerEl &&
            this._triggerEl.setAttribute("aria-expanded", "true"),
          (this._visible = !0),
          this._options.onShow(this);
      }),
      (t.prototype.toggle = function () {
        this._visible ? this.hide() : this.show();
      }),
      (t.prototype.isHidden = function () {
        return !this._visible;
      }),
      (t.prototype.isVisible = function () {
        return this._visible;
      }),
      (t.prototype._getTriggerEventTypes = function (e) {
        switch (e) {
          case "hover":
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
          case "click":
            return {
              showEvents: ["click", "focus"],
              hideEvents: ["focusout", "blur"],
            };
          case "none":
            return { showEvents: [], hideEvents: [] };
          default:
            return {
              showEvents: ["mouseenter", "focus"],
              hideEvents: ["mouseleave", "blur"],
            };
        }
      }),
      (t.prototype.updateOnShow = function (e) {
        this._options.onShow = e;
      }),
      (t.prototype.updateOnHide = function (e) {
        this._options.onHide = e;
      }),
      (t.prototype.updateOnToggle = function (e) {
        this._options.onToggle = e;
      }),
      t
    );
  })();
function wr() {
  document.querySelectorAll("[data-dial-init]").forEach(function (t) {
    var e = t.querySelector("[data-dial-toggle]");
    if (e) {
      var r = e.getAttribute("data-dial-toggle"),
        n = document.getElementById(r);
      if (n) {
        var s = e.getAttribute("data-dial-trigger");
        new Zs(t, e, n, { triggerType: s || $n.triggerType });
      } else
        console.error(
          "Dial with id ".concat(
            r,
            " does not exist. Are you sure that the data-dial-toggle attribute points to the correct modal id?"
          )
        );
    } else
      console.error(
        "Dial with id ".concat(
          t.id,
          " does not have a trigger element. Are you sure that the data-dial-toggle attribute exists?"
        )
      );
  });
}
typeof window < "u" && ((window.Dial = Zs), (window.initDials = wr));
var gn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (gn =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        gn.apply(this, arguments)
      );
    },
  _s = {
    minValue: null,
    maxValue: null,
    onIncrement: function () {},
    onDecrement: function () {},
  },
  Xl = { id: null, override: !0 },
  $s = (function () {
    function t(e, r, n, s, c) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = null),
        s === void 0 && (s = _s),
        c === void 0 && (c = Xl),
        (this._instanceId = c.id ? c.id : e.id),
        (this._targetEl = e),
        (this._incrementEl = r),
        (this._decrementEl = n),
        (this._options = gn(gn({}, _s), s)),
        (this._initialized = !1),
        this.init(),
        at.addInstance("InputCounter", this, this._instanceId, c.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._targetEl &&
          !this._initialized &&
          ((this._inputHandler = function (r) {
            {
              var n = r.target;
              /^\d*$/.test(n.value) ||
                (n.value = n.value.replace(/[^\d]/g, "")),
                e._options.maxValue !== null &&
                  parseInt(n.value) > e._options.maxValue &&
                  (n.value = e._options.maxValue.toString()),
                e._options.minValue !== null &&
                  parseInt(n.value) < e._options.minValue &&
                  (n.value = e._options.minValue.toString());
            }
          }),
          (this._incrementClickHandler = function () {
            e.increment();
          }),
          (this._decrementClickHandler = function () {
            e.decrement();
          }),
          this._targetEl.addEventListener("input", this._inputHandler),
          this._incrementEl &&
            this._incrementEl.addEventListener(
              "click",
              this._incrementClickHandler
            ),
          this._decrementEl &&
            this._decrementEl.addEventListener(
              "click",
              this._decrementClickHandler
            ),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._targetEl &&
          this._initialized &&
          (this._targetEl.removeEventListener("input", this._inputHandler),
          this._incrementEl &&
            this._incrementEl.removeEventListener(
              "click",
              this._incrementClickHandler
            ),
          this._decrementEl &&
            this._decrementEl.removeEventListener(
              "click",
              this._decrementClickHandler
            ),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("InputCounter", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.getCurrentValue = function () {
        return parseInt(this._targetEl.value) || 0;
      }),
      (t.prototype.increment = function () {
        (this._options.maxValue !== null &&
          this.getCurrentValue() >= this._options.maxValue) ||
          ((this._targetEl.value = (this.getCurrentValue() + 1).toString()),
          this._options.onIncrement(this));
      }),
      (t.prototype.decrement = function () {
        (this._options.minValue !== null &&
          this.getCurrentValue() <= this._options.minValue) ||
          ((this._targetEl.value = (this.getCurrentValue() - 1).toString()),
          this._options.onDecrement(this));
      }),
      (t.prototype.updateOnIncrement = function (e) {
        this._options.onIncrement = e;
      }),
      (t.prototype.updateOnDecrement = function (e) {
        this._options.onDecrement = e;
      }),
      t
    );
  })();
function Er() {
  document.querySelectorAll("[data-input-counter]").forEach(function (t) {
    var e = t.id,
      r = document.querySelector('[data-input-counter-increment="' + e + '"]'),
      n = document.querySelector('[data-input-counter-decrement="' + e + '"]'),
      s = t.getAttribute("data-input-counter-min"),
      c = t.getAttribute("data-input-counter-max");
    t
      ? at.instanceExists("InputCounter", t.getAttribute("id")) ||
        new $s(t, r || null, n || null, {
          minValue: s ? parseInt(s) : null,
          maxValue: c ? parseInt(c) : null,
        })
      : console.error(
          'The target element with id "'.concat(
            e,
            '" does not exist. Please check the data-input-counter attribute.'
          )
        );
  });
}
typeof window < "u" &&
  ((window.InputCounter = $s), (window.initInputCounters = Er));
var mn =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (mn =
          Object.assign ||
          function (t) {
            for (var e, r = 1, n = arguments.length; r < n; r++) {
              e = arguments[r];
              for (var s in e)
                Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
            }
            return t;
          }),
        mn.apply(this, arguments)
      );
    },
  vn = { htmlEntities: !1, contentType: "input", onCopy: function () {} },
  Yl = { id: null, override: !0 },
  to = (function () {
    function t(e, r, n, s) {
      e === void 0 && (e = null),
        r === void 0 && (r = null),
        n === void 0 && (n = vn),
        s === void 0 && (s = Yl),
        (this._instanceId = s.id ? s.id : r.id),
        (this._triggerEl = e),
        (this._targetEl = r),
        (this._options = mn(mn({}, vn), n)),
        (this._initialized = !1),
        this.init(),
        at.addInstance("CopyClipboard", this, this._instanceId, s.override);
    }
    return (
      (t.prototype.init = function () {
        var e = this;
        this._targetEl &&
          this._triggerEl &&
          !this._initialized &&
          ((this._triggerElClickHandler = function () {
            e.copy();
          }),
          this._triggerEl &&
            this._triggerEl.addEventListener(
              "click",
              this._triggerElClickHandler
            ),
          (this._initialized = !0));
      }),
      (t.prototype.destroy = function () {
        this._triggerEl &&
          this._targetEl &&
          this._initialized &&
          (this._triggerEl &&
            this._triggerEl.removeEventListener(
              "click",
              this._triggerElClickHandler
            ),
          (this._initialized = !1));
      }),
      (t.prototype.removeInstance = function () {
        at.removeInstance("CopyClipboard", this._instanceId);
      }),
      (t.prototype.destroyAndRemoveInstance = function () {
        this.destroy(), this.removeInstance();
      }),
      (t.prototype.getTargetValue = function () {
        if (this._options.contentType === "input") return this._targetEl.value;
        if (this._options.contentType === "innerHTML")
          return this._targetEl.innerHTML;
        if (this._options.contentType === "textContent")
          return this._targetEl.textContent.replace(/\s+/g, " ").trim();
      }),
      (t.prototype.copy = function () {
        var e = this.getTargetValue();
        this._options.htmlEntities && (e = this.decodeHTML(e));
        var r = document.createElement("textarea");
        return (
          (r.value = e),
          document.body.appendChild(r),
          r.select(),
          document.execCommand("copy"),
          document.body.removeChild(r),
          this._options.onCopy(this),
          e
        );
      }),
      (t.prototype.decodeHTML = function (e) {
        var r = document.createElement("textarea");
        return (r.innerHTML = e), r.textContent;
      }),
      (t.prototype.updateOnCopyCallback = function (e) {
        this._options.onCopy = e;
      }),
      t
    );
  })();
function xr() {
  document
    .querySelectorAll("[data-copy-to-clipboard-target]")
    .forEach(function (t) {
      var e = t.getAttribute("data-copy-to-clipboard-target"),
        r = document.getElementById(e),
        n = t.getAttribute("data-copy-to-clipboard-content-type"),
        s = t.getAttribute("data-copy-to-clipboard-html-entities");
      r
        ? at.instanceExists("CopyClipboard", r.getAttribute("id")) ||
          new to(t, r, {
            htmlEntities: s && s === "true" ? !0 : vn.htmlEntities,
            contentType: n || vn.contentType,
          })
        : console.error(
            'The target element with id "'.concat(
              e,
              '" does not exist. Please check the data-copy-to-clipboard-target attribute.'
            )
          );
    });
}
typeof window < "u" &&
  ((window.CopyClipboard = to), (window.initClipboards = xr));
function ql() {
  nr(), rr(), sr(), or(), gr(), mr(), vr(), yr(), br(), _r(), wr(), Er(), xr();
}
typeof window < "u" && (window.initFlowbite = ql);
var Vl = new Ta("load", [nr, rr, sr, or, gr, mr, vr, yr, br, _r, wr, Er, xr]);
Vl.init();
var Ul =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function Kl(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return (
    Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.keys(t).forEach(function (n) {
      var s = Object.getOwnPropertyDescriptor(t, n);
      Object.defineProperty(
        r,
        n,
        s.get
          ? s
          : {
              enumerable: !0,
              get: function () {
                return t[n];
              },
            }
      );
    }),
    r
  );
}
var eo = { exports: {} };
(function (t, e) {
  (function (r, n) {
    t.exports = n();
  })(Ul, function () {
    /*!
     * jQuery JavaScript Library v1.8.1
     * http://jquery.com/
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     *
     * Copyright 2012 jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: Thu Aug 30 2012 17:17:22 GMT-0400 (Eastern Daylight Time)
     */ return (function (r, n) {
      var s,
        c,
        u = r.document,
        d = r.location,
        g = r.navigator,
        b = r.jQuery,
        w = r.$,
        S = Array.prototype.push,
        I = Array.prototype.slice,
        D = Array.prototype.indexOf,
        k = Object.prototype.toString,
        C = Object.prototype.hasOwnProperty,
        T = String.prototype.trim,
        a = function (i, o) {
          return new a.fn.init(i, o, s);
        },
        W = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        H = /\S/,
        O = /\s+/,
        B = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Y = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        U = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        tt = /^[\],:{}\s]*$/,
        Q = /(?:^|:|,)(?:\s*\[)+/g,
        it = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        G =
          /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        ut = /^-ms-/,
        lt = /-([\da-z])/gi,
        Ct = function (i, o) {
          return (o + "").toUpperCase();
        },
        yt = function () {
          u.addEventListener
            ? (u.removeEventListener("DOMContentLoaded", yt, !1), a.ready())
            : u.readyState === "complete" &&
              (u.detachEvent("onreadystatechange", yt), a.ready());
        },
        wt = {};
      (a.fn = a.prototype =
        {
          constructor: a,
          init: function (i, o, l) {
            var h, f, p;
            if (!i) return this;
            if (i.nodeType)
              return (this.context = this[0] = i), (this.length = 1), this;
            if (typeof i == "string")
              if (
                (i.charAt(0) === "<" &&
                i.charAt(i.length - 1) === ">" &&
                i.length >= 3
                  ? (h = [null, i, null])
                  : (h = Y.exec(i)),
                h && (h[1] || !o))
              ) {
                if (h[1])
                  return (
                    (o = o instanceof a ? o[0] : o),
                    (p = o && o.nodeType ? o.ownerDocument || o : u),
                    (i = a.parseHTML(h[1], p, !0)),
                    U.test(h[1]) &&
                      a.isPlainObject(o) &&
                      this.attr.call(i, o, !0),
                    a.merge(this, i)
                  );
                if (((f = u.getElementById(h[2])), f && f.parentNode)) {
                  if (f.id !== h[2]) return l.find(i);
                  (this.length = 1), (this[0] = f);
                }
                return (this.context = u), (this.selector = i), this;
              } else
                return !o || o.jquery
                  ? (o || l).find(i)
                  : this.constructor(o).find(i);
            else if (a.isFunction(i)) return l.ready(i);
            return (
              i.selector !== n &&
                ((this.selector = i.selector), (this.context = i.context)),
              a.makeArray(i, this)
            );
          },
          selector: "",
          jquery: "1.8.1",
          length: 0,
          size: function () {
            return this.length;
          },
          toArray: function () {
            return I.call(this);
          },
          get: function (i) {
            return i == null
              ? this.toArray()
              : i < 0
                ? this[this.length + i]
                : this[i];
          },
          pushStack: function (i, o, l) {
            var h = a.merge(this.constructor(), i);
            return (
              (h.prevObject = this),
              (h.context = this.context),
              o === "find"
                ? (h.selector = this.selector + (this.selector ? " " : "") + l)
                : o && (h.selector = this.selector + "." + o + "(" + l + ")"),
              h
            );
          },
          each: function (i, o) {
            return a.each(this, i, o);
          },
          ready: function (i) {
            return a.ready.promise().done(i), this;
          },
          eq: function (i) {
            return (i = +i), i === -1 ? this.slice(i) : this.slice(i, i + 1);
          },
          first: function () {
            return this.eq(0);
          },
          last: function () {
            return this.eq(-1);
          },
          slice: function () {
            return this.pushStack(
              I.apply(this, arguments),
              "slice",
              I.call(arguments).join(",")
            );
          },
          map: function (i) {
            return this.pushStack(
              a.map(this, function (o, l) {
                return i.call(o, l, o);
              })
            );
          },
          end: function () {
            return this.prevObject || this.constructor(null);
          },
          push: S,
          sort: [].sort,
          splice: [].splice,
        }),
        (a.fn.init.prototype = a.fn),
        (a.extend = a.fn.extend =
          function () {
            var i,
              o,
              l,
              h,
              f,
              p,
              m = arguments[0] || {},
              y = 1,
              _ = arguments.length,
              A = !1;
            for (
              typeof m == "boolean" &&
                ((A = m), (m = arguments[1] || {}), (y = 2)),
                typeof m != "object" && !a.isFunction(m) && (m = {}),
                _ === y && ((m = this), --y);
              y < _;
              y++
            )
              if ((i = arguments[y]) != null)
                for (o in i)
                  (l = m[o]),
                    (h = i[o]),
                    m !== h &&
                      (A && h && (a.isPlainObject(h) || (f = a.isArray(h)))
                        ? (f
                            ? ((f = !1), (p = l && a.isArray(l) ? l : []))
                            : (p = l && a.isPlainObject(l) ? l : {}),
                          (m[o] = a.extend(A, p, h)))
                        : h !== n && (m[o] = h));
            return m;
          }),
        a.extend({
          noConflict: function (i) {
            return (
              r.$ === a && (r.$ = w), i && r.jQuery === a && (r.jQuery = b), a
            );
          },
          isReady: !1,
          readyWait: 1,
          holdReady: function (i) {
            i ? a.readyWait++ : a.ready(!0);
          },
          ready: function (i) {
            if (!(i === !0 ? --a.readyWait : a.isReady)) {
              if (!u.body) return setTimeout(a.ready, 1);
              (a.isReady = !0),
                !(i !== !0 && --a.readyWait > 0) &&
                  (c.resolveWith(u, [a]),
                  a.fn.trigger && a(u).trigger("ready").off("ready"));
            }
          },
          isFunction: function (i) {
            return a.type(i) === "function";
          },
          isArray:
            Array.isArray ||
            function (i) {
              return a.type(i) === "array";
            },
          isWindow: function (i) {
            return i != null && i == i.window;
          },
          isNumeric: function (i) {
            return !isNaN(parseFloat(i)) && isFinite(i);
          },
          type: function (i) {
            return i == null ? String(i) : wt[k.call(i)] || "object";
          },
          isPlainObject: function (i) {
            if (!i || a.type(i) !== "object" || i.nodeType || a.isWindow(i))
              return !1;
            try {
              if (
                i.constructor &&
                !C.call(i, "constructor") &&
                !C.call(i.constructor.prototype, "isPrototypeOf")
              )
                return !1;
            } catch {
              return !1;
            }
            var o;
            for (o in i);
            return o === n || C.call(i, o);
          },
          isEmptyObject: function (i) {
            var o;
            for (o in i) return !1;
            return !0;
          },
          error: function (i) {
            throw new Error(i);
          },
          parseHTML: function (i, o, l) {
            var h;
            return !i || typeof i != "string"
              ? null
              : (typeof o == "boolean" && ((l = o), (o = 0)),
                (o = o || u),
                (h = U.exec(i))
                  ? [o.createElement(h[1])]
                  : ((h = a.buildFragment([i], o, l ? null : [])),
                    a.merge(
                      [],
                      (h.cacheable ? a.clone(h.fragment) : h.fragment)
                        .childNodes
                    )));
          },
          parseJSON: function (i) {
            if (!i || typeof i != "string") return null;
            if (((i = a.trim(i)), r.JSON && r.JSON.parse))
              return r.JSON.parse(i);
            if (tt.test(i.replace(it, "@").replace(G, "]").replace(Q, "")))
              return new Function("return " + i)();
            a.error("Invalid JSON: " + i);
          },
          parseXML: function (i) {
            var o, l;
            if (!i || typeof i != "string") return null;
            try {
              r.DOMParser
                ? ((l = new DOMParser()),
                  (o = l.parseFromString(i, "text/xml")))
                : ((o = new ActiveXObject("Microsoft.XMLDOM")),
                  (o.async = "false"),
                  o.loadXML(i));
            } catch {
              o = n;
            }
            return (
              (!o ||
                !o.documentElement ||
                o.getElementsByTagName("parsererror").length) &&
                a.error("Invalid XML: " + i),
              o
            );
          },
          noop: function () {},
          globalEval: function (i) {
            i &&
              H.test(i) &&
              (
                r.execScript ||
                function (o) {
                  r.eval.call(r, o);
                }
              )(i);
          },
          camelCase: function (i) {
            return i.replace(ut, "ms-").replace(lt, Ct);
          },
          nodeName: function (i, o) {
            return i.nodeName && i.nodeName.toUpperCase() === o.toUpperCase();
          },
          each: function (i, o, l) {
            var h,
              f = 0,
              p = i.length,
              m = p === n || a.isFunction(i);
            if (l)
              if (m) {
                for (h in i) if (o.apply(i[h], l) === !1) break;
              } else for (; f < p && o.apply(i[f++], l) !== !1; );
            else if (m) {
              for (h in i) if (o.call(i[h], h, i[h]) === !1) break;
            } else for (; f < p && o.call(i[f], f, i[f++]) !== !1; );
            return i;
          },
          trim:
            T && !T.call("\uFEFF ")
              ? function (i) {
                  return i == null ? "" : T.call(i);
                }
              : function (i) {
                  return i == null ? "" : i.toString().replace(B, "");
                },
          makeArray: function (i, o) {
            var l,
              h = o || [];
            return (
              i != null &&
                ((l = a.type(i)),
                i.length == null ||
                l === "string" ||
                l === "function" ||
                l === "regexp" ||
                a.isWindow(i)
                  ? S.call(h, i)
                  : a.merge(h, i)),
              h
            );
          },
          inArray: function (i, o, l) {
            var h;
            if (o) {
              if (D) return D.call(o, i, l);
              for (
                h = o.length, l = l ? (l < 0 ? Math.max(0, h + l) : l) : 0;
                l < h;
                l++
              )
                if (l in o && o[l] === i) return l;
            }
            return -1;
          },
          merge: function (i, o) {
            var l = o.length,
              h = i.length,
              f = 0;
            if (typeof l == "number") for (; f < l; f++) i[h++] = o[f];
            else for (; o[f] !== n; ) i[h++] = o[f++];
            return (i.length = h), i;
          },
          grep: function (i, o, l) {
            var h,
              f = [],
              p = 0,
              m = i.length;
            for (l = !!l; p < m; p++)
              (h = !!o(i[p], p)), l !== h && f.push(i[p]);
            return f;
          },
          map: function (i, o, l) {
            var h,
              f,
              p = [],
              m = 0,
              y = i.length,
              _ =
                i instanceof a ||
                (y !== n &&
                  typeof y == "number" &&
                  ((y > 0 && i[0] && i[y - 1]) || y === 0 || a.isArray(i)));
            if (_)
              for (; m < y; m++)
                (h = o(i[m], m, l)), h != null && (p[p.length] = h);
            else
              for (f in i) (h = o(i[f], f, l)), h != null && (p[p.length] = h);
            return p.concat.apply([], p);
          },
          guid: 1,
          proxy: function (i, o) {
            var l, h, f;
            return (
              typeof o == "string" && ((l = i[o]), (o = i), (i = l)),
              a.isFunction(i)
                ? ((h = I.call(arguments, 2)),
                  (f = function () {
                    return i.apply(o, h.concat(I.call(arguments)));
                  }),
                  (f.guid = i.guid = i.guid || f.guid || a.guid++),
                  f)
                : n
            );
          },
          access: function (i, o, l, h, f, p, m) {
            var y,
              _ = l == null,
              A = 0,
              x = i.length;
            if (l && typeof l == "object") {
              for (A in l) a.access(i, o, A, l[A], 1, p, h);
              f = 1;
            } else if (h !== n) {
              if (
                ((y = m === n && a.isFunction(h)),
                _ &&
                  (y
                    ? ((y = o),
                      (o = function (P, M, F) {
                        return y.call(a(P), F);
                      }))
                    : (o.call(i, h), (o = null))),
                o)
              )
                for (; A < x; A++)
                  o(i[A], l, y ? h.call(i[A], A, o(i[A], l)) : h, m);
              f = 1;
            }
            return f ? i : _ ? o.call(i) : x ? o(i[0], l) : p;
          },
          now: function () {
            return new Date().getTime();
          },
        }),
        (a.ready.promise = function (i) {
          if (!c)
            if (((c = a.Deferred()), u.readyState === "complete"))
              setTimeout(a.ready, 1);
            else if (u.addEventListener)
              u.addEventListener("DOMContentLoaded", yt, !1),
                r.addEventListener("load", a.ready, !1);
            else {
              u.attachEvent("onreadystatechange", yt),
                r.attachEvent("onload", a.ready);
              var o = !1;
              try {
                o = r.frameElement == null && u.documentElement;
              } catch {}
              o &&
                o.doScroll &&
                (function l() {
                  if (!a.isReady) {
                    try {
                      o.doScroll("left");
                    } catch {
                      return setTimeout(l, 50);
                    }
                    a.ready();
                  }
                })();
            }
          return c.promise(i);
        }),
        a.each(
          "Boolean Number String Function Array Date RegExp Object".split(" "),
          function (i, o) {
            wt["[object " + o + "]"] = o.toLowerCase();
          }
        ),
        (s = a(u));
      var Tt = {};
      function ce(i) {
        var o = (Tt[i] = {});
        return (
          a.each(i.split(O), function (l, h) {
            o[h] = !0;
          }),
          o
        );
      }
      (a.Callbacks = function (i) {
        i = typeof i == "string" ? Tt[i] || ce(i) : a.extend({}, i);
        var o,
          l,
          h,
          f,
          p,
          m,
          y = [],
          _ = !i.once && [],
          A = function (P) {
            for (
              o = i.memory && P,
                l = !0,
                m = f || 0,
                f = 0,
                p = y.length,
                h = !0;
              y && m < p;
              m++
            )
              if (y[m].apply(P[0], P[1]) === !1 && i.stopOnFalse) {
                o = !1;
                break;
              }
            (h = !1),
              y && (_ ? _.length && A(_.shift()) : o ? (y = []) : x.disable());
          },
          x = {
            add: function () {
              if (y) {
                var P = y.length;
                (function M(F) {
                  a.each(F, function (z, q) {
                    var rt = a.type(q);
                    rt === "function" && (!i.unique || !x.has(q))
                      ? y.push(q)
                      : q && q.length && rt !== "string" && M(q);
                  });
                })(arguments),
                  h ? (p = y.length) : o && ((f = P), A(o));
              }
              return this;
            },
            remove: function () {
              return (
                y &&
                  a.each(arguments, function (P, M) {
                    for (var F; (F = a.inArray(M, y, F)) > -1; )
                      y.splice(F, 1), h && (F <= p && p--, F <= m && m--);
                  }),
                this
              );
            },
            has: function (P) {
              return a.inArray(P, y) > -1;
            },
            empty: function () {
              return (y = []), this;
            },
            disable: function () {
              return (y = _ = o = n), this;
            },
            disabled: function () {
              return !y;
            },
            lock: function () {
              return (_ = n), o || x.disable(), this;
            },
            locked: function () {
              return !_;
            },
            fireWith: function (P, M) {
              return (
                (M = M || []),
                (M = [P, M.slice ? M.slice() : M]),
                y && (!l || _) && (h ? _.push(M) : A(M)),
                this
              );
            },
            fire: function () {
              return x.fireWith(this, arguments), this;
            },
            fired: function () {
              return !!l;
            },
          };
        return x;
      }),
        a.extend({
          Deferred: function (i) {
            var o = [
                ["resolve", "done", a.Callbacks("once memory"), "resolved"],
                ["reject", "fail", a.Callbacks("once memory"), "rejected"],
                ["notify", "progress", a.Callbacks("memory")],
              ],
              l = "pending",
              h = {
                state: function () {
                  return l;
                },
                always: function () {
                  return f.done(arguments).fail(arguments), this;
                },
                then: function () {
                  var p = arguments;
                  return a
                    .Deferred(function (m) {
                      a.each(o, function (y, _) {
                        var A = _[0],
                          x = p[y];
                        f[_[1]](
                          a.isFunction(x)
                            ? function () {
                                var P = x.apply(this, arguments);
                                P && a.isFunction(P.promise)
                                  ? P.promise()
                                      .done(m.resolve)
                                      .fail(m.reject)
                                      .progress(m.notify)
                                  : m[A + "With"](this === f ? m : this, [P]);
                              }
                            : m[A]
                        );
                      }),
                        (p = null);
                    })
                    .promise();
                },
                promise: function (p) {
                  return typeof p == "object" ? a.extend(p, h) : h;
                },
              },
              f = {};
            return (
              (h.pipe = h.then),
              a.each(o, function (p, m) {
                var y = m[2],
                  _ = m[3];
                (h[m[1]] = y.add),
                  _ &&
                    y.add(
                      function () {
                        l = _;
                      },
                      o[p ^ 1][2].disable,
                      o[2][2].lock
                    ),
                  (f[m[0]] = y.fire),
                  (f[m[0] + "With"] = y.fireWith);
              }),
              h.promise(f),
              i && i.call(f, f),
              f
            );
          },
          when: function (i) {
            var o = 0,
              l = I.call(arguments),
              h = l.length,
              f = h !== 1 || (i && a.isFunction(i.promise)) ? h : 0,
              p = f === 1 ? i : a.Deferred(),
              m = function (x, P, M) {
                return function (F) {
                  (P[x] = this),
                    (M[x] = arguments.length > 1 ? I.call(arguments) : F),
                    M === y ? p.notifyWith(P, M) : --f || p.resolveWith(P, M);
                };
              },
              y,
              _,
              A;
            if (h > 1)
              for (
                y = new Array(h), _ = new Array(h), A = new Array(h);
                o < h;
                o++
              )
                l[o] && a.isFunction(l[o].promise)
                  ? l[o]
                      .promise()
                      .done(m(o, A, l))
                      .fail(p.reject)
                      .progress(m(o, _, y))
                  : --f;
            return f || p.resolveWith(A, l), p.promise();
          },
        }),
        (a.support = (function () {
          var i,
            o,
            l,
            h,
            f,
            p,
            m,
            y,
            _,
            A,
            x,
            P = u.createElement("div");
          if (
            (P.setAttribute("className", "t"),
            (P.innerHTML =
              "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (o = P.getElementsByTagName("*")),
            (l = P.getElementsByTagName("a")[0]),
            (l.style.cssText = "top:1px;float:left;opacity:.5"),
            !o || !o.length || !l)
          )
            return {};
          (h = u.createElement("select")),
            (f = h.appendChild(u.createElement("option"))),
            (p = P.getElementsByTagName("input")[0]),
            (i = {
              leadingWhitespace: P.firstChild.nodeType === 3,
              tbody: !P.getElementsByTagName("tbody").length,
              htmlSerialize: !!P.getElementsByTagName("link").length,
              style: /top/.test(l.getAttribute("style")),
              hrefNormalized: l.getAttribute("href") === "/a",
              opacity: /^0.5/.test(l.style.opacity),
              cssFloat: !!l.style.cssFloat,
              checkOn: p.value === "on",
              optSelected: f.selected,
              getSetAttribute: P.className !== "t",
              enctype: !!u.createElement("form").enctype,
              html5Clone:
                u.createElement("nav").cloneNode(!0).outerHTML !==
                "<:nav></:nav>",
              boxModel: u.compatMode === "CSS1Compat",
              submitBubbles: !0,
              changeBubbles: !0,
              focusinBubbles: !1,
              deleteExpando: !0,
              noCloneEvent: !0,
              inlineBlockNeedsLayout: !1,
              shrinkWrapBlocks: !1,
              reliableMarginRight: !0,
              boxSizingReliable: !0,
              pixelPosition: !1,
            }),
            (p.checked = !0),
            (i.noCloneChecked = p.cloneNode(!0).checked),
            (h.disabled = !0),
            (i.optDisabled = !f.disabled);
          try {
            delete P.test;
          } catch {
            i.deleteExpando = !1;
          }
          if (
            (!P.addEventListener &&
              P.attachEvent &&
              P.fireEvent &&
              (P.attachEvent(
                "onclick",
                (x = function () {
                  i.noCloneEvent = !1;
                })
              ),
              P.cloneNode(!0).fireEvent("onclick"),
              P.detachEvent("onclick", x)),
            (p = u.createElement("input")),
            (p.value = "t"),
            p.setAttribute("type", "radio"),
            (i.radioValue = p.value === "t"),
            p.setAttribute("checked", "checked"),
            p.setAttribute("name", "t"),
            P.appendChild(p),
            (m = u.createDocumentFragment()),
            m.appendChild(P.lastChild),
            (i.checkClone = m.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (i.appendChecked = p.checked),
            m.removeChild(p),
            m.appendChild(P),
            P.attachEvent)
          )
            for (_ in { submit: !0, change: !0, focusin: !0 })
              (y = "on" + _),
                (A = y in P),
                A ||
                  (P.setAttribute(y, "return;"),
                  (A = typeof P[y] == "function")),
                (i[_ + "Bubbles"] = A);
          return (
            a(function () {
              var M,
                F,
                z,
                q,
                rt =
                  "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                Et = u.getElementsByTagName("body")[0];
              Et &&
                ((M = u.createElement("div")),
                (M.style.cssText =
                  "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px"),
                Et.insertBefore(M, Et.firstChild),
                (F = u.createElement("div")),
                M.appendChild(F),
                (F.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                (z = F.getElementsByTagName("td")),
                (z[0].style.cssText =
                  "padding:0;margin:0;border:0;display:none"),
                (A = z[0].offsetHeight === 0),
                (z[0].style.display = ""),
                (z[1].style.display = "none"),
                (i.reliableHiddenOffsets = A && z[0].offsetHeight === 0),
                (F.innerHTML = ""),
                (F.style.cssText =
                  "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;"),
                (i.boxSizing = F.offsetWidth === 4),
                (i.doesNotIncludeMarginInBodyOffset = Et.offsetTop !== 1),
                r.getComputedStyle &&
                  ((i.pixelPosition =
                    (r.getComputedStyle(F, null) || {}).top !== "1%"),
                  (i.boxSizingReliable =
                    (r.getComputedStyle(F, null) || { width: "4px" }).width ===
                    "4px"),
                  (q = u.createElement("div")),
                  (q.style.cssText = F.style.cssText = rt),
                  (q.style.marginRight = q.style.width = "0"),
                  (F.style.width = "1px"),
                  F.appendChild(q),
                  (i.reliableMarginRight = !parseFloat(
                    (r.getComputedStyle(q, null) || {}).marginRight
                  ))),
                typeof F.style.zoom < "u" &&
                  ((F.innerHTML = ""),
                  (F.style.cssText =
                    rt + "width:1px;padding:1px;display:inline;zoom:1"),
                  (i.inlineBlockNeedsLayout = F.offsetWidth === 3),
                  (F.style.display = "block"),
                  (F.style.overflow = "visible"),
                  (F.innerHTML = "<div></div>"),
                  (F.firstChild.style.width = "5px"),
                  (i.shrinkWrapBlocks = F.offsetWidth !== 3),
                  (M.style.zoom = 1)),
                Et.removeChild(M),
                (M = F = z = q = null));
            }),
            m.removeChild(P),
            (o = l = h = f = p = m = P = null),
            i
          );
        })());
      var Ut = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        dt = /([A-Z])/g;
      a.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (a.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
          embed: !0,
          object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
          applet: !0,
        },
        hasData: function (i) {
          return (
            (i = i.nodeType ? a.cache[i[a.expando]] : i[a.expando]),
            !!i && !It(i)
          );
        },
        data: function (i, o, l, h) {
          if (a.acceptData(i)) {
            var f,
              p,
              m = a.expando,
              y = typeof o == "string",
              _ = i.nodeType,
              A = _ ? a.cache : i,
              x = _ ? i[m] : i[m] && m;
            if (!((!x || !A[x] || (!h && !A[x].data)) && y && l === n))
              return (
                x ||
                  (_ ? (i[m] = x = a.deletedIds.pop() || ++a.uuid) : (x = m)),
                A[x] || ((A[x] = {}), _ || (A[x].toJSON = a.noop)),
                (typeof o == "object" || typeof o == "function") &&
                  (h
                    ? (A[x] = a.extend(A[x], o))
                    : (A[x].data = a.extend(A[x].data, o))),
                (f = A[x]),
                h || (f.data || (f.data = {}), (f = f.data)),
                l !== n && (f[a.camelCase(o)] = l),
                y
                  ? ((p = f[o]), p == null && (p = f[a.camelCase(o)]))
                  : (p = f),
                p
              );
          }
        },
        removeData: function (i, o, l) {
          if (a.acceptData(i)) {
            var h,
              f,
              p,
              m = i.nodeType,
              y = m ? a.cache : i,
              _ = m ? i[a.expando] : a.expando;
            if (y[_]) {
              if (o && ((h = l ? y[_] : y[_].data), h)) {
                for (
                  a.isArray(o) ||
                    ((o in h)
                      ? (o = [o])
                      : ((o = a.camelCase(o)),
                        (o in h) ? (o = [o]) : (o = o.split(" ")))),
                    f = 0,
                    p = o.length;
                  f < p;
                  f++
                )
                  delete h[o[f]];
                if (!(l ? It : a.isEmptyObject)(h)) return;
              }
              (!l && (delete y[_].data, !It(y[_]))) ||
                (m
                  ? a.cleanData([i], !0)
                  : a.support.deleteExpando || y != y.window
                    ? delete y[_]
                    : (y[_] = null));
            }
          }
        },
        _data: function (i, o, l) {
          return a.data(i, o, l, !0);
        },
        acceptData: function (i) {
          var o = i.nodeName && a.noData[i.nodeName.toLowerCase()];
          return !o || (o !== !0 && i.getAttribute("classid") === o);
        },
      }),
        a.fn.extend({
          data: function (i, o) {
            var l,
              h,
              f,
              p,
              m,
              y = this[0],
              _ = 0,
              A = null;
            if (i === n) {
              if (
                this.length &&
                ((A = a.data(y)),
                y.nodeType === 1 && !a._data(y, "parsedAttrs"))
              ) {
                for (f = y.attributes, m = f.length; _ < m; _++)
                  (p = f[_].name),
                    p.indexOf("data-") === 0 &&
                      ((p = a.camelCase(p.substring(5))), Kt(y, p, A[p]));
                a._data(y, "parsedAttrs", !0);
              }
              return A;
            }
            return typeof i == "object"
              ? this.each(function () {
                  a.data(this, i);
                })
              : ((l = i.split(".", 2)),
                (l[1] = l[1] ? "." + l[1] : ""),
                (h = l[1] + "!"),
                a.access(
                  this,
                  function (x) {
                    if (x === n)
                      return (
                        (A = this.triggerHandler("getData" + h, [l[0]])),
                        A === n && y && ((A = a.data(y, i)), (A = Kt(y, i, A))),
                        A === n && l[1] ? this.data(l[0]) : A
                      );
                    (l[1] = x),
                      this.each(function () {
                        var P = a(this);
                        P.triggerHandler("setData" + h, l),
                          a.data(this, i, x),
                          P.triggerHandler("changeData" + h, l);
                      });
                  },
                  null,
                  o,
                  arguments.length > 1,
                  null,
                  !1
                ));
          },
          removeData: function (i) {
            return this.each(function () {
              a.removeData(this, i);
            });
          },
        });
      function Kt(i, o, l) {
        if (l === n && i.nodeType === 1) {
          var h = "data-" + o.replace(dt, "-$1").toLowerCase();
          if (((l = i.getAttribute(h)), typeof l == "string")) {
            try {
              l =
                l === "true"
                  ? !0
                  : l === "false"
                    ? !1
                    : l === "null"
                      ? null
                      : +l + "" === l
                        ? +l
                        : Ut.test(l)
                          ? a.parseJSON(l)
                          : l;
            } catch {}
            a.data(i, o, l);
          } else l = n;
        }
        return l;
      }
      function It(i) {
        var o;
        for (o in i)
          if (!(o === "data" && a.isEmptyObject(i[o])) && o !== "toJSON")
            return !1;
        return !0;
      }
      a.extend({
        queue: function (i, o, l) {
          var h;
          if (i)
            return (
              (o = (o || "fx") + "queue"),
              (h = a._data(i, o)),
              l &&
                (!h || a.isArray(l)
                  ? (h = a._data(i, o, a.makeArray(l)))
                  : h.push(l)),
              h || []
            );
        },
        dequeue: function (i, o) {
          o = o || "fx";
          var l = a.queue(i, o),
            h = l.length,
            f = l.shift(),
            p = a._queueHooks(i, o),
            m = function () {
              a.dequeue(i, o);
            };
          f === "inprogress" && ((f = l.shift()), h--),
            f &&
              (o === "fx" && l.unshift("inprogress"),
              delete p.stop,
              f.call(i, m, p)),
            !h && p && p.empty.fire();
        },
        _queueHooks: function (i, o) {
          var l = o + "queueHooks";
          return (
            a._data(i, l) ||
            a._data(i, l, {
              empty: a.Callbacks("once memory").add(function () {
                a.removeData(i, o + "queue", !0), a.removeData(i, l, !0);
              }),
            })
          );
        },
      }),
        a.fn.extend({
          queue: function (i, o) {
            var l = 2;
            return (
              typeof i != "string" && ((o = i), (i = "fx"), l--),
              arguments.length < l
                ? a.queue(this[0], i)
                : o === n
                  ? this
                  : this.each(function () {
                      var h = a.queue(this, i, o);
                      a._queueHooks(this, i),
                        i === "fx" &&
                          h[0] !== "inprogress" &&
                          a.dequeue(this, i);
                    })
            );
          },
          dequeue: function (i) {
            return this.each(function () {
              a.dequeue(this, i);
            });
          },
          delay: function (i, o) {
            return (
              (i = (a.fx && a.fx.speeds[i]) || i),
              (o = o || "fx"),
              this.queue(o, function (l, h) {
                var f = setTimeout(l, i);
                h.stop = function () {
                  clearTimeout(f);
                };
              })
            );
          },
          clearQueue: function (i) {
            return this.queue(i || "fx", []);
          },
          promise: function (i, o) {
            var l,
              h = 1,
              f = a.Deferred(),
              p = this,
              m = this.length,
              y = function () {
                --h || f.resolveWith(p, [p]);
              };
            for (
              typeof i != "string" && ((o = i), (i = n)), i = i || "fx";
              m--;

            )
              (l = a._data(p[m], i + "queueHooks")),
                l && l.empty && (h++, l.empty.add(y));
            return y(), f.promise(o);
          },
        });
      var bt,
        Mt,
        kt,
        jt = /[\t\r\n]/g,
        zt = /\r/g,
        ne = /^(?:button|input)$/i,
        Ze = /^(?:button|input|object|select|textarea)$/i,
        Cn = /^a(?:rea|)$/i,
        Ne =
          /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        _i = a.support.getSetAttribute;
      a.fn.extend({
        attr: function (i, o) {
          return a.access(this, a.attr, i, o, arguments.length > 1);
        },
        removeAttr: function (i) {
          return this.each(function () {
            a.removeAttr(this, i);
          });
        },
        prop: function (i, o) {
          return a.access(this, a.prop, i, o, arguments.length > 1);
        },
        removeProp: function (i) {
          return (
            (i = a.propFix[i] || i),
            this.each(function () {
              try {
                (this[i] = n), delete this[i];
              } catch {}
            })
          );
        },
        addClass: function (i) {
          var o, l, h, f, p, m, y;
          if (a.isFunction(i))
            return this.each(function (_) {
              a(this).addClass(i.call(this, _, this.className));
            });
          if (i && typeof i == "string") {
            for (o = i.split(O), l = 0, h = this.length; l < h; l++)
              if (((f = this[l]), f.nodeType === 1))
                if (!f.className && o.length === 1) f.className = i;
                else {
                  for (
                    p = " " + f.className + " ", m = 0, y = o.length;
                    m < y;
                    m++
                  )
                    ~p.indexOf(" " + o[m] + " ") || (p += o[m] + " ");
                  f.className = a.trim(p);
                }
          }
          return this;
        },
        removeClass: function (i) {
          var o, l, h, f, p, m, y;
          if (a.isFunction(i))
            return this.each(function (_) {
              a(this).removeClass(i.call(this, _, this.className));
            });
          if ((i && typeof i == "string") || i === n) {
            for (o = (i || "").split(O), m = 0, y = this.length; m < y; m++)
              if (((h = this[m]), h.nodeType === 1 && h.className)) {
                for (
                  l = (" " + h.className + " ").replace(jt, " "),
                    f = 0,
                    p = o.length;
                  f < p;
                  f++
                )
                  for (; l.indexOf(" " + o[f] + " ") > -1; )
                    l = l.replace(" " + o[f] + " ", " ");
                h.className = i ? a.trim(l) : "";
              }
          }
          return this;
        },
        toggleClass: function (i, o) {
          var l = typeof i,
            h = typeof o == "boolean";
          return a.isFunction(i)
            ? this.each(function (f) {
                a(this).toggleClass(i.call(this, f, this.className, o), o);
              })
            : this.each(function () {
                if (l === "string")
                  for (
                    var f, p = 0, m = a(this), y = o, _ = i.split(O);
                    (f = _[p++]);

                  )
                    (y = h ? y : !m.hasClass(f)),
                      m[y ? "addClass" : "removeClass"](f);
                else
                  (l === "undefined" || l === "boolean") &&
                    (this.className &&
                      a._data(this, "__className__", this.className),
                    (this.className =
                      this.className || i === !1
                        ? ""
                        : a._data(this, "__className__") || ""));
              });
        },
        hasClass: function (i) {
          for (var o = " " + i + " ", l = 0, h = this.length; l < h; l++)
            if (
              this[l].nodeType === 1 &&
              (" " + this[l].className + " ").replace(jt, " ").indexOf(o) > -1
            )
              return !0;
          return !1;
        },
        val: function (i) {
          var o,
            l,
            h,
            f = this[0];
          return arguments.length
            ? ((h = a.isFunction(i)),
              this.each(function (p) {
                var m,
                  y = a(this);
                this.nodeType === 1 &&
                  (h ? (m = i.call(this, p, y.val())) : (m = i),
                  m == null
                    ? (m = "")
                    : typeof m == "number"
                      ? (m += "")
                      : a.isArray(m) &&
                        (m = a.map(m, function (_) {
                          return _ == null ? "" : _ + "";
                        })),
                  (o =
                    a.valHooks[this.type] ||
                    a.valHooks[this.nodeName.toLowerCase()]),
                  (!o || !("set" in o) || o.set(this, m, "value") === n) &&
                    (this.value = m));
              }))
            : f
              ? ((o =
                  a.valHooks[f.type] || a.valHooks[f.nodeName.toLowerCase()]),
                o && "get" in o && (l = o.get(f, "value")) !== n
                  ? l
                  : ((l = f.value),
                    typeof l == "string" ? l.replace(zt, "") : l ?? ""))
              : void 0;
        },
      }),
        a.extend({
          valHooks: {
            option: {
              get: function (i) {
                var o = i.attributes.value;
                return !o || o.specified ? i.value : i.text;
              },
            },
            select: {
              get: function (i) {
                var o,
                  l,
                  h,
                  f,
                  p = i.selectedIndex,
                  m = [],
                  y = i.options,
                  _ = i.type === "select-one";
                if (p < 0) return null;
                for (l = _ ? p : 0, h = _ ? p + 1 : y.length; l < h; l++)
                  if (
                    ((f = y[l]),
                    f.selected &&
                      (a.support.optDisabled
                        ? !f.disabled
                        : f.getAttribute("disabled") === null) &&
                      (!f.parentNode.disabled ||
                        !a.nodeName(f.parentNode, "optgroup")))
                  ) {
                    if (((o = a(f).val()), _)) return o;
                    m.push(o);
                  }
                return _ && !m.length && y.length ? a(y[p]).val() : m;
              },
              set: function (i, o) {
                var l = a.makeArray(o);
                return (
                  a(i)
                    .find("option")
                    .each(function () {
                      this.selected = a.inArray(a(this).val(), l) >= 0;
                    }),
                  l.length || (i.selectedIndex = -1),
                  l
                );
              },
            },
          },
          attrFn: {},
          attr: function (i, o, l, h) {
            var f,
              p,
              m,
              y = i.nodeType;
            if (!(!i || y === 3 || y === 8 || y === 2)) {
              if (h && a.isFunction(a.fn[o])) return a(i)[o](l);
              if (typeof i.getAttribute > "u") return a.prop(i, o, l);
              if (
                ((m = y !== 1 || !a.isXMLDoc(i)),
                m &&
                  ((o = o.toLowerCase()),
                  (p = a.attrHooks[o] || (Ne.test(o) ? Mt : bt))),
                l !== n)
              )
                if (l === null) {
                  a.removeAttr(i, o);
                  return;
                } else
                  return p && "set" in p && m && (f = p.set(i, l, o)) !== n
                    ? f
                    : (i.setAttribute(o, "" + l), l);
              else
                return p && "get" in p && m && (f = p.get(i, o)) !== null
                  ? f
                  : ((f = i.getAttribute(o)), f === null ? n : f);
            }
          },
          removeAttr: function (i, o) {
            var l,
              h,
              f,
              p,
              m = 0;
            if (o && i.nodeType === 1)
              for (h = o.split(O); m < h.length; m++)
                (f = h[m]),
                  f &&
                    ((l = a.propFix[f] || f),
                    (p = Ne.test(f)),
                    p || a.attr(i, f, ""),
                    i.removeAttribute(_i ? f : l),
                    p && l in i && (i[l] = !1));
          },
          attrHooks: {
            type: {
              set: function (i, o) {
                if (ne.test(i.nodeName) && i.parentNode)
                  a.error("type property can't be changed");
                else if (
                  !a.support.radioValue &&
                  o === "radio" &&
                  a.nodeName(i, "input")
                ) {
                  var l = i.value;
                  return i.setAttribute("type", o), l && (i.value = l), o;
                }
              },
            },
            value: {
              get: function (i, o) {
                return bt && a.nodeName(i, "button")
                  ? bt.get(i, o)
                  : o in i
                    ? i.value
                    : null;
              },
              set: function (i, o, l) {
                if (bt && a.nodeName(i, "button")) return bt.set(i, o, l);
                i.value = o;
              },
            },
          },
          propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable",
          },
          prop: function (i, o, l) {
            var h,
              f,
              p,
              m = i.nodeType;
            if (!(!i || m === 3 || m === 8 || m === 2))
              return (
                (p = m !== 1 || !a.isXMLDoc(i)),
                p && ((o = a.propFix[o] || o), (f = a.propHooks[o])),
                l !== n
                  ? f && "set" in f && (h = f.set(i, l, o)) !== n
                    ? h
                    : (i[o] = l)
                  : f && "get" in f && (h = f.get(i, o)) !== null
                    ? h
                    : i[o]
              );
          },
          propHooks: {
            tabIndex: {
              get: function (i) {
                var o = i.getAttributeNode("tabindex");
                return o && o.specified
                  ? parseInt(o.value, 10)
                  : Ze.test(i.nodeName) || (Cn.test(i.nodeName) && i.href)
                    ? 0
                    : n;
              },
            },
          },
        }),
        (Mt = {
          get: function (i, o) {
            var l,
              h = a.prop(i, o);
            return h === !0 ||
              (typeof h != "boolean" &&
                (l = i.getAttributeNode(o)) &&
                l.nodeValue !== !1)
              ? o.toLowerCase()
              : n;
          },
          set: function (i, o, l) {
            var h;
            return (
              o === !1
                ? a.removeAttr(i, l)
                : ((h = a.propFix[l] || l),
                  h in i && (i[h] = !0),
                  i.setAttribute(l, l.toLowerCase())),
              l
            );
          },
        }),
        _i ||
          ((kt = { name: !0, id: !0, coords: !0 }),
          (bt = a.valHooks.button =
            {
              get: function (i, o) {
                var l;
                return (
                  (l = i.getAttributeNode(o)),
                  l && (kt[o] ? l.value !== "" : l.specified) ? l.value : n
                );
              },
              set: function (i, o, l) {
                var h = i.getAttributeNode(l);
                return (
                  h || ((h = u.createAttribute(l)), i.setAttributeNode(h)),
                  (h.value = o + "")
                );
              },
            }),
          a.each(["width", "height"], function (i, o) {
            a.attrHooks[o] = a.extend(a.attrHooks[o], {
              set: function (l, h) {
                if (h === "") return l.setAttribute(o, "auto"), h;
              },
            });
          }),
          (a.attrHooks.contenteditable = {
            get: bt.get,
            set: function (i, o, l) {
              o === "" && (o = "false"), bt.set(i, o, l);
            },
          })),
        a.support.hrefNormalized ||
          a.each(["href", "src", "width", "height"], function (i, o) {
            a.attrHooks[o] = a.extend(a.attrHooks[o], {
              get: function (l) {
                var h = l.getAttribute(o, 2);
                return h === null ? n : h;
              },
            });
          }),
        a.support.style ||
          (a.attrHooks.style = {
            get: function (i) {
              return i.style.cssText.toLowerCase() || n;
            },
            set: function (i, o) {
              return (i.style.cssText = "" + o);
            },
          }),
        a.support.optSelected ||
          (a.propHooks.selected = a.extend(a.propHooks.selected, {
            get: function (i) {
              var o = i.parentNode;
              return (
                o &&
                  (o.selectedIndex, o.parentNode && o.parentNode.selectedIndex),
                null
              );
            },
          })),
        a.support.enctype || (a.propFix.enctype = "encoding"),
        a.support.checkOn ||
          a.each(["radio", "checkbox"], function () {
            a.valHooks[this] = {
              get: function (i) {
                return i.getAttribute("value") === null ? "on" : i.value;
              },
            };
          }),
        a.each(["radio", "checkbox"], function () {
          a.valHooks[this] = a.extend(a.valHooks[this], {
            set: function (i, o) {
              if (a.isArray(o))
                return (i.checked = a.inArray(a(i).val(), o) >= 0);
            },
          });
        });
      var Me = /^(?:textarea|input|select)$/i,
        wi = /^([^\.]*|)(?:\.(.+)|)$/,
        Tn = /(?:^|\s)hover(\.\S+|)\b/,
        Ei = /^key/,
        xi = /^(?:mouse|contextmenu)|click/,
        Ci = /^(?:focusinfocus|focusoutblur)$/,
        Ti = function (i) {
          return a.event.special.hover
            ? i
            : i.replace(Tn, "mouseenter$1 mouseleave$1");
        };
      (a.event = {
        add: function (i, o, l, h, f) {
          var p, m, y, _, A, x, P, M, F, z, q;
          if (
            !(
              i.nodeType === 3 ||
              i.nodeType === 8 ||
              !o ||
              !l ||
              !(p = a._data(i))
            )
          ) {
            for (
              l.handler && ((F = l), (l = F.handler), (f = F.selector)),
                l.guid || (l.guid = a.guid++),
                y = p.events,
                y || (p.events = y = {}),
                m = p.handle,
                m ||
                  ((p.handle = m =
                    function (rt) {
                      return typeof a < "u" &&
                        (!rt || a.event.triggered !== rt.type)
                        ? a.event.dispatch.apply(m.elem, arguments)
                        : n;
                    }),
                  (m.elem = i)),
                o = a.trim(Ti(o)).split(" "),
                _ = 0;
              _ < o.length;
              _++
            )
              (A = wi.exec(o[_]) || []),
                (x = A[1]),
                (P = (A[2] || "").split(".").sort()),
                (q = a.event.special[x] || {}),
                (x = (f ? q.delegateType : q.bindType) || x),
                (q = a.event.special[x] || {}),
                (M = a.extend(
                  {
                    type: x,
                    origType: A[1],
                    data: h,
                    handler: l,
                    guid: l.guid,
                    selector: f,
                    namespace: P.join("."),
                  },
                  F
                )),
                (z = y[x]),
                z ||
                  ((z = y[x] = []),
                  (z.delegateCount = 0),
                  (!q.setup || q.setup.call(i, h, P, m) === !1) &&
                    (i.addEventListener
                      ? i.addEventListener(x, m, !1)
                      : i.attachEvent && i.attachEvent("on" + x, m))),
                q.add &&
                  (q.add.call(i, M),
                  M.handler.guid || (M.handler.guid = l.guid)),
                f ? z.splice(z.delegateCount++, 0, M) : z.push(M),
                (a.event.global[x] = !0);
            i = null;
          }
        },
        global: {},
        remove: function (i, o, l, h, f) {
          var p,
            m,
            y,
            _,
            A,
            x,
            P,
            M,
            F,
            z,
            q,
            rt = a.hasData(i) && a._data(i);
          if (!(!rt || !(M = rt.events))) {
            for (o = a.trim(Ti(o || "")).split(" "), p = 0; p < o.length; p++) {
              if (((m = wi.exec(o[p]) || []), (y = _ = m[1]), (A = m[2]), !y)) {
                for (y in M) a.event.remove(i, y + o[p], l, h, !0);
                continue;
              }
              for (
                F = a.event.special[y] || {},
                  y = (h ? F.delegateType : F.bindType) || y,
                  z = M[y] || [],
                  x = z.length,
                  A = A
                    ? new RegExp(
                        "(^|\\.)" +
                          A.split(".").sort().join("\\.(?:.*\\.|)") +
                          "(\\.|$)"
                      )
                    : null,
                  P = 0;
                P < z.length;
                P++
              )
                (q = z[P]),
                  (f || _ === q.origType) &&
                    (!l || l.guid === q.guid) &&
                    (!A || A.test(q.namespace)) &&
                    (!h || h === q.selector || (h === "**" && q.selector)) &&
                    (z.splice(P--, 1),
                    q.selector && z.delegateCount--,
                    F.remove && F.remove.call(i, q));
              z.length === 0 &&
                x !== z.length &&
                ((!F.teardown || F.teardown.call(i, A, rt.handle) === !1) &&
                  a.removeEvent(i, y, rt.handle),
                delete M[y]);
            }
            a.isEmptyObject(M) &&
              (delete rt.handle, a.removeData(i, "events", !0));
          }
        },
        customEvent: { getData: !0, setData: !0, changeData: !0 },
        trigger: function (i, o, l, h) {
          if (!(l && (l.nodeType === 3 || l.nodeType === 8))) {
            var f,
              p,
              m,
              y,
              _,
              A,
              x,
              P,
              M,
              F,
              z = i.type || i,
              q = [];
            if (
              !Ci.test(z + a.event.triggered) &&
              (z.indexOf("!") >= 0 && ((z = z.slice(0, -1)), (p = !0)),
              z.indexOf(".") >= 0 &&
                ((q = z.split(".")), (z = q.shift()), q.sort()),
              !((!l || a.event.customEvent[z]) && !a.event.global[z]))
            ) {
              if (
                ((i =
                  typeof i == "object"
                    ? i[a.expando]
                      ? i
                      : new a.Event(z, i)
                    : new a.Event(z)),
                (i.type = z),
                (i.isTrigger = !0),
                (i.exclusive = p),
                (i.namespace = q.join(".")),
                (i.namespace_re = i.namespace
                  ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)")
                  : null),
                (A = z.indexOf(":") < 0 ? "on" + z : ""),
                !l)
              ) {
                f = a.cache;
                for (m in f)
                  f[m].events &&
                    f[m].events[z] &&
                    a.event.trigger(i, o, f[m].handle.elem, !0);
                return;
              }
              if (
                ((i.result = n),
                i.target || (i.target = l),
                (o = o != null ? a.makeArray(o) : []),
                o.unshift(i),
                (x = a.event.special[z] || {}),
                !(x.trigger && x.trigger.apply(l, o) === !1))
              ) {
                if (
                  ((M = [[l, x.bindType || z]]),
                  !h && !x.noBubble && !a.isWindow(l))
                ) {
                  for (
                    F = x.delegateType || z,
                      y = Ci.test(F + z) ? l : l.parentNode,
                      _ = l;
                    y;
                    y = y.parentNode
                  )
                    M.push([y, F]), (_ = y);
                  _ === (l.ownerDocument || u) &&
                    M.push([_.defaultView || _.parentWindow || r, F]);
                }
                for (m = 0; m < M.length && !i.isPropagationStopped(); m++)
                  (y = M[m][0]),
                    (i.type = M[m][1]),
                    (P =
                      (a._data(y, "events") || {})[i.type] &&
                      a._data(y, "handle")),
                    P && P.apply(y, o),
                    (P = A && y[A]),
                    P &&
                      a.acceptData(y) &&
                      P.apply(y, o) === !1 &&
                      i.preventDefault();
                return (
                  (i.type = z),
                  !h &&
                    !i.isDefaultPrevented() &&
                    (!x._default ||
                      x._default.apply(l.ownerDocument, o) === !1) &&
                    !(z === "click" && a.nodeName(l, "a")) &&
                    a.acceptData(l) &&
                    A &&
                    l[z] &&
                    ((z !== "focus" && z !== "blur") ||
                      i.target.offsetWidth !== 0) &&
                    !a.isWindow(l) &&
                    ((_ = l[A]),
                    _ && (l[A] = null),
                    (a.event.triggered = z),
                    l[z](),
                    (a.event.triggered = n),
                    _ && (l[A] = _)),
                  i.result
                );
              }
            }
          }
        },
        dispatch: function (i) {
          i = a.event.fix(i || r.event);
          var o,
            l,
            h,
            f,
            p,
            m,
            y,
            _,
            A,
            x = (a._data(this, "events") || {})[i.type] || [],
            P = x.delegateCount,
            M = [].slice.call(arguments),
            F = !i.exclusive && !i.namespace,
            z = a.event.special[i.type] || {},
            q = [];
          if (
            ((M[0] = i),
            (i.delegateTarget = this),
            !(z.preDispatch && z.preDispatch.call(this, i) === !1))
          ) {
            if (P && !(i.button && i.type === "click")) {
              for (h = i.target; h != this; h = h.parentNode || this)
                if (h.disabled !== !0 || i.type !== "click") {
                  for (p = {}, y = [], o = 0; o < P; o++)
                    (_ = x[o]),
                      (A = _.selector),
                      p[A] === n && (p[A] = a(A, this).index(h) >= 0),
                      p[A] && y.push(_);
                  y.length && q.push({ elem: h, matches: y });
                }
            }
            for (
              x.length > P && q.push({ elem: this, matches: x.slice(P) }),
                o = 0;
              o < q.length && !i.isPropagationStopped();
              o++
            )
              for (
                m = q[o], i.currentTarget = m.elem, l = 0;
                l < m.matches.length && !i.isImmediatePropagationStopped();
                l++
              )
                (_ = m.matches[l]),
                  (F ||
                    (!i.namespace && !_.namespace) ||
                    (i.namespace_re && i.namespace_re.test(_.namespace))) &&
                    ((i.data = _.data),
                    (i.handleObj = _),
                    (f = (
                      (a.event.special[_.origType] || {}).handle || _.handler
                    ).apply(m.elem, M)),
                    f !== n &&
                      ((i.result = f),
                      f === !1 && (i.preventDefault(), i.stopPropagation())));
            return z.postDispatch && z.postDispatch.call(this, i), i.result;
          }
        },
        props:
          "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
            " "
          ),
        fixHooks: {},
        keyHooks: {
          props: "char charCode key keyCode".split(" "),
          filter: function (i, o) {
            return (
              i.which == null &&
                (i.which = o.charCode != null ? o.charCode : o.keyCode),
              i
            );
          },
        },
        mouseHooks: {
          props:
            "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
              " "
            ),
          filter: function (i, o) {
            var l,
              h,
              f,
              p = o.button,
              m = o.fromElement;
            return (
              i.pageX == null &&
                o.clientX != null &&
                ((l = i.target.ownerDocument || u),
                (h = l.documentElement),
                (f = l.body),
                (i.pageX =
                  o.clientX +
                  ((h && h.scrollLeft) || (f && f.scrollLeft) || 0) -
                  ((h && h.clientLeft) || (f && f.clientLeft) || 0)),
                (i.pageY =
                  o.clientY +
                  ((h && h.scrollTop) || (f && f.scrollTop) || 0) -
                  ((h && h.clientTop) || (f && f.clientTop) || 0))),
              !i.relatedTarget &&
                m &&
                (i.relatedTarget = m === i.target ? o.toElement : m),
              !i.which &&
                p !== n &&
                (i.which = p & 1 ? 1 : p & 2 ? 3 : p & 4 ? 2 : 0),
              i
            );
          },
        },
        fix: function (i) {
          if (i[a.expando]) return i;
          var o,
            l,
            h = i,
            f = a.event.fixHooks[i.type] || {},
            p = f.props ? this.props.concat(f.props) : this.props;
          for (i = a.Event(h), o = p.length; o; ) (l = p[--o]), (i[l] = h[l]);
          return (
            i.target || (i.target = h.srcElement || u),
            i.target.nodeType === 3 && (i.target = i.target.parentNode),
            (i.metaKey = !!i.metaKey),
            f.filter ? f.filter(i, h) : i
          );
        },
        special: {
          load: { noBubble: !0 },
          focus: { delegateType: "focusin" },
          blur: { delegateType: "focusout" },
          beforeunload: {
            setup: function (i, o, l) {
              a.isWindow(this) && (this.onbeforeunload = l);
            },
            teardown: function (i, o) {
              this.onbeforeunload === o && (this.onbeforeunload = null);
            },
          },
        },
        simulate: function (i, o, l, h) {
          var f = a.extend(new a.Event(), l, {
            type: i,
            isSimulated: !0,
            originalEvent: {},
          });
          h ? a.event.trigger(f, null, o) : a.event.dispatch.call(o, f),
            f.isDefaultPrevented() && l.preventDefault();
        },
      }),
        (a.event.handle = a.event.dispatch),
        (a.removeEvent = u.removeEventListener
          ? function (i, o, l) {
              i.removeEventListener && i.removeEventListener(o, l, !1);
            }
          : function (i, o, l) {
              var h = "on" + o;
              i.detachEvent &&
                (typeof i[h] > "u" && (i[h] = null), i.detachEvent(h, l));
            }),
        (a.Event = function (i, o) {
          if (!(this instanceof a.Event)) return new a.Event(i, o);
          i && i.type
            ? ((this.originalEvent = i),
              (this.type = i.type),
              (this.isDefaultPrevented =
                i.defaultPrevented ||
                i.returnValue === !1 ||
                (i.getPreventDefault && i.getPreventDefault())
                  ? re
                  : Pt))
            : (this.type = i),
            o && a.extend(this, o),
            (this.timeStamp = (i && i.timeStamp) || a.now()),
            (this[a.expando] = !0);
        });
      function Pt() {
        return !1;
      }
      function re() {
        return !0;
      }
      (a.Event.prototype = {
        preventDefault: function () {
          this.isDefaultPrevented = re;
          var i = this.originalEvent;
          i && (i.preventDefault ? i.preventDefault() : (i.returnValue = !1));
        },
        stopPropagation: function () {
          this.isPropagationStopped = re;
          var i = this.originalEvent;
          i &&
            (i.stopPropagation && i.stopPropagation(), (i.cancelBubble = !0));
        },
        stopImmediatePropagation: function () {
          (this.isImmediatePropagationStopped = re), this.stopPropagation();
        },
        isDefaultPrevented: Pt,
        isPropagationStopped: Pt,
        isImmediatePropagationStopped: Pt,
      }),
        a.each(
          { mouseenter: "mouseover", mouseleave: "mouseout" },
          function (i, o) {
            a.event.special[i] = {
              delegateType: o,
              bindType: o,
              handle: function (l) {
                var h,
                  f = this,
                  p = l.relatedTarget,
                  m = l.handleObj;
                return (
                  m.selector,
                  (!p || (p !== f && !a.contains(f, p))) &&
                    ((l.type = m.origType),
                    (h = m.handler.apply(this, arguments)),
                    (l.type = o)),
                  h
                );
              },
            };
          }
        ),
        a.support.submitBubbles ||
          (a.event.special.submit = {
            setup: function () {
              if (a.nodeName(this, "form")) return !1;
              a.event.add(this, "click._submit keypress._submit", function (i) {
                var o = i.target,
                  l =
                    a.nodeName(o, "input") || a.nodeName(o, "button")
                      ? o.form
                      : n;
                l &&
                  !a._data(l, "_submit_attached") &&
                  (a.event.add(l, "submit._submit", function (h) {
                    h._submit_bubble = !0;
                  }),
                  a._data(l, "_submit_attached", !0));
              });
            },
            postDispatch: function (i) {
              i._submit_bubble &&
                (delete i._submit_bubble,
                this.parentNode &&
                  !i.isTrigger &&
                  a.event.simulate("submit", this.parentNode, i, !0));
            },
            teardown: function () {
              if (a.nodeName(this, "form")) return !1;
              a.event.remove(this, "._submit");
            },
          }),
        a.support.changeBubbles ||
          (a.event.special.change = {
            setup: function () {
              if (Me.test(this.nodeName))
                return (
                  (this.type === "checkbox" || this.type === "radio") &&
                    (a.event.add(this, "propertychange._change", function (i) {
                      i.originalEvent.propertyName === "checked" &&
                        (this._just_changed = !0);
                    }),
                    a.event.add(this, "click._change", function (i) {
                      this._just_changed &&
                        !i.isTrigger &&
                        (this._just_changed = !1),
                        a.event.simulate("change", this, i, !0);
                    })),
                  !1
                );
              a.event.add(this, "beforeactivate._change", function (i) {
                var o = i.target;
                Me.test(o.nodeName) &&
                  !a._data(o, "_change_attached") &&
                  (a.event.add(o, "change._change", function (l) {
                    this.parentNode &&
                      !l.isSimulated &&
                      !l.isTrigger &&
                      a.event.simulate("change", this.parentNode, l, !0);
                  }),
                  a._data(o, "_change_attached", !0));
              });
            },
            handle: function (i) {
              var o = i.target;
              if (
                this !== o ||
                i.isSimulated ||
                i.isTrigger ||
                (o.type !== "radio" && o.type !== "checkbox")
              )
                return i.handleObj.handler.apply(this, arguments);
            },
            teardown: function () {
              return a.event.remove(this, "._change"), !Me.test(this.nodeName);
            },
          }),
        a.support.focusinBubbles ||
          a.each({ focus: "focusin", blur: "focusout" }, function (i, o) {
            var l = 0,
              h = function (f) {
                a.event.simulate(o, f.target, a.event.fix(f), !0);
              };
            a.event.special[o] = {
              setup: function () {
                l++ === 0 && u.addEventListener(i, h, !0);
              },
              teardown: function () {
                --l === 0 && u.removeEventListener(i, h, !0);
              },
            };
          }),
        a.fn.extend({
          on: function (i, o, l, h, f) {
            var p, m;
            if (typeof i == "object") {
              typeof o != "string" && ((l = l || o), (o = n));
              for (m in i) this.on(m, o, l, i[m], f);
              return this;
            }
            if (
              (l == null && h == null
                ? ((h = o), (l = o = n))
                : h == null &&
                  (typeof o == "string"
                    ? ((h = l), (l = n))
                    : ((h = l), (l = o), (o = n))),
              h === !1)
            )
              h = Pt;
            else if (!h) return this;
            return (
              f === 1 &&
                ((p = h),
                (h = function (y) {
                  return a().off(y), p.apply(this, arguments);
                }),
                (h.guid = p.guid || (p.guid = a.guid++))),
              this.each(function () {
                a.event.add(this, i, h, l, o);
              })
            );
          },
          one: function (i, o, l, h) {
            return this.on(i, o, l, h, 1);
          },
          off: function (i, o, l) {
            var h, f;
            if (i && i.preventDefault && i.handleObj)
              return (
                (h = i.handleObj),
                a(i.delegateTarget).off(
                  h.namespace ? h.origType + "." + h.namespace : h.origType,
                  h.selector,
                  h.handler
                ),
                this
              );
            if (typeof i == "object") {
              for (f in i) this.off(f, o, i[f]);
              return this;
            }
            return (
              (o === !1 || typeof o == "function") && ((l = o), (o = n)),
              l === !1 && (l = Pt),
              this.each(function () {
                a.event.remove(this, i, l, o);
              })
            );
          },
          bind: function (i, o, l) {
            return this.on(i, null, o, l);
          },
          unbind: function (i, o) {
            return this.off(i, null, o);
          },
          live: function (i, o, l) {
            return a(this.context).on(i, this.selector, o, l), this;
          },
          die: function (i, o) {
            return a(this.context).off(i, this.selector || "**", o), this;
          },
          delegate: function (i, o, l, h) {
            return this.on(o, i, l, h);
          },
          undelegate: function (i, o, l) {
            return arguments.length == 1
              ? this.off(i, "**")
              : this.off(o, i || "**", l);
          },
          trigger: function (i, o) {
            return this.each(function () {
              a.event.trigger(i, o, this);
            });
          },
          triggerHandler: function (i, o) {
            if (this[0]) return a.event.trigger(i, o, this[0], !0);
          },
          toggle: function (i) {
            var o = arguments,
              l = i.guid || a.guid++,
              h = 0,
              f = function (p) {
                var m = (a._data(this, "lastToggle" + i.guid) || 0) % h;
                return (
                  a._data(this, "lastToggle" + i.guid, m + 1),
                  p.preventDefault(),
                  o[m].apply(this, arguments) || !1
                );
              };
            for (f.guid = l; h < o.length; ) o[h++].guid = l;
            return this.click(f);
          },
          hover: function (i, o) {
            return this.mouseenter(i).mouseleave(o || i);
          },
        }),
        a.each(
          "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
            " "
          ),
          function (i, o) {
            (a.fn[o] = function (l, h) {
              return (
                h == null && ((h = l), (l = null)),
                arguments.length > 0 ? this.on(o, null, l, h) : this.trigger(o)
              );
            }),
              Ei.test(o) && (a.event.fixHooks[o] = a.event.keyHooks),
              xi.test(o) && (a.event.fixHooks[o] = a.event.mouseHooks);
          }
        );
      /*!
       * Sizzle CSS Selector Engine
       *  Copyright 2012 jQuery Foundation and other contributors
       *  Released under the MIT license
       *  http://sizzlejs.com/
       */ (function (i, o) {
        var l,
          h,
          f,
          p,
          m,
          y,
          _,
          A,
          x,
          P,
          M = !0,
          F = "undefined",
          z = ("sizcache" + Math.random()).replace(".", ""),
          q = i.document,
          rt = q.documentElement,
          Et = 0,
          pt = [].slice,
          se = [].push,
          st = function (v, E) {
            return (v[z] = E || !0), v;
          },
          he = function () {
            var v = {},
              E = [];
            return st(function (L, N) {
              return (
                E.push(L) > p.cacheLength && delete v[E.shift()], (v[L] = N)
              );
            }, v);
          },
          ni = he(),
          ri = he(),
          ct = he(),
          ot = "[\\x20\\t\\r\\n\\f]",
          Rt = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
          Hn = Rt.replace("w", "w#"),
          Qt = "([*^$|!~]?=)",
          je =
            "\\[" +
            ot +
            "*(" +
            Rt +
            ")" +
            ot +
            "*(?:" +
            Qt +
            ot +
            `*(?:(['"])((?:\\\\.|[^\\\\])*?)\\3|(` +
            Hn +
            ")|)|)" +
            ot +
            "*\\]",
          fe =
            ":(" +
            Rt +
            `)(?:\\((?:(['"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:` +
            je +
            ")|[^:]|\\\\.)*|.*))\\)|)",
          si =
            ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",
          Gt = new RegExp(
            "^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$",
            "g"
          ),
          Jt = new RegExp("^" + ot + "*," + ot + "*"),
          Ri = new RegExp("^" + ot + "*([\\x20\\t\\r\\n\\f>+~])" + ot + "*"),
          aa = new RegExp(fe),
          la = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
          Nn = /[\x20\t\r\n\f]*[+~]/,
          ca = /:not\($/,
          ua = /h\d/i,
          ha = /input|select|textarea|button/i,
          Se = /\\(?!\\)/g,
          de = {
            ID: new RegExp("^#(" + Rt + ")"),
            CLASS: new RegExp("^\\.(" + Rt + ")"),
            NAME: new RegExp(`^\\[name=['"]?(` + Rt + `)['"]?\\]`),
            TAG: new RegExp("^(" + Rt.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + je),
            PSEUDO: new RegExp("^" + fe),
            CHILD: new RegExp(
              "^:(only|nth|last|first)-child(?:\\(" +
                ot +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                ot +
                "*(?:([+-]|)" +
                ot +
                "*(\\d+)|))" +
                ot +
                "*\\)|)",
              "i"
            ),
            POS: new RegExp(si, "ig"),
            needsContext: new RegExp("^" + ot + "*[>+~]|" + si, "i"),
          },
          pe = function (v) {
            var E = q.createElement("div");
            try {
              return v(E);
            } catch {
              return !1;
            } finally {
              E = null;
            }
          },
          fa = pe(function (v) {
            return (
              v.appendChild(q.createComment("")),
              !v.getElementsByTagName("*").length
            );
          }),
          da = pe(function (v) {
            return (
              (v.innerHTML = "<a href='#'></a>"),
              v.firstChild &&
                typeof v.firstChild.getAttribute !== F &&
                v.firstChild.getAttribute("href") === "#"
            );
          }),
          pa = pe(function (v) {
            v.innerHTML = "<select></select>";
            var E = typeof v.lastChild.getAttribute("multiple");
            return E !== "boolean" && E !== "string";
          }),
          os = pe(function (v) {
            return (
              (v.innerHTML =
                "<div class='hidden e'></div><div class='hidden'></div>"),
              !v.getElementsByClassName || !v.getElementsByClassName("e").length
                ? !1
                : ((v.lastChild.className = "e"),
                  v.getElementsByClassName("e").length === 2)
            );
          }),
          ga = pe(function (v) {
            (v.id = z + 0),
              (v.innerHTML =
                "<a name='" + z + "'></a><div name='" + z + "'></div>"),
              rt.insertBefore(v, rt.firstChild);
            var E =
              q.getElementsByName &&
              q.getElementsByName(z).length ===
                2 + q.getElementsByName(z + 0).length;
            return (f = !q.getElementById(z)), rt.removeChild(v), E;
          });
        try {
          pt.call(rt.childNodes, 0)[0].nodeType;
        } catch {
          pt = function (E) {
            for (var L, N = []; (L = this[E]); E++) N.push(L);
            return N;
          };
        }
        function ht(v, E, L, N) {
          (L = L || []), (E = E || q);
          var j,
            R,
            X,
            K,
            V = E.nodeType;
          if (V !== 1 && V !== 9) return [];
          if (!v || typeof v != "string") return L;
          if (((X = y(E)), !X && !N && (j = la.exec(v))))
            if ((K = j[1])) {
              if (V === 9)
                if (((R = E.getElementById(K)), R && R.parentNode)) {
                  if (R.id === K) return L.push(R), L;
                } else return L;
              else if (
                E.ownerDocument &&
                (R = E.ownerDocument.getElementById(K)) &&
                _(E, R) &&
                R.id === K
              )
                return L.push(R), L;
            } else {
              if (j[2])
                return se.apply(L, pt.call(E.getElementsByTagName(v), 0)), L;
              if ((K = j[3]) && os && E.getElementsByClassName)
                return se.apply(L, pt.call(E.getElementsByClassName(K), 0)), L;
            }
          return Mn(v, E, L, N, X);
        }
        (ht.matches = function (v, E) {
          return ht(v, null, null, E);
        }),
          (ht.matchesSelector = function (v, E) {
            return ht(E, null, null, [v]).length > 0;
          });
        function oi(v) {
          return function (E) {
            var L = E.nodeName.toLowerCase();
            return L === "input" && E.type === v;
          };
        }
        function as(v) {
          return function (E) {
            var L = E.nodeName.toLowerCase();
            return (L === "input" || L === "button") && E.type === v;
          };
        }
        (m = ht.getText =
          function (v) {
            var E,
              L = "",
              N = 0,
              j = v.nodeType;
            if (j) {
              if (j === 1 || j === 9 || j === 11) {
                if (typeof v.textContent == "string") return v.textContent;
                for (v = v.firstChild; v; v = v.nextSibling) L += m(v);
              } else if (j === 3 || j === 4) return v.nodeValue;
            } else for (; (E = v[N]); N++) L += m(E);
            return L;
          }),
          (y = ht.isXML =
            function (E) {
              var L = E && (E.ownerDocument || E).documentElement;
              return L ? L.nodeName !== "HTML" : !1;
            }),
          (_ = ht.contains =
            rt.contains
              ? function (v, E) {
                  var L = v.nodeType === 9 ? v.documentElement : v,
                    N = E && E.parentNode;
                  return (
                    v === N ||
                    !!(N && N.nodeType === 1 && L.contains && L.contains(N))
                  );
                }
              : rt.compareDocumentPosition
                ? function (v, E) {
                    return E && !!(v.compareDocumentPosition(E) & 16);
                  }
                : function (v, E) {
                    for (; (E = E.parentNode); ) if (E === v) return !0;
                    return !1;
                  }),
          (ht.attr = function (v, E) {
            var L,
              N = y(v);
            return (
              N || (E = E.toLowerCase()),
              p.attrHandle[E]
                ? p.attrHandle[E](v)
                : pa || N
                  ? v.getAttribute(E)
                  : ((L = v.getAttributeNode(E)),
                    L
                      ? typeof v[E] == "boolean"
                        ? v[E]
                          ? E
                          : null
                        : L.specified
                          ? L.value
                          : null
                      : null)
            );
          }),
          (p = ht.selectors =
            {
              cacheLength: 50,
              createPseudo: st,
              match: de,
              order: new RegExp(
                "ID|TAG" + (ga ? "|NAME" : "") + (os ? "|CLASS" : "")
              ),
              attrHandle: da
                ? {}
                : {
                    href: function (v) {
                      return v.getAttribute("href", 2);
                    },
                    type: function (v) {
                      return v.getAttribute("type");
                    },
                  },
              find: {
                ID: f
                  ? function (v, E, L) {
                      if (typeof E.getElementById !== F && !L) {
                        var N = E.getElementById(v);
                        return N && N.parentNode ? [N] : [];
                      }
                    }
                  : function (v, E, L) {
                      if (typeof E.getElementById !== F && !L) {
                        var N = E.getElementById(v);
                        return N
                          ? N.id === v ||
                            (typeof N.getAttributeNode !== F &&
                              N.getAttributeNode("id").value === v)
                            ? [N]
                            : o
                          : [];
                      }
                    },
                TAG: fa
                  ? function (v, E) {
                      if (typeof E.getElementsByTagName !== F)
                        return E.getElementsByTagName(v);
                    }
                  : function (v, E) {
                      var L = E.getElementsByTagName(v);
                      if (v === "*") {
                        for (var N, j = [], R = 0; (N = L[R]); R++)
                          N.nodeType === 1 && j.push(N);
                        return j;
                      }
                      return L;
                    },
                NAME: function (v, E) {
                  if (typeof E.getElementsByName !== F)
                    return E.getElementsByName(name);
                },
                CLASS: function (v, E, L) {
                  if (typeof E.getElementsByClassName !== F && !L)
                    return E.getElementsByClassName(v);
                },
              },
              relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
              },
              preFilter: {
                ATTR: function (v) {
                  return (
                    (v[1] = v[1].replace(Se, "")),
                    (v[3] = (v[4] || v[5] || "").replace(Se, "")),
                    v[2] === "~=" && (v[3] = " " + v[3] + " "),
                    v.slice(0, 4)
                  );
                },
                CHILD: function (v) {
                  return (
                    (v[1] = v[1].toLowerCase()),
                    v[1] === "nth"
                      ? (v[2] || ht.error(v[0]),
                        (v[3] = +(v[3]
                          ? v[4] + (v[5] || 1)
                          : 2 * (v[2] === "even" || v[2] === "odd"))),
                        (v[4] = +(v[6] + v[7] || v[2] === "odd")))
                      : v[2] && ht.error(v[0]),
                    v
                  );
                },
                PSEUDO: function (v, E, L) {
                  var N, j;
                  return de.CHILD.test(v[0])
                    ? null
                    : (v[3]
                        ? (v[2] = v[3])
                        : (N = v[4]) &&
                          (aa.test(N) &&
                            (j = ji(N, E, L, !0)) &&
                            (j = N.indexOf(")", N.length - j) - N.length) &&
                            ((N = N.slice(0, j)), (v[0] = v[0].slice(0, j))),
                          (v[2] = N)),
                      v.slice(0, 3));
                },
              },
              filter: {
                ID: f
                  ? function (v) {
                      return (
                        (v = v.replace(Se, "")),
                        function (E) {
                          return E.getAttribute("id") === v;
                        }
                      );
                    }
                  : function (v) {
                      return (
                        (v = v.replace(Se, "")),
                        function (E) {
                          var L =
                            typeof E.getAttributeNode !== F &&
                            E.getAttributeNode("id");
                          return L && L.value === v;
                        }
                      );
                    },
                TAG: function (v) {
                  return v === "*"
                    ? function () {
                        return !0;
                      }
                    : ((v = v.replace(Se, "").toLowerCase()),
                      function (E) {
                        return E.nodeName && E.nodeName.toLowerCase() === v;
                      });
                },
                CLASS: function (v) {
                  var E = ni[z][v];
                  return (
                    E ||
                      (E = ni(
                        v,
                        new RegExp("(^|" + ot + ")" + v + "(" + ot + "|$)")
                      )),
                    function (L) {
                      return E.test(
                        L.className ||
                          (typeof L.getAttribute !== F &&
                            L.getAttribute("class")) ||
                          ""
                      );
                    }
                  );
                },
                ATTR: function (v, E, L) {
                  return E
                    ? function (N) {
                        var j = ht.attr(N, v),
                          R = j + "";
                        if (j == null) return E === "!=";
                        switch (E) {
                          case "=":
                            return R === L;
                          case "!=":
                            return R !== L;
                          case "^=":
                            return L && R.indexOf(L) === 0;
                          case "*=":
                            return L && R.indexOf(L) > -1;
                          case "$=":
                            return L && R.substr(R.length - L.length) === L;
                          case "~=":
                            return (" " + R + " ").indexOf(L) > -1;
                          case "|=":
                            return (
                              R === L || R.substr(0, L.length + 1) === L + "-"
                            );
                        }
                      }
                    : function (N) {
                        return ht.attr(N, v) != null;
                      };
                },
                CHILD: function (v, E, L, N) {
                  if (v === "nth") {
                    var j = Et++;
                    return function (R) {
                      var X,
                        K,
                        V = 0,
                        et = R;
                      if (L === 1 && N === 0) return !0;
                      if (
                        ((X = R.parentNode), X && (X[z] !== j || !R.sizset))
                      ) {
                        for (
                          et = X.firstChild;
                          et &&
                          !(et.nodeType === 1 && ((et.sizset = ++V), et === R));
                          et = et.nextSibling
                        );
                        X[z] = j;
                      }
                      return (
                        (K = R.sizset - N),
                        L === 0 ? K === 0 : K % L === 0 && K / L >= 0
                      );
                    };
                  }
                  return function (R) {
                    var X = R;
                    switch (v) {
                      case "only":
                      case "first":
                        for (; (X = X.previousSibling); )
                          if (X.nodeType === 1) return !1;
                        if (v === "first") return !0;
                        X = R;
                      case "last":
                        for (; (X = X.nextSibling); )
                          if (X.nodeType === 1) return !1;
                        return !0;
                    }
                  };
                },
                PSEUDO: function (v, E, L, N) {
                  var j,
                    R = p.pseudos[v] || p.pseudos[v.toLowerCase()];
                  return (
                    R || ht.error("unsupported pseudo: " + v),
                    R[z]
                      ? R(E, L, N)
                      : R.length > 1
                        ? ((j = [v, v, "", E]),
                          function (X) {
                            return R(X, 0, j);
                          })
                        : R
                  );
                },
              },
              pseudos: {
                not: st(function (v, E, L) {
                  var N = A(v.replace(Gt, "$1"), E, L);
                  return function (j) {
                    return !N(j);
                  };
                }),
                enabled: function (v) {
                  return v.disabled === !1;
                },
                disabled: function (v) {
                  return v.disabled === !0;
                },
                checked: function (v) {
                  var E = v.nodeName.toLowerCase();
                  return (
                    (E === "input" && !!v.checked) ||
                    (E === "option" && !!v.selected)
                  );
                },
                selected: function (v) {
                  return (
                    v.parentNode && v.parentNode.selectedIndex,
                    v.selected === !0
                  );
                },
                parent: function (v) {
                  return !p.pseudos.empty(v);
                },
                empty: function (v) {
                  var E;
                  for (v = v.firstChild; v; ) {
                    if (v.nodeName > "@" || (E = v.nodeType) === 3 || E === 4)
                      return !1;
                    v = v.nextSibling;
                  }
                  return !0;
                },
                contains: st(function (v) {
                  return function (E) {
                    return (
                      (E.textContent || E.innerText || m(E)).indexOf(v) > -1
                    );
                  };
                }),
                has: st(function (v) {
                  return function (E) {
                    return ht(v, E).length > 0;
                  };
                }),
                header: function (v) {
                  return ua.test(v.nodeName);
                },
                text: function (v) {
                  var E, L;
                  return (
                    v.nodeName.toLowerCase() === "input" &&
                    (E = v.type) === "text" &&
                    ((L = v.getAttribute("type")) == null ||
                      L.toLowerCase() === E)
                  );
                },
                radio: oi("radio"),
                checkbox: oi("checkbox"),
                file: oi("file"),
                password: oi("password"),
                image: oi("image"),
                submit: as("submit"),
                reset: as("reset"),
                button: function (v) {
                  var E = v.nodeName.toLowerCase();
                  return (
                    (E === "input" && v.type === "button") || E === "button"
                  );
                },
                input: function (v) {
                  return ha.test(v.nodeName);
                },
                focus: function (v) {
                  var E = v.ownerDocument;
                  return (
                    v === E.activeElement &&
                    (!E.hasFocus || E.hasFocus()) &&
                    !!(v.type || v.href)
                  );
                },
                active: function (v) {
                  return v === v.ownerDocument.activeElement;
                },
              },
              setFilters: {
                first: function (v, E, L) {
                  return L ? v.slice(1) : [v[0]];
                },
                last: function (v, E, L) {
                  var N = v.pop();
                  return L ? v : [N];
                },
                even: function (v, E, L) {
                  for (
                    var N = [], j = L ? 1 : 0, R = v.length;
                    j < R;
                    j = j + 2
                  )
                    N.push(v[j]);
                  return N;
                },
                odd: function (v, E, L) {
                  for (
                    var N = [], j = L ? 0 : 1, R = v.length;
                    j < R;
                    j = j + 2
                  )
                    N.push(v[j]);
                  return N;
                },
                lt: function (v, E, L) {
                  return L ? v.slice(+E) : v.slice(0, +E);
                },
                gt: function (v, E, L) {
                  return L ? v.slice(0, +E + 1) : v.slice(+E + 1);
                },
                eq: function (v, E, L) {
                  var N = v.splice(+E, 1);
                  return L ? v : N;
                },
              },
            });
        function Bi(v, E, L) {
          if (v === E) return L;
          for (var N = v.nextSibling; N; ) {
            if (N === E) return -1;
            N = N.nextSibling;
          }
          return 1;
        }
        (x = rt.compareDocumentPosition
          ? function (v, E) {
              return v === E
                ? ((P = !0), 0)
                : (
                      !v.compareDocumentPosition || !E.compareDocumentPosition
                        ? v.compareDocumentPosition
                        : v.compareDocumentPosition(E) & 4
                    )
                  ? -1
                  : 1;
            }
          : function (v, E) {
              if (v === E) return (P = !0), 0;
              if (v.sourceIndex && E.sourceIndex)
                return v.sourceIndex - E.sourceIndex;
              var L,
                N,
                j = [],
                R = [],
                X = v.parentNode,
                K = E.parentNode,
                V = X;
              if (X === K) return Bi(v, E);
              if (X) {
                if (!K) return 1;
              } else return -1;
              for (; V; ) j.unshift(V), (V = V.parentNode);
              for (V = K; V; ) R.unshift(V), (V = V.parentNode);
              (L = j.length), (N = R.length);
              for (var et = 0; et < L && et < N; et++)
                if (j[et] !== R[et]) return Bi(j[et], R[et]);
              return et === L ? Bi(v, R[et], -1) : Bi(j[et], E, 1);
            }),
          [0, 0].sort(x),
          (M = !P),
          (ht.uniqueSort = function (v) {
            var E,
              L = 1;
            if (((P = M), v.sort(x), P))
              for (; (E = v[L]); L++) E === v[L - 1] && v.splice(L--, 1);
            return v;
          }),
          (ht.error = function (v) {
            throw new Error("Syntax error, unrecognized expression: " + v);
          });
        function ji(v, E, L, N) {
          var j,
            R,
            X,
            K,
            V,
            et,
            gt,
            ft,
            vt,
            xt = !L && E !== q,
            Lt = (xt ? "<s>" : "") + v.replace(Gt, "$1<s>"),
            Ft = ri[z][Lt];
          if (Ft) return N ? 0 : pt.call(Ft, 0);
          for (V = v, et = [], ft = p.preFilter, vt = p.filter; V; ) {
            (!j || (R = Jt.exec(V))) &&
              (R && ((V = V.slice(R[0].length)), (X.selector = gt)),
              et.push((X = [])),
              (gt = ""),
              xt && (V = " " + V)),
              (j = !1),
              (R = Ri.exec(V)) &&
                ((gt += R[0]),
                (V = V.slice(R[0].length)),
                (j = X.push({
                  part: R.pop().replace(Gt, " "),
                  string: R[0],
                  captures: R,
                })));
            for (K in vt)
              (R = de[K].exec(V)) &&
                (!ft[K] || (R = ft[K](R, E, L))) &&
                ((gt += R[0]),
                (V = V.slice(R[0].length)),
                (j = X.push({ part: K, string: R.shift(), captures: R })));
            if (!j) break;
          }
          return (
            gt && (X.selector = gt),
            N ? V.length : V ? ht.error(v) : pt.call(ri(Lt, et), 0)
          );
        }
        function ma(v, E, L, N) {
          var j = E.dir,
            R = Et++;
          return (
            v ||
              (v = function (X) {
                return X === L;
              }),
            E.first
              ? function (X) {
                  for (; (X = X[j]); ) if (X.nodeType === 1) return v(X) && X;
                }
              : N
                ? function (X) {
                    for (; (X = X[j]); ) if (X.nodeType === 1 && v(X)) return X;
                  }
                : function (X) {
                    for (var K, V = R + "." + l, et = V + "." + h; (X = X[j]); )
                      if (X.nodeType === 1) {
                        if ((K = X[z]) === et) return X.sizset;
                        if (typeof K == "string" && K.indexOf(V) === 0) {
                          if (X.sizset) return X;
                        } else {
                          if (((X[z] = et), v(X))) return (X.sizset = !0), X;
                          X.sizset = !1;
                        }
                      }
                  }
          );
        }
        function va(v, E) {
          return v
            ? function (L) {
                var N = E(L);
                return N && v(N === !0 ? L : N);
              }
            : E;
        }
        function ya(v, E, L) {
          for (var N, j, R = 0; (N = v[R]); R++)
            p.relative[N.part]
              ? (j = ma(j, p.relative[N.part], E, L))
              : (j = va(
                  j,
                  p.filter[N.part].apply(null, N.captures.concat(E, L))
                ));
          return j;
        }
        function ba(v) {
          return function (E) {
            for (var L, N = 0; (L = v[N]); N++) if (L(E)) return !0;
            return !1;
          };
        }
        A = ht.compile = function (v, E, L) {
          var N,
            j,
            R,
            X = ct[z][v];
          if (X && X.context === E) return X;
          for (N = ji(v, E, L), j = 0, R = N.length; j < R; j++)
            N[j] = ya(N[j], E, L);
          return (
            (X = ct(v, ba(N))), (X.context = E), (X.runs = X.dirruns = 0), X
          );
        };
        function ls(v, E, L, N) {
          for (var j = 0, R = E.length; j < R; j++) ht(v, E[j], L, N);
        }
        function _a(v, E, L, N, j, R) {
          var X,
            K = p.setFilters[E.toLowerCase()];
          return (
            K || ht.error(E),
            (v || !(X = j)) && ls(v || "*", N, (X = []), j),
            X.length > 0 ? K(X, L, R) : []
          );
        }
        function wa(v, E, L, N) {
          for (
            var j,
              R,
              X,
              K,
              V,
              et,
              gt,
              ft,
              vt,
              xt,
              Lt,
              Ft,
              oe,
              ai = 0,
              zi = v.length,
              Fi = de.POS,
              Ea = new RegExp("^" + Fi.source + "(?!" + ot + ")", "i"),
              xa = function () {
                for (var Xi = 1, Ca = arguments.length - 2; Xi < Ca; Xi++)
                  arguments[Xi] === o && (vt[Xi] = o);
              };
            ai < zi;
            ai++
          ) {
            for (j = v[ai], R = "", ft = N, X = 0, K = j.length; X < K; X++) {
              if (((V = j[X]), (et = V.string), V.part === "PSEUDO"))
                for (Fi.exec(""), gt = 0; (vt = Fi.exec(et)); )
                  (xt = !0),
                    (Lt = Fi.lastIndex = vt.index + vt[0].length),
                    Lt > gt &&
                      ((R += et.slice(gt, vt.index)),
                      (gt = Lt),
                      (Ft = [E]),
                      Ri.test(R) && (ft && (Ft = ft), (ft = N)),
                      (oe = ca.test(R)) &&
                        ((R = R.slice(0, -5).replace(Ri, "$&*")), gt++),
                      vt.length > 1 && vt[0].replace(Ea, xa),
                      (ft = _a(R, vt[1], vt[2], Ft, ft, oe))),
                    (R = "");
              xt || (R += et), (xt = !1);
            }
            R
              ? Ri.test(R)
                ? ls(R, ft || [E], L, N)
                : ht(R, E, L, N ? N.concat(ft) : ft)
              : se.apply(L, ft);
          }
          return zi === 1 ? L : ht.uniqueSort(L);
        }
        function Mn(v, E, L, N, j) {
          v = v.replace(Gt, "$1");
          var R,
            X,
            K,
            V,
            et,
            gt,
            ft,
            vt,
            xt,
            Lt = ji(v, E, j),
            Ft = E.nodeType;
          if (de.POS.test(v)) return wa(Lt, E, L, N);
          if (N) R = pt.call(N, 0);
          else if (Lt.length === 1) {
            if (
              (et = pt.call(Lt[0], 0)).length > 2 &&
              (gt = et[0]).part === "ID" &&
              Ft === 9 &&
              !j &&
              p.relative[et[1].part]
            ) {
              if (
                ((E = p.find.ID(gt.captures[0].replace(Se, ""), E, j)[0]), !E)
              )
                return L;
              v = v.slice(et.shift().string.length);
            }
            for (
              vt =
                ((Lt = Nn.exec(et[0].string)) && !Lt.index && E.parentNode) ||
                E,
                ft = "",
                V = et.length - 1;
              V >= 0 &&
              ((gt = et[V]),
              (xt = gt.part),
              (ft = gt.string + ft),
              !p.relative[xt]);
              V--
            )
              if (p.order.test(xt)) {
                if (
                  ((R = p.find[xt](gt.captures[0].replace(Se, ""), vt, j)),
                  R == null)
                )
                  continue;
                (v = v.slice(0, v.length - ft.length) + ft.replace(de[xt], "")),
                  v || se.apply(L, pt.call(R, 0));
                break;
              }
          }
          if (v)
            for (
              X = A(v, E, j),
                l = X.dirruns++,
                R == null &&
                  (R = p.find.TAG("*", (Nn.test(v) && E.parentNode) || E)),
                V = 0;
              (K = R[V]);
              V++
            )
              (h = X.runs++), X(K) && L.push(K);
          return L;
        }
        q.querySelectorAll &&
          (function () {
            var v,
              E = Mn,
              L = /'|\\/g,
              N = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
              j = [],
              R = [":active"],
              X =
                rt.matchesSelector ||
                rt.mozMatchesSelector ||
                rt.webkitMatchesSelector ||
                rt.oMatchesSelector ||
                rt.msMatchesSelector;
            pe(function (K) {
              (K.innerHTML = "<select><option selected=''></option></select>"),
                K.querySelectorAll("[selected]").length ||
                  j.push(
                    "\\[" +
                      ot +
                      "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"
                  ),
                K.querySelectorAll(":checked").length || j.push(":checked");
            }),
              pe(function (K) {
                (K.innerHTML = "<p test=''></p>"),
                  K.querySelectorAll("[test^='']").length &&
                    j.push("[*^$]=" + ot + `*(?:""|'')`),
                  (K.innerHTML = "<input type='hidden'/>"),
                  K.querySelectorAll(":enabled").length ||
                    j.push(":enabled", ":disabled");
              }),
              (j = j.length && new RegExp(j.join("|"))),
              (Mn = function (K, V, et, gt, ft) {
                if (!gt && !ft && (!j || !j.test(K))) {
                  if (V.nodeType === 9)
                    try {
                      return (
                        se.apply(et, pt.call(V.querySelectorAll(K), 0)), et
                      );
                    } catch {}
                  else if (
                    V.nodeType === 1 &&
                    V.nodeName.toLowerCase() !== "object"
                  ) {
                    var vt,
                      xt,
                      Lt,
                      Ft = V.getAttribute("id"),
                      oe = Ft || z,
                      ai = (Nn.test(K) && V.parentNode) || V;
                    for (
                      Ft
                        ? (oe = oe.replace(L, "\\$&"))
                        : V.setAttribute("id", oe),
                        vt = ji(K, V, ft),
                        oe = "[id='" + oe + "']",
                        xt = 0,
                        Lt = vt.length;
                      xt < Lt;
                      xt++
                    )
                      vt[xt] = oe + vt[xt].selector;
                    try {
                      return (
                        se.apply(
                          et,
                          pt.call(ai.querySelectorAll(vt.join(",")), 0)
                        ),
                        et
                      );
                    } catch {
                    } finally {
                      Ft || V.removeAttribute("id");
                    }
                  }
                }
                return E(K, V, et, gt, ft);
              }),
              X &&
                (pe(function (K) {
                  v = X.call(K, "div");
                  try {
                    X.call(K, "[test!='']:sizzle"),
                      R.push(de.PSEUDO.source, de.POS.source, "!=");
                  } catch {}
                }),
                (R = new RegExp(R.join("|"))),
                (ht.matchesSelector = function (K, V) {
                  if (
                    ((V = V.replace(N, "='$1']")),
                    !y(K) && !R.test(V) && (!j || !j.test(V)))
                  )
                    try {
                      var et = X.call(K, V);
                      if (et || v || (K.document && K.document.nodeType !== 11))
                        return et;
                    } catch {}
                  return ht(V, null, null, [K]).length > 0;
                }));
          })(),
          (p.setFilters.nth = p.setFilters.eq),
          (p.filters = p.pseudos),
          (ht.attr = a.attr),
          (a.find = ht),
          (a.expr = ht.selectors),
          (a.expr[":"] = a.expr.pseudos),
          (a.unique = ht.uniqueSort),
          (a.text = ht.getText),
          (a.isXMLDoc = ht.isXML),
          (a.contains = ht.contains);
      })(r);
      var ki = /Until$/,
        Ai = /^(?:parents|prev(?:Until|All))/,
        $e = /^.[^:#\[\.,]*$/,
        ti = a.expr.match.needsContext,
        Si = { children: !0, contents: !0, next: !0, prev: !0 };
      a.fn.extend({
        find: function (i) {
          var o,
            l,
            h,
            f,
            p,
            m,
            y = this;
          if (typeof i != "string")
            return a(i).filter(function () {
              for (o = 0, l = y.length; o < l; o++)
                if (a.contains(y[o], this)) return !0;
            });
          for (
            m = this.pushStack("", "find", i), o = 0, l = this.length;
            o < l;
            o++
          )
            if (((h = m.length), a.find(i, this[o], m), o > 0)) {
              for (f = h; f < m.length; f++)
                for (p = 0; p < h; p++)
                  if (m[p] === m[f]) {
                    m.splice(f--, 1);
                    break;
                  }
            }
          return m;
        },
        has: function (i) {
          var o,
            l = a(i, this),
            h = l.length;
          return this.filter(function () {
            for (o = 0; o < h; o++) if (a.contains(this, l[o])) return !0;
          });
        },
        not: function (i) {
          return this.pushStack(kr(this, i, !1), "not", i);
        },
        filter: function (i) {
          return this.pushStack(kr(this, i, !0), "filter", i);
        },
        is: function (i) {
          return (
            !!i &&
            (typeof i == "string"
              ? ti.test(i)
                ? a(i, this.context).index(this[0]) >= 0
                : a.filter(i, this).length > 0
              : this.filter(i).length > 0)
          );
        },
        closest: function (i, o) {
          for (
            var l,
              h = 0,
              f = this.length,
              p = [],
              m =
                ti.test(i) || typeof i != "string"
                  ? a(i, o || this.context)
                  : 0;
            h < f;
            h++
          )
            for (
              l = this[h];
              l && l.ownerDocument && l !== o && l.nodeType !== 11;

            ) {
              if (m ? m.index(l) > -1 : a.find.matchesSelector(l, i)) {
                p.push(l);
                break;
              }
              l = l.parentNode;
            }
          return (
            (p = p.length > 1 ? a.unique(p) : p),
            this.pushStack(p, "closest", i)
          );
        },
        index: function (i) {
          return i
            ? typeof i == "string"
              ? a.inArray(this[0], a(i))
              : a.inArray(i.jquery ? i[0] : i, this)
            : this[0] && this[0].parentNode
              ? this.prevAll().length
              : -1;
        },
        add: function (i, o) {
          var l =
              typeof i == "string"
                ? a(i, o)
                : a.makeArray(i && i.nodeType ? [i] : i),
            h = a.merge(this.get(), l);
          return this.pushStack(ue(l[0]) || ue(h[0]) ? h : a.unique(h));
        },
        addBack: function (i) {
          return this.add(
            i == null ? this.prevObject : this.prevObject.filter(i)
          );
        },
      }),
        (a.fn.andSelf = a.fn.addBack);
      function ue(i) {
        return !i || !i.parentNode || i.parentNode.nodeType === 11;
      }
      function ei(i, o) {
        do i = i[o];
        while (i && i.nodeType !== 1);
        return i;
      }
      a.each(
        {
          parent: function (i) {
            var o = i.parentNode;
            return o && o.nodeType !== 11 ? o : null;
          },
          parents: function (i) {
            return a.dir(i, "parentNode");
          },
          parentsUntil: function (i, o, l) {
            return a.dir(i, "parentNode", l);
          },
          next: function (i) {
            return ei(i, "nextSibling");
          },
          prev: function (i) {
            return ei(i, "previousSibling");
          },
          nextAll: function (i) {
            return a.dir(i, "nextSibling");
          },
          prevAll: function (i) {
            return a.dir(i, "previousSibling");
          },
          nextUntil: function (i, o, l) {
            return a.dir(i, "nextSibling", l);
          },
          prevUntil: function (i, o, l) {
            return a.dir(i, "previousSibling", l);
          },
          siblings: function (i) {
            return a.sibling((i.parentNode || {}).firstChild, i);
          },
          children: function (i) {
            return a.sibling(i.firstChild);
          },
          contents: function (i) {
            return a.nodeName(i, "iframe")
              ? i.contentDocument || i.contentWindow.document
              : a.merge([], i.childNodes);
          },
        },
        function (i, o) {
          a.fn[i] = function (l, h) {
            var f = a.map(this, o, l);
            return (
              ki.test(i) || (h = l),
              h && typeof h == "string" && (f = a.filter(h, f)),
              (f = this.length > 1 && !Si[i] ? a.unique(f) : f),
              this.length > 1 && Ai.test(i) && (f = f.reverse()),
              this.pushStack(f, i, I.call(arguments).join(","))
            );
          };
        }
      ),
        a.extend({
          filter: function (i, o, l) {
            return (
              l && (i = ":not(" + i + ")"),
              o.length === 1
                ? a.find.matchesSelector(o[0], i)
                  ? [o[0]]
                  : []
                : a.find.matches(i, o)
            );
          },
          dir: function (i, o, l) {
            for (
              var h = [], f = i[o];
              f &&
              f.nodeType !== 9 &&
              (l === n || f.nodeType !== 1 || !a(f).is(l));

            )
              f.nodeType === 1 && h.push(f), (f = f[o]);
            return h;
          },
          sibling: function (i, o) {
            for (var l = []; i; i = i.nextSibling)
              i.nodeType === 1 && i !== o && l.push(i);
            return l;
          },
        });
      function kr(i, o, l) {
        if (((o = o || 0), a.isFunction(o)))
          return a.grep(i, function (f, p) {
            var m = !!o.call(f, p, f);
            return m === l;
          });
        if (o.nodeType)
          return a.grep(i, function (f, p) {
            return (f === o) === l;
          });
        if (typeof o == "string") {
          var h = a.grep(i, function (f) {
            return f.nodeType === 1;
          });
          if ($e.test(o)) return a.filter(o, h, !l);
          o = a.filter(o, h);
        }
        return a.grep(i, function (f, p) {
          return a.inArray(f, o) >= 0 === l;
        });
      }
      function Ar(i) {
        var o = Sr.split("|"),
          l = i.createDocumentFragment();
        if (l.createElement) for (; o.length; ) l.createElement(o.pop());
        return l;
      }
      var Sr =
          "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        xo = / jQuery\d+="(?:null|\d+)"/g,
        kn = /^\s+/,
        Lr =
          /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ir = /<([\w:]+)/,
        Co = /<tbody/i,
        To = /<|&#?\w+;/,
        ko = /<(?:script|style|link)/i,
        Ao = /<(?:script|object|embed|option|style)/i,
        An = new RegExp("<(?:" + Sr + ")[\\s/>]", "i"),
        Pr = /^(?:checkbox|radio)$/,
        Or = /checked\s*(?:[^=]|=\s*.checked.)/i,
        So = /\/(java|ecma)script/i,
        Lo = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Wt = {
          option: [1, "<select multiple='multiple'>", "</select>"],
          legend: [1, "<fieldset>", "</fieldset>"],
          thead: [1, "<table>", "</table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
          area: [1, "<map>", "</map>"],
          _default: [0, "", ""],
        },
        Dr = Ar(u),
        Sn = Dr.appendChild(u.createElement("div"));
      (Wt.optgroup = Wt.option),
        (Wt.tbody = Wt.tfoot = Wt.colgroup = Wt.caption = Wt.thead),
        (Wt.th = Wt.td),
        a.support.htmlSerialize || (Wt._default = [1, "X<div>", "</div>"]),
        a.fn.extend({
          text: function (i) {
            return a.access(
              this,
              function (o) {
                return o === n
                  ? a.text(this)
                  : this.empty().append(
                      ((this[0] && this[0].ownerDocument) || u).createTextNode(
                        o
                      )
                    );
              },
              null,
              i,
              arguments.length
            );
          },
          wrapAll: function (i) {
            if (a.isFunction(i))
              return this.each(function (l) {
                a(this).wrapAll(i.call(this, l));
              });
            if (this[0]) {
              var o = a(i, this[0].ownerDocument).eq(0).clone(!0);
              this[0].parentNode && o.insertBefore(this[0]),
                o
                  .map(function () {
                    for (
                      var l = this;
                      l.firstChild && l.firstChild.nodeType === 1;

                    )
                      l = l.firstChild;
                    return l;
                  })
                  .append(this);
            }
            return this;
          },
          wrapInner: function (i) {
            return a.isFunction(i)
              ? this.each(function (o) {
                  a(this).wrapInner(i.call(this, o));
                })
              : this.each(function () {
                  var o = a(this),
                    l = o.contents();
                  l.length ? l.wrapAll(i) : o.append(i);
                });
          },
          wrap: function (i) {
            var o = a.isFunction(i);
            return this.each(function (l) {
              a(this).wrapAll(o ? i.call(this, l) : i);
            });
          },
          unwrap: function () {
            return this.parent()
              .each(function () {
                a.nodeName(this, "body") ||
                  a(this).replaceWith(this.childNodes);
              })
              .end();
          },
          append: function () {
            return this.domManip(arguments, !0, function (i) {
              (this.nodeType === 1 || this.nodeType === 11) &&
                this.appendChild(i);
            });
          },
          prepend: function () {
            return this.domManip(arguments, !0, function (i) {
              (this.nodeType === 1 || this.nodeType === 11) &&
                this.insertBefore(i, this.firstChild);
            });
          },
          before: function () {
            if (!ue(this[0]))
              return this.domManip(arguments, !1, function (o) {
                this.parentNode.insertBefore(o, this);
              });
            if (arguments.length) {
              var i = a.clean(arguments);
              return this.pushStack(a.merge(i, this), "before", this.selector);
            }
          },
          after: function () {
            if (!ue(this[0]))
              return this.domManip(arguments, !1, function (o) {
                this.parentNode.insertBefore(o, this.nextSibling);
              });
            if (arguments.length) {
              var i = a.clean(arguments);
              return this.pushStack(a.merge(this, i), "after", this.selector);
            }
          },
          remove: function (i, o) {
            for (var l, h = 0; (l = this[h]) != null; h++)
              (!i || a.filter(i, [l]).length) &&
                (!o &&
                  l.nodeType === 1 &&
                  (a.cleanData(l.getElementsByTagName("*")), a.cleanData([l])),
                l.parentNode && l.parentNode.removeChild(l));
            return this;
          },
          empty: function () {
            for (var i, o = 0; (i = this[o]) != null; o++)
              for (
                i.nodeType === 1 && a.cleanData(i.getElementsByTagName("*"));
                i.firstChild;

              )
                i.removeChild(i.firstChild);
            return this;
          },
          clone: function (i, o) {
            return (
              (i = i ?? !1),
              (o = o ?? i),
              this.map(function () {
                return a.clone(this, i, o);
              })
            );
          },
          html: function (i) {
            return a.access(
              this,
              function (o) {
                var l = this[0] || {},
                  h = 0,
                  f = this.length;
                if (o === n)
                  return l.nodeType === 1 ? l.innerHTML.replace(xo, "") : n;
                if (
                  typeof o == "string" &&
                  !ko.test(o) &&
                  (a.support.htmlSerialize || !An.test(o)) &&
                  (a.support.leadingWhitespace || !kn.test(o)) &&
                  !Wt[(Ir.exec(o) || ["", ""])[1].toLowerCase()]
                ) {
                  o = o.replace(Lr, "<$1></$2>");
                  try {
                    for (; h < f; h++)
                      (l = this[h] || {}),
                        l.nodeType === 1 &&
                          (a.cleanData(l.getElementsByTagName("*")),
                          (l.innerHTML = o));
                    l = 0;
                  } catch {}
                }
                l && this.empty().append(o);
              },
              null,
              i,
              arguments.length
            );
          },
          replaceWith: function (i) {
            return ue(this[0])
              ? this.length
                ? this.pushStack(a(a.isFunction(i) ? i() : i), "replaceWith", i)
                : this
              : a.isFunction(i)
                ? this.each(function (o) {
                    var l = a(this),
                      h = l.html();
                    l.replaceWith(i.call(this, o, h));
                  })
                : (typeof i != "string" && (i = a(i).detach()),
                  this.each(function () {
                    var o = this.nextSibling,
                      l = this.parentNode;
                    a(this).remove(), o ? a(o).before(i) : a(l).append(i);
                  }));
          },
          detach: function (i) {
            return this.remove(i, !0);
          },
          domManip: function (i, o, l) {
            i = [].concat.apply([], i);
            var h,
              f,
              p,
              m,
              y = 0,
              _ = i[0],
              A = [],
              x = this.length;
            if (
              !a.support.checkClone &&
              x > 1 &&
              typeof _ == "string" &&
              Or.test(_)
            )
              return this.each(function () {
                a(this).domManip(i, o, l);
              });
            if (a.isFunction(_))
              return this.each(function (P) {
                var M = a(this);
                (i[0] = _.call(this, P, o ? M.html() : n)), M.domManip(i, o, l);
              });
            if (this[0]) {
              if (
                ((h = a.buildFragment(i, this, A)),
                (p = h.fragment),
                (f = p.firstChild),
                p.childNodes.length === 1 && (p = f),
                f)
              )
                for (
                  o = o && a.nodeName(f, "tr"), m = h.cacheable || x - 1;
                  y < x;
                  y++
                )
                  l.call(
                    o && a.nodeName(this[y], "table")
                      ? Io(this[y], "tbody")
                      : this[y],
                    y === m ? p : a.clone(p, !0, !0)
                  );
              (p = f = null),
                A.length &&
                  a.each(A, function (P, M) {
                    M.src
                      ? a.ajax
                        ? a.ajax({
                            url: M.src,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            throws: !0,
                          })
                        : a.error("no ajax")
                      : a.globalEval(
                          (
                            M.text ||
                            M.textContent ||
                            M.innerHTML ||
                            ""
                          ).replace(Lo, "")
                        ),
                      M.parentNode && M.parentNode.removeChild(M);
                  });
            }
            return this;
          },
        });
      function Io(i, o) {
        return (
          i.getElementsByTagName(o)[0] ||
          i.appendChild(i.ownerDocument.createElement(o))
        );
      }
      function Hr(i, o) {
        if (!(o.nodeType !== 1 || !a.hasData(i))) {
          var l,
            h,
            f,
            p = a._data(i),
            m = a._data(o, p),
            y = p.events;
          if (y) {
            delete m.handle, (m.events = {});
            for (l in y)
              for (h = 0, f = y[l].length; h < f; h++)
                a.event.add(o, l, y[l][h]);
          }
          m.data && (m.data = a.extend({}, m.data));
        }
      }
      function Nr(i, o) {
        var l;
        o.nodeType === 1 &&
          (o.clearAttributes && o.clearAttributes(),
          o.mergeAttributes && o.mergeAttributes(i),
          (l = o.nodeName.toLowerCase()),
          l === "object"
            ? (o.parentNode && (o.outerHTML = i.outerHTML),
              a.support.html5Clone &&
                i.innerHTML &&
                !a.trim(o.innerHTML) &&
                (o.innerHTML = i.innerHTML))
            : l === "input" && Pr.test(i.type)
              ? ((o.defaultChecked = o.checked = i.checked),
                o.value !== i.value && (o.value = i.value))
              : l === "option"
                ? (o.selected = i.defaultSelected)
                : l === "input" || l === "textarea"
                  ? (o.defaultValue = i.defaultValue)
                  : l === "script" && o.text !== i.text && (o.text = i.text),
          o.removeAttribute(a.expando));
      }
      (a.buildFragment = function (i, o, l) {
        var h,
          f,
          p,
          m = i[0];
        return (
          (o = o || u),
          (o = (!o.nodeType && o[0]) || o),
          (o = o.ownerDocument || o),
          i.length === 1 &&
            typeof m == "string" &&
            m.length < 512 &&
            o === u &&
            m.charAt(0) === "<" &&
            !Ao.test(m) &&
            (a.support.checkClone || !Or.test(m)) &&
            (a.support.html5Clone || !An.test(m)) &&
            ((f = !0), (h = a.fragments[m]), (p = h !== n)),
          h ||
            ((h = o.createDocumentFragment()),
            a.clean(i, o, h, l),
            f && (a.fragments[m] = p && h)),
          { fragment: h, cacheable: f }
        );
      }),
        (a.fragments = {}),
        a.each(
          {
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith",
          },
          function (i, o) {
            a.fn[i] = function (l) {
              var h,
                f = 0,
                p = [],
                m = a(l),
                y = m.length,
                _ = this.length === 1 && this[0].parentNode;
              if (
                (_ == null ||
                  (_ && _.nodeType === 11 && _.childNodes.length === 1)) &&
                y === 1
              )
                return m[o](this[0]), this;
              for (; f < y; f++)
                (h = (f > 0 ? this.clone(!0) : this).get()),
                  a(m[f])[o](h),
                  (p = p.concat(h));
              return this.pushStack(p, i, m.selector);
            };
          }
        );
      function Li(i) {
        return typeof i.getElementsByTagName < "u"
          ? i.getElementsByTagName("*")
          : typeof i.querySelectorAll < "u"
            ? i.querySelectorAll("*")
            : [];
      }
      function Mr(i) {
        Pr.test(i.type) && (i.defaultChecked = i.checked);
      }
      a.extend({
        clone: function (i, o, l) {
          var h, f, p, m;
          if (
            (a.support.html5Clone ||
            a.isXMLDoc(i) ||
            !An.test("<" + i.nodeName + ">")
              ? (m = i.cloneNode(!0))
              : ((Sn.innerHTML = i.outerHTML),
                Sn.removeChild((m = Sn.firstChild))),
            (!a.support.noCloneEvent || !a.support.noCloneChecked) &&
              (i.nodeType === 1 || i.nodeType === 11) &&
              !a.isXMLDoc(i))
          )
            for (Nr(i, m), h = Li(i), f = Li(m), p = 0; h[p]; ++p)
              f[p] && Nr(h[p], f[p]);
          if (o && (Hr(i, m), l))
            for (h = Li(i), f = Li(m), p = 0; h[p]; ++p) Hr(h[p], f[p]);
          return (h = f = null), m;
        },
        clean: function (i, o, l, h) {
          var f,
            p,
            m,
            y,
            _,
            A,
            x,
            P,
            M,
            F,
            z,
            q = o === u && Dr,
            rt = [];
          for (
            (!o || typeof o.createDocumentFragment > "u") && (o = u), f = 0;
            (m = i[f]) != null;
            f++
          )
            if ((typeof m == "number" && (m += ""), !!m)) {
              if (typeof m == "string")
                if (!To.test(m)) m = o.createTextNode(m);
                else {
                  for (
                    q = q || Ar(o),
                      x = o.createElement("div"),
                      q.appendChild(x),
                      m = m.replace(Lr, "<$1></$2>"),
                      y = (Ir.exec(m) || ["", ""])[1].toLowerCase(),
                      _ = Wt[y] || Wt._default,
                      A = _[0],
                      x.innerHTML = _[1] + m + _[2];
                    A--;

                  )
                    x = x.lastChild;
                  if (!a.support.tbody)
                    for (
                      P = Co.test(m),
                        M =
                          y === "table" && !P
                            ? x.firstChild && x.firstChild.childNodes
                            : _[1] === "<table>" && !P
                              ? x.childNodes
                              : [],
                        p = M.length - 1;
                      p >= 0;
                      --p
                    )
                      a.nodeName(M[p], "tbody") &&
                        !M[p].childNodes.length &&
                        M[p].parentNode.removeChild(M[p]);
                  !a.support.leadingWhitespace &&
                    kn.test(m) &&
                    x.insertBefore(
                      o.createTextNode(kn.exec(m)[0]),
                      x.firstChild
                    ),
                    (m = x.childNodes),
                    x.parentNode.removeChild(x);
                }
              m.nodeType ? rt.push(m) : a.merge(rt, m);
            }
          if ((x && (m = x = q = null), !a.support.appendChecked))
            for (f = 0; (m = rt[f]) != null; f++)
              a.nodeName(m, "input")
                ? Mr(m)
                : typeof m.getElementsByTagName < "u" &&
                  a.grep(m.getElementsByTagName("input"), Mr);
          if (l)
            for (
              F = function (Et) {
                if (!Et.type || So.test(Et.type))
                  return h
                    ? h.push(Et.parentNode ? Et.parentNode.removeChild(Et) : Et)
                    : l.appendChild(Et);
              },
                f = 0;
              (m = rt[f]) != null;
              f++
            )
              (a.nodeName(m, "script") && F(m)) ||
                (l.appendChild(m),
                typeof m.getElementsByTagName < "u" &&
                  ((z = a.grep(
                    a.merge([], m.getElementsByTagName("script")),
                    F
                  )),
                  rt.splice.apply(rt, [f + 1, 0].concat(z)),
                  (f += z.length)));
          return rt;
        },
        cleanData: function (i, o) {
          for (
            var l,
              h,
              f,
              p,
              m = 0,
              y = a.expando,
              _ = a.cache,
              A = a.support.deleteExpando,
              x = a.event.special;
            (f = i[m]) != null;
            m++
          )
            if ((o || a.acceptData(f)) && ((h = f[y]), (l = h && _[h]), l)) {
              if (l.events)
                for (p in l.events)
                  x[p] ? a.event.remove(f, p) : a.removeEvent(f, p, l.handle);
              _[h] &&
                (delete _[h],
                A
                  ? delete f[y]
                  : f.removeAttribute
                    ? f.removeAttribute(y)
                    : (f[y] = null),
                a.deletedIds.push(h));
            }
        },
      }),
        (function () {
          var i, o;
          (a.uaMatch = function (l) {
            l = l.toLowerCase();
            var h =
              /(chrome)[ \/]([\w.]+)/.exec(l) ||
              /(webkit)[ \/]([\w.]+)/.exec(l) ||
              /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(l) ||
              /(msie) ([\w.]+)/.exec(l) ||
              (l.indexOf("compatible") < 0 &&
                /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(l)) ||
              [];
            return { browser: h[1] || "", version: h[2] || "0" };
          }),
            (i = a.uaMatch(g.userAgent)),
            (o = {}),
            i.browser && ((o[i.browser] = !0), (o.version = i.version)),
            o.chrome ? (o.webkit = !0) : o.webkit && (o.safari = !0),
            (a.browser = o),
            (a.sub = function () {
              function l(f, p) {
                return new l.fn.init(f, p);
              }
              a.extend(!0, l, this),
                (l.superclass = this),
                (l.fn = l.prototype = this()),
                (l.fn.constructor = l),
                (l.sub = this.sub),
                (l.fn.init = function (p, m) {
                  return (
                    m && m instanceof a && !(m instanceof l) && (m = l(m)),
                    a.fn.init.call(this, p, m, h)
                  );
                }),
                (l.fn.init.prototype = l.fn);
              var h = l(u);
              return l;
            });
        })();
      var St,
        We,
        Re,
        Ln = /alpha\([^)]*\)/i,
        Po = /opacity=([^)]*)/,
        Oo = /^(top|right|bottom|left)$/,
        Do = /^(none|table(?!-c[ea]).+)/,
        Wr = /^margin/,
        Ho = new RegExp("^(" + W + ")(.*)$", "i"),
        Ii = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"),
        No = new RegExp("^([-+])=(" + W + ")", "i"),
        In = {},
        Mo = { position: "absolute", visibility: "hidden", display: "block" },
        Rr = { letterSpacing: 0, fontWeight: 400 },
        Te = ["Top", "Right", "Bottom", "Left"],
        Br = ["Webkit", "O", "Moz", "ms"],
        Wo = a.fn.toggle;
      function jr(i, o) {
        if (o in i) return o;
        for (
          var l = o.charAt(0).toUpperCase() + o.slice(1), h = o, f = Br.length;
          f--;

        )
          if (((o = Br[f] + l), o in i)) return o;
        return h;
      }
      function Pi(i, o) {
        return (
          (i = o || i),
          a.css(i, "display") === "none" || !a.contains(i.ownerDocument, i)
        );
      }
      function zr(i, o) {
        for (var l, h, f = [], p = 0, m = i.length; p < m; p++)
          (l = i[p]),
            l.style &&
              ((f[p] = a._data(l, "olddisplay")),
              o
                ? (!f[p] &&
                    l.style.display === "none" &&
                    (l.style.display = ""),
                  l.style.display === "" &&
                    Pi(l) &&
                    (f[p] = a._data(l, "olddisplay", qr(l.nodeName))))
                : ((h = St(l, "display")),
                  !f[p] && h !== "none" && a._data(l, "olddisplay", h)));
        for (p = 0; p < m; p++)
          (l = i[p]),
            l.style &&
              (!o || l.style.display === "none" || l.style.display === "") &&
              (l.style.display = o ? f[p] || "" : "none");
        return i;
      }
      a.fn.extend({
        css: function (i, o) {
          return a.access(
            this,
            function (l, h, f) {
              return f !== n ? a.style(l, h, f) : a.css(l, h);
            },
            i,
            o,
            arguments.length > 1
          );
        },
        show: function () {
          return zr(this, !0);
        },
        hide: function () {
          return zr(this);
        },
        toggle: function (i, o) {
          var l = typeof i == "boolean";
          return a.isFunction(i) && a.isFunction(o)
            ? Wo.apply(this, arguments)
            : this.each(function () {
                (l ? i : Pi(this)) ? a(this).show() : a(this).hide();
              });
        },
      }),
        a.extend({
          cssHooks: {
            opacity: {
              get: function (i, o) {
                if (o) {
                  var l = St(i, "opacity");
                  return l === "" ? "1" : l;
                }
              },
            },
          },
          cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
          },
          cssProps: { float: a.support.cssFloat ? "cssFloat" : "styleFloat" },
          style: function (i, o, l, h) {
            if (!(!i || i.nodeType === 3 || i.nodeType === 8 || !i.style)) {
              var f,
                p,
                m,
                y = a.camelCase(o),
                _ = i.style;
              if (
                ((o = a.cssProps[y] || (a.cssProps[y] = jr(_, y))),
                (m = a.cssHooks[o] || a.cssHooks[y]),
                l !== n)
              ) {
                if (
                  ((p = typeof l),
                  p === "string" &&
                    (f = No.exec(l)) &&
                    ((l = (f[1] + 1) * f[2] + parseFloat(a.css(i, o))),
                    (p = "number")),
                  l == null || (p === "number" && isNaN(l)))
                )
                  return;
                if (
                  (p === "number" && !a.cssNumber[y] && (l += "px"),
                  !m || !("set" in m) || (l = m.set(i, l, h)) !== n)
                )
                  try {
                    _[o] = l;
                  } catch {}
              } else
                return m && "get" in m && (f = m.get(i, !1, h)) !== n
                  ? f
                  : _[o];
            }
          },
          css: function (i, o, l, h) {
            var f,
              p,
              m,
              y = a.camelCase(o);
            return (
              (o = a.cssProps[y] || (a.cssProps[y] = jr(i.style, y))),
              (m = a.cssHooks[o] || a.cssHooks[y]),
              m && "get" in m && (f = m.get(i, !0, h)),
              f === n && (f = St(i, o)),
              f === "normal" && o in Rr && (f = Rr[o]),
              l || h !== n
                ? ((p = parseFloat(f)), l || a.isNumeric(p) ? p || 0 : f)
                : f
            );
          },
          swap: function (i, o, l) {
            var h,
              f,
              p = {};
            for (f in o) (p[f] = i.style[f]), (i.style[f] = o[f]);
            h = l.call(i);
            for (f in o) i.style[f] = p[f];
            return h;
          },
        }),
        r.getComputedStyle
          ? (St = function (i, o) {
              var l,
                h,
                f,
                p,
                m = r.getComputedStyle(i, null),
                y = i.style;
              return (
                m &&
                  ((l = m[o]),
                  l === "" &&
                    !a.contains(i.ownerDocument, i) &&
                    (l = a.style(i, o)),
                  Ii.test(l) &&
                    Wr.test(o) &&
                    ((h = y.width),
                    (f = y.minWidth),
                    (p = y.maxWidth),
                    (y.minWidth = y.maxWidth = y.width = l),
                    (l = m.width),
                    (y.width = h),
                    (y.minWidth = f),
                    (y.maxWidth = p))),
                l
              );
            })
          : u.documentElement.currentStyle &&
            (St = function (i, o) {
              var l,
                h,
                f = i.currentStyle && i.currentStyle[o],
                p = i.style;
              return (
                f == null && p && p[o] && (f = p[o]),
                Ii.test(f) &&
                  !Oo.test(o) &&
                  ((l = p.left),
                  (h = i.runtimeStyle && i.runtimeStyle.left),
                  h && (i.runtimeStyle.left = i.currentStyle.left),
                  (p.left = o === "fontSize" ? "1em" : f),
                  (f = p.pixelLeft + "px"),
                  (p.left = l),
                  h && (i.runtimeStyle.left = h)),
                f === "" ? "auto" : f
              );
            });
      function Fr(i, o, l) {
        var h = Ho.exec(o);
        return h ? Math.max(0, h[1] - (l || 0)) + (h[2] || "px") : o;
      }
      function Xr(i, o, l, h) {
        for (
          var f = l === (h ? "border" : "content") ? 4 : o === "width" ? 1 : 0,
            p = 0;
          f < 4;
          f += 2
        )
          l === "margin" && (p += a.css(i, l + Te[f], !0)),
            h
              ? (l === "content" &&
                  (p -= parseFloat(St(i, "padding" + Te[f])) || 0),
                l !== "margin" &&
                  (p -= parseFloat(St(i, "border" + Te[f] + "Width")) || 0))
              : ((p += parseFloat(St(i, "padding" + Te[f])) || 0),
                l !== "padding" &&
                  (p += parseFloat(St(i, "border" + Te[f] + "Width")) || 0));
        return p;
      }
      function Yr(i, o, l) {
        var h = o === "width" ? i.offsetWidth : i.offsetHeight,
          f = !0,
          p = a.support.boxSizing && a.css(i, "boxSizing") === "border-box";
        if (h <= 0 || h == null) {
          if (
            ((h = St(i, o)),
            (h < 0 || h == null) && (h = i.style[o]),
            Ii.test(h))
          )
            return h;
          (f = p && (a.support.boxSizingReliable || h === i.style[o])),
            (h = parseFloat(h) || 0);
        }
        return h + Xr(i, o, l || (p ? "border" : "content"), f) + "px";
      }
      function qr(i) {
        if (In[i]) return In[i];
        var o = a("<" + i + ">").appendTo(u.body),
          l = o.css("display");
        return (
          o.remove(),
          (l === "none" || l === "") &&
            ((We = u.body.appendChild(
              We ||
                a.extend(u.createElement("iframe"), {
                  frameBorder: 0,
                  width: 0,
                  height: 0,
                })
            )),
            (!Re || !We.createElement) &&
              ((Re = (We.contentWindow || We.contentDocument).document),
              Re.write("<!doctype html><html><body>"),
              Re.close()),
            (o = Re.body.appendChild(Re.createElement(i))),
            (l = St(o, "display")),
            u.body.removeChild(We)),
          (In[i] = l),
          l
        );
      }
      a.each(["height", "width"], function (i, o) {
        a.cssHooks[o] = {
          get: function (l, h, f) {
            if (h)
              return l.offsetWidth === 0 && Do.test(St(l, "display"))
                ? a.swap(l, Mo, function () {
                    return Yr(l, o, f);
                  })
                : Yr(l, o, f);
          },
          set: function (l, h, f) {
            return Fr(
              l,
              h,
              f
                ? Xr(
                    l,
                    o,
                    f,
                    a.support.boxSizing &&
                      a.css(l, "boxSizing") === "border-box"
                  )
                : 0
            );
          },
        };
      }),
        a.support.opacity ||
          (a.cssHooks.opacity = {
            get: function (i, o) {
              return Po.test(
                (o && i.currentStyle
                  ? i.currentStyle.filter
                  : i.style.filter) || ""
              )
                ? 0.01 * parseFloat(RegExp.$1) + ""
                : o
                  ? "1"
                  : "";
            },
            set: function (i, o) {
              var l = i.style,
                h = i.currentStyle,
                f = a.isNumeric(o) ? "alpha(opacity=" + o * 100 + ")" : "",
                p = (h && h.filter) || l.filter || "";
              (l.zoom = 1),
                !(
                  o >= 1 &&
                  a.trim(p.replace(Ln, "")) === "" &&
                  l.removeAttribute &&
                  (l.removeAttribute("filter"), h && !h.filter)
                ) && (l.filter = Ln.test(p) ? p.replace(Ln, f) : p + " " + f);
            },
          }),
        a(function () {
          a.support.reliableMarginRight ||
            (a.cssHooks.marginRight = {
              get: function (i, o) {
                return a.swap(i, { display: "inline-block" }, function () {
                  if (o) return St(i, "marginRight");
                });
              },
            }),
            !a.support.pixelPosition &&
              a.fn.position &&
              a.each(["top", "left"], function (i, o) {
                a.cssHooks[o] = {
                  get: function (l, h) {
                    if (h) {
                      var f = St(l, o);
                      return Ii.test(f) ? a(l).position()[o] + "px" : f;
                    }
                  },
                };
              });
        }),
        a.expr &&
          a.expr.filters &&
          ((a.expr.filters.hidden = function (i) {
            return (
              (i.offsetWidth === 0 && i.offsetHeight === 0) ||
              (!a.support.reliableHiddenOffsets &&
                ((i.style && i.style.display) || St(i, "display")) === "none")
            );
          }),
          (a.expr.filters.visible = function (i) {
            return !a.expr.filters.hidden(i);
          })),
        a.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
          (a.cssHooks[i + o] = {
            expand: function (l) {
              var h,
                f = typeof l == "string" ? l.split(" ") : [l],
                p = {};
              for (h = 0; h < 4; h++)
                p[i + Te[h] + o] = f[h] || f[h - 2] || f[0];
              return p;
            },
          }),
            Wr.test(i) || (a.cssHooks[i + o].set = Fr);
        });
      var Ro = /%20/g,
        Bo = /\[\]$/,
        Vr = /\r?\n/g,
        jo =
          /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        zo = /^(?:select|textarea)/i;
      a.fn.extend({
        serialize: function () {
          return a.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            return this.elements ? a.makeArray(this.elements) : this;
          })
            .filter(function () {
              return (
                this.name &&
                !this.disabled &&
                (this.checked || zo.test(this.nodeName) || jo.test(this.type))
              );
            })
            .map(function (i, o) {
              var l = a(this).val();
              return l == null
                ? null
                : a.isArray(l)
                  ? a.map(l, function (h, f) {
                      return {
                        name: o.name,
                        value: h.replace(
                          Vr,
                          `\r
`
                        ),
                      };
                    })
                  : {
                      name: o.name,
                      value: l.replace(
                        Vr,
                        `\r
`
                      ),
                    };
            })
            .get();
        },
      }),
        (a.param = function (i, o) {
          var l,
            h = [],
            f = function (p, m) {
              (m = a.isFunction(m) ? m() : m ?? ""),
                (h[h.length] =
                  encodeURIComponent(p) + "=" + encodeURIComponent(m));
            };
          if (
            (o === n && (o = a.ajaxSettings && a.ajaxSettings.traditional),
            a.isArray(i) || (i.jquery && !a.isPlainObject(i)))
          )
            a.each(i, function () {
              f(this.name, this.value);
            });
          else for (l in i) Pn(l, i[l], o, f);
          return h.join("&").replace(Ro, "+");
        });
      function Pn(i, o, l, h) {
        var f;
        if (a.isArray(o))
          a.each(o, function (p, m) {
            l || Bo.test(i)
              ? h(i, m)
              : Pn(i + "[" + (typeof m == "object" ? p : "") + "]", m, l, h);
          });
        else if (!l && a.type(o) === "object")
          for (f in o) Pn(i + "[" + f + "]", o[f], l, h);
        else h(i, o);
      }
      var ke,
        Ae,
        Fo = /#.*$/,
        Xo = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Yo = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        qo = /^(?:GET|HEAD)$/,
        Vo = /^\/\//,
        Ur = /\?/,
        Uo = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Ko = /([?&])_=[^&]*/,
        Kr = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Qr = a.fn.load,
        On = {},
        Gr = {},
        Jr = ["*/"] + ["*"];
      try {
        ke = d.href;
      } catch {
        (ke = u.createElement("a")), (ke.href = ""), (ke = ke.href);
      }
      Ae = Kr.exec(ke.toLowerCase()) || [];
      function Zr(i) {
        return function (o, l) {
          typeof o != "string" && ((l = o), (o = "*"));
          var h,
            f,
            p,
            m = o.toLowerCase().split(O),
            y = 0,
            _ = m.length;
          if (a.isFunction(l))
            for (; y < _; y++)
              (h = m[y]),
                (p = /^\+/.test(h)),
                p && (h = h.substr(1) || "*"),
                (f = i[h] = i[h] || []),
                f[p ? "unshift" : "push"](l);
        };
      }
      function Oi(i, o, l, h, f, p) {
        (f = f || o.dataTypes[0]), (p = p || {}), (p[f] = !0);
        for (
          var m, y = i[f], _ = 0, A = y ? y.length : 0, x = i === On;
          _ < A && (x || !m);
          _++
        )
          (m = y[_](o, l, h)),
            typeof m == "string" &&
              (!x || p[m]
                ? (m = n)
                : (o.dataTypes.unshift(m), (m = Oi(i, o, l, h, m, p))));
        return (x || !m) && !p["*"] && (m = Oi(i, o, l, h, "*", p)), m;
      }
      function $r(i, o) {
        var l,
          h,
          f = a.ajaxSettings.flatOptions || {};
        for (l in o) o[l] !== n && ((f[l] ? i : h || (h = {}))[l] = o[l]);
        h && a.extend(!0, i, h);
      }
      (a.fn.load = function (i, o, l) {
        if (typeof i != "string" && Qr) return Qr.apply(this, arguments);
        if (!this.length) return this;
        var h,
          f,
          p,
          m = this,
          y = i.indexOf(" ");
        return (
          y >= 0 && ((h = i.slice(y, i.length)), (i = i.slice(0, y))),
          a.isFunction(o)
            ? ((l = o), (o = n))
            : o && typeof o == "object" && (f = "POST"),
          a
            .ajax({
              url: i,
              type: f,
              dataType: "html",
              data: o,
              complete: function (_, A) {
                l && m.each(l, p || [_.responseText, A, _]);
              },
            })
            .done(function (_) {
              (p = arguments),
                m.html(h ? a("<div>").append(_.replace(Uo, "")).find(h) : _);
            }),
          this
        );
      }),
        a.each(
          "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(
            " "
          ),
          function (i, o) {
            a.fn[o] = function (l) {
              return this.on(o, l);
            };
          }
        ),
        a.each(["get", "post"], function (i, o) {
          a[o] = function (l, h, f, p) {
            return (
              a.isFunction(h) && ((p = p || f), (f = h), (h = n)),
              a.ajax({ type: o, url: l, data: h, success: f, dataType: p })
            );
          };
        }),
        a.extend({
          getScript: function (i, o) {
            return a.get(i, n, o, "script");
          },
          getJSON: function (i, o, l) {
            return a.get(i, o, l, "json");
          },
          ajaxSetup: function (i, o) {
            return (
              o ? $r(i, a.ajaxSettings) : ((o = i), (i = a.ajaxSettings)),
              $r(i, o),
              i
            );
          },
          ajaxSettings: {
            url: ke,
            isLocal: Yo.test(Ae[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
              xml: "application/xml, text/xml",
              html: "text/html",
              text: "text/plain",
              json: "application/json, text/javascript",
              "*": Jr,
            },
            contents: { xml: /xml/, html: /html/, json: /json/ },
            responseFields: { xml: "responseXML", text: "responseText" },
            converters: {
              "* text": r.String,
              "text html": !0,
              "text json": a.parseJSON,
              "text xml": a.parseXML,
            },
            flatOptions: { context: !0, url: !0 },
          },
          ajaxPrefilter: Zr(On),
          ajaxTransport: Zr(Gr),
          ajax: function (i, o) {
            typeof i == "object" && ((o = i), (i = n)), (o = o || {});
            var l,
              h,
              f,
              p,
              m,
              y,
              _,
              A,
              x = a.ajaxSetup({}, o),
              P = x.context || x,
              M = P !== x && (P.nodeType || P instanceof a) ? a(P) : a.event,
              F = a.Deferred(),
              z = a.Callbacks("once memory"),
              q = x.statusCode || {},
              rt = {},
              Et = {},
              pt = 0,
              se = "canceled",
              st = {
                readyState: 0,
                setRequestHeader: function (ct, ot) {
                  if (!pt) {
                    var Rt = ct.toLowerCase();
                    (ct = Et[Rt] = Et[Rt] || ct), (rt[ct] = ot);
                  }
                  return this;
                },
                getAllResponseHeaders: function () {
                  return pt === 2 ? h : null;
                },
                getResponseHeader: function (ct) {
                  var ot;
                  if (pt === 2) {
                    if (!f)
                      for (f = {}; (ot = Xo.exec(h)); )
                        f[ot[1].toLowerCase()] = ot[2];
                    ot = f[ct.toLowerCase()];
                  }
                  return ot === n ? null : ot;
                },
                overrideMimeType: function (ct) {
                  return pt || (x.mimeType = ct), this;
                },
                abort: function (ct) {
                  return (ct = ct || se), p && p.abort(ct), he(0, ct), this;
                },
              };
            function he(ct, ot, Rt, Hn) {
              var Qt,
                je,
                fe,
                si,
                Gt,
                Jt = ot;
              pt !== 2 &&
                ((pt = 2),
                m && clearTimeout(m),
                (p = n),
                (h = Hn || ""),
                (st.readyState = ct > 0 ? 4 : 0),
                Rt && (si = Qo(x, st, Rt)),
                (ct >= 200 && ct < 300) || ct === 304
                  ? (x.ifModified &&
                      ((Gt = st.getResponseHeader("Last-Modified")),
                      Gt && (a.lastModified[l] = Gt),
                      (Gt = st.getResponseHeader("Etag")),
                      Gt && (a.etag[l] = Gt)),
                    ct === 304
                      ? ((Jt = "notmodified"), (Qt = !0))
                      : ((Qt = Go(x, si)),
                        (Jt = Qt.state),
                        (je = Qt.data),
                        (fe = Qt.error),
                        (Qt = !fe)))
                  : ((fe = Jt),
                    (!Jt || ct) && ((Jt = "error"), ct < 0 && (ct = 0))),
                (st.status = ct),
                (st.statusText = "" + (ot || Jt)),
                Qt
                  ? F.resolveWith(P, [je, Jt, st])
                  : F.rejectWith(P, [st, Jt, fe]),
                st.statusCode(q),
                (q = n),
                _ &&
                  M.trigger("ajax" + (Qt ? "Success" : "Error"), [
                    st,
                    x,
                    Qt ? je : fe,
                  ]),
                z.fireWith(P, [st, Jt]),
                _ &&
                  (M.trigger("ajaxComplete", [st, x]),
                  --a.active || a.event.trigger("ajaxStop")));
            }
            if (
              (F.promise(st),
              (st.success = st.done),
              (st.error = st.fail),
              (st.complete = z.add),
              (st.statusCode = function (ct) {
                if (ct) {
                  var ot;
                  if (pt < 2) for (ot in ct) q[ot] = [q[ot], ct[ot]];
                  else (ot = ct[st.status]), st.always(ot);
                }
                return this;
              }),
              (x.url = ((i || x.url) + "")
                .replace(Fo, "")
                .replace(Vo, Ae[1] + "//")),
              (x.dataTypes = a
                .trim(x.dataType || "*")
                .toLowerCase()
                .split(O)),
              x.crossDomain == null &&
                ((y = Kr.exec(x.url.toLowerCase())),
                (x.crossDomain = !!(
                  y &&
                  (y[1] != Ae[1] ||
                    y[2] != Ae[2] ||
                    (y[3] || (y[1] === "http:" ? 80 : 443)) !=
                      (Ae[3] || (Ae[1] === "http:" ? 80 : 443)))
                ))),
              x.data &&
                x.processData &&
                typeof x.data != "string" &&
                (x.data = a.param(x.data, x.traditional)),
              Oi(On, x, o, st),
              pt === 2)
            )
              return st;
            if (
              ((_ = x.global),
              (x.type = x.type.toUpperCase()),
              (x.hasContent = !qo.test(x.type)),
              _ && a.active++ === 0 && a.event.trigger("ajaxStart"),
              !x.hasContent &&
                (x.data &&
                  ((x.url += (Ur.test(x.url) ? "&" : "?") + x.data),
                  delete x.data),
                (l = x.url),
                x.cache === !1))
            ) {
              var ni = a.now(),
                ri = x.url.replace(Ko, "$1_=" + ni);
              x.url =
                ri +
                (ri === x.url ? (Ur.test(x.url) ? "&" : "?") + "_=" + ni : "");
            }
            ((x.data && x.hasContent && x.contentType !== !1) ||
              o.contentType) &&
              st.setRequestHeader("Content-Type", x.contentType),
              x.ifModified &&
                ((l = l || x.url),
                a.lastModified[l] &&
                  st.setRequestHeader("If-Modified-Since", a.lastModified[l]),
                a.etag[l] && st.setRequestHeader("If-None-Match", a.etag[l])),
              st.setRequestHeader(
                "Accept",
                x.dataTypes[0] && x.accepts[x.dataTypes[0]]
                  ? x.accepts[x.dataTypes[0]] +
                      (x.dataTypes[0] !== "*" ? ", " + Jr + "; q=0.01" : "")
                  : x.accepts["*"]
              );
            for (A in x.headers) st.setRequestHeader(A, x.headers[A]);
            if (
              x.beforeSend &&
              (x.beforeSend.call(P, st, x) === !1 || pt === 2)
            )
              return st.abort();
            se = "abort";
            for (A in { success: 1, error: 1, complete: 1 }) st[A](x[A]);
            if (((p = Oi(Gr, x, o, st)), !p)) he(-1, "No Transport");
            else {
              (st.readyState = 1),
                _ && M.trigger("ajaxSend", [st, x]),
                x.async &&
                  x.timeout > 0 &&
                  (m = setTimeout(function () {
                    st.abort("timeout");
                  }, x.timeout));
              try {
                (pt = 1), p.send(rt, he);
              } catch (ct) {
                if (pt < 2) he(-1, ct);
                else throw ct;
              }
            }
            return st;
          },
          active: 0,
          lastModified: {},
          etag: {},
        });
      function Qo(i, o, l) {
        var h,
          f,
          p,
          m,
          y = i.contents,
          _ = i.dataTypes,
          A = i.responseFields;
        for (f in A) f in l && (o[A[f]] = l[f]);
        for (; _[0] === "*"; )
          _.shift(),
            h === n && (h = i.mimeType || o.getResponseHeader("content-type"));
        if (h) {
          for (f in y)
            if (y[f] && y[f].test(h)) {
              _.unshift(f);
              break;
            }
        }
        if (_[0] in l) p = _[0];
        else {
          for (f in l) {
            if (!_[0] || i.converters[f + " " + _[0]]) {
              p = f;
              break;
            }
            m || (m = f);
          }
          p = p || m;
        }
        if (p) return p !== _[0] && _.unshift(p), l[p];
      }
      function Go(i, o) {
        var l,
          h,
          f,
          p,
          m = i.dataTypes.slice(),
          y = m[0],
          _ = {},
          A = 0;
        if ((i.dataFilter && (o = i.dataFilter(o, i.dataType)), m[1]))
          for (l in i.converters) _[l.toLowerCase()] = i.converters[l];
        for (; (f = m[++A]); )
          if (f !== "*") {
            if (y !== "*" && y !== f) {
              if (((l = _[y + " " + f] || _["* " + f]), !l)) {
                for (h in _)
                  if (
                    ((p = h.split(" ")),
                    p[1] === f &&
                      ((l = _[y + " " + p[0]] || _["* " + p[0]]), l))
                  ) {
                    l === !0
                      ? (l = _[h])
                      : _[h] !== !0 && ((f = p[0]), m.splice(A--, 0, f));
                    break;
                  }
              }
              if (l !== !0)
                if (l && i.throws) o = l(o);
                else
                  try {
                    o = l(o);
                  } catch (x) {
                    return {
                      state: "parsererror",
                      error: l ? x : "No conversion from " + y + " to " + f,
                    };
                  }
            }
            y = f;
          }
        return { state: "success", data: o };
      }
      var ts = [],
        Jo = /\?/,
        Di = /(=)\?(?=&|$)|\?\?/,
        Zo = a.now();
      a.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
          var i = ts.pop() || a.expando + "_" + Zo++;
          return (this[i] = !0), i;
        },
      }),
        a.ajaxPrefilter("json jsonp", function (i, o, l) {
          var h,
            f,
            p,
            m = i.data,
            y = i.url,
            _ = i.jsonp !== !1,
            A = _ && Di.test(y),
            x =
              _ &&
              !A &&
              typeof m == "string" &&
              !(i.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
              Di.test(m);
          if (i.dataTypes[0] === "jsonp" || A || x)
            return (
              (h = i.jsonpCallback =
                a.isFunction(i.jsonpCallback)
                  ? i.jsonpCallback()
                  : i.jsonpCallback),
              (f = r[h]),
              A
                ? (i.url = y.replace(Di, "$1" + h))
                : x
                  ? (i.data = m.replace(Di, "$1" + h))
                  : _ &&
                    (i.url += (Jo.test(y) ? "&" : "?") + i.jsonp + "=" + h),
              (i.converters["script json"] = function () {
                return p || a.error(h + " was not called"), p[0];
              }),
              (i.dataTypes[0] = "json"),
              (r[h] = function () {
                p = arguments;
              }),
              l.always(function () {
                (r[h] = f),
                  i[h] && ((i.jsonpCallback = o.jsonpCallback), ts.push(h)),
                  p && a.isFunction(f) && f(p[0]),
                  (p = f = n);
              }),
              "script"
            );
        }),
        a.ajaxSetup({
          accepts: {
            script:
              "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          },
          contents: { script: /javascript|ecmascript/ },
          converters: {
            "text script": function (i) {
              return a.globalEval(i), i;
            },
          },
        }),
        a.ajaxPrefilter("script", function (i) {
          i.cache === n && (i.cache = !1),
            i.crossDomain && ((i.type = "GET"), (i.global = !1));
        }),
        a.ajaxTransport("script", function (i) {
          if (i.crossDomain) {
            var o,
              l =
                u.head ||
                u.getElementsByTagName("head")[0] ||
                u.documentElement;
            return {
              send: function (h, f) {
                (o = u.createElement("script")),
                  (o.async = "async"),
                  i.scriptCharset && (o.charset = i.scriptCharset),
                  (o.src = i.url),
                  (o.onload = o.onreadystatechange =
                    function (p, m) {
                      (m ||
                        !o.readyState ||
                        /loaded|complete/.test(o.readyState)) &&
                        ((o.onload = o.onreadystatechange = null),
                        l && o.parentNode && l.removeChild(o),
                        (o = n),
                        m || f(200, "success"));
                    }),
                  l.insertBefore(o, l.firstChild);
              },
              abort: function () {
                o && o.onload(0, 1);
              },
            };
          }
        });
      var Be,
        Dn = r.ActiveXObject
          ? function () {
              for (var i in Be) Be[i](0, 1);
            }
          : !1,
        $o = 0;
      function es() {
        try {
          return new r.XMLHttpRequest();
        } catch {}
      }
      function ta() {
        try {
          return new r.ActiveXObject("Microsoft.XMLHTTP");
        } catch {}
      }
      (a.ajaxSettings.xhr = r.ActiveXObject
        ? function () {
            return (!this.isLocal && es()) || ta();
          }
        : es),
        (function (i) {
          a.extend(a.support, {
            ajax: !!i,
            cors: !!i && "withCredentials" in i,
          });
        })(a.ajaxSettings.xhr()),
        a.support.ajax &&
          a.ajaxTransport(function (i) {
            if (!i.crossDomain || a.support.cors) {
              var o;
              return {
                send: function (l, h) {
                  var f,
                    p,
                    m = i.xhr();
                  if (
                    (i.username
                      ? m.open(i.type, i.url, i.async, i.username, i.password)
                      : m.open(i.type, i.url, i.async),
                    i.xhrFields)
                  )
                    for (p in i.xhrFields) m[p] = i.xhrFields[p];
                  i.mimeType &&
                    m.overrideMimeType &&
                    m.overrideMimeType(i.mimeType),
                    !i.crossDomain &&
                      !l["X-Requested-With"] &&
                      (l["X-Requested-With"] = "XMLHttpRequest");
                  try {
                    for (p in l) m.setRequestHeader(p, l[p]);
                  } catch {}
                  m.send((i.hasContent && i.data) || null),
                    (o = function (y, _) {
                      var A, x, P, M, F;
                      try {
                        if (o && (_ || m.readyState === 4))
                          if (
                            ((o = n),
                            f &&
                              ((m.onreadystatechange = a.noop),
                              Dn && delete Be[f]),
                            _)
                          )
                            m.readyState !== 4 && m.abort();
                          else {
                            (A = m.status),
                              (P = m.getAllResponseHeaders()),
                              (M = {}),
                              (F = m.responseXML),
                              F && F.documentElement && (M.xml = F);
                            try {
                              M.text = m.responseText;
                            } catch {}
                            try {
                              x = m.statusText;
                            } catch {
                              x = "";
                            }
                            !A && i.isLocal && !i.crossDomain
                              ? (A = M.text ? 200 : 404)
                              : A === 1223 && (A = 204);
                          }
                      } catch (z) {
                        _ || h(-1, z);
                      }
                      M && h(A, x, M, P);
                    }),
                    i.async
                      ? m.readyState === 4
                        ? setTimeout(o, 0)
                        : ((f = ++$o),
                          Dn &&
                            (Be || ((Be = {}), a(r).unload(Dn)), (Be[f] = o)),
                          (m.onreadystatechange = o))
                      : o();
                },
                abort: function () {
                  o && o(0, 1);
                },
              };
            }
          });
      var Hi,
        Ni,
        ea = /^(?:toggle|show|hide)$/,
        ia = new RegExp("^(?:([-+])=|)(" + W + ")([a-z%]*)$", "i"),
        na = /queueHooks$/,
        Mi = [oa],
        ii = {
          "*": [
            function (i, o) {
              var l,
                h,
                f,
                p = this.createTween(i, o),
                m = ia.exec(o),
                y = p.cur(),
                _ = +y || 0,
                A = 1;
              if (m) {
                if (
                  ((l = +m[2]),
                  (h = m[3] || (a.cssNumber[i] ? "" : "px")),
                  h !== "px" && _)
                ) {
                  _ = a.css(p.elem, i, !0) || l || 1;
                  do
                    (f = A = A || ".5"),
                      (_ = _ / A),
                      a.style(p.elem, i, _ + h),
                      (A = p.cur() / y);
                  while (A !== 1 && A !== f);
                }
                (p.unit = h),
                  (p.start = _),
                  (p.end = m[1] ? _ + (m[1] + 1) * l : l);
              }
              return p;
            },
          ],
        };
      function is() {
        return (
          setTimeout(function () {
            Hi = n;
          }, 0),
          (Hi = a.now())
        );
      }
      function ra(i, o) {
        a.each(o, function (l, h) {
          for (
            var f = (ii[l] || []).concat(ii["*"]), p = 0, m = f.length;
            p < m;
            p++
          )
            if (f[p].call(i, l, h)) return;
        });
      }
      function ns(i, o, l) {
        var h,
          f = 0,
          p = Mi.length,
          m = a.Deferred().always(function () {
            delete y.elem;
          }),
          y = function () {
            for (
              var x = Hi || is(),
                P = Math.max(0, _.startTime + _.duration - x),
                M = 1 - (P / _.duration || 0),
                F = 0,
                z = _.tweens.length;
              F < z;
              F++
            )
              _.tweens[F].run(M);
            return (
              m.notifyWith(i, [_, M, P]),
              M < 1 && z ? P : (m.resolveWith(i, [_]), !1)
            );
          },
          _ = m.promise({
            elem: i,
            props: a.extend({}, o),
            opts: a.extend(!0, { specialEasing: {} }, l),
            originalProperties: o,
            originalOptions: l,
            startTime: Hi || is(),
            duration: l.duration,
            tweens: [],
            createTween: function (x, P, M) {
              var F = a.Tween(
                i,
                _.opts,
                x,
                P,
                _.opts.specialEasing[x] || _.opts.easing
              );
              return _.tweens.push(F), F;
            },
            stop: function (x) {
              for (var P = 0, M = x ? _.tweens.length : 0; P < M; P++)
                _.tweens[P].run(1);
              return (
                x ? m.resolveWith(i, [_, x]) : m.rejectWith(i, [_, x]), this
              );
            },
          }),
          A = _.props;
        for (sa(A, _.opts.specialEasing); f < p; f++)
          if (((h = Mi[f].call(_, i, A, _.opts)), h)) return h;
        return (
          ra(_, A),
          a.isFunction(_.opts.start) && _.opts.start.call(i, _),
          a.fx.timer(a.extend(y, { anim: _, queue: _.opts.queue, elem: i })),
          _.progress(_.opts.progress)
            .done(_.opts.done, _.opts.complete)
            .fail(_.opts.fail)
            .always(_.opts.always)
        );
      }
      function sa(i, o) {
        var l, h, f, p, m;
        for (l in i)
          if (
            ((h = a.camelCase(l)),
            (f = o[h]),
            (p = i[l]),
            a.isArray(p) && ((f = p[1]), (p = i[l] = p[0])),
            l !== h && ((i[h] = p), delete i[l]),
            (m = a.cssHooks[h]),
            m && "expand" in m)
          ) {
            (p = m.expand(p)), delete i[h];
            for (l in p) l in i || ((i[l] = p[l]), (o[l] = f));
          } else o[h] = f;
      }
      a.Animation = a.extend(ns, {
        tweener: function (i, o) {
          a.isFunction(i) ? ((o = i), (i = ["*"])) : (i = i.split(" "));
          for (var l, h = 0, f = i.length; h < f; h++)
            (l = i[h]), (ii[l] = ii[l] || []), ii[l].unshift(o);
        },
        prefilter: function (i, o) {
          o ? Mi.unshift(i) : Mi.push(i);
        },
      });
      function oa(i, o, l) {
        var h,
          f,
          p,
          m,
          y,
          _,
          A,
          x,
          P = this,
          M = i.style,
          F = {},
          z = [],
          q = i.nodeType && Pi(i);
        l.queue ||
          ((A = a._queueHooks(i, "fx")),
          A.unqueued == null &&
            ((A.unqueued = 0),
            (x = A.empty.fire),
            (A.empty.fire = function () {
              A.unqueued || x();
            })),
          A.unqueued++,
          P.always(function () {
            P.always(function () {
              A.unqueued--, a.queue(i, "fx").length || A.empty.fire();
            });
          })),
          i.nodeType === 1 &&
            ("height" in o || "width" in o) &&
            ((l.overflow = [M.overflow, M.overflowX, M.overflowY]),
            a.css(i, "display") === "inline" &&
              a.css(i, "float") === "none" &&
              (!a.support.inlineBlockNeedsLayout || qr(i.nodeName) === "inline"
                ? (M.display = "inline-block")
                : (M.zoom = 1))),
          l.overflow &&
            ((M.overflow = "hidden"),
            a.support.shrinkWrapBlocks ||
              P.done(function () {
                (M.overflow = l.overflow[0]),
                  (M.overflowX = l.overflow[1]),
                  (M.overflowY = l.overflow[2]);
              }));
        for (h in o)
          if (((p = o[h]), ea.exec(p))) {
            if ((delete o[h], p === (q ? "hide" : "show"))) continue;
            z.push(h);
          }
        if (((m = z.length), m))
          for (
            y = a._data(i, "fxshow") || a._data(i, "fxshow", {}),
              q
                ? a(i).show()
                : P.done(function () {
                    a(i).hide();
                  }),
              P.done(function () {
                var rt;
                a.removeData(i, "fxshow", !0);
                for (rt in F) a.style(i, rt, F[rt]);
              }),
              h = 0;
            h < m;
            h++
          )
            (f = z[h]),
              (_ = P.createTween(f, q ? y[f] : 0)),
              (F[f] = y[f] || a.style(i, f)),
              f in y ||
                ((y[f] = _.start),
                q &&
                  ((_.end = _.start),
                  (_.start = f === "width" || f === "height" ? 1 : 0)));
      }
      function Ot(i, o, l, h, f) {
        return new Ot.prototype.init(i, o, l, h, f);
      }
      (a.Tween = Ot),
        (Ot.prototype = {
          constructor: Ot,
          init: function (i, o, l, h, f, p) {
            (this.elem = i),
              (this.prop = l),
              (this.easing = f || "swing"),
              (this.options = o),
              (this.start = this.now = this.cur()),
              (this.end = h),
              (this.unit = p || (a.cssNumber[l] ? "" : "px"));
          },
          cur: function () {
            var i = Ot.propHooks[this.prop];
            return i && i.get ? i.get(this) : Ot.propHooks._default.get(this);
          },
          run: function (i) {
            var o,
              l = Ot.propHooks[this.prop];
            return (
              this.options.duration
                ? (this.pos = o =
                    a.easing[this.easing](
                      i,
                      this.options.duration * i,
                      0,
                      1,
                      this.options.duration
                    ))
                : (this.pos = o = i),
              (this.now = (this.end - this.start) * o + this.start),
              this.options.step &&
                this.options.step.call(this.elem, this.now, this),
              l && l.set ? l.set(this) : Ot.propHooks._default.set(this),
              this
            );
          },
        }),
        (Ot.prototype.init.prototype = Ot.prototype),
        (Ot.propHooks = {
          _default: {
            get: function (i) {
              var o;
              return i.elem[i.prop] != null &&
                (!i.elem.style || i.elem.style[i.prop] == null)
                ? i.elem[i.prop]
                : ((o = a.css(i.elem, i.prop, !1, "")),
                  !o || o === "auto" ? 0 : o);
            },
            set: function (i) {
              a.fx.step[i.prop]
                ? a.fx.step[i.prop](i)
                : i.elem.style &&
                    (i.elem.style[a.cssProps[i.prop]] != null ||
                      a.cssHooks[i.prop])
                  ? a.style(i.elem, i.prop, i.now + i.unit)
                  : (i.elem[i.prop] = i.now);
            },
          },
        }),
        (Ot.propHooks.scrollTop = Ot.propHooks.scrollLeft =
          {
            set: function (i) {
              i.elem.nodeType && i.elem.parentNode && (i.elem[i.prop] = i.now);
            },
          }),
        a.each(["toggle", "show", "hide"], function (i, o) {
          var l = a.fn[o];
          a.fn[o] = function (h, f, p) {
            return h == null ||
              typeof h == "boolean" ||
              (!i && a.isFunction(h) && a.isFunction(f))
              ? l.apply(this, arguments)
              : this.animate(Wi(o, !0), h, f, p);
          };
        }),
        a.fn.extend({
          fadeTo: function (i, o, l, h) {
            return this.filter(Pi)
              .css("opacity", 0)
              .show()
              .end()
              .animate({ opacity: o }, i, l, h);
          },
          animate: function (i, o, l, h) {
            var f = a.isEmptyObject(i),
              p = a.speed(o, l, h),
              m = function () {
                var y = ns(this, a.extend({}, i), p);
                f && y.stop(!0);
              };
            return f || p.queue === !1 ? this.each(m) : this.queue(p.queue, m);
          },
          stop: function (i, o, l) {
            var h = function (f) {
              var p = f.stop;
              delete f.stop, p(l);
            };
            return (
              typeof i != "string" && ((l = o), (o = i), (i = n)),
              o && i !== !1 && this.queue(i || "fx", []),
              this.each(function () {
                var f = !0,
                  p = i != null && i + "queueHooks",
                  m = a.timers,
                  y = a._data(this);
                if (p) y[p] && y[p].stop && h(y[p]);
                else for (p in y) y[p] && y[p].stop && na.test(p) && h(y[p]);
                for (p = m.length; p--; )
                  m[p].elem === this &&
                    (i == null || m[p].queue === i) &&
                    (m[p].anim.stop(l), (f = !1), m.splice(p, 1));
                (f || !l) && a.dequeue(this, i);
              })
            );
          },
        });
      function Wi(i, o) {
        var l,
          h = { height: i },
          f = 0;
        for (o = o ? 1 : 0; f < 4; f += 2 - o)
          (l = Te[f]), (h["margin" + l] = h["padding" + l] = i);
        return o && (h.opacity = h.width = i), h;
      }
      a.each(
        {
          slideDown: Wi("show"),
          slideUp: Wi("hide"),
          slideToggle: Wi("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (i, o) {
          a.fn[i] = function (l, h, f) {
            return this.animate(o, l, h, f);
          };
        }
      ),
        (a.speed = function (i, o, l) {
          var h =
            i && typeof i == "object"
              ? a.extend({}, i)
              : {
                  complete: l || (!l && o) || (a.isFunction(i) && i),
                  duration: i,
                  easing: (l && o) || (o && !a.isFunction(o) && o),
                };
          return (
            (h.duration = a.fx.off
              ? 0
              : typeof h.duration == "number"
                ? h.duration
                : h.duration in a.fx.speeds
                  ? a.fx.speeds[h.duration]
                  : a.fx.speeds._default),
            (h.queue == null || h.queue === !0) && (h.queue = "fx"),
            (h.old = h.complete),
            (h.complete = function () {
              a.isFunction(h.old) && h.old.call(this),
                h.queue && a.dequeue(this, h.queue);
            }),
            h
          );
        }),
        (a.easing = {
          linear: function (i) {
            return i;
          },
          swing: function (i) {
            return 0.5 - Math.cos(i * Math.PI) / 2;
          },
        }),
        (a.timers = []),
        (a.fx = Ot.prototype.init),
        (a.fx.tick = function () {
          for (var i, o = a.timers, l = 0; l < o.length; l++)
            (i = o[l]), !i() && o[l] === i && o.splice(l--, 1);
          o.length || a.fx.stop();
        }),
        (a.fx.timer = function (i) {
          i() &&
            a.timers.push(i) &&
            !Ni &&
            (Ni = setInterval(a.fx.tick, a.fx.interval));
        }),
        (a.fx.interval = 13),
        (a.fx.stop = function () {
          clearInterval(Ni), (Ni = null);
        }),
        (a.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (a.fx.step = {}),
        a.expr &&
          a.expr.filters &&
          (a.expr.filters.animated = function (i) {
            return a.grep(a.timers, function (o) {
              return i === o.elem;
            }).length;
          });
      var rs = /^(?:body|html)$/i;
      (a.fn.offset = function (i) {
        if (arguments.length)
          return i === n
            ? this
            : this.each(function (F) {
                a.offset.setOffset(this, i, F);
              });
        var o,
          l,
          h,
          f,
          p,
          m,
          y,
          _,
          A,
          x,
          P = this[0],
          M = P && P.ownerDocument;
        if (M)
          return (h = M.body) === P
            ? a.offset.bodyOffset(P)
            : ((l = M.documentElement),
              a.contains(l, P)
                ? ((o = P.getBoundingClientRect()),
                  (f = ss(M)),
                  (p = l.clientTop || h.clientTop || 0),
                  (m = l.clientLeft || h.clientLeft || 0),
                  (y = f.pageYOffset || l.scrollTop),
                  (_ = f.pageXOffset || l.scrollLeft),
                  (A = o.top + y - p),
                  (x = o.left + _ - m),
                  { top: A, left: x })
                : { top: 0, left: 0 });
      }),
        (a.offset = {
          bodyOffset: function (i) {
            var o = i.offsetTop,
              l = i.offsetLeft;
            return (
              a.support.doesNotIncludeMarginInBodyOffset &&
                ((o += parseFloat(a.css(i, "marginTop")) || 0),
                (l += parseFloat(a.css(i, "marginLeft")) || 0)),
              { top: o, left: l }
            );
          },
          setOffset: function (i, o, l) {
            var h = a.css(i, "position");
            h === "static" && (i.style.position = "relative");
            var f = a(i),
              p = f.offset(),
              m = a.css(i, "top"),
              y = a.css(i, "left"),
              _ =
                (h === "absolute" || h === "fixed") &&
                a.inArray("auto", [m, y]) > -1,
              A = {},
              x = {},
              P,
              M;
            _
              ? ((x = f.position()), (P = x.top), (M = x.left))
              : ((P = parseFloat(m) || 0), (M = parseFloat(y) || 0)),
              a.isFunction(o) && (o = o.call(i, l, p)),
              o.top != null && (A.top = o.top - p.top + P),
              o.left != null && (A.left = o.left - p.left + M),
              "using" in o ? o.using.call(i, A) : f.css(A);
          },
        }),
        a.fn.extend({
          position: function () {
            if (this[0]) {
              var i = this[0],
                o = this.offsetParent(),
                l = this.offset(),
                h = rs.test(o[0].nodeName) ? { top: 0, left: 0 } : o.offset();
              return (
                (l.top -= parseFloat(a.css(i, "marginTop")) || 0),
                (l.left -= parseFloat(a.css(i, "marginLeft")) || 0),
                (h.top += parseFloat(a.css(o[0], "borderTopWidth")) || 0),
                (h.left += parseFloat(a.css(o[0], "borderLeftWidth")) || 0),
                { top: l.top - h.top, left: l.left - h.left }
              );
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (
                var i = this.offsetParent || u.body;
                i && !rs.test(i.nodeName) && a.css(i, "position") === "static";

              )
                i = i.offsetParent;
              return i || u.body;
            });
          },
        }),
        a.each(
          { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
          function (i, o) {
            var l = /Y/.test(o);
            a.fn[i] = function (h) {
              return a.access(
                this,
                function (f, p, m) {
                  var y = ss(f);
                  if (m === n)
                    return y
                      ? o in y
                        ? y[o]
                        : y.document.documentElement[p]
                      : f[p];
                  y
                    ? y.scrollTo(
                        l ? a(y).scrollLeft() : m,
                        l ? m : a(y).scrollTop()
                      )
                    : (f[p] = m);
                },
                i,
                h,
                arguments.length,
                null
              );
            };
          }
        );
      function ss(i) {
        return a.isWindow(i)
          ? i
          : i.nodeType === 9
            ? i.defaultView || i.parentWindow
            : !1;
      }
      return (
        a.each({ Height: "height", Width: "width" }, function (i, o) {
          a.each(
            { padding: "inner" + i, content: o, "": "outer" + i },
            function (l, h) {
              a.fn[h] = function (f, p) {
                var m = arguments.length && (l || typeof f != "boolean"),
                  y = l || (f === !0 || p === !0 ? "margin" : "border");
                return a.access(
                  this,
                  function (_, A, x) {
                    var P;
                    return a.isWindow(_)
                      ? _.document.documentElement["client" + i]
                      : _.nodeType === 9
                        ? ((P = _.documentElement),
                          Math.max(
                            _.body["scroll" + i],
                            P["scroll" + i],
                            _.body["offset" + i],
                            P["offset" + i],
                            P["client" + i]
                          ))
                        : x === n
                          ? a.css(_, A, x, y)
                          : a.style(_, A, x, y);
                  },
                  o,
                  m ? f : n,
                  m,
                  null
                );
              };
            }
          );
        }),
        (r.jQuery = r.$ = a),
        typeof n == "function" &&
          n.amd &&
          n.amd.jQuery &&
          n("jquery", [], function () {
            return a;
          }),
        a
      );
    })(window);
  });
})(eo);
var Ql = eo.exports,
  Ce = Ql;
/*! jQuery UI - v1.10.1 - 2013-02-21
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.sortable.js
 * Copyright (c) 2013 jQuery Foundation and other contributors Licensed MIT */ (function (
  t,
  e
) {
  var r = 0,
    n = /^ui-id-\d+$/;
  if (((t.ui = t.ui || {}), t.ui.version)) return;
  t.extend(t.ui, {
    version: "1.10.1",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    },
  }),
    t.fn.extend({
      _focus: t.fn.focus,
      focus: function (u, d) {
        return typeof u == "number"
          ? this.each(function () {
              var g = this;
              setTimeout(function () {
                t(g).focus(), d && d.call(g);
              }, u);
            })
          : this._focus.apply(this, arguments);
      },
      scrollParent: function () {
        var u;
        return (
          (t.ui.ie && /(static|relative)/.test(this.css("position"))) ||
          /absolute/.test(this.css("position"))
            ? (u = this.parents()
                .filter(function () {
                  return (
                    /(relative|absolute|fixed)/.test(t.css(this, "position")) &&
                    /(auto|scroll)/.test(
                      t.css(this, "overflow") +
                        t.css(this, "overflow-y") +
                        t.css(this, "overflow-x")
                    )
                  );
                })
                .eq(0))
            : (u = this.parents()
                .filter(function () {
                  return /(auto|scroll)/.test(
                    t.css(this, "overflow") +
                      t.css(this, "overflow-y") +
                      t.css(this, "overflow-x")
                  );
                })
                .eq(0)),
          /fixed/.test(this.css("position")) || !u.length ? t(document) : u
        );
      },
      zIndex: function (u) {
        if (u !== e) return this.css("zIndex", u);
        if (this.length)
          for (var d = t(this[0]), g, b; d.length && d[0] !== document; ) {
            if (
              ((g = d.css("position")),
              (g === "absolute" || g === "relative" || g === "fixed") &&
                ((b = parseInt(d.css("zIndex"), 10)), !isNaN(b) && b !== 0))
            )
              return b;
            d = d.parent();
          }
        return 0;
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++r);
        });
      },
      removeUniqueId: function () {
        return this.each(function () {
          n.test(this.id) && t(this).removeAttr("id");
        });
      },
    });
  function s(u, d) {
    var g,
      b,
      w,
      S = u.nodeName.toLowerCase();
    return S === "area"
      ? ((g = u.parentNode),
        (b = g.name),
        !u.href || !b || g.nodeName.toLowerCase() !== "map"
          ? !1
          : ((w = t("img[usemap=#" + b + "]")[0]), !!w && c(w)))
      : (/input|select|textarea|button|object/.test(S)
          ? !u.disabled
          : (S === "a" && u.href) || d) && c(u);
  }
  function c(u) {
    return (
      t.expr.filters.visible(u) &&
      !t(u)
        .parents()
        .addBack()
        .filter(function () {
          return t.css(this, "visibility") === "hidden";
        }).length
    );
  }
  t.extend(t.expr[":"], {
    data: t.expr.createPseudo
      ? t.expr.createPseudo(function (u) {
          return function (d) {
            return !!t.data(d, u);
          };
        })
      : function (u, d, g) {
          return !!t.data(u, g[3]);
        },
    focusable: function (u) {
      return s(u, !isNaN(t.attr(u, "tabindex")));
    },
    tabbable: function (u) {
      var d = t.attr(u, "tabindex"),
        g = isNaN(d);
      return (g || d >= 0) && s(u, !g);
    },
  }),
    t("<a>").outerWidth(1).jquery ||
      t.each(["Width", "Height"], function (u, d) {
        var g = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
          b = d.toLowerCase(),
          w = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight,
          };
        function S(I, D, k, C) {
          return (
            t.each(g, function () {
              (D -= parseFloat(t.css(I, "padding" + this)) || 0),
                k &&
                  (D -= parseFloat(t.css(I, "border" + this + "Width")) || 0),
                C && (D -= parseFloat(t.css(I, "margin" + this)) || 0);
            }),
            D
          );
        }
        (t.fn["inner" + d] = function (I) {
          return I === e
            ? w["inner" + d].call(this)
            : this.each(function () {
                t(this).css(b, S(this, I) + "px");
              });
        }),
          (t.fn["outer" + d] = function (I, D) {
            return typeof I != "number"
              ? w["outer" + d].call(this, I)
              : this.each(function () {
                  t(this).css(b, S(this, I, !0, D) + "px");
                });
          });
      }),
    t.fn.addBack ||
      (t.fn.addBack = function (u) {
        return this.add(
          u == null ? this.prevObject : this.prevObject.filter(u)
        );
      }),
    t("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (t.fn.removeData = (function (u) {
        return function (d) {
          return arguments.length ? u.call(this, t.camelCase(d)) : u.call(this);
        };
      })(t.fn.removeData)),
    (t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    (t.support.selectstart = "onselectstart" in document.createElement("div")),
    t.fn.extend({
      disableSelection: function () {
        return this.bind(
          (t.support.selectstart ? "selectstart" : "mousedown") +
            ".ui-disableSelection",
          function (u) {
            u.preventDefault();
          }
        );
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
    }),
    t.extend(t.ui, {
      plugin: {
        add: function (u, d, g) {
          var b,
            w = t.ui[u].prototype;
          for (b in g)
            (w.plugins[b] = w.plugins[b] || []), w.plugins[b].push([d, g[b]]);
        },
        call: function (u, d, g) {
          var b,
            w = u.plugins[d];
          if (
            !(
              !w ||
              !u.element[0].parentNode ||
              u.element[0].parentNode.nodeType === 11
            )
          )
            for (b = 0; b < w.length; b++)
              u.options[w[b][0]] && w[b][1].apply(u.element, g);
        },
      },
      hasScroll: function (u, d) {
        if (t(u).css("overflow") === "hidden") return !1;
        var g = d && d === "left" ? "scrollLeft" : "scrollTop",
          b = !1;
        return u[g] > 0 ? !0 : ((u[g] = 1), (b = u[g] > 0), (u[g] = 0), b);
      },
    });
})(Ce);
(function (t, e) {
  var r = 0,
    n = Array.prototype.slice,
    s = t.cleanData;
  (t.cleanData = function (c) {
    for (var u = 0, d; (d = c[u]) != null; u++)
      try {
        t(d).triggerHandler("remove");
      } catch {}
    s(c);
  }),
    (t.widget = function (c, u, d) {
      var g,
        b,
        w,
        S,
        I = {},
        D = c.split(".")[0];
      (c = c.split(".")[1]),
        (g = D + "-" + c),
        d || ((d = u), (u = t.Widget)),
        (t.expr[":"][g.toLowerCase()] = function (k) {
          return !!t.data(k, g);
        }),
        (t[D] = t[D] || {}),
        (b = t[D][c]),
        (w = t[D][c] =
          function (k, C) {
            if (!this._createWidget) return new w(k, C);
            arguments.length && this._createWidget(k, C);
          }),
        t.extend(w, b, {
          version: d.version,
          _proto: t.extend({}, d),
          _childConstructors: [],
        }),
        (S = new u()),
        (S.options = t.widget.extend({}, S.options)),
        t.each(d, function (k, C) {
          if (!t.isFunction(C)) {
            I[k] = C;
            return;
          }
          I[k] = (function () {
            var T = function () {
                return u.prototype[k].apply(this, arguments);
              },
              a = function (W) {
                return u.prototype[k].apply(this, W);
              };
            return function () {
              var W = this._super,
                H = this._superApply,
                O;
              return (
                (this._super = T),
                (this._superApply = a),
                (O = C.apply(this, arguments)),
                (this._super = W),
                (this._superApply = H),
                O
              );
            };
          })();
        }),
        (w.prototype = t.widget.extend(
          S,
          { widgetEventPrefix: b ? S.widgetEventPrefix : c },
          I,
          { constructor: w, namespace: D, widgetName: c, widgetFullName: g }
        )),
        b
          ? (t.each(b._childConstructors, function (k, C) {
              var T = C.prototype;
              t.widget(T.namespace + "." + T.widgetName, w, C._proto);
            }),
            delete b._childConstructors)
          : u._childConstructors.push(w),
        t.widget.bridge(c, w);
    }),
    (t.widget.extend = function (c) {
      for (var u = n.call(arguments, 1), d = 0, g = u.length, b, w; d < g; d++)
        for (b in u[d])
          (w = u[d][b]),
            u[d].hasOwnProperty(b) &&
              w !== e &&
              (t.isPlainObject(w)
                ? (c[b] = t.isPlainObject(c[b])
                    ? t.widget.extend({}, c[b], w)
                    : t.widget.extend({}, w))
                : (c[b] = w));
      return c;
    }),
    (t.widget.bridge = function (c, u) {
      var d = u.prototype.widgetFullName || c;
      t.fn[c] = function (g) {
        var b = typeof g == "string",
          w = n.call(arguments, 1),
          S = this;
        return (
          (g = !b && w.length ? t.widget.extend.apply(null, [g].concat(w)) : g),
          b
            ? this.each(function () {
                var I,
                  D = t.data(this, d);
                if (!D)
                  return t.error(
                    "cannot call methods on " +
                      c +
                      " prior to initialization; attempted to call method '" +
                      g +
                      "'"
                  );
                if (!t.isFunction(D[g]) || g.charAt(0) === "_")
                  return t.error(
                    "no such method '" + g + "' for " + c + " widget instance"
                  );
                if (((I = D[g].apply(D, w)), I !== D && I !== e))
                  return (S = I && I.jquery ? S.pushStack(I.get()) : I), !1;
              })
            : this.each(function () {
                var I = t.data(this, d);
                I ? I.option(g || {})._init() : t.data(this, d, new u(g, this));
              }),
          S
        );
      };
    }),
    (t.Widget = function () {}),
    (t.Widget._childConstructors = []),
    (t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (c, u) {
        (u = t(u || this.defaultElement || this)[0]),
          (this.element = t(u)),
          (this.uuid = r++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.options = t.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            c
          )),
          (this.bindings = t()),
          (this.hoverable = t()),
          (this.focusable = t()),
          u !== this &&
            (t.data(u, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (d) {
                d.target === u && this.destroy();
              },
            }),
            (this.document = t(u.style ? u.ownerDocument : u.document || u)),
            (this.window = t(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: t.noop,
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetName)
            .removeData(this.widgetFullName)
            .removeData(t.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: t.noop,
      widget: function () {
        return this.element;
      },
      option: function (c, u) {
        var d = c,
          g,
          b,
          w;
        if (arguments.length === 0) return t.widget.extend({}, this.options);
        if (typeof c == "string")
          if (((d = {}), (g = c.split(".")), (c = g.shift()), g.length)) {
            for (
              b = d[c] = t.widget.extend({}, this.options[c]), w = 0;
              w < g.length - 1;
              w++
            )
              (b[g[w]] = b[g[w]] || {}), (b = b[g[w]]);
            if (((c = g.pop()), u === e)) return b[c] === e ? null : b[c];
            b[c] = u;
          } else {
            if (u === e) return this.options[c] === e ? null : this.options[c];
            d[c] = u;
          }
        return this._setOptions(d), this;
      },
      _setOptions: function (c) {
        var u;
        for (u in c) this._setOption(u, c[u]);
        return this;
      },
      _setOption: function (c, u) {
        return (
          (this.options[c] = u),
          c === "disabled" &&
            (this.widget()
              .toggleClass(
                this.widgetFullName + "-disabled ui-state-disabled",
                !!u
              )
              .attr("aria-disabled", u),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
          this
        );
      },
      enable: function () {
        return this._setOption("disabled", !1);
      },
      disable: function () {
        return this._setOption("disabled", !0);
      },
      _on: function (c, u, d) {
        var g,
          b = this;
        typeof c != "boolean" && ((d = u), (u = c), (c = !1)),
          d
            ? ((u = g = t(u)), (this.bindings = this.bindings.add(u)))
            : ((d = u), (u = this.element), (g = this.widget())),
          t.each(d, function (w, S) {
            function I() {
              if (
                !(
                  !c &&
                  (b.options.disabled === !0 ||
                    t(this).hasClass("ui-state-disabled"))
                )
              )
                return (typeof S == "string" ? b[S] : S).apply(b, arguments);
            }
            typeof S != "string" &&
              (I.guid = S.guid = S.guid || I.guid || t.guid++);
            var D = w.match(/^(\w+)\s*(.*)$/),
              k = D[1] + b.eventNamespace,
              C = D[2];
            C ? g.delegate(C, k, I) : u.bind(k, I);
          });
      },
      _off: function (c, u) {
        (u =
          (u || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          c.unbind(u).undelegate(u);
      },
      _delay: function (c, u) {
        function d() {
          return (typeof c == "string" ? g[c] : c).apply(g, arguments);
        }
        var g = this;
        return setTimeout(d, u || 0);
      },
      _hoverable: function (c) {
        (this.hoverable = this.hoverable.add(c)),
          this._on(c, {
            mouseenter: function (u) {
              t(u.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (u) {
              t(u.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (c) {
        (this.focusable = this.focusable.add(c)),
          this._on(c, {
            focusin: function (u) {
              t(u.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (u) {
              t(u.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (c, u, d) {
        var g,
          b,
          w = this.options[c];
        if (
          ((d = d || {}),
          (u = t.Event(u)),
          (u.type = (
            c === this.widgetEventPrefix ? c : this.widgetEventPrefix + c
          ).toLowerCase()),
          (u.target = this.element[0]),
          (b = u.originalEvent),
          b)
        )
          for (g in b) g in u || (u[g] = b[g]);
        return (
          this.element.trigger(u, d),
          !(
            (t.isFunction(w) &&
              w.apply(this.element[0], [u].concat(d)) === !1) ||
            u.isDefaultPrevented()
          )
        );
      },
    }),
    t.each({ show: "fadeIn", hide: "fadeOut" }, function (c, u) {
      t.Widget.prototype["_" + c] = function (d, g, b) {
        typeof g == "string" && (g = { effect: g });
        var w,
          S = g ? (g === !0 || typeof g == "number" ? u : g.effect || u) : c;
        (g = g || {}),
          typeof g == "number" && (g = { duration: g }),
          (w = !t.isEmptyObject(g)),
          (g.complete = b),
          g.delay && d.delay(g.delay),
          w && t.effects && t.effects.effect[S]
            ? d[c](g)
            : S !== c && d[S]
              ? d[S](g.duration, g.easing, b)
              : d.queue(function (I) {
                  t(this)[c](), b && b.call(d[0]), I();
                });
      };
    });
})(Ce);
(function (t, e) {
  var r = !1;
  t(document).mouseup(function () {
    r = !1;
  }),
    t.widget("ui.mouse", {
      version: "1.10.1",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var n = this;
        this.element
          .bind("mousedown." + this.widgetName, function (s) {
            return n._mouseDown(s);
          })
          .bind("click." + this.widgetName, function (s) {
            if (t.data(s.target, n.widgetName + ".preventClickEvent") === !0)
              return (
                t.removeData(s.target, n.widgetName + ".preventClickEvent"),
                s.stopImmediatePropagation(),
                !1
              );
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            t(document)
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (n) {
        if (!r) {
          this._mouseStarted && this._mouseUp(n), (this._mouseDownEvent = n);
          var s = this,
            c = n.which === 1,
            u =
              typeof this.options.cancel == "string" && n.target.nodeName
                ? t(n.target).closest(this.options.cancel).length
                : !1;
          return !c || u || !this._mouseCapture(n)
            ? !0
            : ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  s.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(n) &&
              this._mouseDelayMet(n) &&
              ((this._mouseStarted = this._mouseStart(n) !== !1),
              !this._mouseStarted)
                ? (n.preventDefault(), !0)
                : (t.data(n.target, this.widgetName + ".preventClickEvent") ===
                    !0 &&
                    t.removeData(
                      n.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (d) {
                    return s._mouseMove(d);
                  }),
                  (this._mouseUpDelegate = function (d) {
                    return s._mouseUp(d);
                  }),
                  t(document)
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  n.preventDefault(),
                  (r = !0),
                  !0));
        }
      },
      _mouseMove: function (n) {
        return t.ui.ie &&
          (!document.documentMode || document.documentMode < 9) &&
          !n.button
          ? this._mouseUp(n)
          : this._mouseStarted
            ? (this._mouseDrag(n), n.preventDefault())
            : (this._mouseDistanceMet(n) &&
                this._mouseDelayMet(n) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, n) !== !1),
                this._mouseStarted ? this._mouseDrag(n) : this._mouseUp(n)),
              !this._mouseStarted);
      },
      _mouseUp: function (n) {
        return (
          t(document)
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            n.target === this._mouseDownEvent.target &&
              t.data(n.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(n)),
          !1
        );
      },
      _mouseDistanceMet: function (n) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - n.pageX),
            Math.abs(this._mouseDownEvent.pageY - n.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    });
})(Ce);
(function (t, e) {
  t.ui = t.ui || {};
  var r,
    n = Math.max,
    s = Math.abs,
    c = Math.round,
    u = /left|center|right/,
    d = /top|center|bottom/,
    g = /[\+\-]\d+(\.[\d]+)?%?/,
    b = /^\w+/,
    w = /%$/,
    S = t.fn.position;
  function I(C, T, a) {
    return [
      parseFloat(C[0]) * (w.test(C[0]) ? T / 100 : 1),
      parseFloat(C[1]) * (w.test(C[1]) ? a / 100 : 1),
    ];
  }
  function D(C, T) {
    return parseInt(t.css(C, T), 10) || 0;
  }
  function k(C) {
    var T = C[0];
    return T.nodeType === 9
      ? { width: C.width(), height: C.height(), offset: { top: 0, left: 0 } }
      : t.isWindow(T)
        ? {
            width: C.width(),
            height: C.height(),
            offset: { top: C.scrollTop(), left: C.scrollLeft() },
          }
        : T.preventDefault
          ? { width: 0, height: 0, offset: { top: T.pageY, left: T.pageX } }
          : {
              width: C.outerWidth(),
              height: C.outerHeight(),
              offset: C.offset(),
            };
  }
  (t.position = {
    scrollbarWidth: function () {
      if (r !== e) return r;
      var C,
        T,
        a = t(
          "<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
        ),
        W = a.children()[0];
      return (
        t("body").append(a),
        (C = W.offsetWidth),
        a.css("overflow", "scroll"),
        (T = W.offsetWidth),
        C === T && (T = a[0].clientWidth),
        a.remove(),
        (r = C - T)
      );
    },
    getScrollInfo: function (C) {
      var T = C.isWindow ? "" : C.element.css("overflow-x"),
        a = C.isWindow ? "" : C.element.css("overflow-y"),
        W =
          T === "scroll" ||
          (T === "auto" && C.width < C.element[0].scrollWidth),
        H =
          a === "scroll" ||
          (a === "auto" && C.height < C.element[0].scrollHeight);
      return {
        width: W ? t.position.scrollbarWidth() : 0,
        height: H ? t.position.scrollbarWidth() : 0,
      };
    },
    getWithinInfo: function (C) {
      var T = t(C || window),
        a = t.isWindow(T[0]);
      return {
        element: T,
        isWindow: a,
        offset: T.offset() || { left: 0, top: 0 },
        scrollLeft: T.scrollLeft(),
        scrollTop: T.scrollTop(),
        width: a ? T.width() : T.outerWidth(),
        height: a ? T.height() : T.outerHeight(),
      };
    },
  }),
    (t.fn.position = function (C) {
      if (!C || !C.of) return S.apply(this, arguments);
      C = t.extend({}, C);
      var T,
        a,
        W,
        H,
        O,
        B,
        Y = t(C.of),
        U = t.position.getWithinInfo(C.within),
        tt = t.position.getScrollInfo(U),
        Q = (C.collision || "flip").split(" "),
        it = {};
      return (
        (B = k(Y)),
        Y[0].preventDefault && (C.at = "left top"),
        (a = B.width),
        (W = B.height),
        (H = B.offset),
        (O = t.extend({}, H)),
        t.each(["my", "at"], function () {
          var G = (C[this] || "").split(" "),
            ut,
            lt;
          G.length === 1 &&
            (G = u.test(G[0])
              ? G.concat(["center"])
              : d.test(G[0])
                ? ["center"].concat(G)
                : ["center", "center"]),
            (G[0] = u.test(G[0]) ? G[0] : "center"),
            (G[1] = d.test(G[1]) ? G[1] : "center"),
            (ut = g.exec(G[0])),
            (lt = g.exec(G[1])),
            (it[this] = [ut ? ut[0] : 0, lt ? lt[0] : 0]),
            (C[this] = [b.exec(G[0])[0], b.exec(G[1])[0]]);
        }),
        Q.length === 1 && (Q[1] = Q[0]),
        C.at[0] === "right"
          ? (O.left += a)
          : C.at[0] === "center" && (O.left += a / 2),
        C.at[1] === "bottom"
          ? (O.top += W)
          : C.at[1] === "center" && (O.top += W / 2),
        (T = I(it.at, a, W)),
        (O.left += T[0]),
        (O.top += T[1]),
        this.each(function () {
          var G,
            ut,
            lt = t(this),
            Ct = lt.outerWidth(),
            yt = lt.outerHeight(),
            wt = D(this, "marginLeft"),
            Tt = D(this, "marginTop"),
            ce = Ct + wt + D(this, "marginRight") + tt.width,
            Ut = yt + Tt + D(this, "marginBottom") + tt.height,
            dt = t.extend({}, O),
            Kt = I(it.my, lt.outerWidth(), lt.outerHeight());
          C.my[0] === "right"
            ? (dt.left -= Ct)
            : C.my[0] === "center" && (dt.left -= Ct / 2),
            C.my[1] === "bottom"
              ? (dt.top -= yt)
              : C.my[1] === "center" && (dt.top -= yt / 2),
            (dt.left += Kt[0]),
            (dt.top += Kt[1]),
            t.support.offsetFractions ||
              ((dt.left = c(dt.left)), (dt.top = c(dt.top))),
            (G = { marginLeft: wt, marginTop: Tt }),
            t.each(["left", "top"], function (It, bt) {
              t.ui.position[Q[It]] &&
                t.ui.position[Q[It]][bt](dt, {
                  targetWidth: a,
                  targetHeight: W,
                  elemWidth: Ct,
                  elemHeight: yt,
                  collisionPosition: G,
                  collisionWidth: ce,
                  collisionHeight: Ut,
                  offset: [T[0] + Kt[0], T[1] + Kt[1]],
                  my: C.my,
                  at: C.at,
                  within: U,
                  elem: lt,
                });
            }),
            C.using &&
              (ut = function (It) {
                var bt = H.left - dt.left,
                  Mt = bt + a - Ct,
                  kt = H.top - dt.top,
                  jt = kt + W - yt,
                  zt = {
                    target: {
                      element: Y,
                      left: H.left,
                      top: H.top,
                      width: a,
                      height: W,
                    },
                    element: {
                      element: lt,
                      left: dt.left,
                      top: dt.top,
                      width: Ct,
                      height: yt,
                    },
                    horizontal: Mt < 0 ? "left" : bt > 0 ? "right" : "center",
                    vertical: jt < 0 ? "top" : kt > 0 ? "bottom" : "middle",
                  };
                a < Ct && s(bt + Mt) < a && (zt.horizontal = "center"),
                  W < yt && s(kt + jt) < W && (zt.vertical = "middle"),
                  n(s(bt), s(Mt)) > n(s(kt), s(jt))
                    ? (zt.important = "horizontal")
                    : (zt.important = "vertical"),
                  C.using.call(this, It, zt);
              }),
            lt.offset(t.extend(dt, { using: ut }));
        })
      );
    }),
    (t.ui.position = {
      fit: {
        left: function (C, T) {
          var a = T.within,
            W = a.isWindow ? a.scrollLeft : a.offset.left,
            H = a.width,
            O = C.left - T.collisionPosition.marginLeft,
            B = W - O,
            Y = O + T.collisionWidth - H - W,
            U;
          T.collisionWidth > H
            ? B > 0 && Y <= 0
              ? ((U = C.left + B + T.collisionWidth - H - W), (C.left += B - U))
              : Y > 0 && B <= 0
                ? (C.left = W)
                : B > Y
                  ? (C.left = W + H - T.collisionWidth)
                  : (C.left = W)
            : B > 0
              ? (C.left += B)
              : Y > 0
                ? (C.left -= Y)
                : (C.left = n(C.left - O, C.left));
        },
        top: function (C, T) {
          var a = T.within,
            W = a.isWindow ? a.scrollTop : a.offset.top,
            H = T.within.height,
            O = C.top - T.collisionPosition.marginTop,
            B = W - O,
            Y = O + T.collisionHeight - H - W,
            U;
          T.collisionHeight > H
            ? B > 0 && Y <= 0
              ? ((U = C.top + B + T.collisionHeight - H - W), (C.top += B - U))
              : Y > 0 && B <= 0
                ? (C.top = W)
                : B > Y
                  ? (C.top = W + H - T.collisionHeight)
                  : (C.top = W)
            : B > 0
              ? (C.top += B)
              : Y > 0
                ? (C.top -= Y)
                : (C.top = n(C.top - O, C.top));
        },
      },
      flip: {
        left: function (C, T) {
          var a = T.within,
            W = a.offset.left + a.scrollLeft,
            H = a.width,
            O = a.isWindow ? a.scrollLeft : a.offset.left,
            B = C.left - T.collisionPosition.marginLeft,
            Y = B - O,
            U = B + T.collisionWidth - H - O,
            tt =
              T.my[0] === "left"
                ? -T.elemWidth
                : T.my[0] === "right"
                  ? T.elemWidth
                  : 0,
            Q =
              T.at[0] === "left"
                ? T.targetWidth
                : T.at[0] === "right"
                  ? -T.targetWidth
                  : 0,
            it = -2 * T.offset[0],
            G,
            ut;
          Y < 0
            ? ((G = C.left + tt + Q + it + T.collisionWidth - H - W),
              (G < 0 || G < s(Y)) && (C.left += tt + Q + it))
            : U > 0 &&
              ((ut = C.left - T.collisionPosition.marginLeft + tt + Q + it - O),
              (ut > 0 || s(ut) < U) && (C.left += tt + Q + it));
        },
        top: function (C, T) {
          var a = T.within,
            W = a.offset.top + a.scrollTop,
            H = a.height,
            O = a.isWindow ? a.scrollTop : a.offset.top,
            B = C.top - T.collisionPosition.marginTop,
            Y = B - O,
            U = B + T.collisionHeight - H - O,
            tt = T.my[1] === "top",
            Q = tt ? -T.elemHeight : T.my[1] === "bottom" ? T.elemHeight : 0,
            it =
              T.at[1] === "top"
                ? T.targetHeight
                : T.at[1] === "bottom"
                  ? -T.targetHeight
                  : 0,
            G = -2 * T.offset[1],
            ut,
            lt;
          Y < 0
            ? ((lt = C.top + Q + it + G + T.collisionHeight - H - W),
              C.top + Q + it + G > Y &&
                (lt < 0 || lt < s(Y)) &&
                (C.top += Q + it + G))
            : U > 0 &&
              ((ut = C.top - T.collisionPosition.marginTop + Q + it + G - O),
              C.top + Q + it + G > U &&
                (ut > 0 || s(ut) < U) &&
                (C.top += Q + it + G));
        },
      },
      flipfit: {
        left: function () {
          t.ui.position.flip.left.apply(this, arguments),
            t.ui.position.fit.left.apply(this, arguments);
        },
        top: function () {
          t.ui.position.flip.top.apply(this, arguments),
            t.ui.position.fit.top.apply(this, arguments);
        },
      },
    }),
    (function () {
      var C,
        T,
        a,
        W,
        H,
        O = document.getElementsByTagName("body")[0],
        B = document.createElement("div");
      (C = document.createElement(O ? "div" : "body")),
        (a = {
          visibility: "hidden",
          width: 0,
          height: 0,
          border: 0,
          margin: 0,
          background: "none",
        }),
        O &&
          t.extend(a, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px",
          });
      for (H in a) C.style[H] = a[H];
      C.appendChild(B),
        (T = O || document.documentElement),
        T.insertBefore(C, T.firstChild),
        (B.style.cssText = "position: absolute; left: 10.7432222px;"),
        (W = t(B).offset().left),
        (t.support.offsetFractions = W > 10 && W < 11),
        (C.innerHTML = ""),
        T.removeChild(C);
    })();
})(Ce);
(function (t, e) {
  t.widget("ui.draggable", t.ui.mouse, {
    version: "1.10.1",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null,
    },
    _create: function () {
      this.options.helper === "original" &&
        !/^(?:r|a|f)/.test(this.element.css("position")) &&
        (this.element[0].style.position = "relative"),
        this.options.addClasses && this.element.addClass("ui-draggable"),
        this.options.disabled && this.element.addClass("ui-draggable-disabled"),
        this._mouseInit();
    },
    _destroy: function () {
      this.element.removeClass(
        "ui-draggable ui-draggable-dragging ui-draggable-disabled"
      ),
        this._mouseDestroy();
    },
    _mouseCapture: function (r) {
      var n = this.options;
      return this.helper ||
        n.disabled ||
        t(r.target).closest(".ui-resizable-handle").length > 0 ||
        ((this.handle = this._getHandle(r)), !this.handle)
        ? !1
        : (t(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function () {
            t(
              "<div class='ui-draggable-iframeFix' style='background: #fff;'></div>"
            )
              .css({
                width: this.offsetWidth + "px",
                height: this.offsetHeight + "px",
                position: "absolute",
                opacity: "0.001",
                zIndex: 1e3,
              })
              .css(t(this).offset())
              .appendTo("body");
          }),
          !0);
    },
    _mouseStart: function (r) {
      var n = this.options;
      return (
        (this.helper = this._createHelper(r)),
        this.helper.addClass("ui-draggable-dragging"),
        this._cacheHelperProportions(),
        t.ui.ddmanager && (t.ui.ddmanager.current = this),
        this._cacheMargins(),
        (this.cssPosition = this.helper.css("position")),
        (this.scrollParent = this.helper.scrollParent()),
        (this.offset = this.positionAbs = this.element.offset()),
        (this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left,
        }),
        t.extend(this.offset, {
          click: {
            left: r.pageX - this.offset.left,
            top: r.pageY - this.offset.top,
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
        (this.originalPosition = this.position = this._generatePosition(r)),
        (this.originalPageX = r.pageX),
        (this.originalPageY = r.pageY),
        n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt),
        n.containment && this._setContainment(),
        this._trigger("start", r) === !1
          ? (this._clear(), !1)
          : (this._cacheHelperProportions(),
            t.ui.ddmanager &&
              !n.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(this, r),
            this._mouseDrag(r, !0),
            t.ui.ddmanager && t.ui.ddmanager.dragStart(this, r),
            !0)
      );
    },
    _mouseDrag: function (r, n) {
      if (
        ((this.position = this._generatePosition(r)),
        (this.positionAbs = this._convertPositionTo("absolute")),
        !n)
      ) {
        var s = this._uiHash();
        if (this._trigger("drag", r, s) === !1) return this._mouseUp({}), !1;
        this.position = s.position;
      }
      return (
        (!this.options.axis || this.options.axis !== "y") &&
          (this.helper[0].style.left = this.position.left + "px"),
        (!this.options.axis || this.options.axis !== "x") &&
          (this.helper[0].style.top = this.position.top + "px"),
        t.ui.ddmanager && t.ui.ddmanager.drag(this, r),
        !1
      );
    },
    _mouseStop: function (r) {
      var n,
        s = this,
        c = !1,
        u = !1;
      for (
        t.ui.ddmanager &&
          !this.options.dropBehaviour &&
          (u = t.ui.ddmanager.drop(this, r)),
          this.dropped && ((u = this.dropped), (this.dropped = !1)),
          n = this.element[0];
        n && (n = n.parentNode);

      )
        n === document && (c = !0);
      return (
        (!c && this.options.helper === "original") ||
          ((this.options.revert === "invalid" && !u) ||
          (this.options.revert === "valid" && u) ||
          this.options.revert === !0 ||
          (t.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, u))
            ? t(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  s._trigger("stop", r) !== !1 && s._clear();
                }
              )
            : this._trigger("stop", r) !== !1 && this._clear()),
        !1
      );
    },
    _mouseUp: function (r) {
      return (
        t("div.ui-draggable-iframeFix").each(function () {
          this.parentNode.removeChild(this);
        }),
        t.ui.ddmanager && t.ui.ddmanager.dragStop(this, r),
        t.ui.mouse.prototype._mouseUp.call(this, r)
      );
    },
    cancel: function () {
      return (
        this.helper.is(".ui-draggable-dragging")
          ? this._mouseUp({})
          : this._clear(),
        this
      );
    },
    _getHandle: function (r) {
      var n =
        !this.options.handle || !t(this.options.handle, this.element).length;
      return (
        t(this.options.handle, this.element)
          .find("*")
          .addBack()
          .each(function () {
            this === r.target && (n = !0);
          }),
        n
      );
    },
    _createHelper: function (r) {
      var n = this.options,
        s = t.isFunction(n.helper)
          ? t(n.helper.apply(this.element[0], [r]))
          : n.helper === "clone"
            ? this.element.clone().removeAttr("id")
            : this.element;
      return (
        s.parents("body").length ||
          s.appendTo(
            n.appendTo === "parent" ? this.element[0].parentNode : n.appendTo
          ),
        s[0] !== this.element[0] &&
          !/(fixed|absolute)/.test(s.css("position")) &&
          s.css("position", "absolute"),
        s
      );
    },
    _adjustOffsetFromHelper: function (r) {
      typeof r == "string" && (r = r.split(" ")),
        t.isArray(r) && (r = { left: +r[0], top: +r[1] || 0 }),
        "left" in r && (this.offset.click.left = r.left + this.margins.left),
        "right" in r &&
          (this.offset.click.left =
            this.helperProportions.width - r.right + this.margins.left),
        "top" in r && (this.offset.click.top = r.top + this.margins.top),
        "bottom" in r &&
          (this.offset.click.top =
            this.helperProportions.height - r.bottom + this.margins.top);
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var r = this.offsetParent.offset();
      return (
        this.cssPosition === "absolute" &&
          this.scrollParent[0] !== document &&
          t.contains(this.scrollParent[0], this.offsetParent[0]) &&
          ((r.left += this.scrollParent.scrollLeft()),
          (r.top += this.scrollParent.scrollTop())),
        (this.offsetParent[0] === document.body ||
          (this.offsetParent[0].tagName &&
            this.offsetParent[0].tagName.toLowerCase() === "html" &&
            t.ui.ie)) &&
          (r = { top: 0, left: 0 }),
        {
          top:
            r.top +
            (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
          left:
            r.left +
            (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
        }
      );
    },
    _getRelativeOffset: function () {
      if (this.cssPosition === "relative") {
        var r = this.element.position();
        return {
          top:
            r.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            this.scrollParent.scrollTop(),
          left:
            r.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            this.scrollParent.scrollLeft(),
        };
      } else return { top: 0, left: 0 };
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight(),
      };
    },
    _setContainment: function () {
      var r,
        n,
        s,
        c = this.options;
      if (
        (c.containment === "parent" &&
          (c.containment = this.helper[0].parentNode),
        (c.containment === "document" || c.containment === "window") &&
          (this.containment = [
            c.containment === "document"
              ? 0
              : t(window).scrollLeft() -
                this.offset.relative.left -
                this.offset.parent.left,
            c.containment === "document"
              ? 0
              : t(window).scrollTop() -
                this.offset.relative.top -
                this.offset.parent.top,
            (c.containment === "document" ? 0 : t(window).scrollLeft()) +
              t(c.containment === "document" ? document : window).width() -
              this.helperProportions.width -
              this.margins.left,
            (c.containment === "document" ? 0 : t(window).scrollTop()) +
              (t(c.containment === "document" ? document : window).height() ||
                document.body.parentNode.scrollHeight) -
              this.helperProportions.height -
              this.margins.top,
          ]),
        !/^(document|window|parent)$/.test(c.containment) &&
          c.containment.constructor !== Array)
      ) {
        if (((n = t(c.containment)), (s = n[0]), !s)) return;
        (r = t(s).css("overflow") !== "hidden"),
          (this.containment = [
            (parseInt(t(s).css("borderLeftWidth"), 10) || 0) +
              (parseInt(t(s).css("paddingLeft"), 10) || 0),
            (parseInt(t(s).css("borderTopWidth"), 10) || 0) +
              (parseInt(t(s).css("paddingTop"), 10) || 0),
            (r ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) -
              (parseInt(t(s).css("borderLeftWidth"), 10) || 0) -
              (parseInt(t(s).css("paddingRight"), 10) || 0) -
              this.helperProportions.width -
              this.margins.left -
              this.margins.right,
            (r ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) -
              (parseInt(t(s).css("borderTopWidth"), 10) || 0) -
              (parseInt(t(s).css("paddingBottom"), 10) || 0) -
              this.helperProportions.height -
              this.margins.top -
              this.margins.bottom,
          ]),
          (this.relative_container = n);
      } else
        c.containment.constructor === Array &&
          (this.containment = c.containment);
    },
    _convertPositionTo: function (r, n) {
      n || (n = this.position);
      var s = r === "absolute" ? 1 : -1,
        c =
          this.cssPosition === "absolute" &&
          !(
            this.scrollParent[0] !== document &&
            t.contains(this.scrollParent[0], this.offsetParent[0])
          )
            ? this.offsetParent
            : this.scrollParent,
        u = /(html|body)/i.test(c[0].tagName);
      return {
        top:
          n.top +
          this.offset.relative.top * s +
          this.offset.parent.top * s -
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollTop()
            : u
              ? 0
              : c.scrollTop()) *
            s,
        left:
          n.left +
          this.offset.relative.left * s +
          this.offset.parent.left * s -
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollLeft()
            : u
              ? 0
              : c.scrollLeft()) *
            s,
      };
    },
    _generatePosition: function (r) {
      var n,
        s,
        c,
        u,
        d = this.options,
        g =
          this.cssPosition === "absolute" &&
          !(
            this.scrollParent[0] !== document &&
            t.contains(this.scrollParent[0], this.offsetParent[0])
          )
            ? this.offsetParent
            : this.scrollParent,
        b = /(html|body)/i.test(g[0].tagName),
        w = r.pageX,
        S = r.pageY;
      return (
        this.originalPosition &&
          (this.containment &&
            (this.relative_container
              ? ((s = this.relative_container.offset()),
                (n = [
                  this.containment[0] + s.left,
                  this.containment[1] + s.top,
                  this.containment[2] + s.left,
                  this.containment[3] + s.top,
                ]))
              : (n = this.containment),
            r.pageX - this.offset.click.left < n[0] &&
              (w = n[0] + this.offset.click.left),
            r.pageY - this.offset.click.top < n[1] &&
              (S = n[1] + this.offset.click.top),
            r.pageX - this.offset.click.left > n[2] &&
              (w = n[2] + this.offset.click.left),
            r.pageY - this.offset.click.top > n[3] &&
              (S = n[3] + this.offset.click.top)),
          d.grid &&
            ((c = d.grid[1]
              ? this.originalPageY +
                Math.round((S - this.originalPageY) / d.grid[1]) * d.grid[1]
              : this.originalPageY),
            (S = n
              ? c - this.offset.click.top >= n[1] ||
                c - this.offset.click.top > n[3]
                ? c
                : c - this.offset.click.top >= n[1]
                  ? c - d.grid[1]
                  : c + d.grid[1]
              : c),
            (u = d.grid[0]
              ? this.originalPageX +
                Math.round((w - this.originalPageX) / d.grid[0]) * d.grid[0]
              : this.originalPageX),
            (w = n
              ? u - this.offset.click.left >= n[0] ||
                u - this.offset.click.left > n[2]
                ? u
                : u - this.offset.click.left >= n[0]
                  ? u - d.grid[0]
                  : u + d.grid[0]
              : u))),
        {
          top:
            S -
            this.offset.click.top -
            this.offset.relative.top -
            this.offset.parent.top +
            (this.cssPosition === "fixed"
              ? -this.scrollParent.scrollTop()
              : b
                ? 0
                : g.scrollTop()),
          left:
            w -
            this.offset.click.left -
            this.offset.relative.left -
            this.offset.parent.left +
            (this.cssPosition === "fixed"
              ? -this.scrollParent.scrollLeft()
              : b
                ? 0
                : g.scrollLeft()),
        }
      );
    },
    _clear: function () {
      this.helper.removeClass("ui-draggable-dragging"),
        this.helper[0] !== this.element[0] &&
          !this.cancelHelperRemoval &&
          this.helper.remove(),
        (this.helper = null),
        (this.cancelHelperRemoval = !1);
    },
    _trigger: function (r, n, s) {
      return (
        (s = s || this._uiHash()),
        t.ui.plugin.call(this, r, [n, s]),
        r === "drag" &&
          (this.positionAbs = this._convertPositionTo("absolute")),
        t.Widget.prototype._trigger.call(this, r, n, s)
      );
    },
    plugins: {},
    _uiHash: function () {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs,
      };
    },
  }),
    t.ui.plugin.add("draggable", "connectToSortable", {
      start: function (r, n) {
        var s = t(this).data("ui-draggable"),
          c = s.options,
          u = t.extend({}, n, { item: s.element });
        (s.sortables = []),
          t(c.connectToSortable).each(function () {
            var d = t.data(this, "ui-sortable");
            d &&
              !d.options.disabled &&
              (s.sortables.push({
                instance: d,
                shouldRevert: d.options.revert,
              }),
              d.refreshPositions(),
              d._trigger("activate", r, u));
          });
      },
      stop: function (r, n) {
        var s = t(this).data("ui-draggable"),
          c = t.extend({}, n, { item: s.element });
        t.each(s.sortables, function () {
          this.instance.isOver
            ? ((this.instance.isOver = 0),
              (s.cancelHelperRemoval = !0),
              (this.instance.cancelHelperRemoval = !1),
              this.shouldRevert && (this.instance.options.revert = !0),
              this.instance._mouseStop(r),
              (this.instance.options.helper = this.instance.options._helper),
              s.options.helper === "original" &&
                this.instance.currentItem.css({ top: "auto", left: "auto" }))
            : ((this.instance.cancelHelperRemoval = !1),
              this.instance._trigger("deactivate", r, c));
        });
      },
      drag: function (r, n) {
        var s = t(this).data("ui-draggable"),
          c = this;
        t.each(s.sortables, function () {
          var u = !1,
            d = this;
          (this.instance.positionAbs = s.positionAbs),
            (this.instance.helperProportions = s.helperProportions),
            (this.instance.offset.click = s.offset.click),
            this.instance._intersectsWith(this.instance.containerCache) &&
              ((u = !0),
              t.each(s.sortables, function () {
                return (
                  (this.instance.positionAbs = s.positionAbs),
                  (this.instance.helperProportions = s.helperProportions),
                  (this.instance.offset.click = s.offset.click),
                  this !== d &&
                    this.instance._intersectsWith(
                      this.instance.containerCache
                    ) &&
                    t.contains(
                      d.instance.element[0],
                      this.instance.element[0]
                    ) &&
                    (u = !1),
                  u
                );
              })),
            u
              ? (this.instance.isOver ||
                  ((this.instance.isOver = 1),
                  (this.instance.currentItem = t(c)
                    .clone()
                    .removeAttr("id")
                    .appendTo(this.instance.element)
                    .data("ui-sortable-item", !0)),
                  (this.instance.options._helper =
                    this.instance.options.helper),
                  (this.instance.options.helper = function () {
                    return n.helper[0];
                  }),
                  (r.target = this.instance.currentItem[0]),
                  this.instance._mouseCapture(r, !0),
                  this.instance._mouseStart(r, !0, !0),
                  (this.instance.offset.click.top = s.offset.click.top),
                  (this.instance.offset.click.left = s.offset.click.left),
                  (this.instance.offset.parent.left -=
                    s.offset.parent.left - this.instance.offset.parent.left),
                  (this.instance.offset.parent.top -=
                    s.offset.parent.top - this.instance.offset.parent.top),
                  s._trigger("toSortable", r),
                  (s.dropped = this.instance.element),
                  (s.currentItem = s.element),
                  (this.instance.fromOutside = s)),
                this.instance.currentItem && this.instance._mouseDrag(r))
              : this.instance.isOver &&
                ((this.instance.isOver = 0),
                (this.instance.cancelHelperRemoval = !0),
                (this.instance.options.revert = !1),
                this.instance._trigger(
                  "out",
                  r,
                  this.instance._uiHash(this.instance)
                ),
                this.instance._mouseStop(r, !0),
                (this.instance.options.helper = this.instance.options._helper),
                this.instance.currentItem.remove(),
                this.instance.placeholder && this.instance.placeholder.remove(),
                s._trigger("fromSortable", r),
                (s.dropped = !1));
        });
      },
    }),
    t.ui.plugin.add("draggable", "cursor", {
      start: function () {
        var r = t("body"),
          n = t(this).data("ui-draggable").options;
        r.css("cursor") && (n._cursor = r.css("cursor")),
          r.css("cursor", n.cursor);
      },
      stop: function () {
        var r = t(this).data("ui-draggable").options;
        r._cursor && t("body").css("cursor", r._cursor);
      },
    }),
    t.ui.plugin.add("draggable", "opacity", {
      start: function (r, n) {
        var s = t(n.helper),
          c = t(this).data("ui-draggable").options;
        s.css("opacity") && (c._opacity = s.css("opacity")),
          s.css("opacity", c.opacity);
      },
      stop: function (r, n) {
        var s = t(this).data("ui-draggable").options;
        s._opacity && t(n.helper).css("opacity", s._opacity);
      },
    }),
    t.ui.plugin.add("draggable", "scroll", {
      start: function () {
        var r = t(this).data("ui-draggable");
        r.scrollParent[0] !== document &&
          r.scrollParent[0].tagName !== "HTML" &&
          (r.overflowOffset = r.scrollParent.offset());
      },
      drag: function (r) {
        var n = t(this).data("ui-draggable"),
          s = n.options,
          c = !1;
        n.scrollParent[0] !== document && n.scrollParent[0].tagName !== "HTML"
          ? ((!s.axis || s.axis !== "x") &&
              (n.overflowOffset.top + n.scrollParent[0].offsetHeight - r.pageY <
              s.scrollSensitivity
                ? (n.scrollParent[0].scrollTop = c =
                    n.scrollParent[0].scrollTop + s.scrollSpeed)
                : r.pageY - n.overflowOffset.top < s.scrollSensitivity &&
                  (n.scrollParent[0].scrollTop = c =
                    n.scrollParent[0].scrollTop - s.scrollSpeed)),
            (!s.axis || s.axis !== "y") &&
              (n.overflowOffset.left + n.scrollParent[0].offsetWidth - r.pageX <
              s.scrollSensitivity
                ? (n.scrollParent[0].scrollLeft = c =
                    n.scrollParent[0].scrollLeft + s.scrollSpeed)
                : r.pageX - n.overflowOffset.left < s.scrollSensitivity &&
                  (n.scrollParent[0].scrollLeft = c =
                    n.scrollParent[0].scrollLeft - s.scrollSpeed)))
          : ((!s.axis || s.axis !== "x") &&
              (r.pageY - t(document).scrollTop() < s.scrollSensitivity
                ? (c = t(document).scrollTop(
                    t(document).scrollTop() - s.scrollSpeed
                  ))
                : t(window).height() - (r.pageY - t(document).scrollTop()) <
                    s.scrollSensitivity &&
                  (c = t(document).scrollTop(
                    t(document).scrollTop() + s.scrollSpeed
                  ))),
            (!s.axis || s.axis !== "y") &&
              (r.pageX - t(document).scrollLeft() < s.scrollSensitivity
                ? (c = t(document).scrollLeft(
                    t(document).scrollLeft() - s.scrollSpeed
                  ))
                : t(window).width() - (r.pageX - t(document).scrollLeft()) <
                    s.scrollSensitivity &&
                  (c = t(document).scrollLeft(
                    t(document).scrollLeft() + s.scrollSpeed
                  )))),
          c !== !1 &&
            t.ui.ddmanager &&
            !s.dropBehaviour &&
            t.ui.ddmanager.prepareOffsets(n, r);
      },
    }),
    t.ui.plugin.add("draggable", "snap", {
      start: function () {
        var r = t(this).data("ui-draggable"),
          n = r.options;
        (r.snapElements = []),
          t(
            n.snap.constructor !== String
              ? n.snap.items || ":data(ui-draggable)"
              : n.snap
          ).each(function () {
            var s = t(this),
              c = s.offset();
            this !== r.element[0] &&
              r.snapElements.push({
                item: this,
                width: s.outerWidth(),
                height: s.outerHeight(),
                top: c.top,
                left: c.left,
              });
          });
      },
      drag: function (r, n) {
        var s,
          c,
          u,
          d,
          g,
          b,
          w,
          S,
          I,
          D,
          k = t(this).data("ui-draggable"),
          C = k.options,
          T = C.snapTolerance,
          a = n.offset.left,
          W = a + k.helperProportions.width,
          H = n.offset.top,
          O = H + k.helperProportions.height;
        for (I = k.snapElements.length - 1; I >= 0; I--) {
          if (
            ((g = k.snapElements[I].left),
            (b = g + k.snapElements[I].width),
            (w = k.snapElements[I].top),
            (S = w + k.snapElements[I].height),
            !(
              (g - T < a && a < b + T && w - T < H && H < S + T) ||
              (g - T < a && a < b + T && w - T < O && O < S + T) ||
              (g - T < W && W < b + T && w - T < H && H < S + T) ||
              (g - T < W && W < b + T && w - T < O && O < S + T)
            ))
          ) {
            k.snapElements[I].snapping &&
              k.options.snap.release &&
              k.options.snap.release.call(
                k.element,
                r,
                t.extend(k._uiHash(), { snapItem: k.snapElements[I].item })
              ),
              (k.snapElements[I].snapping = !1);
            continue;
          }
          C.snapMode !== "inner" &&
            ((s = Math.abs(w - O) <= T),
            (c = Math.abs(S - H) <= T),
            (u = Math.abs(g - W) <= T),
            (d = Math.abs(b - a) <= T),
            s &&
              (n.position.top =
                k._convertPositionTo("relative", {
                  top: w - k.helperProportions.height,
                  left: 0,
                }).top - k.margins.top),
            c &&
              (n.position.top =
                k._convertPositionTo("relative", { top: S, left: 0 }).top -
                k.margins.top),
            u &&
              (n.position.left =
                k._convertPositionTo("relative", {
                  top: 0,
                  left: g - k.helperProportions.width,
                }).left - k.margins.left),
            d &&
              (n.position.left =
                k._convertPositionTo("relative", { top: 0, left: b }).left -
                k.margins.left)),
            (D = s || c || u || d),
            C.snapMode !== "outer" &&
              ((s = Math.abs(w - H) <= T),
              (c = Math.abs(S - O) <= T),
              (u = Math.abs(g - a) <= T),
              (d = Math.abs(b - W) <= T),
              s &&
                (n.position.top =
                  k._convertPositionTo("relative", { top: w, left: 0 }).top -
                  k.margins.top),
              c &&
                (n.position.top =
                  k._convertPositionTo("relative", {
                    top: S - k.helperProportions.height,
                    left: 0,
                  }).top - k.margins.top),
              u &&
                (n.position.left =
                  k._convertPositionTo("relative", { top: 0, left: g }).left -
                  k.margins.left),
              d &&
                (n.position.left =
                  k._convertPositionTo("relative", {
                    top: 0,
                    left: b - k.helperProportions.width,
                  }).left - k.margins.left)),
            !k.snapElements[I].snapping &&
              (s || c || u || d || D) &&
              k.options.snap.snap &&
              k.options.snap.snap.call(
                k.element,
                r,
                t.extend(k._uiHash(), { snapItem: k.snapElements[I].item })
              ),
            (k.snapElements[I].snapping = s || c || u || d || D);
        }
      },
    }),
    t.ui.plugin.add("draggable", "stack", {
      start: function () {
        var r,
          n = this.data("ui-draggable").options,
          s = t.makeArray(t(n.stack)).sort(function (c, u) {
            return (
              (parseInt(t(c).css("zIndex"), 10) || 0) -
              (parseInt(t(u).css("zIndex"), 10) || 0)
            );
          });
        s.length &&
          ((r = parseInt(t(s[0]).css("zIndex"), 10) || 0),
          t(s).each(function (c) {
            t(this).css("zIndex", r + c);
          }),
          this.css("zIndex", r + s.length));
      },
    }),
    t.ui.plugin.add("draggable", "zIndex", {
      start: function (r, n) {
        var s = t(n.helper),
          c = t(this).data("ui-draggable").options;
        s.css("zIndex") && (c._zIndex = s.css("zIndex")),
          s.css("zIndex", c.zIndex);
      },
      stop: function (r, n) {
        var s = t(this).data("ui-draggable").options;
        s._zIndex && t(n.helper).css("zIndex", s._zIndex);
      },
    });
})(Ce);
(function (t, e) {
  function r(n, s, c) {
    return n > s && n < s + c;
  }
  t.widget("ui.droppable", {
    version: "1.10.1",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null,
    },
    _create: function () {
      var n = this.options,
        s = n.accept;
      (this.isover = !1),
        (this.isout = !0),
        (this.accept = t.isFunction(s)
          ? s
          : function (c) {
              return c.is(s);
            }),
        (this.proportions = {
          width: this.element[0].offsetWidth,
          height: this.element[0].offsetHeight,
        }),
        (t.ui.ddmanager.droppables[n.scope] =
          t.ui.ddmanager.droppables[n.scope] || []),
        t.ui.ddmanager.droppables[n.scope].push(this),
        n.addClasses && this.element.addClass("ui-droppable");
    },
    _destroy: function () {
      for (
        var n = 0, s = t.ui.ddmanager.droppables[this.options.scope];
        n < s.length;
        n++
      )
        s[n] === this && s.splice(n, 1);
      this.element.removeClass("ui-droppable ui-droppable-disabled");
    },
    _setOption: function (n, s) {
      n === "accept" &&
        (this.accept = t.isFunction(s)
          ? s
          : function (c) {
              return c.is(s);
            }),
        t.Widget.prototype._setOption.apply(this, arguments);
    },
    _activate: function (n) {
      var s = t.ui.ddmanager.current;
      this.options.activeClass &&
        this.element.addClass(this.options.activeClass),
        s && this._trigger("activate", n, this.ui(s));
    },
    _deactivate: function (n) {
      var s = t.ui.ddmanager.current;
      this.options.activeClass &&
        this.element.removeClass(this.options.activeClass),
        s && this._trigger("deactivate", n, this.ui(s));
    },
    _over: function (n) {
      var s = t.ui.ddmanager.current;
      !s ||
        (s.currentItem || s.element)[0] === this.element[0] ||
        (this.accept.call(this.element[0], s.currentItem || s.element) &&
          (this.options.hoverClass &&
            this.element.addClass(this.options.hoverClass),
          this._trigger("over", n, this.ui(s))));
    },
    _out: function (n) {
      var s = t.ui.ddmanager.current;
      !s ||
        (s.currentItem || s.element)[0] === this.element[0] ||
        (this.accept.call(this.element[0], s.currentItem || s.element) &&
          (this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("out", n, this.ui(s))));
    },
    _drop: function (n, s) {
      var c = s || t.ui.ddmanager.current,
        u = !1;
      return !c ||
        (c.currentItem || c.element)[0] === this.element[0] ||
        (this.element
          .find(":data(ui-droppable)")
          .not(".ui-draggable-dragging")
          .each(function () {
            var d = t.data(this, "ui-droppable");
            if (
              d.options.greedy &&
              !d.options.disabled &&
              d.options.scope === c.options.scope &&
              d.accept.call(d.element[0], c.currentItem || c.element) &&
              t.ui.intersect(
                c,
                t.extend(d, { offset: d.element.offset() }),
                d.options.tolerance
              )
            )
              return (u = !0), !1;
          }),
        u)
        ? !1
        : this.accept.call(this.element[0], c.currentItem || c.element)
          ? (this.options.activeClass &&
              this.element.removeClass(this.options.activeClass),
            this.options.hoverClass &&
              this.element.removeClass(this.options.hoverClass),
            this._trigger("drop", n, this.ui(c)),
            this.element)
          : !1;
    },
    ui: function (n) {
      return {
        draggable: n.currentItem || n.element,
        helper: n.helper,
        position: n.position,
        offset: n.positionAbs,
      };
    },
  }),
    (t.ui.intersect = function (n, s, c) {
      if (!s.offset) return !1;
      var u,
        d,
        g = (n.positionAbs || n.position.absolute).left,
        b = g + n.helperProportions.width,
        w = (n.positionAbs || n.position.absolute).top,
        S = w + n.helperProportions.height,
        I = s.offset.left,
        D = I + s.proportions.width,
        k = s.offset.top,
        C = k + s.proportions.height;
      switch (c) {
        case "fit":
          return I <= g && b <= D && k <= w && S <= C;
        case "intersect":
          return (
            I < g + n.helperProportions.width / 2 &&
            b - n.helperProportions.width / 2 < D &&
            k < w + n.helperProportions.height / 2 &&
            S - n.helperProportions.height / 2 < C
          );
        case "pointer":
          return (
            (u =
              (n.positionAbs || n.position.absolute).left +
              (n.clickOffset || n.offset.click).left),
            (d =
              (n.positionAbs || n.position.absolute).top +
              (n.clickOffset || n.offset.click).top),
            r(d, k, s.proportions.height) && r(u, I, s.proportions.width)
          );
        case "touch":
          return (
            ((w >= k && w <= C) || (S >= k && S <= C) || (w < k && S > C)) &&
            ((g >= I && g <= D) || (b >= I && b <= D) || (g < I && b > D))
          );
        default:
          return !1;
      }
    }),
    (t.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function (n, s) {
        var c,
          u,
          d = t.ui.ddmanager.droppables[n.options.scope] || [],
          g = s ? s.type : null,
          b = (n.currentItem || n.element)
            .find(":data(ui-droppable)")
            .addBack();
        t: for (c = 0; c < d.length; c++)
          if (
            !(
              d[c].options.disabled ||
              (n &&
                !d[c].accept.call(d[c].element[0], n.currentItem || n.element))
            )
          ) {
            for (u = 0; u < b.length; u++)
              if (b[u] === d[c].element[0]) {
                d[c].proportions.height = 0;
                continue t;
              }
            (d[c].visible = d[c].element.css("display") !== "none"),
              d[c].visible &&
                (g === "mousedown" && d[c]._activate.call(d[c], s),
                (d[c].offset = d[c].element.offset()),
                (d[c].proportions = {
                  width: d[c].element[0].offsetWidth,
                  height: d[c].element[0].offsetHeight,
                }));
          }
      },
      drop: function (n, s) {
        var c = !1;
        return (
          t.each(t.ui.ddmanager.droppables[n.options.scope] || [], function () {
            this.options &&
              (!this.options.disabled &&
                this.visible &&
                t.ui.intersect(n, this, this.options.tolerance) &&
                (c = this._drop.call(this, s) || c),
              !this.options.disabled &&
                this.visible &&
                this.accept.call(this.element[0], n.currentItem || n.element) &&
                ((this.isout = !0),
                (this.isover = !1),
                this._deactivate.call(this, s)));
          }),
          c
        );
      },
      dragStart: function (n, s) {
        n.element.parentsUntil("body").bind("scroll.droppable", function () {
          n.options.refreshPositions || t.ui.ddmanager.prepareOffsets(n, s);
        });
      },
      drag: function (n, s) {
        n.options.refreshPositions && t.ui.ddmanager.prepareOffsets(n, s),
          t.each(t.ui.ddmanager.droppables[n.options.scope] || [], function () {
            if (!(this.options.disabled || this.greedyChild || !this.visible)) {
              var c,
                u,
                d,
                g = t.ui.intersect(n, this, this.options.tolerance),
                b =
                  !g && this.isover
                    ? "isout"
                    : g && !this.isover
                      ? "isover"
                      : null;
              b &&
                (this.options.greedy &&
                  ((u = this.options.scope),
                  (d = this.element
                    .parents(":data(ui-droppable)")
                    .filter(function () {
                      return t.data(this, "ui-droppable").options.scope === u;
                    })),
                  d.length &&
                    ((c = t.data(d[0], "ui-droppable")),
                    (c.greedyChild = b === "isover"))),
                c &&
                  b === "isover" &&
                  ((c.isover = !1), (c.isout = !0), c._out.call(c, s)),
                (this[b] = !0),
                (this[b === "isout" ? "isover" : "isout"] = !1),
                this[b === "isover" ? "_over" : "_out"].call(this, s),
                c &&
                  b === "isout" &&
                  ((c.isout = !1), (c.isover = !0), c._over.call(c, s)));
            }
          });
      },
      dragStop: function (n, s) {
        n.element.parentsUntil("body").unbind("scroll.droppable"),
          n.options.refreshPositions || t.ui.ddmanager.prepareOffsets(n, s);
      },
    });
})(Ce);
(function (t, e) {
  function r(n, s, c) {
    return n > s && n < s + c;
  }
  t.widget("ui.sortable", t.ui.mouse, {
    version: "1.10.1",
    widgetEventPrefix: "sort",
    ready: !1,
    options: {
      appendTo: "parent",
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      items: "> *",
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1e3,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null,
    },
    _create: function () {
      var n = this.options;
      (this.containerCache = {}),
        this.element.addClass("ui-sortable"),
        this.refresh(),
        (this.floating = this.items.length
          ? n.axis === "x" ||
            /left|right/.test(this.items[0].item.css("float")) ||
            /inline|table-cell/.test(this.items[0].item.css("display"))
          : !1),
        (this.offset = this.element.offset()),
        this._mouseInit(),
        (this.ready = !0);
    },
    _destroy: function () {
      this.element.removeClass("ui-sortable ui-sortable-disabled"),
        this._mouseDestroy();
      for (var n = this.items.length - 1; n >= 0; n--)
        this.items[n].item.removeData(this.widgetName + "-item");
      return this;
    },
    _setOption: function (n, s) {
      n === "disabled"
        ? ((this.options[n] = s),
          this.widget().toggleClass("ui-sortable-disabled", !!s))
        : t.Widget.prototype._setOption.apply(this, arguments);
    },
    _mouseCapture: function (n, s) {
      var c = null,
        u = !1,
        d = this;
      return this.reverting ||
        this.options.disabled ||
        this.options.type === "static" ||
        (this._refreshItems(n),
        t(n.target)
          .parents()
          .each(function () {
            if (t.data(this, d.widgetName + "-item") === d)
              return (c = t(this)), !1;
          }),
        t.data(n.target, d.widgetName + "-item") === d && (c = t(n.target)),
        !c) ||
        (this.options.handle &&
          !s &&
          (t(this.options.handle, c)
            .find("*")
            .addBack()
            .each(function () {
              this === n.target && (u = !0);
            }),
          !u))
        ? !1
        : ((this.currentItem = c), this._removeCurrentsFromItems(), !0);
    },
    _mouseStart: function (n, s, c) {
      var u,
        d = this.options;
      if (
        ((this.currentContainer = this),
        this.refreshPositions(),
        (this.helper = this._createHelper(n)),
        this._cacheHelperProportions(),
        this._cacheMargins(),
        (this.scrollParent = this.helper.scrollParent()),
        (this.offset = this.currentItem.offset()),
        (this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left,
        }),
        t.extend(this.offset, {
          click: {
            left: n.pageX - this.offset.left,
            top: n.pageY - this.offset.top,
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
        this.helper.css("position", "absolute"),
        (this.cssPosition = this.helper.css("position")),
        (this.originalPosition = this._generatePosition(n)),
        (this.originalPageX = n.pageX),
        (this.originalPageY = n.pageY),
        d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt),
        (this.domPosition = {
          prev: this.currentItem.prev()[0],
          parent: this.currentItem.parent()[0],
        }),
        this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
        this._createPlaceholder(),
        d.containment && this._setContainment(),
        d.cursor &&
          (t("body").css("cursor") &&
            (this._storedCursor = t("body").css("cursor")),
          t("body").css("cursor", d.cursor)),
        d.opacity &&
          (this.helper.css("opacity") &&
            (this._storedOpacity = this.helper.css("opacity")),
          this.helper.css("opacity", d.opacity)),
        d.zIndex &&
          (this.helper.css("zIndex") &&
            (this._storedZIndex = this.helper.css("zIndex")),
          this.helper.css("zIndex", d.zIndex)),
        this.scrollParent[0] !== document &&
          this.scrollParent[0].tagName !== "HTML" &&
          (this.overflowOffset = this.scrollParent.offset()),
        this._trigger("start", n, this._uiHash()),
        this._preserveHelperProportions || this._cacheHelperProportions(),
        !c)
      )
        for (u = this.containers.length - 1; u >= 0; u--)
          this.containers[u]._trigger("activate", n, this._uiHash(this));
      return (
        t.ui.ddmanager && (t.ui.ddmanager.current = this),
        t.ui.ddmanager &&
          !d.dropBehaviour &&
          t.ui.ddmanager.prepareOffsets(this, n),
        (this.dragging = !0),
        this.helper.addClass("ui-sortable-helper"),
        this._mouseDrag(n),
        !0
      );
    },
    _mouseDrag: function (n) {
      var s,
        c,
        u,
        d,
        g = this.options,
        b = !1;
      for (
        this.position = this._generatePosition(n),
          this.positionAbs = this._convertPositionTo("absolute"),
          this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
          this.options.scroll &&
            (this.scrollParent[0] !== document &&
            this.scrollParent[0].tagName !== "HTML"
              ? (this.overflowOffset.top +
                  this.scrollParent[0].offsetHeight -
                  n.pageY <
                g.scrollSensitivity
                  ? (this.scrollParent[0].scrollTop = b =
                      this.scrollParent[0].scrollTop + g.scrollSpeed)
                  : n.pageY - this.overflowOffset.top < g.scrollSensitivity &&
                    (this.scrollParent[0].scrollTop = b =
                      this.scrollParent[0].scrollTop - g.scrollSpeed),
                this.overflowOffset.left +
                  this.scrollParent[0].offsetWidth -
                  n.pageX <
                g.scrollSensitivity
                  ? (this.scrollParent[0].scrollLeft = b =
                      this.scrollParent[0].scrollLeft + g.scrollSpeed)
                  : n.pageX - this.overflowOffset.left < g.scrollSensitivity &&
                    (this.scrollParent[0].scrollLeft = b =
                      this.scrollParent[0].scrollLeft - g.scrollSpeed))
              : (n.pageY - t(document).scrollTop() < g.scrollSensitivity
                  ? (b = t(document).scrollTop(
                      t(document).scrollTop() - g.scrollSpeed
                    ))
                  : t(window).height() - (n.pageY - t(document).scrollTop()) <
                      g.scrollSensitivity &&
                    (b = t(document).scrollTop(
                      t(document).scrollTop() + g.scrollSpeed
                    )),
                n.pageX - t(document).scrollLeft() < g.scrollSensitivity
                  ? (b = t(document).scrollLeft(
                      t(document).scrollLeft() - g.scrollSpeed
                    ))
                  : t(window).width() - (n.pageX - t(document).scrollLeft()) <
                      g.scrollSensitivity &&
                    (b = t(document).scrollLeft(
                      t(document).scrollLeft() + g.scrollSpeed
                    ))),
            b !== !1 &&
              t.ui.ddmanager &&
              !g.dropBehaviour &&
              t.ui.ddmanager.prepareOffsets(this, n)),
          this.positionAbs = this._convertPositionTo("absolute"),
          (!this.options.axis || this.options.axis !== "y") &&
            (this.helper[0].style.left = this.position.left + "px"),
          (!this.options.axis || this.options.axis !== "x") &&
            (this.helper[0].style.top = this.position.top + "px"),
          s = this.items.length - 1;
        s >= 0;
        s--
      )
        if (
          ((c = this.items[s]),
          (u = c.item[0]),
          (d = this._intersectsWithPointer(c)),
          !!d &&
            c.instance === this.currentContainer &&
            u !== this.currentItem[0] &&
            this.placeholder[d === 1 ? "next" : "prev"]()[0] !== u &&
            !t.contains(this.placeholder[0], u) &&
            (this.options.type !== "semi-dynamic" ||
              !t.contains(this.element[0], u)))
        ) {
          if (
            ((this.direction = d === 1 ? "down" : "up"),
            this.options.tolerance === "pointer" ||
              this._intersectsWithSides(c))
          )
            this._rearrange(n, c);
          else break;
          this._trigger("change", n, this._uiHash());
          break;
        }
      return (
        this._contactContainers(n),
        t.ui.ddmanager && t.ui.ddmanager.drag(this, n),
        this._trigger("sort", n, this._uiHash()),
        (this.lastPositionAbs = this.positionAbs),
        !1
      );
    },
    _mouseStop: function (n, s) {
      if (n) {
        if (
          (t.ui.ddmanager &&
            !this.options.dropBehaviour &&
            t.ui.ddmanager.drop(this, n),
          this.options.revert)
        ) {
          var c = this,
            u = this.placeholder.offset();
          (this.reverting = !0),
            t(this.helper).animate(
              {
                left:
                  u.left -
                  this.offset.parent.left -
                  this.margins.left +
                  (this.offsetParent[0] === document.body
                    ? 0
                    : this.offsetParent[0].scrollLeft),
                top:
                  u.top -
                  this.offset.parent.top -
                  this.margins.top +
                  (this.offsetParent[0] === document.body
                    ? 0
                    : this.offsetParent[0].scrollTop),
              },
              parseInt(this.options.revert, 10) || 500,
              function () {
                c._clear(n);
              }
            );
        } else this._clear(n, s);
        return !1;
      }
    },
    cancel: function () {
      if (this.dragging) {
        this._mouseUp({ target: null }),
          this.options.helper === "original"
            ? this.currentItem
                .css(this._storedCSS)
                .removeClass("ui-sortable-helper")
            : this.currentItem.show();
        for (var n = this.containers.length - 1; n >= 0; n--)
          this.containers[n]._trigger("deactivate", null, this._uiHash(this)),
            this.containers[n].containerCache.over &&
              (this.containers[n]._trigger("out", null, this._uiHash(this)),
              (this.containers[n].containerCache.over = 0));
      }
      return (
        this.placeholder &&
          (this.placeholder[0].parentNode &&
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.options.helper !== "original" &&
            this.helper &&
            this.helper[0].parentNode &&
            this.helper.remove(),
          t.extend(this, {
            helper: null,
            dragging: !1,
            reverting: !1,
            _noFinalSort: null,
          }),
          this.domPosition.prev
            ? t(this.domPosition.prev).after(this.currentItem)
            : t(this.domPosition.parent).prepend(this.currentItem)),
        this
      );
    },
    serialize: function (n) {
      var s = this._getItemsAsjQuery(n && n.connected),
        c = [];
      return (
        (n = n || {}),
        t(s).each(function () {
          var u = (t(n.item || this).attr(n.attribute || "id") || "").match(
            n.expression || /(.+)[\-=_](.+)/
          );
          u &&
            c.push(
              (n.key || u[1] + "[]") +
                "=" +
                (n.key && n.expression ? u[1] : u[2])
            );
        }),
        !c.length && n.key && c.push(n.key + "="),
        c.join("&")
      );
    },
    toArray: function (n) {
      var s = this._getItemsAsjQuery(n && n.connected),
        c = [];
      return (
        (n = n || {}),
        s.each(function () {
          c.push(t(n.item || this).attr(n.attribute || "id") || "");
        }),
        c
      );
    },
    _intersectsWith: function (n) {
      var s = this.positionAbs.left,
        c = s + this.helperProportions.width,
        u = this.positionAbs.top,
        d = u + this.helperProportions.height,
        g = n.left,
        b = g + n.width,
        w = n.top,
        S = w + n.height,
        I = this.offset.click.top,
        D = this.offset.click.left,
        k = u + I > w && u + I < S && s + D > g && s + D < b;
      return this.options.tolerance === "pointer" ||
        this.options.forcePointerForContainers ||
        (this.options.tolerance !== "pointer" &&
          this.helperProportions[this.floating ? "width" : "height"] >
            n[this.floating ? "width" : "height"])
        ? k
        : g < s + this.helperProportions.width / 2 &&
            c - this.helperProportions.width / 2 < b &&
            w < u + this.helperProportions.height / 2 &&
            d - this.helperProportions.height / 2 < S;
    },
    _intersectsWithPointer: function (n) {
      var s =
          this.options.axis === "x" ||
          r(this.positionAbs.top + this.offset.click.top, n.top, n.height),
        c =
          this.options.axis === "y" ||
          r(this.positionAbs.left + this.offset.click.left, n.left, n.width),
        u = s && c,
        d = this._getDragVerticalDirection(),
        g = this._getDragHorizontalDirection();
      return u
        ? this.floating
          ? (g && g === "right") || d === "down"
            ? 2
            : 1
          : d && (d === "down" ? 2 : 1)
        : !1;
    },
    _intersectsWithSides: function (n) {
      var s = r(
          this.positionAbs.top + this.offset.click.top,
          n.top + n.height / 2,
          n.height
        ),
        c = r(
          this.positionAbs.left + this.offset.click.left,
          n.left + n.width / 2,
          n.width
        ),
        u = this._getDragVerticalDirection(),
        d = this._getDragHorizontalDirection();
      return this.floating && d
        ? (d === "right" && c) || (d === "left" && !c)
        : u && ((u === "down" && s) || (u === "up" && !s));
    },
    _getDragVerticalDirection: function () {
      var n = this.positionAbs.top - this.lastPositionAbs.top;
      return n !== 0 && (n > 0 ? "down" : "up");
    },
    _getDragHorizontalDirection: function () {
      var n = this.positionAbs.left - this.lastPositionAbs.left;
      return n !== 0 && (n > 0 ? "right" : "left");
    },
    refresh: function (n) {
      return this._refreshItems(n), this.refreshPositions(), this;
    },
    _connectWith: function () {
      var n = this.options;
      return n.connectWith.constructor === String
        ? [n.connectWith]
        : n.connectWith;
    },
    _getItemsAsjQuery: function (n) {
      var s,
        c,
        u,
        d,
        g = [],
        b = [],
        w = this._connectWith();
      if (w && n)
        for (s = w.length - 1; s >= 0; s--)
          for (u = t(w[s]), c = u.length - 1; c >= 0; c--)
            (d = t.data(u[c], this.widgetFullName)),
              d &&
                d !== this &&
                !d.options.disabled &&
                b.push([
                  t.isFunction(d.options.items)
                    ? d.options.items.call(d.element)
                    : t(d.options.items, d.element)
                        .not(".ui-sortable-helper")
                        .not(".ui-sortable-placeholder"),
                  d,
                ]);
      for (
        b.push([
          t.isFunction(this.options.items)
            ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem,
              })
            : t(this.options.items, this.element)
                .not(".ui-sortable-helper")
                .not(".ui-sortable-placeholder"),
          this,
        ]),
          s = b.length - 1;
        s >= 0;
        s--
      )
        b[s][0].each(function () {
          g.push(this);
        });
      return t(g);
    },
    _removeCurrentsFromItems: function () {
      var n = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = t.grep(this.items, function (s) {
        for (var c = 0; c < n.length; c++) if (n[c] === s.item[0]) return !1;
        return !0;
      });
    },
    _refreshItems: function (n) {
      (this.items = []), (this.containers = [this]);
      var s,
        c,
        u,
        d,
        g,
        b,
        w,
        S,
        I = this.items,
        D = [
          [
            t.isFunction(this.options.items)
              ? this.options.items.call(this.element[0], n, {
                  item: this.currentItem,
                })
              : t(this.options.items, this.element),
            this,
          ],
        ],
        k = this._connectWith();
      if (k && this.ready)
        for (s = k.length - 1; s >= 0; s--)
          for (u = t(k[s]), c = u.length - 1; c >= 0; c--)
            (d = t.data(u[c], this.widgetFullName)),
              d &&
                d !== this &&
                !d.options.disabled &&
                (D.push([
                  t.isFunction(d.options.items)
                    ? d.options.items.call(d.element[0], n, {
                        item: this.currentItem,
                      })
                    : t(d.options.items, d.element),
                  d,
                ]),
                this.containers.push(d));
      for (s = D.length - 1; s >= 0; s--)
        for (g = D[s][1], b = D[s][0], c = 0, S = b.length; c < S; c++)
          (w = t(b[c])),
            w.data(this.widgetName + "-item", g),
            I.push({
              item: w,
              instance: g,
              width: 0,
              height: 0,
              left: 0,
              top: 0,
            });
    },
    refreshPositions: function (n) {
      this.offsetParent &&
        this.helper &&
        (this.offset.parent = this._getParentOffset());
      var s, c, u, d;
      for (s = this.items.length - 1; s >= 0; s--)
        (c = this.items[s]),
          !(
            c.instance !== this.currentContainer &&
            this.currentContainer &&
            c.item[0] !== this.currentItem[0]
          ) &&
            ((u = this.options.toleranceElement
              ? t(this.options.toleranceElement, c.item)
              : c.item),
            n || ((c.width = u.outerWidth()), (c.height = u.outerHeight())),
            (d = u.offset()),
            (c.left = d.left),
            (c.top = d.top));
      if (this.options.custom && this.options.custom.refreshContainers)
        this.options.custom.refreshContainers.call(this);
      else
        for (s = this.containers.length - 1; s >= 0; s--)
          (d = this.containers[s].element.offset()),
            (this.containers[s].containerCache.left = d.left),
            (this.containers[s].containerCache.top = d.top),
            (this.containers[s].containerCache.width =
              this.containers[s].element.outerWidth()),
            (this.containers[s].containerCache.height =
              this.containers[s].element.outerHeight());
      return this;
    },
    _createPlaceholder: function (n) {
      n = n || this;
      var s,
        c = n.options;
      (!c.placeholder || c.placeholder.constructor === String) &&
        ((s = c.placeholder),
        (c.placeholder = {
          element: function () {
            var u = t(document.createElement(n.currentItem[0].nodeName))
              .addClass(
                s || n.currentItem[0].className + " ui-sortable-placeholder"
              )
              .removeClass("ui-sortable-helper")[0];
            return s || (u.style.visibility = "hidden"), u;
          },
          update: function (u, d) {
            (s && !c.forcePlaceholderSize) ||
              (d.height() ||
                d.height(
                  n.currentItem.innerHeight() -
                    parseInt(n.currentItem.css("paddingTop") || 0, 10) -
                    parseInt(n.currentItem.css("paddingBottom") || 0, 10)
                ),
              d.width() ||
                d.width(
                  n.currentItem.innerWidth() -
                    parseInt(n.currentItem.css("paddingLeft") || 0, 10) -
                    parseInt(n.currentItem.css("paddingRight") || 0, 10)
                ));
          },
        })),
        (n.placeholder = t(
          c.placeholder.element.call(n.element, n.currentItem)
        )),
        n.currentItem.after(n.placeholder),
        c.placeholder.update(n, n.placeholder);
    },
    _contactContainers: function (n) {
      var s,
        c,
        u,
        d,
        g,
        b,
        w,
        S,
        I,
        D = null,
        k = null;
      for (s = this.containers.length - 1; s >= 0; s--)
        if (!t.contains(this.currentItem[0], this.containers[s].element[0]))
          if (this._intersectsWith(this.containers[s].containerCache)) {
            if (D && t.contains(this.containers[s].element[0], D.element[0]))
              continue;
            (D = this.containers[s]), (k = s);
          } else
            this.containers[s].containerCache.over &&
              (this.containers[s]._trigger("out", n, this._uiHash(this)),
              (this.containers[s].containerCache.over = 0));
      if (D)
        if (this.containers.length === 1)
          this.containers[k]._trigger("over", n, this._uiHash(this)),
            (this.containers[k].containerCache.over = 1);
        else {
          for (
            u = 1e4,
              d = null,
              g = this.containers[k].floating ? "left" : "top",
              b = this.containers[k].floating ? "width" : "height",
              w = this.positionAbs[g] + this.offset.click[g],
              c = this.items.length - 1;
            c >= 0;
            c--
          )
            t.contains(this.containers[k].element[0], this.items[c].item[0]) &&
              this.items[c].item[0] !== this.currentItem[0] &&
              ((S = this.items[c].item.offset()[g]),
              (I = !1),
              Math.abs(S - w) > Math.abs(S + this.items[c][b] - w) &&
                ((I = !0), (S += this.items[c][b])),
              Math.abs(S - w) < u &&
                ((u = Math.abs(S - w)),
                (d = this.items[c]),
                (this.direction = I ? "up" : "down")));
          if (!d && !this.options.dropOnEmpty) return;
          (this.currentContainer = this.containers[k]),
            d
              ? this._rearrange(n, d, null, !0)
              : this._rearrange(n, null, this.containers[k].element, !0),
            this._trigger("change", n, this._uiHash()),
            this.containers[k]._trigger("change", n, this._uiHash(this)),
            this.options.placeholder.update(
              this.currentContainer,
              this.placeholder
            ),
            this.containers[k]._trigger("over", n, this._uiHash(this)),
            (this.containers[k].containerCache.over = 1);
        }
    },
    _createHelper: function (n) {
      var s = this.options,
        c = t.isFunction(s.helper)
          ? t(s.helper.apply(this.element[0], [n, this.currentItem]))
          : s.helper === "clone"
            ? this.currentItem.clone()
            : this.currentItem;
      return (
        c.parents("body").length ||
          t(
            s.appendTo !== "parent"
              ? s.appendTo
              : this.currentItem[0].parentNode
          )[0].appendChild(c[0]),
        c[0] === this.currentItem[0] &&
          (this._storedCSS = {
            width: this.currentItem[0].style.width,
            height: this.currentItem[0].style.height,
            position: this.currentItem.css("position"),
            top: this.currentItem.css("top"),
            left: this.currentItem.css("left"),
          }),
        (!c[0].style.width || s.forceHelperSize) &&
          c.width(this.currentItem.width()),
        (!c[0].style.height || s.forceHelperSize) &&
          c.height(this.currentItem.height()),
        c
      );
    },
    _adjustOffsetFromHelper: function (n) {
      typeof n == "string" && (n = n.split(" ")),
        t.isArray(n) && (n = { left: +n[0], top: +n[1] || 0 }),
        "left" in n && (this.offset.click.left = n.left + this.margins.left),
        "right" in n &&
          (this.offset.click.left =
            this.helperProportions.width - n.right + this.margins.left),
        "top" in n && (this.offset.click.top = n.top + this.margins.top),
        "bottom" in n &&
          (this.offset.click.top =
            this.helperProportions.height - n.bottom + this.margins.top);
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var n = this.offsetParent.offset();
      return (
        this.cssPosition === "absolute" &&
          this.scrollParent[0] !== document &&
          t.contains(this.scrollParent[0], this.offsetParent[0]) &&
          ((n.left += this.scrollParent.scrollLeft()),
          (n.top += this.scrollParent.scrollTop())),
        (this.offsetParent[0] === document.body ||
          (this.offsetParent[0].tagName &&
            this.offsetParent[0].tagName.toLowerCase() === "html" &&
            t.ui.ie)) &&
          (n = { top: 0, left: 0 }),
        {
          top:
            n.top +
            (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
          left:
            n.left +
            (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
        }
      );
    },
    _getRelativeOffset: function () {
      if (this.cssPosition === "relative") {
        var n = this.currentItem.position();
        return {
          top:
            n.top -
            (parseInt(this.helper.css("top"), 10) || 0) +
            this.scrollParent.scrollTop(),
          left:
            n.left -
            (parseInt(this.helper.css("left"), 10) || 0) +
            this.scrollParent.scrollLeft(),
        };
      } else return { top: 0, left: 0 };
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight(),
      };
    },
    _setContainment: function () {
      var n,
        s,
        c,
        u = this.options;
      u.containment === "parent" && (u.containment = this.helper[0].parentNode),
        (u.containment === "document" || u.containment === "window") &&
          (this.containment = [
            0 - this.offset.relative.left - this.offset.parent.left,
            0 - this.offset.relative.top - this.offset.parent.top,
            t(u.containment === "document" ? document : window).width() -
              this.helperProportions.width -
              this.margins.left,
            (t(u.containment === "document" ? document : window).height() ||
              document.body.parentNode.scrollHeight) -
              this.helperProportions.height -
              this.margins.top,
          ]),
        /^(document|window|parent)$/.test(u.containment) ||
          ((n = t(u.containment)[0]),
          (s = t(u.containment).offset()),
          (c = t(n).css("overflow") !== "hidden"),
          (this.containment = [
            s.left +
              (parseInt(t(n).css("borderLeftWidth"), 10) || 0) +
              (parseInt(t(n).css("paddingLeft"), 10) || 0) -
              this.margins.left,
            s.top +
              (parseInt(t(n).css("borderTopWidth"), 10) || 0) +
              (parseInt(t(n).css("paddingTop"), 10) || 0) -
              this.margins.top,
            s.left +
              (c ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) -
              (parseInt(t(n).css("borderLeftWidth"), 10) || 0) -
              (parseInt(t(n).css("paddingRight"), 10) || 0) -
              this.helperProportions.width -
              this.margins.left,
            s.top +
              (c ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) -
              (parseInt(t(n).css("borderTopWidth"), 10) || 0) -
              (parseInt(t(n).css("paddingBottom"), 10) || 0) -
              this.helperProportions.height -
              this.margins.top,
          ]));
    },
    _convertPositionTo: function (n, s) {
      s || (s = this.position);
      var c = n === "absolute" ? 1 : -1,
        u =
          this.cssPosition === "absolute" &&
          !(
            this.scrollParent[0] !== document &&
            t.contains(this.scrollParent[0], this.offsetParent[0])
          )
            ? this.offsetParent
            : this.scrollParent,
        d = /(html|body)/i.test(u[0].tagName);
      return {
        top:
          s.top +
          this.offset.relative.top * c +
          this.offset.parent.top * c -
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollTop()
            : d
              ? 0
              : u.scrollTop()) *
            c,
        left:
          s.left +
          this.offset.relative.left * c +
          this.offset.parent.left * c -
          (this.cssPosition === "fixed"
            ? -this.scrollParent.scrollLeft()
            : d
              ? 0
              : u.scrollLeft()) *
            c,
      };
    },
    _generatePosition: function (n) {
      var s,
        c,
        u = this.options,
        d = n.pageX,
        g = n.pageY,
        b =
          this.cssPosition === "absolute" &&
          !(
            this.scrollParent[0] !== document &&
            t.contains(this.scrollParent[0], this.offsetParent[0])
          )
            ? this.offsetParent
            : this.scrollParent,
        w = /(html|body)/i.test(b[0].tagName);
      return (
        this.cssPosition === "relative" &&
          !(
            this.scrollParent[0] !== document &&
            this.scrollParent[0] !== this.offsetParent[0]
          ) &&
          (this.offset.relative = this._getRelativeOffset()),
        this.originalPosition &&
          (this.containment &&
            (n.pageX - this.offset.click.left < this.containment[0] &&
              (d = this.containment[0] + this.offset.click.left),
            n.pageY - this.offset.click.top < this.containment[1] &&
              (g = this.containment[1] + this.offset.click.top),
            n.pageX - this.offset.click.left > this.containment[2] &&
              (d = this.containment[2] + this.offset.click.left),
            n.pageY - this.offset.click.top > this.containment[3] &&
              (g = this.containment[3] + this.offset.click.top)),
          u.grid &&
            ((s =
              this.originalPageY +
              Math.round((g - this.originalPageY) / u.grid[1]) * u.grid[1]),
            (g = this.containment
              ? s - this.offset.click.top >= this.containment[1] &&
                s - this.offset.click.top <= this.containment[3]
                ? s
                : s - this.offset.click.top >= this.containment[1]
                  ? s - u.grid[1]
                  : s + u.grid[1]
              : s),
            (c =
              this.originalPageX +
              Math.round((d - this.originalPageX) / u.grid[0]) * u.grid[0]),
            (d = this.containment
              ? c - this.offset.click.left >= this.containment[0] &&
                c - this.offset.click.left <= this.containment[2]
                ? c
                : c - this.offset.click.left >= this.containment[0]
                  ? c - u.grid[0]
                  : c + u.grid[0]
              : c))),
        {
          top:
            g -
            this.offset.click.top -
            this.offset.relative.top -
            this.offset.parent.top +
            (this.cssPosition === "fixed"
              ? -this.scrollParent.scrollTop()
              : w
                ? 0
                : b.scrollTop()),
          left:
            d -
            this.offset.click.left -
            this.offset.relative.left -
            this.offset.parent.left +
            (this.cssPosition === "fixed"
              ? -this.scrollParent.scrollLeft()
              : w
                ? 0
                : b.scrollLeft()),
        }
      );
    },
    _rearrange: function (n, s, c, u) {
      c
        ? c[0].appendChild(this.placeholder[0])
        : s.item[0].parentNode.insertBefore(
            this.placeholder[0],
            this.direction === "down" ? s.item[0] : s.item[0].nextSibling
          ),
        (this.counter = this.counter ? ++this.counter : 1);
      var d = this.counter;
      this._delay(function () {
        d === this.counter && this.refreshPositions(!u);
      });
    },
    _clear: function (n, s) {
      this.reverting = !1;
      var c,
        u = [];
      if (
        (!this._noFinalSort &&
          this.currentItem.parent().length &&
          this.placeholder.before(this.currentItem),
        (this._noFinalSort = null),
        this.helper[0] === this.currentItem[0])
      ) {
        for (c in this._storedCSS)
          (this._storedCSS[c] === "auto" || this._storedCSS[c] === "static") &&
            (this._storedCSS[c] = "");
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
      } else this.currentItem.show();
      for (
        this.fromOutside &&
          !s &&
          u.push(function (d) {
            this._trigger("receive", d, this._uiHash(this.fromOutside));
          }),
          (this.fromOutside ||
            this.domPosition.prev !==
              this.currentItem.prev().not(".ui-sortable-helper")[0] ||
            this.domPosition.parent !== this.currentItem.parent()[0]) &&
            !s &&
            u.push(function (d) {
              this._trigger("update", d, this._uiHash());
            }),
          this !== this.currentContainer &&
            (s ||
              (u.push(function (d) {
                this._trigger("remove", d, this._uiHash());
              }),
              u.push(
                function (d) {
                  return function (g) {
                    d._trigger("receive", g, this._uiHash(this));
                  };
                }.call(this, this.currentContainer)
              ),
              u.push(
                function (d) {
                  return function (g) {
                    d._trigger("update", g, this._uiHash(this));
                  };
                }.call(this, this.currentContainer)
              ))),
          c = this.containers.length - 1;
        c >= 0;
        c--
      )
        s ||
          u.push(
            function (d) {
              return function (g) {
                d._trigger("deactivate", g, this._uiHash(this));
              };
            }.call(this, this.containers[c])
          ),
          this.containers[c].containerCache.over &&
            (u.push(
              function (d) {
                return function (g) {
                  d._trigger("out", g, this._uiHash(this));
                };
              }.call(this, this.containers[c])
            ),
            (this.containers[c].containerCache.over = 0));
      if (
        (this._storedCursor && t("body").css("cursor", this._storedCursor),
        this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
        this._storedZIndex &&
          this.helper.css(
            "zIndex",
            this._storedZIndex === "auto" ? "" : this._storedZIndex
          ),
        (this.dragging = !1),
        this.cancelHelperRemoval)
      ) {
        if (!s) {
          for (
            this._trigger("beforeStop", n, this._uiHash()), c = 0;
            c < u.length;
            c++
          )
            u[c].call(this, n);
          this._trigger("stop", n, this._uiHash());
        }
        return (this.fromOutside = !1), !1;
      }
      if (
        (s || this._trigger("beforeStop", n, this._uiHash()),
        this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
        this.helper[0] !== this.currentItem[0] && this.helper.remove(),
        (this.helper = null),
        !s)
      ) {
        for (c = 0; c < u.length; c++) u[c].call(this, n);
        this._trigger("stop", n, this._uiHash());
      }
      return (this.fromOutside = !1), !0;
    },
    _trigger: function () {
      t.Widget.prototype._trigger.apply(this, arguments) === !1 &&
        this.cancel();
    },
    _uiHash: function (n) {
      var s = n || this;
      return {
        helper: s.helper,
        placeholder: s.placeholder || t([]),
        position: s.position,
        originalPosition: s.originalPosition,
        offset: s.positionAbs,
        item: s.currentItem,
        sender: n ? n.element : null,
      };
    },
  });
})(Ce);
/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */ (function (t) {
  if (((t.support.touch = "ontouchend" in document), !t.support.touch)) return;
  var e = t.ui.mouse.prototype,
    r = e._mouseInit,
    n;
  function s(c, u) {
    if (!(c.originalEvent.touches.length > 1)) {
      c.preventDefault();
      var d = c.originalEvent.changedTouches[0],
        g = document.createEvent("MouseEvents");
      g.initMouseEvent(
        u,
        !0,
        !0,
        window,
        1,
        d.screenX,
        d.screenY,
        d.clientX,
        d.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        c.target.dispatchEvent(g);
    }
  }
  (e._touchStart = function (c) {
    var u = this;
    n ||
      !u._mouseCapture(c.originalEvent.changedTouches[0]) ||
      ((n = !0),
      (u._touchMoved = !1),
      s(c, "mouseover"),
      s(c, "mousemove"),
      s(c, "mousedown"));
  }),
    (e._touchMove = function (c) {
      n && ((this._touchMoved = !0), s(c, "mousemove"));
    }),
    (e._touchEnd = function (c) {
      n &&
        (s(c, "mouseup"),
        s(c, "mouseout"),
        this._touchMoved || s(c, "click"),
        (n = !1));
    }),
    (e._mouseInit = function () {
      var c = this;
      c.element
        .bind("touchstart", t.proxy(c, "_touchStart"))
        .bind("touchmove", t.proxy(c, "_touchMove"))
        .bind("touchend", t.proxy(c, "_touchEnd")),
        r.call(c);
    });
})(Ce);
const Gl = {},
  Jl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Gl },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Zl = Kl(Jl);
Zl.EventEmitter;
var $l = Object.defineProperty,
  tc = (t, e, r) =>
    e in t
      ? $l(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[e] = r),
  ec = (t, e, r) => (tc(t, typeof e != "symbol" ? e + "" : e, r), r);
const Wn = (() => {
    const t = {};
    let e = 1;
    return {
      set(r, n, s) {
        typeof r[n] > "u" && ((r[n] = { key: n, id: e }), e++),
          (t[r[n].id] = s);
      },
      get(r, n) {
        if (!r || typeof r[n] > "u") return null;
        const s = r[n];
        return s.key === n ? t[s.id] : null;
      },
      delete(r, n) {
        if (typeof r[n] > "u") return;
        const s = r[n];
        s.key === n && (delete t[s.id], delete r[n]);
      },
    };
  })(),
  At = {
    setData(t, e, r) {
      Wn.set(t, e, r);
    },
    getData(t, e) {
      return Wn.get(t, e);
    },
    removeData(t, e) {
      Wn.delete(t, e);
    },
  },
  ic = 1e6,
  nc = 1e3,
  tr = "transitionend",
  rc = (t) =>
    t == null
      ? `${t}`
      : {}.toString
          .call(t)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  io = (t) => {
    do t += Math.floor(Math.random() * ic);
    while (document.getElementById(t));
    return t;
  },
  no = (t) => {
    let e = t.getAttribute("data-te-target");
    if (!e || e === "#") {
      let r = t.getAttribute("href");
      if (!r || (!r.includes("#") && !r.startsWith("."))) return null;
      r.includes("#") && !r.startsWith("#") && (r = `#${r.split("#")[1]}`),
        (e = r && r !== "#" ? r.trim() : null);
    }
    return e;
  },
  ro = (t) => {
    const e = no(t);
    return e && document.querySelector(e) ? e : null;
  },
  yn = (t) => {
    const e = no(t);
    return e ? document.querySelector(e) : null;
  },
  sc = (t) => {
    if (!t) return 0;
    let { transitionDuration: e, transitionDelay: r } =
      window.getComputedStyle(t);
    const n = Number.parseFloat(e),
      s = Number.parseFloat(r);
    return !n && !s
      ? 0
      : ((e = e.split(",")[0]),
        (r = r.split(",")[0]),
        (Number.parseFloat(e) + Number.parseFloat(r)) * nc);
  },
  oc = (t) => {
    t.dispatchEvent(new Event(tr));
  },
  so = (t) =>
    !t || typeof t != "object"
      ? !1
      : (typeof t.jquery < "u" && (t = t[0]), typeof t.nodeType < "u"),
  bn = (t) =>
    so(t)
      ? t.jquery
        ? t[0]
        : t
      : typeof t == "string" && t.length > 0
        ? document.querySelector(t)
        : null,
  Ee = (t, e, r) => {
    Object.keys(r).forEach((n) => {
      const s = r[n],
        c = e[n],
        u = c && so(c) ? "element" : rc(c);
      if (!new RegExp(s).test(u))
        throw new Error(
          `${t.toUpperCase()}: Option "${n}" provided type "${u}" but expected type "${s}".`
        );
    });
  },
  De = (t) => {
    if (!t || t.getClientRects().length === 0) return !1;
    if (t.style && t.parentNode && t.parentNode.style) {
      const e = getComputedStyle(t),
        r = getComputedStyle(t.parentNode);
      return (
        getComputedStyle(t).getPropertyValue("visibility") === "visible" ||
        (e.display !== "none" &&
          r.display !== "none" &&
          e.visibility !== "hidden")
      );
    }
    return !1;
  },
  Cr = (t) =>
    !t || t.nodeType !== Node.ELEMENT_NODE || t.classList.contains("disabled")
      ? !0
      : typeof t.disabled < "u"
        ? t.disabled
        : t.hasAttribute("disabled") && t.getAttribute("disabled") !== "false",
  oo = (t) => {
    t.offsetHeight;
  },
  ao = () => {
    const { jQuery: t } = window;
    return t && !document.body.hasAttribute("data-te-no-jquery") ? t : null;
  },
  Rn = [],
  ac = (t) => {
    document.readyState === "loading"
      ? (Rn.length ||
          document.addEventListener("DOMContentLoaded", () => {
            Rn.forEach((e) => e());
          }),
        Rn.push(t))
      : t();
  },
  Vt = () => document.documentElement.dir === "rtl",
  lc = (t) => Array.from(t),
  lo = (t) => document.createElement(t),
  Pe = (t) => {
    typeof t == "function" && t();
  },
  co = (t, e, r = !0) => {
    if (!r) {
      Pe(t);
      return;
    }
    const n = 5,
      s = sc(e) + n;
    let c = !1;
    const u = ({ target: d }) => {
      d === e && ((c = !0), e.removeEventListener(tr, u), Pe(t));
    };
    e.addEventListener(tr, u),
      setTimeout(() => {
        c || oc(e);
      }, s);
  },
  cc = /[^.]*(?=\..*)\.|.*/,
  uc = /\..*/,
  hc = /::\d+$/,
  Bn = {};
let ws = 1;
const fc = { mouseenter: "mouseover", mouseleave: "mouseout" },
  dc = /^(mouseenter|mouseleave)/i,
  uo = new Set([
    "click",
    "dblclick",
    "mouseup",
    "mousedown",
    "contextmenu",
    "mousewheel",
    "DOMMouseScroll",
    "mouseover",
    "mouseout",
    "mousemove",
    "selectstart",
    "selectend",
    "keydown",
    "keypress",
    "keyup",
    "orientationchange",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointerleave",
    "pointercancel",
    "gesturestart",
    "gesturechange",
    "gestureend",
    "focus",
    "blur",
    "change",
    "reset",
    "select",
    "submit",
    "focusin",
    "focusout",
    "load",
    "unload",
    "beforeunload",
    "resize",
    "move",
    "DOMContentLoaded",
    "readystatechange",
    "error",
    "abort",
    "scroll",
  ]);
function ho(t, e) {
  return (e && `${e}::${ws++}`) || t.uidEvent || ws++;
}
function fo(t) {
  const e = ho(t);
  return (t.uidEvent = e), (Bn[e] = Bn[e] || {}), Bn[e];
}
function pc(t, e) {
  return function r(n) {
    return (
      (n.delegateTarget = t), r.oneOff && Z.off(t, n.type, e), e.apply(t, [n])
    );
  };
}
function gc(t, e, r) {
  return function n(s) {
    const c = t.querySelectorAll(e);
    for (let { target: u } = s; u && u !== this; u = u.parentNode)
      for (let d = c.length; d--; "")
        if (c[d] === u)
          return (
            (s.delegateTarget = u),
            n.oneOff && Z.off(t, s.type, r),
            r.apply(u, [s])
          );
    return null;
  };
}
function po(t, e, r = null) {
  const n = Object.keys(t);
  for (let s = 0, c = n.length; s < c; s++) {
    const u = t[n[s]];
    if (u.originalHandler === e && u.delegationSelector === r) return u;
  }
  return null;
}
function go(t, e, r) {
  const n = typeof e == "string",
    s = n ? r : e;
  let c = mo(t);
  return uo.has(c) || (c = t), [n, s, c];
}
function Es(t, e, r, n, s) {
  if (typeof e != "string" || !t) return;
  if ((r || ((r = n), (n = null)), dc.test(e))) {
    const D = (k) =>
      function (C) {
        if (
          !C.relatedTarget ||
          (C.relatedTarget !== C.delegateTarget &&
            !C.delegateTarget.contains(C.relatedTarget))
        )
          return k.call(this, C);
      };
    n ? (n = D(n)) : (r = D(r));
  }
  const [c, u, d] = go(e, r, n),
    g = fo(t),
    b = g[d] || (g[d] = {}),
    w = po(b, u, c ? r : null);
  if (w) {
    w.oneOff = w.oneOff && s;
    return;
  }
  const S = ho(u, e.replace(cc, "")),
    I = c ? gc(t, r, n) : pc(t, r);
  (I.delegationSelector = c ? r : null),
    (I.originalHandler = u),
    (I.oneOff = s),
    (I.uidEvent = S),
    (b[S] = I),
    t.addEventListener(d, I, c);
}
function er(t, e, r, n, s) {
  const c = po(e[r], n, s);
  c && (t.removeEventListener(r, c, !!s), delete e[r][c.uidEvent]);
}
function mc(t, e, r, n) {
  const s = e[r] || {};
  Object.keys(s).forEach((c) => {
    if (c.includes(n)) {
      const u = s[c];
      er(t, e, r, u.originalHandler, u.delegationSelector);
    }
  });
}
function mo(t) {
  return (t = t.replace(uc, "")), fc[t] || t;
}
const Z = {
    on(t, e, r, n) {
      Es(t, e, r, n, !1);
    },
    one(t, e, r, n) {
      Es(t, e, r, n, !0);
    },
    off(t, e, r, n) {
      if (typeof e != "string" || !t) return;
      const [s, c, u] = go(e, r, n),
        d = u !== e,
        g = fo(t),
        b = e.startsWith(".");
      if (typeof c < "u") {
        if (!g || !g[u]) return;
        er(t, g, u, c, s ? r : null);
        return;
      }
      b &&
        Object.keys(g).forEach((S) => {
          mc(t, g, S, e.slice(1));
        });
      const w = g[u] || {};
      Object.keys(w).forEach((S) => {
        const I = S.replace(hc, "");
        if (!d || e.includes(I)) {
          const D = w[S];
          er(t, g, u, D.originalHandler, D.delegationSelector);
        }
      });
    },
    trigger(t, e, r) {
      if (typeof e != "string" || !t) return null;
      const n = ao(),
        s = mo(e),
        c = e !== s,
        u = uo.has(s);
      let d,
        g = !0,
        b = !0,
        w = !1,
        S = null;
      return (
        c &&
          n &&
          ((d = n.Event(e, r)),
          n(t).trigger(d),
          (g = !d.isPropagationStopped()),
          (b = !d.isImmediatePropagationStopped()),
          (w = d.isDefaultPrevented())),
        u
          ? ((S = document.createEvent("HTMLEvents")), S.initEvent(s, g, !0))
          : (S = new CustomEvent(e, { bubbles: g, cancelable: !0 })),
        typeof r < "u" &&
          Object.keys(r).forEach((I) => {
            Object.defineProperty(S, I, {
              get() {
                return r[I];
              },
            });
          }),
        w && S.preventDefault(),
        b && t.dispatchEvent(S),
        S.defaultPrevented && typeof d < "u" && d.preventDefault(),
        S
      );
    },
  },
  vc = "5.1.3";
class yc {
  constructor(e) {
    (e = bn(e)),
      e &&
        ((this._element = e),
        At.setData(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    At.removeData(this._element, this.constructor.DATA_KEY),
      Z.off(this._element, this.constructor.EVENT_KEY),
      Object.getOwnPropertyNames(this).forEach((e) => {
        this[e] = null;
      });
  }
  _queueCallback(e, r, n = !0) {
    co(e, r, n);
  }
  static getInstance(e) {
    return At.getData(bn(e), this.DATA_KEY);
  }
  static getOrCreateInstance(e, r = {}) {
    return this.getInstance(e) || new this(e, typeof r == "object" ? r : null);
  }
  static get VERSION() {
    return vc;
  }
  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }
  static get DATA_KEY() {
    return `te.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
}
function jn(t) {
  return t === "true"
    ? !0
    : t === "false"
      ? !1
      : t === Number(t).toString()
        ? Number(t)
        : t === "" || t === "null"
          ? null
          : t;
}
function zn(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
const J = {
  setDataAttribute(t, e, r) {
    t.setAttribute(`data-te-${zn(e)}`, r);
  },
  removeDataAttribute(t, e) {
    t.removeAttribute(`data-te-${zn(e)}`);
  },
  getDataAttributes(t) {
    if (!t) return {};
    const e = {};
    return (
      Object.keys(t.dataset)
        .filter((r) => r.startsWith("te"))
        .forEach((r) => {
          if (r.startsWith("teClass")) return;
          let n = r.replace(/^te/, "");
          (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
            (e[n] = jn(t.dataset[r]));
        }),
      e
    );
  },
  getDataClassAttributes(t) {
    if (!t) return {};
    const e = { ...t.dataset };
    return (
      Object.keys(e)
        .filter((r) => r.startsWith("teClass"))
        .forEach((r) => {
          let n = r.replace(/^teClass/, "");
          (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
            (e[n] = jn(e[r]));
        }),
      e
    );
  },
  getDataAttribute(t, e) {
    return jn(t.getAttribute(`data-te-${zn(e)}`));
  },
  offset(t) {
    const e = t.getBoundingClientRect();
    return {
      top: e.top + document.body.scrollTop,
      left: e.left + document.body.scrollLeft,
    };
  },
  position(t) {
    return { top: t.offsetTop, left: t.offsetLeft };
  },
  style(t, e) {
    Object.assign(t.style, e);
  },
  toggleClass(t, e) {
    t &&
      Fn(e).forEach((r) => {
        t.classList.contains(r) ? t.classList.remove(r) : t.classList.add(r);
      });
  },
  addClass(t, e) {
    Fn(e).forEach((r) => !t.classList.contains(r) && t.classList.add(r));
  },
  addStyle(t, e) {
    Object.keys(e).forEach((r) => {
      t.style[r] = e[r];
    });
  },
  removeClass(t, e) {
    Fn(e).forEach((r) => t.classList.contains(r) && t.classList.remove(r));
  },
  hasClass(t, e) {
    return t.classList.contains(e);
  },
  maxOffset(t) {
    const e = t.getBoundingClientRect();
    return {
      top:
        e.top +
        Math.max(
          document.body.scrollTop,
          document.documentElement.scrollTop,
          window.scrollY
        ),
      left:
        e.left +
        Math.max(
          document.body.scrollLeft,
          document.documentElement.scrollLeft,
          window.scrollX
        ),
    };
  },
};
function Fn(t) {
  return typeof t == "string" ? t.split(" ") : Array.isArray(t) ? t : !1;
}
const bc = 3,
  nt = {
    closest(t, e) {
      return t.closest(e);
    },
    matches(t, e) {
      return t.matches(e);
    },
    find(t, e = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(e, t));
    },
    findOne(t, e = document.documentElement) {
      return Element.prototype.querySelector.call(e, t);
    },
    children(t, e) {
      return [].concat(...t.children).filter((r) => r.matches(e));
    },
    parents(t, e) {
      const r = [];
      let n = t.parentNode;
      for (; n && n.nodeType === Node.ELEMENT_NODE && n.nodeType !== bc; )
        this.matches(n, e) && r.push(n), (n = n.parentNode);
      return r;
    },
    prev(t, e) {
      let r = t.previousElementSibling;
      for (; r; ) {
        if (r.matches(e)) return [r];
        r = r.previousElementSibling;
      }
      return [];
    },
    next(t, e) {
      let r = t.nextElementSibling;
      for (; r; ) {
        if (this.matches(r, e)) return [r];
        r = r.nextElementSibling;
      }
      return [];
    },
    focusableChildren(t) {
      const e = [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "details",
        "[tabindex]",
        '[contenteditable="true"]',
      ]
        .map((r) => `${r}:not([tabindex^="-"])`)
        .join(", ");
      return this.find(e, t).filter((r) => !Cr(r) && De(r));
    },
  };
Vt();
Vt();
Vt();
Vt();
Vt();
Vt();
const Xn = "collapse",
  vo = "te.collapse",
  xn = `.${vo}`,
  xs = { toggle: !0, parent: null },
  _c = { toggle: "boolean", parent: "(null|element)" },
  wc = `show${xn}`,
  Ec = `shown${xn}`,
  xc = `hide${xn}`,
  Cc = `hidden${xn}`,
  Yn = "data-te-collapse-show",
  Cs = "data-te-collapse-collapsed",
  Ki = "data-te-collapse-collapsing",
  Tc = "data-te-collapse-horizontal",
  Ye = "data-te-collapse-item",
  Ts = `:scope [${Ye}] [${Ye}]`,
  kc = "width",
  Ac = "height",
  Sc =
    "[data-te-collapse-item][data-te-collapse-show], [data-te-collapse-item][data-te-collapse-collapsing]",
  ks = "[data-te-collapse-init]",
  Lc = {
    visible: "!visible",
    hidden: "hidden",
    baseTransition:
      "overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
    collapsing:
      "h-0 transition-[height] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
    collapsingHorizontal:
      "w-0 h-auto transition-[width] overflow-hidden duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
  },
  Ic = {
    visible: "string",
    hidden: "string",
    baseTransition: "string",
    collapsing: "string",
    collapsingHorizontal: "string",
  };
class _e extends yc {
  constructor(e, r, n) {
    super(e),
      (this._isTransitioning = !1),
      (this._config = this._getConfig(r)),
      (this._classes = this._getClasses(n)),
      (this._triggerArray = []);
    const s = nt.find(ks);
    for (let c = 0, u = s.length; c < u; c++) {
      const d = s[c],
        g = ro(d),
        b = nt.find(g).filter((w) => w === this._element);
      g !== null &&
        b.length &&
        ((this._selector = g), this._triggerArray.push(d));
    }
    this._initializeChildren(),
      this._config.parent ||
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
      this._config.toggle && this.toggle();
  }
  static get Default() {
    return xs;
  }
  static get NAME() {
    return Xn;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let e = [],
      r;
    if (this._config.parent) {
      const g = nt.find(Ts, this._config.parent);
      e = nt.find(Sc, this._config.parent).filter((b) => !g.includes(b));
    }
    const n = nt.findOne(this._selector);
    if (e.length) {
      const g = e.find((b) => n !== b);
      if (((r = g ? _e.getInstance(g) : null), r && r._isTransitioning)) return;
    }
    if (Z.trigger(this._element, wc).defaultPrevented) return;
    e.forEach((g) => {
      n !== g && _e.getOrCreateInstance(g, { toggle: !1 }).hide(),
        r || At.setData(g, vo, null);
    });
    const s = this._getDimension(),
      c =
        s === "height"
          ? this._classes.collapsing
          : this._classes.collapsingHorizontal;
    J.removeClass(this._element, this._classes.visible),
      J.removeClass(this._element, this._classes.hidden),
      J.addClass(this._element, c),
      this._element.removeAttribute(Ye),
      this._element.setAttribute(Ki, ""),
      (this._element.style[s] = 0),
      this._addAriaAndCollapsedClass(this._triggerArray, !0),
      (this._isTransitioning = !0);
    const u = () => {
        (this._isTransitioning = !1),
          J.removeClass(this._element, this._classes.hidden),
          J.removeClass(this._element, c),
          J.addClass(this._element, this._classes.visible),
          this._element.removeAttribute(Ki),
          this._element.setAttribute(Ye, ""),
          this._element.setAttribute(Yn, ""),
          (this._element.style[s] = ""),
          Z.trigger(this._element, Ec);
      },
      d = `scroll${s[0].toUpperCase() + s.slice(1)}`;
    this._queueCallback(u, this._element, !0),
      (this._element.style[s] = `${this._element[d]}px`);
  }
  hide() {
    if (
      this._isTransitioning ||
      !this._isShown() ||
      Z.trigger(this._element, xc).defaultPrevented
    )
      return;
    const e = this._getDimension(),
      r =
        e === "height"
          ? this._classes.collapsing
          : this._classes.collapsingHorizontal;
    (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`),
      oo(this._element),
      J.addClass(this._element, r),
      J.removeClass(this._element, this._classes.visible),
      J.removeClass(this._element, this._classes.hidden),
      this._element.setAttribute(Ki, ""),
      this._element.removeAttribute(Ye),
      this._element.removeAttribute(Yn);
    const n = this._triggerArray.length;
    for (let c = 0; c < n; c++) {
      const u = this._triggerArray[c],
        d = yn(u);
      d && !this._isShown(d) && this._addAriaAndCollapsedClass([u], !1);
    }
    this._isTransitioning = !0;
    const s = () => {
      (this._isTransitioning = !1),
        J.removeClass(this._element, r),
        J.addClass(this._element, this._classes.visible),
        J.addClass(this._element, this._classes.hidden),
        this._element.removeAttribute(Ki),
        this._element.setAttribute(Ye, ""),
        Z.trigger(this._element, Cc);
    };
    (this._element.style[e] = ""), this._queueCallback(s, this._element, !0);
  }
  _isShown(e = this._element) {
    return e.hasAttribute(Yn);
  }
  _getConfig(e) {
    return (
      (e = { ...xs, ...J.getDataAttributes(this._element), ...e }),
      (e.toggle = !!e.toggle),
      (e.parent = bn(e.parent)),
      Ee(Xn, e, _c),
      e
    );
  }
  _getClasses(e) {
    const r = J.getDataClassAttributes(this._element);
    return (e = { ...Lc, ...r, ...e }), Ee(Xn, e, Ic), e;
  }
  _getDimension() {
    return this._element.hasAttribute(Tc) ? kc : Ac;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const e = nt.find(Ts, this._config.parent);
    nt.find(ks, this._config.parent)
      .filter((r) => !e.includes(r))
      .forEach((r) => {
        const n = yn(r);
        n && this._addAriaAndCollapsedClass([r], this._isShown(n));
      });
  }
  _addAriaAndCollapsedClass(e, r) {
    e.length &&
      e.forEach((n) => {
        r ? n.removeAttribute(Cs) : n.setAttribute(`${Cs}`, ""),
          n.setAttribute("aria-expanded", r);
      });
  }
  static jQueryInterface(e) {
    return this.each(function () {
      const r = {};
      typeof e == "string" && /show|hide/.test(e) && (r.toggle = !1);
      const n = _e.getOrCreateInstance(this, r);
      if (typeof e == "string") {
        if (typeof n[e] > "u") throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
const Pc = {
    isVisible: !0,
    isAnimated: !1,
    rootElement: "body",
    clickCallback: null,
    backdropClasses: null,
  },
  Oc = {
    isVisible: "boolean",
    isAnimated: "boolean",
    rootElement: "(element|string)",
    clickCallback: "(function|null)",
    backdropClasses: "(array|string|null)",
  },
  yo = "backdrop",
  As = `mousedown.te.${yo}`;
class Dc {
  constructor(e) {
    (this._config = this._getConfig(e)),
      (this._isAppended = !1),
      (this._element = null);
  }
  show(e) {
    if (!this._config.isVisible) {
      Pe(e);
      return;
    }
    this._append(), this._config.isAnimated && oo(this._getElement());
    const r = this._config.backdropClasses || [
      "opacity-50",
      "transition-all",
      "duration-300",
      "ease-in-out",
      "fixed",
      "top-0",
      "left-0",
      "z-[1040]",
      "bg-black",
      "w-screen",
      "h-screen",
    ];
    J.removeClass(this._getElement(), "opacity-0"),
      J.addClass(this._getElement(), r),
      this._element.setAttribute("data-te-backdrop-show", ""),
      this._emulateAnimation(() => {
        Pe(e);
      });
  }
  hide(e) {
    if (!this._config.isVisible) {
      Pe(e);
      return;
    }
    this._element.removeAttribute("data-te-backdrop-show"),
      this._getElement().classList.add("opacity-0"),
      this._getElement().classList.remove("opacity-50"),
      this._emulateAnimation(() => {
        this.dispose(), Pe(e);
      });
  }
  _getElement() {
    if (!this._element) {
      const e = document.createElement("div");
      (e.className = this._config.className),
        this._config.isAnimated && e.classList.add("opacity-50"),
        (this._element = e);
    }
    return this._element;
  }
  _getConfig(e) {
    return (
      (e = { ...Pc, ...(typeof e == "object" ? e : {}) }),
      (e.rootElement = bn(e.rootElement)),
      Ee(yo, e, Oc),
      e
    );
  }
  _append() {
    this._isAppended ||
      (this._config.rootElement.append(this._getElement()),
      Z.on(this._getElement(), As, () => {
        Pe(this._config.clickCallback);
      }),
      (this._isAppended = !0));
  }
  dispose() {
    this._isAppended &&
      (Z.off(this._element, As),
      this._element.remove(),
      (this._isAppended = !1));
  }
  _emulateAnimation(e) {
    co(e, this._getElement(), this._config.isAnimated);
  }
}
class Hc {
  constructor(e, r = {}, n) {
    (this._element = e),
      (this._toggler = n),
      (this._event = r.event || "blur"),
      (this._condition = r.condition || (() => !0)),
      (this._selector =
        r.selector ||
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      (this._onlyVisible = r.onlyVisible || !1),
      (this._focusableElements = []),
      (this._firstElement = null),
      (this._lastElement = null),
      (this.handler = (s) => {
        this._condition(s) && !s.shiftKey && s.target === this._lastElement
          ? (s.preventDefault(), this._firstElement.focus())
          : this._condition(s) &&
            s.shiftKey &&
            s.target === this._firstElement &&
            (s.preventDefault(), this._lastElement.focus());
      });
  }
  trap() {
    this._setElements(), this._init(), this._setFocusTrap();
  }
  disable() {
    this._focusableElements.forEach((e) => {
      e.removeEventListener(this._event, this.handler);
    }),
      this._toggler && this._toggler.focus();
  }
  update() {
    this._setElements(), this._setFocusTrap();
  }
  _init() {
    const e = (r) => {
      !this._firstElement ||
        r.key !== "Tab" ||
        this._focusableElements.includes(r.target) ||
        (r.preventDefault(),
        this._firstElement.focus(),
        window.removeEventListener("keydown", e));
    };
    window.addEventListener("keydown", e);
  }
  _filterVisible(e) {
    return e.filter((r) => {
      if (!De(r)) return !1;
      const n = nt.parents(r, "*");
      for (let s = 0; s < n.length; s++) {
        const c = window.getComputedStyle(n[s]);
        if (c && (c.display === "none" || c.visibility === "hidden")) return !1;
      }
      return !0;
    });
  }
  _setElements() {
    (this._focusableElements = nt.focusableChildren(this._element)),
      this._onlyVisible &&
        (this._focusableElements = this._filterVisible(
          this._focusableElements
        )),
      (this._firstElement = this._focusableElements[0]),
      (this._lastElement =
        this._focusableElements[this._focusableElements.length - 1]);
  }
  _setFocusTrap() {
    this._focusableElements.forEach((e, r) => {
      r === this._focusableElements.length - 1 || r === 0
        ? e.addEventListener(this._event, this.handler)
        : e.removeEventListener(this._event, this.handler);
    });
  }
}
Vt(), Vt();
(() => {
  var t = {
      454: (n, s, c) => {
        c.d(s, { Z: () => g });
        var u = c(645),
          d = c.n(u)()(function (b) {
            return b[1];
          });
        d.push([
          n.id,
          "INPUT:-webkit-autofill,SELECT:-webkit-autofill,TEXTAREA:-webkit-autofill{animation-name:onautofillstart}INPUT:not(:-webkit-autofill),SELECT:not(:-webkit-autofill),TEXTAREA:not(:-webkit-autofill){animation-name:onautofillcancel}@keyframes onautofillstart{}@keyframes onautofillcancel{}",
          "",
        ]);
        const g = d;
      },
      645: (n) => {
        n.exports = function (s) {
          var c = [];
          return (
            (c.toString = function () {
              return this.map(function (u) {
                var d = s(u);
                return u[2] ? "@media ".concat(u[2], " {").concat(d, "}") : d;
              }).join("");
            }),
            (c.i = function (u, d, g) {
              typeof u == "string" && (u = [[null, u, ""]]);
              var b = {};
              if (g)
                for (var w = 0; w < this.length; w++) {
                  var S = this[w][0];
                  S != null && (b[S] = !0);
                }
              for (var I = 0; I < u.length; I++) {
                var D = [].concat(u[I]);
                (g && b[D[0]]) ||
                  (d &&
                    (D[2]
                      ? (D[2] = "".concat(d, " and ").concat(D[2]))
                      : (D[2] = d)),
                  c.push(D));
              }
            }),
            c
          );
        };
      },
      810: () => {
        (function () {
          if (typeof window < "u")
            try {
              var n = new window.CustomEvent("test", { cancelable: !0 });
              if ((n.preventDefault(), n.defaultPrevented !== !0))
                throw new Error("Could not prevent default");
            } catch {
              var s = function (c, u) {
                var d, g;
                return (
                  ((u = u || {}).bubbles = !!u.bubbles),
                  (u.cancelable = !!u.cancelable),
                  (d = document.createEvent("CustomEvent")).initCustomEvent(
                    c,
                    u.bubbles,
                    u.cancelable,
                    u.detail
                  ),
                  (g = d.preventDefault),
                  (d.preventDefault = function () {
                    g.call(this);
                    try {
                      Object.defineProperty(this, "defaultPrevented", {
                        get: function () {
                          return !0;
                        },
                      });
                    } catch {
                      this.defaultPrevented = !0;
                    }
                  }),
                  d
                );
              };
              (s.prototype = window.Event.prototype), (window.CustomEvent = s);
            }
        })();
      },
      379: (n, s, c) => {
        var u,
          d = (function () {
            var H = {};
            return function (O) {
              if (H[O] === void 0) {
                var B = document.querySelector(O);
                if (
                  window.HTMLIFrameElement &&
                  B instanceof window.HTMLIFrameElement
                )
                  try {
                    B = B.contentDocument.head;
                  } catch {
                    B = null;
                  }
                H[O] = B;
              }
              return H[O];
            };
          })(),
          g = [];
        function b(H) {
          for (var O = -1, B = 0; B < g.length; B++)
            if (g[B].identifier === H) {
              O = B;
              break;
            }
          return O;
        }
        function w(H, O) {
          for (var B = {}, Y = [], U = 0; U < H.length; U++) {
            var tt = H[U],
              Q = O.base ? tt[0] + O.base : tt[0],
              it = B[Q] || 0,
              G = "".concat(Q, " ").concat(it);
            B[Q] = it + 1;
            var ut = b(G),
              lt = { css: tt[1], media: tt[2], sourceMap: tt[3] };
            ut !== -1
              ? (g[ut].references++, g[ut].updater(lt))
              : g.push({ identifier: G, updater: W(lt, O), references: 1 }),
              Y.push(G);
          }
          return Y;
        }
        function S(H) {
          var O = document.createElement("style"),
            B = H.attributes || {};
          if (B.nonce === void 0) {
            var Y = c.nc;
            Y && (B.nonce = Y);
          }
          if (
            (Object.keys(B).forEach(function (tt) {
              O.setAttribute(tt, B[tt]);
            }),
            typeof H.insert == "function")
          )
            H.insert(O);
          else {
            var U = d(H.insert || "head");
            if (!U)
              throw new Error(
                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
              );
            U.appendChild(O);
          }
          return O;
        }
        var I,
          D =
            ((I = []),
            function (H, O) {
              return (
                (I[H] = O),
                I.filter(Boolean).join(`
`)
              );
            });
        function k(H, O, B, Y) {
          var U = B
            ? ""
            : Y.media
              ? "@media ".concat(Y.media, " {").concat(Y.css, "}")
              : Y.css;
          if (H.styleSheet) H.styleSheet.cssText = D(O, U);
          else {
            var tt = document.createTextNode(U),
              Q = H.childNodes;
            Q[O] && H.removeChild(Q[O]),
              Q.length ? H.insertBefore(tt, Q[O]) : H.appendChild(tt);
          }
        }
        function C(H, O, B) {
          var Y = B.css,
            U = B.media,
            tt = B.sourceMap;
          if (
            (U ? H.setAttribute("media", U) : H.removeAttribute("media"),
            tt &&
              typeof btoa < "u" &&
              (Y += `
/*# sourceMappingURL=data:application/json;base64,`.concat(
                btoa(unescape(encodeURIComponent(JSON.stringify(tt)))),
                " */"
              )),
            H.styleSheet)
          )
            H.styleSheet.cssText = Y;
          else {
            for (; H.firstChild; ) H.removeChild(H.firstChild);
            H.appendChild(document.createTextNode(Y));
          }
        }
        var T = null,
          a = 0;
        function W(H, O) {
          var B, Y, U;
          if (O.singleton) {
            var tt = a++;
            (B = T || (T = S(O))),
              (Y = k.bind(null, B, tt, !1)),
              (U = k.bind(null, B, tt, !0));
          } else
            (B = S(O)),
              (Y = C.bind(null, B, O)),
              (U = function () {
                (function (Q) {
                  if (Q.parentNode === null) return !1;
                  Q.parentNode.removeChild(Q);
                })(B);
              });
          return (
            Y(H),
            function (Q) {
              if (Q) {
                if (
                  Q.css === H.css &&
                  Q.media === H.media &&
                  Q.sourceMap === H.sourceMap
                )
                  return;
                Y((H = Q));
              } else U();
            }
          );
        }
        n.exports = function (H, O) {
          (O = O || {}).singleton ||
            typeof O.singleton == "boolean" ||
            (O.singleton =
              (u === void 0 &&
                (u = !!(window && document && document.all && !window.atob)),
              u));
          var B = w((H = H || []), O);
          return function (Y) {
            if (
              ((Y = Y || []),
              Object.prototype.toString.call(Y) === "[object Array]")
            ) {
              for (var U = 0; U < B.length; U++) {
                var tt = b(B[U]);
                g[tt].references--;
              }
              for (var Q = w(Y, O), it = 0; it < B.length; it++) {
                var G = b(B[it]);
                g[G].references === 0 && (g[G].updater(), g.splice(G, 1));
              }
              B = Q;
            }
          };
        };
      },
    },
    e = {};
  function r(n) {
    var s = e[n];
    if (s !== void 0) return s.exports;
    var c = (e[n] = { id: n, exports: {} });
    return t[n](c, c.exports, r), c.exports;
  }
  (r.n = (n) => {
    var s = n && n.__esModule ? () => n.default : () => n;
    return r.d(s, { a: s }), s;
  }),
    (r.d = (n, s) => {
      for (var c in s)
        r.o(s, c) &&
          !r.o(n, c) &&
          Object.defineProperty(n, c, { enumerable: !0, get: s[c] });
    }),
    (r.o = (n, s) => Object.prototype.hasOwnProperty.call(n, s)),
    (() => {
      var n = r(379),
        s = r.n(n),
        c = r(454);
      function u(g) {
        if (!g.hasAttribute("autocompleted")) {
          g.setAttribute("autocompleted", "");
          var b = new window.CustomEvent("onautocomplete", {
            bubbles: !0,
            cancelable: !0,
            detail: null,
          });
          g.dispatchEvent(b) || (g.value = "");
        }
      }
      function d(g) {
        g.hasAttribute("autocompleted") &&
          (g.removeAttribute("autocompleted"),
          g.dispatchEvent(
            new window.CustomEvent("onautocomplete", {
              bubbles: !0,
              cancelable: !1,
              detail: null,
            })
          ));
      }
      s()(c.Z, { insert: "head", singleton: !1 }),
        c.Z.locals,
        r(810),
        document.addEventListener(
          "animationstart",
          function (g) {
            g.animationName === "onautofillstart" ? u(g.target) : d(g.target);
          },
          !0
        ),
        document.addEventListener(
          "input",
          function (g) {
            g.inputType !== "insertReplacementText" && "data" in g
              ? d(g.target)
              : u(g.target);
          },
          !0
        );
    })();
})();
const Nc = { property: "color", defaultValue: null, inherit: !0 },
  ze = (t, e) => {
    const { property: r, defaultValue: n, inherit: s } = { ...Nc, ...e },
      c = document.createElement("div");
    c.classList.add(t), document.body.appendChild(c);
    const u = window.getComputedStyle(c)[r] || n,
      d = window.getComputedStyle(c.parentElement)[r];
    return document.body.removeChild(c), !s && d && u === d ? n : u || n;
  },
  qn = "ripple",
  Qi = "te.ripple",
  Mc =
    "rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%",
  Wc = ["[data-te-ripple-init]"],
  Vn = [0, 0, 0],
  Rc = [
    {
      name: "primary",
      gradientColor: ze("text-primary", {
        defaultValue: "#3B71CA",
        inherit: !1,
      }),
    },
    {
      name: "secondary",
      gradientColor: ze("text-secondary", {
        defaultValue: "#9FA6B2",
        inherit: !1,
      }),
    },
    {
      name: "success",
      gradientColor: ze("text-success", {
        defaultValue: "#14A44D",
        inherit: !1,
      }),
    },
    {
      name: "danger",
      gradientColor: ze("text-danger", {
        defaultValue: "#DC4C64",
        inherit: !1,
      }),
    },
    {
      name: "warning",
      gradientColor: ze("text-warning", {
        defaultValue: "#E4A11B",
        inherit: !1,
      }),
    },
    {
      name: "info",
      gradientColor: ze("text-info", { defaultValue: "#54B4D3", inherit: !1 }),
    },
    { name: "light", gradientColor: "#fbfbfb" },
    { name: "dark", gradientColor: "#262626" },
  ],
  Ss = 0.5,
  Bc = {
    rippleCentered: !1,
    rippleColor: "",
    rippleColorDark: "",
    rippleDuration: "500ms",
    rippleRadius: 0,
    rippleUnbound: !1,
  },
  jc = {
    rippleCentered: "boolean",
    rippleColor: "string",
    rippleColorDark: "string",
    rippleDuration: "string",
    rippleRadius: "number",
    rippleUnbound: "boolean",
  },
  zc = {
    ripple: "relative overflow-hidden inline-block align-bottom",
    rippleWave:
      "rounded-[50%] opacity-50 pointer-events-none absolute touch-none scale-0 transition-[transform,_opacity] ease-[cubic-bezier(0,0,0.15,1),_cubic-bezier(0,0,0.15,1)] z-[999]",
    unbound: "overflow-visible",
  },
  Fc = { ripple: "string", rippleWave: "string", unbound: "string" };
class _n {
  constructor(e, r, n) {
    (this._element = e),
      (this._options = this._getConfig(r)),
      (this._classes = this._getClasses(n)),
      this._element &&
        (At.setData(e, Qi, this),
        J.addClass(this._element, this._classes.ripple)),
      (this._clickHandler = this._createRipple.bind(this)),
      (this._rippleTimer = null),
      (this._isMinWidthSet = !1),
      (this._initialClasses = null),
      this.init();
  }
  static get NAME() {
    return qn;
  }
  init() {
    this._addClickEvent(this._element);
  }
  dispose() {
    At.removeData(this._element, Qi),
      Z.off(this._element, "click", this._clickHandler),
      (this._element = null),
      (this._options = null);
  }
  _autoInit(e) {
    Wc.forEach((r) => {
      nt.closest(e.target, r) && (this._element = nt.closest(e.target, r));
    }),
      this._element.style.minWidth ||
        (J.style(this._element, {
          "min-width": getComputedStyle(this._element).width,
        }),
        (this._isMinWidthSet = !0)),
      (this._options = this._getConfig()),
      (this._classes = this._getClasses()),
      (this._initialClasses = [...this._element.classList]),
      J.addClass(this._element, this._classes.ripple),
      this._createRipple(e);
  }
  _addClickEvent(e) {
    Z.on(e, "mousedown", this._clickHandler);
  }
  _createRipple(e) {
    this._element.className.indexOf(this._classes.ripple) < 0 &&
      J.addClass(this._element, this._classes.ripple);
    const { layerX: r, layerY: n } = e,
      s = e.offsetX || r,
      c = e.offsetY || n,
      u = this._element.offsetHeight,
      d = this._element.offsetWidth,
      g = this._durationToMsNumber(this._options.rippleDuration),
      b = {
        offsetX: this._options.rippleCentered ? u / 2 : s,
        offsetY: this._options.rippleCentered ? d / 2 : c,
        height: u,
        width: d,
      },
      w = this._getDiameter(b),
      S = this._options.rippleRadius || w / 2,
      I = { delay: g * Ss, duration: g - g * Ss },
      D = {
        left: this._options.rippleCentered ? `${d / 2 - S}px` : `${s - S}px`,
        top: this._options.rippleCentered ? `${u / 2 - S}px` : `${c - S}px`,
        height: `${this._options.rippleRadius * 2 || w}px`,
        width: `${this._options.rippleRadius * 2 || w}px`,
        transitionDelay: `0s, ${I.delay}ms`,
        transitionDuration: `${g}ms, ${I.duration}ms`,
      },
      k = lo("div");
    this._createHTMLRipple({ wrapper: this._element, ripple: k, styles: D }),
      this._removeHTMLRipple({ ripple: k, duration: g });
  }
  _createHTMLRipple({ wrapper: e, ripple: r, styles: n }) {
    Object.keys(n).forEach((s) => (r.style[s] = n[s])),
      J.addClass(r, this._classes.rippleWave),
      r.setAttribute("data-te-ripple-ref", ""),
      this._addColor(r, e),
      this._toggleUnbound(e),
      this._appendRipple(r, e);
  }
  _removeHTMLRipple({ ripple: e, duration: r }) {
    this._rippleTimer &&
      (clearTimeout(this._rippleTimer), (this._rippleTimer = null)),
      e &&
        setTimeout(() => {
          e.classList.add("!opacity-0");
        }, 10),
      (this._rippleTimer = setTimeout(() => {
        if (e && (e.remove(), this._element)) {
          nt.find("[data-te-ripple-ref]", this._element).forEach((s) => {
            s.remove();
          }),
            this._isMinWidthSet &&
              (J.style(this._element, { "min-width": "" }),
              (this._isMinWidthSet = !1));
          const n = this._initialClasses
            ? this._addedNewRippleClasses(
                this._classes.ripple,
                this._initialClasses
              )
            : this._classes.ripple.split(" ");
          J.removeClass(this._element, n);
        }
      }, r));
  }
  _addedNewRippleClasses(e, r) {
    return e.split(" ").filter((n) => r.findIndex((s) => n === s) === -1);
  }
  _durationToMsNumber(e) {
    return Number(e.replace("ms", "").replace("s", "000"));
  }
  _getConfig(e = {}) {
    const r = J.getDataAttributes(this._element);
    return (e = { ...Bc, ...r, ...e }), Ee(qn, e, jc), e;
  }
  _getClasses(e = {}) {
    const r = J.getDataClassAttributes(this._element);
    return (e = { ...zc, ...r, ...e }), Ee(qn, e, Fc), e;
  }
  _getDiameter({ offsetX: e, offsetY: r, height: n, width: s }) {
    const c = r <= n / 2,
      u = e <= s / 2,
      d = (I, D) => Math.sqrt(I ** 2 + D ** 2),
      g = r === n / 2 && e === s / 2,
      b = {
        first: c === !0 && u === !1,
        second: c === !0 && u === !0,
        third: c === !1 && u === !0,
        fourth: c === !1 && u === !1,
      },
      w = {
        topLeft: d(e, r),
        topRight: d(s - e, r),
        bottomLeft: d(e, n - r),
        bottomRight: d(s - e, n - r),
      };
    let S = 0;
    return (
      g || b.fourth
        ? (S = w.topLeft)
        : b.third
          ? (S = w.topRight)
          : b.second
            ? (S = w.bottomRight)
            : b.first && (S = w.bottomLeft),
      S * 2
    );
  }
  _appendRipple(e, r) {
    r.appendChild(e),
      setTimeout(() => {
        J.addClass(e, "opacity-0 scale-100");
      }, 50);
  }
  _toggleUnbound(e) {
    this._options.rippleUnbound === !0
      ? J.addClass(e, this._classes.unbound)
      : J.removeClass(e, this._classes.unbound);
  }
  _addColor(e) {
    let r = this._options.rippleColor || "rgb(0,0,0)";
    (localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)) &&
      (r = this._options.rippleColorDark || this._options.rippleColor);
    const n = Rc.find((u) => u.name === r.toLowerCase()),
      s = n
        ? this._colorToRGB(n.gradientColor).join(",")
        : this._colorToRGB(r).join(","),
      c = Mc.split("{{color}}").join(`${s}`);
    e.style.backgroundImage = `radial-gradient(circle, ${c})`;
  }
  _colorToRGB(e) {
    function r(c) {
      return (
        c.length < 7 && (c = `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`),
        [
          parseInt(c.substr(1, 2), 16),
          parseInt(c.substr(3, 2), 16),
          parseInt(c.substr(5, 2), 16),
        ]
      );
    }
    function n(c) {
      const u = document.body.appendChild(document.createElement("fictum")),
        d = "rgb(1, 2, 3)";
      return (
        (u.style.color = d),
        u.style.color !== d ||
        ((u.style.color = c), u.style.color === d || u.style.color === "")
          ? Vn
          : ((c = getComputedStyle(u).color), document.body.removeChild(u), c)
      );
    }
    function s(c) {
      return (c = c.match(/[.\d]+/g).map((u) => +Number(u))), (c.length = 3), c;
    }
    return e.toLowerCase() === "transparent"
      ? Vn
      : e[0] === "#"
        ? r(e)
        : (e.indexOf("rgb") === -1 && (e = n(e)),
          e.indexOf("rgb") === 0 ? s(e) : Vn);
  }
  static autoInitial(e) {
    return function (r) {
      e._autoInit(r);
    };
  }
  static jQueryInterface(e) {
    return this.each(function () {
      return At.getData(this, Qi) ? null : new _n(this, e);
    });
  }
  static getInstance(e) {
    return At.getData(e, Qi);
  }
  static getOrCreateInstance(e, r = {}) {
    return this.getInstance(e) || new this(e, typeof r == "object" ? r : null);
  }
}
const Xc = 13,
  Yc = 27,
  qc = 9,
  Vc = { threshold: 10, direction: "all" };
let Uc = class {
    constructor(t, e) {
      (this._element = t),
        (this._startPosition = null),
        (this._options = { ...Vc, ...e });
    }
    handleTouchStart(t) {
      this._startPosition = this._getCoordinates(t);
    }
    handleTouchMove(t) {
      if (!this._startPosition) return;
      const e = this._getCoordinates(t),
        r = { x: e.x - this._startPosition.x, y: e.y - this._startPosition.y },
        n = this._getDirection(r);
      if (this._options.direction === "all") {
        if (
          n.y.value < this._options.threshold &&
          n.x.value < this._options.threshold
        )
          return;
        const c = n.y.value > n.x.value ? n.y.direction : n.x.direction;
        Z.trigger(this._element, `swipe${c}`),
          Z.trigger(this._element, "swipe", { direction: c }),
          (this._startPosition = null);
        return;
      }
      const s =
        this._options.direction === "left" || this._options === "right"
          ? "x"
          : "y";
      n[s].direction === this._options.direction &&
        n[s].value > this._options.threshold &&
        (Z.trigger(this._element, `swipe${n[s].direction}`),
        (this._startPosition = null));
    }
    handleTouchEnd() {
      this._startPosition = null;
    }
    _getCoordinates(t) {
      const [e] = t.touches;
      return { x: e.clientX, y: e.clientY };
    }
    _getDirection(t) {
      return {
        x: { direction: t.x < 0 ? "left" : "right", value: Math.abs(t.x) },
        y: { direction: t.y < 0 ? "up" : "down", value: Math.abs(t.y) },
      };
    }
  },
  Kc = class {
    constructor(t, e = "swipe", r = {}) {
      (this._element = t),
        (this._event = e),
        (this.swipe = new Uc(t, r)),
        (this._touchStartHandler = this._handleTouchStart.bind(this)),
        (this._touchMoveHandler = this._handleTouchMove.bind(this)),
        (this._touchEndHandler = this._handleTouchEnd.bind(this));
    }
    dispose() {
      this._element.removeEventListener("touchstart", this._touchStartHandler),
        this._element.removeEventListener("touchmove", this._touchMoveHandler),
        window.removeEventListener("touchend", this._touchEndHandler);
    }
    init() {
      this._element.addEventListener("touchstart", (t) =>
        this._handleTouchStart(t)
      ),
        this._element.addEventListener("touchmove", (t) =>
          this._handleTouchMove(t)
        ),
        window.addEventListener("touchend", (t) => this._handleTouchEnd(t));
    }
    _handleTouchStart(t) {
      this[this._event].handleTouchStart(t);
    }
    _handleTouchMove(t) {
      this[this._event].handleTouchMove(t);
    }
    _handleTouchEnd(t) {
      this[this._event].handleTouchEnd(t);
    }
  };
const Ls = "sidenav",
  Gi = "te.sidenav",
  Qc = "data-te-sidenav-rotate-icon-ref",
  Un = "[data-te-sidenav-toggle-ref]",
  Gc = "[data-te-collapse-init]",
  Jc = '[data-te-sidenav-slim="true"]',
  Zc = '[data-te-sidenav-slim="false"]',
  $c = "[data-te-sidenav-menu-ref]",
  Fe = "[data-te-sidenav-collapse-ref]",
  ci = "[data-te-sidenav-link-ref]",
  tu = Vt() ? 100 : -100,
  eu = Vt() ? -100 : 100,
  iu = {
    sidenavAccordion: "(boolean)",
    sidenavBackdrop: "(boolean)",
    sidenavBackdropClass: "(null|string)",
    sidenavCloseOnEsc: "(boolean)",
    sidenavColor: "(string)",
    sidenavContent: "(null|string)",
    sidenavExpandable: "(boolean)",
    sidenavExpandOnHover: "(boolean)",
    sidenavFocusTrap: "(boolean)",
    sidenavHidden: "(boolean)",
    sidenavMode: "(string)",
    sidenavModeBreakpointOver: "(null|string|number)",
    sidenavModeBreakpointSide: "(null|string|number)",
    sidenavModeBreakpointPush: "(null|string|number)",
    sidenavBreakpointSm: "(number)",
    sidenavBreakpointMd: "(number)",
    sidenavBreakpointLg: "(number)",
    sidenavBreakpointXl: "(number)",
    sidenavBreakpoint2xl: "(number)",
    sidenavScrollContainer: "(null|string)",
    sidenavSlim: "(boolean)",
    sidenavSlimCollapsed: "(boolean)",
    sidenavSlimWidth: "(number)",
    sidenavPosition: "(string)",
    sidenavRight: "(boolean)",
    sidenavTransitionDuration: "(number)",
    sidenavWidth: "(number)",
  },
  nu = {
    sidenavAccordion: !1,
    sidenavBackdrop: !0,
    sidenavBackdropClass: null,
    sidenavCloseOnEsc: !0,
    sidenavColor: "primary",
    sidenavContent: null,
    sidenavExpandable: !0,
    sidenavExpandOnHover: !1,
    sidenavFocusTrap: !0,
    sidenavHidden: !0,
    sidenavMode: "over",
    sidenavModeBreakpointOver: null,
    sidenavModeBreakpointSide: null,
    sidenavModeBreakpointPush: null,
    sidenavBreakpointSm: 640,
    sidenavBreakpointMd: 768,
    sidenavBreakpointLg: 1024,
    sidenavBreakpointXl: 1280,
    sidenavBreakpoint2xl: 1536,
    sidenavScrollContainer: null,
    sidenavSlim: !1,
    sidenavSlimCollapsed: !1,
    sidenavSlimWidth: 77,
    sidenavPosition: "fixed",
    sidenavRight: !1,
    sidenavTransitionDuration: 300,
    sidenavWidth: 240,
  };
class qe {
  constructor(e, r = {}) {
    ec(this, "_addBackdropOnInit", () => {
      this._options.sidenavHidden ||
        (this._backdrop.show(),
        Z.off(this._element, "transitionend", this._addBackdropOnInit));
    }),
      (this._element = e),
      (this._options = r),
      (this._ID = io("")),
      (this._content = null),
      (this._initialContentStyle = null),
      (this._slimCollapsed = !1),
      (this._activeNode = null),
      (this._tempSlim = !1),
      (this._backdrop = this._initializeBackDrop()),
      (this._focusTrap = null),
      (this._perfectScrollbar = null),
      (this._touch = null),
      this._setModeFromBreakpoints(),
      (this.escHandler = (n) => {
        n.keyCode === Yc &&
          this.toggler &&
          De(this.toggler) &&
          (this._update(!1), Z.off(window, "keydown", this.escHandler));
      }),
      (this.hashHandler = () => {
        this._setActiveElements();
      }),
      e && (At.setData(e, Gi, this), this._setup()),
      this.options.sidenavBackdrop &&
        !this.options.sidenavHidden &&
        this.options.sidenavMode === "over" &&
        Z.on(this._element, "transitionend", this._addBackdropOnInit),
      (this._didInit = !1),
      this._init();
  }
  static get NAME() {
    return Ls;
  }
  get container() {
    if (this.options.sidenavPosition === "fixed") return nt.findOne("body");
    const e = (r) =>
      !r.parentNode || r.parentNode === document
        ? r
        : r.parentNode.style.position === "relative" ||
            r.parentNode.classList.contains("relative")
          ? r.parentNode
          : e(r.parentNode);
    return e(this._element);
  }
  get isVisible() {
    let e = 0,
      r = window.innerWidth;
    if (this.options.sidenavPosition !== "fixed") {
      const s = this.container.getBoundingClientRect();
      (e = s.x), (r = s.x + s.width);
    }
    const { x: n } = this._element.getBoundingClientRect();
    if (
      (this.options.sidenavRight && !Vt()) ||
      (!this.options.sidenavRight && Vt())
    ) {
      let s = 0;
      if (
        (this.container.scrollHeight > this.container.clientHeight &&
          (s = this.container.offsetWidth - this.container.clientWidth),
        this.container.tagName === "BODY")
      ) {
        const c = document.documentElement.clientWidth;
        s = Math.abs(window.innerWidth - c);
      }
      return Math.abs(n + s - r) > 10;
    }
    return Math.abs(n - e) < 10;
  }
  get links() {
    return nt.find(ci, this._element);
  }
  get navigation() {
    return nt.find($c, this._element);
  }
  get options() {
    const e = {
      ...nu,
      ...J.getDataAttributes(this._element),
      ...this._options,
    };
    return Ee(Ls, e, iu), e;
  }
  get sidenavStyle() {
    return {
      width: `${this.width}px`,
      height: this.options.sidenavPosition === "fixed" ? "100vh" : "100%",
      position: this.options.sidenavPosition,
      transition: `all ${this.transitionDuration} linear`,
    };
  }
  get toggler() {
    return nt.find(Un).find((e) => {
      const r = J.getDataAttribute(e, "target");
      return nt.findOne(r) === this._element;
    });
  }
  get transitionDuration() {
    return `${this.options.sidenavTransitionDuration / 1e3}s`;
  }
  get translation() {
    return this.options.sidenavRight ? eu : tu;
  }
  get width() {
    return this._slimCollapsed
      ? this.options.sidenavSlimWidth
      : this.options.sidenavWidth;
  }
  get isBackdropVisible() {
    return !!this._backdrop._element;
  }
  changeMode(e) {
    this._setMode(e);
  }
  dispose() {
    Z.off(window, "keydown", this.escHandler),
      this.options.sidenavBackdrop && this._backdrop.dispose(),
      Z.off(window, "hashchange", this.hashHandler),
      this._touch.dispose(),
      At.removeData(this._element, Gi),
      (this._element = null);
  }
  hide() {
    this._emitEvents(!1),
      this._update(!1),
      this._options.sidenavBackdrop &&
        this.isBackdropVisible &&
        this._backdrop.hide();
  }
  show() {
    this._emitEvents(!0),
      this._update(!0),
      this._options.sidenavBackdrop &&
        this._options.sidenavMode === "over" &&
        this._backdrop.show();
  }
  toggle() {
    this._emitEvents(!this.isVisible), this._update(!this.isVisible);
  }
  toggleSlim() {
    this._setSlim(!this._slimCollapsed);
  }
  update(e) {
    (this._options = e), this._setup();
  }
  getBreakpoint(e) {
    return this._transformBreakpointValuesToObject()[e];
  }
  _init() {
    this._didInit ||
      (Z.on(document, "click", Un, qe.toggleSidenav()), (this._didInit = !0));
  }
  _transformBreakpointValuesToObject() {
    return {
      sm: this.options.sidenavBreakpointSm,
      md: this.options.sidenavBreakpointMd,
      lg: this.options.sidenavBreakpointLg,
      xl: this.options.sidenavBreakpointXl,
      "2xl": this.options.sidenavBreakpoint2xl,
    };
  }
  _setModeFromBreakpoints() {
    const e = window.innerWidth,
      r = this._transformBreakpointValuesToObject();
    if (e === void 0 || !r) return;
    const n =
        typeof this.options.sidenavModeBreakpointOver == "number"
          ? e - this.options.sidenavModeBreakpointOver
          : e - r[this.options.sidenavModeBreakpointOver],
      s =
        typeof this.options.sidenavModeBreakpointSide == "number"
          ? e - this.options.sidenavModeBreakpointSide
          : e - r[this.options.sidenavModeBreakpointSide],
      c =
        typeof this.options.sidenavModeBreakpointPush == "number"
          ? e - this.options.sidenavModeBreakpointPush
          : e - r[this.options.sidenavModeBreakpointPush],
      u = (g, b) => (g - b < 0 ? -1 : b - g < 0 ? 1 : 0),
      d = [n, s, c].filter((g) => g != null && g >= 0).sort(u)[0];
    n > 0 && n === d
      ? ((this._options.sidenavMode = "over"),
        (this._options.sidenavHidden = !0))
      : s > 0 && s === d
        ? (this._options.sidenavMode = "side")
        : c > 0 && c === d && (this._options.sidenavMode = "push");
  }
  _collapseItems() {
    this.navigation.forEach((e) => {
      nt.find(Fe, e).forEach((r) => {
        _e.getInstance(r).hide();
      });
    });
  }
  _getOffsetValue(e, { index: r, property: n, offsets: s }) {
    const c = this._getPxValue(this._initialContentStyle[r][s[n].property]),
      u = e ? s[n].value : 0;
    return c + u;
  }
  _getProperty(...e) {
    return e
      .map((r, n) => (n === 0 ? r : r[0].toUpperCase().concat(r.slice(1))))
      .join("");
  }
  _getPxValue(e) {
    return e ? parseFloat(e) : 0;
  }
  _handleSwipe(e, r) {
    r &&
    this._slimCollapsed &&
    this.options.sidenavSlim &&
    this.options.sidenavExpandable
      ? this.toggleSlim()
      : r ||
        (this._slimCollapsed ||
        !this.options.sidenavSlim ||
        !this.options.sidenavExpandable
          ? this.toggler && De(this.toggler) && this.toggle()
          : this.toggleSlim());
  }
  _isActive(e, r) {
    return r
      ? r === e
      : e.attributes.href
        ? new URL(e, window.location.href).href === window.location.href
        : !1;
  }
  _isAllToBeCollapsed() {
    return (
      nt
        .find(Gc, this._element)
        .filter((e) => e.getAttribute("aria-expanded") === "true").length === 0
    );
  }
  _isAllCollapsed() {
    return nt.find(Fe, this._element).filter((e) => De(e)).length === 0;
  }
  _initializeBackDrop() {
    if (!this.options.sidenavBackdrop) return;
    const e = this.options.sidenavBackdropClass
      ? this.options.sidenavBackdropClass.split(" ")
      : this.options.sidenavPosition
        ? [
            "opacity-50",
            "transition-all",
            "duration-300",
            "ease-in-out",
            this.options.sidenavPosition,
            "top-0",
            "left-0",
            "z-50",
            "bg-black/10",
            "dark:bg-black-60",
            "w-full",
            "h-full",
            this._element.id,
          ]
        : null;
    return new Dc({
      isVisible: this.options.sidenavBackdrop,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      backdropClasses: e,
      clickCallback: () => this.hide(),
    });
  }
  _updateBackdrop(e) {
    if (this.options.sidenavMode === "over") {
      e
        ? this._backdrop.show()
        : this.isBackdropVisible && this._backdrop.hide();
      return;
    }
    this.isBackdropVisible && this._backdrop.hide();
  }
  _setup() {
    this._setupTouch(),
      this.options.sidenavFocusTrap && this._setupFocusTrap(),
      this._setupCollapse(),
      this.options.sidenavSlim && this._setupSlim(),
      this._setupInitialStyling(),
      this._setupScrolling(),
      this.options.sidenavContent && this._setupContent(),
      this._setupActiveState(),
      this._setupRippleEffect(),
      this.options.sidenavHidden || this._updateOffsets(!0, !0),
      this.options.sidenavMode === "over" && this._setTabindex(!0);
  }
  _setupActiveState() {
    this._setActiveElements(),
      this.links.forEach((e) => {
        Z.on(e, "click", () => this._setActiveElements(e)),
          Z.on(e, "keydown", (r) => {
            r.keyCode === Xc && this._setActiveElements(e);
          });
      }),
      Z.on(window, "hashchange", this.hashHandler);
  }
  _setupCollapse() {
    this.navigation.forEach((e, r) => {
      nt.find(Fe, e).forEach((n, s) =>
        this._setupCollapseList({ list: n, index: s, menu: e, menuIndex: r })
      );
    });
  }
  _generateCollpaseID(e, r) {
    return `sidenav-collapse-${this._ID}-${r}-${e}`;
  }
  _setupCollapseList({ list: e, index: r, menu: n, menuIndex: s }) {
    const c = this._generateCollpaseID(r, s);
    e.setAttribute("id", c), e.setAttribute("data-te-collapse-item", "");
    const [u] = nt.prev(e, ci);
    J.setDataAttribute(u, "collapse-init", ""),
      u.setAttribute("href", `#${c}`),
      u.setAttribute("role", "button");
    const d =
      _e.getInstance(e) ||
      new _e(e, { toggle: !1, parent: this.options.sidenavAccordion ? n : e });
    (e.dataset.teSidenavStateShow === "" || e.dataset.teCollapseShow === "") &&
      this._rotateArrow(u, !1),
      Z.on(u, "click", (g) => {
        this._toggleCategory(g, d, e),
          this._tempSlim &&
            this._isAllToBeCollapsed() &&
            (this._setSlim(!0), (this._tempSlim = !1)),
          this.options.sidenavMode === "over" &&
            this._focusTrap &&
            this._focusTrap.update();
      }),
      Z.on(e, "show.te.collapse", () => this._rotateArrow(u, !1)),
      Z.on(e, "hide.te.collapse", () => this._rotateArrow(u, !0)),
      Z.on(e, "shown.te.collapse", () => {
        this.options.sidenavMode === "over" &&
          this._focusTrap &&
          this._focusTrap.update();
      }),
      Z.on(e, "hidden.te.collapse", () => {
        this._tempSlim &&
          this._isAllCollapsed() &&
          (this._setSlim(!0), (this._tempSlim = !1)),
          this.options.sidenavMode === "over" &&
            this._focusTrap &&
            this._focusTrap.update();
      });
  }
  _setupContent() {
    (this._content = nt.find(this.options.sidenavContent)),
      this._content.forEach((e) => {
        const r = [
          "!p",
          "!m",
          "!px",
          "!pl",
          "!pr",
          "!mx",
          "!ml",
          "!mr",
          "!-p",
          "!-m",
          "!-px",
          "!-pl",
          "!-pr",
          "!-mx",
          "!-ml",
          "!-mr",
        ];
        [...e.classList]
          .filter((n) => r.findIndex((s) => n.includes(s)) >= 0)
          .forEach((n) => e.classList.remove(n));
      }),
      (this._initialContentStyle = this._content.map((e) => {
        const {
          paddingLeft: r,
          paddingRight: n,
          marginLeft: s,
          marginRight: c,
          transition: u,
        } = window.getComputedStyle(e);
        return {
          paddingLeft: r,
          paddingRight: n,
          marginLeft: s,
          marginRight: c,
          transition: u,
        };
      }));
  }
  _setupFocusTrap() {
    this._focusTrap = new Hc(
      this._element,
      { event: "keydown", condition: (e) => e.keyCode === qc, onlyVisible: !0 },
      this.toggler
    );
  }
  _setupInitialStyling() {
    this._setColor(), J.style(this._element, this.sidenavStyle);
  }
  _setupScrolling() {
    let e = this._element;
    if (this.options.sidenavScrollContainer) {
      e = nt.findOne(this.options.sidenavScrollContainer, this._element);
      const r = lc(e.parentNode.children)
        .filter((n) => n !== e)
        .reduce((n, s) => n + s.clientHeight, 0);
      J.style(e, { maxHeight: `calc(100% - ${r}px)`, position: "relative" });
    }
    this._perfectScrollbar = new Eu(e, {
      suppressScrollX: !0,
      handlers: ["click-rail", "drag-thumb", "wheel", "touch"],
    });
  }
  _setupSlim() {
    (this._slimCollapsed = this.options.sidenavSlimCollapsed),
      this._toggleSlimDisplay(this._slimCollapsed),
      this.options.sidenavExpandOnHover &&
        (this._element.addEventListener("mouseenter", () => {
          this._slimCollapsed && this._setSlim(!1);
        }),
        this._element.addEventListener("mouseleave", () => {
          this._slimCollapsed || this._setSlim(!0);
        }));
  }
  _setupRippleEffect() {
    this.links.forEach((e) => {
      let r = _n.getInstance(e),
        n = this.options.sidenavColor;
      if (r && r._options.sidenavColor !== this.options.sidenavColor)
        r.dispose();
      else if (r) return;
      (localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)) &&
        (n = "white"),
        (r = new _n(e, { rippleColor: n }));
    });
  }
  _setupTouch() {
    (this._touch = new Kc(this._element, "swipe", { threshold: 20 })),
      this._touch.init(),
      Z.on(this._element, "swipeleft", (e) =>
        this._handleSwipe(e, this.options.sidenavRight)
      ),
      Z.on(this._element, "swiperight", (e) =>
        this._handleSwipe(e, !this.options.sidenavRight)
      );
  }
  _setActive(e, r) {
    e.setAttribute("data-te-sidebar-state-active", ""),
      this._activeNode && e.removeAttribute("data-te-sidebar-state-active"),
      (this._activeNode = e);
    const [n] = nt.parents(this._activeNode, Fe);
    if (!n) {
      this._setActiveCategory();
      return;
    }
    const [s] = nt.prev(n, ci);
    this._setActiveCategory(s),
      !r && !this._slimCollapsed && _e.getInstance(n).show();
  }
  _setActiveCategory(e) {
    this.navigation.forEach((r) => {
      nt.find(Fe, r).forEach((n) => {
        const [s] = nt.prev(n, ci);
        s !== e
          ? s.removeAttribute("data-te-sidenav-state-active")
          : s.setAttribute("data-te-sidenav-state-active", "");
      });
    });
  }
  _setActiveElements(e) {
    this.navigation.forEach((r) => {
      nt.find(ci, r)
        .filter((n) => nt.next(n, Fe).length === 0)
        .forEach((n) => {
          this._isActive(n, e) &&
            n !== this._activeNode &&
            this._setActive(n, e);
        });
    }),
      e && this._updateFocus(this.isVisible);
  }
  _setColor() {
    const e = [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark",
      ],
      { sidenavColor: r } = this.options,
      n = e.includes(r) ? r : "primary";
    e.forEach((s) => {
      this._element.classList.remove(`sidenav-${s}`);
    }),
      J.addClass(this._element, `sidenav-${n}`);
  }
  _setContentOffsets(e, r, n) {
    this._content.forEach((s, c) => {
      const u = this._getOffsetValue(e, {
          index: c,
          property: "padding",
          offsets: r,
        }),
        d = this._getOffsetValue(e, {
          index: c,
          property: "margin",
          offsets: r,
        }),
        g = {};
      if (
        (n || (g.transition = `all ${this.transitionDuration} linear`),
        (g[r.padding.property] = `${u}px`),
        (g[r.margin.property] = `${d}px`),
        J.style(s, g),
        !!e)
      ) {
        if (n) {
          J.style(s, { transition: this._initialContentStyle[c].transition });
          return;
        }
        Z.on(s, "transitionend", () => {
          J.style(s, { transition: this._initialContentStyle[c].transition });
        });
      }
    });
  }
  _setMode(e) {
    this.options.sidenavMode !== e &&
      ((this._options.sidenavMode = e), this._update(this.isVisible));
  }
  _setSlim(e) {
    const r = e ? ["collapse", "collapsed"] : ["expand", "expanded"];
    this._triggerEvents(...r),
      e && this._collapseItems(),
      (this._slimCollapsed = e),
      this._toggleSlimDisplay(e),
      J.style(this._element, { width: `${this.width}px` }),
      this._updateOffsets(this.isVisible);
  }
  _setTabindex(e) {
    this.links.forEach((r) => {
      r.tabIndex = e ? 0 : -1;
    });
  }
  _emitEvents(e) {
    const r = e ? ["show", "shown"] : ["hide", "hidden"];
    this._triggerEvents(...r);
  }
  _rotateArrow(e, r) {
    const [n] = nt.children(e, `[${Qc}]`);
    n && (r ? J.removeClass(n, "rotate-180") : J.addClass(n, "rotate-180"));
  }
  _toggleCategory(e, r) {
    e.preventDefault(),
      r.toggle(),
      this._slimCollapsed &&
        this.options.sidenavExpandable &&
        ((this._tempSlim = !0), this._setSlim(!1));
  }
  _toggleSlimDisplay(e) {
    const r = nt.find(Jc, this._element),
      n = nt.find(Zc, this._element),
      s = () => {
        r.forEach((c) => {
          J.style(c, { display: this._slimCollapsed ? "unset" : "none" });
        }),
          n.forEach((c) => {
            J.style(c, { display: this._slimCollapsed ? "none" : "unset" });
          });
      };
    e ? setTimeout(() => s(), this.options.sidenavTransitionDuration) : s();
  }
  async _triggerEvents(e, r) {
    Z.trigger(this._element, `${e}.te.sidenav`),
      r &&
        (await setTimeout(() => {
          Z.trigger(this._element, `${r}.te.sidenav`);
        }, this.options.sidenavTransitionDuration + 5));
  }
  _isiPhone() {
    return /iPhone|iPod/i.test(navigator.userAgent);
  }
  _update(e) {
    e && this._isiPhone() && J.addClass(this._element, "ps--scrolling-y"),
      this.toggler && this._updateTogglerAria(e),
      this._updateDisplay(e),
      this.options.sidenavBackdrop && this._updateBackdrop(e),
      this._updateOffsets(e),
      e &&
        this.options.sidenavCloseOnEsc &&
        this.options.sidenavMode !== "side" &&
        Z.on(window, "keydown", this.escHandler),
      this.options.sidenavFocusTrap && this._updateFocus(e);
  }
  _updateDisplay(e) {
    const r = e ? 0 : this.translation;
    J.style(this._element, { transform: `translateX(${r}%)` });
  }
  _updateFocus(e) {
    if (
      (this._setTabindex(e),
      this.options.sidenavMode === "over" && this.options.sidenavFocusTrap)
    ) {
      if (e) {
        this._focusTrap.trap();
        return;
      }
      this._focusTrap.disable();
    }
    this._focusTrap.disable();
  }
  _updateOffsets(e, r = !1) {
    const [n, s] = this.options.sidenavRight
        ? ["right", "left"]
        : ["left", "right"],
      c = {
        property: this._getProperty("padding", n),
        value: this.options.sidenavMode === "over" ? 0 : this.width,
      },
      u = {
        property: this._getProperty("margin", s),
        value: this.options.sidenavMode === "push" ? -1 * this.width : 0,
      };
    Z.trigger(this._element, "update.te.sidenav", { margin: u, padding: c }),
      this._content &&
        ((this._content.className = ""),
        this._setContentOffsets(e, { padding: c, margin: u }, r));
  }
  _updateTogglerAria(e) {
    this.toggler.setAttribute("aria-expanded", e);
  }
  static toggleSidenav() {
    return function (e) {
      const r = nt.closest(e.target, Un),
        n = J.getDataAttributes(r).target;
      nt.find(n).forEach((s) => {
        (qe.getInstance(s) || new qe(s)).toggle();
      });
    };
  }
  static jQueryInterface(e, r) {
    return this.each(function () {
      let n = At.getData(this, Gi);
      const s = typeof e == "object" && e;
      if (
        !(!n && /dispose/.test(e)) &&
        (n || (n = new qe(this, s)), typeof e == "string")
      ) {
        if (typeof n[e] > "u") throw new TypeError(`No method named "${e}"`);
        n[e](r);
      }
    });
  }
  static getInstance(e) {
    return At.getData(e, Gi);
  }
  static getOrCreateInstance(e, r = {}) {
    return this.getInstance(e) || new this(e, typeof r == "object" ? r : null);
  }
}
io("chips-input-");
const ge = { plugins: { legend: { labels: { color: "rgb(102,102,102)" } } } },
  ru = {
    line: {
      options: {
        ...ge,
        elements: {
          line: {
            backgroundColor: "rgba(59, 112, 202, 0.0)",
            borderColor: "rgb(59, 112, 202)",
            borderWidth: 2,
            tension: 0,
          },
          point: {
            borderColor: "rgb(59, 112, 202)",
            backgroundColor: "rgb(59, 112, 202)",
          },
        },
        responsive: !0,
        legend: { display: !0 },
        tooltips: { intersect: !1, mode: "index" },
        datasets: { borderColor: "red" },
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1 },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
          y: {
            stacked: !1,
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: "rgba(0,0,0,0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
        },
      },
    },
    bar: {
      options: {
        ...ge,
        backgroundColor: "rgb(59, 112, 202)",
        borderWidth: 0,
        responsive: !0,
        legend: { display: !0 },
        tooltips: { intersect: !1, mode: "index" },
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1 },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
          y: {
            stacked: !0,
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: "rgba(0,0,0,0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
        },
      },
    },
    pie: {
      options: {
        ...ge,
        elements: { arc: { backgroundColor: "rgb(59, 112, 202)" } },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    doughnut: {
      options: {
        ...ge,
        elements: { arc: { backgroundColor: "rgb(59, 112, 202)" } },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    polarArea: {
      options: {
        ...ge,
        elements: { arc: { backgroundColor: "rgba(59, 112, 202, 0.5)" } },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    radar: {
      options: {
        ...ge,
        elements: {
          line: {
            backgroundColor: "rgba(59, 112, 202, 0.5)",
            borderColor: "rgb(59, 112, 202)",
            borderWidth: 2,
          },
          point: {
            borderColor: "rgb(59, 112, 202)",
            backgroundColor: "rgb(59, 112, 202)",
          },
        },
        responsive: !0,
        legend: { display: !0 },
      },
    },
    scatter: {
      options: {
        ...ge,
        elements: {
          line: {
            backgroundColor: "rgba(59, 112, 202, 0.5)",
            borderColor: "rgb(59, 112, 202)",
            borderWidth: 2,
            tension: 0,
          },
          point: {
            borderColor: "rgb(59, 112, 202)",
            backgroundColor: "rgba(59, 112, 202, 0.5)",
          },
        },
        responsive: !0,
        legend: { display: !0 },
        tooltips: { intersect: !1, mode: "index" },
        datasets: { borderColor: "red" },
        scales: {
          x: {
            stacked: !0,
            grid: { display: !1 },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
          y: {
            stacked: !1,
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: "rgba(0,0,0,0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
        },
      },
    },
    bubble: {
      options: {
        ...ge,
        elements: {
          point: {
            borderColor: "rgb(59, 112, 202)",
            backgroundColor: "rgba(59, 112, 202, 0.5)",
          },
        },
        responsive: !0,
        legend: { display: !0 },
        scales: {
          x: {
            grid: { display: !1 },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
          y: {
            grid: {
              borderDash: [2],
              drawBorder: !1,
              zeroLineColor: "rgba(0,0,0,0)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: { fontColor: "rgba(0,0,0, 0.5)" },
          },
        },
      },
    },
  };
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */ function te(t) {
  return getComputedStyle(t);
}
function Dt(t, e) {
  for (var r in e) {
    var n = e[r];
    typeof n == "number" && (n = n + "px"), (t.style[r] = n);
  }
  return t;
}
function Ji(t) {
  var e = document.createElement("div");
  return (e.className = t), e;
}
var Is =
  typeof Element < "u" &&
  (Element.prototype.matches ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);
function we(t, e) {
  if (!Is) throw new Error("No element matching method supported");
  return Is.call(t, e);
}
function Ve(t) {
  t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
}
function Ps(t, e) {
  return Array.prototype.filter.call(t.children, function (r) {
    return we(r, e);
  });
}
var _t = {
    main: "ps",
    rtl: "ps__rtl",
    element: {
      thumb: function (t) {
        return "ps__thumb-" + t;
      },
      rail: function (t) {
        return "ps__rail-" + t;
      },
      consuming: "ps__child--consume",
    },
    state: {
      focus: "ps--focus",
      clicking: "ps--clicking",
      active: function (t) {
        return "ps--active-" + t;
      },
      scrolling: function (t) {
        return "ps--scrolling-" + t;
      },
    },
  },
  bo = { x: null, y: null };
function _o(t, e) {
  var r = t.element.classList,
    n = _t.state.scrolling(e);
  r.contains(n) ? clearTimeout(bo[e]) : r.add(n);
}
function wo(t, e) {
  bo[e] = setTimeout(function () {
    return t.isAlive && t.element.classList.remove(_t.state.scrolling(e));
  }, t.settings.scrollingThreshold);
}
function su(t, e) {
  _o(t, e), wo(t, e);
}
var yi = function (t) {
    (this.element = t), (this.handlers = {});
  },
  Eo = { isEmpty: { configurable: !0 } };
yi.prototype.bind = function (t, e) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []),
    this.handlers[t].push(e),
    this.element.addEventListener(t, e, !1);
};
yi.prototype.unbind = function (t, e) {
  var r = this;
  this.handlers[t] = this.handlers[t].filter(function (n) {
    return e && n !== e ? !0 : (r.element.removeEventListener(t, n, !1), !1);
  });
};
yi.prototype.unbindAll = function () {
  for (var t in this.handlers) this.unbind(t);
};
Eo.isEmpty.get = function () {
  var t = this;
  return Object.keys(this.handlers).every(function (e) {
    return t.handlers[e].length === 0;
  });
};
Object.defineProperties(yi.prototype, Eo);
var Je = function () {
  this.eventElements = [];
};
Je.prototype.eventElement = function (t) {
  var e = this.eventElements.filter(function (r) {
    return r.element === t;
  })[0];
  return e || ((e = new yi(t)), this.eventElements.push(e)), e;
};
Je.prototype.bind = function (t, e, r) {
  this.eventElement(t).bind(e, r);
};
Je.prototype.unbind = function (t, e, r) {
  var n = this.eventElement(t);
  n.unbind(e, r),
    n.isEmpty && this.eventElements.splice(this.eventElements.indexOf(n), 1);
};
Je.prototype.unbindAll = function () {
  this.eventElements.forEach(function (t) {
    return t.unbindAll();
  }),
    (this.eventElements = []);
};
Je.prototype.once = function (t, e, r) {
  var n = this.eventElement(t),
    s = function (c) {
      n.unbind(e, s), r(c);
    };
  n.bind(e, s);
};
function Zi(t) {
  if (typeof window.CustomEvent == "function") return new CustomEvent(t);
  var e = document.createEvent("CustomEvent");
  return e.initCustomEvent(t, !1, !1, void 0), e;
}
function wn(t, e, r, n, s) {
  n === void 0 && (n = !0), s === void 0 && (s = !1);
  var c;
  if (e === "top")
    c = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
  else if (e === "left")
    c = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
  else throw new Error("A proper axis should be provided");
  ou(t, r, c, n, s);
}
function ou(t, e, r, n, s) {
  var c = r[0],
    u = r[1],
    d = r[2],
    g = r[3],
    b = r[4],
    w = r[5];
  n === void 0 && (n = !0), s === void 0 && (s = !1);
  var S = t.element;
  (t.reach[g] = null),
    S[d] < 1 && (t.reach[g] = "start"),
    S[d] > t[c] - t[u] - 1 && (t.reach[g] = "end"),
    e &&
      (S.dispatchEvent(Zi("ps-scroll-" + g)),
      e < 0
        ? S.dispatchEvent(Zi("ps-scroll-" + b))
        : e > 0 && S.dispatchEvent(Zi("ps-scroll-" + w)),
      n && su(t, g)),
    t.reach[g] &&
      (e || s) &&
      S.dispatchEvent(Zi("ps-" + g + "-reach-" + t.reach[g]));
}
function mt(t) {
  return parseInt(t, 10) || 0;
}
function au(t) {
  return (
    we(t, "input,[contenteditable]") ||
    we(t, "select,[contenteditable]") ||
    we(t, "textarea,[contenteditable]") ||
    we(t, "button,[contenteditable]")
  );
}
function lu(t) {
  var e = te(t);
  return (
    mt(e.width) +
    mt(e.paddingLeft) +
    mt(e.paddingRight) +
    mt(e.borderLeftWidth) +
    mt(e.borderRightWidth)
  );
}
var Xe = {
  isWebKit:
    typeof document < "u" &&
    "WebkitAppearance" in document.documentElement.style,
  supportsTouch:
    typeof window < "u" &&
    ("ontouchstart" in window ||
      ("maxTouchPoints" in window.navigator &&
        window.navigator.maxTouchPoints > 0) ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome:
    typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent),
};
function le(t) {
  var e = t.element,
    r = Math.floor(e.scrollTop),
    n = e.getBoundingClientRect();
  (t.containerWidth = Math.round(n.width)),
    (t.containerHeight = Math.round(n.height)),
    (t.contentWidth = e.scrollWidth),
    (t.contentHeight = e.scrollHeight),
    e.contains(t.scrollbarXRail) ||
      (Ps(e, _t.element.rail("x")).forEach(function (s) {
        return Ve(s);
      }),
      e.appendChild(t.scrollbarXRail)),
    e.contains(t.scrollbarYRail) ||
      (Ps(e, _t.element.rail("y")).forEach(function (s) {
        return Ve(s);
      }),
      e.appendChild(t.scrollbarYRail)),
    !t.settings.suppressScrollX &&
    t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth
      ? ((t.scrollbarXActive = !0),
        (t.railXWidth = t.containerWidth - t.railXMarginWidth),
        (t.railXRatio = t.containerWidth / t.railXWidth),
        (t.scrollbarXWidth = Os(
          t,
          mt((t.railXWidth * t.containerWidth) / t.contentWidth)
        )),
        (t.scrollbarXLeft = mt(
          ((t.negativeScrollAdjustment + e.scrollLeft) *
            (t.railXWidth - t.scrollbarXWidth)) /
            (t.contentWidth - t.containerWidth)
        )))
      : (t.scrollbarXActive = !1),
    !t.settings.suppressScrollY &&
    t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight
      ? ((t.scrollbarYActive = !0),
        (t.railYHeight = t.containerHeight - t.railYMarginHeight),
        (t.railYRatio = t.containerHeight / t.railYHeight),
        (t.scrollbarYHeight = Os(
          t,
          mt((t.railYHeight * t.containerHeight) / t.contentHeight)
        )),
        (t.scrollbarYTop = mt(
          (r * (t.railYHeight - t.scrollbarYHeight)) /
            (t.contentHeight - t.containerHeight)
        )))
      : (t.scrollbarYActive = !1),
    t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth &&
      (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
    t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight &&
      (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
    cu(e, t),
    t.scrollbarXActive
      ? e.classList.add(_t.state.active("x"))
      : (e.classList.remove(_t.state.active("x")),
        (t.scrollbarXWidth = 0),
        (t.scrollbarXLeft = 0),
        (e.scrollLeft = t.isRtl === !0 ? t.contentWidth : 0)),
    t.scrollbarYActive
      ? e.classList.add(_t.state.active("y"))
      : (e.classList.remove(_t.state.active("y")),
        (t.scrollbarYHeight = 0),
        (t.scrollbarYTop = 0),
        (e.scrollTop = 0));
}
function Os(t, e) {
  return (
    t.settings.minScrollbarLength &&
      (e = Math.max(e, t.settings.minScrollbarLength)),
    t.settings.maxScrollbarLength &&
      (e = Math.min(e, t.settings.maxScrollbarLength)),
    e
  );
}
function cu(t, e) {
  var r = { width: e.railXWidth },
    n = Math.floor(t.scrollTop);
  e.isRtl
    ? (r.left =
        e.negativeScrollAdjustment +
        t.scrollLeft +
        e.containerWidth -
        e.contentWidth)
    : (r.left = t.scrollLeft),
    e.isScrollbarXUsingBottom
      ? (r.bottom = e.scrollbarXBottom - n)
      : (r.top = e.scrollbarXTop + n),
    Dt(e.scrollbarXRail, r);
  var s = { top: n, height: e.railYHeight };
  e.isScrollbarYUsingRight
    ? e.isRtl
      ? (s.right =
          e.contentWidth -
          (e.negativeScrollAdjustment + t.scrollLeft) -
          e.scrollbarYRight -
          e.scrollbarYOuterWidth -
          9)
      : (s.right = e.scrollbarYRight - t.scrollLeft)
    : e.isRtl
      ? (s.left =
          e.negativeScrollAdjustment +
          t.scrollLeft +
          e.containerWidth * 2 -
          e.contentWidth -
          e.scrollbarYLeft -
          e.scrollbarYOuterWidth)
      : (s.left = e.scrollbarYLeft + t.scrollLeft),
    Dt(e.scrollbarYRail, s),
    Dt(e.scrollbarX, {
      left: e.scrollbarXLeft,
      width: e.scrollbarXWidth - e.railBorderXWidth,
    }),
    Dt(e.scrollbarY, {
      top: e.scrollbarYTop,
      height: e.scrollbarYHeight - e.railBorderYWidth,
    });
}
function uu(t) {
  t.element,
    t.event.bind(t.scrollbarY, "mousedown", function (e) {
      return e.stopPropagation();
    }),
    t.event.bind(t.scrollbarYRail, "mousedown", function (e) {
      var r =
          e.pageY -
          window.pageYOffset -
          t.scrollbarYRail.getBoundingClientRect().top,
        n = r > t.scrollbarYTop ? 1 : -1;
      (t.element.scrollTop += n * t.containerHeight),
        le(t),
        e.stopPropagation();
    }),
    t.event.bind(t.scrollbarX, "mousedown", function (e) {
      return e.stopPropagation();
    }),
    t.event.bind(t.scrollbarXRail, "mousedown", function (e) {
      var r =
          e.pageX -
          window.pageXOffset -
          t.scrollbarXRail.getBoundingClientRect().left,
        n = r > t.scrollbarXLeft ? 1 : -1;
      (t.element.scrollLeft += n * t.containerWidth),
        le(t),
        e.stopPropagation();
    });
}
function hu(t) {
  Ds(t, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail",
  ]),
    Ds(t, [
      "containerHeight",
      "contentHeight",
      "pageY",
      "railYHeight",
      "scrollbarY",
      "scrollbarYHeight",
      "scrollTop",
      "y",
      "scrollbarYRail",
    ]);
}
function Ds(t, e) {
  var r = e[0],
    n = e[1],
    s = e[2],
    c = e[3],
    u = e[4],
    d = e[5],
    g = e[6],
    b = e[7],
    w = e[8],
    S = t.element,
    I = null,
    D = null,
    k = null;
  function C(W) {
    W.touches && W.touches[0] && (W[s] = W.touches[0].pageY),
      (S[g] = I + k * (W[s] - D)),
      _o(t, b),
      le(t),
      W.stopPropagation(),
      W.type.startsWith("touch") &&
        W.changedTouches.length > 1 &&
        W.preventDefault();
  }
  function T() {
    wo(t, b),
      t[w].classList.remove(_t.state.clicking),
      t.event.unbind(t.ownerDocument, "mousemove", C);
  }
  function a(W, H) {
    (I = S[g]),
      H && W.touches && (W[s] = W.touches[0].pageY),
      (D = W[s]),
      (k = (t[n] - t[r]) / (t[c] - t[d])),
      H
        ? t.event.bind(t.ownerDocument, "touchmove", C)
        : (t.event.bind(t.ownerDocument, "mousemove", C),
          t.event.once(t.ownerDocument, "mouseup", T),
          W.preventDefault()),
      t[w].classList.add(_t.state.clicking),
      W.stopPropagation();
  }
  t.event.bind(t[u], "mousedown", function (W) {
    a(W);
  }),
    t.event.bind(t[u], "touchstart", function (W) {
      a(W, !0);
    });
}
function fu(t) {
  var e = t.element,
    r = function () {
      return we(e, ":hover");
    },
    n = function () {
      return we(t.scrollbarX, ":focus") || we(t.scrollbarY, ":focus");
    };
  function s(c, u) {
    var d = Math.floor(e.scrollTop);
    if (c === 0) {
      if (!t.scrollbarYActive) return !1;
      if (
        (d === 0 && u > 0) ||
        (d >= t.contentHeight - t.containerHeight && u < 0)
      )
        return !t.settings.wheelPropagation;
    }
    var g = e.scrollLeft;
    if (u === 0) {
      if (!t.scrollbarXActive) return !1;
      if (
        (g === 0 && c < 0) ||
        (g >= t.contentWidth - t.containerWidth && c > 0)
      )
        return !t.settings.wheelPropagation;
    }
    return !0;
  }
  t.event.bind(t.ownerDocument, "keydown", function (c) {
    if (
      !(
        (c.isDefaultPrevented && c.isDefaultPrevented()) ||
        c.defaultPrevented
      ) &&
      !(!r() && !n())
    ) {
      var u = document.activeElement
        ? document.activeElement
        : t.ownerDocument.activeElement;
      if (u) {
        if (u.tagName === "IFRAME") u = u.contentDocument.activeElement;
        else for (; u.shadowRoot; ) u = u.shadowRoot.activeElement;
        if (au(u)) return;
      }
      var d = 0,
        g = 0;
      switch (c.which) {
        case 37:
          c.metaKey
            ? (d = -t.contentWidth)
            : c.altKey
              ? (d = -t.containerWidth)
              : (d = -30);
          break;
        case 38:
          c.metaKey
            ? (g = t.contentHeight)
            : c.altKey
              ? (g = t.containerHeight)
              : (g = 30);
          break;
        case 39:
          c.metaKey
            ? (d = t.contentWidth)
            : c.altKey
              ? (d = t.containerWidth)
              : (d = 30);
          break;
        case 40:
          c.metaKey
            ? (g = -t.contentHeight)
            : c.altKey
              ? (g = -t.containerHeight)
              : (g = -30);
          break;
        case 32:
          c.shiftKey ? (g = t.containerHeight) : (g = -t.containerHeight);
          break;
        case 33:
          g = t.containerHeight;
          break;
        case 34:
          g = -t.containerHeight;
          break;
        case 36:
          g = t.contentHeight;
          break;
        case 35:
          g = -t.contentHeight;
          break;
        default:
          return;
      }
      (t.settings.suppressScrollX && d !== 0) ||
        (t.settings.suppressScrollY && g !== 0) ||
        ((e.scrollTop -= g),
        (e.scrollLeft += d),
        le(t),
        s(d, g) && c.preventDefault());
    }
  });
}
function du(t) {
  var e = t.element;
  function r(u, d) {
    var g = Math.floor(e.scrollTop),
      b = e.scrollTop === 0,
      w = g + e.offsetHeight === e.scrollHeight,
      S = e.scrollLeft === 0,
      I = e.scrollLeft + e.offsetWidth === e.scrollWidth,
      D;
    return (
      Math.abs(d) > Math.abs(u) ? (D = b || w) : (D = S || I),
      D ? !t.settings.wheelPropagation : !0
    );
  }
  function n(u) {
    var d = u.deltaX,
      g = -1 * u.deltaY;
    return (
      (typeof d > "u" || typeof g > "u") &&
        ((d = (-1 * u.wheelDeltaX) / 6), (g = u.wheelDeltaY / 6)),
      u.deltaMode && u.deltaMode === 1 && ((d *= 10), (g *= 10)),
      d !== d && g !== g && ((d = 0), (g = u.wheelDelta)),
      u.shiftKey ? [-g, -d] : [d, g]
    );
  }
  function s(u, d, g) {
    if (!Xe.isWebKit && e.querySelector("select:focus")) return !0;
    if (!e.contains(u)) return !1;
    for (var b = u; b && b !== e; ) {
      if (b.classList.contains(_t.element.consuming)) return !0;
      var w = te(b);
      if (g && w.overflowY.match(/(scroll|auto)/)) {
        var S = b.scrollHeight - b.clientHeight;
        if (S > 0 && ((b.scrollTop > 0 && g < 0) || (b.scrollTop < S && g > 0)))
          return !0;
      }
      if (d && w.overflowX.match(/(scroll|auto)/)) {
        var I = b.scrollWidth - b.clientWidth;
        if (
          I > 0 &&
          ((b.scrollLeft > 0 && d < 0) || (b.scrollLeft < I && d > 0))
        )
          return !0;
      }
      b = b.parentNode;
    }
    return !1;
  }
  function c(u) {
    var d = n(u),
      g = d[0],
      b = d[1];
    if (!s(u.target, g, b)) {
      var w = !1;
      t.settings.useBothWheelAxes
        ? t.scrollbarYActive && !t.scrollbarXActive
          ? (b
              ? (e.scrollTop -= b * t.settings.wheelSpeed)
              : (e.scrollTop += g * t.settings.wheelSpeed),
            (w = !0))
          : t.scrollbarXActive &&
            !t.scrollbarYActive &&
            (g
              ? (e.scrollLeft += g * t.settings.wheelSpeed)
              : (e.scrollLeft -= b * t.settings.wheelSpeed),
            (w = !0))
        : ((e.scrollTop -= b * t.settings.wheelSpeed),
          (e.scrollLeft += g * t.settings.wheelSpeed)),
        le(t),
        (w = w || r(g, b)),
        w && !u.ctrlKey && (u.stopPropagation(), u.preventDefault());
    }
  }
  typeof window.onwheel < "u"
    ? t.event.bind(e, "wheel", c)
    : typeof window.onmousewheel < "u" && t.event.bind(e, "mousewheel", c);
}
function pu(t) {
  if (!Xe.supportsTouch && !Xe.supportsIePointer) return;
  var e = t.element;
  function r(k, C) {
    var T = Math.floor(e.scrollTop),
      a = e.scrollLeft,
      W = Math.abs(k),
      H = Math.abs(C);
    if (H > W) {
      if (
        (C < 0 && T === t.contentHeight - t.containerHeight) ||
        (C > 0 && T === 0)
      )
        return window.scrollY === 0 && C > 0 && Xe.isChrome;
    } else if (
      W > H &&
      ((k < 0 && a === t.contentWidth - t.containerWidth) || (k > 0 && a === 0))
    )
      return !0;
    return !0;
  }
  function n(k, C) {
    (e.scrollTop -= C), (e.scrollLeft -= k), le(t);
  }
  var s = {},
    c = 0,
    u = {},
    d = null;
  function g(k) {
    return k.targetTouches ? k.targetTouches[0] : k;
  }
  function b(k) {
    return k.pointerType && k.pointerType === "pen" && k.buttons === 0
      ? !1
      : !!(
          (k.targetTouches && k.targetTouches.length === 1) ||
          (k.pointerType &&
            k.pointerType !== "mouse" &&
            k.pointerType !== k.MSPOINTER_TYPE_MOUSE)
        );
  }
  function w(k) {
    if (b(k)) {
      var C = g(k);
      (s.pageX = C.pageX),
        (s.pageY = C.pageY),
        (c = new Date().getTime()),
        d !== null && clearInterval(d);
    }
  }
  function S(k, C, T) {
    if (!e.contains(k)) return !1;
    for (var a = k; a && a !== e; ) {
      if (a.classList.contains(_t.element.consuming)) return !0;
      var W = te(a);
      if (T && W.overflowY.match(/(scroll|auto)/)) {
        var H = a.scrollHeight - a.clientHeight;
        if (H > 0 && ((a.scrollTop > 0 && T < 0) || (a.scrollTop < H && T > 0)))
          return !0;
      }
      if (C && W.overflowX.match(/(scroll|auto)/)) {
        var O = a.scrollWidth - a.clientWidth;
        if (
          O > 0 &&
          ((a.scrollLeft > 0 && C < 0) || (a.scrollLeft < O && C > 0))
        )
          return !0;
      }
      a = a.parentNode;
    }
    return !1;
  }
  function I(k) {
    if (b(k)) {
      var C = g(k),
        T = { pageX: C.pageX, pageY: C.pageY },
        a = T.pageX - s.pageX,
        W = T.pageY - s.pageY;
      if (S(k.target, a, W)) return;
      n(a, W), (s = T);
      var H = new Date().getTime(),
        O = H - c;
      O > 0 && ((u.x = a / O), (u.y = W / O), (c = H)),
        r(a, W) && k.preventDefault();
    }
  }
  function D() {
    t.settings.swipeEasing &&
      (clearInterval(d),
      (d = setInterval(function () {
        if (t.isInitialized) {
          clearInterval(d);
          return;
        }
        if (!u.x && !u.y) {
          clearInterval(d);
          return;
        }
        if (Math.abs(u.x) < 0.01 && Math.abs(u.y) < 0.01) {
          clearInterval(d);
          return;
        }
        if (!t.element) {
          clearInterval(d);
          return;
        }
        n(u.x * 30, u.y * 30), (u.x *= 0.8), (u.y *= 0.8);
      }, 10)));
  }
  Xe.supportsTouch
    ? (t.event.bind(e, "touchstart", w),
      t.event.bind(e, "touchmove", I),
      t.event.bind(e, "touchend", D))
    : Xe.supportsIePointer &&
      (window.PointerEvent
        ? (t.event.bind(e, "pointerdown", w),
          t.event.bind(e, "pointermove", I),
          t.event.bind(e, "pointerup", D))
        : window.MSPointerEvent &&
          (t.event.bind(e, "MSPointerDown", w),
          t.event.bind(e, "MSPointerMove", I),
          t.event.bind(e, "MSPointerUp", D)));
}
var gu = function () {
    return {
      handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollingThreshold: 1e3,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: !1,
      suppressScrollY: !1,
      swipeEasing: !0,
      useBothWheelAxes: !1,
      wheelPropagation: !0,
      wheelSpeed: 1,
    };
  },
  mu = {
    "click-rail": uu,
    "drag-thumb": hu,
    keyboard: fu,
    wheel: du,
    touch: pu,
  },
  bi = function (t, e) {
    var r = this;
    if (
      (e === void 0 && (e = {}),
      typeof t == "string" && (t = document.querySelector(t)),
      !t || !t.nodeName)
    )
      throw new Error("no element is specified to initialize PerfectScrollbar");
    (this.element = t), t.classList.add(_t.main), (this.settings = gu());
    for (var n in e) this.settings[n] = e[n];
    (this.containerWidth = null),
      (this.containerHeight = null),
      (this.contentWidth = null),
      (this.contentHeight = null);
    var s = function () {
        return t.classList.add(_t.state.focus);
      },
      c = function () {
        return t.classList.remove(_t.state.focus);
      };
    (this.isRtl = te(t).direction === "rtl"),
      this.isRtl === !0 && t.classList.add(_t.rtl),
      (this.isNegativeScroll = (function () {
        var g = t.scrollLeft,
          b = null;
        return (
          (t.scrollLeft = -1), (b = t.scrollLeft < 0), (t.scrollLeft = g), b
        );
      })()),
      (this.negativeScrollAdjustment = this.isNegativeScroll
        ? t.scrollWidth - t.clientWidth
        : 0),
      (this.event = new Je()),
      (this.ownerDocument = t.ownerDocument || document),
      (this.scrollbarXRail = Ji(_t.element.rail("x"))),
      t.appendChild(this.scrollbarXRail),
      (this.scrollbarX = Ji(_t.element.thumb("x"))),
      this.scrollbarXRail.appendChild(this.scrollbarX),
      this.scrollbarX.setAttribute("tabindex", 0),
      this.event.bind(this.scrollbarX, "focus", s),
      this.event.bind(this.scrollbarX, "blur", c),
      (this.scrollbarXActive = null),
      (this.scrollbarXWidth = null),
      (this.scrollbarXLeft = null);
    var u = te(this.scrollbarXRail);
    (this.scrollbarXBottom = parseInt(u.bottom, 10)),
      isNaN(this.scrollbarXBottom)
        ? ((this.isScrollbarXUsingBottom = !1),
          (this.scrollbarXTop = mt(u.top)))
        : (this.isScrollbarXUsingBottom = !0),
      (this.railBorderXWidth = mt(u.borderLeftWidth) + mt(u.borderRightWidth)),
      Dt(this.scrollbarXRail, { display: "block" }),
      (this.railXMarginWidth = mt(u.marginLeft) + mt(u.marginRight)),
      Dt(this.scrollbarXRail, { display: "" }),
      (this.railXWidth = null),
      (this.railXRatio = null),
      (this.scrollbarYRail = Ji(_t.element.rail("y"))),
      t.appendChild(this.scrollbarYRail),
      (this.scrollbarY = Ji(_t.element.thumb("y"))),
      this.scrollbarYRail.appendChild(this.scrollbarY),
      this.scrollbarY.setAttribute("tabindex", 0),
      this.event.bind(this.scrollbarY, "focus", s),
      this.event.bind(this.scrollbarY, "blur", c),
      (this.scrollbarYActive = null),
      (this.scrollbarYHeight = null),
      (this.scrollbarYTop = null);
    var d = te(this.scrollbarYRail);
    (this.scrollbarYRight = parseInt(d.right, 10)),
      isNaN(this.scrollbarYRight)
        ? ((this.isScrollbarYUsingRight = !1),
          (this.scrollbarYLeft = mt(d.left)))
        : (this.isScrollbarYUsingRight = !0),
      (this.scrollbarYOuterWidth = this.isRtl ? lu(this.scrollbarY) : null),
      (this.railBorderYWidth = mt(d.borderTopWidth) + mt(d.borderBottomWidth)),
      Dt(this.scrollbarYRail, { display: "block" }),
      (this.railYMarginHeight = mt(d.marginTop) + mt(d.marginBottom)),
      Dt(this.scrollbarYRail, { display: "" }),
      (this.railYHeight = null),
      (this.railYRatio = null),
      (this.reach = {
        x:
          t.scrollLeft <= 0
            ? "start"
            : t.scrollLeft >= this.contentWidth - this.containerWidth
              ? "end"
              : null,
        y:
          t.scrollTop <= 0
            ? "start"
            : t.scrollTop >= this.contentHeight - this.containerHeight
              ? "end"
              : null,
      }),
      (this.isAlive = !0),
      this.settings.handlers.forEach(function (g) {
        return mu[g](r);
      }),
      (this.lastScrollTop = Math.floor(t.scrollTop)),
      (this.lastScrollLeft = t.scrollLeft),
      this.event.bind(this.element, "scroll", function (g) {
        return r.onScroll(g);
      }),
      le(this);
  };
bi.prototype.update = function () {
  this.isAlive &&
    ((this.negativeScrollAdjustment = this.isNegativeScroll
      ? this.element.scrollWidth - this.element.clientWidth
      : 0),
    Dt(this.scrollbarXRail, { display: "block" }),
    Dt(this.scrollbarYRail, { display: "block" }),
    (this.railXMarginWidth =
      mt(te(this.scrollbarXRail).marginLeft) +
      mt(te(this.scrollbarXRail).marginRight)),
    (this.railYMarginHeight =
      mt(te(this.scrollbarYRail).marginTop) +
      mt(te(this.scrollbarYRail).marginBottom)),
    Dt(this.scrollbarXRail, { display: "none" }),
    Dt(this.scrollbarYRail, { display: "none" }),
    le(this),
    wn(this, "top", 0, !1, !0),
    wn(this, "left", 0, !1, !0),
    Dt(this.scrollbarXRail, { display: "" }),
    Dt(this.scrollbarYRail, { display: "" }));
};
bi.prototype.onScroll = function (t) {
  this.isAlive &&
    (le(this),
    wn(this, "top", this.element.scrollTop - this.lastScrollTop),
    wn(this, "left", this.element.scrollLeft - this.lastScrollLeft),
    (this.lastScrollTop = Math.floor(this.element.scrollTop)),
    (this.lastScrollLeft = this.element.scrollLeft));
};
bi.prototype.destroy = function () {
  this.isAlive &&
    (this.event.unbindAll(),
    Ve(this.scrollbarX),
    Ve(this.scrollbarY),
    Ve(this.scrollbarXRail),
    Ve(this.scrollbarYRail),
    this.removePsClasses(),
    (this.element = null),
    (this.scrollbarX = null),
    (this.scrollbarY = null),
    (this.scrollbarXRail = null),
    (this.scrollbarYRail = null),
    (this.isAlive = !1));
};
bi.prototype.removePsClasses = function () {
  this.element.className = this.element.className
    .split(" ")
    .filter(function (t) {
      return !t.match(/^ps([-_].+|)$/);
    })
    .join(" ");
};
const Kn = "perfectScrollbar",
  vu = "perfect-scrollbar",
  $i = "te.perfectScrollbar",
  Zt = "te",
  $t = "ps",
  Qn = [
    { te: `scrollX.${Zt}.${$t}`, ps: "ps-scroll-x" },
    { te: `scrollY.${Zt}.${$t}`, ps: "ps-scroll-y" },
    { te: `scrollUp.${Zt}.${$t}`, ps: "ps-scroll-up" },
    { te: `scrollDown.${Zt}.${$t}`, ps: "ps-scroll-down" },
    { te: `scrollLeft.${Zt}.${$t}`, ps: "ps-scroll-left" },
    { te: `scrollRight.${Zt}.${$t}`, ps: "ps-scroll-right" },
    { te: `scrollXEnd.${Zt}.${$t}`, ps: "ps-x-reach-end" },
    { te: `scrollYEnd.${Zt}.${$t}`, ps: "ps-y-reach-end" },
    { te: `scrollXStart.${Zt}.${$t}`, ps: "ps-x-reach-start" },
    { te: `scrollYStart.${Zt}.${$t}`, ps: "ps-y-reach-start" },
  ],
  yu = {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    wheelSpeed: 1,
    wheelPropagation: !0,
    swipeEasing: !0,
    minScrollbarLength: null,
    maxScrollbarLength: null,
    scrollingThreshold: 1e3,
    useBothWheelAxes: !1,
    suppressScrollX: !1,
    suppressScrollY: !1,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    positionRight: !0,
  },
  bu = {
    handlers: "(string|array)",
    wheelSpeed: "number",
    wheelPropagation: "boolean",
    swipeEasing: "boolean",
    minScrollbarLength: "(number|null)",
    maxScrollbarLength: "(number|null)",
    scrollingThreshold: "number",
    useBothWheelAxes: "boolean",
    suppressScrollX: "boolean",
    suppressScrollY: "boolean",
    scrollXMarginOffset: "number",
    scrollYMarginOffset: "number",
    positionRight: "boolean",
  },
  _u = {
    ps: "group/ps overflow-hidden [overflow-anchor:none] touch-none",
    railX:
      "group/x absolute bottom-0 h-[0.9375rem] hidden opacity-0 transition-[background-color,_opacity] duration-200 ease-linear motion-reduce:transition-none z-[1035] group-[&.ps--active-x]/ps:block group-hover/ps:opacity-60 group-focus/ps:opacity-60 group-[&.ps--scrolling-x]/ps:opacity-60 hover:!opacity-90 focus:!opacity-90 [&.ps--clicking]:!opacity-90 outline-none",
    railXColors:
      "group-[&.ps--active-x]/ps:bg-transparent hover:!bg-[#eee] focus:!bg-[#eee] [&.ps--clicking]:!bg-[#eee] dark:hover:!bg-[#555] dark:focus:!bg-[#555] dark:[&.ps--clicking]:!bg-[#555]",
    railXThumb:
      "absolute bottom-0.5 rounded-md h-1.5 group-focus/ps:opacity-100 group-active/ps:opacity-100 [transition:background-color_.2s_linear,_height_.2s_ease-in-out] group-hover/x:h-[11px] group-focus/x:h-[0.6875rem] group-[&.ps--clicking]/x:bg-[#999] group-[&.ps--clicking]/x:h-[11px] outline-none",
    railXThumbColors:
      "bg-[#aaa] group-hover/x:bg-[#999] group-focus/x:bg-[#999]",
    railY:
      "group/y absolute right-0 w-[0.9375rem] hidden opacity-0 transition-[background-color,_opacity] duration-200 ease-linear motion-reduce:transition-none z-[1035] group-[&.ps--active-y]/ps:block group-hover/ps:opacity-60 group-focus/ps:opacity-60 group-[&.ps--scrolling-y]/ps:opacity-60 hover:!opacity-90 focus:!opacity-90 [&.ps--clicking]:!opacity-90 outline-none",
    railYColors:
      "group-[&.ps--active-y]/ps:bg-transparent hover:!bg-[#eee] focus:!bg-[#eee] [&.ps--clicking]:!bg-[#eee] dark:hover:!bg-[#555] dark:focus:!bg-[#555] dark:[&.ps--clicking]:!bg-[#555]",
    railYThumb:
      "absolute right-0.5 rounded-md w-1.5 group-focus/ps:opacity-100 group-active/ps:opacity-100 [transition:background-color_.2s_linear,_width_.2s_ease-in-out,_opacity] group-hover/y:w-[11px] group-focus/y:w-[0.6875rem] group-[&.ps--clicking]/y:w-[11px] outline-none",
    railYThumbColors:
      "bg-[#aaa] group-hover/y:bg-[#999] group-focus/y:bg-[#999] group-[&.ps--clicking]/y:bg-[#999]",
  },
  wu = {
    ps: "string",
    railX: "string",
    railXColors: "string",
    railXThumb: "string",
    railXThumbColors: "string",
    railY: "string",
    railYColors: "string",
    railYThumb: "string",
    railYThumbColors: "string",
  };
class Tr {
  constructor(e, r = {}, n = {}) {
    (this._element = e),
      (this._options = this._getConfig(r)),
      (this._classes = this._getClasses(n)),
      (this.perfectScrollbar = null),
      (this._observer = null),
      (this._psClasses = [
        {
          ps: "ps__rail-x",
          te: this._classes.railX,
          teColor: this._classes.railXColors,
        },
        {
          ps: "ps__rail-y",
          te: this._classes.railY,
          teColor: this._classes.railYColors,
        },
        {
          ps: "ps__thumb-x",
          te: this._classes.railXThumb,
          teColor: this._classes.railXThumbColors,
        },
        {
          ps: "ps__thumb-y",
          te: this._classes.railYThumb,
          teColor: this._classes.railYThumbColors,
        },
      ]),
      this._element && (At.setData(e, $i, this), J.addClass(this._element, vu)),
      this.init();
  }
  static get NAME() {
    return Kn;
  }
  get railX() {
    return nt.findOne(".ps__rail-x", this._element);
  }
  get railY() {
    return nt.findOne(".ps__rail-y", this._element);
  }
  _getConfig(e) {
    const r = J.getDataAttributes(this._element);
    return (
      r.handlers !== void 0 && (r.handlers = r.handlers.split(" ")),
      (e = { ...yu, ...r, ...e }),
      Ee(Kn, e, bu),
      e
    );
  }
  _getClasses(e) {
    const r = J.getDataClassAttributes(this._element);
    return (e = { ..._u, ...r, ...e }), Ee(Kn, e, wu), e;
  }
  dispose() {
    this._options.positionRight && this._observer.disconnect(),
      At.removeData(this._element, $i),
      (this._element = null),
      (this._dataAttrOptions = null),
      (this._options = null),
      this.perfectScrollbar.destroy(),
      this.removeEvent(Qn),
      (this.perfectScrollbar = null);
  }
  init() {
    if (
      ((this.perfectScrollbar = new bi(this._element, this._options)),
      this._addPerfectScrollbarStyles(),
      this._updateScrollPosition(),
      this.perfectScrollbar.update(),
      this._initEvents(Qn),
      this._options.positionRight)
    ) {
      this._observer = new ResizeObserver(() => {
        setTimeout(() => {
          this._updateScrollPosition();
        }, 100);
      });
      const e = { attributes: !0, attributeFilter: ["class", "className"] };
      this._observer.observe(this._element, e);
    }
  }
  _updateScrollPosition() {
    const e = getComputedStyle(this._element).getPropertyValue("height"),
      r = getComputedStyle(this._element).getPropertyValue("width");
    this.railX &&
      (this.railX.style.transform = `translateY(calc(-100% + ${this._canTransform(e) ? e : "0px"}))`),
      this.railY &&
        (this.railY.style.transform = `translateX(calc(-100% + ${this._canTransform(r) ? r : "0px"}))`);
  }
  _canTransform(e) {
    return e && e.includes("px");
  }
  update() {
    return this.perfectScrollbar.update();
  }
  _initEvents(e = []) {
    e.forEach(({ ps: r, te: n }) =>
      Z.on(this._element, r, (s) => Z.trigger(this._element, n, { e: s }))
    );
  }
  _addPerfectScrollbarStyles() {
    this._psClasses.forEach((e) => {
      const r = nt.findOne(`.${e.ps}`, this._element);
      J.addClass(r, e.te), J.addClass(r, e.teColor);
    }),
      J.addClass(this._element, this._classes.ps),
      J.removeClass(this._element, "ps");
  }
  removeEvent(e) {
    let r = [];
    typeof e == "string" && (r = Qn.filter(({ te: n }) => n === e)),
      r.forEach(({ ps: n, te: s }) => {
        Z.off(this._element, n), Z.off(this._element, s);
      });
  }
  static jQueryInterface(e) {
    return this.each(function () {
      let r = At.getData(this, $i);
      const n = typeof e == "object" && e;
      if (
        !(!r && /dispose|hide/.test(e)) &&
        (r || (r = new Tr(this, n)), typeof e == "string")
      ) {
        if (typeof r[e] > "u") throw new TypeError(`No method named "${e}"`);
        r[e]();
      }
    });
  }
  static getInstance(e) {
    return At.getData(e, $i);
  }
  static getOrCreateInstance(e, r = {}) {
    return this.getInstance(e) || new this(e, typeof r == "object" ? r : null);
  }
}
const Eu = Tr;
lo("div");
const xu = (t) => {
    ac(() => {
      const e = ao();
      if (e) {
        const r = t.NAME,
          n = e.fn[r];
        (e.fn[r] = t.jQueryInterface),
          (e.fn[r].Constructor = t),
          (e.fn[r].noConflict = () => ((e.fn[r] = n), t.jQueryInterface));
      }
    });
  },
  Cu = (t, e) => {
    Z.on(document, `click.te.${t.NAME}`, e, function (r) {
      r.preventDefault(), t.getOrCreateInstance(this).toggle();
    });
  },
  Tu = (t, e) => {
    Z.on(document, `click.te.${t.NAME}.data-api`, e, function (r) {
      ["A", "AREA"].includes(this.tagName) && r.preventDefault(),
        !Cr(this) && t.getOrCreateInstance(this).show();
    });
  },
  ku = (t, e) => {
    Z.on(document, `click.te.${t.NAME}.data-api`, e, function (r) {
      const n = yn(this);
      if (
        (["A", "AREA"].includes(this.tagName) && r.preventDefault(), Cr(this))
      )
        return;
      Z.one(n, t.EVENT_HIDDEN, () => {
        De(this) && this.focus();
      });
      const s = nt.findOne(t.OPEN_SELECTOR);
      s && s !== n && t.getInstance(s).hide(),
        t.getOrCreateInstance(n).toggle(this);
    });
  },
  Au = (t, e) => {
    Z.on(document, `click.te.${t.NAME}`, e, (r) => {
      r.preventDefault();
      const n = r.target.closest(e);
      t.getOrCreateInstance(n).toggle();
    });
  },
  Su = (t, e) => {
    Z.on(document, `click.te.${t.NAME}`, e, function (r) {
      const n = yn(this);
      ["A", "AREA"].includes(this.tagName) && r.preventDefault(),
        Z.one(n, t.EVENT_SHOW, (c) => {
          c.defaultPrevented ||
            Z.one(n, t.EVENT_HIDDEN, () => {
              De(this) && this.focus();
            });
        });
      const s = nt.findOne(`[${t.OPEN_SELECTOR}="true"]`);
      s && t.getInstance(s).hide(), t.getOrCreateInstance(n).toggle(this);
    });
  },
  Lu = (t, e) => {
    Z.one(document, "mousedown", e, t.autoInitial(new t()));
  },
  Iu = (t, e) => {
    Z.on(document, `click.te.${t.NAME}.data-api`, e, function (r) {
      (r.target.tagName === "A" ||
        (r.delegateTarget && r.delegateTarget.tagName === "A")) &&
        r.preventDefault();
      const n = ro(this);
      nt.find(n).forEach((s) => {
        t.getOrCreateInstance(s, { toggle: !1 }).toggle();
      });
    });
  },
  Pu = (t, e) => {
    [].slice.call(document.querySelectorAll(e)).map(function (r) {
      return new t(r);
    });
  },
  Ou = (t, e) => {
    [].slice.call(document.querySelectorAll(e)).map(function (r) {
      return new t(r);
    });
  },
  Du = (t, e) => {
    nt.find(e).forEach((r) => {
      new t(r);
    }),
      Z.on(
        document,
        `click.te.${t.NAME}.data-api`,
        `${e} img:not([data-te-lightbox-disabled])`,
        t.toggle()
      );
  },
  Hu = (t, e) => {
    const r = (c) =>
        (c[0] === "{" && c[c.length - 1] === "}") ||
        (c[0] === "[" && c[c.length - 1] === "]"),
      n = (c) =>
        typeof c != "string" ? c : r(c) ? JSON.parse(c.replace(/'/g, '"')) : c,
      s = (c) => {
        const u = {};
        return (
          Object.keys(c).forEach((d) => {
            if (d.match(/dataset.*/)) {
              const g = d.slice(7, 8).toLowerCase().concat(d.slice(8));
              u[g] = n(c[d]);
            }
          }),
          u
        );
      };
    nt.find(e).forEach((c) => {
      if (
        J.getDataAttribute(c, "chart") !== "bubble" &&
        J.getDataAttribute(c, "chart") !== "scatter"
      ) {
        const u = J.getDataAttributes(c),
          d = { data: { datasets: [s(u)] } };
        return (
          u.chart && (d.type = u.chart),
          u.labels && (d.data.labels = JSON.parse(u.labels.replace(/'/g, '"'))),
          new t(c, { ...d, ...ru[d.type] })
        );
      }
      return null;
    });
  };
class Nu {
  constructor() {
    this.inits = [];
  }
  get initialized() {
    return this.inits;
  }
  isInited(e) {
    return this.inits.includes(e);
  }
  add(e) {
    this.isInited(e) || this.inits.push(e);
  }
}
const ir = new Nu(),
  ui = {
    alert: { name: "Alert", selector: "[data-te-alert-init]", isToggler: !1 },
    animation: {
      name: "Animate",
      selector: "[data-te-animation-init]",
      isToggler: !1,
    },
    carousel: {
      name: "Carousel",
      selector: "[data-te-carousel-init]",
      isToggler: !1,
    },
    chips: {
      name: "ChipsInput",
      selector: "[data-te-chips-input-init]",
      isToggler: !1,
    },
    chip: {
      name: "Chip",
      selector: "[data-te-chip-init]",
      isToggler: !1,
      onInit: "init",
    },
    datepicker: {
      name: "Datepicker",
      selector: "[data-te-datepicker-init]",
      isToggler: !1,
    },
    datetimepicker: {
      name: "Datetimepicker",
      selector: "[data-te-date-timepicker-init]",
      isToggler: !1,
    },
    input: {
      name: "Input",
      selector: "[data-te-input-wrapper-init]",
      isToggler: !1,
    },
    perfectScrollbar: {
      name: "PerfectScrollbar",
      selector: "[data-te-perfect-scrollbar-init]",
      isToggler: !1,
    },
    rating: {
      name: "Rating",
      selector: "[data-te-rating-init]",
      isToggler: !1,
    },
    scrollspy: {
      name: "ScrollSpy",
      selector: "[data-te-spy='scroll']",
      isToggler: !1,
    },
    select: {
      name: "Select",
      selector: "[data-te-select-init]",
      isToggler: !1,
    },
    sidenav: {
      name: "Sidenav",
      selector: "[data-te-sidenav-init]",
      isToggler: !1,
    },
    stepper: {
      name: "Stepper",
      selector: "[data-te-stepper-init]",
      isToggler: !1,
    },
    timepicker: {
      name: "Timepicker",
      selector: "[data-te-timepicker-init]",
      isToggler: !1,
    },
    toast: { name: "Toast", selector: "[data-te-toast-init]", isToggler: !1 },
    datatable: { name: "Datatable", selector: "[data-te-datatable-init]" },
    popconfirm: {
      name: "Popconfirm",
      selector: "[data-te-toggle='popconfirm']",
    },
    validation: { name: "Validation", selector: "[data-te-validation-init]" },
    smoothScroll: {
      name: "SmoothScroll",
      selector: "a[data-te-smooth-scroll-init]",
    },
    lazyLoad: { name: "LazyLoad", selector: "[data-te-lazy-load-init]" },
    clipboard: { name: "Clipboard", selector: "[data-te-clipboard-init]" },
    infiniteScroll: {
      name: "InfiniteScroll",
      selector: "[data-te-infinite-scroll-init]",
    },
    loadingManagement: {
      name: "LoadingManagement",
      selector: "[data-te-loading-management-init]",
    },
    sticky: { name: "Sticky", selector: "[data-te-sticky-init]" },
    multiRangeSlider: {
      name: "MultiRangeSlider",
      selector: "[data-te-multi-range-slider-init]",
    },
    chart: {
      name: "Chart",
      selector: "[data-te-chart]",
      isToggler: !1,
      advanced: Hu,
    },
    button: {
      name: "Button",
      selector: "[data-te-toggle='button']",
      isToggler: !0,
      callback: Au,
    },
    collapse: {
      name: "Collapse",
      selector: "[data-te-collapse-init]",
      isToggler: !0,
      callback: Iu,
    },
    dropdown: {
      name: "Dropdown",
      selector: "[data-te-dropdown-toggle-ref]",
      isToggler: !0,
      callback: Cu,
    },
    modal: {
      name: "Modal",
      selector: "[data-te-toggle='modal']",
      isToggler: !0,
      callback: Su,
    },
    ripple: {
      name: "Ripple",
      selector: "[data-te-ripple-init]",
      isToggler: !0,
      callback: Lu,
    },
    offcanvas: {
      name: "Offcanvas",
      selector: "[data-te-offcanvas-toggle]",
      isToggler: !0,
      callback: ku,
    },
    tab: {
      name: "Tab",
      selector:
        "[data-te-toggle='tab'], [data-te-toggle='pill'], [data-te-toggle='list']",
      isToggler: !0,
      callback: Tu,
    },
    tooltip: {
      name: "Tooltip",
      selector: "[data-te-toggle='tooltip']",
      isToggler: !1,
      callback: Pu,
    },
    popover: {
      name: "Popover",
      selector: "[data-te-toggle='popover']",
      isToggler: !0,
      callback: Ou,
    },
    lightbox: {
      name: "Lightbox",
      selector: "[data-te-lightbox-init]",
      isToggler: !0,
      callback: Du,
    },
    touch: { name: "Touch", selector: "[data-te-touch-init]" },
  },
  Mu = (t) => ui[t.NAME] || null,
  Wu = (t, e) => {
    if (!t || (!e.allowReinits && ir.isInited(t.NAME))) return;
    ir.add(t.NAME);
    const r = Mu(t),
      n = (r == null ? void 0 : r.isToggler) || !1;
    if ((xu(t), r != null && r.advanced)) {
      r == null || r.advanced(t, r == null ? void 0 : r.selector);
      return;
    }
    if (n) {
      r == null || r.callback(t, r == null ? void 0 : r.selector);
      return;
    }
    nt.find(r == null ? void 0 : r.selector).forEach((s) => {
      let c = t.getInstance(s);
      c || ((c = new t(s)), r != null && r.onInit && c[r.onInit]());
    });
  },
  Ru = (t, e) => {
    t.forEach((r) => Wu(r, e));
  },
  Bu = { allowReinits: !1, checkOtherImports: !1 },
  ju = (t, e = {}) => {
    e = { ...Bu, ...e };
    const r = Object.keys(ui).map((n) => {
      if (document.querySelector(ui[n].selector)) {
        const s = t[ui[n].name];
        return (
          !s &&
            !ir.isInited(n) &&
            e.checkOtherImports &&
            console.warn(
              `Please import ${ui[n].name} from "tw-elements" package and add it to a object parameter inside "initTE" function`
            ),
          s
        );
      }
    });
    Ru(r, e);
  };
ju({ Sidenav: qe });
$(window).on("load", function () {
  document.addEventListener("contextmenu", (u) => u.preventDefault());
  var t = localStorage.getItem("currentbg") || "24",
    e = localStorage.getItem("randombg") || "false",
    r = "";
  if (e === "false")
    if (t) {
      r = $("li[data-id='" + t + "']")
        .children("img")
        .attr("src");
      var n = new Image();
      (n.src = r),
        (n.onload = function () {
          $("#background").css("background-image", "url(" + r + ")"),
            $("#preloader").hide();
        }),
        localStorage.setItem("currentbg", t, { expires: 7 });
    } else {
      r = $("li[data-id='1']").children("img").attr("src");
      var n = new Image();
      (n.src = r),
        (n.onload = function () {
          $("#background").css("background-image", "url(" + r + ")"),
            $("#preloader").hide();
        }),
        localStorage.setItem("currentbg", "1", { expires: 7 });
    }
  else {
    var s = $("#bg-images").data("number"),
      c = zu(1, s);
    r = $("li[data-id='" + c + "']")
      .children("img")
      .attr("src");
    var n = new Image();
    (n.src = r),
      (n.onload = function () {
        $("#background").css("background-image", "url(" + r + ")"),
          $("#preloader").hide();
      }),
      localStorage.setItem("currentbg", c, { expires: 365 });
  }
});
function zu(t, e) {
  return (
    (t = Math.ceil(t)),
    (e = Math.floor(e)),
    Math.floor(Math.random() * (e - t + 1)) + t
  );
}
$(document).on("click", "#randomizebutton", function (t) {
  localStorage.getItem("randombg") === "true"
    ? (localStorage.setItem("randombg", "false", { expires: 365 }),
      document.getElementById("randomcircle").classList.toggle("translate-x-0"),
      console.log("Randomize waifu disabled!"),
      location.reload())
    : (localStorage.setItem("randombg", "true", { expires: 365 }),
      document
        .getElementById("randomcircle")
        .classList.toggle("translate-x-10"),
      console.log("Randomize waifu Activated!"),
      location.reload());
});
$(document).on("click", ".bg", function (t) {
  var e = $(this).data("id"),
    r = $(this).children("img").attr("src");
  $("#background").css("background-image", "url(" + r + ")"),
    localStorage.setItem("currentbg", e, { expires: 365 }),
    localStorage.setItem("randombg", "true", { expires: 365 }),
    console.log("Waifu settings updated"),
    localStorage.getItem("randombg") === "true" &&
      (localStorage.setItem("randombg", "false", { expires: 365 }),
      document
        .getElementById("randomcircle")
        .classList.toggle("translate-x-10"),
      $("#randomizebutton").attr("checked", !1),
      console.log("Randomize waifu Disabled!"));
});
