const express = require('express');
const router = express.Router();

// Create a new user
router.get('/', (req, res)=>{
    res.send('Hi');
});

router.get('/session', (req, res)=>{
    res.json(req.session);
})

module.exports = router;