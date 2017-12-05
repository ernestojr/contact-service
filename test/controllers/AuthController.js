const supertest = require('supertest');
const app = require('../../server.js');
const user = require('../fixtures/user.json');
const { expect } = require('chai');

//const request = supertest(app);

describe('Test on AuthController', function() {
  it('Should fail the authorization whitout data.', function() {
    return supertest(app)
      .post('/auth/sign-in')
      .expect(200)
      .then(response => {
        winston.debug(response.body);
        expect(response.body).to.have.property('code');
        expect(response.body).to.have.property('description');
      })
  });
});
/*
describe('Test on AuthController', function() {

  it('Should fail the authorization whitout data.', function(done) {
    // const { body } = await request
    //   .post(`/auth/sign-in`)
    //   .expect(401);
    //   winston.debug(body);
    //   expect(body).to.have.property('code');
    //   expect(body).to.have.property('description');
    //   done();
    request
      .post(`/auth/sign-in`)
      .expect(401)
      .end(function(err, response) {
        winston.debug(body);
        expect(body).to.have.property('code');
        expect(body).to.have.property('description');
        done();
      });
  });

  // it('Should fail the authorization whit data.', async () => {
  //   const { email, password } = user;
  //   const auth = new Buffer(email + ':' + password).toString('base64')
  //   return request
  //     .post(`/auth/sign-in`)
  //     .set('Authorization', `Basic ${auth}`)
  //     .expect(401)
  //     .then(({ body }) => {
  //       winston.debug('Here');
  //       expect(body).to.have.property('code');
  //       expect(body).to.have.property('description');
  //     });
  // });

  // before(done => {
  //   done();
  // })
  //
  // after(done => {
  //   done();
  // })

});
*/
