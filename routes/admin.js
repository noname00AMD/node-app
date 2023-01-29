var cache = require("../cache");
var express = require('express');
var router = express.Router();
var UAparser = require("ua-parser-js")
var helpers = require("../helpers")
var mime = require("mime")
var fs = require("fs");
const { escape, unescape } = require("querystring");
var admin_path = process.env.ADMIN_PATH
var categoryModel = require("../model/category")
var siteInfo = require("../model/siteInfo")

var articleModel = require("../model/article");
var userModel = require("../model/user");
var tagModel = require("../model/tag");
var loginService = require("../services/loginService")


router.get(`/${admin_path}`,async function (req, res, next) {
    var props = {}

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    props.admin_path = admin_path
    res.render('admin_dashboard', { props: props, cache: false, filename: "" });

})
router.get(`/${admin_path}/article`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path
    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    props.allArticle = await articleModel.find({}, null, { limit: 20 })
    res.render("admin_all_article", { props: props, cache: false, filename: "" })
})



router.get(`/${admin_path}/article/add`, async function (req, res, next) {
    var props = {}
    // var db = await connectToDatabase()
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    res.render("admin_add_article", { props: props, cache: false, filename: "" })
})





// router.get(`/${admin_path}/article/edit/:slug`, async function (req, res, next) {
//     var props = {}
//     props.admin_path = admin_path

//     props.categories = cache.get("categories")
//     if (!props.categories) {
//         props.categories = await categoryModel.find({})
//         cache.set("categories", props.categories)
//     }
//     props.siteInfo = cache.get("sisiteInfo")
//     if (!props.siteInfo) {
//         props.siteInfo = await siteInfoModel.findOne({})
//         cache.set("siteInfo", props.siteInfo)
//     }
//     res.render("admin_add_post", { props: props, cache: false, filename: "" })
// })

router.get(`/${admin_path}/category/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path
    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    res.render('admin_show_all_category', { props: props, cache: false, filename: "category" });
})
router.get(`/${admin_path}/category/add/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    res.render('admin_add_category', { props: props, cache: false, filename: "category" });
})


router.get(`/${admin_path}/user/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    props.allUser = await userModel.find({}, null, { limit: 20 })
    res.render('admin_show_all_user', { props: props, cache: false });
})

router.get(`/${admin_path}/user/add/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    res.render('admin_add_user', { props: props, cache: false });
})



router.get(`/${admin_path}/media/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    props.allUser = await userModel.find({}, null, { limit: 20 })
    res.render('admin_show_all_media', { props: props, cache: false });
})

router.get(`/${admin_path}/media/add/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    res.render('admin_add_media', { props: props, cache: false });
})




router.get(`/${admin_path}/tag/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    props.allUser = await userModel.find({}, null, { limit: 20 })
    res.render('admin_show_all_tag', { props: props, cache: false });
})

router.get(`/${admin_path}/tag/add/`, async function (req, res, next) {
    var props = {}
    props.admin_path = admin_path

    props.categories = categoryModel.allCategory
    props.siteInfo = siteInfo.allsiteInfo

    res.render('admin_add_tag', { props: props, cache: false });
})



















// #post
router.post(`/${admin_path}/article/add`, async function (req, res, next) {
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + "/../public/images",
    });

    var date1 = new Date().getFullYear() + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if (!files.thumbImg || files.thumbImg.size > 1024 * 200) {
            res.send({
                error: true,
                title: 'Upload failed',
                message: 'thumbImg max file size 200kb',
                level: 'error'
            })
            return
        }
        fs.rename(files.thumbImg.filepath, "public/images/" + date1 + "-" + files.thumbImg.size + "-" + files.thumbImg.newFilename + "." + mime.extension(files.thumbImg.mimetype), async function (err) {
            if (err) {
                res.json({
                    title: "Submit failed",
                    message: JSON.stringify(err),
                    level: "error",
                    error: true
                })
                return
            }
            try {
                var article = new articleModel({
                    slug: helpers.textToSlug(fields.slug),
                    title: helpers.sanitize(fields.title),
                    brief: helpers.sanitize(fields.brief),
                    description: helpers.sanitize(fields.description),
                    lang: helpers.sanitize(fields.lang),
                    category: helpers.sanitize(fields.category),
                    thumbType: helpers.sanitize(fields.thumbType),
                    status: helpers.sanitize(fields.status),
                    date: new Date(helpers.sanitize(fields.date) + " " + helpers.sanitize(fields.time + ":00")),
                    like: 0,
                    author: helpers.sanitize(fields.author),
                    content: escape(fields.content),
                    tts: helpers.sanitize(fields.tts || ""),
                    category: sequelize.Types.ObjectId(helpers.sanitize(fields.category)),
                    author: sequelize.Types.ObjectId("62c182bf386dc9da963b92ee")
                })
            } catch (err) {
                res.json({
                    title: "Submit failed",
                    message: JSON.stringify(err),
                    level: "error",
                    error: true
                })
                return
            }

            // art.
            try {
                article.save()
                article.tag.forEach(function (tag, i, arr) {
                    tagModel.findOneAndUpdate({ tagName: tag }, { $inc: { "tag.size": 1 } }).exec()
                })
            } catch (err) {
                res.json({
                    title: "Submit failed",
                    message: JSON.stringify(err),
                    level: "error",
                    error: true
                })
                return
            }
            // save tag to database
            // if (fields.tag === "") {
            //     article.tag = []
            // } else {
            //     article.tag = (fields.tag.split(",")).map(tag => {
            //         return helpers.textToTag(tag)
            //     })
            // }
            res.json({
                title: "Submit successful",
                message: "<span>article insert successful</span><a href='/" + article.slug + "'> " + unescape(article.title) + "</a>",
                level: "success"
            })
        });
    });
})



router.post(`/${admin_path}/article/slug-generate`, async function (req, res, next) {
    if (typeof req.body.slug !== "string") {
        res.json({
            title: "slug-generate failed",
            message: JSON.stringify(err),
            level: "error",
            error: true
        })
        return
    }
    var slug = helpers.textToSlug(req.body.slug)
    try {
        var result = await articleModel.findOne({ slug: slug })
    } catch (error) {
        var err = error
    }
    if (err || result) {
        res.json({
            title: "slug-generate failed",
            message: JSON.stringify(err) || 'slug alrdely extixt',
            level: "error",
            error: true
        })
        return
    }
    res.json({
        "slug": slug
    })
})
router.post(`/${admin_path}/category/slug-generate`, async function (req, res, next) {
    if (typeof req.body.slug !== "string") {
        res.json({
            title: "slug-generate failed",
            message: JSON.stringify(err),
            level: "error",
            error: true
        })
        return
    }
    var slug = helpers.textToSlug(req.body.slug)
    try {
        var result = await categoryModel.findOne({ slug: slug })
    } catch (error) {
        var err = error
    }
    if (err || result) {
        res.json({
            title: "slug-generate failed",
            message: JSON.stringify(err) || 'slug alrdely extixt',
            level: "error",
            error: true
        })
        return
    }
    res.json({
        "slug": slug
    })
})
router.post(`/${admin_path}/category/add`, async function (req, res, next) {
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + "/../public/images",
    });
    form.parse(req, function (err, fields, files) {
        try {
            var category = new categoryModel({
                name: helpers.sanitize(fields.name),
                description: helpers.sanitize(fields.description),
                slug: helpers.textToSlug(fields.slug),
                parent: sequelize.Types.ObjectId(helpers.sanitize(fields.parent))
            })
            var result = categoryModel.findOne({ slug: category.slug })
            if(!result){
                category.save()
            }else{
                res.json({
                    title: "category alredy exits",
                    message: "category alredy exits",
                    level: "error",
                    error: true
                })
                return
            }
        } catch (err) {
            res.json({
                title: "Submit failed",
                message: JSON.stringify(err),
                level: "error",
                error: true
            })
            return
        }
        res.json({
            title: "Submit successful",
            message: "<span>Category insert successful</span><a href='/category/" + category.slug + "'> " + unescape(category.name) + "</a>",
            level: "success"
        })
    })
})


router.post(`/${admin_path}/logout`, loginService.checkLoggedIn,async function (req, res, next) {
    req.session.destroy(function(err) {
        return res.redirect("/");
    });
})



module.exports = router 
