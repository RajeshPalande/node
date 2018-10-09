var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if (req.session && req.session.user_id) { // Check if session exists
        var query = "select * from u_file_upload order by file_upload_id desc";
        req.getConnection(function (error, conn) {
            conn.query(query, function (err, result) {
                res.render('upload_file/index', {
                    pageTitle: 'Upload File',
                    fileList: result,
                    sessionVal: req.session.user_name,
                    pageID: 'upload_file'
                });
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

router.get('/add', function (req, res, next) {
    if (req.session && req.session.user_id) { // Check if session exists
        res.render('upload_file/add_file', {
            pageTitle: 'Upload File',
            sessionVal: req.session.user_name,
            pageID: 'upload_file',
            errors: ''
        });
    } else {
        res.redirect(baseURL);
    }
});

router.post('/add', function (req, res, next) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "file_name") is used to retrieve the uploaded file
    let sampleFile = req.files.file_name;
    let sampleFileName = req.files.file_name.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./app/uploads/' + sampleFileName, function (err) {
        if (err)
            return res.status(500).send(err);
            //res.send('File uploaded!');
            var query = "insert into u_file_upload (file_name) values (";
            query += "'"+sampleFileName+"')";
            req.getConnection(function(error, conn) {
                conn.query(query,function(err,result){
                    res.redirect(baseURL+'upload_file');
                });
            });
    });
});

router.get('/edit/:id',function(req,res){
    if (req.session && req.session.user_id) {
        /** Get the record base on ID */
        var query = "select * from u_file_upload where file_upload_id = '"+req.params.id+"'";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.render('upload_file/edit_file',{
                    pageTitle   : 'Upload File',
                    sessionVal  : req.session.user_name,
                    pageID      : 'upload_file',
                    fileDetails : result,
                    errors      : ''
                });
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

router.post('/edit/:id',function(req,res){
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "file_name") is used to retrieve the uploaded file
    let sampleFile = req.files.file_name;
    let sampleFileName = req.files.file_name.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./app/uploads/' + sampleFileName, function (err) {
        if (err)
            return res.status(500).send(err);
             /** Get the record base on ID */
            var query = "update u_file_upload set file_name = ";
            query += "'"+sampleFileName+"'";
            query += "where file_upload_id = '"+req.body.file_upload_id+"'";

            req.getConnection(function(error, conn) {
                conn.query(query,function(err,result){
                    if(result.affectedRows){
                        res.redirect(baseURL+'upload_file');
                    }
                });
            });
    });
});

router.get('/delete/:id',function(req,res){
    if (req.session && req.session.user_id) {
        /** Get the record base on ID */
        var query = "delete from u_file_upload where file_upload_id='"+req.params.id+"'";
        req.getConnection(function(error, conn) {
            conn.query(query,function(err,result){
                res.redirect(baseURL+'upload_file');
            });
        });
    } else {
        res.redirect(baseURL);
    }
});

module.exports = router;

/***
 * 
 * CREATE TABLE `u_file_upload` (                       
                 `file_upload_id` int(11) NOT NULL AUTO_INCREMENT,  
                 `file_name` varchar(2000) DEFAULT NULL,            
                 PRIMARY KEY (`file_upload_id`)                     
               ) ENGINE=InnoDB DEFAULT CHARSET=latin1   
*/