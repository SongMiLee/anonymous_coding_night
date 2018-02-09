require('date-utils');

var setup = function(app, root){

  app.post(root + '/sendfeed', function(req, res){
    var dt = new Date();
    var feed = {
      user_id : req.session.user_id,
      feed_text : req.body.feed_text,
      feed_date : dt.toFormat('YYYY-MM-DD HH24:MI:SS'),
    };

    if(feed.user_id != null){
      global.db.collection("feeds").insertOne(feed, function(err, result){
        if(err) throw err;
        res.send({ret:0});
      });

    }else{
      res.send({ret:1, error:"user id is null"});
    }
  });

  app.post(root + '/loadfeed', function(req, res){
    global.db.collection("feeds").find({}).sort({feed_date:-1}).toArray(function(err, result){
      if(err) throw res.send({ret:1, data: err});
      res.send({ret:0, data: result});
    });
  });

  app.post(root + '/loadmyfeed', function(req, res){
    global.db.collection("feeds").find({user_id : req.session.user_id}).toArray(function(err, result){
      if(err) throw res.send({ret:1, data: err});
      res.send({ret:0, data: result});
    });
  });

}

exports.setup = setup;
