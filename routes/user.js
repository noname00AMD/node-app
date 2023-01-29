var express = require('express');
var router = express.Router();
var cache = require("../cache");
var categoryModel = require("../model/category")
var connectToDatabase = require("../database")
var articleModel = require("../model/article");
var userModel = require("../model/user");
var siteInfo = require("../model/siteInfo")
const category = require("../model/category");
var admin_path = process.env.ADMIN_PATH


/* GET users listing. */
router.get('/user/@:slug', async function (req, res, next) {
    var props = {}
    var db = connectToDatabase()
    props.admin_path = admin_path
    props.siteInfo = siteInfo.allsiteInfo;
    props.categories = categoryModel.allCategory;
    props.canonical = process.env.HOST
    props.host = process.env.HOST
    try {
    props.user = await db.promise().query("select * from users where username = ?",[req.params["slug"]])
    }catch (e){
        console.log(e)
    }
    res.render('user_show', {props: props, cache: false, filename: "user"});
})

router.get("/signup", async function (req, res, next) {
    var props = {}
    var db = connectToDatabase()

    props.categories = category.allCategory
    // console.log("here",props.categories)
    props.siteInfo = siteInfo.allsiteInfo;
    if(!req.isAuthenticated()){
        res.render("user_signup",{props: props, cache: false, filename: "user"})
    }
    }
)
router.post("/signup", async function (req, res, next) {
    console.log(req.body)
    res.end(("ok"))
})

module.exports = router;
