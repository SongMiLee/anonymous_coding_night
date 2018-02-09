require('date-utils');

var setup = function(app, root){
  app.post(root + '/getinfo', function(req, res){
    global.db.collection("users").find({user_id : req.session.user_id}).toArray(function(err, result){
      if(err) throw res.send({ ret: 1, data: err});
      res.send({ ret: 0, data : result[0]});
    });
  });

  app.post(root + '/updateinfo', function(req, res){
    var query = { user_id : req.session.user_id };
    var update_user = {
      $set : { user_pwd   : req.body.user_pwd }
    };

    global.db.collection("users").updateOne(query, update_user, function(err, result){
      if (err) res.send({ret : 1, data : error});
      res.send({ret : 0});
    });
  });
}

exports.setup = setup;
