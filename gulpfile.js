var gulp = require("gulp")
var sourcemaps = require('gulp-sourcemaps');
var sass = require("gulp-sass")(require("sass"))
var browsersync = require("browser-sync").create()
var nodemon = require("nodemon")
gulp.task("reload", function (done) {
  browsersync.reload();
  done()
})
gulp.task("serve", function (done) {
  nodemon({
    script: './bin/www',
    ext: 'js json'
  });
  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
    process.exit();
  }).on('restart', function (files) {
    gulp.series(["reload"])
    console.log('App restarted due to: ', files);
  });
  // require("./bin/www")
  setTimeout(() => {
    browsersync.init({
      proxy: "localhost:5000",
      port: 5001,
      online: true
    })
  }, 800) // time ti starting app
  done()
})

gulp.task("sass", function () {
  return gulp.src('./sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(['./public/css/']))
})

gulp.watch("./views/", gulp.series(["reload"]))
gulp.watch("./sass/", gulp.series(["sass", "reload"]))
gulp.watch("./public/js/", gulp.series(["reload"]))
gulp.task("default", gulp.series(["sass", "serve"]))

