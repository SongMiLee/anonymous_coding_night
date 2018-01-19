var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

//common config
const db = require('./common/db');
const config = require('./common/config.json');

//add the view page
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(cookieParser());
app.use(session({
  //store  : new MongoStore(res),
  key    : 'anony',
  secret : config.anony.secretKey,
  resave : false,
  saveUninitialized : true,
  cookie : {
    maxAge : 60 * 60 * 1000
  },
}));

db.connection.then(function(res){
  console.log("db connected");
});

//add router
require('./router/index').setup(app, '/');
require('./router/api').setup(app, '/api');
require('./router/mypage').setup(app, '/mypage');

module.exports = app;
