"use strict"
var debug = require('../../debug')("app");
const finalHandle = require('../../final-handle');
var Layer = require('./layer')

var methods = ['get', 'post', 'put', 'head', 'delete', 'options', 'copy', 'move', 'merge', 'subscribe', 'unsubscribe', 'patch', 'search', 'connect']

var router = function () {
    this.stack = []
    this.handle = function (req, res, next) {
        // debug('router : handle %s %s', req.method, req.url);
        var i = 0;
        var stack = this.stack
        loop(null)
        function loop(error) {
            // debug("router : loop")
            if (i >= stack.length) {
                finalHandle(new Error(404, "finnal loop"), req, res, { env: "dev" })
                return
            }
            if (error) {
                stack[i++].handle_err(error, req, res, loop)
                return
            }
            var layer = stack[i++];
            layer.handle(req, res, loop)
        }
    }
    this.use = function (fn) {
        // debug("router: use")
        var newlayer = new Layer("/", fn, {
            sensitive: false,
            strict: false,
            end: false,// dosn't need macth to end of path
            start: true,
            delimiter: null,
            endsWith: null,
            encode: null, // function encode
            prefixes: null
        });
        newlayer.methods = newlayer.methods.concat(methods);
        this.stack.push(newlayer);
    }
    this.route = function (path, fn) {
        return new Layer(path, fn, {
            sensitive: false,
            strict: false,
            end: true,
        });

    }
    this.get = function (path, fn) {
        var newlayer = this.route(path, fn);
        newlayer.methods.push("get");
        this.stack.push(newlayer);

    }
    return this
}
module.exports = router