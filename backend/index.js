const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import Routes
const authRoute = require('./Routes/auth');
const postRoute =  require('./Routes/auth')
const postRoute =  require('./Routes/a')


dotenv.config();


// Connect to DB
mongoose.connect, (process.env.DB_CONNECT, {
        useNewUrlParser: true
    },
    () => console.log('Connected to DB')
);

 
// Middlewares
app.use(express.json());

// Routes MiddleWares
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute)



app.listen(3000, () => console.log('Server is Up and Running'));