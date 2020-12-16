var express = require('express');
var router = express.Router();

var Mongo = require('mongodb-curd');

/* GET home page. */
var db = '1611A';
var col = 'user';

// find 查找所有
router.get('/api/find', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    Mongo.find('db'),'col',function(result){
        if(!result){
            res.json({code:0, msg:"查询错误"})
        }else{
            res.json({code:1, data: result});
        }
    }
});

// remove 删除
// insert 添加
// update 更新
module.exports = router;
