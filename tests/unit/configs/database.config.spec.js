import { expect } from 'chai';
import { database } from '../../../src/configs';

describe('Unit :: Config :: Database', () => {
  it('expect config.database to have set properties', (done) => {
    expect(database).to.have.property('username');
    expect(database).to.have.property('password');
    expect(database).to.have.property('database').to.be.equal('project_test');
    expect(database).to.have.property('host');
    expect(database).to.have.property('dialect').to.be.equal('postgres');
    done();
  });
});
