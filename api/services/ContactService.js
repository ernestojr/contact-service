module.exports = (() => {
  
  app.services.ContactService = {
    create,
  };

  function create(userId, data) {
    return new Promise(function(resolve, reject) {
      var db = app.firebase.database();
      var ref = db.ref();
      var usersRef = ref.child(`users/${userId}/contacts`);
      usersRef.push().set(data, function (err) {
        if (err) reject(err);
        app.log.debug('Here');
        resolve();
      });
    });
  }

  app.log.info('Loaded ContactService');

})();
