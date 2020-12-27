var app = require("../lib/app/app.js")
var router = app.Router
router.get("/test/sd" , function(req, res,next){
    console.log("ok");
    res.end("ok")
})

module.exports = router.handle