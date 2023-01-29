require("dotenv").config()
var db = require("./database")()
console.log(db)
db.then(ss=>{
    ss.sql("SELECT * FROM `category`;").execute().then((result, err) => {
        console.log(result.fetchAll())
    })
})