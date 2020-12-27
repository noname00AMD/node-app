"use strict"
var app = require("./lib/app/app.js")
// var debug = app.debug("app")
var parse = require("./lib/parseUrl")
var cookie_parser = require("./lib/cookie-parser")
var testRouter = require("./routes/testRouter")
app.get("/test",testRouter)
app.use(cookie_parser({}))
app.get("/user",function second(req,res,next){
    console.log("app 2"+ req);
    res.end("user")
})

app.use(function(req,res,next) {
    next(new Error("404"));
  });
app.use(function third(err , req, res ,next){
    console.log("app cuoi");
    res.end(JSON.stringify(err));
})
module.exports = app
