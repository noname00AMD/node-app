var databaseconn = require("../database")


var siteInfo = {}
siteInfo.create = function (key,value) {
    var conn = databaseconn()
    return new Promise((resolve, reject) => {
        conn.query("insert into siteInfo (key, value) values  (?,?)",[key , value], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            siteInfo.findAll().then((rs, err) => {
                if (err) {
                    console.log("err", err)
                    return
                }
                siteInfo = allSiteInfo = rs;
                return resolve(rows)
            })
        })
    })
}
siteInfo.findAll = function () {
    var conn = databaseconn()
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM siteInfo;", function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            return resolve(rows)
        })
    })
}
siteInfo.findById = function (id) {
    var conn = databaseconn()
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM siteInfo where  id = ?;", [id], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

siteInfo.findAll().then((rs, err) => {
    if (err) {
        console.log("err", err)
        return
    }
    siteInfo.allsiteInfo = rs
})


module.exports = siteInfo