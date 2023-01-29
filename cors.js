var cors = require("cors")
var whitelist = [ 'http://localhost:5001','http://localhost:5001',"http://facebook.com","http://google.com","http://twitter.com","http://pinterest.com"]
var opts = {
    origin: [/\.google\.com$/,/\.facebook\.com$/,/\.tiwtter\.com$/,/\.pinterest\.com$/]
}


module.exports = cors(opts)