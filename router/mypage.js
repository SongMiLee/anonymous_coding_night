
var setup = function(app, root){
  app.get(root + "?:id", function(req, res){
    res.render('mypage');
  });

  app.get(root, function(req,res){
    res.redirect('/');
  });
};

exports.setup = setup;
