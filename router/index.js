'use strict';

var setup = function(app, root){
  app.get(root , function(req, res){
    if(req.session.user_id){
      res.render('feed', { user_id : req.session.user_id});
    } else {
      res.render('main');
    }
  });

  app.get(root + '/feed', function(req, res){
    res.render('feed', { user_id : req.session.user_id});
  })

  app.get(root + '/mypage', function(req, res){
    res.render('mypage', { user_id : req.session.user_id});
  })
};

exports.setup = setup;
