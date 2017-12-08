const { ErrorHandler } = app.services;

module.exports = (() => {

  app.controllers.AuthController = {
    signUp,
    signOut,
  };

  async function signUp(req, res) {
    try {
      const { User } = app.models;
      const token = await User.signUp(req.body);
      res.status(201);
      res.json(token);
      res.end();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  async function signOut(req, res) {
    try {
      const { user, token } = req;
      await user.signOut(token);
      res.end();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  app.log.info('Loaded Auth controller');

})();
