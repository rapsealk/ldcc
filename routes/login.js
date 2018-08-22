const express = require('express');
const router = express.Router();

const db = require('../db.json');

router.get('/', (req, res) => {

    res.render('login', { message: '' });
});

router.post('/', (req, res) => {

    const { id, password } = req.body;

    console.log('id:', id, 'password:', password);

    let foundUser;
    const isUserFound = db.users.some(user => {
        foundUser = user;
        return user.id === id;
    });

    if (isUserFound && foundUser.password === password) {
        req.session.user = foundUser;
        res.render('login', { message: 'Login!' });
    } else {
        res.render('login', { message: 'Invalid ID or Password.' });
    }
});

module.exports = router;