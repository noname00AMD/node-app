var assert = require("assert")
// var debug = require("./app/debug")
var https = require("https")
var http = require("http")
var path = require("./lib/parseUrl")
var path1 = require("parseUrl")

http.createServer(function(req, res) {
    console.log(path(req));
    res.end()
}).listen(process.env.PORT || 2000)