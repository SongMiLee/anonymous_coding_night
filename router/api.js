require('date-utils');

var setup = function(app, root){
  app.get(root + '/test', function(req, res){
    res.redirect('/');
  });

  app.post(root + '/sendfeed', function(req, res){
    var dt = new Date();
    var feed = {
      user_id : req.body.user_id,
      feed_text : req.body.feed_text,
      feed_date : dt.toFormat('YYYY-MM-DD HH24:MI:SS'),
    };

    if(feed.user_id != null){
      global.db.collection("feeds").insertOne(feed, function(err, result){
        if(err) throw err;
        res.send({ret:0});
      });

    }else{
      res.send({ret:1, error:"Internal Error"});
    }
  });

  app.post(root + '/loadfeed', function(req, res){
    global.db.collection("feeds").find({}).toArray(function(err, result){
      if(err) throw res.send({ret:0, error: err});
      res.send({ret:0, feeds: result});
    });
  });
};

exports.setup = setup;
