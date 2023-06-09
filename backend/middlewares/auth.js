const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new Unauthorized('Необходима авторизация!'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'fire');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация!'));
  }

  req.user = payload;

  return next();
};
