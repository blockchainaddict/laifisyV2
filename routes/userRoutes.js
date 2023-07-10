const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/new', userController.createUser);

// Get a user by Status
router.get('/status/:status', userController.getUserByStatus);

// Get a user by ID
router.get('/:id', userController.getUserById); 

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Google LOGIN for user
router.post('/googlelogin', userController.googleLogin);


module.exports = router;