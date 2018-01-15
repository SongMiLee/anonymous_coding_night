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
  secret : '@@1234@@',
  resave : false,
  saveUninitialized : true
}));

//Authentication

var auth = function(req, res, next){
  if(req.session && req.session.user_id != null && req.session.user_email != null){
    return next();
  }else{
    return res.redirect('/');
  }
}

//add router
require('./router/index').setup(app, '/');
require('./router/main').setup(app, '/main');
require('./router/api').setup(app, '/api');
