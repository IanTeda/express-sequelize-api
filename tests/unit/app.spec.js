import { assert } from 'chai';
import app from '../../src/app';


describe('Unit :: Express Server App', () => {
  it('expect the Express server app to be callable', (done) => {
    // https://github.com/expressjs/express/blob/master/test/app.js
    assert.equal(typeof app, 'function');
    done();
  });
});
