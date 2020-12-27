"use strict"
const util = require("util")
const assert = require("assert")
var Router = require("./router/index")
var finalHandle = require("./../final-handle")
const EventEmitter = require("events").EventEmitter
var methods = ['get', 'post', 'put', 'head', 'delete', 'options', 'copy', 'move', 'merge', 'subscribe', 'unsubscribe', 'patch', 'search', 'connect']
var app = function (req, res) {
    req.orig_req =  Object.create(null ,{req : {configurable: false, enumerable: true, writable: false, value: req }})
    res.orig_res =  Object.create(null ,{res : {configurable: false, enumerable: true, writable: false, value: res }})
    Router.handle(req, res, finalHandle)
}
Object.assign(app, EventEmitter.prototype)

app.Router = Router

app.use = function use(fn) {
    if (!fn instanceof Function && !Array.isArray(fn)) {
        throw new TypeError(`app.use() arg must be a function || array of function`)
    }
    if (Array.isArray(fn)) {
        var fns = fn
        fns.forEach((fn, i, arr) => {
            if (!fn instanceof Function) {
                throw new TypeError(`app.use arg must be a array of function 
                    given array but ${i} item is not a funtion :${typeof fn}`)
            }
        })
    }
    if ((fn instanceof Function)) {
        var fns = [fn];
    }
    fns.forEach(function (fn, i, arr) {
        Router.use(function (req, res, next) {
            var orig = req.orig_req
            fn(req, res, function (err) {
                if (err){
                    req = orig.req
                    res = orig.res
                }
                next(err)
            })
        })
    })
}
app.get = function get(path, fn) {
    Router.get(path , function (req, res, next) {
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

module.exports = app