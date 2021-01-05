/** 
 * Authorization module providing access to the Authorization database table
 * 
 * @module services/authorizations
 * @author Ian Teda <ian@teda.id.au>
 * @example
 * import { authorizations as authorizationsService } from '/src/services';
 */
export { createOne } from './create.service';
export { default as create } from './create.service';
export { findOneByPk, findAll, findAndCountAll } from './find.service';
export { default as find } from './find.service';
export { updateOneByPk } from './update.service';
export { default as update } from './update.service';
export { destroyOneByPk, destroyAll } from './destroy.service';
export { default as destroy } from './destroy.service';
export { isGranted } from './granted.service';
