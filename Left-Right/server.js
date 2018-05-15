// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const User = require('./models/users.js');



// MIDDLEWARE
// Method Override
app.use(methodOverride('_method'));
// Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Static Files
app.use(express.static('public'));
// Express-Session
app.use(session({
    secret: 'Trent <3 Aubrey',
    resave: false,
    saveUninitialized: false
}));


// INDEX ROUTE
// Renders the homepage of the app
app.get('/', (req, res) => {
    User.find( (err, users) => {
        const img = users.reduce((result, user)=>{
            return result.concat(user.img);
        }, []);
        res.render('index.ejs', {currentUser: req.session.currentUser, images: img});
    });
});


// CONTROLLERS
// Users
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
// Sessions
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);
// Posts
const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);


// CONNECTIONS
// Mongoose
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leftright';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('Connected to mongo!');
});
// Heroku Port / Port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Trent <3 Aubrey');
});
