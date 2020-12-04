var express = require('express');

var router = express.Router();

router.get('/', function (req, res, next){
    res.render('users/login');
});
router.post('/', function (req, res, next){
    res.render('users/login');
});
router.get('/reg', function (req, res, next){
    res.render('users/register');
});
router.post('/reg', function (req, res, next){
    res.render('users/register');
});

module.exports = router;