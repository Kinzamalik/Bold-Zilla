const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connnect to Database

mongoose.connect(
    process.env.DB_CONNECT, {
        userNewUrlParser: true
    },
    () => console.log('Connected to database'))

// Importing Routes
const authRoute = require('./routes/auth');

// Middleware
app.use(express.json());

// Routes Middlewares
app.use('/api/user', authRoute);




app.listen(3000, () => console.log('Server is Up and running'));