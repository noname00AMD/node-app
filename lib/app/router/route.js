"use strict"
var debug = require('../../debug')("app");
var layer = require('./layer');
var idx;
class route {
    constructor(path) {
        debug("route: new route %s", path);
        this.path = path;
        this.layer;
        this.methods = []
    }
    dispatch(req, res, done) {
        debug("route: dispatching")
        var method = req.method.toLowerCase()
        if (this.methods.includes(method))
            // matched method
            this.layer.handle_req(req, res, function (err) {
                if(err)
                    this.layer.handle_err(err, req, res, done)
                else
                    done()
                    
            })
        else
            done("layer.method !== method")

    }
    get(fn) {
        debug("layer : get")
        var newlayer = new layer("/", fn, {})
        newlayer.method = "get"
        this.methods.push(newlayer.method)
        this.layer = newlayer
    }
    // all(fn) {
    //     debug("layer : all")

    //     var newlayer = new layer("/", fn, {
    //         sensitive: false,
    //         strict: false,
    //         end: true,// middleware can't end a req 
    //         start: true,
    //         delimiter: null,
    //         endsWith: null,
    //         encode: null, // function encode
    //         prefixes: null
    //     })
    //     newlayer.method = undefined;
    //     newlayer.methods.all = true
    //     this.stack.push(newlayer);
    // }
}
module.exports = route