const router = require('express').Router();

const controllers = require('../controllers/auth');

router.get('/auth-url', controllers.getAuthUrl);
router.get('/auth', controllers.auth);
router.get('/logout', controllers.logout);

module.exports = router;