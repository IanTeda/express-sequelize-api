import { expect } from 'chai';
import server from '../../src/server';

describe('Unit :: Configs :: Server', () => {
  it('expect config.server to be at port to 3000', (done) => {
    const port = server.get('port');
    expect(port).to.be.equal('3000');
    done();
  });

  it('expect server to be a function', () => {
    expect(typeof server).to.be.equal('function');
  })
});
