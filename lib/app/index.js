// "use strict"
const util = require("util")
const assert = require("assert")
var Router = require("./router/index")
var finalHandle = require("./../final-handle")
const EventEmitter = require("events").EventEmitter
var app = function () {
    this.router = Router()
    this.use = function (fn) {
        var fns = Array.prototype.slice.call(arguments, 0)
        if (fns.length === 0) {
            throw new TypeError('app.use() requires a middleware function')

        }
        fns.forEach(function (fn, i, arr) {
            if (typeof fn !== "function") {
                throw new TypeError('app.use() requires arry of function . Given ' + i + ' is ' + typeof fn)
            }
            this.router.use(fn)
        })

    }
    this.get = function (path, fn) {
        this.router.get(path, function (req, res, next) {
            var orig = {
                req: req,
                res: res
            }
            fn(req, res, function (err) {
                req = orig.req
                res = orig.res
                next(err)
            })
        })
    }
    this.handle = function (req, res) {
        req.orig_req = Object.create(null, { req: { configurable: false, enumerable: true, writable: false, value: req } })
        res.orig_res = Object.create(null, { res: { configurable: false, enumerable: true, writable: false, value: res } })
        console.log(app.router);
        this.router.handle(req, res, finalHandle)
    }
    return this
}
module.exports = app