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

// For sending emails and notifications
cron.schedule('0 8 * * *', () => {
  console.log('Checking for overdue books...');
  checkOverdueBooksAndNotify();
  checkAvailableBooksAndNotify();
});
cron.schedule('0 * * * *', async () => {
  console.log("Checking available books and processing reservations...");

  // Fetch the books that you want to check for availability
  const books = await BookModel.find({ bookCount: { $gt: 0 } }); // Example query to find books with availability

  // Loop through the available books and process the reservation queue for each
  for (const book of books) {
    console.log(`Processing book ID: ${book._id}`);
    await processQueue(book._id); // Process the queue for each available book using the correct book._id
  }
});
// For calculating fines
cron.schedule('0 0 * * *', () => calculateFines());
// checkOverdueBooksAndNotify();
processQueue();
calculateFines();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
}); 