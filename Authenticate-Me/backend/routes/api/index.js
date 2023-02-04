// backend/routes/api/index.js
const router = require('express').Router();


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
})



// leJsBh20 - 3fGFZBrqsUK9hWZPXAaMyJ46Or8
module.exports = router;
