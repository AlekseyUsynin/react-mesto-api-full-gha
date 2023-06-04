const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const urlJoi = (url) => {
  // проверяем через validator.isURL (https://www.npmjs.com/package/validator)
  // проверяет, является ли строка URL-адресом
  // решение от сюда: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  if (validator.isURL(url)) return url;
  throw new BadRequest('Не верный URL');
};

module.exports.loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    avatar: Joi.string().custom(urlJoi),
    password: Joi.string().required(),
  }),
});

module.exports.createCardJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlJoi),
  }),
});

module.exports.cardIdJoi = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports.userIdJoi = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.updateAvatarJoi = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlJoi),
  }),
});
