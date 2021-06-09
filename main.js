var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/laptops', require('./laptops.js'));
app.use('/update', require('./update.js'));
app.use('/list', require('./list.js'));
app.use('/refresh_db', require('./refresh_db.js'));

//search laptops by cpu or gpu
app.use('/search_laptops_cpu',require('./search_laptops_cpu.js'));
app.use('/search_laptops_graphics',require('./search_laptops_graphics.js'));

// adds
app.use('/add_manufacturer', require('./add_manufacturer.js'));
app.use('/add_cpu', require('./add_cpu.js'));
app.use('/add_graphics', require('./add_graphics.js'));
app.use('/add_laptop_cpus', require('./add_laptop_cpus.js'));
app.use('/add_laptop_graphics', require('./add_laptop_graphics.js'));

// home
app.get('/', (req, res) => {
  if (require('./refresh_db_auto.js') === 1) {
    res.render('index');
  }
  else {
    res.render('index');
  }
});

// delete
app.use('/delete_laptop', require('./delete_laptop.js'));

app.get('/about', (req, res) => {
  res.render('about');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// app.listen(app.get('port'), function(){
//   console.log('laptop-db started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});