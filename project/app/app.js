var express = require('express');
var path = require('path');
const mysql = require('mysql');
var expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
var md5 = require('md5');

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection');

var app = express();

global.SiteTitle = "Node Express Project";
global.baseURL = "http://localhost:7000/";

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config');
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}

/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'));

/**
 * setting up the templating view engine
 */ 
app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('app/public'));
app.use(express.static('app/uploads'));

/**
 * import routes/index.js
 * import routes/home.js
 */ 
const index = require('./routes/index');
const home = require('./routes/home');
const category = require('./routes/category');
const upload_file = require('./routes/upload_file');
const user = require('./routes/user');

/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 
var bodyParser = require('body-parser');
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(fileUpload());

app.set('port', process.env.PORT || 7000);


var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))
app.use(flash())


app.use('/', index);
app.use('/home', home);
app.use('/category', category);
app.use('/upload_file', upload_file);
app.use('/user', user);


var Server = app.listen(app.get('port'),function(){
    console.log("listen port " + app.get('port'));
});