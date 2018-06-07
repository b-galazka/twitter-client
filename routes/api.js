const router = require('express').Router();

const authGuard = require('../middlewares/authApiGuard');
const initTwitterAccountManager = require('../middlewares/initTwitterAccountManager');
const controllers = require('../controllers/api');
const notFoundController = require('../controllers/notFound');

router.use(authGuard);
router.use(initTwitterAccountManager);

router.post('/update-status', controllers.updateStatus);
router.get('/tweets', controllers.getTweets);
router.get('/followers', controllers.getFollowers);
router.get('/friends', controllers.getFriends);
router.get('/profile', controllers.getProfile);
router.all('/*', notFoundController);

module.exports = router;