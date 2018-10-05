/* Import all node modules */
/* @Core node modules */

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
var session = require('client-sessions');
var md5 = require('md5');
var expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');

/* Parse all form data */
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(fileUpload());

/* @Used for formatting dates */
var dateFormat = require('dateformat');
var now = new Date();

/**
 * This is view engine
 * Template parsing
 * We are using EJS types
 */
app.set('view engine','ejs');

/** Import all related Javascript and css files to inject in our APP */

app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/assets',express.static(__dirname + '/assets'));

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

/**
 * 
 * Database is connection details
 * Localhost - When in production mode change this to your host
 * User - User name of the database
 * Password - Database password
 * Database - Database is the name of the database
 */
const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "ishoutnow"
});

/** Global site title and base url */
const siteTitle = "Simple Application";
const baseURL = "http://localhost:4000/";

/**
 * 
 * When page is loaded 
 * Default page is loaded and the data is being called from MySQL database
 * We also adding some Javascript and CSS styles
 * For all the dependencies - see the package.json file for more information
 * 
 */
// app.get('/',function(req,res){
//     res.render('pages/index',{
//         siteTitle : siteTitle,
//         pageTitle : "Event List",
//         items   :   ''
//     });
// });
app.get('/api',function(req,res){
    con.query('select * from isn_category_details order by category_id desc',function(err,result){
        res.json(result);
    }); 
});

app.get('/api',function(req,res){
    con.query('select * from isn_category_details order by category_id desc',function(err,result){
        res.json(result);
    }); 
});

app.get('/',function(req,res){
    if (req.session && req.session.user_id) { // Check if session exists
        res.redirect(baseURL+'home');
    } else {
        res.render('pages/login',{
            siteTitle : siteTitle,
            pageTitle : "User Login",
            errors      : '',
            loginData   : '',
            returnMsg   : ''
        });
    }
});

/** This is a POST method to data and pre-populate to the firm */
app.post('/',function(req,res){
    req.checkBody('email_id', 'Email is required.').notEmpty();
    req.checkBody('email_id', 'Email is not valid').isEmail(); 
    req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var loginData = req.body;
    var errors = req.validationErrors();
    if(errors) {
        res.render('pages/login', {
            siteTitle : siteTitle,
            pageTitle : "User Login",
            loginData : loginData,
            returnMsg : '',
            errors    : errors
        });
        return;
    } else {
        // /*Get the record base on ID */
        var query = "select * from isn_user_info_details where user_type_id = '5' and delete_status = '1' and email_id = '"+req.body.email_id+"'";
        query += " and password = '"+md5(req.body.password)+"'";
        con.query(query,function(err,result){
            if(result.length != 0){
                req.session.user_id = result[0].user_id;
                req.session.user_name = result[0].user_name;
                res.redirect(baseURL+"home");
            } else {
                var returnMsg = "Username and Password not exits";
                res.render('pages/login',{
                    siteTitle : siteTitle,
                    pageTitle : "User Login",
                    loginData : loginData,
                    returnMsg : returnMsg,
                    errors    : ''
                });
            }
        });
    }
});


app.get('/home',function(req,res){
    if (req.session && req.session.user_id) { // Check if session exists
        /** Get the category list */
        con.query('select * from isn_category_details order by category_id desc',function(err,result){
            res.render('pages/home',{
                siteTitle : siteTitle,
                pageTitle : "Event List",
                sessionVal : req.session.user_name,
                items   :   result
            });
        }); 
    } else {
        res.redirect(baseURL);
    }
});

/* Add new category*/
app.get('/event/add',function(req,res){
    if (req.session && req.session.user_id) {
        res.render('pages/add-event',{
            siteTitle : siteTitle,
            baseURL   : baseURL,
            pageTitle : "Add New Record",
            loginData : '',
            item      : '',
            errors    : ''
        });
    } else {
        res.redirect(baseURL);
    }
});


/** This is a POST method to data and pre-populate to the firm */
app.post('/event/add',function(req,res){
    req.checkBody('category_name', 'Please Enter Category Name.').isAlpha();
    //req.checkBody('category_name', 'Please Enter Category Name.').matches(/^[a-zA-Z0-9]{5}$/, "i");
    // req.checkBody('category_name', 'Please Enter Category Name.').isLength({ min: 5, max:5 });
    
    var errors = req.validationErrors();
    if(errors) {
        res.render('pages/add-event', {
            siteTitle : siteTitle,
            baseURL   : baseURL,
            pageTitle : "Add New Record",
            item      : '',
            errors    : errors
        });
        return;
    } else {
        /*Get the record base on ID */
        var query = "insert into isn_category_details (category_name) values (";
        query += "'"+req.body.category_name+"')";

        con.query(query,function(err,result){
            res.redirect(baseURL+'home');
        });
    }
});


/** 
 * 
 * This is a page for editing the event item
 * Edit - segment
 * ID - It's and ID of the record
 * We also adding some JavaScript and CSS styles
 * For all the dependencies - see the package.json file for more information
 */
/** This is GET method to data and pre-populate to the firm */
app.get('/event/edit/:id',function(req,res){
    if (req.session && req.session.user_id) {
        /** Get the record base on ID */
        con.query("select * from isn_category_details where category_id = '"+req.params.id+"'",function(err,result){
            res.render('pages/edit-event',{
                siteTitle : siteTitle,
                pageTitle : "Edit Record",
                item : result
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

/**
 * This is a POST method to data and pre-populate to the firm
 */
app.post('/event/edit/:id',function(req,res){
    /** Get the record base on ID */
    var query = "update isn_category_details set category_name = ";
        query += "'"+req.body.category_name+"'";
        query += "where category_id = '"+req.body.category_id+"'";

    con.query(query,function(err,result){
        if(result.affectedRows){
            res.redirect(baseURL);
        }
    });
});

/** This is a GET method to delete from the database  */
app.get('/event/delete/:id',function(req,res){
    if (req.session && req.session.user_id) {
        /** Get the record base on ID */
        con.query("delete from isn_category_details where category_id='"+req.params.id+"'",function(err,result){
            if(result.affectedRows){
                res.redirect(baseURL);
            }
        });
    } else {
        res.redirect(baseURL);
    }
});

app.get('/fileupload',function(req,res){
    if (req.session && req.session.user_id) {
        con.query("select * from u_file_upload ",function(err,result){
            res.render('files/add-file',{
                siteTitle   : siteTitle,
                pageTitle   : "File Upload",
                baseURL     : baseURL,
                fileList    : result
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

app.post('/fileupload',function(req,res){
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    let sampleFileName = req.files.sampleFile.name;
    console.log(sampleFile);
    console.log(sampleFileName);


    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./uploads/'+sampleFileName, function(err) {
        if (err)
        return res.status(500).send(err);
    
        res.send('File uploaded!');
    });
});


app.get('/logout',function(req,res){
    // req.session.reset();
    req.session.destroy();
    res.redirect(baseURL);
});

/** Connect to the server */
var server = app.listen(4000,function(){
    console.log("Server started on 4000");
});