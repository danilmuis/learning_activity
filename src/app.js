var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var jwt_auth = require('./utility/jwt_auth');
var indexRouter = require('./api/auth');
var methodRouter = require('./api/method');
var subjectRouter = require('./api/subject');
var activityRouter = require('./api/activity');
var response = require('./utility/response');
var app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/',indexRouter);
app.use('/api/method',jwt_auth.authenticateToken, methodRouter);
app.use('/api/subject',jwt_auth.authenticateToken, subjectRouter);
app.use('/api/activity', jwt_auth.authenticateToken, activityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  response.responseFailed(res);
});
module.exports = app;
