let {dbname, host, password, port, user} = {
    host: process.env.MYSQL_URI,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    dbname: process.env.MYSQL_DBNAME,
    port: process.env.MYSQL_PORT
}
var conn = null;
const mysql = require('mysql2');
var pool =mysql.createPool({
         user: user,
         password: password,
         host: host,
         port: Number(port),
         database        : dbname,
         waitForConnections:true,
         connectionLimit: 25,

     })
pool.on("connection",(e)=>{
    console.log("database connected")
})
pool.on("release",(e)=>{
    console.log("database release")
})
module.exports = function () {
     return pool
};
