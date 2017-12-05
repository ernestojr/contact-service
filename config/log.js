const winston = require('winston');
winston.configure({
  level: 'silly',
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    }),
  ]
})
global.winston = winston
module.exports = winston;
