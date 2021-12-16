// dotenv
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

// Express
const express = require('express');
const app = express();

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Database Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
}).then(()=>{
    console.log('DB Connected');
}).catch((err)=>{
    console.log(err);
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    // origin: 'http://localhost/:3000/',
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // headers: "*",
    allowedHeaders: ['Content-Type', 'Authorization'],
    // preflightContinue: false,
    credentials: true
}));

app.use(express.json())

// MY Routes
app.use("/api" , authRoutes);
app.use("/api" , userRoutes);
app.use("/api" , categoryRoutes);
app.use("/api" , productRoutes);




const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})

