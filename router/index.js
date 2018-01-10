var setup = function(app, root){
  app.get('/', function(req, res){
    res.render('index');
  });
};

exports.setup = setup;
