// var https = require('https');
var http = require('http');
var app = require("./app");
var parse = require("./lib/parseUrl");
// var sendfile = require("./lib/sendfile")
// var fs = require("fs")
var port = process.env.PORT || 3000
//  var opts = {
//   key: fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem')
//  }

var server = http.createServer(app)
server.listen(port)
server.on("error", (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(port + ' is already in use');
            process.exit(1);
            break;
        default:
            console.error("err" + error);
            throw error;
    }
})
// serve.on("timeout", function(){
//   console.log("request timeout !!!");
// })