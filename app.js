var express = require('express');

var app = express();

var articleRouter = require('./routes/articles');
var userRouter = require('./routes/users');

app.use('/home', articleRouter);
app.use('/', userRouter);

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.listen(3000);

console.log('you are listening to port 3000');
