const schemes = require('../ajv/scheme/contact');
const _ = require('lodash');
const AJV = require('ajv');

const invalidRequest = {
  code: 'invalidRequest',
  description: 'The body of the request is invalid',
  status: 400
}

const validFields = [
  "name",
  "email",
  "phone",
  "address",
  "photo",
  "organization",
  "title",
  "birthday",
  "url",
  "note"
]

module.exports = (() => {

  global.ContactPolice = {
    create,
  };

  function create(req, res, next) {
    try {
      const ajv = AJV({ allErrors: true });
      const createContact = ajv.compile(schemes.create);
      const { body } = req;
      const valid = createContact(body)
      if (!valid) {
        invalidRequest.message = ajv.errorsText(createContact.errors);
        throw invalidRequest;
      }
      req.body = _.pick(req.body, validFields);
      next();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  winston.info('Loaded ContactPolice');

})();
