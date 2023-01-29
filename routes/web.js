var  express = require("express")
var  Router = express.Router()
var  homeRouter = require("./home")
var  userROuter = require("./user")
Router.get("/",homeRouter)
Router.use(userROuter)
Router.get("/a",function (req , res , next) {
    res.json({mess:"ok"})
})





module.exports = Router