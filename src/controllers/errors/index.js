/**
 * Controller module providing logic for managing api errors
 *
 * @module controllers/errors
 * @author Ian Teda <ian@teda.id.au>
 * @example
 * import { errors as errorsController } from '/src/controllers';
 */
export { notFound } from './notFound.controller';
export { errorsMiddleware as middleware } from './errorsMiddleware.controller';
