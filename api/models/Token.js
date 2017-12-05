const mongoose = require('mongoose');
const moment = require('moment');

module.exports = (() => {
  const tokenSchema = new mongoose.Schema({
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: String, unique: true, index: true, required: true },
    type: { type: String, default: 'jwt' },
    status: { type: String, default: 'on' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  });

  /*
  *============================================================
  *                      INSTANCE METHODS
  *============================================================
  */

  /*
   *============================================================
   *                      STATIC METHODS
   *============================================================
  */

  tokenSchema.statics.invalidate = async function (user, token) {
    const criteria = { value: token };
    if (user) criteria.user = user;
    const data = { status: 'off', updatedAt: new Date() };
    await this.update(criteria, { $set: data })
  };

  global.Token = mongoose.model('Token', tokenSchema);

  /*
   *============================================================
   *                      LIFE CYCLE
   *============================================================
  */

  tokenSchema.post('save', async function(record, next) {
    const { _id, user } = record;
    winston.info(`Created new token for user ${user}`);
    const criteria = {
      user,
      _id: { $ne: _id },
      status: 'on',
    };
    const data = { status: 'off', updatedAt: new Date() };
    const result = await Token.update(criteria, { $set: data });
    next();
  });

  winston.info('Loaded Token model');
})();
