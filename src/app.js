import https from 'https';
import { credentials } from './configs';
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

  const HTTP_PORT = server.get('http_port');
  const HTTPS_PORT = server.get('https_port');

  // Start listening for http requests
  server.listen(HTTP_PORT, () => {
    logger.info(`SERVER: Listening on port ${HTTP_PORT}`);
  });

  // Start our https server only if we have defined a port number in our env
  if (process.env.NODE_ENV !== 'test') {
    https.createServer(credentials, server).listen(HTTPS_PORT, () => {
      logger.info(`HTTPS SERVER: Running on port ${HTTPS_PORT}`);
    });
  }
}

app();

/**
 * Express server export for testing
 *
 * @name server
 * @returns {object} Express server instance configuration
 */
export default server;
