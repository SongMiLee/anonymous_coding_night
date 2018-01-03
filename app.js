var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//add the view page
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//start the server
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret : '@@1234@@',
  resave : false,
  saveUninitialized : true
}));

//add router
var router = require('./router/main')(app);
