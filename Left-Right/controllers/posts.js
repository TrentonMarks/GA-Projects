const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// NEW ROUTE
// Route to page with form to create a new post to the homepage
router.get('/new', (req, res) => {
    res.render('posts/new.ejs');
});

// CREATE ROUTE
// Finds the current user and pushes the image into the db
router.post('/', (req, res) => {
    User.findOneAndUpdate(
        {_id: req.session.currentUser._id},
        {$push: {img: req.body.img}},
        (err, foundUser) => {
            res.redirect('/');
        }
    );
});

// SHOW ROUTE
// Route to show page when a user clicks on a post
router.get('/', (req, res) => {
    User.findById(req.params.id, (err, post) => {
        res.render('posts/show.ejs',
            {currentUser: req.session.currentUser,
             post: post});
    });
});

module.exports = router;
