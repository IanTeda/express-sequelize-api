import { expect } from 'chai';
import { statuses } from '../../../src/configs';

describe('Unit :: Config :: Statuses', () => {
  it('expect statuses[0] to be sudo role', () => {
    expect(statuses[0]).to.be.equal('active');
    expect(statuses[1]).to.be.equal('unconfirmed');
    expect(statuses[2]).to.be.equal('inactive');
  });
});
