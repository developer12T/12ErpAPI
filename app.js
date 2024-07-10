const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const customersRouter = require('./routes/customer');

//import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//  Set Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customer', customersRouter);

app.use(errorHandler);

module.exports = app;
