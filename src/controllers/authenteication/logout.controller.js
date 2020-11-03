const logout = async (req, res, next) => {
  try {
    return res.send('CONTROLLER NOT IMPLEMENTED: Logout user.');
  } catch (err) {
    next(err);
  }
};

export default logout