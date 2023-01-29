var connection = require("../database");
var bcrypt = require("bcryptjs");
var passport = require("passport");

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where email = ?", email, function (error, rows) {
                if (error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        } catch (e) {
            reject(e);
        }
    })
};

let compareUserPassword = (user, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let match = await bcrypt.compare(password, user.password);

            if (match) resolve(true);
            else resolve("The password that you've entered is incorrect")
        } catch (e) {
            reject(e);
        }
    })
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query("SELECT * from users where id = ?", id, function (error, rows) {
                if (error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        } catch (e) {
            reject(e);
        }
    })
};

let handleLogin = (req, res, next) => {
    // console.log("herr")
    passport.authenticate("localLogin", function (error, user, info) {
        if (error) {
            return res.status(500).json(error);
        }
        if (!user) {
            return res.status(401).json(info.message);
        }
        req.login(user, function (err) {
            if (err) {
                return res.status(500).json(error);
            } else {
                return res.status(200).json(user);
            }
        });
    })(req, res, next);
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) => {
    req.session.destroy(function (err) {
        return res.redirect("/login");
    });
};

module.exports = {
    handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut,
    compareUserPassword: compareUserPassword,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
};