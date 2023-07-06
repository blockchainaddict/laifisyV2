// ************ Require's ************
const express = require('express');
const router = express.Router();

// Controllers
const gptMainController = require('../../controllers/gpt/gptMainController.js');

// INDEX
router.get('/', gptMainController.index);

// Post request to create Chat with ChatGPT
router.post('/chat', gptMainController.chat);

// Get models AI
router.get('/models', gptMainController.models);

// Get list of Users
router.get("/users", gptMainController.getUsers);

// Get list of Chats
router.get("/chats", gptMainController.getChats);

router.get("/chats-sp", gptMainController.getChats);

// Get Actual chats ? CHECK THIS ONE
// app.get('/history/:id', );
module.exports = router;
