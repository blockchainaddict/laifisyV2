const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware.js');
const statusMiddleware = require('../middlewares/statusMiddleware.js');


// Get all users
router.get('/', authMiddleware, userController.getAllUsers);

// Create a new user
router.post('/new', userController.createUser);

// Login a user
router.post('/login', userController.loginUser);

// Get a user by Status
router.get('/status/:status', userController.getUserByStatus);

// Get a user by ID
router.get('/:id', authMiddleware, statusMiddleware('master'), userController.getUserById);

// Update a user
router.put('/:id', authMiddleware, statusMiddleware('master'), userController.updateUser);

// Delete a user
router.delete('/:id', authMiddleware, statusMiddleware('master'), userController.deleteUser);

// Google LOGIN for user
router.post('/googlelogin', userController.googleLogin);


module.exports = router;