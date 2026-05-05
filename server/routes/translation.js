const express = require('express');
const router = express.Router();
const { translateCode, getLanguages } = require('../controllers/translationController');

router.post('/translate', translateCode);
router.get('/languages', getLanguages);

module.exports = router;
