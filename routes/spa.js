const router = require('express').Router();

const spaController = require('../controllers/spa');

router.get('/*', spaController);

module.exports = router;