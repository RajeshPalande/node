var express = require('express');
var router = express.Router();
var md5 = require('md5');

router.get('/', function(req, res) {
    // if (req.session && req.session.user_id) { // Check if session exists
    //     res.redirect(baseURL+'home');
    // } else {
        res.render('index',{
            pageTitle   : 'Login',
            loginData   : '',
            returnMsg   : '',
            sessionVal  : '',
            pageID      : 'login',
            errors      : ''
        });
    //}
});

router.post('/',function(req, res){
    req.checkBody('email_id', 'Email is required.').notEmpty();
    req.checkBody('email_id', 'Email is not valid').isEmail(); 
    req.checkBody('password', 'Password is required').notEmpty();

    var loginData = req.body;
    var errors = req.validationErrors();
    if(errors) {
        res.render('index', {
            pageTitle   : "Login",
            loginData   : loginData,
            returnMsg   : '',
            pageID      : 'login',
            sessionVal  : '',
            errors      : errors
        });
        return;
    } else {
        // /*Get the record base on ID */
        var query = "select * from isn_user_info_details where user_type_id = '5' and delete_status = '1' and email_id = '"+req.body.email_id+"'";
        query += " and password = '"+md5(req.body.password)+"'";
        
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                if(result.length != 0){
                    req.session.user_id = result[0].user_id;
                    req.session.user_name = result[0].user_name;
                    res.redirect(baseURL+"home");
                } else {
                    var returnMsg = "Username and Password not exits";
                    res.render('index',{
                        pageTitle : "Login",
                        loginData : loginData,
                        pageID    : 'login',
                        sessionVal: '',
                        returnMsg : returnMsg,
                        errors    : ''
                    });
                }
            });
        });
    }
});

module.exports = router;