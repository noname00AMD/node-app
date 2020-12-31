"use strict"
var express =  require("./lib/app")
// var debug = app.debug("app")
var parse = require("./lib/parseUrl")
var cookie_parser = require("./lib/cookie-parser")
// var testRouter = require("./routes/testRouter")
var app = new express()
// app.get("/test",testRouter)
app.use(cookie_parser({}))
// app.use(function first (req, res , next){
//     // res.end("hi")
//     next()
// } ,
// function second(req, res ,next){
//     next()
// })
// app.get("/",function second(req,res,next){
//     res.end("home")
// })

// app.get("/user",function second(req,res,next){
//     res.end("user")
// })

// app.use(function create_err (req,res,next) {
//     var err = new Error( "page not found")
//     err.code = 404
//     next(err);
//   });
// app.use(function third(err , req, res ,next){
//     console.log(err)
//     var doc = `<html>
//         <head>
//             <title>${err.message}</title>
//         </head>
//         <body>
//             <h1>code : ${err.code}</h1>
//             <h3>${err.message}</h3>
//             <h5>${err.stack}</h5>

//         </body>
//     </html>`
//     res.end(doc);
// })
module.exports = app.handle
