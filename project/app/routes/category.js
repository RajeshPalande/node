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
            pageID      : 'category',
            errors      : ''
        });
    } else {
        res.redirect(baseURL);
    }
});

/** This is a POST method to data and pre-populate to the firm */
router.post('/add',function(req,res){
    req.checkBody('category_name', 'Please Enter Category Name.').isAlpha();
    //req.checkBody('category_name', 'Please Enter Category Name.').matches(/^[a-zA-Z0-9]{5}$/, "i");
    // req.checkBody('category_name', 'Please Enter Category Name.').isLength({ min: 5, max:5 });
    
    var errors = req.validationErrors();
    if(errors) {
        res.render('category/add_category', {
            pageTitle   : "Add Category",
            sessionVal  : req.session.user_name,
            pageID      : 'category',
            errors      : errors
        });
        return;
    } else {
        /*Get the record base on ID */
        var query = "insert into isn_category_details (category_name) values (";
        query += "'"+req.body.category_name+"')";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.redirect(baseURL+'category');
            });
        });
    }
});

router.get('/edit/:id',function(req,res){
    if (req.session && req.session.user_id) {
        /** Get the record base on ID */
        var query = "select * from isn_category_details where category_id = '"+req.params.id+"'";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.render('category/edit_category',{
                    pageTitle   : "Edit Category",
                    sessionVal  : req.session.user_name,
                    pageID      : 'category',
                    item        : result,                    
                    errors      : ''
                });
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

router.post('/edit/:id',function(req,res){
    // req.checkBody('category_name', 'Please Enter Category Name.').isAlpha();
    // var errors = req.validationErrors();
    // if(errors) {
    //     console.log('if');
    //     console.log(req.body);
    //     res.render('category/edit_category', {
    //         pageTitle   : "Edit Category",
    //         sessionVal  : req.session.user_name,
    //         pageID      : 'category',
    //         item        : req.body,
    //         errors      : errors
    //     });
    //     return;
    // } else {
    //     console.log('else');
        /** Get the record base on ID */
        var query = "update isn_category_details set category_name = ";
        query += "'"+req.body.category_name+"'";
        query += "where category_id = '"+req.body.category_id+"'";

        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                if(result.affectedRows){
                    res.redirect(baseURL+'category');
                }
            });
        });
    // }
});

router.get('/delete/:id',function(req,res){
    if (req.session && req.session.user_id) {
        /** Get the record base on ID */
        var query = "delete from isn_category_details where category_id='"+req.params.id+"'";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.redirect(baseURL+'category');
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

module.exports = router;