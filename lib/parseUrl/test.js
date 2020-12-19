var parse = require("parseurl")
var parse1 = require("./parseUrl")
var assert = require("assert")
// var debug = require("./app/debug")
var https = require("https")
var http = require("http")
var test = "https://localhost:3000/"
// var test = "sd"
http.createServer(function(req, res) {
    // console.log(parse(req) );
console.log(req.headers);
    console.log( new URL(req.url, `${req.headers.protocol  || 'http' }//${req.headers.host}`))
}).listen(2000)