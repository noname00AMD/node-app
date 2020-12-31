"use strict";
function cookie(opt = {}){
    return function cookieParser(req , res , next){
        var cookie_str = req.headers.cookie
        req.cookies = {}
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
            if(  req.cookies[key] === undefined){
                try{
                    req.cookies[key] = decodeURIComponent( val)
                }catch(err){
                    return req.cookies[key] = val
                }
            }
        })
        next()
    }
}
module.exports = cookie