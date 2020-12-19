var fs = require("fs")
var log = function(){
    var txt = ""
    for(var t in arguments){
        txt += t+" "
    }
    console.log(txt + "");
}


module.exports = log
