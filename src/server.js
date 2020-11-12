import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { errors as errorsController } from './controllers';
import { logger } from './utils';
import { passport as strategies } from './configs';
import router from './router';

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
 * Express server instance
 *
 * @returns express server instance
 */
const server = express();

// Set the server port
server.set('port', process.env.HTTP_PORT || defaultPort);

// Load passport strategies
passport.use(strategies.local);
passport.use(strategies.jwt);

// initialize passport
server.use(passport.initialize());

// For parsing application/json
server.use(bodyParser.json());

// For parsing application/www-form-urlencoded
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Only log http requests if not in test environment
if (process.env.NODE_ENV !== 'test') {
  server.use(
    morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {
      stream: logger.stream,
    })
  );
}

// Set root for route calls to /api and setup routes
server.use('/api', router);

// Send any non '/api' requests to notFound controller
server.use(errorsController.notFound);

// Middleware to catch controller errors passed into middleware
server.use(errorsController.middleware);

export default server;
