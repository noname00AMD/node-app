// const sequelize = require('sequelize');
// var userShema = new sequelize.Schema({
//     slug: {
//         type: String,
//         required: true,
//         maxLenght: 300,
//     },
//     username: {
//         type: String,
//         required: true,
//         maxLenght: 300,
//     },
//     email: {
//         type: String,
//         required: true,
//         maxLenght: 300,
//     },
//     passeord: {
//         type: String,
//         required: true,
//         maxLenght: 300,
//     },
//     bio: {
//         type: String,
//         required: true,
//         maxLenght: 300
//     },
//     userType: {
//         type: String,
//         required: true,
//         maxLenght: 30,
//         default: "user"
//     },
//     status: {
//         type: String,
//         required: true,
//         default: "hidden"
//     },
//     dateCreate: {
//         type: Date,
//         required: true,
//         // default: Date.now
//     }
// })
// var userModel = sequelize.model("user", userShema)
// // var test = new userModel({
// //     slug: "a",
// //     username: "admin",
// //     passeord: "admin",
// //     email: "a#gmail.com",
// //     bio: "ok",
// //     userType: "admin",
// //     status: "active",
// //     dateCreate: Date.now()
// // })
// // test.save()
// module.exports = userModel
