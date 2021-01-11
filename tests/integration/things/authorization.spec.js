import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../../../src/app';
import { resources, roles } from '../../../src/configs';
import { things as thingsFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: Things :: Authorization', () => {
  const THINGS = resources.THINGS;

  describe('01. USER authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;
    let thingsInstance;
    let otherThingsInstance;

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
      thingsInstance = await thingsFactory({
        UserId: userTestInstance.id,
      });

      /** Confirm email token for other (any) user */
      otherThingsInstance = await thingsFactory({
        UserId: otherUserTestInstance.id,
      });
    });

    it('expect to be allowed to create any', (done) => {
      // Confirm email token form data
      const formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name').to.equal(formData.name);
          expect(res.body.data).to.have.property('description').to.equal(formData.description);
          expect(res.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to create own', (done) => {
      // Confirm email token form data
      const formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name').to.equal(formData.name);
          expect(res.body.data).to.have.property('description').to.equal(formData.description);
          expect(res.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be only allowed to read any', (done) => {
      chai
        .request(server)
        .get('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all things records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = thingsInstance.id;

      chai
        .request(server)
        .get(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved thing ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(thingsInstance.id);
          expect(res.body.data).to.have.property('name').to.equal(thingsInstance.name);
          expect(res.body.data).to.have.property('description').to.equal(thingsInstance.description);
          expect(res.body.data).to.have.property('price').to.equal(thingsInstance.price);
          done();
        });
    });

    it('expect to be allowed to update any', (done) => {
      let id = thingsInstance.id;

      let formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      chai
        .request(server)
        .put(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('name').to.equal(formData.name);
          expect(response.body.data).to.have.property('description').to.equal(formData.description);
          expect(response.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = thingsInstance.id;

      let formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      chai
        .request(server)
        .put(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('name').to.equal(formData.name);
          expect(response.body.data).to.have.property('description').to.equal(formData.description);
          expect(response.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherThingsInstance.id;

      chai
        .request(server)
        .delete(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = otherThingsInstance.id;

      chai
        .request(server)
        .delete(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${id} record.`);
          done();
        });
    });
  });

  describe('02. ADMIN authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;
    let thingsInstance;
    let otherThingsInstance;

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
      thingsInstance = await thingsFactory({
        UserId: userTestInstance.id,
      });

      /** Confirm email token for other (any) user */
      otherThingsInstance = await thingsFactory({
        UserId: otherUserTestInstance.id,
      });
    });

    it('expect to be allowed to create any', (done) => {
      // Confirm email token form data
      const formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name').to.equal(formData.name);
          expect(res.body.data).to.have.property('description').to.equal(formData.description);
          expect(res.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to create own', (done) => {
      // Confirm email token form data
      const formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name').to.equal(formData.name);
          expect(res.body.data).to.have.property('description').to.equal(formData.description);
          expect(res.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be only allowed to read any', (done) => {
      chai
        .request(server)
        .get('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all things records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = thingsInstance.id;

      chai
        .request(server)
        .get(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved thing ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(thingsInstance.id);
          expect(res.body.data).to.have.property('name').to.equal(thingsInstance.name);
          expect(res.body.data).to.have.property('description').to.equal(thingsInstance.description);
          expect(res.body.data).to.have.property('price').to.equal(thingsInstance.price);
          done();
        });
    });

    it('expect to be allowed to update any', (done) => {
      let id = thingsInstance.id;

      let formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      chai
        .request(server)
        .put(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('name').to.equal(formData.name);
          expect(response.body.data).to.have.property('description').to.equal(formData.description);
          expect(response.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = thingsInstance.id;

      let formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      chai
        .request(server)
        .put(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('name').to.equal(formData.name);
          expect(response.body.data).to.have.property('description').to.equal(formData.description);
          expect(response.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherThingsInstance.id;

      chai
        .request(server)
        .delete(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = otherThingsInstance.id;

      chai
        .request(server)
        .delete(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${id} record.`);
          done();
        });
    });
  });

  describe('03. SUDO authorisation checks:', () => {
    let userTestInstance;
    let otherUserTestInstance;
    let thingsInstance;
    let otherThingsInstance;

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
      thingsInstance = await thingsFactory({
        UserId: userTestInstance.id,
      });

      /** Confirm email token for other (any) user */
      otherThingsInstance = await thingsFactory({
        UserId: otherUserTestInstance.id,
      });
    });

    it('expect to be allowed to create any', (done) => {
      // Confirm email token form data
      const formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name').to.equal(formData.name);
          expect(res.body.data).to.have.property('description').to.equal(formData.description);
          expect(res.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to create own', (done) => {
      // Confirm email token form data
      const formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Send create (post) request to server
      chai
        .request(server)
        .post('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name').to.equal(formData.name);
          expect(res.body.data).to.have.property('description').to.equal(formData.description);
          expect(res.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be only allowed to read any', (done) => {
      chai
        .request(server)
        .get('/api/things')
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all things records.`);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });

    it('expect to be allowed to read own', (done) => {
      const id = thingsInstance.id;

      chai
        .request(server)
        .get(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved thing ${id} record.`);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id').to.equal(thingsInstance.id);
          expect(res.body.data).to.have.property('name').to.equal(thingsInstance.name);
          expect(res.body.data).to.have.property('description').to.equal(thingsInstance.description);
          expect(res.body.data).to.have.property('price').to.equal(thingsInstance.price);
          done();
        });
    });

    it('expect to be allowed to update any', (done) => {
      let id = thingsInstance.id;

      let formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      chai
        .request(server)
        .put(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('name').to.equal(formData.name);
          expect(response.body.data).to.have.property('description').to.equal(formData.description);
          expect(response.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to update own', (done) => {
      let id = thingsInstance.id;

      let formData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      chai
        .request(server)
        .put(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .type('form')
        .send(formData)
        .end((error, response) => {
          expect(error).to.be.null;
          expect(response).to.have.status(201);
          expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
          expect(response.body).to.have.property('data');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('name').to.equal(formData.name);
          expect(response.body.data).to.have.property('description').to.equal(formData.description);
          expect(response.body.data).to.have.property('price').to.equal(formData.price);
          done();
        });
    });

    it('expect to be allowed to delete any', (done) => {
      const id = otherThingsInstance.id;

      chai
        .request(server)
        .delete(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${id} record.`);
          done();
        });
    });

    it('expect to be allowed to delete own', (done) => {
      const id = otherThingsInstance.id;

      chai
        .request(server)
        .delete(`/api/things/${id}`)
        .set({ Authorization: `Bearer ${userTestInstance.token}` })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${id} record.`);
          done();
        });
    });
  });
});
