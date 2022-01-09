// dotenv
const dotenv = require("dotenv");
dotenv.config({path:'./../config.env'});

// Express
const express = require('express');
const app = express();

// Database Connection
const DatabaseConnect = require('./../assets/DbConnection');
DatabaseConnect();

// Middlewares
app.use(require('./Middlewares'));

// Routes
const Routes = require('./Routes');
app.use("/api" , Routes)

// Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})