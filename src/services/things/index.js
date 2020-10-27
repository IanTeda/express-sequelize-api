/** Services module providing access to the database
 * @module services/things
 * @author Ian Teda <ian@teda.id.au>
 */
export { createOne } from './create.service';
export { default as create } from './create.service';
export { findOneByPk, findAll, findAndCountAll } from './find.service';
export { default as find } from './find.service';
export { updateOneByPk } from './update.service';
export { default as update } from './update.service';
export { destroyOneByPk, destroyAll } from './destroy.service';
export { default as destroy } from './destroy.service';

// https://stackoverflow.com/questions/31818538/jsdocs-documenting-node-js-express-routes
