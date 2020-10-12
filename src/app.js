import { server } from './config';

/** @type {Number} The http port number to listen for http request on  */
const port = server.get('port');

// Start listening for http requests
server.listen(port, () => {
  console.log(`SERVER: Running on port ${port}`);
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
