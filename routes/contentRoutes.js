const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController.js');

// Get all content
router.get('/', contentController.getAllContent);

module.exports = router;