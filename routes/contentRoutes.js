const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController.js');

// Get all content
router.get('/', contentController.getAllContent);

// Update content
router.get('/edit/:id', contentController.getContentById);
router.put('/update/:id', contentController.updateContent);

module.exports = router;