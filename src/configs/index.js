/**
 * Configuration modules
 *
 * @module configs
 * @author Ian Teda <ian@teda.id.au>
 * @example
 * import { server} from '/src/configs';
 */
export { default as logger } from './logger.config';
export { default as nodemailer } from './nodemailer.config';
export { default as jwt } from './jwt.config';
export { default as roles } from './roles.config';
export { default as statuses } from './statuses.config';
export { default as database } from './database.config';
export { default as accessRules } from './accessRules.config'
export { default as passport } from './passport.config';
