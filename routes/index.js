var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'dgut.ren', message: 'Hello there. I am wesite\'s api !'});
});


module.exports = router;
