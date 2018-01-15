var setup = function(app, root){
  app.get(root + "?:id", function(req, res){
    let id = req.params.id;
    res.render('main');
  });

  app.get(root, function(req,res){
    res.redirect('/');
  });
};


exports.setup = setup;
