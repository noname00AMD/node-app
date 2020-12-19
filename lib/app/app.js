"use strict"
const util = require("util")
const assert = require("assert")
var finalHandle = require("./../final-handle")
const EventEmitter = require("events").EventEmitter
const proto = require("./proto")
var app = function (req, res) {
    app.handle(req, res, finalHandle)
}
Object.assign(app, proto)
Object.assign(app, EventEmitter.prototype)


module.exports = app