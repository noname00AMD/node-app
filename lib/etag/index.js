var Stats = require("fs").Stats
var defaultOptions = require("./opts.json");
var debug = require("util").debuglog("etag")
exports.default = function etag(stats,opts = {}) {
    debug(`arg : ${argument}`)
    if (!stats instanceof Stats && "function" === typeof Stats) throw new TypeError('argument stat must be a file Stats')
    var mtime = stat.mtime.getTime().toString(16)
    var size = stat.size.toString(16)
    opts.weak?
    // weak
     `W/\"${size }-${mtime}\"`
    // strong
    :`\"${size }-${mtime}\"`
} 