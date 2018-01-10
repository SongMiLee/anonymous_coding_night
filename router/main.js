var setup = function(app, root){
  app.get(root, function(req,res){
    res.render('main');
  });
};


exports.setup = setup;
