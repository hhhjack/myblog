const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {createToken, checkToken} = require('./../token')

let User = require('../models/user');

let router = express.Router();

let upload = multer({dest: 'uploads/'})

// 注册
router.post('/upload/:username', upload.single('test'),function (req, res){
    
    console.log("upload ", req.file);
    console.log('username ', req.params.username);
    
    fs.readFile(req.file.path, (err,data)=>{
        if(err){
            return res.json({code: 0});
        }

        let extname=req.file.mimetype.split('/')[1];
        let keepname = req.params.username+'.'+extname;

        fs.writeFile(path.join(__dirname, './../uploads/'+keepname),data,(err)=>{
            console.log('err ', err);
            if(err){
               return res.json({code: 1});
            }
            User.update({username: req.params.username}, {$set: {photo: keepname}}, function(err, data){
                console.log('uploadphoto err ', err);
                console.log('uploadphoto data ', data);
            });
            res.json({code: 200})
        })

    })
})

router.get('/reg',function (req, res){
    res.send("hello")
})

router.post('/reg', [
    check('username').isLength({ min: 1 }).withMessage('Username is required'),
    check('email').isLength({ min: 1 }).withMessage('Email is required'),
    check("password", "invalid password")
      .isLength({ min: 1 })
      .custom((value,{req, loc, path}) => {
        return value;
      })
],function (req, res){
    console.log("test", req.body);
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
                    if(errors.errors[0].param == 'username'){
                        res.json({code: 0});
                    }else if(errors.errors[0].param == 'email'){
                        res.json({code: 1});
                    }else{
                        res.json({code: 2});
                    }
                } else {
                    let user = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        photo: req.body.photo
                    });
                    // console.log("user ", user);
            
                    user.save(function(err) {
                        if (err) {
                            res.json({code: 3});
                        } else {
                            console.log('save success!');
                            res.json({code: 200});
                            // return ;
                        }
                    });
                }

            }else{
                res.json({code: 500});
            }
        }
    });

});

//getphoto
router.get('/login/:username', function (req, res,){
    // console.log('headers ', req.headers);
    User.findOne({username: req.params.username}, function(err, data){
        if(err || data.photo=="none"){
            res.sendFile('E:/for_work_study/my-program/myblog/uploads/nophoto.jpg');
        }else{
            res.sendFile('E:/for_work_study/my-program/myblog/uploads/'+data.photo);
            // console.log('getphoto ', data);
        }
    })
});

// login
router.post('/login', function (req, res){
    User.findOne({
        username: req.body.username
    },(err, data) => {
        if(err){
            console.log(err);
            console.log('not fund');
        }else{
            if(data === null){
                // res.send('该用户不存在！');
                res.json({code: 0});
            }else{ 
                if(data.password === req.body.password){
                    const token = createToken({
                        id: data._id,
                        name: data.username
                    });
                    console.log('登陆成功');
                    res.json({
                        code: 200,
                        data:{
                            token: token
                        }
                    });
                }else{
                    res.json({code: 1});
                }
            }
        }
    })
});

module.exports = router;