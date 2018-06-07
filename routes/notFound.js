const router = require('express').Router();

const notFoundController = require('../controllers/notFound');

router.all('/*', notFoundController);

module.exports = router;