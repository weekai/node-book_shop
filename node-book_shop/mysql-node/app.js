var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var regRouter = require('./routes/register');
var logRouter = require('./routes/login');
var bookRouter = require('./routes/book');
var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');
let updatePasswordRouter = require('./routes/password');

var app = express();

// 跨域
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user/register', regRouter);
app.use('/user/login', logRouter);
app.use('/book/category', indexRouter);
app.use('/book/getbook', bookRouter);
app.use('/book/detail', detailRouter);
app.use('/password', updatePasswordRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
