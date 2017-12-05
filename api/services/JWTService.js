const JWT = require('jwt-simple');
const moment = require('moment');
const secretWord = process.env.SECRET_WORD || '.the#-.super#-.secret#-.word#'

const eInvalidToken = {
  status: 401,
  message: 'Token expired.',
  description: 'Your token is expired.',
  code: 'invalidToken'
};

module.exports = (() => {

  global.JWTService = {
    generateToken,
    validateToken,
  };

  function generateToken(user) {
    const payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(1, "hours").unix(),
    };
    return JWT.encode(payload, secretWord);
  }

  async function validateToken(token) {
    let payload;
    try {
      payload = JWT.decode(token, secretWord);
    } catch (e) {
      winston.error('An error occurred while decode token. The token will be invalidated.', e);
      await Token.invalidate(null, token);
      throw eInvalidToken;
    }
    if (payload.exp <= moment().unix()) {
       throw eInvalidToken;
    }
    if ((await Token.findOne({ value: token })).status !== 'on') {
      throw eInvalidToken;
    }
    return { user: payload.sub };
  }

  winston.info('Loaded JWTService');

})();
