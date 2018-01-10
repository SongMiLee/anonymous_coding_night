var setup = function(app, root){
  app.get(root + '/test', function(req, res){
    res.redirect('/');
  });
};

exports.setup = setup;
