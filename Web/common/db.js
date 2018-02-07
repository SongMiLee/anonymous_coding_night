const Promise = require('es6-promise').Promise;

//db connect
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');
const dbInfo = config.anony.dbConfig;
const uri = "mongodb://"+dbInfo.username+":"+dbInfo.password+"@"+dbInfo.host;

var connection = new Promise(function(resolve, reject){
  MongoClient.connect(uri, function(err, database){
    if(err) throw reject(err);
    global.db = database;
    resolve(database);
  });
});

exports.connection = connection;
