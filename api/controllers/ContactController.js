module.exports = {
  create,
};

async function create(req, res) {
  try {
    const { user, body } = req;
    await ContactService.create(user._id, body);
    winston.info('New contact created.');
    res.status(201);
    res.end();
  } catch (err) {
    ErrorHandler.process(res, err);
  }
}
