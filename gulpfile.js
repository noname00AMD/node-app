var gulp = require("gulp")
var sass = require("gulp-sass")
var ejs =require("gulp-ejs")
var rename = require("gulp-rename")
var browsersync = require("browser-sync").create()
gulp.task("reload", function(){
    browsersync.reload();
})
gulp.task("serve", function(){
    gulp.watch("./sass/", gulp.series(["sass", "reload"]))
    gulp.watch("./public/js/", gulp.series(["reload"]))
    gulp.watch("./views/", gulp.series(["ejs","reload"]))
    require("./server")
    browsersync.init({ 
            proxy : "https://localhost:3000" ,
            online : true
        
     })
    // browsersync.init({server:{
    //     baseDir: "./public"
    // }})
})
gulp.task("sass", function(){
    return gulp.src('./sass/**.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
})
gulp.task("ejs", function(){
    return gulp.src('./views/**.ejs')
    .pipe(ejs({}))
    .pipe(rename({extname:".html"}))
    .pipe(gulp.dest('./public/'))
})
gulp.task("default",gulp.series(["sass","ejs","serve"]))

