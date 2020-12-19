// "use strict"
var assert = require("assert")
var debug = require("../debug")
// var parse = require("../parseUrl")
// var layer = require("./router/layer")
var Router = new(require("./router/index.js"))()
var methods = ['get', 'post', 'put', 'head', 'delete', 'options', 'copy', 'move', 'merge', 'subscribe', 'unsubscribe', 'patch', 'search', 'connect']
var proto = {}
proto.debug = debug
proto.use = function use(fn) {
    Router.use(fn)
}
proto.get = function get(path, fn) {
    var route = Router.route(path);
    route.get( fn)
}
proto.handle = function handle(req,res,next) {
    // console.log('\033c');
    // process.stdout.write('\033c');
    Router.handle(req,res,next);
}

/**
 * 
 */

module.exports = proto