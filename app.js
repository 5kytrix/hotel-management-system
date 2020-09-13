const createError = require('http-errors');
const bodyParser= require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require("passport");
const keys = require('./keys');

const indexRouter = require('./routes/index');
const users = require('./routes/users');
const bookings = require('./routes/bookings');
const rooms = require('./routes/rooms');
const floors = require('./routes/floors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(resp => console.log('🚀 database connected...'));
app.use(passport.initialize());
require("./config/passport")(passport);

app.use('/api', indexRouter);
app.use('/api/users', users);
app.use('/api/bookings', bookings);
app.use('/api/rooms', rooms);
app.use('/api/floors', floors);

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
// view engine setup
// app.listen(9000, () => { console.log('🚀 Server is running...') });

module.exports = app;
