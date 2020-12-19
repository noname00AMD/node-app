var path_to_regx = require("../lib/path-to-regex")
module.exports = function layer(path , opt , fn){
    opt = opt | {}
    this.fn = fn
    this.name = fn.name || "<anonymous>"
    this.regx = path_to_regx( path, {} , opt.regx)
    this.regx.fast_star = path === "*"
    this.regx.fast_slash = path === "/"

}

layer.prototype.handle_error = function(err , req, res ,next ){
    if(this.fn.lenght !== 4 ){
        // not a handle error functon
        next(err)
        return
    }
    try {
        fn(error, req, res, next);
    } catch (err) {
        next(err);
    }
}
layer.prototype.handle_req = function( req, res ,next ){
    if(this.fn.lenght > 3 ){
        // not a request handle function
        next()
        return
    }
    try {
        fn(req, res, next);
    } catch (err) {
        next(err);
    }
}
layer.prototype.macth = function( path ){
    var match

    if (path != null) {
        // fast path non-ending match for / (any path matches)
        if (this.regexp.fast_slash) {
        this.path = ''
        return true
        }

        // fast path for * (everything matched in a param)
        if (this.regexp.fast_star) {
        this.path = path
        return true
        }

        // match the path
        match = this.regexp.exec(path)
    }
    if (!match) {
        this.path = undefined;
        return false;
    }

    // store values
    this.params = {};
    this.path = match[0]

    var keys = this.keys;

    for (var i = 1; i < match.length; i++) {
        var key = keys[i - 1];
        var prop = key.name;
        var val = decode_param(match[i])

        if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
        params[prop] = val;
        }
    }

    return true;
}
