var mysql  = require('mysql');
var express = require('express');
var router = express.Router();

//database connection


/* GET home page. */
router.get('/', function(req, res, next) {

  console.log('hello')
});



module.exports = router;
