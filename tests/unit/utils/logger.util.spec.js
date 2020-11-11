import { expect } from 'chai';
import { logger } from '../../../src/utils';

describe('Unit :: Utils :: Logger', () => {
  it('expect util.logger to readable', () => {
    expect(logger.readable).to.be.true;
  });

  it('expect util.logger to typeof object', () => {
    expect(logger).to.be.an('object');
  });
});
