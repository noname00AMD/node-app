var fs = require("fs");
var connectToDatabase = require("../database")
var cache = require("../cache");

var express = require('express');
var router = express.Router();
var UAparser = require("ua-parser-js")
var helpers = require("../helpers")
var mime = require("mime")

var admin_path = process.env.ADMIN_PATH
// router.get(`/media`, async function (req, res, next) {
//     var props = {}
//     var db = await connectToDatabase()
//     props.categories = await db.collection('categories').find({}, { _id: false }).toArray()
//     props.site_info = await db.collection('site_info').findOne({}, { _id: false })
//     props.admin_path = admin_path
//     res.render('admin_dashboard', { props: props, cache: false, filename: "" });

// })




// #post
router.post(`/media/upload`, async function (req, res, next) {
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
        if (files.photo.size > 1024 * 800) {
            res.send({
                error: true,
                title: 'Upload failed',
                message: 'Max file size 800kb',
                level: 'error'
            })
            return
        }
        fs.rename(files.photo.filepath, "public/images/" + date1 + "-" + files.photo.size + "-" + files.photo.newFilename + "." + mime.extension(files.photo.mimetype), function (err) {
            if (err) {
                res.send({
                    error: true,
                    title: 'Upload failed',
                    message: err,
                    level: 'error'
                })
                return
            }
            res.send({
                default: "/images/" + date1 + "-" + files.photo.size + "-" + files.photo.newFilename + "." + mime.extension(files.photo.mimetype)
            })
        });
    });
})
router.post(`/media/thumb-upload`, async function (req, res, next) {
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
        if (files.thumb.size > 1024 * 300) {
            res.send({
                error: true,
                title: 'Upload failed',
                message: 'Max file size 300kb',
                level: 'error'
            })
            return
        }
        fs.rename(files.thumb.filepath, "public/images/" + date1 + "-" + files.thumb.size + "-" + files.thumb.newFilename + "." + mime.extension(files.thumb.mimetype), function (err) {
            if (err) {
                res.send({
                    error: true,
                    title: 'Upload failed',
                    message: err,
                    level: 'error'
                })
                return
            }
            res.send({
                default: "/images/" + date1 + "-" + files.thumb.size + "-" + files.thumb.newFilename + "." + mime.extension(files.thumb.mimetype)
            })
        });
    });
})

module.exports = router 
