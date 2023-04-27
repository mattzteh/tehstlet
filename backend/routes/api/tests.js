const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
        message: "GET /api/tests"
    })
})

module.exports = router;