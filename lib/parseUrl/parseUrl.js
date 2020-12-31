'use strict'
// var URL = require('url')
module.exports = parse
/**
 * Parse the `str` url with fast-path short-cut.
 * @param {string} str
 * @return {Object}
 * @private
 */
var url = require('url')
function parse(req, opts = {}) {
    if(req.parsed === true){
        return req
    }
    req.parsed = true
    try {
        var obj = url.parse(req.url)
        if (obj){
            Object.assign(req , obj)
            return req
        }else{
            throw new Error()
        }
    } catch (error) {
        var protocol = opts.protocol !== undefined ? String(opts.protocol) : "http:";
        var search = "";
        var path = req.url , pathname = req.url

        if ( path === null){
            return undefined
        }
        if (typeof path !== 'string' || path.charCodeAt(0) !== 0x2f /* / */){
            return undefined
        }
        for (var i = 1; i < path.length; i++) {
            switch (path.charCodeAt(i)) {
                case 0x3f: /* ?  */
                    if (search === "") {
                        pathname = path.substring(0, i)
                        search = path.substring(i)
                    }
                    break
                case 0x09: /* \t */
                case 0x0a: /* \n */
                case 0x0c: /* \f */
                case 0x0d: /* \r */
                case 0x20: /*    */
                case 0x23: /* #  */
                case 0xa0:
                case 0xfeff:/* "" */{
                    Object.assign(req,url.parse(path) )
                    return req
                }
            }
        }
        var result = new url.Url();
        result.path = result.href = path
        result.pathname = pathname
        result.protocol = req.headers.protocol || protocol
        result.query = new url.URLSearchParams(search)
        result.search = search
        Object.assign(req, result)
        return req
    }
}
