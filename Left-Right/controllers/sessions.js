const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// NEW ROUTE
// Route to the page with form that allows user to log in
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

// CREATE ROUTE
// Route that authenticates the submitted username/password
router.post('/', (req, res) => {
    User.findOne(
        {username: req.body.username}, (err, foundUser) => {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                res.send('Wrong Password');
            }
        }
    );
});

// DESTROY ROUTE
// Route that allows the user to log out
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
