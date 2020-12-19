"use strict"
var debug = require('../../debug')("app");
var Route = require('./route');
var Layer = require('./layer')
var parse = require('../../parseUrl');
var proto = function () {
    var router = function () {
        this.handle(req, res, next);
    }
    router.stack = []
    Object.assign(router, proto);

    return router;
}
proto.handle = function handle(req, res, finalHandle) {

    debug('router : handle %s %s', req.method, req.url);
    var i = 0;
    var path = parse(req).pathname;
    var stack = this.stack
    var match
    loop()
    function loop(error) {
        debug("router : loop")
        while (i < stack.length && match !== true) {
            if (error) {
                stack[i++].handle_err(error, req, res, loop)
                return
            }
            var layer = stack[i++];
            match = layer.match(path);
            // var route = layer.route
            if (match) {
                match = false
                layer.handle_req(req, res, loop )
                return
            }
            if (!match) {
                continue
            }
        }
        error = error || new Error("final")
        finalHandle(error, req, res) 
    }

    // var idx = 0;
    // var path = parse(req).pathname;
    // var self = this;
    // var stack = self.stack
    // manage inter-router variables
    // var done = restore(out, req, 'baseUrl', 'next', 'params');
    // next();
    // function next(err) {
    //     debug("router : new next err : %o", err)
    //     var layerError = err === 'route'
    //         ? null
    //         : err;
    //     debug("router : layerError %o", layerError)
    //     // signal to exit router
    //     if (layerError === 'router') {
    //         debug("router : layerError === 'router'",)
    //         setImmediate(finalHandle, layerError, req, res)
    //         return
    //     }
    //     // no more matching layers
    //     if (idx >= stack.length) {
    //         debug("router : idx >= stack.length",)
    //         setImmediate(finalHandle, "404 ", req, res);
    //         return;
    //     }
    //     // get pathname of request
    //     if (path == null) {
    //         debug("router : path == null",)
    //         return finalHandle("path == null ", req, res);
    //     }
    //     // find next matching layer
    //     var layer;
    //     var match;
    //     var route;
    //     while (match !== true && idx < stack.length) {
    //         debug("router : while",)
    //         layer = stack[idx++];
    //         match = Boolean(layer.match(path))
    //         route = layer.route;
    //         if (match !== true) {
    //             debug("router : match !== true",)
    //             continue;
    //         }
    //         if (!route) {
    //             // process non-route handlers normally
    //             debug("router : !route",)
    //             continue;
    //         }
    //         if (layerError) {
    //             // routes do not match with a pending error
    //             debug("router : layerError",)
    //             match = false;
    //             continue;
    //         }
    //     }
    //     // no match
    //     if (match !== true) {
    //         debug("match !== true // no match")
    //         return finalHandle("match !== true // no match", req, res)
    //     }
    //     // store route for dispatch on change
    //     if (route) {
    //         debug("router : route",)
    //         req.route = route;
    //     }
    //     // Capture one-time layer values
    //     var layerPath = layer.path;
    //     // this should be done for the layer
    //     // self.process_params(layer, paramcalled, req, res, function (err) {
    //     //     if (err) {
    //     //         return next(layerError || err);
    //     //     }
    //     if (route) {
    //         debug("router :route handle_req")
    //         return layer.handle_req(req, res, next);
    //     }
    //     // if (layerPath.length !== 0) {
    //     //     // Validate path breaks on a path separator
    //     //     var c = path[layerPath.length]
    //     //     if (c && c !== '/' && c !== '.') return next(layerError)
    //     // }
    //     // debug('%s %s : %s', layer.name, layerPath, req.originalUrl);
    //     if (layerError) {
    //         layer.handle_err(layerError, req, res, next);
    //     } else {
    //         layer.handle_req(req, res, next);
    //     }
    // };
}
proto.use = function use(fn) {
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
proto.route = function route(path) {
    var newroute = new Route(path);
    var newlayer = new Layer(path, newroute.dispatch.bind(newroute), {
        sensitive: false,
        strict: false,
        end: true,
    });
    newlayer.route = newroute;
    this.stack.push(newlayer);
    return newroute;

}
proto.get = function get(path, fn) {
    var route = this.route(path);
    route.get(fn);
    // return this;

}

module.exports = proto