 /*! run 2017-10-30 */
!function() {
    var Run = {};
    Run = function() {
        var a = "Run", b = "v1.0", c = "run-wgt-", d = {Object: function() {
            }}, e = {Object: function() {
            }}, f = {}, g = 0;
        return {emptyFn: function() {
            },getClassName: function() {
                return a
            },getVersion: function() {
                return b
            },toString: function() {
                return "[Class " + this.getClassName() + "]"
            },create: function(a, b) {
                if ("function" == typeof a)
                    return new a(b);
                if ("string" == typeof a) {
                    if ("undefined" != typeof d[a]) {
                        var c = new d[a], g = new e[a];
                        for (var h in c)
                            "function" == typeof c[h] && (c[h] = c[h].bind(g));
                        return c.constructors(b), b.cache && (f[b.id] = c), c
                    }
                    throw new ReferenceError("className: " + a + " is undefined")
                }
                throw new ReferenceError("className: " + a + " the type is illegal")
            },define: function(a, b) {
                if (d[a])
                    throw new ReferenceError("The Class " + a + " is existed");
                b.className = a, b.superClass = b.extend;
                var c = function() {
                }, f = function() {
                }, g = b.extend, h = this.createContext(b);
                if ("undefined" == typeof d[g])
                    throw new ReferenceError(g + " is undefined");
                Run.extend(c, d[g], b), Run.extend(f, e[g], h), d[a] = c, e[a] = f
            },createContext: function(a) {
                var b = {}, c = a.privates;
                if (c) {
                    delete a.privates;
                    for (var d in c)
                        b[d] = c[d]
                }
                for (var e in a)
                    b[e] = a[e], ("function" != typeof a[e] || /^_+?/.test(e)) && delete a[e];
                return b
            },loadHtml: function(a, b, c) {
                Run.ajax({url: b,data: c,dataType: "text",success: function(b) {
                        a.append(b)
                    }})
            },nameSpace: function() {
                var b, c, d, e = arguments, f = null;
                for (b = 0; b < e.length; b += 1)
                    for (d = ("" + e[b]).split("."), f = Run, c = d[0] == a ? 1 : 0; c < d.length; c += 1)
                        f[d[c]] = f[d[c]] || {}, f = f[d[c]];
                return f
            },hasOwnProperty: Object.prototype.hasOwnProperty ? function(a, b) {
                return a && a.hasOwnProperty && a.hasOwnProperty(b)
            } : function(a, b) {
                return "undefined" != typeof a[b] && a.constructor.prototype[b] !== a[b]
            },extend: function(a, b, c) {
                var d = function() {
                };
                if (d.prototype = b.prototype, a.prototype = new d, a.prototype.constructor = a, c)
                    for (var e in c)
                        a.prototype[e] = c[e]
            },merge: function(a, b) {
                for (var c in b)
                    c in a && (a[c] = b[c]);
                return a
            },getAutoID: function() {
                return c + ++g
            },isArray: "isArray" in Array ? Array.isArray : function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            },callSuper: function(a, b, c) {
                var d, f, g = c || [];
                d = a.getSuperClass(), "Object" != d && (f = e[d].prototype, f[b] && f[b].apply(a, g))
            },callPrototype: function(a, b, c) {
                var d, e = [], f = c || [];
                this.getAllMethod(a.getClassName(), b, e), e = e.reverse(), d = e.length;
                for (var g = 0; d > g; g++)
                    e[g].apply(a, f)
            },getAllMethod: function(a, b, c) {
                var d;
                "Object" != a && (d = e[a].prototype, d.hasOwnProperty(b) && c.push(d[b]), this.getAllMethod(d.getSuperClass(), b, c))
            },uniqueArray: function(a) {
                for (var b, c = [], d = {}, e = 0; "undefined" != typeof (b = a[e]); e++)
                    d[b] || (c.push(b), d[b] = !0);
                return c
            },ajax: function(a) {
                var b = {async: !0,dataType: "json",type: "POST",timeout: 15e3,cache: !0,error: function(a, b, c) {
                        alert(c)
                    }};
                for (var c in a)
                    b[c] = a[c];
                $.ajax(b)
            },isDefined: function(a) {
                return "undefined" != typeof a
            },isEmpty: function(a, b) {
                return null === a || (b ? !1 : "" === a) || Run.isArray(a) && 0 === a.length
            },template: function(a, b) {
                return a.replace(/\{([\w\.]*)\}/g, function(a, c) {
                    for (var d = c.split("."), e = b[d.shift()], f = 0; f < d.length; f++)
                        e = e[d[f]];
                    return "undefined" != typeof e && null !== e ? e : ""
                })
            },noConflict: function() {
                return Run
            },get: function(a) {
                return f[a]
            }}
    }(), Function.prototype.bind || (Function.prototype.bind = function(a) {
        if ("function" != typeof this)
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1), c = this, d = function() {
        }, e = function() {
            return c.apply(this instanceof d ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        };
        return d.prototype = this.prototype, e.prototype = new d, e
    }), window.Run = window.R = Run, function(a) {
        a.DefaultSuperClass = "Class", a.define("Class", {extend: "Object",className: null,superClass: null,getClassName: function() {
                return this.className
            },toString: function() {
                return "[Class " + this.getClassName() + "]"
            },getSuperClass: function() {
                return this.superClass
            },getAttribute: function(a) {
                return "function" == typeof this[a] || /^_+?/.test(a) ? void 0 : this[a]
            }})
    }(Run), function(a) {
        a.DefaultWidgetSuperClass = "Widget", a.define("Widget", {extend: a.DefaultSuperClass,id: null,width: "auto",height: "auto",cls: null,style: null,baseCSSPrefix: "r-",cssPrefix: null,addEvents: function(b) {
                var c, d, e;
                if ("string" == typeof b)
                    for (e = 0, c = arguments; e < c.length; e++)
                        d = c[e], this.listeners[d] ? this.events[d] = this.listeners[d] : this.events[d] = a.emptyFn
            },fireEvent: function(a) {
                var b = this.events[a];
                b && b.apply(this, Array.prototype.slice.call(arguments, 1))
            },constructors: function(a) {
                this.initComponent(a), this.initialize()
            },initComponent: function(b) {
                a.callPrototype(this, "defineInstanceProperties"), a.merge(this, b), a.callPrototype(this, "initConfig")
            },defineInstanceProperties: function() {
                this.events = {}, this.listeners = {}
            },initConfig: function() {
                if (this.addEvents("render", "destroy"), null === this.id)
                    throw new ReferenceError("id is undefined");
                this.cssPrefix = this.baseCSSPrefix + this.className.toLowerCase() + "-"
            },initialize: function() {
                this.fireEvent("render")
            },destroy: function() {
                this.fireEvent("destroy")
            }})
    }(Run), function() {
        Run.DefaultCardsSuperClass = "Cards", Run.define("Cards", function() {
            return {extend: Run.DefaultWidgetSuperClass,query: {},param: {},isMultiple: !1,checkAllId: "",checkOneCls: "",dataSuccess: null,timeout: null,beforePage: Run.emptyFn,afterPage: Run.emptyFn,onCheck: Run.emptyFn,onUnCheck: Run.emptyFn,onCheckAll: Run.emptyFn,onUnCheckAll: Run.emptyFn,setCheck: function(a) {
                    if (Run.isArray(a)) {
                        var b = 0, c = null;
                        $("#" + this.checkAllId).prop("checked", !1);
                        for (var d = 0; d < a.length; d++)
                            c = $("#" + this.id).find("." + this.checkOneCls + ":[value='" + a[d] + "']"), 1 == c.length && (b++, c.prop("checked", !0)), b == this.data.data.length && $("#" + this.checkAllId).prop("checked", !0)
                    } else
                        alert("\u60a8\u8f93\u5165\u7684value\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u8f93\u5165\u6570\u7ec4\u7c7b\u578b")
                },url: null,data: null,usepage: null,totalPage: null,total: 0,cellEmpty: "-",timeout: null,pageSize: 10,currentPage: 1,callBacks: null,getChecked: function() {
                    var a = this, b = [], c = $("#" + this.id).find("input[type=checkbox]");
                    return c.each(function(c, d) {
                        $(d).prop("checked") && b.push(a.data.data[c])
                    }), b
                },getChkVal: function() {
                    var a = [];
                    return $("#" + this.id).find("input[type=checkbox]:checked").each(function(b, c) {
                        a.push($(c).val())
                    }), a
                },getChkVals: function() {
                    return this.chks
                },getTotal: function() {
                    return this.total
                },getData: function() {
                    return this.data
                },_checkFnc: function() {
                    var a = this;
                    $("#" + a.checkAllId).off("click").on("click", function(b) {
                        $(this).prop("checked") ? ($("#" + a.id).find("." + a.checkOneCls).prop("checked", !0), $.each(a.data.data, function(b, c) {
                            a.chks.push(c.id)
                        }), a.onCheckAll(a, a.data.data)) : ($("#" + a.id).find("." + a.checkOneCls).prop("checked", !1), a.chks = [], a.onUnCheckAll(a, a.data.data))
                    }), "" !== $.trim(a.checkOneCls) && $("#" + a.id).off("click", " ." + a.checkOneCls).on("click", " ." + a.checkOneCls, function(b) {
                        var c = $("#" + a.id + " ." + a.checkOneCls), d = $("#" + a.checkAllId), e = $(this), f = c.index(e), g = a.data.data[f];
                        e.prop("checked") ? (1 == d.length && c.length == c.filter(":checked").length && d.prop("checked", !0), a.chks.push(g.id), a.onCheck(a, g)) : (1 == d.length && d.prop("checked") && d.prop("checked", !1), a.chks.splice($.inArray(g.id, a.chks), 1), a.onUnCheck(a, g))
                    })
                },pageFnc: function() {
                    var a = this, b = "", c = "r-page-", d = $("#" + this.id).children(".r-page-content");
                    if (this.totalPage = Math.ceil(this.total / this.pageSize), b = '<div class="' + c + "container " + c + "align-" + this.usepage.align + '"><div class="' + c + 'pagebox">', this.usepage.pageSizeAble && (b += '<select class="' + c + 'pageSize"><option value="' + c + 'slt-10" ' + (10 == this.pageSize ? 'selected="selected"' : "") + '>10</option><option value="' + c + 'slt-20" ' + (20 == this.pageSize ? 'selected="selected"' : "") + '>20</option><option value="' + c + 'slt-30" ' + (30 == this.pageSize ? 'selected="selected"' : "") + ">30</option></select>"), b += '<a href="#" class="' + c + 'fisrtPage">\u9996\u9875</a><a href="#" class="' + c + 'prePage">\u4e0a\u4e00\u9875</a><a href="#" class="' + c + 'nextPage">\u4e0b\u4e00\u9875</a><a href="#" class="' + c + 'lastPage">\u672b\u9875</a>', a.usepage.pageDescription && (b += '<div class="' + c + 'pageDescription"><span>\u7b2c</span><span class="' + c + 'pageNum">' + this.currentPage + '</span><span class="' + c + 'indexPage">/' + this.totalPage + "\u9875</span></div>"), this.usepage.pageGoAble && (b += '<span>\u8df3\u8f6c\u81f3\u7b2c</span><input type="text" class="' + c + 'pageNum" value="' + this.currentPage + '" /><span>\u9875</span><a href="#" class="' + c + 'pageGo">\u8df3\u8f6c</a>'), b += "</div></div>", "bottom" == this.usepage.position)
                        d.after(b);
                    else {
                        if ("top" != this.usepage.position)
                            throw new ReferenceError("config " + this.usepage.vertical + " is undefined;");
                        d.before(b)
                    }
                    this._addUnable(), $("#" + this.id + " ." + c + "pageSize").change(function() {
                        if (0 !== a.total) {
                            a.currentPage = 1;
                            var b = $(this).val().split("-");
                            a.pageSize = parseInt(b[b.length - 1]), a.totalPage = Math.ceil(a.total / a.pageSize), a._reloadData({pageSize: a.pageSize}), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage), $("#" + a.id + " ." + c + "indexPage").html("/" + a.totalPage + "\u9875")
                        }
                    }), $("#" + this.id + " ." + c + "fisrtPage").click(function() {
                        return 0 !== a.total && (1 == a.currentPage || (a.currentPage = 1, a._addUnable(), a._reloadData(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage))), !1
                    }), $("#" + this.id + " ." + c + "lastPage").click(function() {
                        return 0 !== a.total ? (a.currentPage == a.totalPage || (a.currentPage = a.totalPage, a._addUnable(), a._reloadData(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1) : void 0
                    }), $("#" + this.id + " ." + c + "prePage").click(function() {
                        return 0 !== a.total && (1 == a.currentPage || (a.currentPage = a.currentPage - 1, a._addUnable(), a._reloadData(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage))), !1
                    }), $("#" + this.id + " ." + c + "nextPage").click(function() {
                        return 0 !== a.total ? (a.currentPage == a.totalPage || (a.currentPage = a.currentPage + 1, a._addUnable(), a._reloadData(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1) : void 0
                    }), $("#" + this.id + " ." + c + "pageGo").click(function() {
                        var b = $("#" + a.id + " input." + c + "pageNum").val();
                        return isNaN(b) ? alert("\u8bf7\u8f93\u5165\u6570\u5b57") : 0 >= b ? alert("\u8bf7\u8f93\u5165\u6b63\u6574\u6570") : b > a.totalPage ? alert("\u8f93\u5165\u9519\u8bef") : (a.currentPage = parseInt(b), a._addUnable(), a._reloadData(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1
                    })
                },pageWithNumFnc: function() {
                    var a = this, b = "", c = "r-page-", d = $("#" + this.id).children(".r-page-content");
                    if (this.totalPage = Math.ceil(this.total / this.pageSize), b = '<div class="' + c + "container " + c + "align-" + this.usepage.align + '"><div class="' + c + 'pagebox">', this.usepage.pageSizeAble && (b += '<select class="' + c + 'pageSize"><option value="' + c + 'slt-10" ' + (10 == this.pageSize ? 'selected="selected"' : "") + '>10</option><option value="' + c + 'slt-20" ' + (20 == this.pageSize ? 'selected="selected"' : "") + '>20</option><option value="' + c + 'slt-30" ' + (30 == this.pageSize ? 'selected="selected"' : "") + ">30</option></select>"), b += '<a href="#" class="' + c + 'prePage">\u4e0a\u4e00\u9875</a><div class="' + c + 'numbox">', b += '</div><a href="#" class="' + c + 'nextPage">\u4e0b\u4e00\u9875</a>', a.usepage.pageDescription && (b += '<div class="' + c + 'pageDescription"><span>\u7b2c</span><span class="' + c + 'pageNum">' + this.currentPage + '</span><span class="' + c + 'indexPage">/' + this.totalPage + "\u9875</span></div>"), a.usepage.pageGoAble && (b += '<span>\u8df3\u8f6c\u81f3\u7b2c</span><input type="text" class="' + c + 'pageNum" value="' + this.currentPage + '" /><span>\u9875</span><a href="#" class="' + c + 'pageGo">\u8df3\u8f6c</a>'), b += "</div></div>", "bottom" == this.usepage.position)
                        d.after(b);
                    else {
                        if ("top" != this.usepage.position)
                            throw new ReferenceError("config " + this.usepage.vertical + " is undefined;");
                        d.before(b)
                    }
                    this._createPageNum(), this._addUnable(), $("#" + this.id + " ." + c + "pageSize").change(function() {
                        if (0 !== a.total) {
                            a.currentPage = 1;
                            var b = $(this).val().split("-");
                            a.pageSize = parseInt(b[b.length - 1]), a.totalPage = Math.ceil(a.total / a.pageSize), a._reloadData({pageSize: a.pageSize}), a._refreshPagingToolbar(a.usepage.type), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage), $("#" + a.id + " ." + c + "indexPage").html("/" + a.totalPage + "\u9875")
                        }
                    }), $("#" + this.id + " ." + c + "firstPage").die("click").live("click", function() {
                        return 1 == a.currentPage || (a.currentPage = 1, a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1
                    }), $("#" + this.id + " ." + c + "lastPage").die("click").live("click", function() {
                        return a.currentPage == a.totalPage || (a.currentPage = a.totalPage, a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1
                    }), $("#" + this.id + " ." + c + "prePage").die("click").live("click", function() {
                        return 1 == a.currentPage || (a.currentPage = a.currentPage - 1, a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1
                    }), $("#" + this.id + " ." + c + "nextPage").die("click").live("click", function() {
                        return 0 !== a.total ? (a.currentPage == a.totalPage || (a.currentPage = a.currentPage + 1, a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1) : void 0
                    }), $("#" + this.id + " ." + c + "num:not('." + c + "firstPage,." + c + "lastPage')").die("click").live("click", function() {
                        return $(this).hasClass(c + "cur") ? !1 : (a.currentPage = parseInt($(this).html()), a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage), !1)
                    }), $("#" + this.id + " ." + c + "pageGo").click(function() {
                        var b = $("#" + a.id + " input." + c + "pageNum").val();
                        return isNaN(b) ? alert("\u8bf7\u8f93\u5165\u6570\u5b57") : 0 >= b ? alert("\u8bf7\u8f93\u5165\u6b63\u6574\u6570") : b > a.totalPage ? alert("\u8f93\u5165\u9519\u8bef") : (a.currentPage = parseInt(b), a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " input." + c + "pageNum").val(a.currentPage), $("#" + a.id + " span." + c + "pageNum").html(a.currentPage)), !1
                    })
                },reloadCards: function(a, b) {
                    1 == arguments.length ? "string" == typeof arguments[0] ? this.url = arguments[0] : "object" == typeof arguments[0] && (this.param = arguments[0]) : arguments.length > 1 && ("string" == typeof arguments[0] ? this.url = arguments[0] : "object" == typeof arguments[0] && (this.param = arguments[0]), "string" == typeof arguments[1] ? this.url = arguments[1] : "object" == typeof arguments[1] && (this.param = arguments[1])), this.param.pageSize = this.pageSize, this.param.currentPage ? this.currentPage = this.param.currentPage : (this.param.currentPage = 1, this.currentPage = 1), this._createLoading(), Run.ajax({url: this.url,data: this.param,timeout: this.timeout,success: function(a) {
                            this.data = a, this.reloadOperation(), this._deleteLoading(), this.dataSuccess && this.dataSuccess(a)
                        }.bind(this),error: function(a, b, c) {
                            this._deleteLoading(), "timeout" == b && (this._timeoutFnc(), this.usepage && this._refreshPagingToolbar(this.usepage.type))
                        }.bind(this)})
                },operation: function() {
                    var a = this;
                    this.data = this.data, this.total = a.data.total, $("#" + this.id).empty().append('<div class="r-page-content clearfix"></div>'), 0 == this.total ? (this.currentPage = 0, this._createNoData()) : this._createDom(), null !== this.usepage && (1 == this.usepage.type ? this.pageFnc() : (!this.usepage.type && (this.usepage.type = 2), !this.usepage.position && (this.usepage.position = "bottom"), !this.usepage.align && (this.usepage.align = "center"), !this.usepage.pageGoAble && (this.usepage.pageGoAble = !1), !this.usepage.pageSizeAble && (this.usepage.pageGoAble = !1), this.pageWithNumFnc())), this.isMultiple && this._checkFnc(), this._bindCallBacks(), this.fireEvent("render")
                },constructors: function(a) {
                    this.initComponent(a), this.addEvents("reload"), this.initialize(a)
                },defineInstanceProperties: function() {
                    this.chks = []
                },initialize: function(a) {
                    this.param = this.query, this.param.pageSize = this.pageSize, this.param.currentPage = 1, null != this.data ? this.operation() : null != this.url && (this._createLoading("isInitialize"), Run.ajax({url: this.url,data: this.param,timeout: this.timeout,success: function(a) {
                            this.data = a, this.operation(), this._deleteLoading(), this.dataSuccess && this.dataSuccess(a)
                        }.bind(this),error: function(a, b, c) {
                            this._deleteLoading(), "timeout" == b && (this._timeoutFnc(), this.usepage && this._refreshPagingToolbar(this.usepage.type))
                        }.bind(this)}))
                },privates: {_createCard: function(a) {
                        return _html
                    },_createDom: function() {
                        var a = this.data, b = "", c = this;
                        $.each(a.data, function(a, d) {
                            b += c._createCard(d, a)
                        });
                        var d = $("#" + c.id).children(".r-page-content");
                        d.empty(), d.append(b)
                    },_bindCallBacks: function() {
                    },_createPageNum: function() {
                        var a = "r-page-";
                        $("#" + this.id + " ." + a + "numbox").html("");
                        var b = "";
                        if (this.totalPage <= 5) {
                            for (var c = 1; c <= this.totalPage; c++)
                                b += c == this.currentPage ? '<a href="#" class="' + a + "cur " + a + 'num">' + c + "</a>" : '<a href="#" class="' + a + 'num">' + c + "</a>";
                            $("#" + this.id + " ." + a + "numbox").append(b)
                        } else {
                            var d = '<a href="#" class="' + a + "cur " + a + 'num">' + this.currentPage + "</a>", e = '<a href="#" class="' + a + "cur " + a + "num " + a + 'firstPage">' + this.currentPage + "</a>", f = '<a href="#" class="' + a + "cur " + a + "num " + a + 'lastPage">' + this.currentPage + "</a>", g = '<a href="#" class="' + a + "firstPage " + a + 'num">1</a>', h = '<a href="#" class="' + a + "lastPage " + a + 'num">' + this.totalPage + "</a>", i = '<a href="#" class="' + a + 'num">' + (this.currentPage - 1) + "</a>", j = '<a href="#" class="' + a + 'num">' + (this.currentPage + 1) + "</a>", k = '<span class="' + a + 'point">...</span>', l = 1;
                            this.totalPage;
                            b += this.currentPage - l == 0 ? e + '<a href="#" class="' + a + 'num">' + (this.currentPage + 1) + '</a><a href="#" class="' + a + 'num">' + (this.currentPage + 2) + '</a><a href="#" class="' + a + 'num">' + (this.currentPage + 3) + "</a>" + k + h : this.currentPage - l == 1 ? g + d + '<a href="#" class="' + a + 'num">' + (this.currentPage + 1) + '</a><a href="#" class="' + a + 'num">' + (this.currentPage + 2) + "</a>" + k + h : this.currentPage - l == 2 ? g + i + d + j + k + h : 0 == Math.abs(this.currentPage - this.totalPage) ? g + k + '<a href="#" class="' + a + 'num">' + (this.currentPage - 3) + '</a><a href="#" class="' + a + 'num">' + (this.currentPage - 2) + '</a><a href="#" class="' + a + 'num">' + (this.currentPage - 1) + "</a>" + f : 1 == Math.abs(this.currentPage - this.totalPage) ? g + k + '<a href="#" class="' + a + 'num">' + (this.currentPage - 2) + '</a><a href="#" class="' + a + 'num">' + (this.currentPage - 1) + "</a>" + d + h : 2 == Math.abs(this.currentPage - this.totalPage) ? g + k + i + d + j + h : g + k + i + d + j + k + h, $("#" + this.id + " ." + a + "numbox").append(b), 1 == this.currentPage && this.currentPage !== this.totalPage ? ($("#" + this.id + " ." + a + "nextPage").removeClass("unable"), $("#" + this.id + " ." + a + "prePage").addClass("unable")) : this.currentPage == this.totalPage && 1 !== this.currentPage ? ($("#" + this.id + " ." + a + "prePage").removeClass("unable"), $("#" + this.id + " ." + a + "nextPage").addClass("unable")) : 1 !== this.currentPage && this.currentPage != this.totalPage && ($("#" + this.id + " ." + a + "nextPage").removeClass("unable"), $("#" + this.id + " ." + a + "prePage").removeClass("unable"))
                        }
                    },_reloadData: function(a) {
                        if (this.param.currentPage = this.currentPage, a) {
                            for (var b in a)
                                this.param[b] = a[b];
                            this.param.currentPage = 1
                        }
                        this._createLoading(), this.beforePage(this), Run.ajax({url: this.url,data: this.param,timeout: this.timeout,success: function(a) {
                                this._deleteLoading(), $("#" + this.checkAllId).prop("checked") && $("#" + this.checkAllId).prop("checked", !1), this.data = a, this._reloadCallBack(a), this.afterPage(this), this.dataSuccess && this.dataSuccess(a)
                            }.bind(this),error: function(a, b, c) {
                                this._deleteLoading(), "timeout" == b && (this._timeoutFnc(), this.usepage && this._refreshPagingToolbar(this.usepage.type))
                            }.bind(this)})
                    },reloadOperation: function() {
                        this.total = this.data.total, this._addUnable(), 0 == this.total ? (this.currentPage = 0, this._createNoData()) : this._reloadCallBack(), this._refreshPagingToolbar(this.usepage.type), this.fireEvent("reload")
                    },_reloadCallBack: function(a) {
                        this._createDom(), this.isMultiple && this._checkFnc()
                    },_refreshPagingToolbar: function(a) {
                        var b = "r-page-";
                        this.totalPage = Math.ceil(this.total / this.pageSize), 1 == a ? (this._addUnable(), $("#" + this.id + " input." + b + "pageNum").val(this.currentPage), $("#" + this.id + " span." + b + "pageNum").html(this.currentPage), $("#" + this.id + " ." + b + "indexPage").html("/" + this.totalPage + "\u9875")) : 2 == a && (this._createPageNum(), $("#" + this.id + " input." + b + "pageNum").val(this.currentPage), $("#" + this.id + " span." + b + "pageNum").html(this.currentPage), $("#" + this.id + " ." + b + "indexPage").html("/" + this.totalPage + "\u9875"))
                    },_addUnable: function() {
                        var a = "r-page-";
                        0 !== this.total ? 1 == this.currentPage && this.currentPage !== this.totalPage ? ($("#" + this.getAttribute("id") + " ." + a + "nextPage").removeClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "prePage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "fisrtPage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "lastPage").removeClass("unable")) : 1 == this.currentPage && this.currentPage == this.totalPage ? ($("#" + this.getAttribute("id") + " ." + a + "prePage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "nextPage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "fisrtPage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "lastPage").addClass("unable")) : 1 !== this.currentPage && this.currentPage == this.totalPage ? ($("#" + this.getAttribute("id") + " ." + a + "prePage").removeClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "nextPage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "fisrtPage").removeClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "lastPage").addClass("unable")) : 1 !== this.currentPage && this.currentPage !== this.totalPage && ($("#" + this.getAttribute("id") + " ." + a + "nextPage").removeClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "prePage").removeClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "fisrtPage").removeClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "lastPage").removeClass("unable")) : ($("#" + this.getAttribute("id") + " ." + a + "nextPage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "prePage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "fisrtPage").addClass("unable"), $("#" + this.getAttribute("id") + " ." + a + "lastPage").addClass("unable"))
                    },_createLoading: function(a) {
                        $("#" + this.id).find(".r-page-content").empty(), $("#" + this.id).addClass("r-loading-height");
                        var b = '<div class="r-loading"><span></span></div>';
                        $("#" + this.id).css({position: "static"}).append(b)
                    },_deleteLoading: function() {
                        var a = this;
                        $("#" + a.id).removeClass("r-loading-height").css({position: "static"}).find(".r-loading").remove()
                    },_createNoData: function() {
                        var a = '<div class="r-no-data"><span>\u6682\u65e0\u6570\u636e</span></div>';
                        $("#" + this.id).children(".r-page-content").empty().append(a)
                    },_deleteNoData: function() {
                        $("#" + this.id).find(".r-no-data").remove()
                    },_timeoutFnc: function() {
                        var a = '<div class="r-no-data">\u52a0\u8f7d\u8d85\u65f6\u4e86\u3002<a href="#" id="' + this.id + '_reload">\u91cd\u65b0\u52a0\u8f7d</a></div>', b = $("#" + this.id).children(".r-page-content");
                        b.length > 0 ? b.empty().append(a) : $("#" + this.id).prepend('<div class="r-page-content clearfix">' + a + "</div>"), $("#" + this.id + "_reload").click(function() {
                            this.reloadCards()
                        }.bind(this))
                    }}}
        }())
    }(), function() {
        Run.define("CardDetailGis", function() {
            return {extend: Run.DefaultCardsSuperClass,privates: {_createCard: function(a) {
                        var b = "", c = "", d = "", e = "", f = "";
                        a.time && "" != $.trim(a.time) && (b = '<p class="pe2"><span class="tit">\u65f6\u95f4\uff1a</span><span class="txt">' + a.time + "</span></p>"), a.site && "" != $.trim(a.site) && (c = '<p class="pe2 high"><span class="tit">\u5730\u5740\uff1a</span><span class="txt">' + a.site + "</span></p>"), a.source && "" != $.trim(a.source) && (d = '<p class="pe5"><span class="tit">\u6570\u636e\u6765\u6e90\uff1a</span><span class="txt">' + a.source + "</span></p>"), a.ob && "" != $.trim(a.ob) && (f = '<p class="pe2"><span class="tit">\u5bf9\u8c61\uff1a</span><span class="txt">' + a.ob + "</span></p>"), a.collect && "" != $.trim(a.collect) && (e = '<p class="pe3"><span class="tit">\u91c7\u96c6\u70b9\uff1a</span><span class="txt">' + a.collect + "</span></p>");
                        var g = '<a class="cardDetailGis"><em class="order">' + a.order + "</em>" + b + c + e + d + f + "</a>";
                        return g
                    },_bindCallBacks: function() {
                        var a = this, b = "cardDetailGis", c = $("#" + this.id);
                        c.off("click", "." + b).on("click", "." + b, function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d);
                            a.callBacks.handle.apply(d, [c, a.data.data[e]])
                        })
                    }}}
        }())
    }(), function() {
        Run.define("CardLog", function() {
            return {extend: Run.DefaultCardsSuperClass,defaultProt: "",privates: {_createCard: function(a) {
                        var b = "", c = "", d = this.defaultProt, e = "", f = "", g = "", h = !1;
                        switch ($.each(a.infos, function(a, d) {
                            var e = d.val, f = d.objectType ? d.objectType : "";
                            b = d.theme ? d.theme : "", "" != b && (e = d.keyword ? e.replace(d.keyword, '<em class="' + b + '" objectType="' + f + '">' + d.keyword + "</em>") : '<em class="' + b + '" objectType="' + f + '">' + e + "</em>"), c += d.axis ? '<li class="left" title="' + d.val + '"><div class="opMapWrap"><span><span class="labTxt">\u3010' + d.lab + "\u3011</span>" + e + '<a href="javascript:;" class="opMap j_map" data-axis ="' + d.axis + '"></a></span></div></li>' : '<li class="left" title="' + d.val + '"><div class="liIn"><span class="labTxt">\u3010' + d.lab + "\u3011</span>" + e + "</div></li>", a > 5 && (h = !0)
                        }), a.read && (g = '<em class="iRead"></em>'), a.collect && (f = "yes"), a.icon && (d = a.icon), a.keyType) {
                            case "URL":
                                e = "color1";
                                break;
                            case "\u5168\u6587":
                                e = "color2";
                                break;
                            case "\u7ed3\u6784\u5316":
                                e = "color3";
                                break;
                            default:
                                e = "color0"
                        }
                        var i = '<dl class="cardLog animateCard"><dt class="clearfix"><input type="checkbox" class="cardLog_chk left" value="' + a.id + '" /><ul class="left"><li class="cardLog_pt left"><img class="left" src="' + d + '" />' + a.val + '</li><li class="left">' + a.time + '</li><li class="left">' + a.net + "</li></ul>" + (a.baseStation ? '<span class="station left">' + a.baseStation.lab + "\uff1a" + a.baseStation.val + "</span>" : "") + (a.baseStation ? '<a href="javascript:;" class="stationIcon left j_map" data-axis="' + a.baseStation.axis + '"></a>' : "") + '<span class="keyType ' + e + ' left">' + a.keyType + '</span><div class="opWrap right"><a href="javascript:;" class="opDetail left animateColorBtn">\u8be6\u60c5</a><a href="javascript:;" class="opCollect ' + f + ' left animateColorBtn">\u6536\u85cf</a>' + (h ? '<a href="javascript:;" class="opMore left animateColorBtn">\u5c55\u5f00</a>' : "") + "</div></dt><dd>" + g + '<div class="inner"><ul class="clearfix">' + c + "</ul></div></dd></dl>";
                        return i
                    },_bindCallBacks: function() {
                        var a = this, b = "cardLog", c = $("#" + this.id);
                        $(window).on("resize", function() {
                            var a = c.find("." + b + " .opMapWrap");
                            a.each(function(a, b) {
                                $(b).closest("li").width() < $(b).children("span").width() ? $(b).addClass("ddd") : $(b).removeClass("ddd")
                            })
                        }), c.off("click", "." + b + " .opDetail").on("click", "." + b + " .opDetail", function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d);
                            a.callBacks.handleDetail.apply(d, [c, a.data.data[e]])
                        }), c.off("click", "." + b + " .opCollect").on("click", "." + b + " .opCollect", function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d);
                            a.callBacks.handleCollect.apply(d, [c, a.data.data[e]])
                        }), c.off("click", "." + b + " .j_map").on("click", "." + b + " .j_map", function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d), f = $(this).closest("li").index();
                            a.callBacks.handleMap.apply(d, [c, a.data.data[e], a.data.data[e].infos[f]])
                        }), c.off("click", "." + b + " .opMore").on("click", "." + b + " .opMore", function(a) {
                            var c = $(this).closest("." + b), d = c.find(".inner");
                            $(this).hasClass("tog") ? ($(this).removeClass("tog").html("\u5c55\u5f00"), d.animate({height: "44px"}, "fast")) : ($(this).addClass("tog").html("\u6536\u8d77"), d.animate({height: d.find("ul").height()}, "fast"))
                        })
                    }}}
        }())
    }(), function() {
        Run.define("CardOb", function() {
            return {extend: Run.DefaultCardsSuperClass,privates: {_createItem: function(a) {
                        var b = a.theme ? a.theme : "", c = a.val;
                        return "keyword" == b && (b = "", c = c.replace(a.keyword, '<em class="' + a.theme + '">' + a.keyword + "</em>")), '<li class="item left"><span class="labTxt left">\u3010' + a.lab + '\u3011</span><span class="' + b + ' left labTxtVal" title="' + a.val + '">' + c + "</span>" + (a.axis ? '<a href="javascript:;" class="opMap left" data-axis ="' + a.axis + '"></a>' : "") + "</li>"
                    },_createInfoList: function(a) {
                        var b = this, c = "", d = "";
                        return $.each(a.list, function(a, c) {
                            if ("array" == $.type(c.val)) {
                                var e = "", f = "";
                                $.each(c.val, function(a, b) {
                                    if (3 > a) {
                                        var c = "", d = b.item;
                                        b.theme && (c = b.theme, d = b.keyword ? d.replace(b.keyword, '<em class="' + b.theme + '">' + b.keyword + "</em>") : '<em class="' + b.theme + '">' + d + "</em>"), 0 !== a && (e += '<em class="left">\u3001</em>'), e += '<span class="valItem left"><em class="left">' + d + "</em></span>"
                                    } else if (3 !== a && (f += '<em class="left">\u3001</em>'), f += '<span class="valItem left">' + b.item + "</span>", a >= 13)
                                        return f += '<em class="left">.....</em>', !1
                                }), c.tot > 3 && (e += '<em class="left">.....</em>', e += '<dl class="opMore left"><dt>\u66f4\u591a </dt><dd class="moreTip posR"><div class="inner clearfix">' + f + "</div></dd></dl>"), d += '<li class="item left"><span class="labTxt left">\u3010' + c.lab + '\u3011</span><div class="valItemWrap left">' + e + "</div></li>"
                            } else
                                d += b._createItem(c)
                        }), "" != d && (c = '<div class="infos"><span class="infos_tit">' + a.tit + '\uff1a</span><ul class="clearfix">' + d + "</ul></div>"), c
                    },_createCard: function(a, b) {
                        var c = this, d = "", e = "", f = 0, g = "", h = "", i = a.val;
                        a.read && (h = '<em class="iRead"></em>'), a.collect && (g = "yes"), a.valKeyword && (i = i.replace(a.valKeyword, '<em class="keyword">' + a.valKeyword + "</em>")), $.each(a.minfos, function(a, b) {
                            d += c._createItem(b)
                        }), $.each(a.infos, function(a, b) {
                            return f++, e += c._createInfoList(b), 1 == a ? !1 : void 0
                        });
                        var j = '<dl class="cardOb ' + a.type + " animateCard ord" + (b % 11 + 1) + '"><dt class="clearfix"><input type="checkbox" class="cardOb_chk left" value="' + a.id + '" /><em class="cardOb_icon left"></em><div class="pWrap"><p title="' + a.lab + '">' + a.lab + ':</p><p title="' + a.val + '">' + i + '</p></div></dt><dd><div class="hd"><ul class="clearfix ' + (a.lastTime ? "pl" : "") + '">' + d + '</ul><div class="opWrap clearfix"><span class="lastTime left" title="\u6700\u8fd1\u51fa\u73b0\u65f6\u95f4">' + (a.lastTime ? a.lastTime : "") + '</span><a href="javascript:;" class="opDetail left animateColorBtn">\u8be6\u60c5</a><a href="javascript:;" class="opCollect ' + g + ' left animateColorBtn">\u6536\u85cf</a></div></div><div class="bd ' + (f >= 2 ? "twoType" : "") + '">' + e + "</div>" + h + "</dd></dl>";
                        return j
                    },_bindCallBacks: function() {
                        var a = this, b = "cardOb", c = $("#" + this.id);
                        c.off("click", "." + b + " .opDetail").on("click", "." + b + " .opDetail", function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d);
                            a.callBacks.handleDetail.apply(d, [c, a.data.data[e]])
                        }), c.off("click", "." + b + " .opCollect").on("click", "." + b + " .opCollect", function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d);
                            a.callBacks.handleCollect.apply(d, [c, a.data.data[e]])
                        }), c.off("click", "." + b + " .opMap").on("click", "." + b + " .opMap", function(c) {
                            var d = $(this).closest("." + b), e = $("#" + a.id).find("." + b).index(d), f = $(this).closest("li").index();
                            a.callBacks.handleMap.apply(d, [c, a.data.data[e], a.data.data[e].infos[f]])
                        }), c.off("mouseover", "." + b + " .opMore").on("mouseover", "." + b + " .opMore", function(b) {
                            var c = $(this), d = (c.width(), c.height(), c.offset()), e = d.left, f = (d.top, $("#" + a.id)), g = f.width(), h = f.offset(), i = h.left, j = (h.top, 342), k = e - i, l = "posR";
                            k + j > g && (l = "posL", k -= j), c.find(".moreTip").addClass(l)
                        })
                    }}}
        }())
    }(), function(a) {
        a.define("ComboBox", function() {
            return {extend: a.DefaultWidgetSuperClass,editable: !0,listHeight: 150,isMultiple: !1,placeholder: "\u8bf7\u9009\u62e9",width: 240,url: null,data: null,timeout: null,resultField: "result",displayField: "chkDisplay",valueField: "chkVal",hiddenField: null,hiddenEl: null,onSelect: a.emptyFn,clearAble: !1,autoLoad: !0,siftAble: !1,dataSuccess: null,resetVal: function() {
                    if (this.isMultiple)
                        0 == this.valArrayDf.length ? (this.textArray = [], this.valArray = [], $("#" + this.id + " dl").find("input[type=checkbox]").prop("checked", !1), $("#" + this.id + " dd").removeClass(this.cssPrefix + "slt"), $("#" + this.id + " .r-combobox-input").val(""), $("#" + this.id + " input[type='hidden']").val(""), $("#" + this.id + " ." + this.cssPrefix + "box").addClass(this.cssPrefix + "clear-box")) : this.setValue(this.valArrayDf);
                    else if (0 == this.valArrayDf.length)
                        this.textArray = [], this.valArray = [], $("#" + this.id + " dd").removeClass(this.cssPrefix + "slt"), $("#" + this.id + " .r-combobox-input").val(""), $("#" + this.id + " input[type='hidden']").val(""), $("#" + this.id + " ." + this.cssPrefix + "box").addClass(this.cssPrefix + "clear-box");
                    else {
                        var a = this.valArrayDf[0];
                        this.setValue(a)
                    }
                },setData: function(a) {
                    this.textArray = [], this.valArray = [], this.data = a, 
                    $("#" + this.id + " ." + this.cssPrefix + "box").removeClass(this.cssPrefix + "clear-box"), $("#" + this.id + " dl dd").remove(), $("#" + this.id + " dl dt").remove(), $("#" + this.id + " dl").append(this._createList(this, a[this.resultField])), $("#" + this.id + " ." + this.cssPrefix + "input").val(this.textArray.join(",")), 0 == this.textArray.length && "" != $.trim(this.placeholder) && $("#" + this.id).find("." + this.cssPrefix + "input").placeholder(), this.isMultiple ? (this.checkboxAll(), this.checkboxOne()) : this.radioChoose(), this.siftAble && this._siftFnc()
                },choose: function() {
                },unChoose: function() {
                },bindEvent: function() {
                    this.showList(this.id, this.cssPrefix), this.hideList(this.cssPrefix), this.ddHover(this.cssPrefix), this.siftAble && this._siftFnc()
                },showList: function(b, c) {
                    var d = this;
                    $("#" + b + " ." + c + "input").die("click").live("click", function() {
                        var b = $(this).closest(".r-combobox-box").find(".r-combobox-slider-box");
                        d.autoLoad ? (0 == b.find("dd").size() && 0 == b.find("dt").size() && d._createLoading(), b.is(":visible") ? d._hideSelect(this) : d._showSelect(this), d.fireEvent("render")) : 0 == b.find("dd").size() && 0 == b.find("dt").size() ? (d._createLoading(), d._showSelect(this), a.ajax({timeout: d.timeout,url: d.url,success: function(a) {
                                d.data = a;
                                var b = d.data[d.resultField], c = d._createList(d, b), e = "";
                                e += c, $("#" + d.id + " .r-combobox-slider").append(e), d.isMultiple ? (d.checkboxAll(), d.checkboxOne()) : d.radioChoose(), d._deleteLoading(), d.dataSuccess && d.dataSuccess(a), d.fireEvent("render")
                            }.bind(this),error: function(a, b, c) {
                                d._deleteLoading(), "timeout" == b ? this._messageFnc() : this._messageFnc("severError")
                            }.bind(d)})) : b.is(":visible") ? d._hideSelect(this) : d._showSelect(this)
                    }), $("#" + b + " ." + c + "handle").die("click").live("click", function() {
                        var b = $(this).closest(".r-combobox-box").find(".r-combobox-slider-box");
                        return d.autoLoad ? (0 == b.find("dd").size() && 0 == b.find("dt").size() && d._createLoading(), b.is(":visible") ? d._hideSelect(this) : d._showSelect(this), d.fireEvent("render")) : 0 == b.find("dd").size() && 0 == b.find("dt").size() ? (d._createLoading(), d._showSelect(this), a.ajax({timeout: d.timeout,url: d.url,success: function(a) {
                                d.data = a;
                                var b = d.data[d.resultField], c = d._createList(d, b), e = "";
                                e += c, $("#" + d.id + " .r-combobox-slider").append(e), d.isMultiple ? (d.checkboxAll(), d.checkboxOne()) : d.radioChoose(), d._deleteLoading(), d.dataSuccess && d.dataSuccess(a), d.fireEvent("render")
                            }.bind(this),error: function(a, b, c) {
                                d._deleteLoading(), "timeout" == b ? this._messageFnc() : this._messageFnc("severError")
                            }.bind(d)})) : b.is(":visible") ? d._hideSelect(this) : d._showSelect(this), !1
                    })
                },hideList: function(a) {
                    $(document).on("click", function(b) {
                        var c = $(b.target);
                        0 == c.closest("." + a + "box").size() && ($("." + a + "slider-box").hide(), $("." + a + "box").removeClass(a + "now"), $("." + a + "handle").removeClass(a + "handle-up"))
                    })
                },ddHover: function(a) {
                    $("." + a + "slider dd").on("mouseover", function() {
                        $(this).addClass(a + "hover")
                    }), $("." + a + "slider dd").on("mouseout", function() {
                        $(this).removeClass(a + "hover")
                    })
                },checkboxAll: function() {
                    var a = this;
                    $("#" + this.id + " ." + this.cssPrefix + "chkAll").die("click").click("click", function() {
                        var b = $(this).closest("." + a.cssPrefix + "slider").find("dd"), c = $(this).closest("." + a.cssPrefix + "slider").find("." + a.cssPrefix + "chk"), d = c.size(), e = $(this).closest("." + a.cssPrefix + "box").find("." + a.cssPrefix + "input");
                        if (this.checked) {
                            0 !== a.textArray.length && (a.textArray = [], a.valArray = []);
                            for (var f = 0; d > f; f++)
                                b.eq(f).hasClass(a.cssPrefix + "hidden") || (c.get(f).checked = !0, 0 != f && (a.textArray.push(c.eq(f).next("span").html()), a.valArray.push(c.eq(f).attr("value"))));
                            e.val(a.textArray), $(this).closest("dd").addClass(a.cssPrefix + "slt").siblings("dd:not('." + a.cssPrefix + "hidden')").addClass(a.cssPrefix + "slt"), $(this).closest("." + a.cssPrefix + "box").addClass(a.cssPrefix + "clear-box"), a.choose.apply(a, [a, {text: a.textArray,value: a.valArray}])
                        } else {
                            for (var f = 0; d > f; f++)
                                c.get(f).checked = !1;
                            0 !== a.textArray.length && (a.textArray = [], a.valArray = []), e.val(""), $(this).closest("dd").removeClass(a.cssPrefix + "slt").siblings().removeClass(a.cssPrefix + "slt"), $(this).closest("." + a.cssPrefix + "box").removeClass(a.cssPrefix + "clear-box"), a.unChoose.apply(a, [a, {text: a.textArray,value: a.valArray}])
                        }
                        a.hiddenEl.val(a.valArray)
                    }), this.hiddenEl.val(a.valArray)
                },checkboxOne: function() {
                    for (var a = this, b = $("#" + this.id + " ." + this.cssPrefix + "slider ." + this.cssPrefix + "chk"), c = b.length, d = 0; c > d; d++)
                        0 != d && b.eq(d).click(function() {
                            var c = $("#" + a.id + " ." + a.cssPrefix + "slider dd:not('." + a.cssPrefix + "hidden')");
                            1 == this.checked ? (a.textArray.push($(this).next("span").html()), a.valArray.push($(this).attr("value")), $(this).closest("." + a.cssPrefix + "box").find("." + a.cssPrefix + "input").val(a.textArray), $(this).closest("dd").addClass(a.cssPrefix + "slt"), b.filter(":checked").length == c.size() - 1 && b.eq(0).prop("checked", !0).closest("dd").addClass(a.cssPrefix + "slt"), a.choose.apply(a, [a, {text: a.textArray,value: a.valArray}])) : (a.textArray.splice($.inArray($(this).next("span").html(), a.textArray), 1), a.valArray.splice($.inArray($(this).attr("value"), a.valArray), 1), $(this).closest("." + a.cssPrefix + "box").find("." + a.cssPrefix + "input").val(a.textArray), $(this).closest("dd").removeClass(a.cssPrefix + "slt"), b.filter(":checked").length == c.size() - 1 && b.eq(0).prop("checked", !1).closest("dd").removeClass(a.cssPrefix + "slt"), a.unChoose.apply(a, [a, {text: a.textArray,value: a.valArray}])), 0 != a.textArray.length ? $(this).closest("." + a.cssPrefix + "box").addClass(a.cssPrefix + "clear-box") : $(this).closest("." + a.cssPrefix + "box").removeClass(a.cssPrefix + "clear-box"), a.hiddenEl.val(a.valArray)
                        })
                },radioChoose: function() {
                    var a = this;
                    $("#" + this.id + " ." + this.cssPrefix + "slider").find("dd").on("click", function() {
                        a.textArray = [], a.valArray = [], $(this).siblings().removeClass(a.cssPrefix + "slt"), $(this).addClass(a.cssPrefix + "slt"), $(this).closest("." + a.cssPrefix + "box").find("." + a.cssPrefix + "input").val($(this).find("span").html()), a.textArray.push($(this).find("span").html()), a.valArray.push($(this).find("span").attr("value")), a.hiddenEl.val(a.valArray), $(this).closest("." + a.cssPrefix + "box").addClass(a.cssPrefix + "clear-box"), $("." + a.cssPrefix + "slider-box").hide(), $("#" + a.id + " ." + a.cssPrefix + "handle").removeClass(a.cssPrefix + "handle-up"), a.onSelect.apply(a, [a, {text: a.textArray,value: a.valArray}])
                    })
                },writeItSelf: function() {
                    0 == this.editable && $("#" + this.id).find("." + this.cssPrefix + "input").keydown(function() {
                        return !1
                    })
                },getText: function() {
                    return this.textArray
                },getValue: function() {
                    return this.valArray
                },setValue: function(b) {
                    if (this.isMultiple)
                        if (a.isArray(b)) {
                            var b = a.uniqueArray(b);
                            0 !== this.textArray.length && (this.textArray = []), 0 !== this.valArray.length && (this.valArray = []), $("#" + this.id + " dl").find("input[type=checkbox]").prop("checked", !1), $("#" + this.id + " dd").removeClass(this.cssPrefix + "slt");
                            for (var c = 0; c < b.length; c++)
                                for (var d = 0; d < $("#" + this.id + " dl").find("input[type=checkbox]").size(); d++)
                                    b[c] == $("#" + this.id + " dl").find("input[type=checkbox]")[d].value && ($("#" + this.id + " dl").find("input[type=checkbox]")[d].checked = !0, $($("#" + this.id + " dl").find("input[type=checkbox]")[d]).closest("dd").addClass(this.cssPrefix + "slt"), this.textArray.push($($("#" + this.id + " dl").find("input[type=checkbox]")[d]).next().html()), this.valArray.push(b[c]));
                            0 == this.textArray.length ? alert("\u6ca1\u6709\u627e\u5230\u5339\u914d\u7684value\u503c") : ($("#" + this.id + " .r-combobox-input").val(""), $("#" + this.id + " .r-combobox-input").val(this.textArray), $("#" + this.id + " ." + this.cssPrefix + "box").addClass(this.cssPrefix + "clear-box"))
                        } else
                            alert("\u60a8\u8f93\u5165\u7684value\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u8f93\u5165\u6570\u7ec4\u7c7b\u578b");
                    else if ("string" != typeof b)
                        alert("\u60a8\u8f93\u5165\u7684value\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u8f93\u5165\u5b57\u7b26\u4e32\u7c7b\u578b");
                    else {
                        0 !== this.textArray.length && (this.textArray = []), 0 !== this.valArray.length && (this.valArray = []);
                        for (var e = 0; e < $("#" + this.id + " dd").size(); e++)
                            b == $("#" + this.id + " dd").eq(e).find("span").attr("value") && ($("#" + this.id + " dd").removeClass(this.cssPrefix + "slt").eq(e).addClass(this.cssPrefix + "slt"), this.textArray.push($("#" + this.id + " dd").eq(e).find("span").html()), this.valArray.push(b));
                        0 == this.textArray.length ? alert("\u6ca1\u6709\u627e\u5230\u5339\u914d\u7684value\u503c") : ($("#" + this.id + " .r-combobox-input").val(""), $("#" + this.id + " .r-combobox-input").val(this.textArray), $("#" + this.id + " ." + this.cssPrefix + "box").addClass(this.cssPrefix + "clear-box"))
                    }
                    this.hiddenEl.val(b)
                },clearInput: function() {
                    var a = this;
                    $("#" + this.id + " ." + this.cssPrefix + "clear").on("click", function() {
                        a.textArray = [], a.valArray = [], a.hiddenEl.val(""), $("#" + a.id + " ." + a.cssPrefix + "input").val(""), $("#" + a.id + " input[type=checkbox]").attr("checked", !1), $("#" + a.id + " ." + a.cssPrefix + "slt").removeClass(a.cssPrefix + "slt"), $("#" + a.id + " ." + a.cssPrefix + "clear-box").removeClass(a.cssPrefix + "clear-box")
                    })
                },operation: function() {
                    this._createDom(), this.bindEvent(), this.writeItSelf(), this.isMultiple ? (this.checkboxAll(), this.checkboxOne()) : this.radioChoose(), this.clearInput(), this.fireEvent("render")
                },defineInstanceProperties: function() {
                    this.textArray = [], this.valArray = [], this.textArrayDf = [], this.valArrayDf = []
                },initialize: function() {
                    null != this.data ? (this._createDom(), this.bindEvent(), this.writeItSelf(), this.isMultiple ? (this.checkboxAll(), this.checkboxOne()) : this.radioChoose(), this.clearInput(), this.fireEvent("render")) : null != this.url && this.autoLoad ? (this._createHdDom(), this.bindEvent(), this.writeItSelf(), a.ajax({url: this.url,timeout: this.timeout,success: function(a) {
                            this.data = a;
                            var b = this._createList(this, a[this.resultField]);
                            $("#" + this.id).find(".r-combobox-slider").append(b), this.ddHover(this.cssPrefix), this.isMultiple ? (this.checkboxAll(), this.checkboxOne()) : this.radioChoose(), this.clearInput(), this.fireEvent("render"), this._deleteLoading(), this.dataSuccess && this.dataSuccess(a)
                        }.bind(this),error: function(a, b, c) {
                            this._deleteLoading(), "timeout" == b ? this._messageFnc() : this._messageFnc("severError")
                        }.bind(this)})) : null == this.url || this.autoLoad || (this._createHdDom(), this.bindEvent(), this.writeItSelf(), this.clearInput()), this.addEvents("onSelect")
                },privates: {_createList: function(a, b) {
                        var c = "", d = "r-combobox-slt", e = "", f = "", g = 0, h = 'checked = "checked"', i = "", j = "", k = "";
                        if (0 == b.length)
                            return _messageFnc("noData"), !1;
                        if (a.isMultiple) {
                            for (var l = 0; l < b.length; l++)
                                1 == b[l].selected ? (e = d, a.valArray.push(b[l][a.valueField]), a.textArray.push(b[l][a.displayField]), g++, i = h) : (e = "", i = ""), c += '<dd class="clearfix ' + e + '"><input type="checkbox" ' + i + ' class="left ' + a.cssPrefix + 'chk" value="' + b[l][a.valueField] + '" /><span class="left" title="' + b[l][a.displayField] + '">' + b[l][a.displayField] + "</span></dd>";
                            g == l && (f = d, j = h), a.siftAble && (k = '<dt class="clearfix"><input type="text" class="left ' + a.cssPrefix + 'sift-input" id="' + a.id + '_sift_input" /><a href="#" class="left ' + a.cssPrefix + 'sift-link" id="' + a.id + '_sift_link">\u7b5b\u9009</a></dt>'), c = k + '<dd class="clearfix ' + f + '"><input type="checkbox" ' + j + ' class="left ' + a.cssPrefix + "chk " + a.cssPrefix + 'chkAll" value="0" /><span class="left">\u5168\u9009</span></dd>' + c
                        } else {
                            for (var l = 0; l < b.length; l++)
                                1 == b[l].selected && 0 == a.valArray.length ? (e = d, a.valArray.push(b[l][a.valueField]), a.textArray.push(b[l][a.displayField])) : e = "", c += '<dd class="clearfix ' + e + '"><span class="left" title="' + b[l][a.displayField] + '" value="' + b[l][a.valueField] + '">' + b[l][a.displayField] + "</span></dd>";
                            a.siftAble && (k = '<dt class="clearfix"><input type="text" class="left ' + a.cssPrefix + 'sift-input" id="' + a.id + '_sift_input" /><a href="#" class="left ' + a.cssPrefix + 'sift-link" id="' + a.id + '_sift_link"></a></dt>', c = k + c)
                        }
                        return a.valArrayDf = $.extend(!0, [], a.valArray), a.textArrayDf = $.extend(!0, [], a.textArray), $("." + this.cssPrefix + "input", $("#" + this.id)).val(this.textArray.join(",")), c
                    },_createDom: function() {
                        var a = this.width - 40, b = this.data[this.resultField];
                        this.hiddenField = this.hiddenField || this.id;
                        var c = "";
                        c = this._createList(this, b);
                        var d = "", e = this.textArray.join(",");
                        "" != e ? e = 'value="' + e + '"' : "" != this.placeholder && (d = 'placeholder="' + this.placeholder + '"');
                        var f = '<div class="' + this.cssPrefix + 'box" style="width:' + this.width + 'px"><input type="text" ' + d + " " + e + 'class="' + this.cssPrefix + 'input" style="width:' + a + 'px;" />';
                        this.clearAble && (f += '<a href="#" class="' + this.cssPrefix + 'clear"></a>'), f += '<a href="#" class="' + this.cssPrefix + 'handle"></a><div class="' + this.cssPrefix + 'slider-box" style="display:none; width:' + (this.width - 2) + "px; max-height:" + this.listHeight + 'px;">', this.autoLoad && (f += '<dl class="' + this.cssPrefix + 'slider" style="width:' + (this.width - 2) + 'px">', f += c, f += '</dl><input type="hidden" name="' + this.hiddenField + '" value="' + this.valArray.join(",") + '">'), f += "</div></div>", $("#" + this.id).append(f), this.clearAble || $("#" + this.id + " ." + this.cssPrefix + "input").css({paddingRight: parseInt($("#" + this.id + " ." + this.cssPrefix + "input").css("paddingRight")) - 10,width: parseInt($("#" + this.id + " ." + this.cssPrefix + "input").css("width")) + 10}), this.hiddenEl = $("#" + this.id + " [name=" + this.hiddenField + "]"), "" != d && $("#" + this.id).find("." + this.cssPrefix + "input").placeholder()
                    },_createHdDom: function() {
                        var a = this.width - 40;
                        this.hiddenField = this.hiddenField || this.id;
                        var b = "", c = this.textArray.join(",");
                        "" != c ? c = 'value="' + c + '"' : "" != this.placeholder && (b = 'placeholder="' + this.placeholder + '"');
                        var d = '<div class="' + this.cssPrefix + 'box" style="width:' + this.width + 'px"><input type="text" ' + b + " " + c + 'class="' + this.cssPrefix + 'input" style="width:' + a + 'px;" />';
                        this.clearAble && (d += '<a href="#" class="' + this.cssPrefix + 'clear"></a>'), d += '<a href="#" class="' + this.cssPrefix + 'handle"></a><div class="' + this.cssPrefix + 'slider-box" style="display:none; width:' + (this.width - 2) + "px; max-height:" + this.listHeight + 'px;">', d += '<dl class="' + this.cssPrefix + 'slider" style="width:' + (this.width - 2) + 'px">', d += '</dl><input type="hidden" name="' + this.hiddenField + '" value="' + this.valArray.join(",") + '">', d += "</div></div>", $("#" + this.id).append(d), this.clearAble || $("#" + this.id + " ." + this.cssPrefix + "input").css({paddingRight: parseInt($("#" + this.id + " ." + this.cssPrefix + "input").css("paddingRight")) - 10,width: parseInt($("#" + this.id + " ." + this.cssPrefix + "input").css("width")) + 10}), this.hiddenEl = $("#" + this.id + " [name=" + this.hiddenField + "]"), "" != b && $("#" + this.id).find("." + this.cssPrefix + "input").placeholder()
                    },_showSelect: function(a) {
                        return $("." + this.cssPrefix + "slider-box").hide(), $("." + this.cssPrefix + "box").removeClass("" + this.cssPrefix + "now"), $(a).parent().addClass("" + this.cssPrefix + "now"), $(a).parent().find("." + this.cssPrefix + "slider-box").show(), $(a).parent().find("." + this.cssPrefix + "handle").addClass("" + this.cssPrefix + "handle-up"), !1
                    },_hideSelect: function(a) {
                        return $("." + this.cssPrefix + "slider-box").hide(), $("." + this.cssPrefix + "box").removeClass("" + this.cssPrefix + "now"), $(a).parent().find("." + this.cssPrefix + "handle").removeClass("" + this.cssPrefix + "handle-up"), !1
                    },_createLoading: function(a) {
                        var b = '<dt class="' + this.cssPrefix + "load-box " + this.cssPrefix + 'loadding"></dt>';
                        $("#" + this.id + " .r-combobox-slider").append(b)
                    },_deleteLoading: function(a) {
                        $("#" + this.id + " ." + this.cssPrefix + "load-box").remove()
                    },_messageFnc: function(a) {
                        a && "severError" == a ? loadHtml = '<dt class="' + this.cssPrefix + "load-box " + this.cssPrefix + 'error"><span class="' + this.cssPrefix + 'serviceError"></span>\u670d\u52a1\u5668\u9519\u8bef</dt>' : a && "noData" == a ? loadHtml = '<dt class="' + this.cssPrefix + "load-box " + this.cssPrefix + 'error"><span class="' + this.cssPrefix + 'noData"></span>\u6682\u65e0\u6570\u636e</dt>' : loadHtml = '<dt class="' + this.cssPrefix + "load-box " + this.cssPrefix + 'error"><span class="' + this.cssPrefix + 'sendError"></span>\u8bf7\u6c42\u8d85\u65f6</dt>', $("#" + this.id + " .r-combobox-slider").append(loadHtml)
                    },_siftFnc: function() {
                        var a = this;
                        $("#" + this.id).off("click").on("click", "#" + this.id + "_sift_link", function() {
                            for (var b = ($(this).closest("." + a.cssPrefix + "slider").find("dd"), $(this).closest("." + a.cssPrefix + "slider").find("." + a.cssPrefix + "chk")), c = b.size(), d = $(this).closest("." + a.cssPrefix + "box").find("." + a.cssPrefix + "input"), e = 0; c > e; e++)
                                b.get(e).checked = !1;
                            0 !== a.textArray.length && (a.textArray = [], a.valArray = []), d.val(""), $(this).closest("dl").find("dd").removeClass(a.cssPrefix + "slt"), $(this).closest("." + a.cssPrefix + "box").removeClass(a.cssPrefix + "clear-box"), a.unChoose.apply(a, [a, {text: a.textArray,value: a.valArray}]);
                            var f = 0, g = $(this).prev("input").val();
                            if (!$.trim(g))
                                return $("#" + a.id + " dd").removeClass(a.cssPrefix + "hidden"), $("#" + a.id + " ." + a.cssPrefix + "noMate").remove(), !1;
                            for (var e = 0; e < a.data.result.length; e++)
                                -1 == a.data.result[e].chkDisplay.indexOf(g) ? $("#" + a.id + " dd").eq(a.isMultiple ? e + 1 : e).addClass(a.cssPrefix + "hidden") : (f++, $("#" + a.id + " dd").eq(a.isMultiple ? e + 1 : e).removeClass(a.cssPrefix + "hidden"), $("#" + a.id + " ." + a.cssPrefix + "noMate").remove(), a.isMultiple && $("#" + a.id + " .chkAll").parent("dd").removeClass(a.cssPrefix + "hidden"));
                            0 == f && 0 == $("#" + a.id + " ." + a.cssPrefix + "noMate").size() && ($("#" + a.id + " dl").append('<dt class="' + a.cssPrefix + 'noMate">\u6ca1\u6709\u5339\u914d\u7684\u503c\uff1b</dt>'), a.isMultiple && $("#" + a.id + " ." + a.cssPrefix + "chkAll").parent("dd").addClass(a.cssPrefix + "hidden"))
                        })
                    }}}
        }())
    }(Run), function(a) {
        a.DefaultGridSuperClass = "Grid", 
        a.define("Grid", function() {
            return {extend: a.DefaultWidgetSuperClass,query: {},param: {},alignWay: "center",isMultiple: !1,autoIncrement: !1,colModel: {},url: null,rawData: null,data: null,dataProperty: "data",totalProperty: "total",width: "auto",height: "auto",pageSize: 10,currentPage: 1,dragable: !0,zebra: !0,colHover: !0,rowClick: a.emptyFn,usepage: null,totalPage: 0,total: 0,cellEmpty: "-",endDragFnc: a.emptyFn,dataSuccess: null,timeout: null,beforePage: a.emptyFn,afterPage: a.emptyFn,onCheck: a.emptyFn,onUnCheck: a.emptyFn,onCheckAll: a.emptyFn,onUnCheckAll: a.emptyFn,
            	initConfig: function() {
                    this.addEvents("reloadGrid")
                },
                initialize: function() {
                    $("#" + this.id).html(""), 
                    this.param = this.query, 
                    this.param.pageSize = this.pageSize, 
                    this.param.currentPage = 1, 
                    "auto" == this.width && "auto" == this.height ? $("#" + this.id).css({width: "auto",height: "auto"}) : "auto" == this.width && "auto" !== this.height ? $("#" + this.id).css({width: "auto",height: this.height}) : "auto" !== this.width 
                    		&& "auto" == this.height ? $("#" + this.id).css({width: this.width,height: "auto"}) : "auto" !== this.width && "auto" !== this.height && $("#" + this.id).css({width: this.width,height: this.height}), $("#" + this.id).addClass("r-grid"), this._createGridBox(), this._createHdGrid(), this._setGridSize(), null !== this.rawData ? (this.data = this.rawData[this.dataProperty], this.total = this.rawData[this.totalProperty], this.operation()) : null !== this.url 
                    	    && (this._createLoading("isInitialize"), 
                    		a.ajax({
                    			url: this.url,
                    			data: this.param,
                    			timeout: this.timeout,
                    			success: function(a) {
                                    0 == a[this.totalProperty] || 0 == a[this.dataProperty].length ? (
                                    		    this.currentPage = 0, null !== this.usepage && 1 == this.usepage.type ? this._pageFnc() : null !== this.usepage && 2 == this.usepage.type && this._pageWithNumFnc(), 
                                    			this._sortFnc(), this._noDataq(), 
                                    			this._setGridSize()
                                    		) : 
                                    		(
                                    		    this.rawData = a, 
                                    			this.data = a[this.dataProperty], 
                                    			this.total = a[this.totalProperty], 
                                    			this.operation()
                                    		), 
                                    		this._deleteLoading(), 
                                    		this.dataSuccess && this.dataSuccess(a)
                        }.bind(this)
                        ,error: function(a, b, c) {
                            this._deleteLoading(), "timeout" == b ? (this.currentPage = 0, null !== this.usepage && 1 == this.usepage.type ? this._pageFnc() : null !== this.usepage && 2 == this.usepage.type && this._pageWithNumFnc(), this._timeoutFnc(), this._setGridSize()) : (this.currentPage = 0, null !== this.usepage && 1 == this.usepage.type ? this._pageFnc() : null !== this.usepage && 2 == this.usepage.type && this._pageWithNumFnc(), this._timeoutFnc("severError"), this._setGridSize())
                        }.bind(this)}))
                },operation: function() {
                    var a = this;
                    this._createBdGrid(), null !== this.usepage && 1 == this.usepage.type ? this._pageFnc() : null !== this.usepage && 2 == this.usepage.type && this._pageWithNumFnc(), $("#" + a.id + "_grid_bd_box").removeClass(a.cssPrefix + "loading-height"), this._setGridSize(), this.dragable ? this._doDown(this) : $("." + this.cssPrefix + "handle").css("cursor", "default"), this.zebra && this._zebraFnc(), this.colHover && this._colHover(this), this.isMultiple && this._checkFnc(), $("#" + a.id + " tbody tr").die("click").live("click", function(b) {
                        if (a.isMultiple || $(this).toggleClass("r-grid-tr-check").siblings().removeClass("r-grid-tr-check"), !$(this).hasClass(a.cssPrefix + "subGrid") && 0 === $(this).closest("." + a.cssPrefix + "subGrid").size()) {
                            var c = $("#" + a.id + "_grid_bd_box ." + a.cssPrefix + "center > tbody > tr:not('." + a.cssPrefix + "subGrid')").index($(this));
                            a.rowClick.apply(a, [a, {rowDom: this,rowDomData: a.data[c]}])
                        }
                        a._gridHeadSize(a)
                    }), this._sortFnc(), this._gridHeadSize(this), this.fireEvent("render")
                },reloadGrid: function(b, c) {
                    1 == arguments.length ? "string" == typeof arguments[0] ? this.url = arguments[0] : "object" == typeof arguments[0] && (this.param = arguments[0]) : arguments.length > 1 && ("string" == typeof arguments[0] ? this.url = arguments[0] : "object" == typeof arguments[0] && (this.param = arguments[0]), "string" == typeof arguments[1] ? this.url = arguments[1] : "object" == typeof arguments[1] && (this.param = arguments[1])), this.param.pageSize = this.pageSize, this.param.currentPage ? this.currentPage = this.param.currentPage : (this.param.currentPage = 1, this.currentPage = 1), this._createLoading(), a.ajax({url: this.url,data: this.param,timeout: this.timeout,success: function(a) {
                            this.total = a.total, this.data = a.data, this._addUnable(), 0 == a[this.totalProperty] || 0 == a[this.dataProperty].length ? (this.currentPage = 0, this._noDataq(), this._setGridSize(), this.usepage && this._refreshPagingToolbar(this.usepage.type), $("#" + this.id + " ." + this.cssPrefix + "check-all").removeAttr("checked")) : (this._reloadCallBack(a), this.usepage && this._refreshPagingToolbar(this.usepage.type)), this._deleteLoading(), this.dataSuccess && this.dataSuccess(a), this.fireEvent("reloadGrid")
                        }.bind(this),error: function(a, b, c) {
                            this._deleteLoading(), "timeout" == b ? (this.currentPage = 0, this._timeoutFnc(), this._setGridSize(), this.usepage && this._refreshPagingToolbar(this.usepage.type)) : (this.currentPage = 0, this._timeoutFnc("severError"), this._setGridSize(), this.usepage && this._refreshPagingToolbar(this.usepage.type))
                        }.bind(this)})
                },setCheck: function(b) {
                    if (a.isArray(b)) {
                        for (var c = 0; c < b.length; c++)
                            $("#" + this.id + "_grid_bd_box #" + this.id + "_row_" + b[c]).find("." + this.cssPrefix + "like-check-one").addClass(this.cssPrefix + "like-check-slt").find("." + this.cssPrefix + "check-one").attr("checked", "true").closest("tr").addClass(this.cssPrefix + "tr-check");
                        for (var d = !0, c = 0; c < $("#" + this.id + "_grid_bd_box").find("tbody").find("." + this.cssPrefix + "like-check-one").length; c++)
                            $("#" + this.id + "_grid_bd_box").find("tbody").find("." + this.cssPrefix + "like-check-one").eq(c).hasClass(this.cssPrefix + "like-check-slt") || (d = !1);
                        0 == b.length && (d = !1), d && ($("#" + this.id).find("." + this.cssPrefix + "like-check-all").addClass(this.cssPrefix + "like-check-slt"), $("#" + this.id).find("." + this.cssPrefix + "check-all").attr("checked", !0))
                    } else
                        alert("\u60a8\u8f93\u5165\u7684value\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u8f93\u5165\u6570\u7ec4\u7c7b\u578b")
                },setSort: function(a, b, c) {
                    var d = "";
                    "asc" == c ? d = this.cssPrefix + "sort-asc" : "desc" == c && (d = this.cssPrefix + "sort-desc"), $("#" + a + " th[name=" + b + "]").find("." + this.cssPrefix + "sort-" + c + "-link").show().addClass(d)
                },getChecked: function() {
                    if (this.isMultiple) {
                        for (var a = [], b = $("#" + this.id + "_grid_bd_box tbody").find("tr").length, c = $("#" + this.id + "_grid_bd_box tbody").find("tr"), d = 0; b > d; d++)
                            c.eq(d).find("." + this.cssPrefix + "check-one").attr("checked") && a.push(this.data[d]);
                        return a
                    }
                    var e = $("#" + this.id + "_grid_bd_box tbody").find("tr." + this.cssPrefix + "tr-check").index();
                    return this.data[e]
                },addRow: function(a, b) {
                    var c, d = 0, e = 0;
                    this.isMultiple && this.autoIncrement ? (e = 2, iWidth = 85) : this.isMultiple && !this.autoIncrement ? (e = 1, iWidth = 39) : !this.isMultiple && this.autoIncrement ? (e = 1, iWidth = 46) : this.isMultiple || this.autoIncrement || (e = 0, iWidth = 0);
                    for (var f = 0; f < this.colModel.length; f++)
                        this.colModel[f].hidden || d++;
                    "A" == $(a)[0].tagName ? c = $(a).closest("tr") : "TR" == $(a)[0].tagName && (c = $(a));
                    var g = '<tr id="' + c.attr("id") + '_sub" class="' + this.cssPrefix + 'subGrid"><td colspan="' + (d + e) + '">' + b + "</td></tr>";
                    return $("#" + this.id + "_grid_bd_box #" + c.attr("id")).after(g), c.attr("id") + "_sub"
                },getTotal: function() {
                    return this.total
                },getData: function() {
                    return this.data
                },resize: function() {
                    this._setGridSize(), this._gridHeadSize(this)
                },reConfig: function(a) {
                    for (var b = [], c = 0; c < a.length; c++)
                        b.push(a[c].name);
                    for (var d = 0; d < b.length; d++)
                        if (0 == d)
                            if (this.isMultiple && this.autoIncrement || !this.isMultiple && this.autoIncrement) {
                                $("#" + this.id + "_grid_hd_box col[name=autoIncrementCol]").after($("#" + this.id + "_grid_hd_box col[name=" + b[0] + "Col]")), $("#" + this.id + "_grid_hd_box th[name=autoIncrement]").after($("#" + this.id + "_grid_hd_box th[name=" + b[0] + "]")), $("#" + this.id + "_grid_bd_box col[name=autoIncrementCol]").after($("#" + this.id + "_grid_bd_box col[name=" + b[0] + "Col]"));
                                for (var e = 0; e < $("#" + this.id + "_grid_bd_box tr").length; e++)
                                    $("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=autoIncrement]").after($("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=" + b[0] + "]"))
                            } else if (this.isMultiple && !this.autoIncrement) {
                                $("#" + this.id + "_grid_hd_box col[name=multipleCol]").after($("#" + this.id + "_grid_hd_box col[name=" + b[0] + "Col]")), $("#" + this.id + "_grid_hd_box th[name=multiple]").after($("#" + this.id + "_grid_hd_box th[name=" + b[0] + "]")), $("#" + this.id + "_grid_bd_box col[name=multipleCol]").after($("#" + this.id + "_grid_bd_box col[name=" + b[0] + "Col]"));
                                for (var e = 0; e < $("#" + this.id + "_grid_bd_box tr").length; e++)
                                    $("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=multiple]").after($("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=" + b[0] + "]"))
                            } else {
                                $("#" + this.id + "_grid_hd_box colgroup").prepend($("#" + this.id + "_grid_hd_box col[name=" + b[0] + "Col]")), $("#" + this.id + "_grid_hd_box tr").prepend($("#" + this.id + "_grid_hd_box th[name=" + b[0] + "]")), $("#" + this.id + "_grid_bd_box colgroup").prepend($("#" + this.id + "_grid_bd_box col[name=" + b[0] + "Col]"));
                                for (var e = 0; e < $("#" + this.id + "_grid_bd_box tr").length; e++)
                                    $("#" + this.id + "_grid_bd_box tr").eq(e).prepend($("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=" + b[0] + "]"))
                            }
                        else {
                            $("#" + this.id + "_grid_hd_box col[name=" + b[d - 1] + "Col]").after($("#" + this.id + "_grid_hd_box col[name=" + b[d] + "Col]")), $("#" + this.id + "_grid_hd_box th[name=" + b[d - 1] + "]").after($("#" + this.id + "_grid_hd_box th[name=" + b[d] + "]")), $("#" + this.id + "_grid_bd_box col[name=" + b[d - 1] + "Col]").after($("#" + this.id + "_grid_bd_box col[name=" + b[d] + "Col]"));
                            for (var e = 0; e < $("#" + this.id + "_grid_bd_box tr").length; e++)
                                $("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=" + b[d - 1] + "]").after($("#" + this.id + "_grid_bd_box tr").eq(e).find("td[name=" + b[d] + "]"))
                        }
                    for (var f = [], g = 0, h = 0; h < a.length; h++)
                        f.push(a[h].hidden);
                    for (var i = 0; i < this.colModel.length; i++)
                        this.colModel[i].hidden = f[i];
                    var j = $("#" + this.id + "_grid_hd_box th"), k = $("#" + this.id + "_grid_bd_box tbody"), l = $("#" + this.id + "_grid_hd_box col"), m = $("#" + this.id + "_grid_bd_box col"), n = j.length, o = 0;
                    this.isMultiple && (n--, o++, g += 39), this.autoIncrement && (n--, o++, g += 46);
                    for (var p = 0; n > p; p++)
                        if (f[p]) {
                            j.eq(p + o).addClass(this.cssPrefix + "colhide"), l.eq(p + o).addClass(this.cssPrefix + "colhide"), m.eq(p + o).addClass(this.cssPrefix + "colhide");
                            for (var q = 0; q < k.find("tr").length; q++)
                                k.find("tr").eq(q).find("td").eq(p + o).addClass(this.cssPrefix + "colhide")
                        } else {
                            j.eq(p + o).removeClass(this.cssPrefix + "colhide"), l.eq(p + o).removeClass(this.cssPrefix + "colhide"), m.eq(p + o).removeClass(this.cssPrefix + "colhide");
                            for (var r = 0; r < k.find("tr").length; r++)
                                k.find("tr").eq(r).find("td").eq(p + o).removeClass(this.cssPrefix + "colhide")
                        }
                    for (var s = 0; s < $("#" + this.id + "_grid_hd_box col").length; s++)
                        s >= o && ($("#" + this.id + "_grid_hd_box col").eq(s).hasClass(this.cssPrefix + "colhide") || (g += parseInt($("#" + this.id + "_grid_hd_box col").eq(s).attr("width"))));
                    return $("#" + this.id + "_grid_bd_box table").width(g), $("#" + this.id + "_grid_hd_box table").width(g), this.colModel = a, this._gridHeadSize(this), this._setGridSize(), !1
                },privates: {_createGridBox: function() {
                        var a = '<div id="' + this.id + '_grid_tableLayout" class="' + this.cssPrefix + 'tableLayout"><div id="' + this.id + '_grid_hd_box" class="' + this.cssPrefix + 'hd-box"></div><div id="' + this.id + '_grid_bd_box" class="' + this.cssPrefix + 'bd-box"></div></div>';
                        $("#" + this.id).append(a)
                    },_createHdGrid: function() {
                        var a;
                        "center" === this.alignWay ? a = "center" : "left" === this.alignWay ? a = "left" : "right" === this.alignWay && (a = "right");
                        var b = '<table class="' + this.cssPrefix + a + '"><colgroup>';
                        this.isMultiple && (b += '<col width="39" name="multipleCol" />'), this.autoIncrement && (b += '<col width="46" name="autoIncrementCol" />');
                        for (var c = 0; c < this.colModel.length; c++)
                            b += this.colModel[c].hidden ? '<col width="" name="' + this.colModel[c].name + 'Col" class="' + this.cssPrefix + 'colhide" />' : '<col width="" name="' + this.colModel[c].name + 'Col" />';
                        b += "</colgroup><thead><tr>", this.isMultiple && (b += '<th class="' + this.cssPrefix + 'checkbox" name="multiple"><span class="' + this.cssPrefix + 'omit" style="width:28px;"><span class="' + this.cssPrefix + "like-check " + this.cssPrefix + 'like-check-all"><input type="checkbox" class="' + this.cssPrefix + 'check-all" /></span></span></th>'), this.autoIncrement && (b += '<th class="' + this.cssPrefix + 'number" name="autoIncrement"><span class="' + this.cssPrefix + 'omit" style="width:35px;">\u7f16\u53f7</span></th>');
                        for (var d = "", e = 0; e < this.colModel.length; e++) {
                            if (d = this.colModel[e].cellAlign ? this.cssPrefix + "cell-" + this.colModel[e].cellAlign : "", this.colModel[e].hidden) {
                                var f = this.colModel[e].display;
                                this.colModel[e].headerClick && (f = '<em class="' + this.cssPrefix + 'th-tip"><em class="' + this.cssPrefix + 'th-tip-word">' + this.colModel[e].display + '<em class="' + this.cssPrefix + 'th-tip-img"></em></em></em>'), b += '<th name="' + this.colModel[e].name + '" class="' + this.cssPrefix + "colhide " + d + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit" title="' + this.colModel[e].display + '">' + f + '</span><span class="' + this.cssPrefix + 'handle"></span>', this.colModel[e].sortAble && (b += '<div class="' + this.cssPrefix + 'sort"><a href="#" class="' + this.cssPrefix + 'sort-asc-link"></a><a href="#" class="' + this.cssPrefix + 'sort-desc-link"></a></div>'), b += "</div></th>"
                            } else {
                                var f = this.colModel[e].display;
                                this.colModel[e].headerClick && (f = '<em class="' + this.cssPrefix + 'th-tip"><em class="' + this.cssPrefix + 'th-tip-word">' + this.colModel[e].display + '<em class="' + this.cssPrefix + 'th-tip-img"></em></em></em>'), b += '<th name="' + this.colModel[e].name + '" class="' + d + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit" title="' + this.colModel[e].display + '">' + f + '</span><span class="' + this.cssPrefix + 'handle"></span>', this.colModel[e].sortAble && (b += '<div class="' + this.cssPrefix + 'sort"><a href="#" class="' + this.cssPrefix + 'sort-asc-link"></a><a href="#" class="' + this.cssPrefix + 'sort-desc-link"></a></div>'), b += "</div></th>"
                            }
                            if (this.colModel[e].headerClick) {
                                var g = this, h = this.colModel[e].name;
                                $("#" + g.getAttribute("id") + " th[name='" + h + "']").die().live("click", {thisGrid: g,val: h}, this.colModel[e].headerClick)
                            }
                        }
                        b += "</thead></table>", $("#" + this.id + "_grid_hd_box").append(b);
                        for (var i = 0; i < this.colModel.length; i++)
                            if (this.colModel[i].headerClick) {
                                var g = this, h = this.colModel[i].name;
                                $("#" + g.getAttribute("id") + " th[name='" + h + "']").addClass(this.cssPrefix + "pointer")
                            }
                    },_createBdGrid: function() {
                        var a;
                        "center" === this.alignWay ? a = "center" : "left" === this.alignWay ? a = "left" : "right" === this.alignWay && (a = "right");
                        var b = '<table class="' + this.cssPrefix + a + '"><colgroup>';
                        this.isMultiple && (b += '<col width="39" name="multipleCol" />'), this.autoIncrement && (b += '<col width="46" name="autoIncrementCol" />');
                        for (var c = 0; c < this.colModel.length; c++)
                            b += this.colModel[c].hidden ? '<col width="" name="' + this.colModel[c].name + 'Col" class="' + this.cssPrefix + 'colhide" />' : '<col width="" name="' + this.colModel[c].name + 'Col" />';
                        b += "</colgroup>", b += "<tbody>";
                        for (var d = this.pageSize * (this.currentPage - 1), e = 0; e < this.data.length; e++) {
                            b += '<tr id="' + this.id + "_row_" + this.data[e].id + '">', this.isMultiple && (b += '<td name="multiple"  class="' + this.cssPrefix + 'checkbox"><span class="' + this.cssPrefix + 'omit"><span class="' + this.cssPrefix + "like-check " + this.cssPrefix + 'like-check-one"><input type="checkbox" class="' + this.cssPrefix + 'check-one" /></span></span></td>'), this.autoIncrement && (b += '<td name="autoIncrement"  class="' + this.cssPrefix + 'number"><span class="' + this.cssPrefix + 'omit">' + ++d + "</span></td>");
                            for (var f = "", g = 0; g < this.colModel.length; g++)
                                if (f = this.colModel[g].cellAlign ? this.cssPrefix + "cell-" + this.colModel[g].cellAlign : "", this.colModel[g].hidden)
                                    if (this.colModel[g].formatter) {
                                        var h = this.data[e], i = "";
                                        i = "undefined" == typeof this.data[e][this.colModel[g].name] ? this.cellEmpty : null === this.data[e][this.colModel[g].name] ? this.cellEmpty : this.data[e][this.colModel[g].name];
                                        var j = this.colModel[g].formatter(i, h);
                                        b += '<td name="' + this.colModel[g].name + '"  class="' + this.cssPrefix + "colhide " + f + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit">' + j + "</span></div></td>"
                                    } else {
                                        var j = "";
                                        j = "undefined" == typeof this.data[e][this.colModel[g].name] ? this.cellEmpty : null === this.data[e][this.colModel[g].name] ? this.cellEmpty : this.data[e][this.colModel[g].name], b += '<td name="' + this.colModel[g].name + '"  class="' + this.cssPrefix + "colhide " + f + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit" title="' + j + '">' + j + "</span></div></td>"
                                    }
                                else if (this.colModel[g].formatter) {
                                    var h = this.data[e], i = "";
                                    i = "undefined" == typeof this.data[e][this.colModel[g].name] ? this.cellEmpty : null === this.data[e][this.colModel[g].name] ? this.cellEmpty : this.data[e][this.colModel[g].name];
                                    var j = this.colModel[g].formatter(i, h);
                                    b += '<td name="' + this.colModel[g].name + '"  class="' + f + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit">' + j + "</span></div></td>"
                                } else {
                                    var j = "";
                                    j = "undefined" == typeof this.data[e][this.colModel[g].name] ? this.cellEmpty : null === this.data[e][this.colModel[g].name] ? this.cellEmpty : this.data[e][this.colModel[g].name], b += '<td name="' + this.colModel[g].name + '"  class="' + f + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit" title="' + j + '">' + j + "</span></div></td>"
                                }
                            b += "</tr>"
                        }
                        b += "</tbody></table>", $("#" + this.id + "_grid_bd_box").append(b)
                    },_setGridSize: function() {
                        var a = this, b = 0, c = 0;
                        this.isMultiple && this.autoIncrement ? (b = 2, c = 85, $("#" + this.id + "_grid_tableLayout ." + this.cssPrefix + "checkbox ." + this.cssPrefix + "omit").css("width", "28px"), $("#" + this.id + "_grid_tableLayout ." + this.cssPrefix + "number ." + this.cssPrefix + "omit").css("width", "35px")) : this.isMultiple && !this.autoIncrement ? (b = 1, c = 39, $("#" + this.id + "_grid_tableLayout ." + this.cssPrefix + "checkbox ." + this.cssPrefix + "omit").css("width", "28px")) : !this.isMultiple && this.autoIncrement ? (b = 1, c = 46, $("#" + this.id + "_grid_tableLayout ." + this.cssPrefix + "number ." + this.cssPrefix + "omit").css("width", "35px")) : this.isMultiple || this.autoIncrement || (b = 0, c = 0), null !== a.usepage && "auto" !== a.height && $("#" + a.id + "_grid_tableLayout").height($("#" + a.id).height() - 35), "auto" !== a.height && $("#" + a.id + "_grid_bd_box").height($("#" + a.id + "_grid_tableLayout").height() - 39);
                        for (var d = 0, e = 0, f = 0, g = $("#" + this.id + "_grid_tableLayout").width(), h = ($("#" + this.id + "_grid_tableLayout").height(), 0); h < this.colModel.length; h++)
                            this.colModel[h].hidden || this.colModel[h].width && (e += this.colModel[h].width, f++);
                        for (var i = 0; i < this.colModel.length; i++) {
                            if (this.colModel[i].width)
                                if (i == $("#" + this.id + "_grid_hd_box col").length - 1 - b) {
                                    $("#" + this.id + "_grid_hd_box col").eq(i + b).attr("width", this.colModel[i].width - 1), $("#" + this.id + "_grid_bd_box col").eq(i + b).attr("width", this.colModel[i].width - 1);
                                    var j = 0;
                                    this.colModel[i].sortAble ? j = parseInt($("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").css("paddingRight")) : $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").css("paddingRight", 0), $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").width(this.colModel[i].width - j - 12), $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip").width("auto"), $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip-word").width($("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").width()).css("paddingRight", "0px");
                                    for (var k = 0; k < $("#" + this.id + "_grid_bd_box tr").length; k++)
                                        $("#" + this.id + "_grid_bd_box tr").eq(k).find("td").eq(i + b).find("." + this.cssPrefix + "omit").width(this.colModel[i].width - 12)
                                } else {
                                    $("#" + this.id + "_grid_hd_box col").eq(i + b).attr("width", this.colModel[i].width), $("#" + this.id + "_grid_bd_box col").eq(i + b).attr("width", this.colModel[i].width);
                                    var j = 0;
                                    this.colModel[i].sortAble ? j = parseInt($("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").css("paddingRight")) : $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").css("paddingRight", 0), $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").width(this.colModel[i].width - j - 11), $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip").width("auto"), $("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip-word").width($("#" + this.id + "_grid_hd_box thead th[name='" + this.colModel[i].name + "']").find("." + this.cssPrefix + "omit").width() - 12).css("paddingRight", "12px");
                                    for (var k = 0; k < $("#" + this.id + "_grid_bd_box tr").length; k++)
                                        $("#" + this.id + "_grid_bd_box tr").eq(k).find("td").eq(i + b).find("." + this.cssPrefix + "omit").width(this.colModel[i].width - 11)
                                }
                            else {
                                var l = $("#" + this.id + "_grid_hd_box col:not('." + this.cssPrefix + "colhide')").size() - f - b, m = g - e - c, n = (m - m % l) / l;
                                50 > n && (n = 50);
                                var o = m % l - 1;
                                if (i == $("#" + this.id + "_grid_hd_box col:not('." + this.cssPrefix + "colhide')").length - 1 - b) {
                                    $("#" + this.id + "_grid_hd_box col").eq(i + b).attr("width", n + o), $("#" + this.id + "_grid_bd_box col").eq(i + b).attr("width", n + o);
                                    var j = 0;
                                    this.colModel[i].sortAble ? j = parseInt($("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").css("paddingRight")) : $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").css("paddingRight", 0), $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").width(n - j - 11 + o), $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip").width(n - j - 11 + o), $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip-word").width(n - j - 11 + o).css("paddingRight", "0px");
                                    for (var p = 0; p < $("#" + this.id + "_grid_bd_box tr").length; p++)
                                        $("#" + this.id + "_grid_bd_box tr").eq(p).find("td").eq(i + b).find("." + this.cssPrefix + "omit").width(n - 11 + o)
                                } else {
                                    $("#" + this.id + "_grid_hd_box col").eq(i + b).attr("width", n), $("#" + this.id + "_grid_bd_box col").eq(i + b).attr("width", n);
                                    var j = 0;
                                    this.colModel[i].sortAble ? j = parseInt($("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").css("paddingRight")) : $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").css("paddingRight", 0), $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").width(n - j - 11), $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip").width(n - j - 11), $("#" + this.id + "_grid_hd_box th").eq(i + b).find("." + this.cssPrefix + "omit").find("." + this.cssPrefix + "th-tip-word").width(n - j - 11).css("paddingRight", "0px");
                                    for (var p = 0; p < $("#" + this.id + "_grid_bd_box tr").length; p++)
                                        $("#" + this.id + "_grid_bd_box tr").eq(p).find("td").eq(i + b).find("." + this.cssPrefix + "omit").width(n - 11)
                                }
                            }
                            "none" !== $("#" + this.id + "_grid_hd_box col").eq(i + b).css("display") && (d += parseInt($("#" + this.id + "_grid_hd_box col").eq(i + b).attr("width")))
                        }
                        d += c, $("#" + this.id + "_grid_hd_box table").css("width", d), $("#" + this.id + "_grid_bd_box table").css("width", d), $("#" + this.id + "_grid_bd_box").scroll(function() {
                            $("#" + a.id + "_grid_hd_box").scrollLeft($("#" + a.id + "_grid_bd_box").scrollLeft())
                        })
                    },_pageFnc: function() {
                        var b = this;
                        this.totalPage = Math.ceil(this.total / this.pageSize);
                        var c = '<div class="' + this.cssPrefix + "page " + this.cssPrefix + "align-" + this.usepage.align + '"><div class="' + this.cssPrefix + 'pagebox">';
                        if (this.usepage.pageSizeAble && (c += '<div id="' + this.id + '_PageSize" class="' + this.cssPrefix + 'pageSize"></div>'), c += '<a href="#" class="' + this.cssPrefix + 'wordFirstPage">\u9996\u9875</a><a href="#" class="' + this.cssPrefix + 'prePage">\u4e0a\u4e00\u9875</a><a href="#" class="' + this.cssPrefix + 'nextPage">\u4e0b\u4e00\u9875</a><a href="#" class="' + this.cssPrefix + 'wordLastPage">\u672b\u9875</a>', b.usepage.pageDescription && (c += '<div class="' + this.cssPrefix + 'pageDescription"><span>\u7b2c</span><span class="' + this.cssPrefix + 'pageNum">' + this.currentPage + '</span><span class="' + this.cssPrefix + 'indexPage">/' + this.totalPage + "\u9875</span></div>"), this.usepage.pageGoAble && (c += '<span>\u8df3\u8f6c\u81f3\u7b2c</span><input type="text" class="' + this.cssPrefix + 'pageNum" value="' + this.currentPage + '" /><span>\u9875</span><a href="#" class="' + this.cssPrefix + 'pageGo">\u8df3\u8f6c</a>'), c += "</div></div>", "bottom" == this.usepage.position)
                            $("#" + this.id + "_grid_tableLayout").after(c);
                        else {
                            if ("top" != this.usepage.position)
                                throw new ReferenceError("config " + this.usepage.vertical + " is undefined;");
                            $("#" + this.id + "_grid_tableLayout").before(c)
                        }
                        if (this.usepage.pageSizeAble) {
                            var d = {result: [{chkVal: "10",chkDisplay: "10"}, {chkVal: "30",chkDisplay: "30"}, {chkVal: "50",chkDisplay: "50"}, {chkVal: "100",chkDisplay: "100"}]}, e = a.create("ComboBox", {id: this.id + "_PageSize",data: d,width: 50,listHeight: 150,onSelect: function(a, c) {
                                    0 !== b.total && (b.currentPage = 1, b.pageSize = parseInt(c.value), b.totalPage = Math.ceil(b.total / b.pageSize), b._reloadData({pageSize: b.pageSize}), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage), $("#" + b.id + " ." + b.cssPrefix + "indexPage").html("/" + b.totalPage + "\u9875"))
                                }});
                            e.setValue("" + this.pageSize)
                        }
                        this._addUnable(), $("#" + this.id + " ." + this.cssPrefix + "wordFirstPage").click(function() {
                            return b.currentPage <= 1 || (b.currentPage = 1, b._addUnable(), b._reloadData(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        }), $("#" + this.id + " ." + this.cssPrefix + "wordLastPage").click(function() {
                            return 0 !== b.total ? (b.currentPage == b.totalPage || (b.currentPage = b.totalPage, b._addUnable(), b._reloadData(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1) : void 0
                        }), $("#" + this.id + " ." + this.cssPrefix + "prePage").click(function() {
                            return b.currentPage <= 1 || (b.currentPage = b.currentPage - 1, b._addUnable(), b._reloadData(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        }), $("#" + this.id + " ." + this.cssPrefix + "nextPage").click(function() {
                            return 0 !== b.total ? (b.currentPage == b.totalPage || (b.currentPage = b.currentPage + 1, b._addUnable(), b._reloadData(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1) : void 0
                        }), $("#" + this.id + " ." + this.cssPrefix + "pageGo").click(function() {
                            var a = $("#" + b.id + " input." + b.cssPrefix + "pageNum").val();
                            return isNaN(a) ? alert("\u8bf7\u8f93\u5165\u6570\u5b57") : 0 >= a ? alert("\u8bf7\u8f93\u5165\u6b63\u6574\u6570") : a > b.totalPage ? alert("\u8f93\u5165\u9519\u8bef") : (b.currentPage = parseInt(a), b._addUnable(), b._reloadData(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        })
                    },_pageWithNumFnc: function() {
                        var b = this;
                        this.totalPage = Math.ceil(this.total / this.pageSize);
                        var c = '<div class="' + b.cssPrefix + "page " + b.cssPrefix + "align-" + this.usepage.align + '"><div class="' + b.cssPrefix + 'pagebox">';
                        if (this.usepage.pageSizeAble && (c += '<div id="' + this.id + '_PageSize" class="' + this.cssPrefix + 'pageSize"></div>'), c += '<a href="#" class="' + b.cssPrefix + 'prePage">\u4e0a\u4e00\u9875</a><div class="' + b.cssPrefix + 'numbox">', c += '</div><a href="#" class="' + b.cssPrefix + 'nextPage">\u4e0b\u4e00\u9875</a>', b.usepage.pageDescription && (c += '<div class="' + this.cssPrefix + 'pageDescription"><span>\u7b2c</span><span class="' + this.cssPrefix + 'pageNum">' + this.currentPage + '</span><span class="' + this.cssPrefix + 'indexPage">/' + this.totalPage + "\u9875</span></div>"), b.usepage.pageGoAble && (c += '<span>\u8df3\u8f6c\u81f3\u7b2c</span><input type="text" class="' + this.cssPrefix + 'pageNum" value="' + this.currentPage + '" /><span>\u9875</span><a href="#" class="' + this.cssPrefix + 'pageGo">\u8df3\u8f6c</a>'), c += "</div></div>", "bottom" == this.usepage.position)
                            $("#" + this.id + "_grid_tableLayout").after(c);
                        else {
                            if ("top" != this.usepage.position)
                                throw new ReferenceError("config " + this.usepage.vertical + " is undefined;");
                            $("#" + this.id + "_grid_tableLayout").before(c)
                        }
                        if (this.usepage.pageSizeAble) {
                            var d = {result: [{chkVal: "10",chkDisplay: "10"}, {chkVal: "30",chkDisplay: "30"}, {chkVal: "50",chkDisplay: "50"}, {chkVal: "100",chkDisplay: "100"}]}, e = a.create("ComboBox", {id: this.id + "_PageSize",data: d,width: 50,listHeight: 150,onSelect: function(a, c) {
                                    0 !== b.total && (b.currentPage = 1, b.pageSize = parseInt(c.value), b.totalPage = Math.ceil(b.total / b.pageSize), b._reloadData({pageSize: b.pageSize}), b._addUnable(), b._refreshPagingToolbar(b.usepage.type), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage), $("#" + b.id + " ." + b.cssPrefix + "indexPage").html("/" + b.totalPage + "\u9875"))
                                }});
                            e.setValue("" + this.pageSize)
                        }
                        this._createPageNum(), this._addUnable(), $("#" + this.id + " ." + this.cssPrefix + "numberFirstPage").off("click").on("click", function() {
                            return b.currentPage <= 1 || (b.currentPage = 1, b._createPageNum(), b._reloadData(), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        }), $("#" + this.id + " ." + this.cssPrefix + "numberLastPage").off("click").on("click", function() {
                            return b.currentPage == b.totalPage || (b.currentPage = b.totalPage, b._createPageNum(), b._reloadData(), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        }), $("#" + this.id + " ." + this.cssPrefix + "prePage").off("click").on("click", function() {
                            return b.currentPage <= 1 || (b.currentPage = b.currentPage - 1, b._createPageNum(), b._reloadData(), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        }), $("#" + this.id + " ." + this.cssPrefix + "nextPage").off("click").on("click", function() {
                            return 0 !== b.total ? (b.currentPage == b.totalPage || (b.currentPage = b.currentPage + 1, b._createPageNum(), b._reloadData(), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1) : void 0
                        }), $("#" + this.id + " ." + this.cssPrefix + "num:not('." + this.cssPrefix + "numberFirstPage,." + this.cssPrefix + "numberLastPage')").off("click").on("click", function() {
                            return $(this).hasClass(b.cssPrefix + "cur") ? !1 : (b.currentPage = parseInt($(this).html()), b._createPageNum(), b._reloadData(), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage), !1)
                        }), $("#" + this.id + " ." + this.cssPrefix + "pageGo").click(function() {
                            var a = $("#" + b.id + " input." + b.cssPrefix + "pageNum").val();
                            return isNaN(a) ? alert("\u8bf7\u8f93\u5165\u6570\u5b57") : 0 >= a ? alert("\u8bf7\u8f93\u5165\u6b63\u6574\u6570") : a > b.totalPage ? alert("\u8f93\u5165\u9519\u8bef") : (b.currentPage = parseInt(a), b._createPageNum(), b._reloadData(), b._addUnable(), $("#" + b.id + " input." + b.cssPrefix + "pageNum").val(b.currentPage), $("#" + b.id + " span." + b.cssPrefix + "pageNum").html(b.currentPage)), !1
                        })
                    },_doDown: function(a) {
                        var b, c = this;
                        $("#" + a.getAttribute("id") + " ." + c.cssPrefix + "handle").mousedown(function(d) {
                            c._unChooseWords(), b = $(this), b.data("target", $(this)), $(b.data("target")).closest("th").find("." + c.cssPrefix + "layout").append('<span class="' + c.cssPrefix + 'handle-temp"></span>');
                            var e = $("." + c.cssPrefix + "handle-temp");
                            $("#" + c.id + "_grid_tableLayout").append('<span class="' + c.cssPrefix + 'handle-long"></span>'), $("." + c.cssPrefix + "handle-long").css("left", e.offset().left - $("#" + c.id).offset().left + "px");
                            var f = $("." + c.cssPrefix + "handle-long");
                            a._doMove(e, b, f), a._doUp(a.id, b)
                        })
                    },_doMove: function(a, b, c) {
                        var d = this;
                        $(document).unbind("mousemove"), $(document).bind("mousemove", function(e) {
                            var e = e || e.window.event, f = e.pageX || e.clientX, g = f - Math.round($(b.data("target")).closest("th").offset().left) - 5;
                            a.css("left", g), c.css("left", f - $("#" + d.id).offset().left)
                        })
                    },_doUp: function(a, b) {
                        var c = this;
                        $(document).unbind("mouseup"), $(document).bind("mouseup", function(d) {
                            c._canChooseWords();
                            var d = d || d.window.event, e = d.pageX || d.clientX;
                            $("." + c.cssPrefix + "handle-temp").remove(), $("." + c.cssPrefix + "handle-long").remove();
                            var f = $(b.data("target")).closest("th").outerWidth();
                            $(b.data("target")).closest("th").find("." + c.cssPrefix + "layout").find("." + c.cssPrefix + "th-tip-word").css("paddingRight", "15px");
                            var g = e - Math.round($(b.data("target")).closest("th").offset().left);
                            return 50 > g ? !1 : ($("#" + a + "_grid_tableLayout table").width($("#" + a + "_grid_tableLayout table").width() + (g - f)), $("#" + a + "_grid_tableLayout colgroup").each(function(d) {
                                $("#" + a + "_grid_tableLayout colgroup").eq(d).find("col").eq($(b.data("target")).closest("th").index()).attr("width", g);
                                var e = $("#" + a + "_grid_tableLayout thead").eq(d).find("th").eq($(b.data("target")).closest("th").index()).find("." + c.cssPrefix + "omit");
                                e.width(g - parseInt(e.css("paddingRight")) - 11), 0 !== e.find("." + c.cssPrefix + "th-tip").size() && (e.find("." + c.cssPrefix + "th-tip").width(e.width()), e.find("." + c.cssPrefix + "th-tip-word").width(e.width() - e.find("." + c.cssPrefix + "th-tip-img").width() - 3));
                                for (var f = 0; f < $("#" + a + "_grid_tableLayout tbody").eq(d).find("tr").length; f++)
                                    $("#" + a + "_grid_tableLayout tbody").eq(d).find("tr").eq(f).find("td").eq($(b.data("target")).closest("th").index()).find("." + c.cssPrefix + "omit").width(g - 11)
                            }), c._gridHeadSize(c), b.removeData("target"), $(document).unbind("mousemove"), $(document).unbind("mouseup"), void c.endDragFnc.apply(c, [c]))
                        })
                    },_unChooseWords: function() {
                        document.body.onselectstart = document.body.ondrag = function() {
                            return !1
                        }
                    },_canChooseWords: function() {
                        document.body.onselectstart = document.body.ondrag = function() {
                        }
                    },_zebraFnc: function() {
                        $("#" + this.id + "_grid_bd_box").find("tr:odd").addClass(this.cssPrefix + "tr-zebra")
                    },_colHover: function(a) {
                        var b = this;
                        $("#" + this.id + "_grid_bd_box tbody tr").hover(function() {
                            var c = $(this).index();
                            $(this).addClass(b.cssPrefix + "tr-hover"), $("#" + a.id + "_grid_bd_box tbody tr").eq(c).addClass(b.cssPrefix + "tr-hover")
                        }, function() {
                            var c = $(this).index();
                            $(this).removeClass(b.cssPrefix + "tr-hover"), $("#" + a.id + "_grid_bd_box tbody tr").eq(c).removeClass(b.cssPrefix + "tr-hover")
                        })
                    },_checkFnc: function() {
                        var a = this;
                        $("#" + a.id + " ." + a.cssPrefix + "like-check-all").off("click").on("click", function(b) {
                            a._stopProp(b), $(this).hasClass(a.cssPrefix + "like-check-slt") ? ($(this).find(".r-grid-check-all").attr("checked", !1), $(this).removeClass(a.cssPrefix + "like-check-slt").closest("#" + a.id).find("." + a.cssPrefix + "like-check-one").removeClass(a.cssPrefix + "like-check-slt"), $(this).closest("#" + a.id).find("." + a.cssPrefix + "check-one").attr("checked", !1).closest("tr").removeClass(a.cssPrefix + "tr-check"), a.onUnCheckAll(a, a.data)) : ($(this).find(".r-grid-check-all").attr("checked", !0), $(this).addClass(a.cssPrefix + "like-check-slt").closest("#" + a.id).find("." + a.cssPrefix + "like-check-one").addClass(a.cssPrefix + "like-check-slt"), $(this).closest("#" + a.id).find("." + a.cssPrefix + "check-one").attr("checked", !0).closest("tr").addClass(a.cssPrefix + "tr-check"), a.onCheckAll(a, a.data))
                        }), $("#" + a.id + " ." + a.cssPrefix + "like-check-one").off("click").on("click", function(b) {
                            a._stopProp(b);
                            var c = $(this).closest("tr").index(), d = a.data[c];
                            $(this).hasClass(a.cssPrefix + "like-check-slt") ? ($("#" + a.id + "_grid_bd_box tbody > tr").eq($(this).closest("tr").index()).removeClass(a.cssPrefix + "tr-check"), $(this).closest("#" + a.id).find("." + a.cssPrefix + "like-check-all").removeClass(a.cssPrefix + "like-check-slt"), $(this).closest("#" + a.id).find("." + a.cssPrefix + "check-all").attr("checked", !1), $(this).removeClass(a.cssPrefix + "like-check-slt").find("." + a.cssPrefix + "check-one").attr("checked", !1), a.onUnCheck(a, d)) : ($(this).addClass(a.cssPrefix + "like-check-slt").find("." + a.cssPrefix + "check-one").attr("checked", !0), $("#" + a.id + "_grid_bd_box tbody > tr").eq($(this).closest("tr").index()).addClass(a.cssPrefix + "tr-check"), a.onCheck(a, d));
                            for (var e = !0, f = 0; f < $(this).closest("tbody").find("." + a.cssPrefix + "like-check-one").length; f++)
                                $(this).closest("tbody").find("." + a.cssPrefix + "like-check-one").eq(f).hasClass(a.cssPrefix + "like-check-slt") || (e = !1);
                            e && ($(this).closest("#" + a.id).find("." + a.cssPrefix + "like-check-all").addClass(a.cssPrefix + "like-check-slt"), $(this).closest("#" + a.id).find("." + a.cssPrefix + "check-all").attr("checked", !0))
                        })
                    },_stopProp: function(a) {
                        a && a.stopPropagation ? a.stopPropagation() : window.event.cancelBubble = !0
                    },_sortFnc: function() {
                        var a = this;
                        $("#" + a.getAttribute("id") + " ." + a.cssPrefix + "sort-asc-link").die("click").live("click", function() {
                            return a.currentPage = 1, $(this).closest("#" + a.getAttribute("id")).find("." + a.cssPrefix + "sort-asc").removeClass(a.cssPrefix + "sort-asc"), $(this).closest("#" + a.getAttribute("id")).find("." + a.cssPrefix + "sort-desc").removeClass(a.cssPrefix + "sort-desc"), $(this).addClass(a.cssPrefix + "sort-asc"), a._reloadData({sortBy: $(this).closest("th").attr("name"),direction: "asc"}), !1
                        }), $("#" + a.getAttribute("id") + " ." + a.cssPrefix + "sort-desc-link").die("click").on("click", function() {
                            return a.currentPage = 1, $(this).closest("#" + a.getAttribute("id")).find("." + a.cssPrefix + "sort-asc").removeClass(a.cssPrefix + "sort-asc"), $(this).closest("#" + a.getAttribute("id")).find("." + a.cssPrefix + "sort-desc").removeClass(a.cssPrefix + "sort-desc"), $(this).addClass(a.cssPrefix + "sort-desc"), a._reloadData({sortBy: $(this).closest("th").attr("name"),direction: "desc"}), !1
                        })
                    },_reloadCallBack: function(a) {
                        $("#" + this.id + " .r-grid-like-check-all").removeClass("r-grid-like-check-slt").find(".r-grid-check-all").removeAttr("checked"), $("#" + this.id + " tbody").html(""), this.rawData = a, this.data = a[this.dataProperty], this.total = a[this.totalProperty];
                        for (var b = this.pageSize * (this.currentPage - 1), c = "", d = 0; d < this.data.length; d++) {
                            c += '<tr id="' + this.id + "_row_" + this.data[d].id + '">', this.isMultiple && (c += '<td name="multiple" class="' + this.cssPrefix + 'checkbox"><span class="' + this.cssPrefix + 'omit"><span class="' + this.cssPrefix + "like-check " + this.cssPrefix + 'like-check-one"><input type="checkbox" class="' + this.cssPrefix + 'check-one" /></span></span></td>'), this.autoIncrement && (c += '<td name="autoIncrement" class="' + this.cssPrefix + 'number"><span class="' + this.cssPrefix + 'omit">' + ++b + "</span></td>");
                            for (var e = "", f = 0; f < this.colModel.length; f++)
                                if (e = this.colModel[f].cellAlign ? this.cssPrefix + "cell-" + this.colModel[f].cellAlign : "", this.colModel[f].hidden)
                                    if (this.colModel[f].formatter) {
                                        var g = this.data[d], h = "";
                                        h = "undefined" == typeof this.data[d][this.colModel[f].name] ? this.cellEmpty : null === this.data[d][this.colModel[f].name] ? this.cellEmpty : this.data[d][this.colModel[f].name];
                                        var i = this.colModel[f].formatter(h, g);
                                        c += '<td name="' + this.colModel[f].name + '" class="' + this.cssPrefix + "colhide " + e + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit">' + i + "</span></div></td>"
                                    } else {
                                        var i = "";
                                        i = "undefined" == typeof this.data[d][this.colModel[f].name] ? this.cellEmpty : null === this.data[d][this.colModel[f].name] ? this.cellEmpty : this.data[d][this.colModel[f].name], c += '<td name="' + this.colModel[f].name + '" class="' + this.cssPrefix + "colhide " + e + '"><div class="' + this.cssPrefix + 'layout"><span class="' + this.cssPrefix + 'omit" title="' + i + '">' + i + "</span></div></td>"
                                    }
                                else if (this.colModel[f].formatter) {
                                    var g = this.data[d], h = "";
                                    h = "undefined" == typeof this.data[d][this.colModel[f].name] ? this.cellEmpty : null === this.data[d][this.colModel[f].name] ? this.cellEmpty : this.data[d][this.colModel[f].name];
                                    var i = this.colModel[f].formatter(h, g);
                                    c += '<td name="' + this.colModel[f].name + '"><div class="' + this.cssPrefix + "layout " + e + '"><span class="' + this.cssPrefix + 'omit">' + i + "</span></div></td>"
                                } else {
                                    var i = "";
                                    i = "undefined" == typeof this.data[d][this.colModel[f].name] ? this.cellEmpty : null === this.data[d][this.colModel[f].name] ? this.cellEmpty : this.data[d][this.colModel[f].name], c += '<td name="' + this.colModel[f].name + '"><div class="' + this.cssPrefix + "layout " + e + '"><span class="' + this.cssPrefix + 'omit" title="' + i + '">' + i + "</span></div></td>"
                                }
                            c += "</tr>"
                        }
                        $("#" + this.id + " tbody").html(c);
                        var j = 0;
                        this.isMultiple && j++, this.autoIncrement && j++;
                        $("#" + this.id).width(), $("#" + this.id).width();
                        if ("auto" !== this.height) {
                            $("#" + this.id).height() - 35
                        } else {
                            $("#" + this.id).height()
                        }
                        this._setGridSize(), this.dragable ? this._doDown(this) : $("." + this.cssPrefix + "handle").css("cursor", "default"), this.zebra && this._zebraFnc(), this.colHover && this._colHover(this), this.isMultiple && this._checkFnc(), this._gridHeadSize(this)
                    },_reloadData: function(b) {
                        if (this.param.currentPage = this.currentPage, b) {
                            for (var c in b)
                                this.param[c] = b[c];
                            this.param.currentPage = 1
                        }
                        this._createLoading(), this.beforePage(this), a.ajax({url: this.url,data: this.param,timeout: this.timeout,success: function(a) {
                                0 == a[this.totalProperty] || 0 == a[this.dataProperty].length ? (this.currentPage = 0, this._noDataq(), this._setGridSize(), this.usepage && this._refreshPagingToolbar(this.usepage.type), $("#" + this.id + " ." + this.cssPrefix + "check-all").removeAttr("checked")) : (this._reloadCallBack(a), $("#" + this.id + " ." + this.cssPrefix + "check-all").attr("checked") && $("#" + this.id + " ." + this.cssPrefix + "check-all").removeAttr("checked"), this.usepage && this._refreshPagingToolbar(this.usepage.type)), this._deleteLoading(), this.afterPage(this), this.dataSuccess && this.dataSuccess(a)
                            }.bind(this),error: function(a, b, c) {
                                this._deleteLoading(), "timeout" == b ? (this.currentPage = 0, this._timeoutFnc(), this._setGridSize(), this.usepage && this._refreshPagingToolbar(this.usepage.type)) : (this.currentPage = 0, this._timeoutFnc("severError"), this._setGridSize(), this.usepage && this._refreshPagingToolbar(this.usepage.type))
                            }.bind(this)})
                    },_refreshPagingToolbar: function(a) {
                        this.totalPage = Math.ceil(this.total / this.pageSize), 1 == a ? (this._addUnable(), $("#" + this.id + " ." + this.cssPrefix + "pageSize").val(this.cssPrefix + "slt-10"), $("#" + this.id + " input." + this.cssPrefix + "pageNum").val(this.currentPage), $("#" + this.id + " span." + this.cssPrefix + "pageNum").html(this.currentPage), $("#" + this.id + " ." + this.cssPrefix + "indexPage").html("/" + this.totalPage + "\u9875")) : 2 == a && (this._createPageNum(), this.usepage.pageGoAble && ($("#" + this.id + " input." + this.cssPrefix + "pageNum").val(this.currentPage), $("#" + this.id + " span." + this.cssPrefix + "pageNum").html(this.currentPage), $("#" + this.id + " ." + this.cssPrefix + "indexPage").html("/" + this.totalPage + "\u9875")))
                    },_createPageNum: function() {
                        var a = this;
                        $("#" + this.id + " ." + this.cssPrefix + "numbox").html("");
                        var b = "";
                        if (this.totalPage <= 5) {
                            for (var c = 1; c <= this.totalPage; c++)
                                b += c == this.currentPage ? '<a href="#" class="' + this.cssPrefix + "cur " + this.cssPrefix + 'num">' + c + "</a>" : '<a href="#" class="' + this.cssPrefix + 'num">' + c + "</a>";
                            $("#" + this.id + " ." + this.cssPrefix + "numbox").append(b)
                        } else {
                            var d = '<a href="#" class="' + this.cssPrefix + "cur " + this.cssPrefix + 'num">' + this.currentPage + "</a>", e = '<a href="#" class="' + this.cssPrefix + "cur " + this.cssPrefix + "num " + this.cssPrefix + 'numberFirstPage">' + this.currentPage + "</a>", f = '<a href="#" class="' + this.cssPrefix + "cur " + this.cssPrefix + "num " + this.cssPrefix + 'numberLastPage">' + this.currentPage + "</a>", g = '<a href="#" class="' + this.cssPrefix + "numberFirstPage " + this.cssPrefix + 'num">1</a>', h = '<a href="#" class="' + this.cssPrefix + "numberLastPage " + this.cssPrefix + 'num">' + this.totalPage + "</a>", i = '<a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage - 1) + "</a>", j = '<a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage + 1) + "</a>", k = '<span class="' + this.cssPrefix + 'point">...</span>', l = 1;
                            this.totalPage;
                            b += this.currentPage - l == 0 ? e + '<a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage + 1) + '</a><a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage + 2) + '</a><a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage + 3) + "</a>" + k + h : this.currentPage - l == 1 ? g + d + '<a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage + 1) + '</a><a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage + 2) + "</a>" + k + h : this.currentPage - l == 2 ? g + i + d + j + k + h : 0 == Math.abs(this.currentPage - this.totalPage) ? g + k + '<a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage - 3) + '</a><a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage - 2) + '</a><a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage - 1) + "</a>" + f : 1 == Math.abs(this.currentPage - this.totalPage) ? g + k + '<a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage - 2) + '</a><a href="#" class="' + this.cssPrefix + 'num">' + (this.currentPage - 1) + "</a>" + d + h : 2 == Math.abs(this.currentPage - this.totalPage) ? g + k + i + d + j + h : g + k + i + d + j + k + h, $("#" + this.id + " ." + this.cssPrefix + "numbox").append(b), 1 == this.currentPage && this.currentPage !== this.totalPage ? ($("#" + this.id + " ." + this.cssPrefix + "nextPage").removeClass(this.cssPrefix + "unable"), $("#" + this.id + " ." + this.cssPrefix + "prePage").addClass(this.cssPrefix + "unable")) : this.currentPage == this.totalPage && 1 !== this.currentPage ? ($("#" + this.id + " ." + this.cssPrefix + "prePage").removeClass(this.cssPrefix + "unable"), $("#" + this.id + " ." + this.cssPrefix + "nextPage").addClass(this.cssPrefix + "unable")) : 1 !== this.currentPage && this.currentPage != this.totalPage && ($("#" + this.id + " ." + this.cssPrefix + "nextPage").removeClass(this.cssPrefix + "unable"), $("#" + this.id + " ." + this.cssPrefix + "prePage").removeClass(this.cssPrefix + "unable"))
                        }
                        $("#" + this.id + " ." + this.cssPrefix + "num:not('." + this.cssPrefix + "numberFirstPage,." + this.cssPrefix + "numberLastPage')").off("click").on("click", function() {
                            return $(this).hasClass(a.cssPrefix + "cur") ? !1 : (a.currentPage = parseInt($(this).html()), a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " ." + a.cssPrefix + "pageNum").val(a.currentPage), !1)
                        }), $("#" + this.id + " ." + this.cssPrefix + "numberFirstPage").off("click").on("click", function() {
                            return a.currentPage <= 1 || (a.currentPage = 1, a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " ." + a.cssPrefix + "pageNum").val(a.currentPage)), !1
                        }), $("#" + this.id + " ." + this.cssPrefix + "numberLastPage").off("click").on("click", function() {
                            return a.currentPage == a.totalPage || (a.currentPage = a.totalPage, a._createPageNum(), a._reloadData(), a._addUnable(), $("#" + a.id + " ." + a.cssPrefix + "pageNum").val(a.currentPage)), !1
                        })
                    },_addUnable: function() {
                        0 !== this.total ? 1 == this.currentPage && this.currentPage !== this.totalPage ? ($("#" + this.getAttribute("id") + " ." + this.cssPrefix + "nextPage").removeClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "prePage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordFirstPage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordLastPage").removeClass(this.cssPrefix + "unable")) : 1 == this.currentPage && this.currentPage == this.totalPage ? ($("#" + this.getAttribute("id") + " ." + this.cssPrefix + "nextPage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "prePage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordFirstPage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordLastPage").addClass(this.cssPrefix + "unable")) : 1 !== this.currentPage && this.currentPage == this.totalPage ? ($("#" + this.getAttribute("id") + " ." + this.cssPrefix + "prePage").removeClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "nextPage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordFirstPage").removeClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordLastPage").addClass(this.cssPrefix + "unable")) : 1 !== this.currentPage && this.currentPage !== this.totalPage && ($("#" + this.getAttribute("id") + " ." + this.cssPrefix + "nextPage").removeClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "prePage").removeClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordFirstPage").removeClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordLastPage").removeClass(this.cssPrefix + "unable")) : ($("#" + this.getAttribute("id") + " ." + this.cssPrefix + "nextPage").addClass(this.cssPrefix + "unable"), 
                        $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "prePage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordFirstPage").addClass(this.cssPrefix + "unable"), $("#" + this.getAttribute("id") + " ." + this.cssPrefix + "wordLastPage").addClass(this.cssPrefix + "unable"))
                    },_createLoading: function(a) {
                        "isInitialize" === a && $("#" + this.id + "_grid_bd_box").addClass(this.cssPrefix + "loading-height");
                        var b = '<div class="' + this.cssPrefix + 'load-box"><span class="' + this.cssPrefix + 'loading"></span></div>';
                        $("#" + this.id).append(b)
                    },_deleteLoading: function() {
                        $("#" + this.id + "_grid_bd_box").removeClass(this.cssPrefix + "loading-height"), $("#" + this.id + " ." + this.cssPrefix + "load-box").remove()
                    },_gridHeadSize: function(a) {
                        var b = $("#" + a.id).width() - 17, c = $("#" + a.id).width() + 17, d = $("#" + a.id).width(), e = 0;
                        $("#" + a.id + "_grid_bd_box").width() < $("#" + a.id + "_grid_bd_box table").width() && (e = 17), "auto" !== a.height && ($("#" + a.id + "_grid_bd_box").width() < $("#" + a.id + "_grid_bd_box table").width() ? $("#" + a.id + "_grid_bd_box").height() < $("#" + a.id + "_grid_bd_box table").height() + e ? $("#" + a.id + "_grid_hd_box").width(b) : $("#" + a.id + "_grid_hd_box").width(d) : $("#" + a.id + "_grid_bd_box").height() < $("#" + a.id + "_grid_bd_box table").height() ? $("#" + a.id + "_grid_hd_box").width(b) : $("#" + a.id + "_grid_hd_box").width(c))
                    },_noDataq: function() {
                        var a, b = 0;
                        "center" === this.alignWay ? a = "center" : "left" === this.alignWay ? a = "left" : "right" === this.alignWay && (a = "right");
                        var c = '<table class="' + this.cssPrefix + a + '"><colgroup>';
                        this.isMultiple && (c += '<col width="39" name="multipleCol" />', b++), this.autoIncrement && (c += '<col width="46" name="autoIncrementCol" />', b++);
                        for (var d = 0; d < this.colModel.length; d++)
                            this.colModel[d].hidden ? c += '<col width="" name="' + this.colModel[d].name + 'Col" class="' + this.cssPrefix + 'colhide" />' : (c += '<col width="" name="' + this.colModel[d].name + 'Col" />', b++);
                        c += "</colgroup>", c += '<tbody><tr><td colspan="' + b + '">', c += "<span class='" + this.cssPrefix + "no-data'>\u6682\u65e0\u6570\u636e</span>", c += "</td></tr>", c += "</tbody></table>", $("#" + this.id + "_grid_bd_box").html(c)
                    },_timeoutFnc: function(a) {
                        var b, c = 0;
                        if ("center" === this.alignWay ? b = "center" : "left" === this.alignWay ? b = "left" : "right" === this.alignWay && (b = "right"), a && "severError" == a)
                            var d = "\u670d\u52a1\u5668\u7aef\u9519\u8bef\u3002";
                        else
                            var d = "\u52a0\u8f7d\u8d85\u65f6\u4e86\u3002";
                        var e = '<table class="' + this.cssPrefix + b + '"><colgroup>';
                        this.isMultiple && (e += '<col width="39" name="multipleCol" />', c++), this.autoIncrement && (e += '<col width="46" name="autoIncrementCol" />', c++);
                        for (var f = 0; f < this.colModel.length; f++)
                            this.colModel[f].hidden ? e += '<col width="" name="' + this.colModel[f].name + 'Col" class="' + this.cssPrefix + 'colhide" />' : (e += '<col width="" name="' + this.colModel[f].name + 'Col" />', c++);
                        e += "</colgroup>", e += '<tbody><tr><td colspan="' + c + '">', e += "<span class='" + this.cssPrefix + "no-data'>" + d + "<a href='#' id='" + this.id + "_reload'>\u91cd\u65b0\u52a0\u8f7d</a></span>", e += "</td></tr>", e += "</tbody></table>", $("#" + this.id + "_grid_bd_box").html(e), $("#" + this.id + "_reload").click(function() {
                            this.reloadGrid()
                        }.bind(this))
                    }}}
        }())
    }(Run), function(Run) {
        Run.define("Window", function() {
            return {extend: Run.DefaultWidgetSuperClass,width: 500,height: 500,mask: !0,shadow: !1,draggable: !1,resizable: !1,title: null,iconCls: null,up: !1,minimal: !1,maximal: !1,maxFn: null,closable: !0,closeFn: null,url: null,message: "",buttons: [],animationType: "fade",animationDuration: 300,close: function() {
                    var a = this;
                    this._animationStrategy[this.animationType].close.call(this, function() {
                        a._removePop(), a.closeFn && a.closeFn.call(a)
                    })
                },operation: function() {
                    this._createDom(), this._setHeight(), this._open(), this._runDefaultEvent()
                },initialize: function() {
                    if ("" != this.message)
                        this.operation(), this.fireEvent("render");
                    else if (null != this.url) {
                        this.operation();
                        var a = this;
                        Run.ajax({type: "post",url: this.url,cache: !1,dataType: "text",success: function(b) {
                                $("#" + a.id).find(".r-window-cnt").append(b), a.fireEvent("render")
                            },error: function(b, c, d) {
                                $("#" + a.id).find(".r-window-cnt").append(c + ":" + b.status)
                            }})
                    }
                },privates: {_animationStrategy: {none: {open: function(a) {
                                var b = $("#" + this.id), c = b.find(".r-window-mask"), d = b.find(".r-window");
                                c.show(), d.css({visibility: "visible"}), a && $.isFunction(a) && a()
                            },close: function(a) {
                                a && $.isFunction(a) && a()
                            }},fade: {open: function(a) {
                                var b = $("#" + this.id), c = b.find(".r-window-mask"), d = b.find(".r-window");
                                d.css({opacity: 0,filter: "alpha(opacity=0)",visibility: "visible"}), this.mask && c.fadeIn(this.animationDuration / 2), d.delay(this.animationDuration / 2).animate({opacity: 1}, this.animationDuration, function() {
                                    d.css({filter: "alpha(opacity=100)"}), a && $.isFunction(a) && a()
                                })
                            },close: function(a) {
                                var b = $("#" + this.id), c = b.find(".r-window-mask"), d = b.find(".r-window"), e = this;
                                e.mask ? (d.animate({opacity: 0}, this.animationDuration, function() {
                                    d.css({filter: "alpha(opacity=0)"})
                                }), c.delay(this.animationDuration).fadeOut(this.animationDuration, function() {
                                    a && $.isFunction(a) && a()
                                })) : d.animate({opacity: 0,filter: "alpha(opacity=0)"}, this.animationDuration, function() {
                                    a && $.isFunction(a) && a()
                                })
                            }}},_open: function() {
                        this._animationStrategy[this.animationType].open.apply(this)
                    },_removePop: function() {
                        $("#" + this.id).remove()
                    },_createDom: function() {
                        for (var w = "auto" != this.width ? this.width : 500, h = "auto" != this.height ? this.height : 500, l = ($(window).width() - w) / 2, t = ($(window).height() - h) / 2, _htmlBtn = "", i = 0; i < this.buttons.length; i++)
                            0 == i && (_htmlBtn += '<div class="r-window-buttonwrap">'), _htmlBtn += '<a href="javascript:void(0)" class="r-window-button ' + this.buttons[i].className + '" id="' + this.id + "_btn" + i + '">' + this.buttons[i].text + "</a>", this.buttons.length == i + 1 && (_htmlBtn += "</div>");
                        var _htmlResize = "";
                        this.resizable && (_htmlResize = '<div class="r-window-resize r-window-resize-n"></div><div class="r-window-resize r-window-resize-e"></div><div class="r-window-resize r-window-resize-s"></div><div class="r-window-resize r-window-resize-w"></div><div class="r-window-resize r-window-resize-ne"></div><div class="r-window-resize r-window-resize-se"></div><div class="r-window-resize r-window-resize-sw"></div><div class="r-window-resize r-window-resize-nw"></div>');
                        var divTpl = '{mask}<div class="r-window" style="visibility:hidden;width:{width};height:{height};left:{left};top:{top}">{shadow}<div class="r-window-main r-window-radius"><div class="r-window-title r-window-radius clearfix">{iconCls}<span class="left r-window-title-txt ">{title}</span><div class="right r-window-title-oplist">{up}{down}{min}{max}{revert}{close}</div></div><div class="r-window-cnt">{message}</div>{btns}{resizes}</div></div>', divHtml = "";
                        divHtml += Run.template(divTpl, {id: this.id,mask: eval(this.mask) ? '<div class="r-window-mask" style="display:none;"></div>' : "",shadow: eval(this.shadow) ? '<div class="r-window-shadow r-window-radius" ></div>' : "",width: w + "px",height: h + "px",left: l + "px",top: t + "px",iconCls: this.iconCls ? '<span class="left ' + this.iconCls + '"></span>' : "",title: this.title,up: this.up ? '<a href="#" class="left r-window-title-op r-window-title-up" title="\u6536\u7f29"><span></span><em></em></a>' : "",down: this.up ? '<a href="#" class="left r-window-title-op r-window-title-down" title="\u5c55\u5f00"><span></span><em></em></a>' : "",min: this.minimal ? '<a href="#" class="left r-window-title-op r-window-title-min" title="\u6700\u5c0f\u5316"><span></span><em></em></a>' : "",max: this.maximal ? '<a href="#" class="left r-window-title-op r-window-title-max" title="\u6700\u5927\u5316"><span></span><em></em></a>' : "",revert: this.maximal ? '<a href="#" class="left r-window-title-op r-window-title-revert" title="\u8fd8\u539f"><span></span><em></em></a>' : "",close: this.closable ? '<a href="#" class="left r-window-title-op r-window-title-close" title="\u5173\u95ed"><span></span><em></em></a>' : "",message: this.message,btns: _htmlBtn,resizes: _htmlResize}), $("#" + this.id).append(divHtml)
                    },_runDefaultEvent: function() {
                        var a = this, b = $("#" + a.id).find(".r-window")[0];
                        a.draggable && a._runEventDrag(b), a.resizable && a._runEventResize(b), a._operateList(b), a.buttons.length && a._runEventBtn(b)
                    },_runEventResize: function(a) {
                        var b = this, a = $("#" + b.id).find(".r-window")[0], c = $("#" + b.id).find(".r-window-resize-n")[0], d = $("#" + b.id).find(".r-window-resize-e")[0], e = $("#" + b.id).find(".r-window-resize-s")[0], f = $("#" + b.id).find(".r-window-resize-w")[0], g = $("#" + b.id).find(".r-window-resize-ne")[0], h = $("#" + b.id).find(".r-window-resize-se")[0], i = $("#" + b.id).find(".r-window-resize-sw")[0], j = $("#" + b.id).find(".r-window-resize-nw")[0];
                        b._resize(a, j, !0, !0, !1, !1), b._resize(a, g, !1, !0, !1, !1), b._resize(a, h, !1, !1, !1, !1), b._resize(a, i, !0, !1, !1, !1), b._resize(a, f, !0, !1, !1, !0), b._resize(a, c, !1, !0, !0, !1), b._resize(a, d, !1, !1, !1, !0), b._resize(a, e, !1, !1, !0, !1)
                    },_runEventDrag: function(a) {
                        var b = this, a = $("#" + b.id).find(".r-window")[0];
                        b._drag(a, $("#" + b.id).find(".r-window-title")[0])
                    },_runEventBtn: function(a) {
                        for (var b = this, c = ($("#" + b.id).find(".r-window")[0], 0); c < b.buttons.length; c++)
                            "function" == $.type(b.buttons[c].handle) && $("#" + b.id + "_btn" + c).on("click", function() {
                                var a = parseInt($(this).attr("id").split(b.id + "_btn")[1]), c = b.buttons[a].args ? b.buttons[a].args : [];
                                b.buttons[a].handle.apply(this, $.merge([b], c))
                            })
                    },_setHeight: function() {
                        var a = $("#" + this.id).find(".r-window"), b = a.find(".r-window-title").outerHeight() + a.find(".r-window-buttonwrap").outerHeight();
                        "auto" == this.height ? a.height(a.find(".r-window-main").outerHeight()) : (this.curHeight = this.height, this.curWidth = this.curWidth, this.curHeightCnt = this.height - b, this.maxWidth = $(window).width() - (a.outerWidth() - a.width()), this.maxHeight = $(window).height() - (a.outerHeight() - a.height()), this.maxHeightCnt = this.maxHeight - b, a.find(".r-window-cnt").height(this.curHeightCnt))
                    },_setPosition: function() {
                        $("#" + this.id).find(".r-window").each(function(a, b) {
                            var c = $(window).width() - $(b).outerWidth(), d = $(window).height() - $(b).outerHeight();
                            c /= 2, d /= 2, $(b).css({left: c + "px",top: d + "px"})
                        })
                    },_drag: function(a, b) {
                        $Drag = $(a), $Title = $(b).css("cursor", "move"), $Title.on("mousedown", function(a) {
                            if ($Title.hasClass("disabled"))
                                return !1;
                            var b = a.clientX - $Drag.offset().left, c = a.clientY - $Drag.offset().top;
                            return $(document).on("mousemove", function(a) {
                                var d = a.clientX - b, e = a.clientY - c, f = $(window).width() - $Drag.outerWidth(), g = $(window).height() - $Drag.outerHeight();
                                return 0 > d && (d = 0), 0 > e && (e = 0), d > f && (d = f), e > g && (e = g), $Drag.css({left: d + "px",top: e + "px"}), !1
                            }), $(document).on("mouseup", function(a) {
                                $(document).off("mousemove"), $(document).off("mouseup")
                            }), !1
                        })
                    },_resize: function(a, b, c, d, e, f) {
                        var g = 300, h = 100;
                        b.onmousedown = function(i) {
                            var i = i || window.event, j = i.clientX - b.offsetLeft, k = i.clientY - b.offsetTop, l = a.offsetTop, m = a.offsetLeft, n = a.offsetWidth, o = a.offsetHeight;
                            return document.onmousemove = function(i) {
                                var i = i || window.event, p = i.clientX - j, q = i.clientY - k, r = document.documentElement.clientWidth - a.offsetLeft - 2, s = document.documentElement.clientHeight - a.offsetTop - 2, t = c ? n - p : b.offsetWidth + p, u = d ? o - q : b.offsetHeight + q;
                                return c && (a.style.left = m + p + "px"), d && (a.style.top = l + q + "px"), g > t && (t = g), t > r && (t = r), e || (a.style.width = t + "px"), h > u && (u = h), u > s && (u = s), f || (a.style.height = u + "px"), f || ($(a).find(".r-window-cnt")[0].style.height = u - 72 + "px"), (c && t == g || d && u == h) && (document.onmousemove = null), !1
                            }, document.onmouseup = function() {
                                document.onmousemove = null, document.onmouseup = null
                            }, !1
                        }
                    },_operateList: function(a) {
                        var b = this;
                        $parent = $(a);
                        var c = null, d = null, e = !1, f = !1;
                        $parent.find(".r-window-title-up").on("click", function() {
                            return $(this).hasClass("disabled") ? !1 : (e = !0, !d && (d = $parent.height()), e && ($("#" + b.id).find(".r-window-resize-n").hide(), $("#" + b.id).find(".r-window-resize-s").hide(), $("#" + b.id).find(".r-window-resize-ne").hide(), $("#" + b.id).find(".r-window-resize-se").hide(), $("#" + b.id).find(".r-window-resize-sw").hide(), $("#" + b.id).find(".r-window-resize-nw").hide()), $parent.css({height: "30px"}).find(".r-window-bd").hide(), $(this).hide().siblings(".r-window-title-down").show(), !1)
                        }), $parent.find(".r-window-title-down").on("click", function() {
                            return $(this).hasClass("disabled") ? !1 : (e = !1, e || ($("#" + b.id).find(".r-window-resize-n").show(), $("#" + b.id).find(".r-window-resize-s").show(), $("#" + b.id).find(".r-window-resize-ne").show(), $("#" + b.id).find(".r-window-resize-se").show(), $("#" + b.id).find(".r-window-resize-sw").show(), $("#" + b.id).find(".r-window-resize-nw").show()), f ? ($parent.css({top: "0",left: "0",width: $(window).width() - 2,height: $(window).height() - 2}).find(".r-window-bd").show(), $parent.find(".r-window-cnt").height($(window).height() - 72)) : ($parent.css({height: d}).find(".r-window-bd").show(), $parent.find(".r-window-cnt").css({height: d - 72})), $(this).hide().siblings(".r-window-title-up").show(), !1)
                        }), $parent.find(".r-window-title-max").on("click", function() {
                            var a = $parent.find(".r-window-cnt");
                            return $(this).hasClass("disabled") ? !1 : ($(this).closest(".r-window-title").addClass("disabled"), f = !0, b.curHeight = $parent.height(), b.curWidth = $parent.width(), b.curHeightCnt = a.height(), 0 >= c && (c = $parent.width()), !d && (d = $parent.height()), e ? $parent.css({top: "0",left: "0",width: $(window).width() - 2}) : ($parent.css({top: "0",left: "0",height: b.maxHeight,width: b.maxWidth,overflow: "hidden"}), a.height(b.maxHeightCnt)), $(this).hide().siblings(".r-window-title-revert").show(), b.maxFn && b.maxFn.apply(b), !1)
                        }), $parent.find(".r-window-title-min").on("click", function() {
                            return $(this).hasClass("disabled") ? !1 : ($parent.hide(), !1)
                        }), $parent.find(".r-window-title-revert").on("click", function() {
                            if ($(this).hasClass("disabled"))
                                return !1;
                            f = !1;
                            var a = ($(window).width() - c - 2) / 2, g = ($(window).height() - d - 2) / 2;
                            return e ? $parent.css({top: g,left: a,width: c}) : $parent.css({top: g,left: a,width: b.curWidth,height: b.curHeight,overflow: "visible"}).find(".r-window-cnt").css("height", b.curHeightCnt), $(this).hide().siblings(".r-window-title-max").show(), b.maxFn && b.maxFn.apply(b), $(this).closest(".r-window-title").removeClass("disabled"), !1
                        }), $parent.find(".r-window-title-close").on("click", function() {
                            return $(this).hasClass("disabled") ? !1 : (b.close(), !1)
                        })
                    }}}
        }())
    }(Run)
}();
