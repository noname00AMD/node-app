'use strict'
const debug = require('util').debuglog("mime")
const map = require("./types.json")
exports.default = new class Mime {
  constructor(map) {
    this.types = {}
    this.extensions = {}
    for (var type in map) {
      var exts = map[type];
      for (var i = 0; i < exts.length; i++) {
        if (process.env.DEBUG_MIME && this.types[exts[i]]) {
          console.warn((this._loading || "define()").replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
            this.types[exts[i]] + ' to ' + type);
        }

        this.types[exts[i]] = type;
      }

      // Default extension is the first one we encounter
      if (!this.extensions[type]) {
        this.extensions[type] = exts[0];
      }
    }
  }
  lookup(path) {
    var ext = path.replace(/^.*[\.\/\\]/, '').toLowerCase();
  
  }
  charsets = function (mimeType, fallback) {
    return (/^text\/|^application\/(javascript|json)/).test(mimeType) ? "UTF8" : fallback;
  }
}(map)
