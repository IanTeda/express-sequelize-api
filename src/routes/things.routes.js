import { things as thingsController } from '../controllers';
import { Router } from 'express';

const router = Router();

/**
 * @api {post} /things/:id Request create Thing.
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
 * @api {get} /things/ Request read all things.
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
 * @api {get} /things/:id Request Thing information
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
 * @api {put} /things/:id Request Thing update.
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
 * @api {delete} /things/:id Request delete Thing.
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
