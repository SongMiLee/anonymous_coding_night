var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const db = require('./common/db');
const MongoStore = require('connect-mongodb-session')(session);
const config = require('./common/config.json');

//add the view page
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

db.connection.then(function(res){
  console.log("db connected");

});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
  store  : new MongoStore({
    uri : 'mongodb://' + config.anony.dbConfig.host,
    collection : 'session'
  }),
  key    : 'anony',
  secret : config.anony.secretKey,
  resave : false,
  saveUninitialized : true,
  cookie : {
    maxAge   : 60 * 60 * 1000
  }
}));

//add router
require('./router/index').setup(app, '/');
require('./router/main').setup(app, '/main');
require('./router/api').setup(app, '/api');
require('./router/mypage').setup(app, '/mypage');

module.exports = app;
