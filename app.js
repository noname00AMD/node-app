require("dotenv").config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
var passport = require("passport");

var appRouter = require('./routes/web.js');
var adminRouter = require('./routes/admin.js');

var connectToDatabase = require("./database")
var cors = require("./cors")


var app = express();
// app.disable('x-powered-by')
// view engine setup
app.set('trust proxy', 1) // trust first proxy
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(cors)
app.use(express.json());
// app.use(function(req, res, next) {
//     if (req.secure) {
//         res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
//     }
//     next();
// })
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        secure: true, // == true if use HTTPS
        maxAge: null,
        domain: undefined,
        expires: new Date(Date.now() + 14 * 24 * 60 * 60), // == maxAge = 14 day
    },
    key: "inden",
    secret: 'keyboard 32bit',

    resave: true,
    rolling: true,
    unset: 'keep',// or destroy
    saveUninitialized: true,
    store: new MySQLStore({
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 14 * 24 * 60 * 60,
        createDatabaseTable: true,
    }, connectToDatabase().promise())
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(appRouter);

//--------------- admin -------------------------------
app.use(adminRouter);


// ----------------- API ------------------//


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
// const googleTTS = require('google-tts-api')
// const url = googleTTS.getAudioUrl('<p>việt nam vô địch</p>', {
//     lang: 'vi',
//     slow: false,
//     host: 'https://translate.google.com',
//   });
//   console.log(url)
