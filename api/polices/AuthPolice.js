const { ErrorHandler } = app.services;

module.exports = (() => {

  app.polices.AuthPolice = {
    basic,
    bearer,
  };

  async function basic(req, res) {
    try {
      const { User } = app.models;
      const [,token] = req.headers.authorization.split(' ');
      const [email, password] = (new Buffer(token, 'base64').toString('ascii')).split(':');
      res.json(await User.signIn(email, password)).end();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  async function bearer(req, res, next) {
    try {
      const { User } = app.models;
      const { JWTService } = app.services;
      const [,token] = req.headers.authorization.split(" ");
      const result = await JWTService.validateToken(token);
      req.user = await User.getById(result.user);
      req.token = token;
      next();
    } catch (err) {
      ErrorHandler.process(res, err);
    }
  }

  app.log.info('Loaded AuthPolice');

})();
