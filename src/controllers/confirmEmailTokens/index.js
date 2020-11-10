/**
 * Controller module providing logic for managing email confirmation tokens
 *
 * @module controllers/confirmEmailTokens
 * @author Ian Teda <ian@teda.id.au>
 * @example
 * import { confirmEmailTokens as confirmEmailTokensController } from '/src/controllers';
 */
export { createOne } from './create.controller';
export { default as create } from './create.controller';
export { readAll, readOne } from './read.controller';
export { default as read } from './read.controller';
export { updateOne } from './update.controller';
export { default as update } from './update.controller';
export { destroyOne, destroyExpired } from './destroy.controller';
export { default as destroy } from './destroy.controller';
