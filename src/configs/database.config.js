import { logger } from '../utils';

/**
 * Database configuration file
 *
 * @module configs/database
 */
let database, logging;
switch (process.env.NODE_ENV) {
  case 'production':
    database = 'project';
    logging = (msg) => logger.debug(`DATABASE: ${msg}`);
    break;
  case 'development':
    database = 'project_development';
    logging = (msg) => logger.info(`DATABASE: ${msg}`);
    break;
  case 'test':
    database = 'project_test';
    logging = false;
    break;
  default:
    database = 'project_development';
    logging = (msg) => logger.info(`DATABASE: ${msg}`);
    break;
}

const databaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: database,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: logging,
};

export default databaseConfig;
