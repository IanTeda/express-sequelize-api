import express from 'express';

// Set variables based on NODE_ENV
let defaultPort;
switch (process.env.NODE_ENV) {
  case 'production':
    defaultPort = 8080;
    break;
  case 'development':
    defaultPort = 3000;
    break;
  case 'test':
    defaultPort = 3333;
    break;
  default:
    defaultPort = 3000;
    break;
}

/**
 * EXPRESS SERVER
 * --------------
 * An instance of the Express sever
 *
 * @name server
 * @returns {object} Express server instance
 */
const server = express();

// Set the server port
server.set('port', process.env.HTTP_PORT || defaultPort);

export default server;
