const winston = require('winston');
module.exports = (() => {
   app.log = new winston.Logger({
     level: 'silly',
     exitOnError: false,
     transports: [
       new winston.transports.Console({
         colorize: true,
         prettyPrint: true
       }),
     ]
   });
})();
