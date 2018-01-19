'use strict';

var setup = function(app, root){
  app.get('/', function(req, res){
    if(req.session.user_id != null){
      res.redirect('main');
    }else{
      res.render('index');
    }
  });

  app.get('/main', function(req, res){
    res.render('main', { user_id : req.session.user_id});
  })

  app.get('/mypage', function(req, res){
    res.render('mypage', { user_id : req.session.user_id});
  })
};

exports.setup = setup;
