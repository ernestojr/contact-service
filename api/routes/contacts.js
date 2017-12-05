const express = require('express');
const ContactController = require('../controllers/ContactController')
const router = express.Router();

router.post('/', AuthPolice.bearer, ContactPolice.create, ContactController.create);

module.exports = router;
