"use strict";
function cookie(opt = {}){
    return function(req , res , next){
        var cookie_str = req.headers.cookie
        req.cookie = {}
        if( "string" !== typeof cookie_str || !cookie_str){
            return next()
        }
        var cookie_arr = cookie_str.split(/; */)
        cookie_arr.forEach((element , i  ) => {
            var index_char = element.indexOf("=")
            if (index_char < 0){
                 return
            }
            var key = element.substring(0 ,index_char).trim()
            var val = element.substring(index_char + 1 , element.length ).trim()
            if(  req.cookie[key] === undefined){
                try{
                    req.cookie[key] = decodeURIComponent( val)
                }catch(err){
                    return req.cookie[key] = val
                }
            }
        })
        next()
    }
}
module.exports = cookie