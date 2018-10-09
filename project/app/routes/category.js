var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session && req.session.user_id) { // Check if session exists
        var query = "select * from isn_category_details order by category_id desc";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.render('category/index',{
                    pageTitle   : 'Category',
                    categoryList: result,
                    sessionVal  : req.session.user_name,
                    pageID      : 'category'
                });
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

router.get('/add', function(req, res,next) {
    if (req.session && req.session.user_id) { // Check if session exists
        res.render('category/add_category',{
            pageTitle   : 'Add Category',
            sessionVal  : req.session.user_name,
            pageID      : 'category'
        });
    } else {
        res.redirect(baseURL);
    }
});

module.exports = router;