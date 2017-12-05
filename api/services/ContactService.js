module.exports = (() => {
  global.ContactService = {
    create,
  };

  function create(userId, data) {
    return new Promise(function(resolve, reject) {

      var db = firebase.database();
      var ref = db.ref();
      var usersRef = ref.child(`users/${userId}/contacts`);
      winston.debug('Here');
      usersRef.push().set(data, function (err) {
        if (err) reject(err);
        winston.debug('Here');
        resolve();
      });
    });
  }

  winston.info('Loaded ContactService');

})();
