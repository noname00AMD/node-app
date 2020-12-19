var assert = require("assert")
// var debug = require("./app/debug")
var https = require("https")
var http = require("http")
// app.js
// câu hỏi vui: Đoán kết quả lệnh (1) và lệnh (2) :cười:
var obj = {
    mMethod: function() {
        console.log(this)
    }
}

obj.mMethod(); // (1)

// var _mMethod = obj.mMethod;
// _mMethod();  // (2)