import { sequelize } from './database';
import server from './server';
import { logger } from './utils';

async function assertDatabaseConnectionOk() {
  try {
    await sequelize.authenticate();
    logger.info('DATABASE: Successfully connected.');
  } catch (error) {
    logger.error('DATABASE ERROR: Unable to connect! ' + error.message);
    process.exit(1);
  }
}

async function app() {
  await assertDatabaseConnectionOk();

  // Start listening for http requests
  server.listen(server.get('port'), () => {
    logger.info(`SERVER: Listening on port ${server.get('port')}`);
  });
}

app();

/**
 * Express server export for testing
 *
 * @name server
 * @returns {object} Express server instance configuration
 */
export default server;
