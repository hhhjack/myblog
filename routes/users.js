const express = require('express');
const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const fs = require('fs');
// const multer = require('multer');

let User = require('../models/user');

let router = express.Router();

// 注册
router.get('/reg', function (req, res){
    console.log('test1');
    res.render('users/register');
});

router.post('/reg', [
    // check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('username').isLength({ min: 1 }).withMessage('Username is required'),
    check('email').isLength({ min: 1 }).withMessage('Email is required'),
    // check('email').isEmail().withMessage('invalid email'),
    check("password", "invalid password")
      .isLength({ min: 1 })
      .custom((value,{req, loc, path}) => {
        //   if (value !== req.body.password_confirmation) {
        //       // trow error if passwords do not match
        //       console.log("hhhhhh ",req.body.password_confirmation);
        //       throw new Error("Passwords don't match");
        //   } else {
        // }
        return value;
      })
  ],function (req, res){
    User.findOne({
        username: req.body.username
    }, (err, data) => {
        if(err){
            res.send('server or db error');
        }else{
            if(data === null){

                const errors = validationResult(req);
            
                if (!errors.isEmpty()) {
                    console.log(errors);
                    // res.render('users/register', {
                    // errors: errors.array()
                    // })
                    if(errors.errors[0].param == 'username'){
                        res.send('用户名不能为空');
                    }else if(errors.errors[0].param == 'username'){
                        res.send('邮箱不能为空');
                    }else{
                        res.send('密码不能为空');
                    }
                } else {
                    let user = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        photo: "none"
                    });
                    console.log("user ", user);
            
                    user.save(function(err) {
                        if (err) {
                            // res.render('users/register', {result: false, msg: '数据库连接失败'});
                            res.send('很抱歉，数据库发生错误');
                            return;
                        } else {
                            console.log('save success!');
                            // req.flash("success", "You are now registered and can log in");
                            // res.send('users/register', {result: true, msg: '注册成功'});
                            res.redirect('/login');
                        }
                    });
                }

            }else{
                res.send('用户名已存在，请重新注册');
                // res.render('users/register', {result: false, msg: '用户名已存在'});
            }
        }
    });

});

// 登陆
router.get('/login', function (req, res,){
    res.render('users/login');
});

router.post('/login', function (req, res){
    console.log(req.body);
    User.findOne({
        username: req.body.userinfo
    },(err, data) => {
        if(err){
            console.log(err);
            console.log('not fund');
        }else{
            if(data === null){
                res.send('该用户不存在！');
            }else{ 
                
                console.log(data);
                if(data.password === req.body.password){
                    console.log('登陆成功');
                    res.render('articles/home', {user: data.username});
                    res.redirect('/home');
                }else{
                    res.send('密码错误');
                }
            }
        }
    })
});

module.exports = router;