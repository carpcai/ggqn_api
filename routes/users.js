var mysql  = require('mysql');
var express = require('express');
var router = express.Router();

//database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port: '3306',
  database: 'twnews',
});
connection.connect();
var  userGetSql = 'SELECT * FROM test LIMIT 4,4';

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query(userGetSql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    res.status(500).send("error")
    return;
  }
  res.json(result);
  console.log('hello')
  });
});



module.exports = router;
