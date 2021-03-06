/**
 * Controller module providing logic for managing user entries
 *
 * @module controllers/users
 * @author Ian Teda <ian@teda.id.au>
 * @example
 * import { users as usersController } from '/src/controllers';
 */
export { createOne } from './create.controller';
export { default as create } from './create.controller';
export { readAll, readOne } from './read.controller';
export { default as read } from './read.controller';
export { updateOne } from './update.controller';
export { default as update } from './update.controller';
export { destroyOne, destroyAll } from './destroy.controller';
export { default as destroy } from './destroy.controller';
