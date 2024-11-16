require("dotenv").config();
require("./connection/conn")
const express= require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter')
const DashboardRouter = require('./routes/DashboardRouter')
const UserModel = require('./Models/Userdata')
const multer = require('multer')
const BooksRouter = require('./routes/BooksRouter')
const FineCalculator = require('./tasks/FineCalculator')
app.use(bodyParser.json());
const cron = require('node-cron');
const calculateFines = require("./tasks/FineCalculator");

app.use(cors());

app.use('/auth',AuthRouter);


app.use('/api', DashboardRouter);

app.use('/books',BooksRouter);


calculateFines();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
}); 