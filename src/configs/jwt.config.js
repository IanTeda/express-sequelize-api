
/**
 * Winston logger configuration
 *
 * @memberof module:configs/jwt
 */
const secret = process.env.JWT_SECRET;

const session = {
  session: false
};

const token = { secret, session }

export default token
