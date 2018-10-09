var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.session && req.session.user_id) { // Check if session exists
        res.render('upload_file/index',{
            pageTitle   : 'Upload File',
            homeData    : '',
            sessionVal  : req.session.user_name,
            pageID      : 'upload_file'
        });
    } else {
        res.redirect(baseURL);
    }
});

module.exports = router;