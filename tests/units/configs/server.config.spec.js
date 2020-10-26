import { expect } from 'chai';
import { server } from '../../../src/configs';

describe('Unit :: Config :: Server', () => {
  it('expect config.server to be at port to 3000', (done) => {
    const port = server.get('port');
    expect(port).to.be.equal('3000');
    done();
  });
});
