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

app.use( function(req,res,next) {
    return next();
});

app.route(/^\/$/).all(function(req, res, next){
  req.url = '/main';
  next();
});

app.route(/^\/main(?:\/(.*))?$/).all(function(req, res, next){
  if(req.session.user_id){
    next();
  } else{
    req.url = '/main';
    next();
  }
});

//add router
require('./router/index.js').setup(app, '/main');
require('./router/common.js').setup(app, '/common');
require('./router/feed.js').setup(app, '/feed');
require('./router/info.js').setup(app, '/info');
require('./router/m/common.js').setup(app, '/m/common');

app.use(function(req, res, next){
  res.status(404).send('Page Not found');
});

module.exports = app;
