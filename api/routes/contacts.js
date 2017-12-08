const express = require('express');
const { AuthPolice, ContactPolice } = app.polices;
const { ContactController } = app.controllers;
const router = express.Router();

router.post('/', AuthPolice.bearer, ContactPolice.create, ContactController.create);

module.exports = router;
