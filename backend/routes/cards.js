const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardIdJoi, createCardJoi } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', createCardJoi, createCard);
router.delete('/:cardId', cardIdJoi, deleteCard);
router.put('/:cardId/likes', cardIdJoi, likeCard);
router.delete('/:cardId/likes', cardIdJoi, dislikeCard);

module.exports = router;
