import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/app';
import { resources, roles } from '../../../src/configs';
import { resetTokens as resetTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: Reset Tokens :: Authorization', () => {

  const RESET_TOKENS = resources.RESET_TOKENS;

  describe('01. USER authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;
    let resetTokenInstance;
    let otherResetTokenInstance;

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

      /** Confirm email token for user performing action */
      resetTokenInstance = await resetTokensFactory({
        UserId: userTestInstance.id,
      });

      /** Confirm email token for other (any) user */
      otherResetTokenInstance = await resetTokensFactory({
        UserId: otherUserTestInstance.id,
      });
    });

    it('expect to be denied to create any', (done) => {
      // Confirm email token form data
      const formData = {
        email: otherUserTestInstance.email,
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to POST on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be denied to create own', (done) => {
      // Confirm email token using own email address
      const formData = {
        email: userTestInstance.email,
      };

      // Server create (post) request
      chai
        .request(server)
        .post('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to POST on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be only allowed to read all of own', (done) => {
      chai
        .request(server)
        .get('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all reset token records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          expect(res.body.data[0].UserId).to.be.equal(userTestInstance.id);
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = resetTokenInstance.id;

      chai
        .request(server)
        .get(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved reset token ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(resetTokenInstance.id);
          expect(res.body.data).to.have.property('UserId').to.equal(resetTokenInstance.UserId);
          expect(res.body.data).to.have.property('token').to.equal(resetTokenInstance.token);
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be denied to update any', (done) => {
      let id = otherResetTokenInstance.id;

      const formData = {
        expiration: new Date(),
      };

      chai
        .request(server)
        .put(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to PUT on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be denied to update own', (done) => {
      let id = resetTokenInstance.id;

      const formData = {
        expiration: new Date(),
      };

      chai
        .request(server)
        .put(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to PUT on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be denied to delete any', (done) => {
      const id = otherResetTokenInstance.id;

      chai
        .request(server)
        .delete(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to DELETE on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be denied to delete own', (done) => {
      const id = resetTokenInstance.id;

      chai
        .request(server)
        .delete(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to DELETE on resources ${RESET_TOKENS}.`);
          done();
        });
    });
  });

  describe('02. ADMIN authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;
    let resetTokenInstance;
    let otherResetTokenInstance;

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

      /** Confirm email token for user performing action */
      resetTokenInstance = await resetTokensFactory({
        UserId: userTestInstance.id,
      });

      /** Confirm email token for other (any) user */
      otherResetTokenInstance = await resetTokensFactory({
        UserId: otherUserTestInstance.id,
      });
    });

    it('expect to be denied create any', (done) => {
      // Confirm email token form data
      const formData = {
        email: otherUserTestInstance.email,
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to POST on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be denied to create own', (done) => {
      // Confirm email token using own email address
      const formData = {
        email: userTestInstance.email,
      };

      // Server create (post) request
      chai
        .request(server)
        .post('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to POST on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be allowed to read any', (done) => {
      chai
        .request(server)
        .get('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all reset token records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          expect(res.body.data[1].UserId).to.be.equal(otherUserTestInstance.id);
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = resetTokenInstance.id;

      chai
        .request(server)
        .get(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved reset token ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(resetTokenInstance.id);
          expect(res.body.data).to.have.property('UserId').to.equal(resetTokenInstance.UserId);
          expect(res.body.data).to.have.property('token').to.equal(resetTokenInstance.token);
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be denied to update any', (done) => {
      let id = otherResetTokenInstance.id;

      const formData = {
        expiration: new Date(),
      };

      chai
        .request(server)
        .put(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to PUT on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be denied to update own', (done) => {
      let id = otherResetTokenInstance.id;

      const formData = {
        expiration: new Date(),
      };

      chai
        .request(server)
        .put(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').to.equals(`AUTHORIZATION ERROR: You are not authorized to PUT on resources ${RESET_TOKENS}.`);
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherResetTokenInstance.id;

      chai
        .request(server)
        .delete(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed reset token ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = resetTokenInstance.id;

      chai
        .request(server)
        .delete(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed reset token ${id} record.`);
          done();
        });
    });
  });

  describe('03. SUDO authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;
    let resetTokenInstance;
    let otherResetTokenInstance;

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

      /** Confirm email token for user performing action */
      resetTokenInstance = await resetTokensFactory({
        UserId: userTestInstance.id,
      });

      /** Confirm email token for other (any) user */
      otherResetTokenInstance = await resetTokensFactory({
        UserId: otherUserTestInstance.id,
      });
    });

    it('expect to be allowed to create any', (done) => {
      // Confirm email token form data
      const formData = {
        email: otherUserTestInstance.email,
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('UserId').to.equal(otherUserTestInstance.id);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be allowed to create own', (done) => {
      // Confirm email token using own email address
      const formData = {
        email: userTestInstance.email,
      };

      // Server create (post) request
      chai
        .request(server)
        .post('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('UserId').to.equal(userTestInstance.id);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be allowed read any', (done) => {
      chai
        .request(server)
        .get('/api/reset-tokens')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all reset token records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          expect(res.body.data[1].UserId).to.be.equal(otherUserTestInstance.id);
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = resetTokenInstance.id;

      chai
        .request(server)
        .get(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved reset token ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(resetTokenInstance.id);
          expect(res.body.data).to.have.property('UserId').to.equal(resetTokenInstance.UserId);
          expect(res.body.data).to.have.property('token').to.equal(resetTokenInstance.token);
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be allowed to update any', (done) => {
      let id = otherResetTokenInstance.id;

      const formData = {
        expiration: new Date(),
      };

      chai
        .request(server)
        .put(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated reset token ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(id);
          expect(res.body.data).to.have.property('UserId').to.equal(otherUserTestInstance.id);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = resetTokenInstance.id;

      const formData = {
        expiration: new Date(),
      };

      chai
        .request(server)
        .put(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Updated reset token ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(id);
          expect(res.body.data).to.have.property('UserId').to.equal(userTestInstance.id);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('expiration');
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherResetTokenInstance.id;

      chai
        .request(server)
        .delete(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed reset token ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = resetTokenInstance.id;

      chai
        .request(server)
        .delete(`/api/reset-tokens/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed reset token ${id} record.`);
          done();
        });
    });
  });
});
