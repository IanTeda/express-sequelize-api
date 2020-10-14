import { server } from './configs';
import { logger } from './utils'

/** @type {Number} The http port number to listen for http request on  */
const port = server.get('port');

// Start listening for http requests
server.listen(port, () => {
  logger.info(`SERVER: Running on port ${port}`);
});

/**
 * EXPRESS SERVER
 * --------------
 * Express server export for testing
 *
 * @name server
 * @returns {object} Express server instance configuration
 */
export default server;
