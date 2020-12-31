var express = require("../lib/app/")
var app = new express()
app.get("/sd" , function(req, res,next){
    console.log(express);
    res.end("ok")
})

module.exports = app.handle