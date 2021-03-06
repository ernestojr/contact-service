const statusDef = 400;
const codeDef = 'unknownError';
const messageDef = 'An error has occurred';
const descriptionDef = 'Unknown error. Please contact the API provider for more information.';

module.exports = (() => {
  global.ErrorHandler = {
    process,
  };

  function process(res, err) {
    const { status = statusDef, message = messageDef, description = descriptionDef, code = codeDef } = err;
    res.status(status);
    winston.error('An error occurred', err, status);
    res.json({
      code,
      description,
    })
    .end();
  }

  winston.info('Loaded ErrorHandler');

})();
