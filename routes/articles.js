var express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const {createToken, checkToken} = require('./../token')

let Article = require('../models/article');

var router = express.Router();

//分页查询
router.post('/pagelist',function(req,res){

    // console.log('headers ', req.headers)

    let page=req.body.page;
    let rows=req.body.rows;

    Article.count({isDel:0}, (err, length)=>{
        if(!err){
            if((page-1)*rows >= length){
                res.json({code: 0});
            }else{
                Article.find({isDel:0}, {title: 1, author:1, time: 1})
                    .skip(+(page-1)*rows)
                    .limit(+rows)
                    .exec(function(err, data){
                        if(err){
                            console.log('err ', err);
                        }else{
                            res.json({code: 200, page: Math.ceil(length/rows), list: data});
                        }
                    });
            }
        }
    });
});

//发布文章
router.post('/publish', [
    check('title').isLength({ min: 1 }).withMessage('Username is required'),
    check('content').isLength({ min: 1 }).withMessage('Email is required'),
], function (req, res, next){

    // console.log('pulish header ', req.headers.authorization);

    checkToken(req.headers.authorization).then(respond=>{
        //token验证成功
        //判断过期时间
        // console.log('checktoken ', respond);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // console.log("err ", errors);
            if(errors.errors[0].param == 'title'){
                res.json({code: 0});
            }else{
                res.json({code: 1});
            }
        }else{
            // 为了更好的显示时间，直接更改时间显示方式，改为字符串
            let date = new Date();
            let s = date.getFullYear()+"-";
            if(date.getMonth()<9)
                s += '0';
            s+= (date.getMonth()+1) + "-";
            if(date.getDate()<10)
                s += '0';
            s += date.getDate() + " ";
            if(date.getHours()<10)
                s += '0';
            s += date.getHours() + ":";
            if(date.getMinutes()<10)
                s += '0';
            s += date.getMinutes() + ":";
            if(date.getSeconds()<10)
                s += '0';
            s += date.getSeconds();
            
            let art = new Article(
                {
                    title: req.body.title,
                    author: req.body.username,
                    time: s,
                    content: req.body.content,
                }
            );
            art.save(function (err){
                if(err){
                    res.json({code: 2, err});
                }else{
                    res.json({code: 200});
                }
            });
        }
    }).catch(err=>{
        res.json({code: 3});
    })

});

//文章详情页
router.get('/detail/:id', function(req, res){
    Article.findById(req.params.id, (err, data)=>{
        if(!err){
            if(data.isDel == 0){
                res.json({code: 200, data: data});
            }
            else
                res.json({code: 0});
        }else{
            res.json({code: 0});
        }
    });
});

// 文章删除
router.get('/del/:id', function(req, res){

    checkToken(req.headers.authorization).then(respond=>{
        Article.findById(req.params.id, function(err, data){
            if(err){
                res.json({code: 0});
            }else{
                console.log('data ', data);
                if(data.author == respond.name){
                    Article.update({_id: req.params.id}, { $set: { isDel: '1' }}, (err, data)=>{
                        if(!err){
                            res.json({code: 200});
                        }else{
                            res.json({code: 1})
                        }
                    });
                }else{
                    res.json({code: 2});
                }
            }
        })
        
    }).catch(err=>{
        res.json({code: 3})
    })

})

// 文章修改
router.post('/edit', function(req, res){
    // console.log("edit: ", req.body);
    console.log('token ', req.headers.authorization);

    checkToken(req.headers.authorization).then(respond=>{
        //token验证成功
        //判断过期时间
        Article.findById(req.body.id, function(err, data){
            if(err){
                res.json({code: 0});
            }else{
                console.log('data ', data);
                if(data.author == respond.name){
                    Article.update({_id: req.body.id}, { $set: { title: req.body.title, content: req.body.content }}, (err, data)=>{
                        if(!err){
                            res.json({code: 200});
                        }else{
                            // console.log("edit ", data);
                            // console.log('err ', err);
                            res.json({code: 1})
                        }
                    });
                }else{
                    res.json({code: 2});
                }
            }
        })
        
    }).catch(err=>{
        res.json({code: 3})
    })
})

//添加评论
router.post('/comment', function(req, res){
    let date = new Date();
    let s = date.getFullYear()+"-";
    if(date.getMonth()<9)
        s += '0';
    s+= (date.getMonth()+1) + "-";
    if(date.getDate()<10)
        s += '0';
    s += date.getDate() + " ";
    if(date.getHours()<10)
        s += '0';
    s += date.getHours() + ":";
    if(date.getMinutes()<10)
        s += '0';
    s += date.getMinutes() + ":";
    if(date.getSeconds()<10)
        s += '0';
    s += date.getSeconds();
    console.log('comment time', s);

    let addComment = {
        user: req.body.username,
        message: req.body.message,
        comTime: s
    }
    console.log('comment data ', addComment);
    Article.findByIdAndUpdate(req.body.id, { $push: { comments: addComment }}, (err)=>{
        if(!err){
            res.json({code: 200});
        }else{
            res.json({code: 0});
        }
    });
});

module.exports = router;