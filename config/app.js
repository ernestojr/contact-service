const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('./database');
require('./firebase');
load('../api/models');
load('../api/services');
load('../api/polices');

const auth = require('../api/routes/auth');
const contacts = require('../api/routes/contacts');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', auth);
app.use('/contacts', contacts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err.message)
});

function load(ref) {
  const libs = path.join(__dirname, ref);
  if (fs.existsSync(libs)) require('require-all')(libs);
}

module.exports = app;
