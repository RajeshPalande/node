var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // if (req.session && req.session.user_id) { // Check if session exists
        res.render('home/index',{
            pageTitle   : 'Home',
            homeData    : '',
            pageID      : 'home'
        });
    // } else {
    //     res.redirect(baseURL);
    // }
});

module.exports = router;