const statusDef = 400;
const codeDef = 'unknownError';
const messageDef = 'An error has occurred';
const descriptionDef = 'Unknown error. Please contact the API provider for more information.';

module.exports = (() => {
  
  app.services.ErrorHandler = {
    process,
  };

  function process(res, err) {
    const { status = statusDef, message = messageDef, description = descriptionDef, code = codeDef } = err;
    res.status(status);
    app.log.error('An error occurred', err, status);
    res.json({
      code,
      description,
    })
    .end();
  }

  app.log.info('Loaded ErrorHandler');

})();
