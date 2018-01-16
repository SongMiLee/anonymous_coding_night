var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
//var mongo = require('./common/db');

//add the view page
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//db connect
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var config = require('./common/config.json');
var dbInfo = config.anony.dbConfig;
var uri = "mongodb://"+dbInfo.username+":"+dbInfo.password+"@"+dbInfo.host;
var db;

MongoClient.connect(uri, function(err, database){
  if(err) throw err;

  db = database;
  global.db = db;

  var port = process.env.PORT || 8080;

  //start the server
  var server = app.listen(port, function(){
      console.log("Express server has started on port : " + port);
  });

});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  key    : 'anony',
  secret : '@@1234@@',
  resave : false,
  saveUninitialized : true,
  cookie:{
    maxAge: 1000 * 60 * 60
  }
}));

//Authentication
global.auth = function(req, res, user_id){
  req.session.user_id = user_id;
};

//add router
require('./router/index').setup(app, '/');
require('./router/main').setup(app, '/main');
require('./router/api').setup(app, '/api');
require('./router/mypage').setup(app, '/mypage');
