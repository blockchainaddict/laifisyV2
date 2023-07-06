const express = require('express');
const router = express.Router();

// Create a new user
router.get('/', (req, res)=>{
    res.send('Hi');
});

module.exports = router;