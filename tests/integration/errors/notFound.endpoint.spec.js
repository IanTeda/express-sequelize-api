import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);


describe('Integration :: URL Not Found', () => {
  it('should get a 404 for unknown endpoint within /api', done => {
    chai.request(server)
      .get(`/api/unknown-endpoint`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property('message')
          .to.equals("NOT FOUND: Endpoint (GET) '/api/unknown-endpoint' not found.");
        done();
      });
  });

  it('should get a 404 for unknown endpoint at root', done => {
    chai.request(server)
      .get(`/unknown-endpoint`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property('message')
          .to.equals("NOT FOUND: Endpoint (GET) '/unknown-endpoint' not found.");
        done();
      });
  });
});
