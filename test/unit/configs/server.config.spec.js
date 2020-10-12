import { assert, expect } from 'chai';
import { server } from '../../../src/config';

describe('Unit :: Config :: Server', () => {
  it('expect server config to default port to 3333 for testing', (done) => {
    const port = server.get('port');
    expect(port).to.be.equal(3333);
    done();
  });
});
