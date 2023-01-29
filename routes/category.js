var express = require('express');
var router = express.Router();
var cache = require("../cache");

/* GET users listing. */
router.get('/category/',async function (req, res, next) {
    var props = {}

    props.categories = cache.get("categories")
    if (!props.categories) {
        props.categories = await db.collection('categories').find({}, { _id: false }).toArray()
        cache.set("categories", props.categories)
    }
    props.site_info = cache.get("site_info")
    if (!props.site_info) {
        props.site_info = await db.collection('site_info').findOne({}, { _id: false })
        cache.set("site_info", props.site_info)
    }
    res.render('category_show_all_category', { props: props, cache: false, filename: "category" });

})
router.get('/category/:slug',async function (req, res, next) {
    var props = {}
    var user = await db.collection("categories").findOne({slug: req.params.slug }, { _id: 0 })
    if (!user) {
        props = {
            err: true,
            statusCode: 404,
            message: "not found category"
        }
        res.statusCode = 404;
        res.end("category not found")
    }
    res.end("category")
});

module.exports = router;
