const mongoose = require('mongoose');
module.exports = (() => {
  const stringConnect = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
  mongoose.connect(stringConnect, { useMongoClient: true });
  app.log.info('Connected a Mongo DB');
})();
