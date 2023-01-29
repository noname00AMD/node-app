// var connectToDatabase = require("../database")
var sequelize = require("sequelize")

var cache = require("../cache")

var express = require('express');
var router = express.Router();
var UAparser = require("ua-parser-js")
const { escape , unescape} = require("querystring");
var articleModel = require("../model/article")
var categoryModel = require("../model/category")


router.get("/:path", async function (req, res, next) {
    var props = {}
    // var db = await connectToDatabase()
    var articlePath = escape(req.params.path)
    if (cache.has(articlePath)) {
        props.article = cache.get(articlePath)
    } else {
        props.article = await articleModel.findOne({ slug: articlePath })
        if (!props.article) {
            return next()
        }
        props.article.content = unescape(props.article.content )
        cache.set(articlePath, props.article)
    }

    props.categories = cache.get("categories")
    if (!props.categories) {
        props.categories = await categoryModel.find({})
        cache.set("categories", props.categories)
    }

    res.render("article", { props: props, cache: false, filename: "article" })
})




module.exports = router 
