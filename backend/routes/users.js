const router = require('express').Router();

const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { userIdJoi, updateUserJoi, updateAvatarJoi } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', userIdJoi, getUserId);
router.patch('/me', updateUserJoi, updateUser);
router.patch('/me/avatar', updateAvatarJoi, updateAvatar);

module.exports = router;
