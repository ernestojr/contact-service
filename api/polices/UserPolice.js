const schemes = require('../ajv/scheme/user');
const _ = require('lodash');
const AJV = require('ajv');

const invalidRequest = {
  code: 'invalidRequest',
  description: 'The body of the request is invalid',
  status: 400
}

const validFields = [
  "fullName",
  "email",
  "password"
]

module.exports = (() => {

  global.UserPolice = {
    create,
  };

  function create(req, res, next) {
    try {
      const ajv = AJV({ allErrors: true });
      const createUser = ajv.compile(schemes.create);
      const { body } = req;
      const valid = createUser(body)
      if (!valid) {
        invalidRequest.message = ajv.errorsText(createUser.errors);
        throw invalidRequest;
      }
      req.body = _.pick(req.body, validFields);
      next();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  winston.info('Loaded UserPolice');

})();
