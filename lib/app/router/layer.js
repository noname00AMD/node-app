"use strict"
var assert = require("assert")
var debug = require("../../debug")("app")
var pathtoRegexp = require("../../path-to-regexp");
class layer {
    constructor(path, fn, opts) {
        debug("layer : contruct new layer ");
        this.fn = fn
        this.name = fn.name || '<anonymous>';
        this.params = undefined;
        this.path = path;
        this.keys = []
        // default options for path to regexp
        opts.end || true // default layer can return res and end req
        opts.sensitive || false
        opts.strict || false

        this.regexp = pathtoRegexp(path, this.keys, opts)
        // set fast path flags
        this.regexp.fast_star = path === '*'
        this.regexp.fast_slash = path === '/' && opts.end === false
        debug("layer : regexp %o", this.regexp);

    }
    /**
     * Check if this route matches `path`, if so
     * populate `.params`.
     *
     * @param {String} path
     * @return {Boolean}
     * @api private
     */
    match(path) {
        debug("layer: matching %s", path);
        
        if (path != null) {
            // debug("req.path != null")
            // fast path non-ending match for / (any path matches)
            if (this.regexp.fast_slash) {
                // debug("this.regexp.fast_slash")
                this.params = {}
                this.path = ''
                return true
            }
            // fast path for * (everything matched in a param)
            if (this.regexp.fast_star) {
                // debug("this.regexp.fast_slash")
                this.params = { '0': decode_param(path) }
                this.path = path
                return true
            }
            // match the path
            var match = this.regexp.exec(path)
            // debug("match %o", match)
        }

        if (!match) {
            // debug("!path %o : %o", path, this.regexp)
            this.params = undefined;
            this.path = undefined;
            return false;
        }

        // store values
        this.params = {};
        this.path = match[0]

        var keys = this.keys;
        var params = this.params;

        for (var i = 1; i < match.length; i++) {
            var key = keys[i - 1];
            var prop = key.name;
            var val = decode_param(match[i])
            if (val !== undefined || !(Object.prototype.hasOwnProperty.call(params, prop))) {
                // debug("set param %o : %o", prop, val);
                params[prop] = val;
            }
        }
        return true;
    }
    /**
     * Handle the error for the layer.
     * @param {Err} err 
     * @param {Rrq} req 
     * @param {Res} res 
     * @param {function} next 
     */
    handle_err(err, req, res, next) {
        // not a standard error handler
        debug("layer : handle error")
        if (this.fn.length !== 4) {
            debug("not a standard error handler")
            next(err);
            return;
        }
        // handle err next lood
        try {
            debug("layer:try handle error")
            this.fn(err, req, res, next);
        } catch (err) {
            next(err);
        }
    }
    /**
     * handle req for this layer
     * @param {Req} req 
     * @param {Res} res 
     * @param {function} next 
     * 
     */
    handle_req(req , res , next ) {
        debug("layer:handle_req")

        if (this.fn.length > 3) {
            debug("layer:handle_req : not a standard req handler , run next loop")
            return next();
        }
        try {
            debug("layer:handle_req: run fn : %s", this.fn.name)
            this.fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = layer
/**
 * 
 * @param {string} val 
 * @return {string} 
 * @private
 */
function decode_param(val) {
    if (typeof val !== 'string' || val.length === 0) {
        return val;
    }

    try {
        return decodeURIComponent(val);
    } catch (err) {
        if (err instanceof URIError) {
            err.message = 'Failed to decode param \'' + val + '\'';
            err.status = err.statusCode = 400;
        }
        throw err;
    }
}
