import { expect } from 'chai';
import server from '../../src/server';

describe('Unit :: Configs :: Server', () => {
  it('expect config.server http port to be 3000', (done) => {
    const port = server.get('http_port');
    expect(port).to.be.equal('3000');
    done();
  });

  it('expect config.server https port to be 8000', (done) => {
    const port = server.get('https_port');
    expect(port).to.be.equal('8000');
    done();
  });

  it('expect server to be a function', () => {
    expect(typeof server).to.be.equal('function');
  })
});
