module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', {
      title : "Express Home",
      length : 5
    });
  });

  app.get('/main', function(req,res){
    res.render('main');
  });
}
