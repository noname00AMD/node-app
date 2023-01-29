//  const sequelize = require('sequelize');
// var articleShema = new sequelize.Schema({
//     slug: {
//         type: String,
//         required: true,
//         maxLenght: 300,
//         minLenght: 30
//     },
//     title: {
//         type: String,
//         required: true,
//         maxLenght: 300,
//         minLenght: 30
//     },
//     description: {
//         type: String,
//         required: true,
//         maxLenght: 450,
//         minLenght: 30
//     },
//     brief: {
//         type: String,
//         required: true,
//         maxLenght: 450,
//         minLenght: 30
//
//     },
//     lang: {
//         type: String,
//         required: true,
//         maxLenght: 30,
//         default: "vi"
//     },
//     category: {
//         type: sequelize.Types.ObjectId,
//         required: true,
//         ref: ''
//     },
//     thumbType: {
//         type: String,
//         required: true,
//         maxLenght: 30,
//         default: "wide"
//     },
//     status: {
//         type: String,
//         required: true,
//         default: "hidden"
//     },
//     date: {
//         type: Date,
//         required: true,
//         // default: Date.now
//     },
//     like: {
//         default: 0,
//         type: Number,
//         required: true,
//     },
//     author: {
//         ref: '',
//         type: sequelize.Types.ObjectId,
//         required: true
//     },
//     content: {
//         required: true,
//         type: String
//     }
// })
// var article = sequelize.model("article", articleShema)
// // var test = new siteInfo(require("../mongo tool/siteInfo.json"))
// // test.save()
// module.exports = article
