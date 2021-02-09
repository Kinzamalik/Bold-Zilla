const express = require('express');
const app = express();

// Importing Routes
const authRoute = require('./routes/auth');

// Routes Middlewares
app.use('/api/user',authRoute);




app.listen(3000,()=>console.log('Server is Up and running'));