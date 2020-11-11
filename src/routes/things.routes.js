import { things as thingsController } from '../controllers';
import { Router } from 'express';

const router = Router();

/**
 * @api {post} /things/:id Create Thing
 * @apiName createOne
 * @apiGroup Things
 *
 * @apiParam {Int} id - Thing primary key ID.
 *
 * @apiSuccess {Int} id - Primary key of the created thing.
 * @apiSuccess {String} name - Name of the thing.
 * @apiSuccess {String} description - Description of the thing.
 * @apiSuccess {Double} price - Price of the thing.
 */
router.post('/', thingsController.createOne);

/**
 * @api {get} /things/ Read all Things
 * @apiName readAll
 * @apiGroup Things
 *
 * @apiSuccess {Int} id - Primary key of the created thing.
 * @apiSuccess {String} name - Name of the thing.
 * @apiSuccess {String} description - Description of the thing.
 * @apiSuccess {Double} price - Price of the thing.
 */
router.get('/', thingsController.readAll);

/**
 * @api {get} /things/:id Read a Thing
 * @apiName readOne
 * @apiGroup Things
 *
 * @apiParam {Int} id - Thing primary key ID.
 *
 * @apiSuccess {String} name - Name of the thing.
 * @apiSuccess {String} description - Description of the thing.
 * @apiSuccess {Double} price - Price of the thing.
 */
router.get('/:id/', thingsController.readOne);

/**
 * @api {put} /things/:id Update a Thing
 * @apiName updateOne
 * @apiGroup Things
 *
 * @apiParam {Int} id - Thing primary key ID.
 *
 * @apiSuccess {String} name - Name of the thing.
 * @apiSuccess {String} description - Description of the thing.
 * @apiSuccess {Double} price - Price of the thing.
 */
router.put('/:id/', thingsController.updateOne);

/**
 * @api {delete} /things/:id Delete a Thing
 * @apiName destroyOne
 * @apiGroup Things
 *
 * @apiParam {Int} id - Thing primary key ID.
 *
 * @apiSuccess {String} name - Name of the thing.
 * @apiSuccess {String} description - Description of the thing.
 * @apiSuccess {Double} price - Price of the thing.
 */
router.delete('/:id/', thingsController.destroyOne);

export default router;
