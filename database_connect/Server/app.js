var express = require('express');  var path =require('path'); var logger = require('morgan'); var bodyParser = require('body-parser');
var contents = require('./routes/contents'); var thumbnails = require('./routes/thumbnails');
var app =express();
app.set('views', path.join( dirname, 'views'));  app.set('view engine', 'ejs');
app.use(logger('dev'));  app .use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: false }));  a pp.use(express.static(path.join(    dirname,'public')));
app.use('/contents', contents);  app .use('/thumbnails', thumbnails);
// catch 404 and forward to errorhandler  app.use(function(req, res, next) {
var err = new Error('NotFound');  err.status = 404; next(err);
});
// errorhandlers if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {  
res.status(err.status || 500); res.render('error', { message: err.message, error: err });
});
}
app.use(function(err, req, res, next) {  
res.status(err.status || 500); res.render('error', { message: err.message, error: {} });
});
module.exports = app;
4) routes 폴더에thumbnails.js를 만들고다음과같이 수정합니다
var express = require('express');  var mysql = require('mysql'); var router =express.Router(); var connection = mysql.createConnection({
'host' : '', 'user' : '', 'password' : '', 'database' : '',
});
router.get('/', function(req, res, next) {  connection.query('sele
ct id, title, timestamp from board ' + 'order by timestamp desc;', function (error, cursor) {
res.json(cursor);
});
});
module.exports = router