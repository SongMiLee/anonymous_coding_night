require('date-utils');

var setup = function(app, root){
  app.get(root + '/test', function(req, res){
    res.redirect('/');
  });

  app.post(root + '/signup', function(req, res){
    var dt = new Date();
    var user = {
      user_id    : Math.floor(dt),
      user_email : req.body.user_email,
      user_pwd   : req.body.user_pwd,
      join_date  : dt.toFormat('YYYY-MM-DD HH24:MI:SS'),
    };

    global.db.collection("users").find({user_email : user.user_email}).toArray(function(err, result){
      if(result.length == 0){
        global.db.collection("users").insertOne(user, function(err, result){
          if(err) res.send({ret: 1, data:err});
          req.session.user_id = user.user_id;
          res.send({ret:0, data: ""});
        });
      }else{
        res.send({ret:1, data:"This email is used."});
      }
    });
  });

  app.post(root + '/signin', function(req, res){
    var user = {
      user_email : req.body.user_email,
      user_pwd   : req.body.user_pwd,
    };

    global.db.collection("users").find(user).toArray(function(err, result){
      if(err) res.send({ret: 1, data:err});
      if(result.length == 0){
        res.send({ret:1, data:"You're not our Member! Please Sign Up!"});
      }else{
        req.session.user_id = result[0].user_id;
        console.log(req.session);
        res.send({ret:0, data: ""});
      }
    });
  });

  app.post(root + '/logout', function(req, res){
    req.session.destroy();
    res.send({ret:0});
  });

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
    global.db.collection("feeds").find({}).toArray(function(err, result){
      if(err) throw res.send({ret:0, error: err});
      res.send({ret:0, feeds: result});
    });
  });
};

exports.setup = setup;
