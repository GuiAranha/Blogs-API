const loginServices = require('../services/login.service');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await loginServices.login(email, password);
    console.log(req.user);
    res.status(200).json({ token: data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};