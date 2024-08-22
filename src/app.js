const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Firebase Admin SDK
const { db } = require('./config/firebase');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Route handlers
const indexRouter = require('./routes/index');
const songsRouter = require('./routes/songs');

// Add Firestore to request object
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Define routes
app.use('/songs', songsRouter);
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
