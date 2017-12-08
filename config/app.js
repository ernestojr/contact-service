const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
global.app = app;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./log');
require('./bootstrap');
require('./database');
require('./firebase');
app.models = {};
load('../api/models');
app.services = {};
load('../api/services');
app.polices = {};
load('../api/polices');
app.controllers = {};
load('../api/controllers');

const auth = require('../api/routes/auth');
const contacts = require('../api/routes/contacts');

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
