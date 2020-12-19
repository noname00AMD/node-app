const fs = require("fs")
const path = require("path")
const Stream = require("stream")
const Event = require("events").EventEmitter
const etag = require("../etag")
const mime = require("../mime")
const http_codes = require("./http-codes.json")
const opts_json = require("./opts.json")
const debug = require("util").debuglog("sendfile")

'use strict'
exports.default = class Send extends Stream {
    constructor(req,path,opts) {
        this.opts = opts || opts_json
        this.path = path
        this.req = req
        this.MAX_MAXAGE = opts.max_age || MAX_MAXAGE
    }
    mime = mime
    error(status) {
        var message = http_codes[status]
        var err = new Error(message)
        Error.captureStackTrace(err,this.error)
        this.res.setHeader('Content-Type', 'text/plain')

        var doc = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${status} || ${message}</title>
        </head>
        <body>
            <h1>${message}</h1>
            <h3>${status}</h3>
            <p>${err.stack}</p>
        </body>
        </html>`
        this.res.end(doc)
    }
    etag(){

    }
    pipe(res){
        this.res = res
        this.error(404)
    }

}
