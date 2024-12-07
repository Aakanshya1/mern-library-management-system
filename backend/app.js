require("dotenv").config();
require("./connection/conn")
const express= require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter')
const DashboardRouter = require('./routes/DashboardRouter')
const UserModel = require('./Models/Userdata')
const BookModel = require('./Models/Books')

const multer = require('multer')
const BooksRouter = require('./routes/BooksRouter')
app.use(bodyParser.json());
const cron = require('node-cron');
const calculateFines = require("./tasks/FineCalculator");
const {checkOverdueBooksAndNotify,checkAvailableBooksAndNotify} = require('./tasks/Notify')
const {processQueue} = require('./Controllers/BookController')

app.use(cors());

app.use('/auth',AuthRouter);


app.use('/api', DashboardRouter);

app.use('/books',BooksRouter);

cron.schedule('0 20 * * *', () => {
  console.log('Checking for overdue books at 8 PM...');
  checkOverdueBooksAndNotify();
});
cron.schedule('0 * * * *', async () => {
  console.log("Checking available books and processing reservations...");
  const books = await BookModel.find({ bookCount: { $gt: 0 } }); 
  for (const book of books) {
    console.log(`Processing book ID: ${book._id}`);
    await processQueue(book._id); 
  }
});

cron.schedule('0 0 * * *', () =>{
  console.log("Calculating fines");
  calculateFines();
});




app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
}); 