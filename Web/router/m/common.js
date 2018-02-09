var setup = function(app, root){

  app.post(root + '/login', function(req, res){
    var user = {
      user_email  : req.body.user_email,
      user_pwd    : req.body.user_pwd,
    };

    global.db.collection("users").find(user).toArray(function(err, result){
      if(err) res.send({ret: 1, data:err});
      if(result.length == 0){
        res.send({ret:1, data:"You're not our Member! Please Sign Up!"});
      }else{
        res.send({ret:0, data: result});
      }
    });

  });

  app.post(root + '/register', function(req, res){
    var dt = new Date();
    var user = {
      user_id    : Math.floor(dt),
      user_name  : req.body.user_name,
      user_email : req.body.user_email,
      user_pwd   : req.body.user_pwd,
      join_date  : dt.toFormat('YYYY-MM-DD HH24:MI:SS'),
    };

    global.db.collection("users").find({user_email : user.user_email}).toArray(function(err, result){
      if(result.length == 0){
        global.db.collection("users").insertOne(user, function(err, result){
          if(err) res.send({ret: 1, data:err});
          res.send({ret:0, data: user.user_id});
        });
      }else{
        res.send({ret:1, data:"This email is used."});
      }
    });
  });

}

exports.setup = setup;
