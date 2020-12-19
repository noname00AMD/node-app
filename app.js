"use strict"
var app = require("./lib/app/app.js")
var debug = app.debug("app")
var parse = require("./lib/parseUrl")

app.use(function first(req,res,next){
    debug("app 1");
    next()
})
app.get("/",function second(req,res,next){
    res.end("home")
})
app.get("/user",function second(req,res,next){
    console.log("app 2");
    res.end("user")
})
app.use(function(req,res,next) {
    next(new Error("404"));
  });
app.use(function third(err , req, res ,next){
    console.log("app cuoi");
    res.end(Json.stringify(err));
})

module.exports = app
