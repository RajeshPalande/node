var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session && req.session.user_id) { // Check if session exists
        var query = "select * from users order by user_id desc";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.render('user/index',{
                    pageTitle   : 'User',
                    userList    : result,
                    sessionVal  : req.session.user_name,
                    pageID      : 'user'
                });
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

router.get('/add', function(req, res,next) {
    if (req.session && req.session.user_id) { // Check if session exists
        res.render('user/add_user',{
            pageTitle   : 'Add User',
            sessionVal  : req.session.user_name,
            pageID      : 'user',
            errors      : ''
        });
    } else {
        res.redirect(baseURL);
    }
});

module.exports = router;