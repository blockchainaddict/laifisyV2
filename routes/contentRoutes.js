const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController.js');

// middleware
const authMiddleware = require('../middlewares/authMiddleware.js');

// Get all content
router.get('/', authMiddleware, contentController.getAllContent);

// Create content
router.post('/create/', authMiddleware, contentController.createContent);

// Update content
router.get('/edit/:id', authMiddleware, contentController.getContentById);
router.put('/update/:id', authMiddleware, contentController.updateContent);

module.exports = router;