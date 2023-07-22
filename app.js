// Importing dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();

var app = express();

//Calling form.js from models
var Form = require('./models/form');

//Connect to DB 
const mongodb_connection_string = process.env.DB_STRING;
mongoose.connect(mongodb_connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))

/*
app.use('/', indexRouter);
app.use('/users', usersRouter);
*/

// Render form.ejs
app.get('/',(req,res)=>{
  res.render('form');
});
// Form submission result
app.get('/result',(req,res)=>{
  res.render('result');
});
// Creating form
app.post('/',(req,res)=>{
  let username = req.body.username;
  let email = req.body.email;
  let f = {username: username, email: email};
  Form.create(f)
    .then(newlyCreatedForm =>{
      res.status(200).redirect('result');
    })
    .catch(err =>{
      console.log(err);
      res.status(500).send('Error occurred while creating form.');
    });
});

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
