var mysql  = require('mysql');
var express = require('express');
var router = express.Router();

//database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'twdataA302',
  port: '3306',
  database: 'twnews',
});
connection.connect();

router.get('/', function(req, res, next) {
  res.render('news', { title: 'dgut.ren', message: 'news api !'});
});

/* GET later news list api. */
router.get('/list', function(req, res, next) {
  userGetSql = 'Select id,title,keywords,source,pubdate,litpic From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit 0,10';
  connection.query(userGetSql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    res.status(500).send("error")
    return;
  }
  res.json(result);
  //console.log('hello')
  });
});

/* GET later news list of paging api. */
router.get('/list/:page', function(req, res, next) {
  userGetSql = 'Select id,title,keywords,source,pubdate,litpic From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit '+ connection.escape(10*req.params.page)+',10';
  connection.query(userGetSql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    res.status(500).send("error")
    return;
  }
  res.json(result);
  //console.log('hello')
  });
});

/* GET later news api. */
router.get('/latest', function(req, res, next) {
	var final_result="";
	//userGetSql = 'Select id,title,writer,source,pubdate,litpic,description From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit 0,10';
	stories_sql = 'Select id,title,pubdate,litpic From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit 0,10';
	connection.query(stories_sql,function (err, result) {
	if(err){
		console.log('[SELECT ERROR] - ',err.message);
		res.status(500).send("error")
		return;
	}
	top_stories_sql="Select id,title,litpic From `dede_archives` where channel=1 And FIND_IN_SET('f',flag) order by id desc limit 0,5";

	connection.query(top_stories_sql,function (err1, top_result) {
		if(err1){
			console.log('[SELECT ERROR] - ',err1.message);
			res.status(500).send("error")
			return;
		}
		final_result={"date":"123","stories":result,"top_stories":top_result};
		res.send(final_result);
	});
  });
});

/* GET start-image api. */

router.get('/start-image/1080*1776', function(req, res, next) {
	result={"text":"\"DGUT\" © 校团委网络技术部","img":"http:\/\/api.dgut.ren\/images\/1.jpg"};
	res.json(result);
	console.log('hello');
});

/* GET slide-image api. */
router.get('/later_news', function(req, res, next) {
  userGetSql = "Select id,title,litpic From `dede__archives` where channel=1 And FIND_IN_SET('f',flag) order by id desc limit 0,5";
  connection.query(userGetSql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    res.status(500).send("error")
    return;
  }
  res.json(result);
  //console.log('hello')
  });
});



/* GET later news of paging api. */
router.get('/latest/:page', function(req, res, next) {
  userGetSql = 'Select id,title,writer,source,pubdate,litpic,description From `dede_archives` where channel=1 And arcrank = 0 order by id desc limit '+ connection.escape(10*req.params.page)+',10';
  connection.query(userGetSql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    res.status(500).send("error")
    return;
  }
  res.json(result);
  //console.log('hello')
  });
});

module.exports = router;
