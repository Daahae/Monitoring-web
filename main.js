var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var studentSQLModule = require('./sqlLib/studentSQLModule.js');
var profSQLModule = require('./sqlLib/profSQLModule.js');
var classSQLModule = require('./sqlLib/classSQLModule.js');
var scoreSQLModule = require('./sqlLib/scoreSQLModule.js');
var mysql = require('mysql');

app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); //default엔진을 html로
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

var conn = mysql.createConnection({
  host: '13.125.192.103',
  port: '3306',
  user: 'test',
  password: '111111',
  database: 'hackathondb'
});
conn.connect();

app.get('/test', function(req, res) {

  var profInfo = profSQLModule.getInfo(conn);
  var studentInfo = studentSQLModule.getInfo(conn);
  var classInfo = studentSQLModule.getInfo(conn);
  var scoreInfo = scoreSQLModule.getNot100Info(conn,1,1);


  res.send(scoreInfo);
})

app.get('/', function(req, res) {
  var studentInfo = studentSQLModule.getInfo(conn);
  res.render('starter.html', {
    studentInfo: studentInfo
  });
})

app.get('/index', function(req, res) {
  res.render('index.html');
})

app.get('/index2', function(req, res) {
  res.render('index2.html');
})

app.listen(3000, function() {
  console.log('Connected, 3000port!!');
});
