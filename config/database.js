const mongoose = require('mongoose');

function connect(stringConnect) {
  return new Promise(function(resolve, reject) {
    mongoose.connect(stringConnect, { useMongoClient: true }, (err) => {
      if (err) {
        winston.error(err);
        reject(err);
      } else {
        mongoose.Promise = global.Promise;
        resolve();
      }
    });
  });
}

module.exports = (async () => {
  const stringConnect = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
  await connect(stringConnect);
  winston.info(`Connected a Mongo DB ${stringConnect}`);
})();
