const register = async (req, res, next) => {
  try {
    return res.send('CONTROLLER NOT IMPLEMENTED: Register user');
  } catch (err) {
    next(err);
  }
};

export default register