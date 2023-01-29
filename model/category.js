var databaseconn = require("../database")


var cat = {}
cat.create = function (category) {
    var conn = databaseconn()
    return new Promise((resolve, reject) => {
        conn.query("insert into category (cate_name , slug , visible , size , parent , type ,discription) values  ()", function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            cat.findAll().then((rs, err) => {
                if (err) {
                    console.log("err", err)
                    return
                }
                cat = allCategory = rs;
                return resolve(rows)
            })
        })
    })
}
cat.findAll = function () {
    var conn = databaseconn()
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM category;", function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            return resolve(rows)
        })
    })
}
cat.findById = function (id) {
    var conn = databaseconn()
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM category where  id = ?;", [id], function (err, rows, fields) {
            if (err) {
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

cat.findAll().then((rs, err) => {
    if (err) {
        console.log("err", err)
        return
    }
    cat.allCategory = rs
})


module.exports = cat