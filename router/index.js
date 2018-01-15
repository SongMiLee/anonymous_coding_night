require('date-utils');

var setup = function(app, root){
  app.get('/', function(req, res){
    res.render('index');
  });

  app.post('/signup', function(req, res){
    var dt = new Date();
    var user = {
      user_id : Math.floor(dt),
      user_email : req.body.user_email,
      user_pwd   : req.body.user_pwd,
      join_date  : dt.toFormat('YYYY-MM-DD HH24:MI:SS'),
    };

    global.db.collection("users").find({user_email : user.user_email}).toArray(function(err, result){
      console.log(result.length);
      if(result.length == 0){
        global.db.collection("users").insertOne(user, function(err, result){
          if(err) res.send({ret: 1, data:err});
          res.send({ret:0, data:user.user_id});
        });
      }else{
        res.send({ret:1, data:"This email is used."});
      }
    });
  });

  app.post('/signin', function(req, res){
    var user = {
      user_email : req.body.user_email,
      user_pwd   : req.body.user_pwd,
    };

    global.db.collection("users").find(user).toArray(function(err, result){
      if(err) res.send({ret: 1, data:err});
      if(result.length == 0){
        res.send({ret:1, data:"You're not our Member! Please Sign Up!"});
      }else{
        res.send({ret:0, data:result[0].user_id});
      }
    });
  });

  app.post('logout', function(req, res){
    req.session.destroy();
    res.send({ret:0});
  });
};

exports.setup = setup;
