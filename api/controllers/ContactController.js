const { ContactService, ErrorHandler } = app.services;

module.exports = (() => {

  app.controllers.ContactController = {
    create,
  };

  async function create(req, res) {
    try {
      const { user, body } = req;
      await ContactService.create(user._id, body);
      app.log.info('New contact created.');
      res.status(201);
      res.end();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  app.log.info('Loaded Contact controller');

})();
