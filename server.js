// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var handlebars = require('express3-handlebars');


// configuration ===========================================
    
// config files
//var db = require('./config/db');
var mongoose = require('mongoose');
var local_database_name = 'settl';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);



app.use(cookieParser())
app.use(bodyParser.urlencoded());
app.use(logger('dev'))
var sess = {
  secret: 'settl key',
  cookie: {}
}
app.use(session(sess))
app.use(favicon(__dirname + '/public/icons/favicon.ico'));

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var add =  require('./routes/add');
var menu = require('./routes/menu');
var about = require('./routes/about');
var login = require('./routes/login');
//var newProfile = require('./routes/newProfile');
var newp = require('./routes/newp');
var matches = require('./routes/matches');
var detailedInfo1 = require('./routes/detailedInfo1');
var detailedInfo2 = require('./routes/detailedInfo2');
var detailedInfo3 = require('./routes/detailedInfo3');
var existing = require('./routes/existing');
var signup = require('./routes/signup');
var setting = require('./routes/setting');
var submit_type = require('./routes/submit_type');
var update_type = require('./routes/update_type');
var update_list = require('./routes/update_list');
var user = require('./routes/user');

// set our port
var port = process.env.PORT || 8080; 

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Add routes here
app.get('/', index.view);
app.get('/add', add.addFriend);
app.get('/menu', menu.view);
app.get('/about', about.view);
//app.get('/newProfile', newProfile.view);
app.get('/newp',newp.view);
app.get('/setting',setting.view);
//app.get('/setting/set',setting.set);
app.get('/matches', matches.view);
app.get('/existing', existing.view);
app.get('/detailedInfo1', matches.seeDetail1);
app.get('/detailedInfo2', matches.seeDetail2);
app.get('/detailedInfo3', matches.seeDetail3);
app.get('/signup',signup.view);
app.post('/login/signup', login.sign_up_check);
app.get('/login/logout', login.logout);

app.post('/login', login.log_in_check);
app.get('/user', user.userInfo);
app.post('/user/save', user.save);
app.get('/user/get_name', user.displayUser);
app.get('/user/get_prof', user.displayProf);
app.post('/submit_type/save/:name', submit_type.save);
app.get('/submit_type/done/:name', submit_type.done);
app.get('/submit_type/:name', submit_type.submitForm);
app.get('/submit_type/submit/submit', submit_type.submit);
app.get('/submit_type/init/:name', submit_type.init);

app.get('/update_type/display/:id', update_type.displayProfile);
app.get('/update_list/:type', update_list.update);
app.get('/matches/getMatches/:id', matches.getMatches);

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
//mongoose.connect(database.url); 


// set the static files location /public/img will be /img for users
//app.use(express.static(__dirname + '/public')); 

// routes ==================================================
//require('./routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;   
