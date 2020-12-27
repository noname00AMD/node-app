var parser = require("./index")
var req = {}
req.headers = {}
req.headers.cookie = "a=b"
parser()(req , {} , function() {
    console.log(req);
})
