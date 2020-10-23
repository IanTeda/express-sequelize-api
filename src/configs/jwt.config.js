const secret = process.env.JWT_SECRET;

const session = {
  session: false
};

const token = { secret, session }

export default token