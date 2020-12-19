'use strict'
const http_status = require("./http-codes.json")
const debug = require("util/debuglog")("http-err")
exports.default = class Http_err  {
    constructor(status, err) {
        if (typeof status !== 'number' || status < 400 || status >= 600) {
            throw new TypeError(`arg status is not a http err code : ${status} `)
        }
        if(!err instanceof Error) {
            throw new TypeError(`arg err is not an Error : ${err}`)
        }

    }
}
