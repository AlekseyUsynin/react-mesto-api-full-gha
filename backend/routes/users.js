const router = require('express').Router();

const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const { userIdJoi, updateUserJoi, updateAvatarJoi } = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', userIdJoi, getUserId);
router.patch('/users/me', updateUserJoi, updateUser);
router.patch('/users/me/avatar', updateAvatarJoi, updateAvatar);

module.exports = router;
