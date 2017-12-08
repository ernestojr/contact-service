const mongoose = require('mongoose');

module.exports = (() => {
  const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  });

  /*
   *============================================================
   *                      LIFE CYCLE
   *============================================================
  */

  /*
   *============================================================
   *                      INSTANCE METHODS
   *============================================================
  */

  userSchema.methods.signOut = async function(token) {
    const { Token } = app.models;
    await Token.invalidate(this._id, token);
  }

  /*
   *============================================================
   *                      STATIC METHODS
   *============================================================
  */

  userSchema.statics.getById = async function(id) {
   const user = await this.findById(id);
   if (!user) throw { status: 404, description: 'User not found.', message: `User ${id} not found.`, code: 'notFound' };
   return user;
  }

  userSchema.statics.signIn = async function(email, password) {
    const criteria = { email, password };
    const user = await this.findOne(criteria);
    if (!user) throw { status: 401, message: 'Credentials invalid.', description: 'Email or password invalid.', code: 'credInval' };
    return await createToken(user);
  }

  userSchema.statics.signUp = async function({ fullName, email, password }) {
    const user = await this.create({ fullName, email, password });
    return await createToken(user);
  }

  app.models.User = mongoose.model('User', userSchema);

  app.log.info('Loaded User model');

})();

async function createToken(user) {
  const { Token } = app.models;
  const { JWTService } = app.services;
  let token;
  try {
    const criteria  = { user: user._id, status: 'on' };
    token = await Token.findOne(criteria);
    if (token && JWTService.validateToken(token.value)) {
      return { token: token.value };
    }
  } catch (e) { winston.error(e); }
  token = JWTService.generateToken(user);
  await Token.create({
    user: user._id,
    value: token,
  });
  return { token };
}
