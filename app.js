const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const settings = require('./settings');
// const session = require('express-session');
// const flash = require('connect-flash');
// var validator = require('express-validator');
// const passport = require('passport');

// 连接数据库
mongoose.connect("mongodb://127.0.0.1/myblog");
// 监听
let db = mongoose.connection;
db.once('open', function() {
    console.log('Connected to Mongodb');
})
  
db.on('error', function(err) {
    console.log(err);
});

var app = express();

app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true ,parameterLimit: 1000000}));

var articleRouter = require('./routes/articles');
var userRouter = require('./routes/users');

app.use('/home', articleRouter);
app.use('/', userRouter);

// app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// app.use(express.static(path.join(__dirname, 'public')));

// app.use(validator());

app.listen(3000);

console.log('you are listening to port 3000');
