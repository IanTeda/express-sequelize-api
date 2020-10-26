import { sequelize } from '../../src/database';

describe('Unit :: Database :: Index', () => {
  it('expect to connect to database', async () => {
    await sequelize.authenticate();
  });
});
