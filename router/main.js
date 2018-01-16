var setup = function(app, root){
  app.get(root, function(req,res){
    res.redirect('main');
  });
};


exports.setup = setup;
