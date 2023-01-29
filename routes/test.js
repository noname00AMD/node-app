var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render("test", {
    title: 'test',
    message: "testttttttt"
  });
});
router.post('/', function (req, res, next) {
  res.json({
    a:"b"
  })

});

module.exports = router;
