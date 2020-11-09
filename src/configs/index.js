/**
 * Configuration modules
 *
 * @module configs
 * @author Ian Teda <ian@teda.id.au>
 * @example
 * import { server} from '/src/configs';
 */
export { default as nodemailer } from './nodemailer.config';
export { default as logger } from './logger.config';
export { default as jwt } from './jwt.config';
export { default as roles } from './roles.config';
export { default as statuses } from './statuses.config';
export { default as database } from './database.config';
export { default as router } from './router.config';
export { default as passport } from './passport.config'; // I'm middleware so put me second last
export { default as server } from './server.config'; // I need to be last because I am the server and require everything
