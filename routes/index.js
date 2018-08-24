const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET index');
    res.render('index');
});

router.get('/grid', (req, res) => {
    const { size } = req.query;
    console.log('size:', size);
    res.render('grid', { size });
});

module.exports = router;