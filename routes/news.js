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

router.get('/', function(req, res, next) {
  res.render('news', { title: 'dgut.ren', message: 'news api !'});
});

/* GET later news api. */
router.get('/later_news', function(req, res, next) {
  userGetSql = 'Select id,title,pubdate From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit 0,10';
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

/* GET later news api. */
router.get('/later_news/:page', function(req, res, next) {
  userGetSql = 'Select id,title,pubdate From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit '+10*req.params.page+',10';
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
