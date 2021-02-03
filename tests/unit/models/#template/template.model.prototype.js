import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { Thing } from '../../../../src/database';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Template :: Prototypes', () => {
  // Test instance to reference in testing
  let thingTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    thingTestInstance = await thingsFactory();
  });

  describe('Prototype Function Checks:', () => {});
});
