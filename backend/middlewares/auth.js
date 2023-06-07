const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const token = req.cookies.jwt;
  // убеждаемся, что он есть или начинается с Bearer
  if (!token) {
    return next(new Unauthorized('Необходима авторизация!'));
  }

  // извлечём токен
  let payload; // за пределами try/catch, так как от туда она будет не доступна

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'fire');
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new Unauthorized('Необходима авторизация!'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
