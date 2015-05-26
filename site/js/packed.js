
/*!
* Bootstrap.js by @fat & @mdo
* Copyright 2013 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e) {
    "use strict";
    e(function() {
        e.support.transition = function() {
            var e = function() {
                var e = document.createElement("bootstrap"), t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                }, n;
                for (n in t)
                    if (e.style[n] !== undefined)
                        return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]', n = function(n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function(t) {
        function s() {
            i.trigger("closed").remove()
        }
        var n = e(this), r = n.attr("data-target"), i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())
            return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    };
    var r = e.fn.alert;
    e.fn.alert = function(t) {
        return this.each(function() {
            var r = e(this), i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
        return e.fn.alert = r, this
    }, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val": "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function() {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("button"), s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
        return e.fn.button = n, this
    }, e(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function(t) {
            return t || (this.paused=!1), this.interval && clearInterval(this.interval), this.options.interval&&!this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        },
        getActiveIndex: function() {
            return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
        },
        to: function(t) {
            var n = this.getActiveIndex(), r = this;
            if (t > this.$items.length - 1 || t < 0)
                return;
            return this.sliding ? this.$element.one("slid", function() {
                r.to(t)
            }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", e(this.$items[t]))
        },
        pause: function(t) {
            return t || (this.paused=!0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
        },
        next: function() {
            if (this.sliding)
                return;
            return this.slide("next")
        },
        prev: function() {
            if (this.sliding)
                return;
            return this.slide("prev")
        },
        slide: function(t, n) {
            var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left": "right", u = t == "next" ? "first": "last", a = this, f;
            this.sliding=!0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {
                relatedTarget: i[0],
                direction: o
            });
            if (i.hasClass("active"))
                return;
            this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                var t = e(a.$indicators.children()[a.getActiveIndex()]);
                t && t.addClass("active")
            }));
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())
                    return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function() {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding=!1, setTimeout(function() {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented())
                    return;
                r.removeClass("active"), i.addClass("active"), this.sliding=!1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    };
    var n = e.fn.carousel;
    e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("carousel"), s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n), o = typeof n == "string" ? n: s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
        return e.fn.carousel = n, this
    }, e(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
        var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = e.extend({}, i.data(), n.data()), o;
        i.carousel(s), (o = n.attr("data-slide-to")) && i.data("carousel").pause().to(o).cycle(), t.preventDefault()
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function() {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function() {
            var t, n, r, i;
            if (this.transitioning || this.$element.hasClass("in"))
                return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning)
                    return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
        },
        hide: function() {
            var t;
            if (this.transitioning ||!this.$element.hasClass("in"))
                return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        },
        reset: function(e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass": "removeClass"]("collapse"), this
        },
        transition: function(t, n, r) {
            var i = this, s = function() {
                n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
            };
            this.$element.trigger(n);
            if (n.isDefaultPrevented())
                return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide": "show"]()
        }
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("collapse"), s = e.extend({}, e.fn.collapse.defaults, r.data(), typeof n == "object" && n);
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n, this
    }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle": n.data();
        n[e(i).hasClass("in") ? "addClass": "removeClass"]("collapsed"), e(i).collapse(s)
    })
}(window.jQuery), !function(e) {
    "use strict";
    function r() {
        e(".dropdown-backdrop").remove(), e(t).each(function() {
            i(e(this)).removeClass("open")
        })
    }
    function i(t) {
        var n = t.attr("data-target"), r;
        n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = n && e(n);
        if (!r ||!r.length)
            r = t.parent();
        return r
    }
    var t = "[data-toggle=dropdown]", n = function(t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function() {
            n.parent().removeClass("open")
        })
    };
    n.prototype = {
        constructor: n,
        toggle: function(t) {
            var n = e(this), s, o;
            if (n.is(".disabled, :disabled"))
                return;
            return s = i(n), o = s.hasClass("open"), r(), o || ("ontouchstart"in document.documentElement && e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click", r), s.toggleClass("open")), n.focus(), !1
        },
        keydown: function(n) {
            var r, s, o, u, a, f;
            if (!/(38|40|27)/.test(n.keyCode))
                return;
            r = e(this), n.preventDefault(), n.stopPropagation();
            if (r.is(".disabled, :disabled"))
                return;
            u = i(r), a = u.hasClass("open");
            if (!a || a && n.keyCode == 27)
                return n.which == 27 && u.find(t).focus(), r.click();
            s = e("[role=menu] li:not(.divider):visible a", u);
            if (!s.length)
                return;
            f = s.index(s.filter(":focus")), n.keyCode == 38 && f > 0 && f--, n.keyCode == 40 && f < s.length - 1 && f++, ~f || (f = 0), s.eq(f).focus()
        }
    };
    var s = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var r = e(this), i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = s, this
    }, e(document).on("click.dropdown.data-api", r).on("click.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", t, n.prototype.toggle).on("keydown.dropdown.data-api", t + ", [role=menu]", n.prototype.keydown)
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {
        constructor: t,
        toggle: function() {
            return this[this.isShown ? "hide": "show"]()
        },
        show: function() {
            var t = this, n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented())
                return;
            this.isShown=!0, this.escape(), this.backdrop(function() {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
                    t.$element.focus().trigger("shown")
                }) : t.$element.focus().trigger("shown")
            })
        },
        hide: function(t) {
            t && t.preventDefault();
            var n = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented())
                return;
            this.isShown=!1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
        },
        enforceFocus: function() {
            var t = this;
            e(document).on("focusin.modal", function(e) {
                t.$element[0] !== e.target&&!t.$element.has(e.target).length && t.$element.focus()
            })
        },
        escape: function() {
            var e = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                t.which == 27 && e.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var t = this, n = setTimeout(function() {
                t.$element.off(e.support.transition.end), t.hideModal()
            }, 500);
            this.$element.one(e.support.transition.end, function() {
                clearTimeout(n), t.hideModal()
            })
        },
        hideModal: function() {
            var e = this;
            this.$element.hide(), this.backdrop(function() {
                e.removeBackdrop(), e.$element.trigger("hidden")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        },
        backdrop: function(t) {
            var n = this, r = this.$element.hasClass("fade") ? "fade": "";
            if (this.isShown && this.options.backdrop) {
                var i = e.support.transition && r;
                this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in");
                if (!t)
                    return;
                i ? this.$backdrop.one(e.support.transition.end, t) : t()
            } else 
                !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
        }
    };
    var n = e.fn.modal;
    e.fn.modal = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("modal"), s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
        return e.fn.modal = n, this
    }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")), s = i.data("modal") ? "toggle": e.extend({
            remote: !/#/.test(r) && r
        }, i.data(), n.data());
        t.preventDefault(), i.modal(s).one("hide", function() {
            n.focus()
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function(t, n, r) {
            var i, s, o, u, a;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled=!0, o = this.options.trigger.split(" ");
            for (a = o.length; a--;)
                u = o[a], u == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : u != "manual" && (i = u == "hover" ? "mouseenter" : "focus", s = u == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
            this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function(t) {
            var n = e.fn[this.type].defaults, r = {}, i;
            this._options && e.each(this._options, function(e, t) {
                n[e] != t && (r[e] = t)
            }, this), i = e(t.currentTarget)[this.type](r).data(this.type);
            if (!i.options.delay ||!i.options.delay.show)
                return i.show();
            clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function() {
                i.hoverState == "in" && i.show()
            }, i.options.delay.show)
        },
        leave: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay ||!n.options.delay.hide)
                return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function() {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        },
        show: function() {
            var t, n, r, i, s, o, u = e.Event("show");
            if (this.hasContent() && this.enabled) {
                this.$element.trigger(u);
                if (u.isDefaultPrevented())
                    return;
                t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), r = t[0].offsetWidth, i = t[0].offsetHeight;
                switch (s) {
                case"bottom":
                    o = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case"top":
                    o = {
                        top: n.top - i,
                        left: n.left + n.width / 2 - r / 2
                    };
                    break;
                case"left":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left - r
                    };
                    break;
                case"right":
                    o = {
                        top: n.top + n.height / 2 - i / 2,
                        left: n.left + n.width
                    }
                }
                this.applyPlacement(o, s), this.$element.trigger("shown")
            }
        },
        applyPlacement: function(e, t) {
            var n = this.tip(), r = n[0].offsetWidth, i = n[0].offsetHeight, s, o, u, a;
            n.offset(e).addClass(t).addClass("in"), s = n[0].offsetWidth, o = n[0].offsetHeight, t == "top" && o != i && (e.top = e.top + i - o, a=!0), t == "bottom" || t == "top" ? (u = 0, e.left < 0 && (u = e.left*-2, e.left = 0, n.offset(e), s = n[0].offsetWidth, o = n[0].offsetHeight), this.replaceArrow(u - r + s, s, "left")) : this.replaceArrow(o - i, o, "top"), a && n.offset(e)
        },
        replaceArrow: function(e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
        },
        setContent: function() {
            var e = this.tip(), t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html": "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function i() {
                var t = setTimeout(function() {
                    n.off(e.support.transition.end).detach()
                }, 500);
                n.one(e.support.transition.end, function() {
                    clearTimeout(t), n.detach()
                })
            }
            var t = this, n = this.tip(), r = e.Event("hide");
            this.$element.trigger(r);
            if (r.isDefaultPrevented())
                return;
            return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? i() : n.detach(), this.$element.trigger("hidden"), this
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var t = this.$element[0];
            return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            }, this.$element.offset())
        },
        getTitle: function() {
            var e, t = this.$element, n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        },
        tip: function() {
            return this.$tip = this.$tip || e(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled=!0
        },
        disable: function() {
            this.enabled=!1
        },
        toggleEnabled: function() {
            this.enabled=!this.enabled
        },
        toggle: function(t) {
            var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type): this;
            n.tip().hasClass("in") ? n.hide() : n.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("tooltip"), s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n, this
    }
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function() {
            var e = this.tip(), t = this.getTitle(), n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html": "text"](t), e.find(".popover-content")[this.options.html ? "html": "text"](n), e.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var e, t = this.$element, n = this.options;
            return e = (typeof n.content == "function" ? n.content.call(t[0]) : n.content) || t.attr("data-content"), e
        },
        tip: function() {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var n = e.fn.popover;
    e.fn.popover = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("popover"), s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.fn.popover.noConflict = function() {
        return e.fn.popover = n, this
    }
}(window.jQuery), !function(e) {
    "use strict";
    function t(t, n) {
        var r = e.proxy(this.process, this), i = e(t).is("body") ? e(window): e(t), s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function() {
            var t = this, n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function() {
                var n = e(this), r = n.data("target") || n.attr("href"), i = /^#\w/.test(r) && e(r);
                return i && i.length && [[i.position().top + (!e.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), r]] || null
            }).sort(function(e, t) {
                return e[0] - t[0]
            }).each(function() {
                t.offsets.push(this[0]), t.targets.push(this[1])
            })
        },
        process: function() {
            var e = this.$scrollElement.scrollTop() + this.options.offset, t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = t - this.$scrollElement.height(), r = this.offsets, i = this.targets, s = this.activeTarget, o;
            if (e >= n)
                return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;)
                s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function(t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("scrollspy"), s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function() {
            var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active"))
                return;
            i = n.find(".active:last a")[0], o = e.Event("show", {
                relatedTarget: i
            }), t.trigger(o);
            if (o.isDefaultPrevented())
                return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function(t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var i = n.find("> .active"), s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    };
    var n = e.fn.tab;
    e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
        return e.fn.tab = n, this
    }, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = e(this.options.menu), this.shown=!1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function() {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function(e) {
            return e
        },
        show: function() {
            var t = e.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.insertAfter(this.$element).css({
                top: t.top + t.height,
                left: t.left
            }).show(), this.shown=!0, this
        },
        hide: function() {
            return this.$menu.hide(), this.shown=!1, this
        },
        lookup: function(t) {
            var n;
            return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
        },
        process: function(t) {
            var n = this;
            return t = e.grep(t, function(e) {
                return n.matcher(e)
            }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
        },
        matcher: function(e) {
            return ~e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function(e) {
            var t = [], n = [], r = [], i;
            while (i = e.shift())
                i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function(e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function(e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function(t) {
            var n = this;
            return t = e(t).map(function(t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function(t) {
            var n = this.$menu.find(".active").removeClass("active"), r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        },
        prev: function(e) {
            var t = this.$menu.find(".active").removeClass("active"), n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function() {
            this.$element.on("focus", e.proxy(this.focus, this)).on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this)).on("mouseleave", "li", e.proxy(this.mouseleave, this))
        },
        eventSupported: function(e) {
            var t = e in this.$element;
            return t || (this.$element.setAttribute(e, "return;"), t = typeof this.$element[e] == "function"), t
        },
        move: function(e) {
            if (!this.shown)
                return;
            switch (e.keyCode) {
            case 9:
            case 13:
            case 27:
                e.preventDefault();
                break;
            case 38:
                e.preventDefault(), this.prev();
                break;
            case 40:
                e.preventDefault(), this.next()
            }
            e.stopPropagation()
        },
        keydown: function(t) {
            this.suppressKeyPressRepeat=~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
        },
        keypress: function(e) {
            if (this.suppressKeyPressRepeat)
                return;
            this.move(e)
        },
        keyup: function(e) {
            switch (e.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown)
                    return;
                this.select();
                break;
            case 27:
                if (!this.shown)
                    return;
                this.hide();
                break;
            default:
                this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        focus: function(e) {
            this.focused=!0
        },
        blur: function(e) {
            this.focused=!1, !this.mousedover && this.shown && this.hide()
        },
        click: function(e) {
            e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus()
        },
        mouseenter: function(t) {
            this.mousedover=!0, this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        },
        mouseleave: function(e) {
            this.mousedover=!1, !this.focused && this.shown && this.hide()
        }
    };
    var n = e.fn.typeahead;
    e.fn.typeahead = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("typeahead"), s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>',
        minLength: 1
    }, e.fn.typeahead.Constructor = t, e.fn.typeahead.noConflict = function() {
        return e.fn.typeahead = n, this
    }, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(t) {
        var n = e(this);
        if (n.data("typeahead"))
            return;
        n.typeahead(n.data())
    })
}(window.jQuery), !function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function() {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function() {
        if (!this.$element.is(":visible"))
            return;
        var t = e(document).height(), n = this.$window.scrollTop(), r = this.$element.offset(), i = this.options.offset, s = i.bottom, o = i.top, u = "affix affix-top affix-bottom", a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top?!1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a)
            return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    };
    var n = e.fn.affix;
    e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("affix"), s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
        offset: 0
    }, e.fn.affix.noConflict = function() {
        return e.fn.affix = n, this
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this), n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery);
/*! DataTables 1.10.3
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */
(function(Da, P, l) {
    var O = function(h) {
        function V(a) {
            var b, c, d = {};
            h.each(a, function(e) {
                if ((b = e.match(/^([^A-Z]+?)([A-Z])/))&&-1 !== "a aa ai ao as b fn i m o s ".indexOf(b[1] + " "))
                    c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && V(a[e])
            });
            a._hungarianMap = d
        }
        function G(a, b, c) {
            a._hungarianMap || V(a);
            var d;
            h.each(b, function(e) {
                d = a._hungarianMap[e];
                if (d !== l && (c || b[d] === l))
                    "o" === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), G(a[d], b[d], c)) : b[d] = b[e]
            })
        }
        function O(a) {
            var b = p.defaults.oLanguage, c = a.sZeroRecords;
            !a.sEmptyTable && (c && "No data available in table" === b.sEmptyTable) && D(a, a, "sZeroRecords", "sEmptyTable");
            !a.sLoadingRecords && (c && "Loading..." === b.sLoadingRecords) && D(a, a, "sZeroRecords", "sLoadingRecords");
            a.sInfoThousands && (a.sThousands = a.sInfoThousands);
            (a = a.sDecimal) && db(a)
        }
        function eb(a) {
            z(a, "ordering", "bSort");
            z(a, "orderMulti", "bSortMulti");
            z(a, "orderClasses", "bSortClasses");
            z(a, "orderCellsTop", "bSortCellsTop");
            z(a, "order", "aaSorting");
            z(a, "orderFixed", "aaSortingFixed");
            z(a, "paging", "bPaginate");
            z(a, "pagingType", "sPaginationType");
            z(a, "pageLength", "iDisplayLength");
            z(a, "searching", "bFilter");
            if (a = a.aoSearchCols)
                for (var b = 0, c = a.length; b < c; b++)
                    a[b] && G(p.models.oSearch, a[b])
        }
        function fb(a) {
            z(a, "orderable", "bSortable");
            z(a, "orderData", "aDataSort");
            z(a, "orderSequence", "asSorting");
            z(a, "orderDataType", "sortDataType")
        }
        function gb(a) {
            var a = a.oBrowser, b = h("<div/>").css({
                position: "absolute",
                top: 0,
                left: 0,
                height: 1,
                width: 1,
                overflow: "hidden"
            }).append(h("<div/>").css({
                position: "absolute",
                top: 1,
                left: 1,
                width: 100,
                overflow: "scroll"
            }).append(h('<div class="test"/>').css({
                width: "100%",
                height: 10
            }))).appendTo("body"), c = b.find(".test");
            a.bScrollOversize = 100 === c[0].offsetWidth;
            a.bScrollbarLeft = 1 !== c.offset().left;
            b.remove()
        }
        function hb(a, b, c, d, e, f) {
            var g, i=!1;
            c !== l && (g = c, i=!0);
            for (; d !== e;)
                a.hasOwnProperty(d) && (g = i ? b(g, a[d], d, a) : a[d], i=!0, d += f);
            return g
        }
        function Ea(a, b) {
            var c = p.defaults.column, d = a.aoColumns.length, c = h.extend({}, p.models.oColumn, c, {
                nTh: b ? b: P.createElement("th"),
                sTitle: c.sTitle ? c.sTitle: b ? b.innerHTML:
                "",
                aDataSort: c.aDataSort ? c.aDataSort: [d],
                mData: c.mData ? c.mData: d,
                idx: d
            });
            a.aoColumns.push(c);
            c = a.aoPreSearchCols;
            c[d] = h.extend({}, p.models.oSearch, c[d]);
            ia(a, d, null)
        }
        function ia(a, b, c) {
            var b = a.aoColumns[b], d = a.oClasses, e = h(b.nTh);
            if (!b.sWidthOrig) {
                b.sWidthOrig = e.attr("width") || null;
                var f = (e.attr("style") || "").match(/width:\s*(\d+[pxem%]+)/);
                f && (b.sWidthOrig = f[1])
            }
            c !== l && null !== c && (fb(c), G(p.defaults.column, c), c.mDataProp !== l&&!c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className &&
            !c.sClass && (c.sClass = c.className), h.extend(b, c), D(b, c, "sWidth", "sWidthOrig"), "number" === typeof c.iDataSort && (b.aDataSort = [c.iDataSort]), D(b, c, "aDataSort"));
            var g = b.mData, i = W(g), j = b.mRender ? W(b.mRender): null, c = function(a) {
                return "string" === typeof a&&-1 !== a.indexOf("@")
            };
            b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
            b.fnGetData = function(a, b, c) {
                var d = i(a, b, l, c);
                return j && b ? j(d, b, a, c) : d
            };
            b.fnSetData = function(a, b, c) {
                return Q(g)(a, b, c)
            };
            "number" !== typeof g && (a._rowReadObject=!0);
            a.oFeatures.bSort ||
            (b.bSortable=!1, e.addClass(d.sSortableNone));
            a =- 1 !== h.inArray("asc", b.asSorting);
            c =- 1 !== h.inArray("desc", b.asSorting);
            !b.bSortable ||!a&&!c ? (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = "") : a&&!c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI)
        }
        function X(a) {
            if (!1 !== a.oFeatures.bAutoWidth) {
                var b = a.aoColumns;
                Fa(a);
                for (var c = 0, d = b.length; c <
                d; c++)
                    b[c].nTh.style.width = b[c].sWidth
            }
            b = a.oScroll;
            ("" !== b.sY || "" !== b.sX) && Y(a);
            u(a, null, "column-sizing", [a])
        }
        function ja(a, b) {
            var c = Z(a, "bVisible");
            return "number" === typeof c[b] ? c[b] : null
        }
        function $(a, b) {
            var c = Z(a, "bVisible"), c = h.inArray(b, c);
            return - 1 !== c ? c : null
        }
        function aa(a) {
            return Z(a, "bVisible").length
        }
        function Z(a, b) {
            var c = [];
            h.map(a.aoColumns, function(a, e) {
                a[b] && c.push(e)
            });
            return c
        }
        function Ga(a) {
            var b = a.aoColumns, c = a.aoData, d = p.ext.type.detect, e, f, g, i, j, h, m, o, k;
            e = 0;
            for (f = b.length; e < f; e++)
                if (m =
                b[e], k = [], !m.sType && m._sManualType)
                    m.sType = m._sManualType;
                else if (!m.sType) {
                    g = 0;
                    for (i = d.length; g < i; g++) {
                        j = 0;
                        for (h = c.length; j < h&&!(k[j] === l && (k[j] = w(a, j, e, "type")), o = d[g](k[j], a), !o || "html" === o); j++);
                        if (o) {
                            m.sType = o;
                            break
                        }
                    }
                    m.sType || (m.sType = "string")
                }
        }
        function ib(a, b, c, d) {
            var e, f, g, i, j, n, m = a.aoColumns;
            if (b)
                for (e = b.length - 1; 0 <= e; e--) {
                    n = b[e];
                    var o = n.targets !== l ? n.targets: n.aTargets;
                    h.isArray(o) || (o = [o]);
                    f = 0;
                    for (g = o.length; f < g; f++)
                        if ("number" === typeof o[f] && 0 <= o[f]) {
                            for (; m.length <= o[f];)
                                Ea(a);
                                d(o[f],
                                n)
                        } else if ("number" === typeof o[f] && 0 > o[f])
                            d(m.length + o[f], n);
                        else if ("string" === typeof o[f]) {
                            i = 0;
                            for (j = m.length; i < j; i++)("_all" == o[f] || h(m[i].nTh).hasClass(o[f])
                                ) && d(i, n)
                        }
                }
            if (c) {
                e = 0;
                for (a = c.length; e < a; e++)
                    d(e, c[e])
            }
        }
        function I(a, b, c, d) {
            var e = a.aoData.length, f = h.extend(!0, {}, p.models.oRow, {
                src: c ? "dom": "data"
            });
            f._aData = b;
            a.aoData.push(f);
            for (var b = a.aoColumns, f = 0, g = b.length; f < g; f++)
                c && Ha(a, e, f, w(a, e, f)), b[f].sType = null;
            a.aiDisplayMaster.push(e);
            (c ||!a.oFeatures.bDeferRender) && Ia(a, e, c, d);
            return e
        }
        function ka(a, b) {
            var c;
            b instanceof h || (b = h(b));
            return b.map(function(b, e) {
                c = la(a, e);
                return I(a, c.data, e, c.cells)
            })
        }
        function w(a, b, c, d) {
            var e = a.iDraw, f = a.aoColumns[c], g = a.aoData[b]._aData, i = f.sDefaultContent, c = f.fnGetData(g, d, {
                settings: a,
                row: b,
                col: c
            });
            if (c === l)
                return a.iDrawError != e && null === i && (R(a, 0, "Requested unknown parameter " + ("function" == typeof f.mData ? "{function}" : "'" + f.mData + "'") + " for row " + b, 4), a.iDrawError = e), i;
            if ((c === g || null === c) && null !== i)
                c = i;
            else if ("function" === typeof c)
                return c.call(g);
            return null === c && "display" == d ? "" : c
        }
        function Ha(a, b, c, d) {
            a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
                settings: a,
                row: b,
                col: c
            })
        }
        function Ja(a) {
            return h.map(a.match(/(\\.|[^\.])+/g), function(a) {
                return a.replace(/\\./g, ".")
            })
        }
        function W(a) {
            if (h.isPlainObject(a)) {
                var b = {};
                h.each(a, function(a, c) {
                    c && (b[a] = W(c))
                });
                return function(a, c, f, g) {
                    var i = b[c] || b._;
                    return i !== l ? i(a, c, f, g) : a
                }
            }
            if (null === a)
                return function(a) {
                    return a
                };
            if ("function" === typeof a)
                return function(b, c, f, g) {
                    return a(b, c, f, g)
                };
            if ("string" ===
            typeof a && ( - 1 !== a.indexOf(".")||-1 !== a.indexOf("[")||-1 !== a.indexOf("("))) {
                var c = function(a, b, f) {
                    var g, i;
                    if ("" !== f) {
                        i = Ja(f);
                        for (var j = 0, h = i.length; j < h; j++) {
                            f = i[j].match(ba);
                            g = i[j].match(S);
                            if (f) {
                                i[j] = i[j].replace(ba, "");
                                "" !== i[j] && (a = a[i[j]]);
                                g = [];
                                i.splice(0, j + 1);
                                i = i.join(".");
                                j = 0;
                                for (h = a.length; j < h; j++)
                                    g.push(c(a[j], b, i));
                                a = f[0].substring(1, f[0].length - 1);
                                a = "" === a ? g : g.join(a);
                                break
                            } else if (g) {
                                i[j] = i[j].replace(S, "");
                                a = a[i[j]]();
                                continue
                            }
                            if (null === a || a[i[j]] === l)
                                return l;
                            a = a[i[j]]
                        }
                    }
                    return a
                };
                return function(b,
                e) {
                    return c(b, e, a)
                }
            }
            return function(b) {
                return b[a]
            }
        }
        function Q(a) {
            if (h.isPlainObject(a))
                return Q(a._);
            if (null === a)
                return function() {};
            if ("function" === typeof a)
                return function(b, d, e) {
                    a(b, "set", d, e)
                };
            if ("string" === typeof a && ( - 1 !== a.indexOf(".")||-1 !== a.indexOf("[")||-1 !== a.indexOf("("))) {
                var b = function(a, d, e) {
                    var e = Ja(e), f;
                    f = e[e.length - 1];
                    for (var g, i, j = 0, h = e.length - 1; j < h; j++) {
                        g = e[j].match(ba);
                        i = e[j].match(S);
                        if (g) {
                            e[j] = e[j].replace(ba, "");
                            a[e[j]] = [];
                            f = e.slice();
                            f.splice(0, j + 1);
                            g = f.join(".");
                            i = 0;
                            for (h =
                            d.length; i < h; i++)
                                f = {}, b(f, d[i], g), a[e[j]].push(f);
                            return 
                        }
                        i && (e[j] = e[j].replace(S, ""), a = a[e[j]](d));
                        if (null === a[e[j]] || a[e[j]] === l)
                            a[e[j]] = {};
                        a = a[e[j]]
                    }
                    if (f.match(S))
                        a[f.replace(S, "")](d);
                    else 
                        a[f.replace(ba, "")] = d
                };
                return function(c, d) {
                    return b(c, d, a)
                }
            }
            return function(b, d) {
                b[a] = d
            }
        }
        function Ka(a) {
            return C(a.aoData, "_aData")
        }
        function ma(a) {
            a.aoData.length = 0;
            a.aiDisplayMaster.length = 0;
            a.aiDisplay.length = 0
        }
        function na(a, b, c) {
            for (var d =- 1, e = 0, f = a.length; e < f; e++)
                a[e] == b ? d = e : a[e] > b && a[e]--;
            - 1 != d && c === l &&
            a.splice(d, 1)
        }
        function oa(a, b, c, d) {
            var e = a.aoData[b], f;
            if ("dom" === c || (!c || "auto" === c) && "dom" === e.src)
                e._aData = la(a, e).data;
            else {
                var g = e.anCells, i;
                if (g) {
                    c = 0;
                    for (f = g.length; c < f; c++) {
                        for (i = g[c]; i.childNodes.length;)
                            i.removeChild(i.firstChild);
                        g[c].innerHTML = w(a, b, c, "display")
                    }
                }
            }
            e._aSortData = null;
            e._aFilterData = null;
            a = a.aoColumns;
            if (d !== l)
                a[d].sType = null;
            else {
                c = 0;
                for (f = a.length; c < f; c++)
                    a[c].sType = null
            }
            La(e)
        }
        function la(a, b) {
            var c = [], d = b.firstChild, e, f, g = 0, i, j = a.aoColumns, n = a._rowReadObject, m = n ? {}
            : [],
            o = function(a, b) {
                if ("string" === typeof a) {
                    var c = a.indexOf("@");
                    - 1 !== c && (c = a.substring(c + 1), Q(a)(m, b.getAttribute(c)))
                }
            }, k = function(a) {
                f = j[g];
                i = h.trim(a.innerHTML);
                f && f._bAttrSrc ? (Q(f.mData._)(m, i), o(f.mData.sort, a), o(f.mData.type, a), o(f.mData.filter, a)) : n ? (f._setter || (f._setter = Q(f.mData)), f._setter(m, i)) : m.push(i);
                g++
            };
            if (d)
                for (; d;) {
                    e = d.nodeName.toUpperCase();
                    if ("TD" == e || "TH" == e)
                        k(d), c.push(d);
                        d = d.nextSibling
                } else {
                c = b.anCells;
                d = 0;
                for (e = c.length; d < e; d++)
                    k(c[d])
                }
            return {
                data: m,
                cells: c
            }
        }
        function Ia(a,
        b, c, d) {
            var e = a.aoData[b], f = e._aData, g = [], i, j, h, m, o;
            if (null === e.nTr) {
                i = c || P.createElement("tr");
                e.nTr = i;
                e.anCells = g;
                i._DT_RowIndex = b;
                La(e);
                m = 0;
                for (o = a.aoColumns.length; m < o; m++) {
                    h = a.aoColumns[m];
                    j = c ? d[m] : P.createElement(h.sCellType);
                    g.push(j);
                    if (!c || h.mRender || h.mData !== m)
                        j.innerHTML = w(a, b, m, "display");
                    h.sClass && (j.className += " " + h.sClass);
                    h.bVisible&&!c ? i.appendChild(j) : !h.bVisible && c && j.parentNode.removeChild(j);
                    h.fnCreatedCell && h.fnCreatedCell.call(a.oInstance, j, w(a, b, m), f, b, m)
                }
                u(a, "aoRowCreatedCallback",
                null, [i, f, b])
            }
            e.nTr.setAttribute("role", "row")
        }
        function La(a) {
            var b = a.nTr, c = a._aData;
            if (b) {
                c.DT_RowId && (b.id = c.DT_RowId);
                if (c.DT_RowClass) {
                    var d = c.DT_RowClass.split(" ");
                    a.__rowc = a.__rowc ? Ma(a.__rowc.concat(d)) : d;
                    h(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)
                }
                c.DT_RowData && h(b).data(c.DT_RowData)
            }
        }
        function jb(a) {
            var b, c, d, e, f, g = a.nTHead, i = a.nTFoot, j = 0 === h("th, td", g).length, n = a.oClasses, m = a.aoColumns;
            j && (e = h("<tr/>").appendTo(g));
            b = 0;
            for (c = m.length; b < c; b++)
                f = m[b], d = h(f.nTh).addClass(f.sClass),
                j && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr("aria-controls", a.sTableId), Na(a, f.nTh, b))), f.sTitle != d.html() && d.html(f.sTitle), Oa(a, "header")(a, d, f, n);
            j && ca(a.aoHeader, g);
            h(g).find(">tr").attr("role", "row");
            h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH);
            h(i).find(">tr>th, >tr>td").addClass(n.sFooterTH);
            if (null !== i) {
                a = a.aoFooter[0];
                b = 0;
                for (c = a.length; b < c; b++)
                    f = m[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass)
            }
        }
        function da(a,
        b, c) {
            var d, e, f, g = [], i = [], j = a.aoColumns.length, n;
            if (b) {
                c === l && (c=!1);
                d = 0;
                for (e = b.length; d < e; d++) {
                    g[d] = b[d].slice();
                    g[d].nTr = b[d].nTr;
                    for (f = j - 1; 0 <= f; f--)
                        !a.aoColumns[f].bVisible&&!c && g[d].splice(f, 1);
                    i.push([])
                }
                d = 0;
                for (e = g.length; d < e; d++) {
                    if (a = g[d].nTr)
                        for (; f = a.firstChild;)
                            a.removeChild(f);
                    f = 0;
                    for (b = g[d].length; f < b; f++)
                        if (n = j = 1, i[d][f] === l) {
                            a.appendChild(g[d][f].cell);
                            for (i[d][f] = 1; g[d + j] !== l && g[d][f].cell == g[d + j][f].cell;)
                                i[d + j][f] = 1, j++;
                                for (; g[d][f + n] !== l && g[d][f].cell == g[d][f + n].cell;) {
                                    for (c = 0; c <
                                    j; c++)
                                        i[d + c][f + n] = 1;
                                        n++
                                }
                                h(g[d][f].cell).attr("rowspan", j).attr("colspan", n)
                        }
                }
            }
        }
        function L(a) {
            var b = u(a, "aoPreDrawCallback", "preDraw", [a]);
            if ( - 1 !== h.inArray(!1, b))
                B(a, !1);
            else {
                var b = [], c = 0, d = a.asStripeClasses, e = d.length, f = a.oLanguage, g = a.iInitDisplayStart, i = "ssp" == A(a), j = a.aiDisplay;
                a.bDrawing=!0;
                g !== l&&-1 !== g && (a._iDisplayStart = i ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart =- 1);
                var g = a._iDisplayStart, n = a.fnDisplayEnd();
                if (a.bDeferLoading)
                    a.bDeferLoading=!1, a.iDraw++, B(a, !1);
                else if (i) {
                    if (!a.bDestroying &&
                    !kb(a))
                        return 
                } else 
                    a.iDraw++;
                if (0 !== j.length) {
                    f = i ? a.aoData.length : n;
                    for (i = i ? 0 : g; i < f; i++) {
                        var m = j[i], o = a.aoData[m];
                        null === o.nTr && Ia(a, m);
                        m = o.nTr;
                        if (0 !== e) {
                            var k = d[c%e];
                            o._sRowStripe != k && (h(m).removeClass(o._sRowStripe).addClass(k), o._sRowStripe = k)
                        }
                        u(a, "aoRowCallback", null, [m, o._aData, c, i]);
                        b.push(m);
                        c++
                    }
                } else 
                    c = f.sZeroRecords, 1 == a.iDraw && "ajax" == A(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h("<tr/>", {
                        "class": e ? d[0]: ""
                    }).append(h("<td />", {
                        valign: "top",
                        colSpan: aa(a),
                        "class": a.oClasses.sRowEmpty
                    }).html(c))[0];
                u(a, "aoHeaderCallback", "header", [h(a.nTHead).children("tr")[0], Ka(a), g, n, j]);
                u(a, "aoFooterCallback", "footer", [h(a.nTFoot).children("tr")[0], Ka(a), g, n, j]);
                d = h(a.nTBody);
                d.children().detach();
                d.append(h(b));
                u(a, "aoDrawCallback", "draw", [a]);
                a.bSorted=!1;
                a.bFiltered=!1;
                a.bDrawing=!1
            }
        }
        function M(a, b) {
            var c = a.oFeatures, d = c.bFilter;
            c.bSort && lb(a);
            d ? ea(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();
            !0 !== b && (a._iDisplayStart = 0);
            a._drawHold = b;
            L(a);
            a._drawHold =
            !1
        }
        function mb(a) {
            var b = a.oClasses, c = h(a.nTable), c = h("<div/>").insertBefore(c), d = a.oFeatures, e = h("<div/>", {
                id: a.sTableId + "_wrapper",
                "class": b.sWrapper + (a.nTFoot ? "" : " " + b.sNoFooter)
            });
            a.nHolding = c[0];
            a.nTableWrapper = e[0];
            a.nTableReinsertBefore = a.nTable.nextSibling;
            for (var f = a.sDom.split(""), g, i, j, n, m, o, k = 0; k < f.length; k++) {
                g = null;
                i = f[k];
                if ("<" == i) {
                    j = h("<div/>")[0];
                    n = f[k + 1];
                    if ("'" == n || '"' == n) {
                        m = "";
                        for (o = 2; f[k + o] != n;)
                            m += f[k + o], o++;
                        "H" == m ? m = b.sJUIHeader : "F" == m && (m = b.sJUIFooter);
                        - 1 != m.indexOf(".") ? (n = m.split("."),
                        j.id = n[0].substr(1, n[0].length - 1), j.className = n[1]) : "#" == m.charAt(0) ? j.id = m.substr(1, m.length - 1) : j.className = m;
                        k += o
                    }
                    e.append(j);
                    e = h(j)
                } else if (">" == i)
                    e = e.parent();
                else if ("l" == i && d.bPaginate && d.bLengthChange)
                    g = nb(a);
                else if ("f" == i && d.bFilter)
                    g = ob(a);
                else if ("r" == i && d.bProcessing)
                    g = pb(a);
                else if ("t" == i)
                    g = qb(a);
                else if ("i" == i && d.bInfo)
                    g = rb(a);
                else if ("p" == i && d.bPaginate)
                    g = sb(a);
                else if (0 !== p.ext.feature.length) {
                    j = p.ext.feature;
                    o = 0;
                    for (n = j.length; o < n; o++)
                        if (i == j[o].cFeature) {
                            g = j[o].fnInit(a);
                            break
                        }
                }
                g &&
                (j = a.aanFeatures, j[i] || (j[i] = []), j[i].push(g), e.append(g))
            }
            c.replaceWith(e)
        }
        function ca(a, b) {
            var c = h(b).children("tr"), d, e, f, g, i, j, n, m, o, k;
            a.splice(0, a.length);
            f = 0;
            for (j = c.length; f < j; f++)
                a.push([]);
            f = 0;
            for (j = c.length; f < j; f++) {
                d = c[f];
                for (e = d.firstChild; e;) {
                    if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                        m = 1 * e.getAttribute("colspan");
                        o = 1 * e.getAttribute("rowspan");
                        m=!m || 0 === m || 1 === m ? 1 : m;
                        o=!o || 0 === o || 1 === o ? 1 : o;
                        g = 0;
                        for (i = a[f]; i[g];)
                            g++;
                        n = g;
                        k = 1 === m?!0 : !1;
                        for (i = 0; i < m; i++)
                            for (g = 0; g < o; g++)
                                a[f +
                                g][n + i] = {
                                    cell: e,
                                    unique: k
                                }, a[f + g].nTr = d
                    }
                    e = e.nextSibling
                }
            }
        }
        function pa(a, b, c) {
            var d = [];
            c || (c = a.aoHeader, b && (c = [], ca(c, b)));
            for (var b = 0, e = c.length; b < e; b++)
                for (var f = 0, g = c[b].length; f < g; f++)
                    if (c[b][f].unique && (!d[f] ||!a.bSortCellsTop))
                        d[f] = c[b][f].cell;
            return d
        }
        function qa(a, b, c) {
            u(a, "aoServerParams", "serverParams", [b]);
            if (b && h.isArray(b)) {
                var d = {}, e = /(.*?)\[\]$/;
                h.each(b, function(a, b) {
                    var c = b.name.match(e);
                    c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value
                });
                b = d
            }
            var f, g = a.ajax, i = a.oInstance;
            if (h.isPlainObject(g) && g.data) {
                f = g.data;
                var j = h.isFunction(f) ? f(b): f, b = h.isFunction(f) && j ? j: h.extend(!0, b, j);
                delete g.data
            }
            j = {
                data: b,
                success: function(b) {
                    var d = b.error || b.sError;
                    d && a.oApi._fnLog(a, 0, d);
                    a.json = b;
                    u(a, null, "xhr", [a, b]);
                    c(b)
                },
                dataType: "json",
                cache: !1,
                type: a.sServerMethod,
                error: function(b, c) {
                    var d = a.oApi._fnLog;
                    "parsererror" == c ? d(a, 0, "Invalid JSON response", 1) : 4 === b.readyState && d(a, 0, "Ajax error", 7);
                    B(a, !1)
                }
            };
            a.oAjaxData = b;
            u(a, null, "preXhr", [a, b]);
            a.fnServerData ? a.fnServerData.call(i, a.sAjaxSource,
            h.map(b, function(a, b) {
                return {
                    name: b,
                    value: a
                }
            }), c, a) : a.sAjaxSource || "string" === typeof g ? a.jqXHR = h.ajax(h.extend(j, {
                url: g || a.sAjaxSource
            })) : h.isFunction(g) ? a.jqXHR = g.call(i, b, c, a) : (a.jqXHR = h.ajax(h.extend(j, g)), g.data = f)
        }
        function kb(a) {
            return a.bAjaxDataGet ? (a.iDraw++, B(a, !0), qa(a, tb(a), function(b) {
                ub(a, b)
            }), !1) : !0
        }
        function tb(a) {
            var b = a.aoColumns, c = b.length, d = a.oFeatures, e = a.oPreviousSearch, f = a.aoPreSearchCols, g, i = [], j, n, m, o = T(a);
            g = a._iDisplayStart;
            j=!1 !== d.bPaginate ? a._iDisplayLength : - 1;
            var k = function(a,
            b) {
                i.push({
                    name: a,
                    value: b
                })
            };
            k("sEcho", a.iDraw);
            k("iColumns", c);
            k("sColumns", C(b, "sName").join(","));
            k("iDisplayStart", g);
            k("iDisplayLength", j);
            var l = {
                draw: a.iDraw,
                columns: [],
                order: [],
                start: g,
                length: j,
                search: {
                    value: e.sSearch,
                    regex: e.bRegex
                }
            };
            for (g = 0; g < c; g++)
                n = b[g], m = f[g], j = "function" == typeof n.mData ? "function" : n.mData, l.columns.push({
                    data: j,
                    name: n.sName,
                    searchable: n.bSearchable,
                    orderable: n.bSortable,
                    search: {
                        value: m.sSearch,
                        regex: m.bRegex
                    }
                }), k("mDataProp_" + g, j), d.bFilter && (k("sSearch_" + g, m.sSearch),
                k("bRegex_" + g, m.bRegex), k("bSearchable_" + g, n.bSearchable)), d.bSort && k("bSortable_" + g, n.bSortable);
            d.bFilter && (k("sSearch", e.sSearch), k("bRegex", e.bRegex));
            d.bSort && (h.each(o, function(a, b) {
                l.order.push({
                    column: b.col,
                    dir: b.dir
                });
                k("iSortCol_" + a, b.col);
                k("sSortDir_" + a, b.dir)
            }), k("iSortingCols", o.length));
            b = p.ext.legacy.ajax;
            return null === b ? a.sAjaxSource ? i : l : b ? i : l
        }
        function ub(a, b) {
            var c = b.sEcho !== l ? b.sEcho: b.draw, d = b.iTotalRecords !== l ? b.iTotalRecords: b.recordsTotal, e = b.iTotalDisplayRecords !== l ? b.iTotalDisplayRecords:
            b.recordsFiltered;
            if (c) {
                if (1 * c < a.iDraw)
                    return;
                a.iDraw = 1 * c
            }
            ma(a);
            a._iRecordsTotal = parseInt(d, 10);
            a._iRecordsDisplay = parseInt(e, 10);
            c = ra(a, b);
            d = 0;
            for (e = c.length; d < e; d++)
                I(a, c[d]);
            a.aiDisplay = a.aiDisplayMaster.slice();
            a.bAjaxDataGet=!1;
            L(a);
            a._bInitComplete || sa(a, b);
            a.bAjaxDataGet=!0;
            B(a, !1)
        }
        function ra(a, b) {
            var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== l ? a.ajax.dataSrc: a.sAjaxDataProp;
            return "data" === c ? b.aaData || b[c] : "" !== c ? W(c)(b) : b
        }
        function ob(a) {
            var b = a.oClasses, c = a.sTableId, d = a.oLanguage, e = a.oPreviousSearch,
            f = a.aanFeatures, g = '<input type="search" class="' + b.sFilterInput + '"/>', i = d.sSearch, i = i.match(/_INPUT_/) ? i.replace("_INPUT_", g): i + g, b = h("<div/>", {
                id: !f.f ? c + "_filter": null,
                "class": b.sFilter
            }).append(h("<label/>").append(i)), f = function() {
                var b=!this.value ? "" : this.value;
                b != e.sSearch && (ea(a, {
                    sSearch: b,
                    bRegex: e.bRegex,
                    bSmart: e.bSmart,
                    bCaseInsensitive: e.bCaseInsensitive
                }), a._iDisplayStart = 0, L(a))
            }, g = null !== a.searchDelay ? a.searchDelay: "ssp" === A(a) ? 400: 0, j = h("input", b).val(e.sSearch).attr("placeholder", d.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",
            g ? ta(f, g) : f).bind("keypress.DT", function(a) {
                if (13 == a.keyCode)
                    return !1
            }).attr("aria-controls", c);
            h(a.nTable).on("search.dt.DT", function(b, c) {
                if (a === c)
                    try {
                        j[0] !== P.activeElement && j.val(e.sSearch)
                } catch (d) {}
            });
            return b[0]
        }
        function ea(a, b, c) {
            var d = a.oPreviousSearch, e = a.aoPreSearchCols, f = function(a) {
                d.sSearch = a.sSearch;
                d.bRegex = a.bRegex;
                d.bSmart = a.bSmart;
                d.bCaseInsensitive = a.bCaseInsensitive
            };
            Ga(a);
            if ("ssp" != A(a)) {
                vb(a, b.sSearch, c, b.bEscapeRegex !== l?!b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive);
                f(b);
                for (b = 0; b < e.length; b++)
                    wb(a, e[b].sSearch, b, e[b].bEscapeRegex !== l?!e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
                xb(a)
            } else 
                f(b);
            a.bFiltered=!0;
            u(a, null, "search", [a])
        }
        function xb(a) {
            for (var b = p.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f < g; f++) {
                for (var i = [], j = 0, h = c.length; j < h; j++)
                    e = c[j], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, j) && i.push(e);
                c.length = 0;
                c.push.apply(c, i)
            }
        }
        function wb(a, b, c, d, e, f) {
            if ("" !== b)
                for (var g = a.aiDisplay, d = Pa(b, d, e, f), e = g.length - 1; 0 <= e; e--)
                    b = a.aoData[g[e]]._aFilterData[c],
                    d.test(b) || g.splice(e, 1)
        }
        function vb(a, b, c, d, e, f) {
            var d = Pa(b, d, e, f), e = a.oPreviousSearch.sSearch, f = a.aiDisplayMaster, g;
            0 !== p.ext.search.length && (c=!0);
            g = yb(a);
            if (0 >= b.length)
                a.aiDisplay = f.slice();
            else {
                if (g || c || e.length > b.length || 0 !== b.indexOf(e) || a.bSorted)
                    a.aiDisplay = f.slice();
                b = a.aiDisplay;
                for (c = b.length - 1; 0 <= c; c--)
                    d.test(a.aoData[b[c]]._sFilterRow) || b.splice(c, 1)
            }
        }
        function Pa(a, b, c, d) {
            a = b ? a : Qa(a);
            c && (a = "^(?=.*?" + h.map(a.match(/"[^"]+"|[^ ]+/g) || "", function(a) {
                if ('"' === a.charAt(0))
                    var b = a.match(/^"(.*)"$/),
                    a = b ? b[1]: a;
                return a.replace('"', "")
            }).join(")(?=.*?") + ").*$");
            return RegExp(a, d ? "i" : "")
        }
        function Qa(a) {
            return a.replace(Xb, "\\$1")
        }
        function yb(a) {
            var b = a.aoColumns, c, d, e, f, g, i, j, h, m = p.ext.type.search;
            c=!1;
            d = 0;
            for (f = a.aoData.length; d < f; d++)
                if (h = a.aoData[d], !h._aFilterData) {
                    i = [];
                    e = 0;
                    for (g = b.length; e < g; e++)
                        c = b[e], c.bSearchable ? (j = w(a, d, e, "filter"), m[c.sType] && (j = m[c.sType](j)), null === j && (j = ""), "string" !== typeof j && j.toString && (j = j.toString())) : j = "", j.indexOf&&-1 !== j.indexOf("&") && (ua.innerHTML = j, j = Yb ?
                        ua.textContent : ua.innerText), j.replace && (j = j.replace(/[\r\n]/g, "")), i.push(j);
                        h._aFilterData = i;
                        h._sFilterRow = i.join("  ");
                        c=!0
                }
            return c
        }
        function zb(a) {
            return {
                search: a.sSearch,
                smart: a.bSmart,
                regex: a.bRegex,
                caseInsensitive: a.bCaseInsensitive
            }
        }
        function Ab(a) {
            return {
                sSearch: a.search,
                bSmart: a.smart,
                bRegex: a.regex,
                bCaseInsensitive: a.caseInsensitive
            }
        }
        function rb(a) {
            var b = a.sTableId, c = a.aanFeatures.i, d = h("<div/>", {
                "class": a.oClasses.sInfo,
                id: !c ? b + "_info": null
            });
            c || (a.aoDrawCallback.push({
                fn: Bb,
                sName: "information"
            }),
            d.attr("role", "status").attr("aria-live", "polite"), h(a.nTable).attr("aria-describedby", b + "_info"));
            return d[0]
        }
        function Bb(a) {
            var b = a.aanFeatures.i;
            if (0 !== b.length) {
                var c = a.oLanguage, d = a._iDisplayStart + 1, e = a.fnDisplayEnd(), f = a.fnRecordsTotal(), g = a.fnRecordsDisplay(), i = g ? c.sInfo: c.sInfoEmpty;
                g !== f && (i += " " + c.sInfoFiltered);
                i += c.sInfoPostFix;
                i = Cb(a, i);
                c = c.fnInfoCallback;
                null !== c && (i = c.call(a.oInstance, a, d, e, f, g, i));
                h(b).html(i)
            }
        }
        function Cb(a, b) {
            var c = a.fnFormatNumber, d = a._iDisplayStart + 1, e = a._iDisplayLength,
            f = a.fnRecordsDisplay(), g =- 1 === e;
            return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)))
        }
        function va(a) {
            var b, c, d = a.iInitDisplayStart, e = a.aoColumns, f;
            c = a.oFeatures;
            if (a.bInitialised) {
                mb(a);
                jb(a);
                da(a, a.aoHeader);
                da(a, a.aoFooter);
                B(a, !0);
                c.bAutoWidth && Fa(a);
                b = 0;
                for (c = e.length; b < c; b++)
                    f = e[b], f.sWidth &&
                    (f.nTh.style.width = s(f.sWidth));
                M(a);
                e = A(a);
                "ssp" != e && ("ajax" == e ? qa(a, [], function(c) {
                    var f = ra(a, c);
                    for (b = 0; b < f.length; b++)
                        I(a, f[b]);
                    a.iInitDisplayStart = d;
                    M(a);
                    B(a, !1);
                    sa(a, c)
                }, a) : (B(a, !1), sa(a)))
            } else 
                setTimeout(function() {
                    va(a)
                }, 200)
        }
        function sa(a, b) {
            a._bInitComplete=!0;
            b && X(a);
            u(a, "aoInitComplete", "init", [a, b])
        }
        function Ra(a, b) {
            var c = parseInt(b, 10);
            a._iDisplayLength = c;
            Sa(a);
            u(a, null, "length", [a, c])
        }
        function nb(a) {
            for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f = e ? d[0] : d, d = e ?
            d[1] : d, e = h("<select/>", {
                name: c + "_length",
                "aria-controls": c,
                "class": b.sLengthSelect
            }), g = 0, i = f.length; g < i; g++)
                e[0][g] = new Option(d[g], f[g]);
            var j = h("<div><label/></div>").addClass(b.sLength);
            a.aanFeatures.l || (j[0].id = c + "_length");
            j.children().append(a.oLanguage.sLengthMenu.replace("_MENU_", e[0].outerHTML));
            h("select", j).val(a._iDisplayLength).bind("change.DT", function() {
                Ra(a, h(this).val());
                L(a)
            });
            h(a.nTable).bind("length.dt.DT", function(b, c, d) {
                a === c && h("select", j).val(d)
            });
            return j[0]
        }
        function sb(a) {
            var b =
            a.sPaginationType, c = p.ext.pager[b], d = "function" === typeof c, e = function(a) {
                L(a)
            }, b = h("<div/>").addClass(a.oClasses.sPaging + b)[0], f = a.aanFeatures;
            d || c.fnInit(a, b, e);
            f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
                fn: function(a) {
                    if (d) {
                        var b = a._iDisplayStart, j = a._iDisplayLength, h = a.fnRecordsDisplay(), m =- 1 === j, b = m ? 0 : Math.ceil(b / j), j = m ? 1 : Math.ceil(h / j), h = c(b, j), o, m = 0;
                        for (o = f.p.length; m < o; m++)
                            Oa(a, "pageButton")(a, f.p[m], m, h, b, j)
                    } else 
                        c.fnUpdate(a, e)
                },
                sName: "pagination"
            }));
            return b
        }
        function Ta(a,
        b, c) {
            var d = a._iDisplayStart, e = a._iDisplayLength, f = a.fnRecordsDisplay();
            0 === f||-1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f && (d = 0)) : "first" == b ? d = 0 : "previous" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "next" == b ? d + e < f && (d += e) : "last" == b ? d = Math.floor((f - 1) / e) * e : R(a, 0, "Unknown paging action: " + b, 5);
            b = a._iDisplayStart !== d;
            a._iDisplayStart = d;
            b && (u(a, null, "page", [a]), c && L(a));
            return b
        }
        function pb(a) {
            return h("<div/>", {
                id: !a.aanFeatures.r ? a.sTableId + "_processing": null,
                "class": a.oClasses.sProcessing
            }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
        }
        function B(a, b) {
            a.oFeatures.bProcessing && h(a.aanFeatures.r).css("display", b ? "block" : "none");
            u(a, null, "processing", [a, b])
        }
        function qb(a) {
            var b = h(a.nTable);
            b.attr("role", "grid");
            var c = a.oScroll;
            if ("" === c.sX && "" === c.sY)
                return a.nTable;
            var d = c.sX, e = c.sY, f = a.oClasses, g = b.children("caption"), i = g.length ? g[0]._captionSide: null, j = h(b[0].cloneNode(!1)), n = h(b[0].cloneNode(!1)), m = b.children("tfoot");
            c.sX && "100%" === b.attr("width") && b.removeAttr("width");
            m.length || (m = null);
            c = h("<div/>", {
                "class": f.sScrollWrapper
            }).append(h("<div/>",
            {
                "class": f.sScrollHead
            }).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: d?!d ? null: s(d): "100%"
            }).append(h("<div/>", {
                "class": f.sScrollHeadInner
            }).css({
                "box-sizing": "content-box",
                width: c.sXInner || "100%"
            }).append(j.removeAttr("id").css("margin-left", 0).append(b.children("thead")))).append("top" === i ? g : null)).append(h("<div/>", {
                "class": f.sScrollBody
            }).css({
                overflow: "auto",
                height: !e ? null: s(e),
                width: !d ? null: s(d)
            }).append(b));
            m && c.append(h("<div/>", {
                "class": f.sScrollFoot
            }).css({
                overflow: "hidden",
                border: 0,
                width: d?!d ? null: s(d): "100%"
            }).append(h("<div/>", {
                "class": f.sScrollFootInner
            }).append(n.removeAttr("id").css("margin-left", 0).append(b.children("tfoot")))).append("bottom" === i ? g : null));
            var b = c.children(), o = b[0], f = b[1], k = m ? b[2]: null;
            d && h(f).scroll(function() {
                var a = this.scrollLeft;
                o.scrollLeft = a;
                m && (k.scrollLeft = a)
            });
            a.nScrollHead = o;
            a.nScrollBody = f;
            a.nScrollFoot = k;
            a.aoDrawCallback.push({
                fn: Y,
                sName: "scrolling"
            });
            return c[0]
        }
        function Y(a) {
            var b = a.oScroll, c = b.sX, d = b.sXInner, e = b.sY, f = b.iBarWidth,
            g = h(a.nScrollHead), i = g[0].style, j = g.children("div"), n = j[0].style, m = j.children("table"), j = a.nScrollBody, o = h(j), k = j.style, l = h(a.nScrollFoot).children("div"), p = l.children("table"), r = h(a.nTHead), q = h(a.nTable), fa = q[0], N = fa.style, J = a.nTFoot ? h(a.nTFoot): null, t = a.oBrowser, u = t.bScrollOversize, x, v, w, K, y, z = [], A = [], B = [], C, D = function(a) {
                a = a.style;
                a.paddingTop = "0";
                a.paddingBottom = "0";
                a.borderTopWidth = "0";
                a.borderBottomWidth = "0";
                a.height = 0
            };
            q.children("thead, tfoot").remove();
            y = r.clone().prependTo(q);
            x = r.find("tr");
            w = y.find("tr");
            y.find("th, td").removeAttr("tabindex");
            J && (K = J.clone().prependTo(q), v = J.find("tr"), K = K.find("tr"));
            c || (k.width = "100%", g[0].style.width = "100%");
            h.each(pa(a, y), function(b, c) {
                C = ja(a, b);
                c.style.width = a.aoColumns[C].sWidth
            });
            J && F(function(a) {
                a.style.width = ""
            }, K);
            b.bCollapse && "" !== e && (k.height = o[0].offsetHeight + r[0].offsetHeight + "px");
            g = q.outerWidth();
            if ("" === c) {
                if (N.width = "100%", u && (q.find("tbody").height() > j.offsetHeight || "scroll" == o.css("overflow-y")))
                    N.width = s(q.outerWidth() - f)
            } else 
                "" !==
                d ? N.width = s(d) : g == o.width() && o.height() < q.height() ? (N.width = s(g - f), q.outerWidth() > g - f && (N.width = s(g))) : N.width = s(g);
            g = q.outerWidth();
            F(D, w);
            F(function(a) {
                B.push(a.innerHTML);
                z.push(s(h(a).css("width")))
            }, w);
            F(function(a, b) {
                a.style.width = z[b]
            }, x);
            h(w).height(0);
            J && (F(D, K), F(function(a) {
                A.push(s(h(a).css("width")))
            }, K), F(function(a, b) {
                a.style.width = A[b]
            }, v), h(K).height(0));
            F(function(a, b) {
                a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + B[b] + "</div>";
                a.style.width = z[b]
            },
            w);
            J && F(function(a, b) {
                a.innerHTML = "";
                a.style.width = A[b]
            }, K);
            if (q.outerWidth() < g) {
                v = j.scrollHeight > j.offsetHeight || "scroll" == o.css("overflow-y") ? g + f : g;
                if (u && (j.scrollHeight > j.offsetHeight || "scroll" == o.css("overflow-y")))
                    N.width = s(v - f);
                ("" === c || "" !== d) && R(a, 1, "Possible column misalignment", 6)
            } else 
                v = "100%";
            k.width = s(v);
            i.width = s(v);
            J && (a.nScrollFoot.style.width = s(v));
            !e && u && (k.height = s(fa.offsetHeight + f));
            e && b.bCollapse && (k.height = s(e), b = c && fa.offsetWidth > j.offsetWidth ? f : 0, fa.offsetHeight < j.offsetHeight &&
            (k.height = s(fa.offsetHeight + b)));
            b = q.outerWidth();
            m[0].style.width = s(b);
            n.width = s(b);
            m = q.height() > j.clientHeight || "scroll" == o.css("overflow-y");
            t = "padding" + (t.bScrollbarLeft ? "Left" : "Right");
            n[t] = m ? f + "px" : "0px";
            J && (p[0].style.width = s(b), l[0].style.width = s(b), l[0].style[t] = m ? f + "px" : "0px");
            o.scroll();
            if ((a.bSorted || a.bFiltered)&&!a._drawHold)
                j.scrollTop = 0
        }
        function F(a, b, c) {
            for (var d = 0, e = 0, f = b.length, g, i; e < f;) {
                g = b[e].firstChild;
                for (i = c ? c[e].firstChild : null; g;)
                    1 === g.nodeType && (c ? a(g, i, d) : a(g, d), d++), g =
                    g.nextSibling, i = c ? i.nextSibling : null;
                e++
            }
        }
        function Fa(a) {
            var b = a.nTable, c = a.aoColumns, d = a.oScroll, e = d.sY, f = d.sX, g = d.sXInner, i = c.length, d = Z(a, "bVisible"), j = h("th", a.nTHead), n = b.getAttribute("width"), m = b.parentNode, o=!1, k, l;
            for (k = 0; k < d.length; k++)
                l = c[d[k]], null !== l.sWidth && (l.sWidth = Db(l.sWidthOrig, m), o=!0);
            if (!o&&!f&&!e && i == aa(a) && i == j.length)
                for (k = 0; k < i; k++)
                    c[k].sWidth = s(j.eq(k).width());
            else {
                i = h(b).clone().empty().css("visibility", "hidden").removeAttr("id").append(h(a.nTHead).clone(!1)).append(h(a.nTFoot).clone(!1)).append(h("<tbody><tr/></tbody>"));
                i.find("tfoot th, tfoot td").css("width", "");
                var p = i.find("tbody tr"), j = pa(a, i.find("thead")[0]);
                for (k = 0; k < d.length; k++)
                    l = c[d[k]], j[k].style.width = null !== l.sWidthOrig && "" !== l.sWidthOrig ? s(l.sWidthOrig) : "";
                if (a.aoData.length)
                    for (k = 0; k < d.length; k++)
                        o = d[k], l = c[o], h(Eb(a, o)).clone(!1).append(l.sContentPadding).appendTo(p);
                i.appendTo(m);
                f && g ? i.width(g) : f ? (i.css("width", "auto"), i.width() < m.offsetWidth && i.width(m.offsetWidth)) : e ? i.width(m.offsetWidth) : n && i.width(n);
                Fb(a, i[0]);
                if (f) {
                    for (k = g = 0; k < d.length; k++)
                        l =
                        c[d[k]], e = h(j[k]).outerWidth(), g += null === l.sWidthOrig ? e : parseInt(l.sWidth, 10) + e - h(j[k]).width();
                    i.width(s(g));
                    b.style.width = s(g)
                }
                for (k = 0; k < d.length; k++)
                    if (l = c[d[k]], e = h(j[k]).width())
                        l.sWidth = s(e);
                b.style.width = s(i.css("width"));
                i.remove()
            }
            n && (b.style.width = s(n));
            if ((n || f)&&!a._reszEvt)
                h(Da).bind("resize.DT-" + a.sInstance, ta(function() {
                    X(a)
                })), a._reszEvt=!0
        }
        function ta(a, b) {
            var c = b !== l ? b: 200, d, e;
            return function() {
                var b = this, g =+ new Date, i = arguments;
                d && g < d + c ? (clearTimeout(e), e = setTimeout(function() {
                    d =
                    l;
                    a.apply(b, i)
                }, c)) : d ? (d = g, a.apply(b, i)) : d = g
            }
        }
        function Db(a, b) {
            if (!a)
                return 0;
            var c = h("<div/>").css("width", s(a)).appendTo(b || P.body), d = c[0].offsetWidth;
            c.remove();
            return d
        }
        function Fb(a, b) {
            var c = a.oScroll;
            if (c.sX || c.sY)
                c=!c.sX ? c.iBarWidth : 0, b.style.width = s(h(b).outerWidth() - c)
        }
        function Eb(a, b) {
            var c = Gb(a, b);
            if (0 > c)
                return null;
            var d = a.aoData[c];
            return !d.nTr ? h("<td/>").html(w(a, c, b, "display"))[0] : d.anCells[b]
        }
        function Gb(a, b) {
            for (var c, d =- 1, e =- 1, f = 0, g = a.aoData.length; f < g; f++)
                c = w(a, f, b, "display") + "",
                c = c.replace(Zb, ""), c.length > d && (d = c.length, e = f);
            return e
        }
        function s(a) {
            return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
        }
        function Hb() {
            if (!p.__scrollbarWidth) {
                var a = h("<p/>").css({
                    width: "100%",
                    height: 200,
                    padding: 0
                })[0], b = h("<div/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 200,
                    height: 150,
                    padding: 0,
                    overflow: "hidden",
                    visibility: "hidden"
                }).append(a).appendTo("body"), c = a.offsetWidth;
                b.css("overflow", "scroll");
                a = a.offsetWidth;
                c === a && (a = b[0].clientWidth);
                b.remove();
                p.__scrollbarWidth =
                c - a
            }
            return p.__scrollbarWidth
        }
        function T(a) {
            var b, c, d = [], e = a.aoColumns, f, g, i, j;
            b = a.aaSortingFixed;
            c = h.isPlainObject(b);
            var n = [];
            f = function(a) {
                a.length&&!h.isArray(a[0]) ? n.push(a) : n.push.apply(n, a)
            };
            h.isArray(b) && f(b);
            c && b.pre && f(b.pre);
            f(a.aaSorting);
            c && b.post && f(b.post);
            for (a = 0; a < n.length; a++) {
                j = n[a][0];
                f = e[j].aDataSort;
                b = 0;
                for (c = f.length; b < c; b++)
                    g = f[b], i = e[g].sType || "string", n[a]._idx === l && (n[a]._idx = h.inArray(n[a][1], e[g].asSorting)), d.push({
                        src: j,
                        col: g,
                        dir: n[a][1],
                        index: n[a]._idx,
                        type: i,
                        formatter: p.ext.type.order[i +
                        "-pre"]
                    })
            }
            return d
        }
        function lb(a) {
            var b, c, d = [], e = p.ext.type.order, f = a.aoData, g = 0, i, h = a.aiDisplayMaster, n;
            Ga(a);
            n = T(a);
            b = 0;
            for (c = n.length; b < c; b++)
                i = n[b], i.formatter && g++, Ib(a, i.col);
            if ("ssp" != A(a) && 0 !== n.length) {
                b = 0;
                for (c = h.length; b < c; b++)
                    d[h[b]] = b;
                g === n.length ? h.sort(function(a, b) {
                    var c, e, g, i, h = n.length, j = f[a]._aSortData, l = f[b]._aSortData;
                    for (g = 0; g < h; g++)
                        if (i = n[g], c = j[i.col], e = l[i.col], c = c < e?-1 : c > e ? 1 : 0, 0 !== c)
                            return "asc" === i.dir ? c : - c;
                    c = d[a];
                    e = d[b];
                    return c < e?-1 : c > e ? 1 : 0
                }) : h.sort(function(a, b) {
                    var c,
                    g, i, h, j = n.length, l = f[a]._aSortData, p = f[b]._aSortData;
                    for (i = 0; i < j; i++)
                        if (h = n[i], c = l[h.col], g = p[h.col], h = e[h.type + "-" + h.dir] || e["string-" + h.dir], c = h(c, g), 0 !== c)
                            return c;
                    c = d[a];
                    g = d[b];
                    return c < g?-1 : c > g ? 1 : 0
                })
            }
            a.bSorted=!0
        }
        function Jb(a) {
            for (var b, c, d = a.aoColumns, e = T(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
                c = d[f];
                var i = c.asSorting;
                b = c.sTitle.replace(/<.*?>/g, "");
                var h = c.nTh;
                h.removeAttribute("aria-sort");
                c.bSortable && (0 < e.length && e[0].col == f ? (h.setAttribute("aria-sort", "asc" == e[0].dir ? "ascending" :
                "descending"), c = i[e[0].index + 1] || i[0]) : c = i[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending);
                h.setAttribute("aria-label", b)
            }
        }
        function Ua(a, b, c, d) {
            var e = a.aaSorting, f = a.aoColumns[b].asSorting, g = function(a, b) {
                var c = a._idx;
                c === l && (c = h.inArray(a[1], f));
                return c + 1 < f.length ? c + 1 : b ? null : 0
            };
            "number" === typeof e[0] && (e = a.aaSorting = [e]);
            c && a.oFeatures.bSortMulti ? (c = h.inArray(b, C(e, "0")), - 1 !== c ? (b = g(e[c], !0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([b, f[0], 0]), e[e.length - 1]._idx = 0)) : e.length &&
            e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0);
            M(a);
            "function" == typeof d && d(a)
        }
        function Na(a, b, c, d) {
            var e = a.aoColumns[c];
            Va(b, {}, function(b) {
                !1 !== e.bSortable && (a.oFeatures.bProcessing ? (B(a, !0), setTimeout(function() {
                    Ua(a, c, b.shiftKey, d);
                    "ssp" !== A(a) && B(a, !1)
                }, 0)) : Ua(a, c, b.shiftKey, d))
            })
        }
        function wa(a) {
            var b = a.aLastSort, c = a.oClasses.sSortColumn, d = T(a), e = a.oFeatures, f, g;
            if (e.bSort && e.bSortClasses) {
                e = 0;
                for (f = b.length; e < f; e++)
                    g = b[e].src, h(C(a.aoData,
                    "anCells", g)).removeClass(c + (2 > e ? e + 1 : 3));
                e = 0;
                for (f = d.length; e < f; e++)
                    g = d[e].src, h(C(a.aoData, "anCells", g)).addClass(c + (2 > e ? e + 1 : 3))
            }
            a.aLastSort = d
        }
        function Ib(a, b) {
            var c = a.aoColumns[b], d = p.ext.order[c.sSortDataType], e;
            d && (e = d.call(a.oInstance, a, b, $(a, b)));
            for (var f, g = p.ext.type.order[c.sType + "-pre"], i = 0, h = a.aoData.length; i < h; i++)
                if (c = a.aoData[i], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d)
                    f = d ? e[i] : w(a, i, b, "sort"), c._aSortData[b] = g ? g(f) : f
        }
        function xa(a) {
            if (a.oFeatures.bStateSave&&!a.bDestroying) {
                var b =
                {
                    time: + new Date,
                    start: a._iDisplayStart,
                    length: a._iDisplayLength,
                    order: h.extend(!0, [], a.aaSorting),
                    search: zb(a.oPreviousSearch),
                    columns: h.map(a.aoColumns, function(b, d) {
                        return {
                            visible: b.bVisible,
                            search: zb(a.aoPreSearchCols[d])
                        }
                    })
                };
                u(a, "aoStateSaveParams", "stateSaveParams", [a, b]);
                a.oSavedState = b;
                a.fnStateSaveCallback.call(a.oInstance, a, b)
            }
        }
        function Kb(a) {
            var b, c, d = a.aoColumns;
            if (a.oFeatures.bStateSave) {
                var e = a.fnStateLoadCallback.call(a.oInstance, a);
                if (e && e.time && (b = u(a, "aoStateLoadParams", "stateLoadParams",
                [a, e]), - 1 === h.inArray(!1, b) && (b = a.iStateDuration, !(0 < b && e.time<+new Date - 1E3 * b) && d.length === e.columns.length))) {
                    a.oLoadedState = h.extend(!0, {}, e);
                    a._iDisplayStart = e.start;
                    a.iInitDisplayStart = e.start;
                    a._iDisplayLength = e.length;
                    a.aaSorting = [];
                    h.each(e.order, function(b, c) {
                        a.aaSorting.push(c[0] >= d.length ? [0, c[1]] : c)
                    });
                    h.extend(a.oPreviousSearch, Ab(e.search));
                    b = 0;
                    for (c = e.columns.length; b < c; b++) {
                        var f = e.columns[b];
                        d[b].bVisible = f.visible;
                        h.extend(a.aoPreSearchCols[b], Ab(f.search))
                    }
                    u(a, "aoStateLoaded", "stateLoaded",
                    [a, e])
                }
            }
        }
        function ya(a) {
            var b = p.settings, a = h.inArray(a, C(b, "nTable"));
            return - 1 !== a ? b[a] : null
        }
        function R(a, b, c, d) {
            c = "DataTables warning: " + (null !== a ? "table id=" + a.sTableId + " - " : "") + c;
            d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);
            if (b)
                Da.console && console.log && console.log(c);
            else if (a = p.ext, "alert" == (a.sErrMode || a.errMode))
                alert(c);
            else 
                throw Error(c);
        }
        function D(a, b, c, d) {
            h.isArray(c) ? h.each(c, function(c, d) {
                h.isArray(d) ? D(a, b, d[0], d[1]) : D(a, b, d)
            }) : (d === l &&
            (d = c), b[c] !== l && (a[d] = b[c]))
        }
        function Lb(a, b, c) {
            var d, e;
            for (e in b)
                b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && h.isArray(d) ? d.slice() : d);
            return a
        }
        function Va(a, b, c) {
            h(a).bind("click.DT", b, function(b) {
                a.blur();
                c(b)
            }).bind("keypress.DT", b, function(a) {
                13 === a.which && (a.preventDefault(), c(a))
            }).bind("selectstart.DT", function() {
                return !1
            })
        }
        function y(a, b, c, d) {
            c && a[b].push({
                fn: c,
                sName: d
            })
        }
        function u(a, b, c, d) {
            var e =
            [];
            b && (e = h.map(a[b].slice().reverse(), function(b) {
                return b.fn.apply(a.oInstance, d)
            }));
            null !== c && h(a.nTable).trigger(c + ".dt", d);
            return e
        }
        function Sa(a) {
            var b = a._iDisplayStart, c = a.fnDisplayEnd(), d = a._iDisplayLength;
            b >= c && (b = c - d);
            if ( - 1 === d || 0 > b)
                b = 0;
            a._iDisplayStart = b
        }
        function Oa(a, b) {
            var c = a.renderer, d = p.ext.renderer[b];
            return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" === typeof c ? d[c] || d._ : d._
        }
        function A(a) {
            return a.oFeatures.bServerSide ? "ssp" : a.ajax || a.sAjaxSource ? "ajax" : "dom"
        }
        function Wa(a, b) {
            var c =
            [], c = Mb.numbers_length, d = Math.floor(c / 2);
            b <= c ? c = U(0, b) : a <= d ? (c = U(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ? c = U(b - (c - 2), b) : (c = U(a - 1, a + 2), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0, "ellipsis"), c.splice(0, 0, 0));
            c.DT_el = "span";
            return c
        }
        function db(a) {
            h.each({
                num: function(b) {
                    return za(b, a)
                },
                "num-fmt": function(b) {
                    return za(b, a, Xa)
                },
                "html-num": function(b) {
                    return za(b, a, Aa)
                },
                "html-num-fmt": function(b) {
                    return za(b, a, Aa, Xa)
                }
            }, function(b, c) {
                v.type.order[b + a + "-pre"] = c
            })
        }
        function Nb(a) {
            return function() {
                var b =
                [ya(this[p.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return p.ext.internal[a].apply(this, b)
            }
        }
        var p, v, q, r, t, Ya = {}, Ob = /[\r\n]/g, Aa = /<.*?>/g, $b = /^[\w\+\-]/, ac = /[\w\+\-]$/, Xb = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), Xa = /[',$\u00a3\u20ac\u00a5%\u2009\u202F]/g, H = function(a) {
            return !a ||!0 === a || "-" === a?!0 : !1
        }, Pb = function(a) {
            var b = parseInt(a, 10);
            return !isNaN(b) && isFinite(a) ? b : null
        }, Qb = function(a, b) {
            Ya[b] || (Ya[b] = RegExp(Qa(b), "g"));
            return "string" ===
            typeof a && "." !== b ? a.replace(/\./g, "").replace(Ya[b], ".") : a
        }, Za = function(a, b, c) {
            var d = "string" === typeof a;
            b && d && (a = Qb(a, b));
            c && d && (a = a.replace(Xa, ""));
            return H(a) ||!isNaN(parseFloat(a)) && isFinite(a)
        }, Rb = function(a, b, c) {
            return H(a)?!0 : !(H(a) || "string" === typeof a) ? null : Za(a.replace(Aa, ""), b, c)?!0 : null
        }, C = function(a, b, c) {
            var d = [], e = 0, f = a.length;
            if (c !== l)
                for (; e < f; e++)
                    a[e] && a[e][b] && d.push(a[e][b][c]);
            else 
                for (; e < f; e++)
                    a[e] && d.push(a[e][b]);
            return d
        }, ga = function(a, b, c, d) {
            var e = [], f = 0, g = b.length;
            if (d !==
            l)
                for (; f < g; f++)
                    e.push(a[b[f]][c][d]);
            else 
                for (; f < g; f++)
                    e.push(a[b[f]][c]);
            return e
        }, U = function(a, b) {
            var c = [], d;
            b === l ? (b = 0, d = a) : (d = b, b = a);
            for (var e = b; e < d; e++)
                c.push(e);
            return c
        }, Ma = function(a) {
            var b = [], c, d, e = a.length, f, g = 0;
            d = 0;
            a: for (; d < e; d++) {
                c = a[d];
                for (f = 0; f < g; f++)
                    if (b[f] === c)
                        continue a;
                b.push(c);
                g++
            }
            return b
        }, z = function(a, b, c) {
            a[b] !== l && (a[c] = a[b])
        }, ba = /\[.*?\]$/, S = /\(\)$/, ua = h("<div>")[0], Yb = ua.textContent !== l, Zb = /<.*?>/g;
        p = function(a) {
            this.$ = function(a, b) {
                return this.api(!0).$(a, b)
            };
            this._ = function(a,
            b) {
                return this.api(!0).rows(a, b).data()
            };
            this.api = function(a) {
                return a ? new q(ya(this[v.iApiIndex])) : new q(this)
            };
            this.fnAddData = function(a, b) {
                var c = this.api(!0), d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a): c.row.add(a);
                (b === l || b) && c.draw();
                return d.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function(a) {
                var b = this.api(!0).columns.adjust(), c = b.settings()[0], d = c.oScroll;
                a === l || a ? b.draw(!1) : ("" !== d.sX || "" !== d.sY) && Y(c)
            };
            this.fnClearTable = function(a) {
                var b = this.api(!0).clear();
                (a === l || a) && b.draw()
            };
            this.fnClose = function(a) {
                this.api(!0).row(a).child.hide()
            };
            this.fnDeleteRow = function(a, b, c) {
                var d = this.api(!0), a = d.rows(a), e = a.settings()[0], h = e.aoData[a[0][0]];
                a.remove();
                b && b.call(this, e, h);
                (c === l || c) && d.draw();
                return h
            };
            this.fnDestroy = function(a) {
                this.api(!0).destroy(a)
            };
            this.fnDraw = function(a) {
                this.api(!0).draw(!a)
            };
            this.fnFilter = function(a, b, c, d, e, h) {
                e = this.api(!0);
                null === b || b === l ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h);
                e.draw()
            };
            this.fnGetData = function(a, b) {
                var c =
                this.api(!0);
                if (a !== l) {
                    var d = a.nodeName ? a.nodeName.toLowerCase(): "";
                    return b !== l || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data() || null
                }
                return c.data().toArray()
            };
            this.fnGetNodes = function(a) {
                var b = this.api(!0);
                return a !== l ? b.row(a).node() : b.rows().nodes().flatten().toArray()
            };
            this.fnGetPosition = function(a) {
                var b = this.api(!0), c = a.nodeName.toUpperCase();
                return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible, a.column]) : null
            };
            this.fnIsOpen = function(a) {
                return this.api(!0).row(a).child.isShown()
            };
            this.fnOpen = function(a, b, c) {
                return this.api(!0).row(a).child(b, c).show().child()[0]
            };
            this.fnPageChange = function(a, b) {
                var c = this.api(!0).page(a);
                (b === l || b) && c.draw(!1)
            };
            this.fnSetColumnVis = function(a, b, c) {
                a = this.api(!0).column(a).visible(b);
                (c === l || c) && a.columns.adjust().draw()
            };
            this.fnSettings = function() {
                return ya(this[v.iApiIndex])
            };
            this.fnSort = function(a) {
                this.api(!0).order(a).draw()
            };
            this.fnSortListener = function(a, b, c) {
                this.api(!0).order.listener(a, b, c)
            };
            this.fnUpdate = function(a, b, c, d, e) {
                var h =
                this.api(!0);
                c === l || null === c ? h.row(b).data(a) : h.cell(b, c).data(a);
                (e === l || e) && h.columns.adjust();
                (d === l || d) && h.draw();
                return 0
            };
            this.fnVersionCheck = v.fnVersionCheck;
            var b = this, c = a === l, d = this.length;
            c && (a = {});
            this.oApi = this.internal = v.internal;
            for (var e in p.ext.internal)
                e && (this[e] = Nb(e));
            this.each(function() {
                var e = {}, g = 1 < d ? Lb(e, a, !0): a, i = 0, j, n = this.getAttribute("id"), e=!1, m = p.defaults;
                if ("table" != this.nodeName.toLowerCase())
                    R(null, 0, "Non-table node initialisation (" + this.nodeName + ")", 2);
                else {
                    eb(m);
                    fb(m.column);
                    G(m, m, !0);
                    G(m.column, m.column, !0);
                    G(m, g);
                    var o = p.settings, i = 0;
                    for (j = o.length; i < j; i++) {
                        if (o[i].nTable == this) {
                            j = g.bRetrieve !== l ? g.bRetrieve : m.bRetrieve;
                            if (c || j)
                                return o[i].oInstance;
                            if (g.bDestroy !== l ? g.bDestroy : m.bDestroy) {
                                o[i].oInstance.fnDestroy();
                                break
                            } else {
                                R(o[i], 0, "Cannot reinitialise DataTable", 3);
                                return 
                            }
                        }
                        if (o[i].sTableId == this.id) {
                            o.splice(i, 1);
                            break
                        }
                    }
                    if (null === n || "" === n)
                        this.id = n = "DataTables_Table_" + p.ext._unique++;
                    var k = h.extend(!0, {}, p.models.oSettings, {
                        nTable: this,
                        oApi: b.internal,
                        oInit: g,
                        sDestroyWidth: h(this)[0].style.width,
                        sInstance: n,
                        sTableId: n
                    });
                    o.push(k);
                    k.oInstance = 1 === b.length ? b : h(this).dataTable();
                    eb(g);
                    g.oLanguage && O(g.oLanguage);
                    g.aLengthMenu&&!g.iDisplayLength && (g.iDisplayLength = h.isArray(g.aLengthMenu[0]) ? g.aLengthMenu[0][0] : g.aLengthMenu[0]);
                    g = Lb(h.extend(!0, {}, m), g);
                    D(k.oFeatures, g, "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));
                    D(k, g, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber",
                    "sServerMethod", "aaSorting", "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp", "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback", "fnStateSaveCallback", "renderer", "searchDelay", ["iCookieDuration", "iStateDuration"], ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength", "_iDisplayLength"], ["bJQueryUI", "bJUI"]]);
                    D(k.oScroll, g, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], ["bScrollCollapse", "bCollapse"]]);
                    D(k.oLanguage, g, "fnInfoCallback");
                    y(k, "aoDrawCallback", g.fnDrawCallback, "user");
                    y(k, "aoServerParams", g.fnServerParams, "user");
                    y(k, "aoStateSaveParams", g.fnStateSaveParams, "user");
                    y(k, "aoStateLoadParams", g.fnStateLoadParams, "user");
                    y(k, "aoStateLoaded", g.fnStateLoaded, "user");
                    y(k, "aoRowCallback", g.fnRowCallback, "user");
                    y(k, "aoRowCreatedCallback", g.fnCreatedRow, "user");
                    y(k, "aoHeaderCallback", g.fnHeaderCallback, "user");
                    y(k, "aoFooterCallback", g.fnFooterCallback, "user");
                    y(k, "aoInitComplete", g.fnInitComplete,
                    "user");
                    y(k, "aoPreDrawCallback", g.fnPreDrawCallback, "user");
                    n = k.oClasses;
                    g.bJQueryUI ? (h.extend(n, p.ext.oJUIClasses, g.oClasses), g.sDom === m.sDom && "lfrtip" === m.sDom && (k.sDom = '<"H"lfr>t<"F"ip>'), k.renderer) ? h.isPlainObject(k.renderer)&&!k.renderer.header && (k.renderer.header = "jqueryui") : k.renderer = "jqueryui" : h.extend(n, p.ext.classes, g.oClasses);
                    h(this).addClass(n.sTable);
                    if ("" !== k.oScroll.sX || "" !== k.oScroll.sY)
                        k.oScroll.iBarWidth = Hb();
                    !0 === k.oScroll.sX && (k.oScroll.sX = "100%");
                    k.iInitDisplayStart === l && (k.iInitDisplayStart =
                    g.iDisplayStart, k._iDisplayStart = g.iDisplayStart);
                    null !== g.iDeferLoading && (k.bDeferLoading=!0, i = h.isArray(g.iDeferLoading), k._iRecordsDisplay = i ? g.iDeferLoading[0] : g.iDeferLoading, k._iRecordsTotal = i ? g.iDeferLoading[1] : g.iDeferLoading);
                    "" !== g.oLanguage.sUrl ? (k.oLanguage.sUrl = g.oLanguage.sUrl, h.getJSON(k.oLanguage.sUrl, null, function(a) {
                        O(a);
                        G(m.oLanguage, a);
                        h.extend(true, k.oLanguage, g.oLanguage, a);
                        va(k)
                    }), e=!0) : h.extend(!0, k.oLanguage, g.oLanguage);
                    null === g.asStripeClasses && (k.asStripeClasses = [n.sStripeOdd,
                    n.sStripeEven]);
                    var i = k.asStripeClasses, r = h("tbody tr:eq(0)", this);
                    - 1 !== h.inArray(!0, h.map(i, function(a) {
                        return r.hasClass(a)
                    })) && (h("tbody tr", this).removeClass(i.join(" ")), k.asDestroyStripes = i.slice());
                    var o = [], q, i = this.getElementsByTagName("thead");
                    0 !== i.length && (ca(k.aoHeader, i[0]), o = pa(k));
                    if (null === g.aoColumns) {
                        q = [];
                        i = 0;
                        for (j = o.length; i < j; i++)
                            q.push(null)
                        } else 
                            q = g.aoColumns;
                    i = 0;
                    for (j = q.length; i < j; i++)
                        Ea(k, o ? o[i] : null);
                    ib(k, g.aoColumnDefs, q, function(a, b) {
                        ia(k, a, b)
                    });
                    if (r.length) {
                        var s = function(a,
                        b) {
                            return a.getAttribute("data-" + b) ? b : null
                        };
                        h.each(la(k, r[0]).cells, function(a, b) {
                            var c = k.aoColumns[a];
                            if (c.mData === a) {
                                var d = s(b, "sort") || s(b, "order"), e = s(b, "filter") || s(b, "search");
                                if (d !== null || e !== null) {
                                    c.mData = {
                                        _: a + ".display",
                                        sort: d !== null ? a + ".@data-" + d: l,
                                        type: d !== null ? a + ".@data-" + d: l,
                                        filter: e !== null ? a + ".@data-" + e: l
                                    };
                                    ia(k, a)
                                }
                            }
                        })
                    }
                    var t = k.oFeatures;
                    g.bStateSave && (t.bStateSave=!0, Kb(k, g), y(k, "aoDrawCallback", xa, "state_save"));
                    if (g.aaSorting === l) {
                        o = k.aaSorting;
                        i = 0;
                        for (j = o.length; i < j; i++)
                            o[i][1] = k.aoColumns[i].asSorting[0]
                    }
                    wa(k);
                    t.bSort && y(k, "aoDrawCallback", function() {
                        if (k.bSorted) {
                            var a = T(k), b = {};
                            h.each(a, function(a, c) {
                                b[c.src] = c.dir
                            });
                            u(k, null, "order", [k, a, b]);
                            Jb(k)
                        }
                    });
                    y(k, "aoDrawCallback", function() {
                        (k.bSorted || A(k) === "ssp" || t.bDeferRender) && wa(k)
                    }, "sc");
                    gb(k);
                    i = h(this).children("caption").each(function() {
                        this._captionSide = h(this).css("caption-side")
                    });
                    j = h(this).children("thead");
                    0 === j.length && (j = h("<thead/>").appendTo(this));
                    k.nTHead = j[0];
                    j = h(this).children("tbody");
                    0 === j.length && (j = h("<tbody/>").appendTo(this));
                    k.nTBody =
                    j[0];
                    j = h(this).children("tfoot");
                    if (0 === j.length && 0 < i.length && ("" !== k.oScroll.sX || "" !== k.oScroll.sY))
                        j = h("<tfoot/>").appendTo(this);
                    0 === j.length || 0 === j.children().length ? h(this).addClass(n.sNoFooter) : 0 < j.length && (k.nTFoot = j[0], ca(k.aoFooter, k.nTFoot));
                    if (g.aaData)
                        for (i = 0; i < g.aaData.length; i++)
                            I(k, g.aaData[i]);
                    else (k.bDeferLoading || "dom" == A(k)
                        ) && ka(k, h(k.nTBody).children("tr"));
                    k.aiDisplay = k.aiDisplayMaster.slice();
                    k.bInitialised=!0;
                    !1 === e && va(k)
                }
            });
            b = null;
            return this
        };
        var Sb = [], x = Array.prototype,
        bc = function(a) {
            var b, c, d = p.settings, e = h.map(d, function(a) {
                return a.nTable
            });
            if (a) {
                if (a.nTable && a.oApi)
                    return [a];
                if (a.nodeName && "table" === a.nodeName.toLowerCase())
                    return b = h.inArray(a, e), - 1 !== b ? [d[b]] : null;
                if (a && "function" === typeof a.settings)
                    return a.settings().toArray();
                "string" === typeof a ? c = h(a) : a instanceof h && (c = a)
            } else 
                return [];
            if (c)
                return c.map(function() {
                    b = h.inArray(this, e);
                    return - 1 !== b ? d[b] : null
                }).toArray()
        };
        q = function(a, b) {
            if (!this instanceof q)
                throw "DT API must be constructed as a new object";
            var c = [], d = function(a) {
                (a = bc(a)) && c.push.apply(c, a)
            };
            if (h.isArray(a))
                for (var e = 0, f = a.length; e < f; e++)
                    d(a[e]);
            else 
                d(a);
            this.context = Ma(c);
            b && this.push.apply(this, b.toArray ? b.toArray() : b);
            this.selector = {
                rows: null,
                cols: null,
                opts: null
            };
            q.extend(this, this, Sb)
        };
        p.Api = q;
        q.prototype = {
            concat: x.concat,
            context: [],
            each: function(a) {
                for (var b = 0, c = this.length; b < c; b++)
                    a.call(this, this[b], b, this);
                return this
            },
            eq: function(a) {
                var b = this.context;
                return b.length > a ? new q(b[a], this[a]) : null
            },
            filter: function(a) {
                var b = [];
                if (x.filter)
                    b = x.filter.call(this, a, this);
                else 
                    for (var c = 0, d = this.length; c < d; c++)
                        a.call(this, this[c], c, this) && b.push(this[c]);
                return new q(this.context, b)
            },
            flatten: function() {
                var a = [];
                return new q(this.context, a.concat.apply(a, this.toArray()))
            },
            join: x.join,
            indexOf: x.indexOf || function(a, b) {
                for (var c = b || 0, d = this.length; c < d; c++)
                    if (this[c] === a)
                        return c;
                return - 1
            },
            iterator: function(a, b, c) {
                var d = [], e, f, g, h, j, n = this.context, m, o, k = this.selector;
                "string" === typeof a && (c = b, b = a, a=!1);
                f = 0;
                for (g = n.length; f < g; f++) {
                    var p =
                    new q(n[f]);
                    if ("table" === b)
                        e = c.call(p, n[f], f), e !== l && d.push(e);
                    else if ("columns" === b || "rows" === b)
                        e = c.call(p, n[f], this[f], f), e !== l && d.push(e);
                    else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
                        o = this[f];
                        "column-rows" === b && (m = Ba(n[f], k.opts));
                        h = 0;
                        for (j = o.length; h < j; h++)
                            e = o[h], e = "cell" === b ? c.call(p, n[f], e.row, e.column, f, h) : c.call(p, n[f], e, f, h, m), e !== l && d.push(e)
                        }
                }
                return d.length ? (a = new q(n, a ? d.concat.apply([], d) : d), b = a.selector, b.rows = k.rows, b.cols = k.cols, b.opts = k.opts, a) : this
            },
            lastIndexOf: x.lastIndexOf ||
            function(a, b) {
                return this.indexOf.apply(this.toArray.reverse(), arguments)
            },
            length: 0,
            map: function(a) {
                var b = [];
                if (x.map)
                    b = x.map.call(this, a, this);
                else 
                    for (var c = 0, d = this.length; c < d; c++)
                        b.push(a.call(this, this[c], c));
                return new q(this.context, b)
            },
            pluck: function(a) {
                return this.map(function(b) {
                    return b[a]
                })
            },
            pop: x.pop,
            push: x.push,
            reduce: x.reduce || function(a, b) {
                return hb(this, a, b, 0, this.length, 1)
            },
            reduceRight: x.reduceRight || function(a, b) {
                return hb(this, a, b, this.length - 1, - 1, - 1)
            },
            reverse: x.reverse,
            selector: null,
            shift: x.shift,
            sort: x.sort,
            splice: x.splice,
            toArray: function() {
                return x.slice.call(this)
            },
            to$: function() {
                return h(this)
            },
            toJQuery: function() {
                return h(this)
            },
            unique: function() {
                return new q(this.context, Ma(this))
            },
            unshift: x.unshift
        };
        q.extend = function(a, b, c) {
            if (b && (b instanceof q || b.__dt_wrapper)) {
                var d, e, f, g = function(a, b, c) {
                    return function() {
                        var d = b.apply(a, arguments);
                        q.extend(d, d, c.methodExt);
                        return d
                    }
                };
                d = 0;
                for (e = c.length; d < e; d++)
                    f = c[d], b[f.name] = "function" === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ?
                    {} : f.val, b[f.name].__dt_wrapper=!0, q.extend(a, b[f.name], f.propExt)
            }
        };
        q.register = r = function(a, b) {
            if (h.isArray(a))
                for (var c = 0, d = a.length; c < d; c++)
                    q.register(a[c], b);
            else 
                for (var e = a.split("."), f = Sb, g, i, c = 0, d = e.length; c < d; c++) {
                    g = (i =- 1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];
                    var j;
                    a:
                    {
                        j = 0;
                        for (var n = f.length; j < n; j++)
                            if (f[j].name === g) {
                                j = f[j];
                                break a
                            }
                            j = null
                        }
                        j || (j = {
                            name: g,
                            val: {},
                            methodExt: [],
                            propExt: []
                        }, f.push(j));
                        c === d - 1 ? j.val = b : f = i ? j.methodExt : j.propExt
                }
        };
        q.registerPlural = t = function(a, b, c) {
            q.register(a,
            c);
            q.register(b, function() {
                var a = c.apply(this, arguments);
                return a === this ? this : a instanceof q ? a.length ? h.isArray(a[0]) ? new q(a.context, a[0]) : a[0] : l : a
            })
        };
        r("tables()", function(a) {
            var b;
            if (a) {
                b = q;
                var c = this.context;
                if ("number" === typeof a)
                    a = [c[a]];
                else 
                    var d = h.map(c, function(a) {
                        return a.nTable
                    }), a = h(d).filter(a).map(function() {
                        var a = h.inArray(this, d);
                        return c[a]
                    }).toArray();
                b = new b(a)
            } else 
                b = this;
            return b
        });
        r("table()", function(a) {
            var a = this.tables(a), b = a.context;
            return b.length ? new q(b[0]) : a
        });
        t("tables().nodes()",
        "table().node()", function() {
            return this.iterator("table", function(a) {
                return a.nTable
            })
        });
        t("tables().body()", "table().body()", function() {
            return this.iterator("table", function(a) {
                return a.nTBody
            })
        });
        t("tables().header()", "table().header()", function() {
            return this.iterator("table", function(a) {
                return a.nTHead
            })
        });
        t("tables().footer()", "table().footer()", function() {
            return this.iterator("table", function(a) {
                return a.nTFoot
            })
        });
        t("tables().containers()", "table().container()", function() {
            return this.iterator("table",
            function(a) {
                return a.nTableWrapper
            })
        });
        r("draw()", function(a) {
            return this.iterator("table", function(b) {
                M(b, !1 === a)
            })
        });
        r("page()", function(a) {
            return a === l ? this.page.info().page : this.iterator("table", function(b) {
                Ta(b, a)
            })
        });
        r("page.info()", function() {
            if (0 === this.context.length)
                return l;
            var a = this.context[0], b = a._iDisplayStart, c = a._iDisplayLength, d = a.fnRecordsDisplay(), e =- 1 === c;
            return {
                page: e ? 0: Math.floor(b / c),
                pages: e ? 1: Math.ceil(d / c),
                start: b,
                end: a.fnDisplayEnd(),
                length: c,
                recordsTotal: a.fnRecordsTotal(),
                recordsDisplay: d
            }
        });
        r("page.len()", function(a) {
            return a === l ? 0 !== this.context.length ? this.context[0]._iDisplayLength : l : this.iterator("table", function(b) {
                Ra(b, a)
            })
        });
        var Tb = function(a, b, c) {
            "ssp" == A(a) ? M(a, b) : (B(a, !0), qa(a, [], function(c) {
                ma(a);
                for (var c = ra(a, c), d = 0, g = c.length; d < g; d++)
                    I(a, c[d]);
                M(a, b);
                B(a, !1)
            }));
            if (c) {
                var d = new q(a);
                d.one("draw", function() {
                    c(d.ajax.json())
                })
            }
        };
        r("ajax.json()", function() {
            var a = this.context;
            if (0 < a.length)
                return a[0].json
        });
        r("ajax.params()", function() {
            var a = this.context;
            if (0 < a.length)
                return a[0].oAjaxData
        });
        r("ajax.reload()", function(a, b) {
            return this.iterator("table", function(c) {
                Tb(c, !1 === b, a)
            })
        });
        r("ajax.url()", function(a) {
            var b = this.context;
            if (a === l) {
                if (0 === b.length)
                    return l;
                b = b[0];
                return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource
            }
            return this.iterator("table", function(b) {
                h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a
            })
        });
        r("ajax.url().load()", function(a, b) {
            return this.iterator("table", function(c) {
                Tb(c, !1 === b, a)
            })
        });
        var $a = function(a, b) {
            var c =
            [], d, e, f, g, i, j;
            d = typeof a;
            if (!a || "string" === d || "function" === d || a.length === l)
                a = [a];
            f = 0;
            for (g = a.length; f < g; f++) {
                e = a[f] && a[f].split ? a[f].split(",") : [a[f]];
                i = 0;
                for (j = e.length; i < j; i++)(d = b("string" === typeof e[i] ? h.trim(e[i]) : e[i])
                    ) && d.length && c.push.apply(c, d)
            }
            return c
        }, ab = function(a) {
            a || (a = {});
            a.filter&&!a.search && (a.search = a.filter);
            return {
                search: a.search || "none",
                order: a.order || "current",
                page: a.page || "all"
            }
        }, bb = function(a) {
            for (var b = 0, c = a.length; b < c; b++)
                if (0 < a[b].length)
                    return a[0] = a[b], a.length = 1, a.context =
                    [a.context[b]], a;
            a.length = 0;
            return a
        }, Ba = function(a, b) {
            var c, d, e, f = [], g = a.aiDisplay;
            c = a.aiDisplayMaster;
            var i = b.search;
            d = b.order;
            e = b.page;
            if ("ssp" == A(a))
                return "removed" === i ? [] : U(0, c.length);
            if ("current" == e) {
                c = a._iDisplayStart;
                for (d = a.fnDisplayEnd(); c < d; c++)
                    f.push(g[c])
            } else if ("current" == d || "applied" == d)
                f = "none" == i ? c.slice() : "applied" == i ? g.slice() : h.map(c, function(a) {
                    return - 1 === h.inArray(a, g) ? a : null
                });
            else if ("index" == d || "original" == d) {
                c = 0;
                for (d = a.aoData.length; c < d; c++)
                    "none" == i ? f.push(c) : (e = h.inArray(c,
                    g), ( - 1 === e && "removed" == i || 0 <= e && "applied" == i) && f.push(c))
            }
            return f
        };
        r("rows()", function(a, b) {
            a === l ? a = "" : h.isPlainObject(a) && (b = a, a = "");
            var b = ab(b), c = this.iterator("table", function(c) {
                var e = b;
                return $a(a, function(a) {
                    var b = Pb(a);
                    if (b !== null&&!e)
                        return [b];
                    var i = Ba(c, e);
                    if (b !== null && h.inArray(b, i)!==-1)
                        return [b];
                    if (!a)
                        return i;
                    b = ga(c.aoData, i, "nTr");
                    return typeof a === "function" ? h.map(i, function(b) {
                        var e = c.aoData[b];
                        return a(b, e._aData, e.nTr) ? b : null
                    }) : a.nodeName && h.inArray(a, b)!==-1 ? [a._DT_RowIndex] : h(b).filter(a).map(function() {
                        return this._DT_RowIndex
                    }).toArray()
                })
            });
            c.selector.rows = a;
            c.selector.opts = b;
            return c
        });
        r("rows().nodes()", function() {
            return this.iterator("row", function(a, b) {
                return a.aoData[b].nTr || l
            })
        });
        r("rows().data()", function() {
            return this.iterator(!0, "rows", function(a, b) {
                return ga(a.aoData, b, "_aData")
            })
        });
        t("rows().cache()", "row().cache()", function(a) {
            return this.iterator("row", function(b, c) {
                var d = b.aoData[c];
                return "search" === a ? d._aFilterData : d._aSortData
            })
        });
        t("rows().invalidate()", "row().invalidate()", function(a) {
            return this.iterator("row", function(b,
            c) {
                oa(b, c, a)
            })
        });
        t("rows().indexes()", "row().index()", function() {
            return this.iterator("row", function(a, b) {
                return b
            })
        });
        t("rows().remove()", "row().remove()", function() {
            var a = this;
            return this.iterator("row", function(b, c, d) {
                var e = b.aoData;
                e.splice(c, 1);
                for (var f = 0, g = e.length; f < g; f++)
                    null !== e[f].nTr && (e[f].nTr._DT_RowIndex = f);
                h.inArray(c, b.aiDisplay);
                na(b.aiDisplayMaster, c);
                na(b.aiDisplay, c);
                na(a[d], c, !1);
                Sa(b)
            })
        });
        r("rows.add()", function(a) {
            var b = this.iterator("table", function(b) {
                var c, f, g, h = [];
                f = 0;
                for (g = a.length; f < g; f++)
                    c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? h.push(ka(b, c)[0]) : h.push(I(b, c));
                return h
            }), c = this.rows( - 1);
            c.pop();
            c.push.apply(c, b.toArray());
            return c
        });
        r("row()", function(a, b) {
            return bb(this.rows(a, b))
        });
        r("row().data()", function(a) {
            var b = this.context;
            if (a === l)
                return b.length && this.length ? b[0].aoData[this[0]]._aData : l;
            b[0].aoData[this[0]]._aData = a;
            oa(b[0], this[0], "data");
            return this
        });
        r("row().node()", function() {
            var a = this.context;
            return a.length && this.length ? a[0].aoData[this[0]].nTr ||
            null : null
        });
        r("row.add()", function(a) {
            a instanceof h && a.length && (a = a[0]);
            var b = this.iterator("table", function(b) {
                return a.nodeName && "TR" === a.nodeName.toUpperCase() ? ka(b, a)[0] : I(b, a)
            });
            return this.row(b[0])
        });
        var cb = function(a, b) {
            var c = a.context;
            c.length && (c = c[0].aoData[b !== l ? b: a[0]], c._details && (c._details.remove(), c._detailsShow = l, c._details = l))
        }, Ub = function(a, b) {
            var c = a.context;
            if (c.length && a.length) {
                var d = c[0].aoData[a[0]];
                if (d._details) {
                    (d._detailsShow = b) ? d._details.insertAfter(d.nTr) : d._details.detach();
                    var e = c[0], f = new q(e), g = e.aoData;
                    f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
                    0 < C(g, "_details").length && (f.on("draw.dt.DT_details", function(a, b) {
                        e === b && f.rows({
                            page: "current"
                        }).eq(0).each(function(a) {
                            a = g[a];
                            a._detailsShow && a._details.insertAfter(a.nTr)
                        })
                    }), f.on("column-visibility.dt.DT_details", function(a, b) {
                        if (e === b)
                            for (var c, d = aa(b), f = 0, h = g.length; f < h; f++)
                                c = g[f], c._details && c._details.children("td[colspan]").attr("colspan", d)
                    }), f.on("destroy.dt.DT_details", function(a,
                    b) {
                        if (e === b)
                            for (var c = 0, d = g.length; c < d; c++)
                                g[c]._details && cb(f, c)
                    }))
                }
            }
        };
        r("row().child()", function(a, b) {
            var c = this.context;
            if (a === l)
                return c.length && this.length ? c[0].aoData[this[0]]._details : l;
            if (!0 === a)
                this.child.show();
            else if (!1 === a)
                cb(this);
            else if (c.length && this.length) {
                var d = c[0], c = c[0].aoData[this[0]], e = [], f = function(a, b) {
                    if (a.nodeName && "tr" === a.nodeName.toLowerCase())
                        e.push(a);
                    else {
                        var c = h("<tr><td/></tr>").addClass(b);
                        h("td", c).addClass(b).html(a)[0].colSpan = aa(d);
                        e.push(c[0])
                    }
                };
                if (h.isArray(a) ||
                a instanceof h)
                    for (var g = 0, i = a.length; g < i; g++)
                        f(a[g], b);
                else 
                    f(a, b);
                c._details && c._details.remove();
                c._details = h(e);
                c._detailsShow && c._details.insertAfter(c.nTr)
            }
            return this
        });
        r(["row().child.show()", "row().child().show()"], function() {
            Ub(this, !0);
            return this
        });
        r(["row().child.hide()", "row().child().hide()"], function() {
            Ub(this, !1);
            return this
        });
        r(["row().child.remove()", "row().child().remove()"], function() {
            cb(this);
            return this
        });
        r("row().child.isShown()", function() {
            var a = this.context;
            return a.length &&
            this.length ? a[0].aoData[this[0]]._detailsShow ||!1 : !1
        });
        var cc = /^(.+):(name|visIdx|visible)$/, Vb = function(a, b, c, d, e) {
            for (var c = [], d = 0, f = e.length; d < f; d++)
                c.push(w(a, e[d], b));
            return c
        };
        r("columns()", function(a, b) {
            a === l ? a = "" : h.isPlainObject(a) && (b = a, a = "");
            var b = ab(b), c = this.iterator("table", function(c) {
                var e = a, f = b, g = c.aoColumns, i = C(g, "sName"), j = C(g, "nTh");
                return $a(e, function(a) {
                    var b = Pb(a);
                    if (a === "")
                        return U(g.length);
                    if (b !== null)
                        return [b >= 0 ? b: g.length + b];
                    if (typeof a === "function") {
                        var e = Ba(c, f);
                        return h.map(g,
                        function(b, f) {
                            return a(f, Vb(c, f, 0, 0, e), j[f]) ? f : null
                        })
                    }
                    var k = typeof a === "string" ? a.match(cc): "";
                    if (k)
                        switch (k[2]) {
                        case "visIdx":
                        case "visible":
                            b = parseInt(k[1], 10);
                            if (b < 0) {
                                var l = h.map(g, function(a, b) {
                                    return a.bVisible ? b : null
                                });
                                return [l[l.length + b]]
                            }
                            return [ja(c, b)];
                        case "name":
                            return h.map(i, function(a, b) {
                                return a === k[1] ? b : null
                            })
                        } else 
                            return h(j).filter(a).map(function() {
                                return h.inArray(this, j)
                            }).toArray()
                })
            });
            c.selector.cols = a;
            c.selector.opts = b;
            return c
        });
        t("columns().header()", "column().header()",
        function() {
            return this.iterator("column", function(a, b) {
                return a.aoColumns[b].nTh
            })
        });
        t("columns().footer()", "column().footer()", function() {
            return this.iterator("column", function(a, b) {
                return a.aoColumns[b].nTf
            })
        });
        t("columns().data()", "column().data()", function() {
            return this.iterator("column-rows", Vb)
        });
        t("columns().dataSrc()", "column().dataSrc()", function() {
            return this.iterator("column", function(a, b) {
                return a.aoColumns[b].mData
            })
        });
        t("columns().cache()", "column().cache()", function(a) {
            return this.iterator("column-rows",
            function(b, c, d, e, f) {
                return ga(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c)
            })
        });
        t("columns().nodes()", "column().nodes()", function() {
            return this.iterator("column-rows", function(a, b, c, d, e) {
                return ga(a.aoData, e, "anCells", b)
            })
        });
        t("columns().visible()", "column().visible()", function(a, b) {
            return this.iterator("column", function(c, d) {
                var e;
                if (a === l)
                    e = c.aoColumns[d].bVisible;
                else {
                    var f = c.aoColumns;
                    e = f[d];
                    var g = c.aoData, i, j, n;
                    if (a === l)
                        e = e.bVisible;
                    else {
                        if (e.bVisible !== a) {
                            if (a) {
                                var m = h.inArray(!0, C(f,
                                "bVisible"), d + 1);
                                i = 0;
                                for (j = g.length; i < j; i++)
                                    n = g[i].nTr, f = g[i].anCells, n && n.insertBefore(f[d], f[m] || null)
                                } else 
                                    h(C(c.aoData, "anCells", d)).detach();
                            e.bVisible = a;
                            da(c, c.aoHeader);
                            da(c, c.aoFooter);
                            if (b === l || b)
                                X(c), (c.oScroll.sX || c.oScroll.sY) && Y(c);
                            u(c, null, "column-visibility", [c, d, a]);
                            xa(c)
                        }
                        e = void 0
                    }
                }
                return e
            })
        });
        t("columns().indexes()", "column().index()", function(a) {
            return this.iterator("column", function(b, c) {
                return "visible" === a ? $(b, c) : c
            })
        });
        r("columns.adjust()", function() {
            return this.iterator("table",
            function(a) {
                X(a)
            })
        });
        r("column.index()", function(a, b) {
            if (0 !== this.context.length) {
                var c = this.context[0];
                if ("fromVisible" === a || "toData" === a)
                    return ja(c, b);
                if ("fromData" === a || "toVisible" === a)
                    return $(c, b)
            }
        });
        r("column()", function(a, b) {
            return bb(this.columns(a, b))
        });
        r("cells()", function(a, b, c) {
            h.isPlainObject(a) && (typeof a.row !== l ? (c = b, b = null) : (c = a, a = null));
            h.isPlainObject(b) && (c = b, b = null);
            if (null === b || b === l)
                return this.iterator("table", function(b) {
                    var d = a, e = ab(c), f = b.aoData, g = Ba(b, e), e = ga(f, g, "anCells"),
                    i = h([].concat.apply([], e)), j, m = b.aoColumns.length, n, p, r, q, s, t;
                    return $a(d, function(a) {
                        var c = typeof a === "function";
                        if (a === null || a === l || c) {
                            n = [];
                            p = 0;
                            for (r = g.length; p < r; p++) {
                                j = g[p];
                                for (q = 0; q < m; q++) {
                                    s = {
                                        row: j,
                                        column: q
                                    };
                                    if (c) {
                                        t = b.aoData[j];
                                        a(s, w(b, j, q), t.anCells[q]) && n.push(s)
                                    } else 
                                        n.push(s)
                                    }
                            }
                            return n
                        }
                        return h.isPlainObject(a) ? [a] : i.filter(a).map(function(a, b) {
                            j = b.parentNode._DT_RowIndex;
                            return {
                                row: j,
                                column: h.inArray(b, f[j].anCells)
                            }
                        }).toArray()
                    })
                });
            var d = this.columns(b, c), e = this.rows(a, c), f, g, i, j, n, m = this.iterator("table",
            function(a, b) {
                f = [];
                g = 0;
                for (i = e[b].length; g < i; g++) {
                    j = 0;
                    for (n = d[b].length; j < n; j++)
                        f.push({
                            row: e[b][g],
                            column: d[b][j]
                        })
                }
                return f
            });
            h.extend(m.selector, {
                cols: b,
                rows: a,
                opts: c
            });
            return m
        });
        t("cells().nodes()", "cell().node()", function() {
            return this.iterator("cell", function(a, b, c) {
                return a.aoData[b].anCells[c]
            })
        });
        r("cells().data()", function() {
            return this.iterator("cell", function(a, b, c) {
                return w(a, b, c)
            })
        });
        t("cells().cache()", "cell().cache()", function(a) {
            a = "search" === a ? "_aFilterData" : "_aSortData";
            return this.iterator("cell",
            function(b, c, d) {
                return b.aoData[c][a][d]
            })
        });
        t("cells().render()", "cell().render()", function(a) {
            return this.iterator("cell", function(b, c, d) {
                return w(b, c, d, a)
            })
        });
        t("cells().indexes()", "cell().index()", function() {
            return this.iterator("cell", function(a, b, c) {
                return {
                    row: b,
                    column: c,
                    columnVisible: $(a, c)
                }
            })
        });
        r(["cells().invalidate()", "cell().invalidate()"], function(a) {
            var b = this.selector;
            this.rows(b.rows, b.opts).invalidate(a);
            return this
        });
        r("cell()", function(a, b, c) {
            return bb(this.cells(a, b, c))
        });
        r("cell().data()",
        function(a) {
            var b = this.context, c = this[0];
            if (a === l)
                return b.length && c.length ? w(b[0], c[0].row, c[0].column) : l;
            Ha(b[0], c[0].row, c[0].column, a);
            oa(b[0], c[0].row, "data", c[0].column);
            return this
        });
        r("order()", function(a, b) {
            var c = this.context;
            if (a === l)
                return 0 !== c.length ? c[0].aaSorting : l;
            "number" === typeof a ? a = [[a, b]] : h.isArray(a[0]) || (a = Array.prototype.slice.call(arguments));
            return this.iterator("table", function(b) {
                b.aaSorting = a.slice()
            })
        });
        r("order.listener()", function(a, b, c) {
            return this.iterator("table",
            function(d) {
                Na(d, a, b, c)
            })
        });
        r(["columns().order()", "column().order()"], function(a) {
            var b = this;
            return this.iterator("table", function(c, d) {
                var e = [];
                h.each(b[d], function(b, c) {
                    e.push([c, a])
                });
                c.aaSorting = e
            })
        });
        r("search()", function(a, b, c, d) {
            var e = this.context;
            return a === l ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : l : this.iterator("table", function(e) {
                e.oFeatures.bFilter && ea(e, h.extend({}, e.oPreviousSearch, {
                    sSearch: a + "",
                    bRegex: null === b?!1: b,
                    bSmart: null === c?!0: c,
                    bCaseInsensitive: null === d?!0: d
                }), 1)
            })
        });
        t("columns().search()",
        "column().search()", function(a, b, c, d) {
            return this.iterator("column", function(e, f) {
                var g = e.aoPreSearchCols;
                if (a === l)
                    return g[f].sSearch;
                e.oFeatures.bFilter && (h.extend(g[f], {
                    sSearch: a + "",
                    bRegex: null === b?!1: b,
                    bSmart: null === c?!0: c,
                    bCaseInsensitive: null === d?!0: d
                }), ea(e, e.oPreviousSearch, 1))
            })
        });
        r("state()", function() {
            return this.context.length ? this.context[0].oSavedState : null
        });
        r("state.clear()", function() {
            return this.iterator("table", function(a) {
                a.fnStateSaveCallback.call(a.oInstance, a, {})
            })
        });
        r("state.loaded()",
        function() {
            return this.context.length ? this.context[0].oLoadedState : null
        });
        r("state.save()", function() {
            return this.iterator("table", function(a) {
                xa(a)
            })
        });
        p.versionCheck = p.fnVersionCheck = function(a) {
            for (var b = p.version.split("."), a = a.split("."), c, d, e = 0, f = a.length; e < f; e++)
                if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d)
                    return c > d;
            return !0
        };
        p.isDataTable = p.fnIsDataTable = function(a) {
            var b = h(a).get(0), c=!1;
            h.each(p.settings, function(a, e) {
                if (e.nTable === b || e.nScrollHead === b || e.nScrollFoot === b)
                    c=!0
            });
            return c
        };
        p.tables = p.fnTables = function(a) {
            return jQuery.map(p.settings, function(b) {
                if (!a || a && h(b.nTable).is(":visible"))
                    return b.nTable
            })
        };
        p.util = {
            throttle: ta
        };
        p.camelToHungarian = G;
        r("$()", function(a, b) {
            var c = this.rows(b).nodes(), c = h(c);
            return h([].concat(c.filter(a).toArray(), c.find(a).toArray()))
        });
        h.each(["on", "one", "off"], function(a, b) {
            r(b + "()", function() {
                var a = Array.prototype.slice.call(arguments);
                a[0].match(/\.dt\b/) || (a[0] += ".dt");
                var d = h(this.tables().nodes());
                d[b].apply(d, a);
                return this
            })
        });
        r("clear()", function() {
            return this.iterator("table", function(a) {
                ma(a)
            })
        });
        r("settings()", function() {
            return new q(this.context, this.context)
        });
        r("data()", function() {
            return this.iterator("table", function(a) {
                return C(a.aoData, "_aData")
            }).flatten()
        });
        r("destroy()", function(a) {
            a = a ||!1;
            return this.iterator("table", function(b) {
                var c = b.nTableWrapper.parentNode, d = b.oClasses, e = b.nTable, f = b.nTBody, g = b.nTHead, i = b.nTFoot, j = h(e), f = h(f), l = h(b.nTableWrapper), m = h.map(b.aoData, function(a) {
                    return a.nTr
                }), o;
                b.bDestroying =
                !0;
                u(b, "aoDestroyCallback", "destroy", [b]);
                a || (new q(b)).columns().visible(!0);
                l.unbind(".DT").find(":not(tbody *)").unbind(".DT");
                h(Da).unbind(".DT-" + b.sInstance);
                e != g.parentNode && (j.children("thead").detach(), j.append(g));
                i && e != i.parentNode && (j.children("tfoot").detach(), j.append(i));
                j.detach();
                l.detach();
                b.aaSorting = [];
                b.aaSortingFixed = [];
                wa(b);
                h(m).removeClass(b.asStripeClasses.join(" "));
                h("th, td", g).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);
                b.bJUI &&
                (h("th span." + d.sSortIcon + ", td span." + d.sSortIcon, g).detach(), h("th, td", g).each(function() {
                    var a = h("div." + d.sSortJUIWrapper, this);
                    h(this).append(a.contents());
                    a.detach()
                }));
                !a && c && c.insertBefore(e, b.nTableReinsertBefore);
                f.children().detach();
                f.append(m);
                j.css("width", b.sDestroyWidth).removeClass(d.sTable);
                (o = b.asDestroyStripes.length) && f.children().each(function(a) {
                    h(this).addClass(b.asDestroyStripes[a%o])
                });
                c = h.inArray(b, p.settings);
                - 1 !== c && p.settings.splice(c, 1)
            })
        });
        p.version = "1.10.3";
        p.settings =
        [];
        p.models = {};
        p.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0
        };
        p.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null
        };
        p.models.oColumn = {
            idx: null,
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        };
        p.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function(a) {
                return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function(a) {
                try {
                    return JSON.parse(( - 1 === a.iStateDuration ? sessionStorage : localStorage).getItem("DataTables_" + a.sInstance + "_" + location.pathname))
                } catch (b) {}
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function(a, b) {
                try {
                    ( - 1 === a.iStateDuration ? sessionStorage : localStorage).setItem("DataTables_" + a.sInstance + "_" + location.pathname, JSON.stringify(b))
                } catch (c) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {
                    sFirst: "First",
                    sLast: "Last",
                    sNext: "Next",
                    sPrevious: "Previous"
                },
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sDecimal: "",
                sThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "Search:",
                sSearchPlaceholder: "",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: h.extend({}, p.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            searchDelay: null,
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null
        };
        V(p.defaults);
        p.defaults.column = {
            aDataSort: null,
            iDataSort: - 1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        };
        V(p.defaults.column);
        p.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0,
                sX: null,
                sXInner: null,
                sY: null
            },
            oLanguage: {
                fnInfoCallback: null
            },
            oBrowser: {
                bScrollOversize: !1,
                bScrollbarLeft: !1
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            searchDelay: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oSavedState: null,
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: l,
            oAjaxData: l,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: - 1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function() {
                return "ssp" == A(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function() {
                return "ssp" == A(this) ? 1 * this._iRecordsDisplay :
                this.aiDisplay.length
            },
            fnDisplayEnd: function() {
                var a = this._iDisplayLength, b = this._iDisplayStart, c = b + a, d = this.aiDisplay.length, e = this.oFeatures, f = e.bPaginate;
                return e.bServerSide?!1 === f||-1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d||-1 === a ? d : c
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {}
        };
        p.ext = v = {
            classes: {},
            errMode: "alert",
            feature: [],
            search: [],
            internal: {},
            legacy: {
                ajax: null
            },
            pager: {},
            renderer: {
                pageButton: {},
                header: {}
            },
            order: {},
            type: {
                detect: [],
                search: {},
                order: {}
            },
            _unique: 0,
            fnVersionCheck: p.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: p.version
        };
        h.extend(v, {
            afnFiltering: v.search,
            aTypes: v.type.detect,
            ofnSearch: v.type.search,
            oSort: v.type.order,
            afnSortData: v.order,
            aoFeatures: v.feature,
            oApi: v.internal,
            oStdClasses: v.classes,
            oPagination: v.pager
        });
        h.extend(p.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        });
        var Ca = "", Ca = "", E = Ca + "ui-state-default", ha = Ca + "css_right ui-icon ui-icon-", Wb = Ca + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        h.extend(p.ext.oJUIClasses, p.ext.classes, {
            sPageButton: "fg-button ui-button " +
            E,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: E + " sorting_asc",
            sSortDesc: E + " sorting_desc",
            sSortable: E + " sorting",
            sSortableAsc: E + " sorting_asc_disabled",
            sSortableDesc: E + " sorting_desc_disabled",
            sSortableNone: E + " sorting_disabled",
            sSortJUIAsc: ha + "triangle-1-n",
            sSortJUIDesc: ha + "triangle-1-s",
            sSortJUI: ha + "carat-2-n-s",
            sSortJUIAscAllowed: ha + "carat-1-n",
            sSortJUIDescAllowed: ha +
            "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + E,
            sScrollFoot: "dataTables_scrollFoot " + E,
            sHeaderTH: E,
            sFooterTH: E,
            sJUIHeader: Wb + " ui-corner-tl ui-corner-tr",
            sJUIFooter: Wb + " ui-corner-bl ui-corner-br"
        });
        var Mb = p.ext.pager;
        h.extend(Mb, {
            simple: function() {
                return ["previous", "next"]
            },
            full: function() {
                return ["first", "previous", "next", "last"]
            },
            simple_numbers: function(a, b) {
                return ["previous", Wa(a, b), "next"]
            },
            full_numbers: function(a, b) {
                return ["first",
                "previous", Wa(a, b), "next", "last"]
            },
            _numbers: Wa,
            numbers_length: 7
        });
        h.extend(!0, p.ext.renderer, {
            pageButton: {
                _: function(a, b, c, d, e, f) {
                    var g = a.oClasses, i = a.oLanguage.oPaginate, j, l, m = 0, o = function(b, d) {
                        var k, p, r, q, s = function(b) {
                            Ta(a, b.data.action, true)
                        };
                        k = 0;
                        for (p = d.length; k < p; k++) {
                            q = d[k];
                            if (h.isArray(q)) {
                                r = h("<" + (q.DT_el || "div") + "/>").appendTo(b);
                                o(r, q)
                            } else {
                                l = j = "";
                                switch (q) {
                                case "ellipsis":
                                    b.append("<span>&hellip;</span>");
                                    break;
                                case "first":
                                    j = i.sFirst;
                                    l = q + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                    break;
                                case "previous":
                                    j =
                                    i.sPrevious;
                                    l = q + (e > 0 ? "" : " " + g.sPageButtonDisabled);
                                    break;
                                case "next":
                                    j = i.sNext;
                                    l = q + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                    break;
                                case "last":
                                    j = i.sLast;
                                    l = q + (e < f - 1 ? "" : " " + g.sPageButtonDisabled);
                                    break;
                                default:
                                    j = q + 1;
                                    l = e === q ? g.sPageButtonActive : ""
                                }
                                if (j) {
                                    r = h("<a>", {
                                        "class": g.sPageButton + " " + l,
                                        "aria-controls": a.sTableId,
                                        "data-dt-idx": m,
                                        tabindex: a.iTabIndex,
                                        id: c === 0 && typeof q === "string" ? a.sTableId + "_" + q: null
                                    }).html(j).appendTo(b);
                                    Va(r, {
                                        action: q
                                    }, s);
                                    m++
                                }
                            }
                        }
                    };
                    try {
                        var k = h(P.activeElement).data("dt-idx");
                        o(h(b).empty(),
                        d);
                        k !== null && h(b).find("[data-dt-idx=" + k + "]").focus()
                    } catch (p) {}
                }
            }
        });
        var za = function(a, b, c, d) {
            if (0 !== a && (!a || "-" === a))
                return - Infinity;
            b && (a = Qb(a, b));
            a.replace && (c && (a = a.replace(c, "")), d && (a = a.replace(d, "")));
            return 1 * a
        };
        h.extend(v.type.order, {
            "date-pre": function(a) {
                return Date.parse(a) || 0
            },
            "html-pre": function(a) {
                return H(a) ? "" : a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
            },
            "string-pre": function(a) {
                return H(a) ? "" : "string" === typeof a ? a.toLowerCase() : !a.toString ? "" : a.toString()
            },
            "string-asc": function(a,
            b) {
                return a < b?-1 : a > b ? 1 : 0
            },
            "string-desc": function(a, b) {
                return a < b ? 1 : a > b?-1 : 0
            }
        });
        db("");
        h.extend(p.ext.type.detect, [function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Za(a, c) ? "num" + c : null
        }, function(a) {
            if (a&&!(a instanceof Date) && (!$b.test(a) ||!ac.test(a)))
                return null;
            var b = Date.parse(a);
            return null !== b&&!isNaN(b) || H(a) ? "date" : null
        }, function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Za(a, c, !0) ? "num-fmt" + c : null
        }, function(a, b) {
            var c = b.oLanguage.sDecimal;
            return Rb(a, c) ? "html-num" + c : null
        }, function(a, b) {
            var c =
            b.oLanguage.sDecimal;
            return Rb(a, c, !0) ? "html-num-fmt" + c : null
        }, function(a) {
            return H(a) || "string" === typeof a&&-1 !== a.indexOf("<") ? "html" : null
        }
        ]);
        h.extend(p.ext.type.search, {
            html: function(a) {
                return H(a) ? a : "string" === typeof a ? a.replace(Ob, " ").replace(Aa, "") : ""
            },
            string: function(a) {
                return H(a) ? a : "string" === typeof a ? a.replace(Ob, " ") : a
            }
        });
        h.extend(!0, p.ext.renderer, {
            header: {
                _: function(a, b, c, d) {
                    h(a.nTable).on("order.dt.DT", function(e, f, g, h) {
                        if (a === f) {
                            e = c.idx;
                            b.removeClass(c.sSortingClass + " " + d.sSortAsc +
                            " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass)
                        }
                    })
                },
                jqueryui: function(a, b, c, d) {
                    h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon + " " + c.sSortingClassJUI)).appendTo(b);
                    h(a.nTable).on("order.dt.DT", function(e, f, g, h) {
                        if (a === f) {
                            e = c.idx;
                            b.removeClass(d.sSortAsc + " " + d.sSortDesc).addClass(h[e] == "asc" ? d.sSortAsc : h[e] == "desc" ? d.sSortDesc : c.sSortingClass);
                            b.find("span." + d.sSortIcon).removeClass(d.sSortJUIAsc + " " + d.sSortJUIDesc +
                            " " + d.sSortJUI + " " + d.sSortJUIAscAllowed + " " + d.sSortJUIDescAllowed).addClass(h[e] == "asc" ? d.sSortJUIAsc : h[e] == "desc" ? d.sSortJUIDesc : c.sSortingClassJUI)
                        }
                    })
                }
            }
        });
        p.render = {
            number: function(a, b, c, d) {
                return {
                    display: function(e) {
                        var f = 0 > e ? "-": "", e = Math.abs(parseFloat(e)), g = parseInt(e, 10), e = c ? b + (e - g).toFixed(c).substring(2): "";
                        return f + (d || "") + g.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + e
                    }
                }
            }
        };
        h.extend(p.ext.internal, {
            _fnExternApiFunc: Nb,
            _fnBuildAjax: qa,
            _fnAjaxUpdate: kb,
            _fnAjaxParameters: tb,
            _fnAjaxUpdateDraw: ub,
            _fnAjaxDataSrc: ra,
            _fnAddColumn: Ea,
            _fnColumnOptions: ia,
            _fnAdjustColumnSizing: X,
            _fnVisibleToColumnIndex: ja,
            _fnColumnIndexToVisible: $,
            _fnVisbleColumns: aa,
            _fnGetColumns: Z,
            _fnColumnTypes: Ga,
            _fnApplyColumnDefs: ib,
            _fnHungarianMap: V,
            _fnCamelToHungarian: G,
            _fnLanguageCompat: O,
            _fnBrowserDetect: gb,
            _fnAddData: I,
            _fnAddTr: ka,
            _fnNodeToDataIndex: function(a, b) {
                return b._DT_RowIndex !== l ? b._DT_RowIndex : null
            },
            _fnNodeToColumnIndex: function(a, b, c) {
                return h.inArray(c, a.aoData[b].anCells)
            },
            _fnGetCellData: w,
            _fnSetCellData: Ha,
            _fnSplitObjNotation: Ja,
            _fnGetObjectDataFn: W,
            _fnSetObjectDataFn: Q,
            _fnGetDataMaster: Ka,
            _fnClearTable: ma,
            _fnDeleteIndex: na,
            _fnInvalidateRow: oa,
            _fnGetRowElements: la,
            _fnCreateTr: Ia,
            _fnBuildHead: jb,
            _fnDrawHead: da,
            _fnDraw: L,
            _fnReDraw: M,
            _fnAddOptionsHtml: mb,
            _fnDetectHeader: ca,
            _fnGetUniqueThs: pa,
            _fnFeatureHtmlFilter: ob,
            _fnFilterComplete: ea,
            _fnFilterCustom: xb,
            _fnFilterColumn: wb,
            _fnFilter: vb,
            _fnFilterCreateSearch: Pa,
            _fnEscapeRegex: Qa,
            _fnFilterData: yb,
            _fnFeatureHtmlInfo: rb,
            _fnUpdateInfo: Bb,
            _fnInfoMacros: Cb,
            _fnInitialise: va,
            _fnInitComplete: sa,
            _fnLengthChange: Ra,
            _fnFeatureHtmlLength: nb,
            _fnFeatureHtmlPaginate: sb,
            _fnPageChange: Ta,
            _fnFeatureHtmlProcessing: pb,
            _fnProcessingDisplay: B,
            _fnFeatureHtmlTable: qb,
            _fnScrollDraw: Y,
            _fnApplyToChildren: F,
            _fnCalculateColumnWidths: Fa,
            _fnThrottle: ta,
            _fnConvertToWidth: Db,
            _fnScrollingWidthAdjust: Fb,
            _fnGetWidestNode: Eb,
            _fnGetMaxLenString: Gb,
            _fnStringToCss: s,
            _fnScrollBarWidth: Hb,
            _fnSortFlatten: T,
            _fnSort: lb,
            _fnSortAria: Jb,
            _fnSortListener: Ua,
            _fnSortAttachListener: Na,
            _fnSortingClasses: wa,
            _fnSortData: Ib,
            _fnSaveState: xa,
            _fnLoadState: Kb,
            _fnSettingsFromNode: ya,
            _fnLog: R,
            _fnMap: D,
            _fnBindAction: Va,
            _fnCallbackReg: y,
            _fnCallbackFire: u,
            _fnLengthOverflow: Sa,
            _fnRenderer: Oa,
            _fnDataSource: A,
            _fnRowAttributes: La,
            _fnCalculateEnd: function() {}
        });
        h.fn.dataTable = p;
        h.fn.dataTableSettings = p.settings;
        h.fn.dataTableExt = p.ext;
        h.fn.DataTable = function(a) {
            return h(this).dataTable(a).api()
        };
        h.each(p, function(a, b) {
            h.fn.DataTable[a] = b
        });
        return h.fn.dataTable
    };
    "function" === typeof define && define.amd ? define("datatables", ["jquery"],
    O) : "object" === typeof exports ? O(require("jquery")) : jQuery&&!jQuery.fn.dataTable && O(jQuery)
})(window, document);

(function() {
    /*
     OverlappingMarkerSpiderfier
    https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
    Copyright (c) 2011 - 2012 George MacKerron
    Released under the MIT licence: http://opensource.org/licenses/mit-license
    Note: The Leaflet maps API must be included *before* this code
    */
    (function() {
        var n = {}.hasOwnProperty, o = [].slice;
        null != this.L && (this.OverlappingMarkerSpiderfier = function() {
            function l(c, b) {
                var a, e, g, f, d = this;
                this.map = c;
                null == b && (b = {});
                for (a in b)
                    n.call(b, a) && (e = b[a], this[a] = e);
                this.initMarkerArrays();
                this.listeners = {};
                f = ["click", "zoomend"];
                e = 0;
                for (g = f.length; e < g; e++)
                    a = f[e], this.map.addEventListener(a, function() {
                        return d.unspiderfy()
                    })
            }
            var d, i;
            d = l.prototype;
            d.VERSION = "0.2.5";
            i = 2 * Math.PI;
            d.keepSpiderfied=!1;
            d.nearbyDistance = 20;
            d.circleSpiralSwitchover = 9;
            d.circleFootSeparation =
            25;
            d.circleStartAngle = i / 12;
            d.spiralFootSeparation = 28;
            d.spiralLengthStart = 11;
            d.spiralLengthFactor = 5;
            d.legWeight = 1.5;
            d.legColors = {
                usual: "#222",
                highlighted: "#f00"
            };
            d.initMarkerArrays = function() {
                this.markers = [];
                return this.markerListeners = []
            };
            d.addMarker = function(c) {
                var b, a = this;
                if (null != c._oms)
                    return this;
                c._oms=!0;
                b = function() {
                    return a.spiderListener(c)
                };
                c.addEventListener("click", b);
                this.markerListeners.push(b);
                this.markers.push(c);
                return this
            };
            d.getMarkers = function() {
                return this.markers.slice(0)
            };
            d.removeMarker = function(c) {
                var b, a;
                null != c._omsData && this.unspiderfy();
                b = this.arrIndexOf(this.markers, c);
                if (0 > b)
                    return this;
                a = this.markerListeners.splice(b, 1)[0];
                c.removeEventListener("click", a);
                delete c._oms;
                this.markers.splice(b, 1);
                return this
            };
            d.clearMarkers = function() {
                var c, b, a, e, g;
                this.unspiderfy();
                g = this.markers;
                c = a = 0;
                for (e = g.length; a < e; c=++a)
                    b = g[c], c = this.markerListeners[c], b.removeEventListener("click", c), delete b._oms;
                this.initMarkerArrays();
                return this
            };
            d.addListener = function(c, b) {
                var a,
                e;
                (null != (e = (a = this.listeners)[c]) ? e : a[c] = []).push(b);
                return this
            };
            d.removeListener = function(c, b) {
                var a;
                a = this.arrIndexOf(this.listeners[c], b);
                0 > a || this.listeners[c].splice(a, 1);
                return this
            };
            d.clearListeners = function(c) {
                this.listeners[c] = [];
                return this
            };
            d.trigger = function() {
                var c, b, a, e, g, f;
                b = arguments[0];
                c = 2 <= arguments.length ? o.call(arguments, 1) : [];
                b = null != (a = this.listeners[b]) ? a : [];
                f = [];
                e = 0;
                for (g = b.length; e < g; e++)
                    a = b[e], f.push(a.apply(null, c));
                return f
            };
            d.generatePtsCircle = function(c, b) {
                var a, e,
                g, f, d;
                g = this.circleFootSeparation * (2 + c) / i;
                e = i / c;
                d = [];
                for (a = f = 0; 0 <= c ? f < c : f > c; a = 0 <= c?++f : --f)
                    a = this.circleStartAngle + a * e, d.push(new L.Point(b.x + g * Math.cos(a), b.y + g * Math.sin(a)));
                return d
            };
            d.generatePtsSpiral = function(c, b) {
                var a, e, g, f, d;
                g = this.spiralLengthStart;
                a = 0;
                d = [];
                for (e = f = 0; 0 <= c ? f < c : f > c; e = 0 <= c?++f : --f)
                    a += this.spiralFootSeparation / g + 5.0E-4 * e, e = new L.Point(b.x + g * Math.cos(a), b.y + g * Math.sin(a)), g += i * this.spiralLengthFactor / a, d.push(e);
                return d
            };
            d.spiderListener = function(c) {
                var b, a, e, g, f, d, h, i, j;
                b =
                null != c._omsData;
                (!b ||!this.keepSpiderfied) && this.unspiderfy();
                if (b)
                    return this.trigger("click", c);
                g = [];
                f = [];
                d = this.nearbyDistance * this.nearbyDistance;
                e = this.map.latLngToLayerPoint(c.getLatLng());
                j = this.markers;
                h = 0;
                for (i = j.length; h < i; h++)
                    b = j[h], a = this.map.latLngToLayerPoint(b.getLatLng()), this.ptDistanceSq(a, e) < d ? g.push({
                        marker: b,
                        markerPt: a
                    }) : f.push(b);
                return 1 === g.length ? this.trigger("click", c) : this.spiderfy(g, f)
            };
            d.makeHighlightListeners = function(c) {
                var b = this;
                return {
                    highlight: function() {
                        return c._omsData.leg.setStyle({
                            color: b.legColors.highlighted
                        })
                    },
                    unhighlight: function() {
                        return c._omsData.leg.setStyle({
                            color: b.legColors.usual
                        })
                    }
                }
            };
            d.spiderfy = function(c, b) {
                var a, e, g, d, m, h, i, j, l, k;
                this.spiderfying=!0;
                k = c.length;
                a = this.ptAverage(function() {
                    var a, b, e;
                    e = [];
                    a = 0;
                    for (b = c.length; a < b; a++)
                        i = c[a], e.push(i.markerPt);
                    return e
                }());
                d = k >= this.circleSpiralSwitchover ? this.generatePtsSpiral(k, a).reverse() : this.generatePtsCircle(k, a);
                a = function() {
                    var a, b, i, k = this;
                    i = [];
                    a = 0;
                    for (b = d.length; a < b; a++)
                        g = d[a], e = this.map.layerPointToLatLng(g), l = this.minExtract(c, function(a) {
                            return k.ptDistanceSq(a.markerPt,
                            g)
                        }), h = l.marker, m = new L.Polyline([h.getLatLng(), e], {
                            color: this.legColors.usual,
                            weight: this.legWeight,
                            clickable: !1
                        }), this.map.addLayer(m), h._omsData = {
                            usualPosition: h.getLatLng(),
                            leg: m
                        }, this.legColors.highlighted !== this.legColors.usual && (j = this.makeHighlightListeners(h), h._omsData.highlightListeners = j, h.addEventListener("mouseover", j.highlight), h.addEventListener("mouseout", j.unhighlight)), h.setLatLng(e), h.setZIndexOffset(1E6), i.push(h);
                    return i
                }.call(this);
                delete this.spiderfying;
                this.spiderfied=!0;
                return this.trigger("spiderfy", a, b)
            };
            d.unspiderfy = function(c) {
                var b, a, e, d, f, i, h;
                null == c && (c = null);
                if (null == this.spiderfied)
                    return this;
                this.unspiderfying=!0;
                d = [];
                e = [];
                h = this.markers;
                f = 0;
                for (i = h.length; f < i; f++)
                    b = h[f], null != b._omsData ? (this.map.removeLayer(b._omsData.leg), b !== c && b.setLatLng(b._omsData.usualPosition), b.setZIndexOffset(0), a = b._omsData.highlightListeners, null != a && (b.removeEventListener("mouseover", a.highlight), b.removeEventListener("mouseout", a.unhighlight)), delete b._omsData, d.push(b)) :
                    e.push(b);
                delete this.unspiderfying;
                delete this.spiderfied;
                this.trigger("unspiderfy", d, e);
                return this
            };
            d.ptDistanceSq = function(c, b) {
                var a, e;
                a = c.x - b.x;
                e = c.y - b.y;
                return a * a + e * e
            };
            d.ptAverage = function(c) {
                var b, a, e, d, f;
                d = a = e = 0;
                for (f = c.length; d < f; d++)
                    b = c[d], a += b.x, e += b.y;
                c = c.length;
                return new L.Point(a / c, e / c)
            };
            d.minExtract = function(c, b) {
                var a, d, g, f, i, h;
                g = i = 0;
                for (h = c.length; i < h; g=++i)
                    if (f = c[g], f = b(f), !("undefined" !== typeof a && null !== a) || f < d)
                        d = f, a = g;
                return c.splice(a, 1)[0]
            };
            d.arrIndexOf = function(c, b) {
                var a,
                d, g, f;
                if (null != c.indexOf)
                    return c.indexOf(b);
                a = g = 0;
                for (f = c.length; g < f; a=++g)
                    if (d = c[a], d === b)
                        return a;
                return - 1
            };
            return l
        }())
    }).call(this);
}).call(this);
/* Sun 6 May 2012 17:49:10 BST */

!function(b) {
    var a = function(d, c) {
        this.cinit("clickover", d, c)
    };
    a.prototype = b.extend({}, b.fn.popover.Constructor.prototype, {
        constructor: a,
        cinit: function(e, d, c) {
            this.attr = {};
            this.attr.me = ((Math.random() * 10) + "").replace(/\D/g, "");
            this.attr.click_event_ns = "click." + this.attr.me + " touchstart." + this.attr.me;
            if (!c) {
                c = {}
            }
            c.trigger = "manual";
            this.init(e, d, c);
            this.$element.on("click", this.options.selector, b.proxy(this.clickery, this))
        },
        clickery: function(d) {
            if (d) {
                d.preventDefault();
                d.stopPropagation()
            }
            this.options.width && this.tip().width(this.options.width);
            this.options.height && this.tip().height(this.options.height);
            this.options.tip_id && this.tip().attr("id", this.options.tip_id);
            this.options.class_name && this.tip().addClass(this.options.class_name);
            this[this.isShown() ? "hide": "show"]();
            if (this.isShown()) {
                var c = this;
                this.options.global_close && b("body").on(this.attr.click_event_ns, function(f) {
                    if (!c.tip().has(f.target).length) {
                        c.clickery()
                    }
                });
                this.options.esc_close && b(document).bind("keyup.clickery", function(f) {
                    if (f.keyCode == 27) {
                        c.clickery()
                    }
                    return 
                });
                !this.options.allow_multiple && b("[data-clickover-open=1]").each(function() {
                    b(this).data("clickover") && b(this).data("clickover").clickery()
                });
                this.$element.attr("data-clickover-open", 1);
                this.tip().on("click", '[data-dismiss="clickover"]', b.proxy(this.clickery, this));
                if (this.options.auto_close && this.options.auto_close > 0) {
                    this.attr.tid = setTimeout(b.proxy(this.clickery, this), this.options.auto_close)
                }
                typeof this.options.onShown == "function" && this.options.onShown.call(this);
                this.$element.trigger("shown")
            } else {
                this.$element.removeAttr("data-clickover-open");
                this.options.esc_close && b(document).unbind("keyup.clickery");
                b("body").off(this.attr.click_event_ns);
                if (typeof this.attr.tid == "number") {
                    clearTimeout(this.attr.tid);
                    delete this.attr.tid
                }
                typeof this.options.onHidden == "function" && this.options.onHidden.call(this);
                this.$element.trigger("hidden")
            }
        },
        isShown: function() {
            return this.tip().hasClass("in")
        },
        resetPosition: function() {
            var g, c, j, e, h, d, f;
            if (this.hasContent() && this.enabled) {
                g = this.tip();
                d = typeof this.options.placement == "function" ? this.options.placement.call(this, g[0], this.$element[0]) : this.options.placement;
                c = /in/.test(d);
                j = this.getPosition(c);
                e = g[0].offsetWidth;
                h = g[0].offsetHeight;
                switch (c ? d.split(" ")[1] : d) {
                case"bottom":
                    f = {
                        top: j.top + j.height,
                        left: j.left + j.width / 2 - e / 2
                    };
                    break;
                case"top":
                    f = {
                        top: j.top - h,
                        left: j.left + j.width / 2 - e / 2
                    };
                    break;
                case"left":
                    f = {
                        top: j.top + j.height / 2 - h / 2,
                        left: j.left - e
                    };
                    break;
                case"right":
                    f = {
                        top: j.top + j.height / 2 - h / 2,
                        left: j.left + j.width
                    };
                    break
                }
                g.css(f)
            }
        },
        debughide: function() {
            var c = new Date().toString();
            console.log(c + ": clickover hide");
            this.hide()
        }
    });
    b.fn.clickover = function(c) {
        return this.each(function() {
            var f = b(this), e = f.data("clickover"), d = typeof c == "object" && c;
            if (!e) {
                f.data("clickover", (e = new a(this, d)))
            }
            if (typeof c == "string") {
                e[c]()
            }
        })
    };
    b.fn.clickover.Constructor = a;
    b.fn.clickover.defaults = b.extend({}, b.fn.popover.defaults, {
        trigger: "manual",
        auto_close: 0,
        global_close: 1,
        esc_close: 1,
        onShown: null,
        onHidden: null,
        width: null,
        height: null,
        tip_id: null,
        class_name: "clickover",
        allow_multiple: 0
    })
}(window.jQuery);
(function() {
    var d, k, r, x, t, v, u, b, e, g, f, y, j, D, c, o, q, n, m, l, a, C, h, B, w, A, s = [].slice, p = {}.hasOwnProperty, z = function(H, F) {
        for (var E in F) {
            if (p.call(F, E)) {
                H[E] = F[E]
            }
        }
        function G() {
            this.constructor = H
        }
        G.prototype = F.prototype;
        H.prototype = new G();
        H.__super__ = F.prototype;
        return H
    };
    d = this.jQuery;
    n = (function() {
        E.prototype.defaults = {};
        function E(G, F) {
            this.$el = d(G);
            this.options = d.extend({}, this.defaults, F)
        }
        E.prototype.destroy = function() {
            return this._deinit()
        };
        E.prototype._init = function() {
            return null
        };
        E.prototype._deinit = function() {
            return null
        };
        E.register = function(M, J) {
            var K, I, F, G, H;
            G = function() {
                return "simple_widget_" + J
            };
            H = function(O, N) {
                var P;
                P = d.data(O, N);
                if (P && (P instanceof E)) {
                    return P
                } else {
                    return null
                }
            };
            I = function(P, O) {
                var R, Q, U, T, S, N;
                R = G();
                for (S = 0, N = P.length; S < N; S++) {
                    Q = P[S];
                    U = H(Q, R);
                    if (!U) {
                        T = new M(Q, O);
                        if (!d.data(Q, R)) {
                            d.data(Q, R, T)
                        }
                        T._init()
                    }
                }
                return P
            };
            F = function(P) {
                var R, Q, T, S, O, N;
                R = G();
                N = [];
                for (S = 0, O = P.length; S < O; S++) {
                    Q = P[S];
                    T = H(Q, R);
                    if (T) {
                        T.destroy()
                    }
                    N.push(d.removeData(Q, R))
                }
                return N
            };
            K = function(U, R, S) {
                var N, V, Q, O, P, T;
                V = null;
                for (P = 0, T = U.length; P < T; P++) {
                    N = U[P];
                    Q = d.data(N, G());
                    if (Q && (Q instanceof E)) {
                        O = Q[R];
                        if (O && (typeof O === "function")) {
                            V = O.apply(Q, S)
                        }
                    }
                }
                return V
            };
            return d.fn[J] = function() {
                var P, O, Q, R, N;
                Q = arguments[0], O = 2 <= arguments.length ? s.call(arguments, 1) : [];
                P = this;
                if (Q === void 0 || typeof Q === "object") {
                    N = Q;
                    return I(P, N)
                } else {
                    if (typeof Q === "string" && Q[0] !== "_") {
                        R = Q;
                        if (R === "destroy") {
                            return F(P)
                        } else {
                            return K(P, R, O)
                        }
                    }
                }
            }
        };
        return E
    })();
    this.SimpleWidget = n;
    f = (function(E) {
        z(F, E);
        function F() {
            return F.__super__.constructor.apply(this, arguments)
        }
        F.is_mouse_handled = false;
        F.prototype._init = function() {
            this.$el.bind("mousedown.mousewidget", d.proxy(this._mouseDown, this));
            this.$el.bind("touchstart.mousewidget", d.proxy(this._touchStart, this));
            this.is_mouse_started = false;
            this.mouse_delay = 0;
            this._mouse_delay_timer = null;
            this._is_mouse_delay_met = true;
            return this.mouse_down_info = null
        };
        F.prototype._deinit = function() {
            var G;
            this.$el.unbind("mousedown.mousewidget");
            this.$el.unbind("touchstart.mousewidget");
            G = d(document);
            G.unbind("mousemove.mousewidget");
            return G.unbind("mouseup.mousewidget")
        };
        F.prototype._mouseDown = function(H) {
            var G;
            if (H.which !== 1) {
                return 
            }
            G = this._handleMouseDown(H, this._getPositionInfo(H));
            if (G) {
                H.preventDefault()
            }
            return G
        };
        F.prototype._handleMouseDown = function(H, G) {
            if (F.is_mouse_handled) {
                return 
            }
            if (this.is_mouse_started) {
                this._handleMouseUp(G)
            }
            this.mouse_down_info = G;
            if (!this._mouseCapture(G)) {
                return 
            }
            this._handleStartMouse();
            this.is_mouse_handled = true;
            return true
        };
        F.prototype._handleStartMouse = function() {
            var G;
            G = d(document);
            G.bind("mousemove.mousewidget", d.proxy(this._mouseMove, this));
            G.bind("touchmove.mousewidget", d.proxy(this._touchMove, this));
            G.bind("mouseup.mousewidget", d.proxy(this._mouseUp, this));
            G.bind("touchend.mousewidget", d.proxy(this._touchEnd, this));
            if (this.mouse_delay) {
                return this._startMouseDelayTimer()
            }
        };
        F.prototype._startMouseDelayTimer = function() {
            if (this._mouse_delay_timer) {
                clearTimeout(this._mouse_delay_timer)
            }
            this._mouse_delay_timer = setTimeout((function(G) {
                return function() {
                    return G._is_mouse_delay_met = true
                }
            })(this), this.mouse_delay);
            return this._is_mouse_delay_met = false
        };
        F.prototype._mouseMove = function(G) {
            return this._handleMouseMove(G, this._getPositionInfo(G))
        };
        F.prototype._handleMouseMove = function(H, G) {
            if (this.is_mouse_started) {
                this._mouseDrag(G);
                return H.preventDefault()
            }
            if (this.mouse_delay&&!this._is_mouse_delay_met) {
                return true
            }
            this.is_mouse_started = this._mouseStart(this.mouse_down_info) !== false;
            if (this.is_mouse_started) {
                this._mouseDrag(G)
            } else {
                this._handleMouseUp(G)
            }
            return !this.is_mouse_started
        };
        F.prototype._getPositionInfo = function(G) {
            return {
                page_x: G.pageX,
                page_y: G.pageY,
                target: G.target,
                original_event: G
            }
        };
        F.prototype._mouseUp = function(G) {
            return this._handleMouseUp(this._getPositionInfo(G))
        };
        F.prototype._handleMouseUp = function(G) {
            var H;
            H = d(document);
            H.unbind("mousemove.mousewidget");
            H.unbind("touchmove.mousewidget");
            H.unbind("mouseup.mousewidget");
            H.unbind("touchend.mousewidget");
            if (this.is_mouse_started) {
                this.is_mouse_started = false;
                this._mouseStop(G)
            }
        };
        F.prototype._mouseCapture = function(G) {
            return true
        };
        F.prototype._mouseStart = function(G) {
            return null
        };
        F.prototype._mouseDrag = function(G) {
            return null
        };
        F.prototype._mouseStop = function(G) {
            return null
        };
        F.prototype.setMouseDelay = function(G) {
            return this.mouse_delay = G
        };
        F.prototype._touchStart = function(G) {
            var H;
            if (G.originalEvent.touches.length > 1) {
                return 
            }
            H = G.originalEvent.changedTouches[0];
            return this._handleMouseDown(G, this._getPositionInfo(H))
        };
        F.prototype._touchMove = function(G) {
            var H;
            if (G.originalEvent.touches.length > 1) {
                return 
            }
            H = G.originalEvent.changedTouches[0];
            return this._handleMouseMove(G, this._getPositionInfo(H))
        };
        F.prototype._touchEnd = function(G) {
            var H;
            if (G.originalEvent.touches.length > 1) {
                return 
            }
            H = G.originalEvent.changedTouches[0];
            return this._handleMouseUp(this._getPositionInfo(H))
        };
        return F
    })(n);
    this.Tree = {};
    d = this.jQuery;
    D = {
        getName: function(E) {
            return D.strings[E - 1]
        },
        nameToIndex: function(E) {
            var F, H, G;
            for (F = H = 1, G = D.strings.length; 1 <= G ? H <= G : H >= G; F = 1 <= G?++H : --H) {
                if (D.strings[F - 1] === E) {
                    return F
                }
            }
            return 0
        }
    };
    D.BEFORE = 1;
    D.AFTER = 2;
    D.INSIDE = 3;
    D.NONE = 4;
    D.strings = ["before", "after", "inside", "none"];
    this.Tree.Position = D;
    y = (function() {
        function E(G, F, H) {
            if (F == null) {
                F = false
            }
            if (H == null) {
                H = E
            }
            this.setData(G);
            this.children = [];
            this.parent = null;
            if (F) {
                this.id_mapping = {};
                this.tree = this;
                this.node_class = H
            }
        }
        E.prototype.setData = function(I) {
            var G, H, F;
            if (typeof I !== "object") {
                return this.name = I
            } else {
                F = [];
                for (G in I) {
                    H = I[G];
                    if (G === "label") {
                        F.push(this.name = H)
                    } else {
                        F.push(this[G] = H)
                    }
                }
                return F
            }
        };
        E.prototype.initFromData = function(G) {
            var F, H;
            H = (function(I) {
                return function(J) {
                    I.setData(J);
                    if (J.children) {
                        return F(J.children)
                    }
                }
            })(this);
            F = (function(I) {
                return function(N) {
                    var O, K, M, J;
                    for (M = 0, J = N.length; M < J; M++) {
                        O = N[M];
                        K = new I.tree.node_class("");
                        K.initFromData(O);
                        I.addChild(K)
                    }
                    return null
                }
            })(this);
            H(G);
            return null
        };
        E.prototype.loadFromData = function(I) {
            var G, J, H, F;
            this.removeChildren();
            for (H = 0, F = I.length; H < F; H++) {
                J = I[H];
                G = new this.tree.node_class(J);
                this.addChild(G);
                if (typeof J === "object" && J.children) {
                    G.loadFromData(J.children)
                }
            }
            return null
        };
        E.prototype.addChild = function(F) {
            this.children.push(F);
            return F._setParent(this)
        };
        E.prototype.addChildAtPosition = function(G, F) {
            this.children.splice(F, 0, G);
            return G._setParent(this)
        };
        E.prototype._setParent = function(F) {
            this.parent = F;
            this.tree = F.tree;
            return this.tree.addNodeToIndex(this)
        };
        E.prototype.removeChild = function(F) {
            F.removeChildren();
            return this._removeChild(F)
        };
        E.prototype._removeChild = function(F) {
            this.children.splice(this.getChildIndex(F), 1);
            return this.tree.removeNodeFromIndex(F)
        };
        E.prototype.getChildIndex = function(F) {
            return d.inArray(F, this.children)
        };
        E.prototype.hasChildren = function() {
            return this.children.length !== 0
        };
        E.prototype.isFolder = function() {
            return this.hasChildren() || this.load_on_demand
        };
        E.prototype.iterate = function(G) {
            var F;
            F = (function(H) {
                return function(K, P) {
                    var O, I, N, J, M;
                    if (K.children) {
                        M = K.children;
                        for (N = 0, J = M.length; N < J; N++) {
                            O = M[N];
                            I = G(O, P);
                            if (H.hasChildren() && I) {
                                F(O, P + 1)
                            }
                        }
                        return null
                    }
                }
            })(this);
            F(this, 0);
            return null
        };
        E.prototype.moveNode = function(G, H, F) {
            if (G.isParentOf(H)) {
                return 
            }
            G.parent._removeChild(G);
            if (F === D.AFTER) {
                return H.parent.addChildAtPosition(G, H.parent.getChildIndex(H) + 1)
            } else {
                if (F === D.BEFORE) {
                    return H.parent.addChildAtPosition(G, H.parent.getChildIndex(H))
                } else {
                    if (F === D.INSIDE) {
                        return H.addChildAtPosition(G, 0)
                    }
                }
            }
        };
        E.prototype.getData = function() {
            var F;
            F = (function(G) {
                return function(K) {
                    var P, J, N, M, I, O, H;
                    P = [];
                    for (O = 0, H = K.length; O < H; O++) {
                        N = K[O];
                        M = {};
                        for (J in N) {
                            I = N[J];
                            if ((J !== "parent" && J !== "children" && J !== "element" && J !== "tree") && Object.prototype.hasOwnProperty.call(N, J)) {
                                M[J] = I
                            }
                        }
                        if (N.hasChildren()) {
                            M.children = F(N.children)
                        }
                        P.push(M)
                    }
                    return P
                }
            })(this);
            return F(this.children)
        };
        E.prototype.getNodeByName = function(G) {
            var F;
            F = null;
            this.iterate(function(H) {
                if (H.name === G) {
                    F = H;
                    return false
                } else {
                    return true
                }
            });
            return F
        };
        E.prototype.addAfter = function(G) {
            var H, F;
            if (!this.parent) {
                return null
            } else {
                F = new this.tree.node_class(G);
                H = this.parent.getChildIndex(this);
                this.parent.addChildAtPosition(F, H + 1);
                return F
            }
        };
        E.prototype.addBefore = function(G) {
            var H, F;
            if (!this.parent) {
                return null
            } else {
                F = new this.tree.node_class(G);
                H = this.parent.getChildIndex(this);
                this.parent.addChildAtPosition(F, H);
                return F
            }
        };
        E.prototype.addParent = function(J) {
            var M, K, I, H, F, G;
            if (!this.parent) {
                return null
            } else {
                K = new this.tree.node_class(J);
                K._setParent(this.tree);
                I = this.parent;
                G = I.children;
                for (H = 0, F = G.length; H < F; H++) {
                    M = G[H];
                    K.addChild(M)
                }
                I.children = [];
                I.addChild(K);
                return K
            }
        };
        E.prototype.remove = function() {
            if (this.parent) {
                this.parent.removeChild(this);
                return this.parent = null
            }
        };
        E.prototype.append = function(G) {
            var F;
            F = new this.tree.node_class(G);
            this.addChild(F);
            return F
        };
        E.prototype.prepend = function(G) {
            var F;
            F = new this.tree.node_class(G);
            this.addChildAtPosition(F, 0);
            return F
        };
        E.prototype.isParentOf = function(G) {
            var F;
            F = G.parent;
            while (F) {
                if (F === this) {
                    return true
                }
                F = F.parent
            }
            return false
        };
        E.prototype.getLevel = function() {
            var G, F;
            G = 0;
            F = this;
            while (F.parent) {
                G += 1;
                F = F.parent
            }
            return G
        };
        E.prototype.getNodeById = function(F) {
            return this.id_mapping[F]
        };
        E.prototype.addNodeToIndex = function(F) {
            if (F.id != null) {
                return this.id_mapping[F.id] = F
            }
        };
        E.prototype.removeNodeFromIndex = function(F) {
            if (F.id != null) {
                return delete this.id_mapping[F.id]
            }
        };
        E.prototype.removeChildren = function() {
            this.iterate((function(F) {
                return function(G) {
                    F.tree.removeNodeFromIndex(G);
                    return true
                }
            })(this));
            return this.children = []
        };
        E.prototype.getPreviousSibling = function() {
            var F;
            if (!this.parent) {
                return null
            } else {
                F = this.parent.getChildIndex(this) - 1;
                if (F >= 0) {
                    return this.parent.children[F]
                } else {
                    return null
                }
            }
        };
        E.prototype.getNextSibling = function() {
            var F;
            if (!this.parent) {
                return null
            } else {
                F = this.parent.getChildIndex(this) + 1;
                if (F < this.parent.children.length) {
                    return this.parent.children[F]
                } else {
                    return null
                }
            }
        };
        return E
    })();
    this.Tree.Node = y;
    t = (function() {
        function E(F) {
            this.tree_widget = F;
            this.opened_icon_text = this.getHtmlText(F.options.openedIcon);
            this.closed_icon_text = this.getHtmlText(F.options.closedIcon)
        }
        E.prototype.render = function(F) {
            if (F && F.parent) {
                return this.renderFromNode(F)
            } else {
                return this.renderFromRoot()
            }
        };
        E.prototype.renderNode = function(H) {
            var J, I, F, G;
            d(H.element).remove();
            F = new j(H.parent, this.tree_widget);
            I = F.getUl();
            J = this.createLi(H);
            this.attachNodeData(H, J);
            G = H.getPreviousSibling();
            if (G) {
                d(G.element).after(J)
            } else {
                F.getUl().prepend(J)
            }
            if (H.children) {
                return this.renderFromNode(H)
            }
        };
        E.prototype.renderFromRoot = function() {
            var F;
            F = this.tree_widget.element;
            F.empty();
            return this.createDomElements(F[0], this.tree_widget.tree.children, true, true)
        };
        E.prototype.renderFromNode = function(F) {
            var G;
            G = this.tree_widget._getNodeElementForNode(F);
            G.getUl().remove();
            return this.createDomElements(G.$element[0], F.children, false, false)
        };
        E.prototype.createDomElements = function(J, G, O, H) {
            var F, N, K, I, M;
            K = this.createUl(O);
            J.appendChild(K);
            for (I = 0, M = G.length; I < M; I++) {
                F = G[I];
                N = this.createLi(F);
                K.appendChild(N);
                this.attachNodeData(F, N);
                if (F.hasChildren()) {
                    this.createDomElements(N, F.children, false, F.is_open)
                }
            }
            return null
        };
        E.prototype.attachNodeData = function(G, F) {
            G.element = F;
            return d(F).data("node", G)
        };
        E.prototype.createUl = function(H) {
            var G, F;
            if (H) {
                G = "jqtree-tree"
            } else {
                G = ""
            }
            F = document.createElement("ul");
            F.className = "jqtree_common " + G;
            return F
        };
        E.prototype.createLi = function(G) {
            var F;
            if (G.isFolder()) {
                F = this.createFolderLi(G)
            } else {
                F = this.createNodeLi(G)
            }
            if (this.tree_widget.options.onCreateLi) {
                this.tree_widget.options.onCreateLi(G, d(F))
            }
            return F
        };
        E.prototype.createFolderLi = function(J) {
            var N, H, K, G, I, F, O, M;
            H = this.getButtonClasses(J);
            F = this.getFolderClasses(J);
            I = this.escapeIfNecessary(J.name);
            if (J.is_open) {
                N = this.opened_icon_text
            } else {
                N = this.closed_icon_text
            }
            O = document.createElement("li");
            O.className = "jqtree_common " + F;
            G = document.createElement("div");
            G.className = "jqtree-element jqtree_common";
            O.appendChild(G);
            K = document.createElement("a");
            K.className = "jqtree_common " + H;
            K.appendChild(document.createTextNode(N));
            G.appendChild(K);
            M = document.createElement("span");
            M.className = "jqtree_common jqtree-title";
            G.appendChild(M);
            M.innerHTML = I;
            return O
        };
        E.prototype.createNodeLi = function(I) {
            var K, M, H, F, J, G;
            J = ["jqtree_common"];
            if (this.tree_widget.select_node_handler && this.tree_widget.select_node_handler.isNodeSelected(I)) {
                J.push("jqtree-selected")
            }
            K = J.join(" ");
            H = this.escapeIfNecessary(I.name);
            F = document.createElement("li");
            F.className = K;
            M = document.createElement("div");
            M.className = "jqtree-element jqtree_common";
            F.appendChild(M);
            G = document.createElement("span");
            G.className = "jqtree-title jqtree_common";
            G.innerHTML = H;
            M.appendChild(G);
            return F
        };
        E.prototype.getButtonClasses = function(G) {
            var F;
            F = ["jqtree-toggler"];
            if (!G.is_open) {
                F.push("jqtree-closed")
            }
            return F.join(" ")
        };
        E.prototype.getFolderClasses = function(G) {
            var F;
            F = ["jqtree-folder"];
            if (!G.is_open) {
                F.push("jqtree-closed")
            }
            if (this.tree_widget.select_node_handler && this.tree_widget.select_node_handler.isNodeSelected(G)) {
                F.push("jqtree-selected")
            }
            return F.join(" ")
        };
        E.prototype.escapeIfNecessary = function(F) {
            if (this.tree_widget.options.autoEscape) {
                return l(F)
            } else {
                return F
            }
        };
        E.prototype.getHtmlText = function(F) {
            return d(document.createElement("div")).html(F).text()
        };
        return E
    })();
    e = (function(F) {
        z(E, F);
        function E() {
            return E.__super__.constructor.apply(this, arguments)
        }
        E.prototype.defaults = {
            autoOpen: false,
            saveState: false,
            dragAndDrop: false,
            selectable: true,
            useContextMenu: true,
            onCanSelectNode: null,
            onSetStateFromStorage: null,
            onGetStateFromStorage: null,
            onCreateLi: null,
            onIsMoveHandle: null,
            onCanMove: null,
            onCanMoveTo: null,
            onLoadFailed: null,
            autoEscape: true,
            dataUrl: null,
            closedIcon: "&#x25ba;",
            openedIcon: "&#x25bc;",
            slide: true,
            nodeClass: y,
            dataFilter: null,
            keyboardSupport: true,
            openFolderDelay: 500
        };
        E.prototype.toggle = function(H, G) {
            if (G == null) {
                G = true
            }
            if (H.is_open) {
                return this.closeNode(H, G)
            } else {
                return this.openNode(H, G)
            }
        };
        E.prototype.getTree = function() {
            return this.tree
        };
        E.prototype.selectNode = function(G) {
            return this._selectNode(G, false)
        };
        E.prototype._selectNode = function(I, G) {
            var K, J, M, H;
            if (G == null) {
                G = false
            }
            if (!this.select_node_handler) {
                return 
            }
            K = (function(N) {
                return function() {
                    if (N.options.onCanSelectNode) {
                        return N.options.selectable && N.options.onCanSelectNode(I)
                    } else {
                        return N.options.selectable
                    }
                }
            })(this);
            M = (function(N) {
                return function() {
                    var O;
                    O = I.parent;
                    if (O && O.parent&&!O.is_open) {
                        return N.openNode(O, false)
                    }
                }
            })(this);
            H = (function(N) {
                return function() {
                    if (N.options.saveState) {
                        return N.save_state_handler.saveState()
                    }
                }
            })(this);
            if (!I) {
                this._deselectCurrentNode();
                H();
                return 
            }
            if (!K()) {
                return 
            }
            if (this.select_node_handler.isNodeSelected(I)) {
                if (G) {
                    this._deselectCurrentNode();
                    this._triggerEvent("tree.select", {
                        node: null,
                        previous_node: I
                    })
                }
            } else {
                J = this.getSelectedNode();
                this._deselectCurrentNode();
                this.addToSelection(I);
                this._triggerEvent("tree.select", {
                    node: I,
                    deselected_node: J
                });
                M()
            }
            return H()
        };
        E.prototype.getSelectedNode = function() {
            return this.select_node_handler.getSelectedNode()
        };
        E.prototype.toJson = function() {
            return JSON.stringify(this.tree.getData())
        };
        E.prototype.loadData = function(G, H) {
            return this._loadData(G, H)
        };
        E.prototype.loadDataFromUrl = function(G, I, H) {
            if (d.type(G) !== "string") {
                H = I;
                I = G;
                G = null
            }
            return this._loadDataFromUrl(G, I, H)
        };
        E.prototype.reload = function() {
            return this.loadDataFromUrl()
        };
        E.prototype._loadDataFromUrl = function(G, N, K) {
            var I, M, H, J;
            I = null;
            M = (function(O) {
                return function() {
                    var P;
                    if (!N) {
                        I = O.element
                    } else {
                        P = new v(N, O);
                        I = P.getLi()
                    }
                    return I.addClass("jqtree-loading")
                }
            })(this);
            J = (function(O) {
                return function() {
                    if (I) {
                        return I.removeClass("jqtree-loading")
                    }
                }
            })(this);
            H = (function(O) {
                return function() {
                    if (d.type(G) === "string") {
                        G = {
                            url: G
                        }
                    }
                    if (!G.method) {
                        return G.method = "get"
                    }
                }
            })(this);
            M();
            if (!G) {
                G = this._getDataUrlInfo(N)
            }
            H();
            return d.ajax({
                url: G.url,
                data: G.data,
                type: G.method.toUpperCase(),
                cache: false,
                dataType: "json",
                success: (function(O) {
                    return function(P) {
                        var Q;
                        if (d.isArray(P) || typeof P === "object") {
                            Q = P
                        } else {
                            Q = d.parseJSON(P)
                        }
                        if (O.options.dataFilter) {
                            Q = O.options.dataFilter(Q)
                        }
                        J();
                        O._loadData(Q, N);
                        if (K && d.isFunction(K)) {
                            return K()
                        }
                    }
                })(this),
                error: (function(O) {
                    return function(P) {
                        J();
                        if (O.options.onLoadFailed) {
                            return O.options.onLoadFailed(P)
                        }
                    }
                })(this)
            })
        };
        E.prototype._loadData = function(J, K) {
            var M, H, I, G;
            if (!J) {
                return 
            }
            this._triggerEvent("tree.load_data", {
                tree_data: J
            });
            if (!K) {
                this._initTree(J)
            } else {
                H = this.select_node_handler.getSelectedNodesUnder(K);
                for (I = 0, G = H.length; I < G; I++) {
                    M = H[I];
                    this.select_node_handler.removeFromSelection(M)
                }
                K.loadFromData(J);
                K.load_on_demand = false;
                this._refreshElements(K.parent)
            }
            if (this.is_dragging) {
                return this.dnd_handler.refreshHitAreas()
            }
        };
        E.prototype.getNodeById = function(G) {
            return this.tree.getNodeById(G)
        };
        E.prototype.getNodeByName = function(G) {
            return this.tree.getNodeByName(G)
        };
        E.prototype.openNode = function(H, G) {
            if (G == null) {
                G = true
            }
            return this._openNode(H, G)
        };
        E.prototype._openNode = function(I, G, J) {
            var K, H;
            if (G == null) {
                G = true
            }
            K = (function(M) {
                return function(O, P, N) {
                    var Q;
                    Q = new v(O, M);
                    return Q.open(N, P)
                }
            })(this);
            if (I.isFolder()) {
                if (I.load_on_demand) {
                    return this._loadFolderOnDemand(I, G, J)
                } else {
                    H = I.parent;
                    while (H&&!H.is_open) {
                        if (H.parent) {
                            K(H, false, null)
                        }
                        H = H.parent
                    }
                    K(I, G, J);
                    return this._saveState()
                }
            }
        };
        E.prototype._loadFolderOnDemand = function(H, G, I) {
            if (G == null) {
                G = true
            }
            return this._loadDataFromUrl(null, H, (function(J) {
                return function() {
                    return J._openNode(H, G, I)
                }
            })(this))
        };
        E.prototype.closeNode = function(H, G) {
            if (G == null) {
                G = true
            }
            if (H.isFolder()) {
                new v(H, this).close(G);
                return this._saveState()
            }
        };
        E.prototype.isDragging = function() {
            return this.is_dragging
        };
        E.prototype.refreshHitAreas = function() {
            return this.dnd_handler.refreshHitAreas()
        };
        E.prototype.addNodeAfter = function(H, G) {
            var I;
            I = G.addAfter(H);
            this._refreshElements(G.parent);
            return I
        };
        E.prototype.addNodeBefore = function(H, G) {
            var I;
            I = G.addBefore(H);
            this._refreshElements(G.parent);
            return I
        };
        E.prototype.addParentNode = function(H, G) {
            var I;
            I = G.addParent(H);
            this._refreshElements(I.parent);
            return I
        };
        E.prototype.removeNode = function(H) {
            var G;
            G = H.parent;
            if (G) {
                this.select_node_handler.removeFromSelection(H, true);
                H.remove();
                return this._refreshElements(G.parent)
            }
        };
        E.prototype.appendNode = function(I, J) {
            var G, H;
            if (!J) {
                J = this.tree
            }
            G = J.isFolder();
            H = J.append(I);
            if (G) {
                this._refreshElements(J)
            } else {
                this._refreshElements(J.parent)
            }
            return H
        };
        E.prototype.prependNode = function(H, I) {
            var G;
            if (!I) {
                I = this.tree
            }
            G = I.prepend(H);
            this._refreshElements(I);
            return G
        };
        E.prototype.updateNode = function(G, I) {
            var H;
            H = I.id && I.id !== G.id;
            if (H) {
                this.tree.removeNodeFromIndex(G)
            }
            G.setData(I);
            if (H) {
                this.tree.addNodeToIndex(G)
            }
            this.renderer.renderNode(G);
            return this._selectCurrentNode()
        };
        E.prototype.moveNode = function(I, J, G) {
            var H;
            H = D.nameToIndex(G);
            this.tree.moveNode(I, J, H);
            return this._refreshElements()
        };
        E.prototype.getStateFromStorage = function() {
            return this.save_state_handler.getStateFromStorage()
        };
        E.prototype.addToSelection = function(G) {
            this.select_node_handler.addToSelection(G);
            return this._getNodeElementForNode(G).select()
        };
        E.prototype.getSelectedNodes = function() {
            return this.select_node_handler.getSelectedNodes()
        };
        E.prototype.isNodeSelected = function(G) {
            return this.select_node_handler.isNodeSelected(G)
        };
        E.prototype.removeFromSelection = function(G) {
            this.select_node_handler.removeFromSelection(G);
            return this._getNodeElementForNode(G).deselect()
        };
        E.prototype.scrollToNode = function(H) {
            var G, I;
            G = d(H.element);
            I = G.offset().top - this.$el.offset().top;
            return this.scroll_handler.scrollTo(I)
        };
        E.prototype.getState = function() {
            return this.save_state_handler.getState()
        };
        E.prototype.setState = function(G) {
            this.save_state_handler.setState(G);
            return this._refreshElements()
        };
        E.prototype.setOption = function(G, H) {
            return this.options[G] = H
        };
        E.prototype._init = function() {
            E.__super__._init.call(this);
            this.element = this.$el;
            this.mouse_delay = 300;
            this.is_initialized = false;
            this.renderer = new t(this);
            if (typeof c !== "undefined" && c !== null) {
                this.save_state_handler = new c(this)
            } else {
                this.options.saveState = false
            }
            if (typeof q !== "undefined" && q !== null) {
                this.select_node_handler = new q(this)
            }
            if (typeof r !== "undefined" && r !== null) {
                this.dnd_handler = new r(this)
            } else {
                this.options.dragAndDrop = false
            }
            if (typeof o !== "undefined" && o !== null) {
                this.scroll_handler = new o(this)
            }
            if ((typeof g !== "undefined" && g !== null) && (typeof q !== "undefined" && q !== null)) {
                this.key_handler = new g(this)
            }
            this._initData();
            this.element.click(d.proxy(this._click, this));
            this.element.dblclick(d.proxy(this._dblclick, this));
            if (this.options.useContextMenu) {
                return this.element.bind("contextmenu", d.proxy(this._contextmenu, this))
            }
        };
        E.prototype._deinit = function() {
            this.element.empty();
            this.element.unbind();
            this.key_handler.deinit();
            this.tree = null;
            return E.__super__._deinit.call(this)
        };
        E.prototype._initData = function() {
            if (this.options.data) {
                return this._loadData(this.options.data)
            } else {
                return this._loadDataFromUrl(this._getDataUrlInfo())
            }
        };
        E.prototype._getDataUrlInfo = function(H) {
            var G, I;
            G = this.options.dataUrl || this.element.data("url");
            I = (function(J) {
                return function() {
                    var N, M, K;
                    K = {
                        url: G
                    };
                    if (H && H.id) {
                        N = {
                            node: H.id
                        };
                        K.data = N
                    } else {
                        M = J._getNodeIdToBeSelected();
                        if (M) {
                            N = {
                                selected_node: M
                            };
                            K.data = N
                        }
                    }
                    return K
                }
            })(this);
            if (d.isFunction(G)) {
                return G(H)
            } else {
                if (d.type(G) === "string") {
                    return I()
                } else {
                    return G
                }
            }
        };
        E.prototype._getNodeIdToBeSelected = function() {
            if (this.options.saveState) {
                return this.save_state_handler.getNodeIdToBeSelected()
            } else {
                return null
            }
        };
        E.prototype._initTree = function(G) {
            this.tree = new this.options.nodeClass(null, true, this.options.nodeClass);
            if (this.select_node_handler) {
                this.select_node_handler.clear()
            }
            this.tree.loadFromData(G);
            this._openNodes();
            this._refreshElements();
            if (!this.is_initialized) {
                this.is_initialized = true;
                return this._triggerEvent("tree.init")
            }
        };
        E.prototype._openNodes = function() {
            var G;
            if (this.options.saveState) {
                if (this.save_state_handler.restoreState()) {
                    return 
                }
            }
            if (this.options.autoOpen === false) {
                return 
            } else {
                if (this.options.autoOpen === true) {
                    G =- 1
                } else {
                    G = parseInt(this.options.autoOpen)
                }
            }
            return this.tree.iterate(function(H, I) {
                if (H.hasChildren()) {
                    H.is_open = true
                }
                return I !== G
            })
        };
        E.prototype._refreshElements = function(G) {
            if (G == null) {
                G = null
            }
            this.renderer.render(G);
            return this._triggerEvent("tree.refresh")
        };
        E.prototype._click = function(I) {
            var J, H, G;
            J = this._getClickTarget(I.target);
            if (J) {
                if (J.type === "button") {
                    this.toggle(J.node, this.options.slide);
                    I.preventDefault();
                    return I.stopPropagation()
                } else {
                    if (J.type === "label") {
                        G = J.node;
                        H = this._triggerEvent("tree.click", {
                            node: G,
                            click_event: I
                        });
                        if (!H.isDefaultPrevented()) {
                            return this._selectNode(G, true)
                        }
                    }
                }
            }
        };
        E.prototype._dblclick = function(G) {
            var H;
            H = this._getClickTarget(G.target);
            if (H && H.type === "label") {
                return this._triggerEvent("tree.dblclick", {
                    node: H.node,
                    click_event: G
                })
            }
        };
        E.prototype._getClickTarget = function(I) {
            var K, H, G, J;
            G = d(I);
            K = G.closest(".jqtree-toggler");
            if (K.length) {
                J = this._getNode(K);
                if (J) {
                    return {
                        type: "button",
                        node: J
                    }
                }
            } else {
                H = G.closest(".jqtree-element");
                if (H.length) {
                    J = this._getNode(H);
                    if (J) {
                        return {
                            type: "label",
                            node: J
                        }
                    }
                }
            }
            return null
        };
        E.prototype._getNode = function(G) {
            var H;
            H = G.closest("li");
            if (H.length === 0) {
                return null
            } else {
                return H.data("node")
            }
        };
        E.prototype._getNodeElementForNode = function(G) {
            if (G.isFolder()) {
                return new v(G, this)
            } else {
                return new j(G, this)
            }
        };
        E.prototype._getNodeElement = function(G) {
            var H;
            H = this._getNode(G);
            if (H) {
                return this._getNodeElementForNode(H)
            } else {
                return null
            }
        };
        E.prototype._contextmenu = function(I) {
            var G, H;
            G = d(I.target).closest("ul.jqtree-tree .jqtree-element");
            if (G.length) {
                H = this._getNode(G);
                if (H) {
                    I.preventDefault();
                    I.stopPropagation();
                    this._triggerEvent("tree.contextmenu", {
                        node: H,
                        click_event: I
                    });
                    return false
                }
            }
        };
        E.prototype._saveState = function() {
            if (this.options.saveState) {
                return this.save_state_handler.saveState()
            }
        };
        E.prototype._mouseCapture = function(G) {
            if (this.options.dragAndDrop) {
                return this.dnd_handler.mouseCapture(G)
            } else {
                return false
            }
        };
        E.prototype._mouseStart = function(G) {
            if (this.options.dragAndDrop) {
                return this.dnd_handler.mouseStart(G)
            } else {
                return false
            }
        };
        E.prototype._mouseDrag = function(H) {
            var G;
            if (this.options.dragAndDrop) {
                G = this.dnd_handler.mouseDrag(H);
                if (this.scroll_handler) {
                    this.scroll_handler.checkScrolling()
                }
                return G
            } else {
                return false
            }
        };
        E.prototype._mouseStop = function(G) {
            if (this.options.dragAndDrop) {
                return this.dnd_handler.mouseStop(G)
            } else {
                return false
            }
        };
        E.prototype._triggerEvent = function(I, G) {
            var H;
            H = d.Event(I);
            d.extend(H, G);
            this.element.trigger(H);
            return H
        };
        E.prototype.testGenerateHitAreas = function(G) {
            this.dnd_handler.current_item = this._getNodeElementForNode(G);
            this.dnd_handler.generateHitAreas();
            return this.dnd_handler.hit_areas
        };
        E.prototype._selectCurrentNode = function() {
            var G, H;
            G = this.getSelectedNode();
            if (G) {
                H = this._getNodeElementForNode(G);
                if (H) {
                    return H.select()
                }
            }
        };
        E.prototype._deselectCurrentNode = function() {
            var G;
            G = this.getSelectedNode();
            if (G) {
                return this.removeFromSelection(G)
            }
        };
        return E
    })(f);
    n.register(e, "tree");
    j = (function() {
        function E(F, G) {
            this.init(F, G)
        }
        E.prototype.init = function(F, G) {
            this.node = F;
            this.tree_widget = G;
            return this.$element = d(F.element)
        };
        E.prototype.getUl = function() {
            return this.$element.children("ul:first")
        };
        E.prototype.getSpan = function() {
            return this.$element.children(".jqtree-element").find("span.jqtree-title")
        };
        E.prototype.getLi = function() {
            return this.$element
        };
        E.prototype.addDropHint = function(F) {
            if (F === D.INSIDE) {
                return new k(this.$element)
            } else {
                return new u(this.node, this.$element, F)
            }
        };
        E.prototype.select = function() {
            return this.getLi().addClass("jqtree-selected")
        };
        E.prototype.deselect = function() {
            return this.getLi().removeClass("jqtree-selected")
        };
        return E
    })();
    v = (function(F) {
        z(E, F);
        function E() {
            return E.__super__.constructor.apply(this, arguments)
        }
        E.prototype.open = function(J, G) {
            var I, H;
            if (G == null) {
                G = true
            }
            if (!this.node.is_open) {
                this.node.is_open = true;
                I = this.getButton();
                I.removeClass("jqtree-closed");
                I.html(this.tree_widget.options.openedIcon);
                H = (function(K) {
                    return function() {
                        K.getLi().removeClass("jqtree-closed");
                        if (J) {
                            J()
                        }
                        return K.tree_widget._triggerEvent("tree.open", {
                            node: K.node
                        })
                    }
                })(this);
                if (G) {
                    return this.getUl().slideDown("fast", H)
                } else {
                    this.getUl().show();
                    return H()
                }
            }
        };
        E.prototype.close = function(G) {
            var I, H;
            if (G == null) {
                G = true
            }
            if (this.node.is_open) {
                this.node.is_open = false;
                I = this.getButton();
                I.addClass("jqtree-closed");
                I.html(this.tree_widget.options.closedIcon);
                H = (function(J) {
                    return function() {
                        J.getLi().addClass("jqtree-closed");
                        return J.tree_widget._triggerEvent("tree.close", {
                            node: J.node
                        })
                    }
                })(this);
                if (G) {
                    return this.getUl().slideUp("fast", H)
                } else {
                    this.getUl().hide();
                    return H()
                }
            }
        };
        E.prototype.getButton = function() {
            return this.$element.children(".jqtree-element").find("a.jqtree-toggler")
        };
        E.prototype.addDropHint = function(G) {
            if (!this.node.is_open && G === D.INSIDE) {
                return new k(this.$element)
            } else {
                return new u(this.node, this.$element, G)
            }
        };
        return E
    })(j);
    l = function(E) {
        return ("" + E).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    A = function(J, G) {
        var F, I, H, E;
        for (F = H = 0, E = J.length; H < E; F=++H) {
            I = J[F];
            if (I === G) {
                return F
            }
        }
        return - 1
    };
    a = function(F, E) {
        if (F.indexOf) {
            return F.indexOf(E)
        } else {
            return A(F, E)
        }
    };
    this.Tree.indexOf = a;
    this.Tree._indexOf = A;
    if (!((this.JSON != null) && (this.JSON.stringify != null) && typeof this.JSON.stringify === "function")) {
        C = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        h = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        B = function(E) {
            C.lastIndex = 0;
            if (C.test(E)) {
                return '"' + E.replace(C, function(F) {
                    var G;
                    G = h[F];
                    return (typeof G === "string" ? G : "\\u" + ("0000" + F.charCodeAt(0).toString(16)).slice( - 4))
                }) + '"'
            } else {
                return '"' + E + '"'
            }
        };
        w = function(M, I) {
            var G, E, H, N, K, F, J;
            K = I[M];
            switch (typeof K) {
            case"string":
                return B(K);
            case"number":
                if (isFinite(K)) {
                    return String(K)
                } else {
                    return "null"
                }
            case"boolean":
            case"null":
                return String(K);
            case"object":
                if (!K) {
                    return "null"
                }
                H = [];
                if (Object.prototype.toString.apply(K) === "[object Array]") {
                    for (G = F = 0, J = K.length; F < J; G=++F) {
                        N = K[G];
                        H[G] = w(G, K) || "null"
                    }
                    return (H.length === 0 ? "[]" : "[" + H.join(",") + "]")
                }
                for (E in K) {
                    if (Object.prototype.hasOwnProperty.call(K, E)) {
                        N = w(E, K);
                        if (N) {
                            H.push(B(E) + ":" + N)
                        }
                    }
                }
                return (H.length === 0 ? "{}" : "{" + H.join(",") + "}")
            }
        };
        if (this.JSON == null) {
            this.JSON = {}
        }
        this.JSON.stringify = function(E) {
            return w("", {
                "": E
            })
        }
    }
    c = (function() {
        function E(F) {
            this.tree_widget = F
        }
        E.prototype.saveState = function() {
            var F;
            F = JSON.stringify(this.getState());
            if (this.tree_widget.options.onSetStateFromStorage) {
                return this.tree_widget.options.onSetStateFromStorage(F)
            } else {
                if (this.supportsLocalStorage()) {
                    return localStorage.setItem(this.getCookieName(), F)
                } else {
                    if (d.cookie) {
                        d.cookie.raw = true;
                        return d.cookie(this.getCookieName(), F, {
                            path: "/"
                        })
                    }
                }
            }
        };
        E.prototype.restoreState = function() {
            var F;
            F = this.getStateFromStorage();
            if (F) {
                this.setState(d.parseJSON(F));
                return true
            } else {
                return false
            }
        };
        E.prototype.getStateFromStorage = function() {
            if (this.tree_widget.options.onGetStateFromStorage) {
                return this.tree_widget.options.onGetStateFromStorage()
            } else {
                if (this.supportsLocalStorage()) {
                    return localStorage.getItem(this.getCookieName())
                } else {
                    if (d.cookie) {
                        d.cookie.raw = true;
                        return d.cookie(this.getCookieName())
                    } else {
                        return null
                    }
                }
            }
        };
        E.prototype.getState = function() {
            var H, G, F;
            H = [];
            this.tree_widget.tree.iterate((function(I) {
                return function(J) {
                    if (J.is_open && J.id && J.hasChildren()) {
                        H.push(J.id)
                    }
                    return true
                }
            })(this));
            G = this.tree_widget.getSelectedNode();
            if (G) {
                F = G.id
            } else {
                F = ""
            }
            return {
                open_nodes: H,
                selected_node: F
            }
        };
        E.prototype.setState = function(H) {
            var I, G, F;
            if (H) {
                I = H.open_nodes;
                F = H.selected_node;
                this.tree_widget.tree.iterate((function(J) {
                    return function(K) {
                        K.is_open = K.id && K.hasChildren() && (a(I, K.id) >= 0);
                        return true
                    }
                })(this));
                if (F && this.tree_widget.select_node_handler) {
                    this.tree_widget.select_node_handler.clear();
                    G = this.tree_widget.getNodeById(F);
                    if (G) {
                        return this.tree_widget.select_node_handler.addToSelection(G)
                    }
                }
            }
        };
        E.prototype.getCookieName = function() {
            if (typeof this.tree_widget.options.saveState === "string") {
                return this.tree_widget.options.saveState
            } else {
                return "tree"
            }
        };
        E.prototype.supportsLocalStorage = function() {
            var F;
            F = function() {
                var G, H;
                if (typeof localStorage === "undefined" || localStorage === null) {
                    return false
                } else {
                    try {
                        H = "_storage_test";
                        sessionStorage.setItem(H, true);
                        sessionStorage.removeItem(H)
                    } catch (I) {
                        G = I;
                        return false
                    }
                    return true
                }
            };
            if (this._supportsLocalStorage == null) {
                this._supportsLocalStorage = F()
            }
            return this._supportsLocalStorage
        };
        E.prototype.getNodeIdToBeSelected = function() {
            var F, G;
            G = this.getStateFromStorage();
            if (G) {
                F = d.parseJSON(G);
                return F.selected_node
            } else {
                return null
            }
        };
        return E
    })();
    q = (function() {
        function E(F) {
            this.tree_widget = F;
            this.clear()
        }
        E.prototype.getSelectedNode = function() {
            var F;
            F = this.getSelectedNodes();
            if (F.length) {
                return F[0]
            } else {
                return false
            }
        };
        E.prototype.getSelectedNodes = function() {
            var H, G, F;
            if (this.selected_single_node) {
                return [this.selected_single_node]
            } else {
                F = [];
                for (H in this.selected_nodes) {
                    G = this.tree_widget.getNodeById(H);
                    if (G) {
                        F.push(G)
                    }
                }
                return F
            }
        };
        E.prototype.getSelectedNodesUnder = function(G) {
            var I, H, F;
            if (this.selected_single_node) {
                if (G.isParentOf(selected_single_node)) {
                    return this.selected_single_node
                } else {
                    return null
                }
            } else {
                F = [];
                for (I in this.selected_nodes) {
                    H = this.tree_widget.getNodeById(I);
                    if (H && G.isParentOf(H)) {
                        F.push(H)
                    }
                }
                return F
            }
        };
        E.prototype.isNodeSelected = function(F) {
            if (F.id) {
                return this.selected_nodes[F.id]
            } else {
                if (this.selected_single_node) {
                    return this.selected_single_node.element === F.element
                } else {
                    return false
                }
            }
        };
        E.prototype.clear = function() {
            this.selected_nodes = {};
            return this.selected_single_node = null
        };
        E.prototype.removeFromSelection = function(F, G) {
            if (G == null) {
                G = false
            }
            if (!F.id) {
                if (this.selected_single_node && F.element === this.selected_single_node.element) {
                    return this.selected_single_node = null
                }
            } else {
                delete this.selected_nodes[F.id];
                if (G) {
                    return F.iterate((function(H) {
                        return function(I) {
                            delete H.selected_nodes[F.id];
                            return true
                        }
                    })(this))
                }
            }
        };
        E.prototype.addToSelection = function(F) {
            if (F.id) {
                return this.selected_nodes[F.id] = true
            } else {
                return this.selected_single_node = F
            }
        };
        return E
    })();
    r = (function() {
        function E(F) {
            this.tree_widget = F;
            this.hovered_area = null;
            this.$ghost = null;
            this.hit_areas = [];
            this.is_dragging = false
        }
        E.prototype.mouseCapture = function(G) {
            var F, H;
            F = d(G.target);
            if (this.tree_widget.options.onIsMoveHandle&&!this.tree_widget.options.onIsMoveHandle(F)) {
                return null
            }
            H = this.tree_widget._getNodeElement(F);
            if (H && this.tree_widget.options.onCanMove) {
                if (!this.tree_widget.options.onCanMove(H.node)) {
                    H = null
                }
            }
            this.current_item = H;
            return this.current_item !== null
        };
        E.prototype.mouseStart = function(F) {
            var G;
            this.refreshHitAreas();
            G = d(F.target).offset();
            this.drag_element = new x(this.current_item.node, F.page_x - G.left, F.page_y - G.top, this.tree_widget.element);
            this.is_dragging = true;
            this.current_item.$element.addClass("jqtree-moving");
            return true
        };
        E.prototype.mouseDrag = function(F) {
            var H, G;
            this.drag_element.move(F.page_x, F.page_y);
            H = this.findHoveredArea(F.page_x, F.page_y);
            G = this.canMoveToArea(H);
            if (G && H) {
                if (this.hovered_area !== H) {
                    this.hovered_area = H;
                    if (this.mustOpenFolderTimer(H)) {
                        this.startOpenFolderTimer(H.node)
                    }
                    this.updateDropHint()
                }
            } else {
                this.removeHover();
                this.removeDropHint();
                this.stopOpenFolderTimer()
            }
            return true
        };
        E.prototype.canMoveToArea = function(F) {
            var G;
            if (!F) {
                return false
            } else {
                if (this.tree_widget.options.onCanMoveTo) {
                    G = D.getName(F.position);
                    return this.tree_widget.options.onCanMoveTo(this.current_item.node, F.node, G)
                } else {
                    return true
                }
            }
        };
        E.prototype.mouseStop = function(F) {
            this.moveItem(F);
            this.clear();
            this.removeHover();
            this.removeDropHint();
            this.removeHitAreas();
            if (this.current_item) {
                this.current_item.$element.removeClass("jqtree-moving")
            }
            this.is_dragging = false;
            return false
        };
        E.prototype.refreshHitAreas = function() {
            this.removeHitAreas();
            return this.generateHitAreas()
        };
        E.prototype.removeHitAreas = function() {
            return this.hit_areas = []
        };
        E.prototype.clear = function() {
            this.drag_element.remove();
            return this.drag_element = null
        };
        E.prototype.removeDropHint = function() {
            if (this.previous_ghost) {
                return this.previous_ghost.remove()
            }
        };
        E.prototype.removeHover = function() {
            return this.hovered_area = null
        };
        E.prototype.generateHitAreas = function() {
            var F;
            F = new b(this.tree_widget.tree, this.current_item.node, this.getTreeDimensions().bottom);
            return this.hit_areas = F.generate()
        };
        E.prototype.findHoveredArea = function(G, M) {
            var J, I, K, F, H;
            I = this.getTreeDimensions();
            if (G < I.left || M < I.top || G > I.right || M > I.bottom) {
                return null
            }
            F = 0;
            K = this.hit_areas.length;
            while (F < K) {
                H = (F + K)>>1;
                J = this.hit_areas[H];
                if (M < J.top) {
                    K = H
                } else {
                    if (M > J.bottom) {
                        F = H + 1
                    } else {
                        return J
                    }
                }
            }
            return null
        };
        E.prototype.mustOpenFolderTimer = function(G) {
            var F;
            F = G.node;
            return F.isFolder()&&!F.is_open && G.position === D.INSIDE
        };
        E.prototype.updateDropHint = function() {
            var F;
            if (!this.hovered_area) {
                return 
            }
            this.removeDropHint();
            F = this.tree_widget._getNodeElementForNode(this.hovered_area.node);
            return this.previous_ghost = F.addDropHint(this.hovered_area.position)
        };
        E.prototype.startOpenFolderTimer = function(G) {
            var F;
            F = (function(H) {
                return function() {
                    return H.tree_widget._openNode(G, H.tree_widget.options.slide, function() {
                        H.refreshHitAreas();
                        return H.updateDropHint()
                    })
                }
            })(this);
            this.stopOpenFolderTimer();
            return this.open_folder_timer = setTimeout(F, this.tree_widget.options.openFolderDelay)
        };
        E.prototype.stopOpenFolderTimer = function() {
            if (this.open_folder_timer) {
                clearTimeout(this.open_folder_timer);
                return this.open_folder_timer = null
            }
        };
        E.prototype.moveItem = function(H) {
            var I, K, J, F, G, M;
            if (this.hovered_area && this.hovered_area.position !== D.NONE && this.canMoveToArea(this.hovered_area)) {
                J = this.current_item.node;
                M = this.hovered_area.node;
                F = this.hovered_area.position;
                G = J.parent;
                if (F === D.INSIDE) {
                    this.hovered_area.node.is_open = true
                }
                I = (function(N) {
                    return function() {
                        N.tree_widget.tree.moveNode(J, M, F);
                        N.tree_widget.element.empty();
                        return N.tree_widget._refreshElements()
                    }
                })(this);
                K = this.tree_widget._triggerEvent("tree.move", {
                    move_info: {
                        moved_node: J,
                        target_node: M,
                        position: D.getName(F),
                        previous_parent: G,
                        do_move: I,
                        original_event: H.original_event
                    }
                });
                if (!K.isDefaultPrevented()) {
                    return I()
                }
            }
        };
        E.prototype.getTreeDimensions = function() {
            var F;
            F = this.tree_widget.element.offset();
            return {
                left: F.left,
                top: F.top,
                right: F.left + this.tree_widget.element.width(),
                bottom: F.top + this.tree_widget.element.height() + 16
            }
        };
        return E
    })();
    m = (function() {
        function E(F) {
            this.tree = F
        }
        E.prototype.iterate = function() {
            var F, G;
            F = true;
            G = (function(H) {
                return function(K, I) {
                    var S, J, R, O, P, M, Q, N;
                    P = (K.is_open ||!K.element) && K.hasChildren();
                    if (K.element) {
                        S = d(K.element);
                        if (!S.is(":visible")) {
                            return 
                        }
                        if (F) {
                            H.handleFirstNode(K, S);
                            F = false
                        }
                        if (!K.hasChildren()) {
                            H.handleNode(K, I, S)
                        } else {
                            if (K.is_open) {
                                if (!H.handleOpenFolder(K, S)) {
                                    P = false
                                }
                            } else {
                                H.handleClosedFolder(K, I, S)
                            }
                        }
                    }
                    if (P) {
                        R = K.children.length;
                        N = K.children;
                        for (O = M = 0, Q = N.length; M < Q; O=++M) {
                            J = N[O];
                            if (O === (R - 1)) {
                                G(K.children[O], null)
                            } else {
                                G(K.children[O], K.children[O + 1])
                            }
                        }
                        if (K.is_open) {
                            return H.handleAfterOpenFolder(K, I, S)
                        }
                    }
                }
            })(this);
            return G(this.tree, null)
        };
        E.prototype.handleNode = function(H, G, F) {};
        E.prototype.handleOpenFolder = function(G, F) {};
        E.prototype.handleClosedFolder = function(H, G, F) {};
        E.prototype.handleAfterOpenFolder = function(H, G, F) {};
        E.prototype.handleFirstNode = function(G, F) {};
        return E
    })();
    b = (function(E) {
        z(F, E);
        function F(G, I, H) {
            F.__super__.constructor.call(this, G);
            this.current_node = I;
            this.tree_bottom = H
        }
        F.prototype.generate = function() {
            this.positions = [];
            this.last_top = 0;
            this.iterate();
            return this.generateHitAreas(this.positions)
        };
        F.prototype.getTop = function(G) {
            return G.offset().top
        };
        F.prototype.addPosition = function(I, G, J) {
            var H;
            H = {
                top: J,
                node: I,
                position: G
            };
            this.positions.push(H);
            return this.last_top = J
        };
        F.prototype.handleNode = function(I, H, G) {
            var J;
            J = this.getTop(G);
            if (I === this.current_node) {
                this.addPosition(I, D.NONE, J)
            } else {
                this.addPosition(I, D.INSIDE, J)
            }
            if (H === this.current_node || I === this.current_node) {
                return this.addPosition(I, D.NONE, J)
            } else {
                return this.addPosition(I, D.AFTER, J)
            }
        };
        F.prototype.handleOpenFolder = function(H, G) {
            if (H === this.current_node) {
                return false
            }
            if (H.children[0] !== this.current_node) {
                this.addPosition(H, D.INSIDE, this.getTop(G))
            }
            return true
        };
        F.prototype.handleClosedFolder = function(I, H, G) {
            var J;
            J = this.getTop(G);
            if (I === this.current_node) {
                return this.addPosition(I, D.NONE, J)
            } else {
                this.addPosition(I, D.INSIDE, J);
                if (H !== this.current_node) {
                    return this.addPosition(I, D.AFTER, J)
                }
            }
        };
        F.prototype.handleFirstNode = function(H, G) {
            if (H !== this.current_node) {
                return this.addPosition(H, D.BEFORE, this.getTop(d(H.element)))
            }
        };
        F.prototype.handleAfterOpenFolder = function(I, H, G) {
            if (I === this.current_node.node || H === this.current_node.node) {
                return this.addPosition(I, D.NONE, this.last_top)
            } else {
                return this.addPosition(I, D.AFTER, this.last_top)
            }
        };
        F.prototype.generateHitAreas = function(I) {
            var N, J, G, M, K, H;
            M =- 1;
            N = [];
            J = [];
            for (K = 0, H = I.length; K < H; K++) {
                G = I[K];
                if (G.top !== M && N.length) {
                    if (N.length) {
                        this.generateHitAreasForGroup(J, N, M, G.top)
                    }
                    M = G.top;
                    N = []
                }
                N.push(G)
            }
            this.generateHitAreasForGroup(J, N, M, this.tree_bottom);
            return J
        };
        F.prototype.generateHitAreasForGroup = function(I, J, N, G) {
            var H, P, K, M, O;
            O = Math.min(J.length, 4);
            H = Math.round((G - N) / O);
            P = N;
            K = 0;
            while (K < O) {
                M = J[K];
                I.push({
                    top: P,
                    bottom: P + H,
                    node: M.node,
                    position: M.position
                });
                P += H;
                K += 1
            }
            return null
        };
        return F
    })(m);
    x = (function() {
        function E(H, G, F, I) {
            this.offset_x = G;
            this.offset_y = F;
            this.$element = d('<span class="jqtree-title jqtree-dragging">' + H.name + "</span>");
            this.$element.css("position", "absolute");
            I.append(this.$element)
        }
        E.prototype.move = function(G, F) {
            return this.$element.offset({
                left: G - this.offset_x,
                top: F - this.offset_y
            })
        };
        E.prototype.remove = function() {
            return this.$element.remove()
        };
        return E
    })();
    u = (function() {
        function E(H, G, F) {
            this.$element = G;
            this.node = H;
            this.$ghost = d('<li class="jqtree_common jqtree-ghost"><span class="jqtree_common jqtree-circle"></span><span class="jqtree_common jqtree-line"></span></li>');
            if (F === D.AFTER) {
                this.moveAfter()
            } else {
                if (F === D.BEFORE) {
                    this.moveBefore()
                } else {
                    if (F === D.INSIDE) {
                        if (H.isFolder() && H.is_open) {
                            this.moveInsideOpenFolder()
                        } else {
                            this.moveInside()
                        }
                    }
                }
            }
        }
        E.prototype.remove = function() {
            return this.$ghost.remove()
        };
        E.prototype.moveAfter = function() {
            return this.$element.after(this.$ghost)
        };
        E.prototype.moveBefore = function() {
            return this.$element.before(this.$ghost)
        };
        E.prototype.moveInsideOpenFolder = function() {
            return d(this.node.children[0].element).before(this.$ghost)
        };
        E.prototype.moveInside = function() {
            this.$element.after(this.$ghost);
            return this.$ghost.addClass("jqtree-inside")
        };
        return E
    })();
    k = (function() {
        function E(G) {
            var F, H;
            F = G.children(".jqtree-element");
            H = G.width() - 4;
            this.$hint = d('<span class="jqtree-border"></span>');
            F.append(this.$hint);
            this.$hint.css({
                width: H,
                height: F.height() - 4
            })
        }
        E.prototype.remove = function() {
            return this.$hint.remove()
        };
        return E
    })();
    o = (function() {
        function E(F) {
            this.tree_widget = F;
            this.previous_top =- 1;
            this._initScrollParent()
        }
        E.prototype._initScrollParent = function() {
            var F, G, H;
            G = (function(I) {
                return function() {
                    var P, M, K, O, J, N;
                    P = ["overflow", "overflow-y"];
                    K = function(R) {
                        var S, U, Q, T;
                        for (U = 0, Q = P.length; U < Q; U++) {
                            S = P[U];
                            if ((T = d.css(R, S)) === "auto" || T === "scroll") {
                                return true
                            }
                        }
                        return false
                    };
                    if (K(I.tree_widget.$el[0])) {
                        return I.tree_widget.$el
                    }
                    N = I.tree_widget.$el.parents();
                    for (O = 0, J = N.length; O < J; O++) {
                        M = N[O];
                        if (K(M)) {
                            return d(M)
                        }
                    }
                    return null
                }
            })(this);
            H = (function(I) {
                return function() {
                    I.scroll_parent_top = 0;
                    return I.$scroll_parent = null
                }
            })(this);
            if (this.tree_widget.$el.css("position") === "fixed") {
                H()
            }
            F = G();
            if (F && F.length && F[0].tagName !== "HTML") {
                this.$scroll_parent = F;
                return this.scroll_parent_top = this.$scroll_parent.offset().top
            } else {
                return H()
            }
        };
        E.prototype.checkScrolling = function() {
            var F;
            F = this.tree_widget.dnd_handler.hovered_area;
            if (F && F.top !== this.previous_top) {
                this.previous_top = F.top;
                if (this.$scroll_parent) {
                    return this._handleScrollingWithScrollParent(F)
                } else {
                    return this._handleScrollingWithDocument(F)
                }
            }
        };
        E.prototype._handleScrollingWithScrollParent = function(G) {
            var F;
            F = this.scroll_parent_top + this.$scroll_parent[0].offsetHeight - G.bottom;
            if (F < 20) {
                this.$scroll_parent[0].scrollTop += 20;
                this.tree_widget.refreshHitAreas();
                return this.previous_top =- 1
            } else {
                if ((G.top - this.scroll_parent_top) < 20) {
                    this.$scroll_parent[0].scrollTop -= 20;
                    this.tree_widget.refreshHitAreas();
                    return this.previous_top =- 1
                }
            }
        };
        E.prototype._handleScrollingWithDocument = function(G) {
            var F;
            F = G.top - d(document).scrollTop();
            if (F < 20) {
                return d(document).scrollTop(d(document).scrollTop() - 20)
            } else {
                if (d(window).height() - (G.bottom - d(document).scrollTop()) < 20) {
                    return d(document).scrollTop(d(document).scrollTop() + 20)
                }
            }
        };
        E.prototype.scrollTo = function(G) {
            var F;
            if (this.$scroll_parent) {
                return this.$scroll_parent[0].scrollTop = G
            } else {
                F = this.tree_widget.$el.offset().top;
                return d(document).scrollTop(G + F)
            }
        };
        E.prototype.isScrolledIntoView = function(G) {
            var F, K, J, I, H;
            F = d(G);
            if (this.$scroll_parent) {
                H = 0;
                I = this.$scroll_parent.height();
                J = F.offset().top - this.scroll_parent_top;
                K = J + F.height()
            } else {
                H = d(window).scrollTop();
                I = H + d(window).height();
                J = F.offset().top;
                K = J + F.height()
            }
            return (K <= I) && (J >= H)
        };
        return E
    })();
    g = (function() {
        var I, F, H, E;
        F = 37;
        E = 38;
        H = 39;
        I = 40;
        function G(J) {
            this.tree_widget = J;
            if (J.options.keyboardSupport) {
                d(document).bind("keydown.jqtree", d.proxy(this.handleKeyDown, this))
            }
        }
        G.prototype.deinit = function() {
            return d(document).unbind("keydown.jqtree")
        };
        G.prototype.handleKeyDown = function(Q) {
            var O, M, R, P, N, J, K;
            if (!this.tree_widget.options.keyboardSupport) {
                return 
            }
            if (d(document.activeElement).is("textarea,input")) {
                return true
            }
            O = this.tree_widget.getSelectedNode();
            K = (function(S) {
                return function(T) {
                    if (T) {
                        S.tree_widget.selectNode(T);
                        if (S.tree_widget.scroll_handler && (!S.tree_widget.scroll_handler.isScrolledIntoView(d(T.element).find(".jqtree-element")))) {
                            S.tree_widget.scrollToNode(T)
                        }
                        return false
                    } else {
                        return true
                    }
                }
            })(this);
            R = (function(S) {
                return function() {
                    return K(S.getNextNode(O))
                }
            })(this);
            J = (function(S) {
                return function() {
                    return K(S.getPreviousNode(O))
                }
            })(this);
            N = (function(S) {
                return function() {
                    if (O.isFolder()&&!O.is_open) {
                        S.tree_widget.openNode(O);
                        return false
                    } else {
                        return true
                    }
                }
            })(this);
            P = (function(S) {
                return function() {
                    if (O.isFolder() && O.is_open) {
                        S.tree_widget.closeNode(O);
                        return false
                    } else {
                        return true
                    }
                }
            })(this);
            if (!O) {
                return true
            } else {
                M = Q.which;
                switch (M) {
                case I:
                    return R();
                case E:
                    return J();
                case H:
                    return N();
                case F:
                    return P()
                }
            }
        };
        G.prototype.getNextNode = function(J, M) {
            var K;
            if (M == null) {
                M = true
            }
            if (M && J.hasChildren() && J.is_open) {
                return J.children[0]
            } else {
                if (!J.parent) {
                    return null
                } else {
                    K = J.getNextSibling();
                    if (K) {
                        return K
                    } else {
                        return this.getNextNode(J.parent, false)
                    }
                }
            }
        };
        G.prototype.getPreviousNode = function(K) {
            var J;
            if (!K.parent) {
                return null
            } else {
                J = K.getPreviousSibling();
                if (J) {
                    if (!J.hasChildren() ||!J.is_open) {
                        return J
                    } else {
                        return this.getLastChild(J)
                    }
                } else {
                    if (K.parent.parent) {
                        return K.parent
                    } else {
                        return null
                    }
                }
            }
        };
        G.prototype.getLastChild = function(K) {
            var J;
            if (!K.hasChildren()) {
                return null
            } else {
                J = K.children[K.children.length - 1];
                if (!J.hasChildren() ||!J.is_open) {
                    return J
                } else {
                    return this.getLastChild(J)
                }
            }
        };
        return G
    })()
}).call(this);
(function() {
    L.TileLayer.Provider = L.TileLayer.extend({
        initialize: function(j, k) {
            var e = L.TileLayer.Provider.providers;
            var d = j.split(".");
            var g = d[0];
            var b = d[1];
            if (!e[g]) {
                throw "No such provider (" + g + ")"
            }
            var f = {
                url: e[g].url,
                options: e[g].options
            };
            if (b && "variants" in e[g]) {
                if (!(b in e[g].variants)) {
                    throw "No such name in provider (" + b + ")"
                }
                var c = e[g].variants[b];
                f = {
                    url: c.url || f.url,
                    options: L.Util.extend({}, f.options, c.options)
                }
            } else {
                if (typeof f.url === "function") {
                    f.url = f.url(d.splice(1).join("."))
                }
            }
            var h = f.options.attribution;
            if (h.indexOf("{attribution.")!=-1) {
                f.options.attribution = h.replace(/\{attribution.(\w*)\}/, function(l, m) {
                    return e[m].options.attribution
                })
            }
            var a = L.Util.extend({}, f.options, k);
            L.TileLayer.prototype.initialize.call(this, f.url, a)
        }
    });
    L.TileLayer.Provider.providers = {
        OpenStreetMap: {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            },
            variants: {
                Mapnik: {},
                BlackAndWhite: {
                    url: "http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png"
                },
                DE: {
                    url: "http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                }
            }
        },
        OpenCycleMap: {
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
                attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }
        },
        Thunderforest: {
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
                attribution: "{attribution.OpenCycleMap}"
            },
            variants: {
                OpenCycleMap: {},
                Transport: {
                    url: "http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png"
                },
                Landscape: {
                    url: "http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png"
                }
            }
        },
        MapQuestOpen: {
            url: "http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg",
            options: {
                attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data {attribution.OpenStreetMap}',
                subdomains: "1234"
            },
            variants: {
                OSM: {},
                Aerial: {
                    url: "http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg",
                    options: {
                        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
                    }
                }
            }
        },
        MapBox: {
            url: function(a) {
                return "http://{s}.tiles.mapbox.com/v3/" + a + "/{z}/{x}/{y}.png"
            },
            options: {
                attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data {attribution.OpenStreetMap}',
                subdomains: "abcd"
            }
        },
        Stamen: {
            url: "http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png",
            options: {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data {attribution.OpenStreetMap}',
                subdomains: "abcd",
                minZoom: 0,
                maxZoom: 20
            },
            variants: {
                Toner: {},
                TonerBackground: {
                    url: "http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png"
                },
                TonerHybrid: {
                    url: "http://{s}.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png"
                },
                TonerLines: {
                    url: "http://{s}.tile.stamen.com/toner-lines/{z}/{x}/{y}.png"
                },
                TonerLabels: {
                    url: "http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png"
                },
                TonerLite: {
                    url: "http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png"
                },
                Terrain: {
                    url: "http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
                    options: {
                        minZoom: 4,
                        maxZoom: 18
                    }
                },
                Watercolor: {
                    url: "http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
                    options: {
                        maxZoom: 16
                    }
                }
            }
        },
        Esri: {
            url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            options: {
                attribution: "Tiles &copy; Esri"
            },
            variants: {
                WorldStreetMap: {
                    options: {
                        attribution: "{attribution.Esri} &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
                    }
                },
                DeLorme: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        minZoom: 1,
                        maxZoom: 11,
                        attribution: "{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme"
                    }
                },
                WorldTopoMap: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        attribution: "{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
                    }
                },
                WorldImagery: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        attribution: "{attribution.Esri} &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                    }
                },
                WorldTerrain: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        maxZoom: 13,
                        attribution: "{attribution.Esri} &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS"
                    }
                },
                WorldShadedRelief: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        maxZoom: 13,
                        attribution: "{attribution.Esri} &mdash; Source: Esri"
                    }
                },
                WorldPhysical: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        maxZoom: 8,
                        attribution: "{attribution.Esri} &mdash; Source: US National Park Service"
                    }
                },
                OceanBasemap: {
                    url: "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        maxZoom: 13,
                        attribution: "{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
                    }
                },
                NatGeoWorldMap: {
                    url: "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        maxZoom: 16,
                        attribution: "{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
                    }
                },
                WorldGrayCanvas: {
                    url: "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                    options: {
                        maxZoom: 16,
                        attribution: "{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ"
                    }
                }
            }
        },
        OpenWeatherMap: {
            options: {
                attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
                opacity: 0.5
            },
            variants: {
                Clouds: {
                    url: "http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png"
                },
                CloudsClassic: {
                    url: "http://{s}.tile.openweathermap.org/map/clouds_cls/{z}/{x}/{y}.png"
                },
                Precipitation: {
                    url: "http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png"
                },
                PrecipitationClassic: {
                    url: "http://{s}.tile.openweathermap.org/map/precipitation_cls/{z}/{x}/{y}.png"
                },
                Rain: {
                    url: "http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png"
                },
                RainClassic: {
                    url: "http://{s}.tile.openweathermap.org/map/rain_cls/{z}/{x}/{y}.png"
                },
                Pressure: {
                    url: "http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png"
                },
                PressureContour: {
                    url: "http://{s}.tile.openweathermap.org/map/pressure_cntr/{z}/{x}/{y}.png"
                },
                Wind: {
                    url: "http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png"
                },
                Temperature: {
                    url: "http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png"
                },
                Snow: {
                    url: "http://{s}.tile.openweathermap.org/map/snow/{z}/{x}/{y}.png"
                }
            }
        },
        Nokia: {
            options: {
                attribution: 'Map &copy; <a href="http://developer.here.com">Nokia</a>, Data &copy; NAVTEQ 2012',
                subdomains: "1234",
                devID: "xyz",
                appID: "abc"
            },
            variants: {
                normalDay: {
                    url: "http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}"
                },
                normalGreyDay: {
                    url: "http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}"
                },
                satelliteNoLabelsDay: {
                    url: "http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}"
                },
                satelliteYesLabelsDay: {
                    url: "http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}"
                },
                terrainDay: {
                    url: "http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/terrain.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}"
                }
            }
        },
        Acetate: {
            url: "http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png",
            options: {
                attribution: "&copy;2012 Esri & Stamen, Data from OSM and Natural Earth",
                subdomains: "0123",
                minZoom: 2,
                maxZoom: 18
            },
            variants: {
                all: {},
                basemap: {
                    url: "http://a{s}.acetate.geoiq.com/tiles/acetate-simple/{z}/{x}/{y}.png"
                },
                terrain: {
                    url: "http://a{s}.acetate.geoiq.com/tiles/terrain/{z}/{x}/{y}.png"
                },
                foreground: {
                    url: "http://a{s}.acetate.geoiq.com/tiles/acetate-fg/{z}/{x}/{y}.png"
                },
                roads: {
                    url: "http://a{s}.acetate.geoiq.com/tiles/acetate-roads/{z}/{x}/{y}.png"
                },
                labels: {
                    url: "http://a{s}.acetate.geoiq.com/tiles/acetate-labels/{z}/{x}/{y}.png"
                },
                hillshading: {
                    url: "http://a{s}.acetate.geoiq.com/tiles/hillshading/{z}/{x}/{y}.png"
                }
            }
        }
    }
}());
L.tileLayer.provider = function(b, a) {
    return new L.TileLayer.Provider(b, a)
};
L.Control.Layers.Provided = L.Control.Layers.extend({
    initialize: function(c, b, a) {
        var d;
        if (c.length) {
            (function() {
                var f = {}, e = c.length, g = 0;
                while (g < e) {
                    if (g === 0) {
                        d = L.tileLayer.provider(c[0]);
                        f[c[g].replace(/\./g, ": ").replace(/([a-z])([A-Z])/g, "$1 $2")] = d
                    } else {
                        f[c[g].replace(/\./g, ": ").replace(/([a-z])([A-Z])/g, "$1 $2")] = L.tileLayer.provider(c[g])
                    }
                    g++
                }
                c = f
            }());
            this._first = d
        }
        if (b && b.length) {
            (function() {
                var f = {}, e = b.length, g = 0;
                while (g < e) {
                    f[b[g].replace(/\./g, ": ").replace(/([a-z])([A-Z])/g, "$1 $2")] = L.tileLayer.provider(b[g]);
                    g++
                }
                b = f
            }())
        }
        L.Control.Layers.prototype.initialize.call(this, c, b, a)
    },
    onAdd: function(a) {
        this._first.addTo(a);
        return L.Control.Layers.prototype.onAdd.call(this, a)
    }
});
L.control.layers.provided = function(c, b, a) {
    return new L.Control.Layers.Provided(c, b, a)
};
(function() {
    L.labelVersion = "0.2.1-dev", L.Label = L.Class.extend({
        includes: L.Mixin.Events,
        options: {
            className: "",
            clickable: !1,
            direction: "right",
            noHide: !1,
            offset: [12, - 15],
            opacity: 1,
            zoomAnimation: !0
        },
        initialize: function(a, b) {
            L.setOptions(this, a), this._source = b, this._animated = L.Browser.any3d && this.options.zoomAnimation, this._isOpen=!1
        },
        onAdd: function(a) {
            this._map = a, this._pane = this._source instanceof L.Marker ? a._panes.markerPane : a._panes.popupPane, this._container || this._initLayout(), this._pane.appendChild(this._container), this._initInteraction(), this._update(), this.setOpacity(this.options.opacity), a.on("moveend", this._onMoveEnd, this).on("viewreset", this._onViewReset, this), this._animated && a.on("zoomanim", this._zoomAnimation, this), L.Browser.touch&&!this.options.noHide && L.DomEvent.on(this._container, "click", this.close, this)
        },
        onRemove: function(a) {
            this._pane.removeChild(this._container), a.off({
                zoomanim: this._zoomAnimation,
                moveend: this._onMoveEnd,
                viewreset: this._onViewReset
            }, this), this._removeInteraction(), this._map = null
        },
        setLatLng: function(a) {
            return this._latlng = L.latLng(a), this._map && this._updatePosition(), this
        },
        setContent: function(a) {
            return this._previousContent = this._content, this._content = a, this._updateContent(), this
        },
        close: function() {
            var a = this._map;
            a && (L.Browser.touch&&!this.options.noHide && L.DomEvent.off(this._container, "click", this.close), a.removeLayer(this))
        },
        updateZIndex: function(a) {
            this._zIndex = a + 1000, this._container && this._zIndex && (this._container.style.zIndex = a + 1000)
        },
        setOpacity: function(a) {
            this.options.opacity = a, this._container && L.DomUtil.setOpacity(this._container, a)
        },
        _initLayout: function() {
            this._container = L.DomUtil.create("div", "leaflet-label " + this.options.className + " leaflet-zoom-animated"), this.updateZIndex(this._zIndex)
        },
        _update: function() {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updatePosition(), this._container.style.visibility = "")
        },
        _updateContent: function() {
            this._content && this._map && this._prevContent !== this._content && "string" == typeof this._content && (this._container.innerHTML = this._content, this._prevContent = this._content, this._labelWidth = this._container.offsetWidth)
        },
        _updatePosition: function() {
            var a = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(a)
        },
        _setPosition: function(f) {
            var h = this._map, d = this._container, k = h.latLngToContainerPoint(h.getCenter()), j = h.layerPointToContainerPoint(f), g = this.options.direction, c = this._labelWidth, b = L.point(this.options.offset);
            "right" === g || "auto" === g && j.x < k.x ? (L.DomUtil.addClass(d, "leaflet-label-right"), L.DomUtil.removeClass(d, "leaflet-label-left"), f = f.add(b)) : (L.DomUtil.addClass(d, "leaflet-label-left"), L.DomUtil.removeClass(d, "leaflet-label-right"), f = f.add(L.point( - b.x - c, b.y))), L.DomUtil.setPosition(d, f)
        },
        _zoomAnimation: function(a) {
            var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
            this._setPosition(b)
        },
        _onMoveEnd: function() {
            this._animated && "auto" !== this.options.direction || this._updatePosition()
        },
        _onViewReset: function(a) {
            a && a.hard && this._update()
        },
        _initInteraction: function() {
            if (this.options.clickable) {
                var b = this._container, c = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                L.DomUtil.addClass(b, "leaflet-clickable"), L.DomEvent.on(b, "click", this._onMouseClick, this);
                for (var a = 0; c.length > a; a++) {
                    L.DomEvent.on(b, c[a], this._fireMouseEvent, this)
                }
            }
        },
        _removeInteraction: function() {
            if (this.options.clickable) {
                var b = this._container, c = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
                L.DomUtil.removeClass(b, "leaflet-clickable"), L.DomEvent.off(b, "click", this._onMouseClick, this);
                for (var a = 0; c.length > a; a++) {
                    L.DomEvent.off(b, c[a], this._fireMouseEvent, this)
                }
            }
        },
        _onMouseClick: function(a) {
            this.hasEventListeners(a.type) && L.DomEvent.stopPropagation(a), this.fire(a.type, {
                originalEvent: a
            })
        },
        _fireMouseEvent: function(a) {
            this.fire(a.type, {
                originalEvent: a
            }), "contextmenu" === a.type && this.hasEventListeners(a.type) && L.DomEvent.preventDefault(a), "mousedown" !== a.type ? L.DomEvent.stopPropagation(a) : L.DomEvent.preventDefault(a)
        }
    }), L.BaseMarkerMethods = {
        showLabel: function() {
            return this.label && this._map && (this.label.setLatLng(this._latlng), this._map.showLabel(this.label)), this
        },
        hideLabel: function() {
            return this.label && this.label.close(), this
        },
        setLabelNoHide: function(a) {
            this._labelNoHide !== a && (this._labelNoHide = a, a ? (this._removeLabelRevealHandlers(), this.showLabel()) : (this._addLabelRevealHandlers(), this.hideLabel()))
        },
        bindLabel: function(b, c) {
            var a = this.options.icon ? this.options.icon.options.labelAnchor: this.options.labelAnchor, d = L.point(a) || L.point(0, 0);
            return d = d.add(L.Label.prototype.options.offset), c && c.offset && (d = d.add(c.offset)), c = L.Util.extend({
                offset: d
            }, c), this._labelNoHide = c.noHide, this.label || (this._labelNoHide || this._addLabelRevealHandlers(), this.on("remove", this.hideLabel, this).on("move", this._moveLabel, this).on("add", this._onMarkerAdd, this), this._hasLabelHandlers=!0), this.label = new L.Label(c, this).setContent(b), this
        },
        unbindLabel: function() {
            return this.label && (this.hideLabel(), this.label = null, this._hasLabelHandlers && (this._labelNoHide || this._removeLabelRevealHandlers(), this.off("remove", this.hideLabel, this).off("move", this._moveLabel, this).off("add", this._onMarkerAdd, this)), this._hasLabelHandlers=!1), this
        },
        updateLabelContent: function(a) {
            this.label && this.label.setContent(a)
        },
        getLabel: function() {
            return this.label
        },
        _onMarkerAdd: function() {
            this._labelNoHide && this.showLabel()
        },
        _addLabelRevealHandlers: function() {
            this.on("mouseover", this.showLabel, this).on("mouseout", this.hideLabel, this), L.Browser.touch && this.on("click", this.showLabel, this)
        },
        _removeLabelRevealHandlers: function() {
            this.off("mouseover", this.showLabel, this).off("mouseout", this.hideLabel, this), L.Browser.touch && this.off("click", this.showLabel, this)
        },
        _moveLabel: function(a) {
            this.label.setLatLng(a.latlng)
        }
    }, L.Icon.Default.mergeOptions({
        labelAnchor: new L.Point(9, - 20)
    }), L.Marker.mergeOptions({
        icon: new L.Icon.Default
    }), L.Marker.include(L.BaseMarkerMethods), L.Marker.include({
        _originalUpdateZIndex: L.Marker.prototype._updateZIndex,
        _updateZIndex: function(a) {
            var b = this._zIndex + a;
            this._originalUpdateZIndex(a), this.label && this.label.updateZIndex(b)
        },
        _originalSetOpacity: L.Marker.prototype.setOpacity,
        setOpacity: function(a, b) {
            this.options.labelHasSemiTransparency = b, this._originalSetOpacity(a)
        },
        _originalUpdateOpacity: L.Marker.prototype._updateOpacity,
        _updateOpacity: function() {
            var a = 0 === this.options.opacity ? 0: 1;
            this._originalUpdateOpacity(), this.label && this.label.setOpacity(this.options.labelHasSemiTransparency ? this.options.opacity : a)
        },
        _originalSetLatLng: L.Marker.prototype.setLatLng,
        setLatLng: function(a) {
            return this.label&&!this._labelNoHide && this.hideLabel(), this._originalSetLatLng(a)
        }
    }), L.CircleMarker.mergeOptions({
        labelAnchor: new L.Point(0, 0)
    }), L.CircleMarker.include(L.BaseMarkerMethods), L.Path.include({
        bindLabel: function(a, b) {
            return this.label && this.label.options === b || (this.label = new L.Label(b, this)), this.label.setContent(a), this._showLabelAdded || (this.on("mouseover", this._showLabel, this).on("mousemove", this._moveLabel, this).on("mouseout remove", this._hideLabel, this), L.Browser.touch && this.on("click", this._showLabel, this), this._showLabelAdded=!0), this
        },
        unbindLabel: function() {
            return this.label && (this._hideLabel(), this.label = null, this._showLabelAdded=!1, this.off("mouseover", this._showLabel, this).off("mousemove", this._moveLabel, this).off("mouseout remove", this._hideLabel, this)), this
        },
        updateLabelContent: function(a) {
            this.label && this.label.setContent(a)
        },
        _showLabel: function(a) {
            this.label.setLatLng(a.latlng), this._map.showLabel(this.label)
        },
        _moveLabel: function(a) {
            this.label.setLatLng(a.latlng)
        },
        _hideLabel: function() {
            this.label.close()
        }
    }), L.Map.include({
        showLabel: function(a) {
            return this.addLayer(a)
        }
    }), L.FeatureGroup.include({
        clearLayers: function() {
            return this.unbindLabel(), this.eachLayer(this.removeLayer, this), this
        },
        bindLabel: function(a, b) {
            return this.invoke("bindLabel", a, b)
        },
        unbindLabel: function() {
            return this.invoke("unbindLabel")
        },
        updateLabelContent: function(a) {
            this.invoke("updateLabelContent", a)
        }
    })
})(this, document);
L.Control.FullScreen = L.Control.extend({
    options: {
        position: "topleft",
        title: "Full Screen"
    },
    onAdd: function(c) {
        if (!fullScreenApi.supportsFullScreen) {
            return c.zoomControl._container
        }
        var d = "leaflet-control-zoom", b, a;
        if (c.zoomControl) {
            a = c.zoomControl._container;
            b = "-fullscreen leaflet-bar-part leaflet-bar-part-bottom last";
            if (c.zoomControl._zoomOutButton) {
                L.DomUtil.removeClass(c.zoomControl._zoomOutButton, "leaflet-bar-part-bottom")
            }
        } else {
            a = L.DomUtil.create("div", d);
            b = "-fullscreen leaflet-bar leaflet-bar-part last"
        }
        this._createButton(this.options.title, d + b, a, this.toogleFullScreen, c);
        return a
    },
    _createButton: function(f, d, a, c, b) {
        var e = L.DomUtil.create("a", d, a);
        e.href = "#";
        e.title = f;
        L.DomEvent.addListener(e, "click", L.DomEvent.stopPropagation).addListener(e, "click", L.DomEvent.preventDefault).addListener(e, "click", c, b);
        L.DomEvent.addListener(a, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation).addListener(a, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault).addListener(a, fullScreenApi.fullScreenEventName, this._handleEscKey, b);
        L.DomEvent.addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation).addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault).addListener(document, fullScreenApi.fullScreenEventName, this._handleEscKey, b);
        return e
    },
    toogleFullScreen: function() {
        this._exitFired = false;
        if (fullScreenApi.supportsFullScreen) {
            var a = this._container;
            if (fullScreenApi.isFullScreen(a)) {
                fullScreenApi.cancelFullScreen(a);
                this.invalidateSize();
                this.fire("exitFullscreen");
                this._exitFired = true
            } else {
                fullScreenApi.requestFullScreen(a);
                this.invalidateSize();
                this.fire("enterFullscreen")
            }
        }
    },
    _handleEscKey: function() {
        if (!fullScreenApi.isFullScreen(this)&&!this._exitFired) {
            this.fire("exitFullscreen");
            this._exitFired = true
        }
    }
});
L.Map.addInitHook(function() {
    if (this.options.fullscreenControl) {
        this.fullscreenControl = L.control.fullscreen();
        this.addControl(this.fullscreenControl)
    }
});
L.control.fullscreen = function(a) {
    return new L.Control.FullScreen(a)
};
(function() {
    var d = {
        supportsFullScreen: false,
        isFullScreen: function() {
            return false
        },
        requestFullScreen: function() {},
        cancelFullScreen: function() {},
        fullScreenEventName: "",
        prefix: ""
    }, c = "webkit moz o ms khtml".split(" ");
    if (typeof document.exitFullscreen != "undefined") {
        d.supportsFullScreen = true
    } else {
        for (var b = 0, a = c.length; b < a; b++) {
            d.prefix = c[b];
            if (typeof document[d.prefix + "CancelFullScreen"] != "undefined") {
                d.supportsFullScreen = true;
                break
            }
        }
    }
    if (d.supportsFullScreen) {
        d.fullScreenEventName = d.prefix + "fullscreenchange";
        d.isFullScreen = function() {
            switch (this.prefix) {
            case"":
                return document.fullScreen;
            case"webkit":
                return document.webkitIsFullScreen;
            default:
                return document[this.prefix + "FullScreen"]
            }
        };
        d.requestFullScreen = function(e) {
            return (this.prefix === "") ? e.requestFullscreen() : e[this.prefix + "RequestFullScreen"]()
        };
        d.cancelFullScreen = function(e) {
            return (this.prefix === "") ? document.exitFullscreen() : document[this.prefix + "CancelFullScreen"]()
        }
    }
    if (typeof jQuery != "undefined") {
        jQuery.fn.requestFullScreen = function() {
            return this.each(function() {
                var e = jQuery(this);
                if (d.supportsFullScreen) {
                    d.requestFullScreen(e)
                }
            })
        }
    }
    window.fullScreenApi = d
})();
(function(b) {
    var a = (function() {
        var c = b.documentMode;
        return ("onhashchange" in b) && (c === undefined || c > 7)
    })();
    L.Hash = function(c) {
        this.onHashChange = L.Util.bind(this.onHashChange, this);
        if (c) {
            this.init(c)
        }
    };
    L.Hash.prototype = {
        map: null,
        lastHash: null,
        parseHash: function(f) {
            if (f.indexOf("#") === 0) {
                f = f.substr(1)
            }
            var c = f.split("/");
            if (c.length == 3) {
                var d = parseInt(c[0], 10), e = parseFloat(c[1]), g = parseFloat(c[2]);
                if (isNaN(d) || isNaN(e) || isNaN(g)) {
                    return false
                } else {
                    return {
                        center: new L.LatLng(e, g),
                        zoom: d
                    }
                }
            } else {
                return false
            }
        },
        formatHash: function(f) {
            var c = f.getCenter(), e = f.getZoom(), d = Math.max(0, Math.ceil(Math.log(e) / Math.LN2));
            return "#" + [e, c.lat.toFixed(d), c.lng.toFixed(d)].join("/")
        },
        init: function(c) {
            this.map = c;
            this.lastHash = null;
            this.onHashChange();
            if (!this.isListening) {
                this.startListening()
            }
        },
        remove: function() {
            if (this.changeTimeout) {
                clearTimeout(this.changeTimeout)
            }
            if (this.isListening) {
                this.stopListening()
            }
            this.map = null
        },
        onMapMove: function() {
            if (this.movingMap ||!this.map._loaded) {
                return false
            }
            var c = this.formatHash(this.map);
            if (this.lastHash != c) {
                location.replace(c);
                this.lastHash = c
            }
        },
        movingMap: false,
        update: function() {
            var d = location.hash;
            if (d === this.lastHash) {
                return 
            }
            var c = this.parseHash(d);
            if (c) {
                this.movingMap = true;
                this.map.setView(c.center, c.zoom);
                this.movingMap = false
            } else {
                this.onMapMove(this.map)
            }
        },
        changeDefer: 100,
        changeTimeout: null,
        onHashChange: function() {
            if (!this.changeTimeout) {
                var c = this;
                this.changeTimeout = setTimeout(function() {
                    c.update();
                    c.changeTimeout = null
                }, this.changeDefer)
            }
        },
        isListening: false,
        hashChangeInterval: null,
        startListening: function() {
            this.map.on("moveend", this.onMapMove, this);
            if (a) {
                L.DomEvent.addListener(b, "hashchange", this.onHashChange)
            } else {
                clearInterval(this.hashChangeInterval);
                this.hashChangeInterval = setInterval(this.onHashChange, 50)
            }
            this.isListening = true
        },
        stopListening: function() {
            this.map.off("moveend", this.onMapMove, this);
            if (a) {
                L.DomEvent.removeListener(b, "hashchange", this.onHashChange)
            } else {
                clearInterval(this.hashChangeInterval)
            }
            this.isListening = false
        }
    };
    L.hash = function(c) {
        return new L.Hash(c)
    };
    L.Map.prototype.addHash = function() {
        this._hash = L.hash(this)
    };
    L.Map.prototype.removeHash = function() {
        this._hash.remove()
    }
})(window);
CLLD = {
    routes: {},
    base_url: "",
    query_params: {}
};
CLLD.url = function(d, c) {
    var b = CLLD.base_url + d, a = "?";
    if (/\?/.test(b)) {
        a = "&"
    }
    if (c) {
        b += a + $.param(c)
    }
    return b
};
CLLD.reload = function(b) {
    var a, c = document.location;
    a = c.pathname;
    if (c.search) {
        b = $.extend({}, JSON.parse('{"' + decodeURI(c.search.replace("?", "").replace(/&/g, '","').replace(/=/g, '":"')) + '"}'), b)
    }
    document.location.href = a + "?" + $.param(b)
};
CLLD.route_url = function(a, d, c) {
    var b, e = CLLD.routes[a];
    for (b in d) {
        if (d.hasOwnProperty(b)) {
            e = e.replace("{" + b + "}", d[b])
        }
    }
    return CLLD.url(e, c)
};
CLLD.TreeView = (function() {
    return {
        init: function() {
            $("input.treeview").change(function() {
                var a = $('label[for="' + this.getAttribute("id") + '"]').children("i");
                if (a && a.hasClass && a.hasClass("icon-treeview")) {
                    if ($(this).prop("checked")) {
                        a.first().addClass("icon-chevron-down");
                        a.first().removeClass("icon-chevron-right")
                    } else {
                        a.first().addClass("icon-chevron-right");
                        a.first().removeClass("icon-chevron-down")
                    }
                }
                return true
            })
        },
        show: function(a) {
            $("input.level" + a + ":not(:checked)").trigger("click")
        },
        hide: function(a) {
            $("input.level" + a + ":checked").trigger("click")
        }
    }
})();
CLLD.MultiSelect = (function() {
    return {
        data: function(a, b) {
            return {
                q: a,
                t: "select2"
            }
        },
        results: function(b, a) {
            return b
        },
        addItem: function(a, d) {
            var c, b = $("#" + a);
            c = b.select2("data");
            c.push(d);
            b.select2("data", c)
        }
    }
})();
CLLD.Feed = (function() {
    var a = function(b) {
        var c = new google.feeds.Feed(b.url);
        c.setNumEntries(b.numEntries == undefined ? 4 : b.numEntries);
        c.load(function(d) {
            if (!d.error) {
                var h = b.title == undefined ? d.feed.title: b.title;
                if (b.linkTitle) {
                    h = '<a href="' + b.url + '">' + h + "</a>"
                }
                var g = "<h3>" + h + "</h3>";
                for (var e = 0; e < d.feed.entries.length; e++) {
                    var f = d.feed.entries[e];
                    g += '<h4><a href="' + f.link + '">' + f.title + "</a></h4>";
                    g += '<p class="muted"><small>' + f.publishedDate + "</small></p>";
                    g += "<p>" + f.contentSnippet + "</p>"
                }
                $("#" + b.eid).html(g)
            }
        })
    };
    return {
        init: a
    }
})();
CLLD.Modal = (function() {
    var a = function(d, b, c) {
        $("#ModalLabel").html(d);
        if (b) {
            $("#ModalBody").load(b)
        } else {
            $("#ModalBody").html(c)
        }
        $("#Modal").modal("show")
    };
    return {
        show: a
    }
})();
CLLD.DataTables = {};
CLLD.DataTable = (function() {
    var a = function(b, f, e) {
        var d;
        e = e === undefined ? {} : e;
        $.extend($.fn.dataTable.defaults, {
            fnServerParams: function(g) {
                g.push({
                    name: "__eid__",
                    value: b
                })
            },
            fnInitComplete: function(j) {
                var g, h;
                for (g = 0; g < j.aoPreSearchCols.length; g++) {
                    if (j.aoPreSearchCols[g].sSearch.length > 0) {
                        h = $("thead .control")[g];
                        h = $(h);
                        if (h.length) {
                            h.val(j.aoPreSearchCols[g].sSearch)
                        }
                    }
                }
            }
        });
        $.extend($.fn.dataTableExt.oStdClasses, {
            sWrapper: "dataTables_wrapper form-inline"
        });
        $.fn.dataTableExt.oApi.fnPagingInfo = function(g) {
            return {
                iStart: g._iDisplayStart,
                iEnd: g.fnDisplayEnd(),
                iLength: g._iDisplayLength,
                iTotal: g.fnRecordsTotal(),
                iFilteredTotal: g.fnRecordsDisplay(),
                iPage: Math.ceil(g._iDisplayStart / g._iDisplayLength),
                iTotalPages: Math.ceil(g.fnRecordsDisplay() / g._iDisplayLength)
            }
        };
        $.extend($.fn.dataTableExt.oPagination, {
            bootstrap: {
                fnInit: function(l, h, k) {
                    var g = l.oLanguage.oPaginate;
                    var m = function(n) {
                        n.preventDefault();
                        if (l.oApi._fnPageChange(l, n.data.action)) {
                            k(l)
                        }
                    };
                    $(h).addClass("pagination").append('<ul><li class="prev disabled"><a href="#">&larr; ' + g.sPrevious + '</a></li><li class="next disabled"><a href="#">' + g.sNext + " &rarr; </a></li></ul>");
                    var j = $("a", h);
                    $(j[0]).bind("click.DT", {
                        action: "previous"
                    }, m);
                    $(j[1]).bind("click.DT", {
                        action: "next"
                    }, m)
                },
                fnUpdate: function(k, q) {
                    var r = 5;
                    var m = k.oInstance.fnPagingInfo();
                    var p = k.aanFeatures.p;
                    var o, n, l, g, s, h = Math.floor(r / 2);
                    if (m.iTotalPages < r) {
                        g = 1;
                        s = m.iTotalPages
                    } else {
                        if (m.iPage <= h) {
                            g = 1;
                            s = r
                        } else {
                            if (m.iPage >= (m.iTotalPages - h)) {
                                g = m.iTotalPages - r + 1;
                                s = m.iTotalPages
                            } else {
                                g = m.iPage - h + 1;
                                s = g + r - 1
                            }
                        }
                    }
                    for (o = 0, iLen = p.length; o < iLen; o++) {
                        $("li:gt(0)", p[o]).filter(":not(:last)").remove();
                        for (n = g; n <= s; n++) {
                            l = (n == m.iPage + 1) ? 'class="active"' : "";
                            $("<li " + l + '><a href="#">' + n + "</a></li>").insertBefore($("li:last", p[o])[0]).bind("click", function(j) {
                                j.preventDefault();
                                k._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * m.iLength;
                                q(k)
                            })
                        }
                        if (m.iPage === 0) {
                            $("li:first", p[o]).addClass("disabled")
                        } else {
                            $("li:first", p[o]).removeClass("disabled")
                        }
                        if (m.iPage === m.iTotalPages - 1 || m.iTotalPages === 0) {
                            $("li:last", p[o]).addClass("disabled")
                        } else {
                            $("li:last", p[o]).removeClass("disabled")
                        }
                    }
                }
            }
        });
        CLLD.DataTables[b] = $("#" + b).dataTable(e);
        $("#" + b + "_filter").hide();
        if (f) {
            $("." + b + "-toolbar").html(f)
        }
        $(document).on("click", "#" + b + " tbody td button.details", function() {
            var g = $(this).parents("tr")[0];
            if (CLLD.DataTables[b].fnIsOpen(g)) {
                CLLD.DataTables[b].fnClose(g)
            } else {
                $.get($(this).attr("href"), {}, function(j, k, h) {
                    CLLD.DataTables[b].fnOpen(g, j, "details")
                }, "html")
            }
        });
        $("#" + b + " thead input").keyup(function() {
            CLLD.DataTables[b].fnFilter(this.value, $("#" + b + " thead .control").index(this))
        });
        $("#" + b + " thead select").change(function() {
            CLLD.DataTables[b].fnFilter($(this).val(), $("#" + b + " thead .control").index(this))
        });
        var c = '<p>You may use the download button <i class="icon-download-alt"> </i> to download the currently selected items in various formats.</p>';
        c += "<p>Columns containing numeric data may be filtered giving upper or lower ";
        c += 'bounds in the form "&lt;5" or ranges in the form ';
        c += '"-2..20".</p>';
        if (e.sDescription) {
            c += e.sDescription
        }
        for (i = 0; i < e.aoColumns.length; i++) {
            d = e.aoColumns[i];
            if (d.sDescription) {
                c += "<dt>" + d.sTitle + "</dt><dd>" + d.sDescription + "</dd>"
            }
        }
        $("." + b + "-cdOpener").clickover({
            html: true,
            content: "<dl>" + c + "</dl>",
            title: "Column Descriptions",
            placement: "left",
            trigger: "click"
        });
        for (i = 0; i < e.aoColumns.length; i++) {
            d = e.aoColumns[i];
            if (d.sFilter) {
                CLLD.DataTables[b].fnFilter(d.sFilter, i)
            }
        }
    };
    return {
        init: a,
        current_url: function(c, b) {
            var d, g, e = {
                sEcho: 1
            }, f = CLLD.DataTables[c].fnSettings();
            e.iSortingCols = f.aaSorting.length;
            for (i = 0; i < f.aaSorting.length; i++) {
                e["iSortCol_" + i] = f.aaSorting[i][0];
                e["sSortDir_" + i] = f.aaSorting[i][1]
            }
            for (i = 0; i < f.aoPreSearchCols.length; i++) {
                if (f.aoPreSearchCols[i].sSearch) {
                    e["sSearch_" + i] = f.aoPreSearchCols[i].sSearch
                }
            }
            g = f.sAjaxSource.split("?", 2);
            g[0] = g[0].replace(".html", "");
            if (g.length == 1) {
                d = g[0] + "." + b + "?"
            } else {
                d = g[0] + "." + b + "?" + g[1] + "&"
            }
            return d + $.param(e)
        }
    }
})();
CLLD.Maps = {};
CLLD.LayerOptions = {};
CLLD.MapIcons = {
    base: function(c, b, a) {
        return L.icon({
            iconUrl: a == undefined ? c.properties.icon: a,
            iconSize: [b, b],
            iconAnchor: [Math.floor(b / 2), Math.floor(b / 2)],
            popupAnchor: [0, 0]
        })
    }
};
CLLD.Map = function(b, c, m) {
    CLLD.Maps[b] = this;
    this.options = m == undefined ? {} : m;
    this.options.info_query = this.options.info_query == undefined ? {} : this.options.info_query;
    this.options.info_route = this.options.info_route == undefined ? "language_alt" : this.options.info_route;
    this.map = L.map(b, {
        center: [5.5, 152.58],
        scrollWheelZoom: false,
        maxZoom: this.options.max_zoom == undefined ? 6: this.options.max_zoom,
        fullscreenControl: true,
        attributionControl: false
    });
    var e, d, j, a, h = false, l = ["Thunderforest.Landscape", "Thunderforest.Transport", "OpenStreetMap.Mapnik", "OpenStreetMap.BlackAndWhite", "MapQuestOpen.OSM", "MapQuestOpen.Aerial", "Stamen.Watercolor", "Esri.WorldStreetMap", "Esri.DeLorme", "Esri.WorldTopoMap", "Esri.WorldImagery", "Esri.WorldTerrain", "Esri.WorldShadedRelief", "Esri.WorldPhysical"];
    function f(o, n, q) {
        var p = CLLD.Maps[b];
        if (!p.popup) {
            p.popup = L.popup()
        }
        q = q == undefined ? o.getLatLng() : q;
        p.popup.setLatLng(q);
        p.popup.setContent(n);
        p.map.openPopup(p.popup)
    }
    this.showInfoWindow = function(n, p) {
        var o = CLLD.Maps[b];
        if (o.options.no_popup) {
            if (!o.options.no_link) {
                document.location.href = CLLD.route_url("language", {
                    id: n.feature.properties.language.id
                })
            }
            return 
        }
        if (o.marker_map.hasOwnProperty(n)) {
            n = o.marker_map[n]
        }
        if (n.feature.properties.popup) {
            f(n, n.feature.properties.popup, p)
        } else {
            $.get(CLLD.route_url(o.options.info_route, {
                id: n.feature.properties.language.id,
                ext: "snippet.html"
            }, $.extend({}, CLLD.query_params, o.options.info_query, n.feature.properties.info_query == undefined ? {} : n.feature.properties.info_query)), o.options.info_query, function(r, s, q) {
                f(n, r, p)
            }, "html")
        }
    };
    this.icon = CLLD.MapIcons[this.options.icons == undefined ? "base": this.options.icons];
    var g = function(p, o) {
        var n = 30, q = CLLD.Maps[b];
        if (p.properties.icon_size) {
            n = p.properties.icon_size
        } else {
            if (q.options.sidebar) {
                n = 20
            } else {
                if (q.options.icon_size) {
                    n = q.options.icon_size
                }
            }
        }
        o.setIcon(q.icon(p, n));
        if (p.properties.zindex) {
            o.setZIndexOffset(p.properties.zindex)
        }
        q.oms.addMarker(o);
        q.marker_map[p.properties.language.id] = o;
        o.bindLabel(p.properties.label == undefined ? p.properties.language.name : p.properties.label)
    };
    var k = function() {
        var q = CLLD.Maps[b];
        if (q.options.center) {
            return 
        }
        var o, n, p;
        for (name in q.layer_map) {
            if (q.layer_map.hasOwnProperty(name)) {
                n = q.layer_map[name].getBounds();
                if (n.isValid()) {
                    if (p) {
                        p.extend(n)
                    } else {
                        p = L.latLngBounds(n)
                    }
                }
            }
        }
        if (p) {
            if (q.options.zoom) {
                q.map.fitBounds(p, {
                    maxZoom: q.options.zoom
                })
            } else {
                q.map.fitBounds(p)
            }
        } else {
            q.map.fitWorld()
        }
    };
    this.oms = new OverlappingMarkerSpiderfier(this.map);
    this.oms.addListener("click", this.showInfoWindow);
    if (this.options.hash) {
        d = new L.Hash(this.map)
    }
    L.control.layers.provided(l, []).addTo(this.map);
    this.marker_map = {};
    this.layer_map = {};
    this.layer_geojson = {};
    this.eachMarker = function(n) {
        for (id in this.marker_map) {
            if (this.marker_map.hasOwnProperty(id)) {
                n(this.marker_map[id])
            }
        }
    };
    for (name in c) {
        if (c.hasOwnProperty(name)) {
            a = {
                onEachFeature: g
            };
            if (CLLD.LayerOptions[name]) {
                a = $.extend(a, CLLD.LayerOptions[name])
            }
            this.layer_map[name] = L.geoJson(undefined, a).addTo(this.map);
            this.layer_geojson[name] = c[name];
            if ($.type(c[name]) === "string") {
                $.getJSON(c[name], {
                    layer: name
                }, function(n) {
                    var o = CLLD.Maps[b];
                    o.layer_map[n.properties.layer].addData(n);
                    k();
                    if (o.options.show_labels) {
                        o.eachMarker(function(p) {
                            p.showLabel()
                        })
                    }
                })
            } else {
                h = true;
                this.layer_map[name].addData(c[name])
            }
        }
    }
    if (h) {
        k();
        if (this.options.show_labels) {
            this.eachMarker(function(n) {
                n.showLabel()
            })
        }
    }
    if (this.options.center) {
        this.map.setView(this.options.center, this.options.zoom == undefined ? 5 : this.options.zoom)
    }
    if (this.options.on_init) {
        this.options.on_init(this)
    }
};
CLLD.map = function(a, c, b) {
    return new CLLD.Map(a, c, b)
};
CLLD.mapToggleLabels = function(a, b) {
    var d = $(b).prop("checked"), c = CLLD.Maps[a];
    c.eachMarker(function(e) {
        if (d && e._icon.style.display != "none") {
            e.showLabel()
        } else {
            e.hideLabel()
        }
    })
};
CLLD.mapGetMap = function(a) {
    if (!a) {
        for (a in CLLD.Maps) {
            return CLLD.Maps[a]
        }
    } else {
        return CLLD.Maps[a]
    }
    return undefined
};
CLLD.mapShowInfoWindow = function(a, b, d) {
    var c = CLLD.mapGetMap(a);
    c.showInfoWindow(b, d)
};
CLLD.mapResizeIcons = function(a, b) {
    var c, d = CLLD.Maps[a];
    b = b === undefined ? $("input[name=iconsize]:checked").val() : b;
    d.eachMarker(function(e) {
        c = e._icon.style.display == "none";
        e.setIcon(d.icon(e.feature, parseInt(b)));
        if (c) {
            e._icon.style.display = "none"
        }
    })
};
CLLD.mapFilterMarkers = function(b, a) {
    var d = CLLD.Maps[b], c = $("#map-label-visiblity").prop("checked");
    d.eachMarker(function(e) {
        if (a(e)) {
            e._icon.style.display = "block";
            if (c) {
                e.showLabel()
            }
        } else {
            e._icon.style.display = "none";
            e.hideLabel()
        }
    })
};
CLLD.mapToggleLanguages = function(a) {
    CLLD.mapFilterMarkers(a, function(b) {
        var c = $("#marker-toggle-" + b.feature.properties.language.id);
        return c.length && c.prop("checked")
    })
};
CLLD.mapToggleLayer = function(a, b, c) {
    var d = CLLD.Maps[a];
    d.layer_map[b].eachLayer(function(e) {
        e._icon.style.display = $(c).prop("checked") ? "block" : "none"
    })
};
CLLD.mapShowGeojson = function(a, b) {
    var d = CLLD.Maps[a], c = d.layer_geojson[b];
    if ($.type(c) === "string") {
        $.getJSON(c, {
            layer: b
        }, function(e) {
            CLLD.Modal.show('<a href="' + c + '">' + e.properties.name + "</a>", null, "<pre>" + JSON.stringify(e, null, 2) + "</pre>")
        })
    } else {
        CLLD.Modal.show(c.properties.name, null, "<pre>" + JSON.stringify(c, null, 2) + "</pre>")
    }
    return false
};
CLLD.mapLegendFilter = function(b, f, j, c, h) {
    var d, g, a = $("#dt-filter-" + f), e = {};
    h = h === undefined ? "Values" : h;
    $("input." + j).each(function(k) {
        e[$(this).attr("value")] = $(this).prop("checked")
    });
    g = e["--any--"];
    CLLD.mapFilterMarkers(b, function(k) {
        return g || e[c(k.feature.properties)]
    });
    for (d in e) {
        if (e.hasOwnProperty(d) && e[d]) {
            if (d == "--any--") {
                d = ""
            }
            a.val(d);
            CLLD.DataTables[h].fnFilter(d, $("thead .control").index(a))
        }
    }
};
CLLD.process_gbs_info = function(a) {
    var d, c, b;
    for (b in a) {
        if (a.hasOwnProperty(b)) {
            d = $("#" + b.replace(":", "-"));
            c = a[b];
            if (c.preview == "full" || c.preview == "partial") {
                d.after('<div><a title="preview at Google Books" href="' + c.preview_url + '"><img src="https://www.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif"/></a></div>')
            } else {
                d.after('<div><a title="info at Google Books" href="' + c.info_url + '"><i class="icon-share"> </i> info at Google Books</a></div>')
            }
            if (c.thumbnail_url) {
                d.before('<div style="float: right;"><a title="info at Google Books" href="' + c.info_url + '"><img class="gbs-thumbnail" src="' + c.thumbnail_url + '"/></a></div>')
            }
            d.show()
        }
    }
};

