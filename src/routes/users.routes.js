import { users as usersController } from '../controllers';
import { Router } from 'express';

const router = Router();

/**
 * @api {post} /users/:id Request create User.
 * @apiName createOne
 * @apiGroup Users
 *
 * @apiParam {Int} id User primary key ID.
 *
 * @apiSuccess {Int} id - User primary key
 * @apiSuccess {String} firstName - Name of the Thing.
 * @apiSuccess {String} lastName - Name of the Thing
 * @apiSuccess {String} fullName - Description of the Thing.
 * @apiSuccess {String} email - Description of the Thing.
 * @apiSuccess {String} password - Description of the Thing.
 * @apiSuccess {String} salt - Description of the Thing.
 * @apiSuccess {Date} lastLogin - Description of the Thing.
 * @apiSuccess {Enum} status - The price of the Thing.
 * @apiSuccess {Enum} role - The users role.
 * @apiSuccess {Boolean} isEmailConfirmed - Has the user confirmed there email address.
 */
router.post('/', usersController.createOne);

/**
 * @api {get} /users/ Request read all Users.
 * @apiName readAll
 * @apiGroup Users
 *
 * @apiSuccess {Int} id - User primary key
 * @apiSuccess {String} firstName - Name of the Thing.
 * @apiSuccess {String} lastName - Name of the Thing
 * @apiSuccess {String} fullName - Description of the Thing.
 * @apiSuccess {String} email - Description of the Thing.
 * @apiSuccess {String} password - Description of the Thing.
 * @apiSuccess {String} salt - Description of the Thing.
 * @apiSuccess {Date} lastLogin - Description of the Thing.
 * @apiSuccess {Enum} status - The price of the Thing.
 * @apiSuccess {Enum} role - The users role.
 * @apiSuccess {Boolean} isEmailConfirmed - Has the user confirmed there email address.
 */
router.get('/', usersController.readAll);

/**
 * @api {get} /users/:id Request User information.
 * @apiName readOne
 * @apiGroup Users
 *
 * @apiParam {Int} id User primary key ID.
 *
 * @apiSuccess {Int} id - User primary key
 * @apiSuccess {String} firstName - Name of the Thing.
 * @apiSuccess {String} lastName - Name of the Thing
 * @apiSuccess {String} fullName - Description of the Thing.
 * @apiSuccess {String} email - Description of the Thing.
 * @apiSuccess {String} password - Description of the Thing.
 * @apiSuccess {String} salt - Description of the Thing.
 * @apiSuccess {Date} lastLogin - Description of the Thing.
 * @apiSuccess {Enum} status - The price of the Thing.
 * @apiSuccess {Enum} role - The users role.
 * @apiSuccess {Boolean} isEmailConfirmed - Has the user confirmed there email address.
 */
router.get('/:id', usersController.readOne);

/**
 * @api {put} /users/:id Request User update.
 * @apiName updateOne
 * @apiGroup Users
 *
 * @apiParam {Int} id User primary key ID.
 *
 * @apiSuccess {Int} id - User primary key
 * @apiSuccess {String} firstName - Name of the Thing.
 * @apiSuccess {String} lastName - Name of the Thing
 * @apiSuccess {String} fullName - Description of the Thing.
 * @apiSuccess {String} email - Description of the Thing.
 * @apiSuccess {String} password - Description of the Thing.
 * @apiSuccess {String} salt - Description of the Thing.
 * @apiSuccess {Date} lastLogin - Description of the Thing.
 * @apiSuccess {Enum} status - The price of the Thing.
 * @apiSuccess {Enum} role - The users role.
 * @apiSuccess {Boolean} isEmailConfirmed - Has the user confirmed there email address.
 */
router.put('/:id', usersController.updateOne);

/**
 * @api {delete} /users/:id Request delete User.
 * @apiName destroyOne
 * @apiGroup Users
 *
 * @apiParam {Int} id User primary key ID.
 *
 * @apiSuccess {Int} id - User primary key
 * @apiSuccess {String} firstName - Name of the Thing.
 * @apiSuccess {String} lastName - Name of the Thing
 * @apiSuccess {String} fullName - Description of the Thing.
 * @apiSuccess {String} email - Description of the Thing.
 * @apiSuccess {String} password - Description of the Thing.
 * @apiSuccess {String} salt - Description of the Thing.
 * @apiSuccess {Date} lastLogin - Description of the Thing.
 * @apiSuccess {Enum} status - The price of the Thing.
 * @apiSuccess {Enum} role - The users role.
 * @apiSuccess {Boolean} isEmailConfirmed - Has the user confirmed there email address.
 */
router.delete('/:id', usersController.destroyOne);

export default router;
