import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../../../src/app';
import { resources, roles } from '../../../src/configs';
import { users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: Users :: Authorization', () => {
  const USERS = resources.USERS;

  describe('01. USER authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;

    beforeEach('truncate all database tables and create test instances', async () => {
      // Destroy database tables
      await truncate();

      /** User performing the action */
      userTestInstance = await usersFactory({
        role: roles.USER,
      });

      /** Other (any) user to create */
      otherUserTestInstance = await usersFactory({
        role: roles.USER,
      });

    });

    it('expect to be denied to create any', (done) => {
      // Confirm email token form data
      const formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post(`/api/${USERS}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to POST resources on ${USERS}.`);
          done();
        });
    });

    it('expect to be denied to read any', (done) => {
      chai
        .request(server)
        .get(`/api/${USERS}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to GET resources on ${USERS}.`);
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = userTestInstance.id;

      chai
      .request(server)
      .get(`/api/${USERS}/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved user ${id} record.`);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id').to.equal(userTestInstance.id);
        expect(res.body.data).to.have.property('firstName').to.equal(userTestInstance.firstName);
        expect(res.body.data).to.have.property('lastName').to.equal(userTestInstance.lastName);
        expect(res.body.data).to.have.property('email').to.equal(userTestInstance.email);
        expect(res.body.data).to.have.property('status').to.equal(userTestInstance.status);
        expect(res.body.data).to.have.property('isEmailConfirmed').to.equal(userTestInstance.isEmailConfirmed);
        expect(res.body.data).to.not.have.property('password');
        expect(res.body.data).to.not.have.property('salt');
        done();
      });
    });

    it('expect to be denied to update any', (done) => {
      let id = otherUserTestInstance.id;

      let formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      chai
        .request(server)
        .put(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to PUT resources on ${USERS}.`);
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = userTestInstance.id;

      let formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      chai
        .request(server)
        .put(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated user with ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(userTestInstance.id);
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.equal(userTestInstance.isEmailConfirmed);
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be denied to delete any', (done) => {
      const id = otherUserTestInstance.id;

      chai
        .request(server)
        .delete(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to DELETE resources on ${USERS}.`);
          done();
        });
    });

    it('expect to be denied to delete own', (done) => {
      const id = userTestInstance.id;

      chai
        .request(server)
        .delete(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to DELETE resources on ${USERS}.`);
          done();
        });
    });
  });

  describe('02. ADMIN authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;

    beforeEach('truncate all database tables and create test instances', async () => {
      // Destroy database tables
      await truncate();

      /** User performing the action */
      userTestInstance = await usersFactory({
        role: roles.ADMIN,
      });

      /** Other (any) user to create */
      otherUserTestInstance = await usersFactory({
        role: roles.ADMIN,
      });
    });

    it('expect to be allowed to create any', (done) => {
      // Confirm email token form data
      const formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post(`/api/${USERS}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.be.ok;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false;
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be only allowed to read any', (done) => {
      chai
        .request(server)
        .get(`/api/${USERS}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all users records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });

    it('expect to be allowed to update any', (done) => {
      let id = otherUserTestInstance.id;

      let formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      chai
        .request(server)
        .put(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated user with ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false;
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = userTestInstance.id;

      let formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      chai
        .request(server)
        .put(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated user with ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false;
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherUserTestInstance.id;

      chai
        .request(server)
        .delete(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed user ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = userTestInstance.id;

      chai
        .request(server)
        .delete(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed user ${id} record.`);
          done();
        });
    });
  });

  describe('03. SUDO authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;

    beforeEach('truncate all database tables and create test instances', async () => {
      // Destroy database tables
      await truncate();

      /** User performing the action */
      userTestInstance = await usersFactory({
        role: roles.SUDO,
      });

      /** Other (any) user to create */
      otherUserTestInstance = await usersFactory({
        role: roles.SUDO,
      });
    });

    it('expect to be allowed to create any', (done) => {
      // Confirm email token form data
      const formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post(`/api/${USERS}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.ok;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false;
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be allowed to read any', (done) => {
      chai
        .request(server)
        .get(`/api/${USERS}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all users records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = userTestInstance.id;

      chai
        .request(server)
        .get(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved user ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(userTestInstance.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(userTestInstance.lastName);
          expect(res.body.data).to.have.property('email').to.equal(userTestInstance.email);
          expect(res.body.data).to.have.property('status').to.equal(userTestInstance.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.equal(userTestInstance.isEmailConfirmed);
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be allowed to update any', (done) => {
      let id = otherUserTestInstance.id;

      let formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      chai
        .request(server)
        .put(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated user with ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false;
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = userTestInstance.id;

      let formData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        status: 'active',
      };

      chai
        .request(server)
        .put(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated user with ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('firstName').to.equal(formData.firstName);
          expect(res.body.data).to.have.property('lastName').to.equal(formData.lastName);
          expect(res.body.data).to.have.property('email').to.equal(formData.email);
          expect(res.body.data).to.have.property('status').to.equal(formData.status);
          expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false;
          expect(res.body.data).to.not.have.property('password');
          expect(res.body.data).to.not.have.property('salt');
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherUserTestInstance.id;

      chai
        .request(server)
        .delete(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed user ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = userTestInstance.id;

      chai
        .request(server)
        .delete(`/api/${USERS}/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed user ${id} record.`);
          done();
        });
    });
  });
});
