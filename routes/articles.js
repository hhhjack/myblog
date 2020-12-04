var express = require('express');
const { check, validationResult } = require('express-validator');

let Article = require('../models/article');

var router = express.Router();

//主页查询
router.get('/', function (req, res, next){
    res.render('articles/home');
});
router.post('/', function (req, res, next){
    res.render('articles/home');
});

//发布文章
router.get('/publish/:username', function (req, res, next){
    // console.log("username ", req.params.username);
    res.render('articles/publish',{user: req.params.username});
});
router.post('/publish', [
    check('title').isLength({ min: 1 }).withMessage('Username is required'),
    check('content').isLength({ min: 1 }).withMessage('Email is required'),
], function (req, res, next){
    // res.render('articles/home');

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        if(errors.errors[0].param == 'title'){
            res.send('标题名不能为空');
        }else{
            res.send('文章内容不能为空');
        }
    }else{
        console.log('publish ', req.body);

        let art = new Article(
            {
                title: req.body.title,
                author: req.body.author,
                // time: Date.now(),
                content: req.body.content,
            }
        );
        art.save(function (err){
            if(err){
                res.send('很抱歉，数据库发生错误');
                return;
            }else{
                console.log('article save success!');
                // res.redirect('/home');
                res.render('articles/home',{user: req.body.author});
            }
        });
    }
});

module.exports = router;