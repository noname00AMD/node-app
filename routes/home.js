var connectToDatabase = require('../database');
var cache = require("../cache");
var UAparser = require("ua-parser-js")
var admin_path = process.env.ADMIN_PATH
var category = require("../model/category")
var siteInfo = require("../model/siteInfo")

/* GET home page. */
async function home(req, res, next) {
    var props = {}
    props.admin_path = admin_path
    props.categories = category.allCategory
    // console.log("here",props.categories)
    props.siteInfo = siteInfo.allsiteInfo;
    props.trendingTags = []
    props.canonical = process.env.HOST
    props.host = process.env.HOST
    var userAgent = UAparser(req.get('User-Agent'))
    var device = userAgent.device
    if (device.type === "mobile" || device.type === "tablet" || device.type === "wearable") {
        // console.log("mobile");
        return res.render('mHome', {props: props, cache: false, filename: "home"});
    }
// console.log("desktop");

//   if(req.subdomains[0] === "m"){
//     res.render('mobileHome', { props: props, cache: false ,filename:"home"});
//     console.log("sub domain M");
// }
// props = JSON.parse(JSON.stringify(props))
// console.log(req.subdomains[0]);
    res.render('home', {props: props, cache: false, filename: "home"});
}


module.exports = home;
