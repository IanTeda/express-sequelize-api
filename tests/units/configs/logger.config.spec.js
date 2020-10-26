import { expect } from 'chai';
import { logger } from '../../../src/configs';

describe('Unit :: Config :: Logger', () => {
  it('expect config.logger to have console & file option', (done) => {
    expect(logger).to.have.property('console');
    expect(logger).to.have.property('file');
    done();
  });

  it('expect config.logger.console to be configured', (done) => {
    expect(logger.console).to.have.property('level');
    expect(logger.console).to.have.property('silent');
    expect(logger.console).to.have.property('handleExceptions');
    expect(logger.console).to.have.property('format');
    done();
  });

  it('expect config.logger.file to be configured', (done) => {
    expect(logger.file).to.have.property('level');
    expect(logger.file).to.have.property('silent');
    expect(logger.file).to.have.property('datePattern');
    expect(logger.file).to.have.property('filename');
    expect(logger.file).to.have.property('handleExceptions');
    expect(logger.file).to.have.property('maxSize');
    expect(logger.file).to.have.property('maxFiles');
    expect(logger.file).to.have.property('colorize');
    expect(logger.file).to.have.property('format');
    done();
  });

  it('expect config.logger to default silent and level emerg when testing', () => {
    expect(logger.file.silent).to.be.true;
    expect(logger.console.silent).to.be.true;
    expect(logger.file.level).to.be.equal('emerg');
    expect(logger.console.level).to.be.equal('emerg');
  });
});
