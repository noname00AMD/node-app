"use strict"
var debug = require('../../debug')("app");
var Layer = require('./layer')


var router = {
    stack: []
}

router.handle = function handle(req, res, next) {
    debug('router : handle %s %s', req.method, req.url);
    var i = 0;
    var stack = this.stack
    var match
    loop(null)
    function loop(error) {
        debug("router : loop")
        while (i < stack.length && match !== true) {
            if (error) {
                stack[i++].handle_err(error, req, res, loop)
                return
            }
            var layer = stack[i++];
            layer.dispatch(req , res ,loop)
            return
        }
        error = error || new Error("final")
        next(error, req, res, loop)
    }
}

router.use = function use(fn) {
    debug("router: use")
    var path = "/"
    var newlayer = new Layer(path, fn, {
        sensitive: false,
        strict: false,
        end: false,// dosn't need macth to end of path
        start: true,
        delimiter: null,
        endsWith: null,
        encode: null, // function encode
        prefixes: null

    });
    this.stack.push(newlayer);
}

router.route = function route(path,fn) {
    var newlayer = new Layer(path, fn, {
        sensitive: false,
        strict: false,
        end: true,
    });
    this.stack.push(newlayer);
    return newlayer;
}

router.get = function get(path, fn) {
    var route = this.route(path ,fn);
    route.methods.push("get");
}

module.exports = router