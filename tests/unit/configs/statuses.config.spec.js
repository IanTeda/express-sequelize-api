import { expect } from 'chai';
import { statuses } from '../../../src/configs';

describe('Unit :: Configs :: Statuses', () => {
  it('expect statuses[0] to be sudo role', () => {
    expect(statuses.ACTIVE).to.be.equal('active');
    expect(statuses.INACTIVE).to.be.equal('inactive');
  });
});
