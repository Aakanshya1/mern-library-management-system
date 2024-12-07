const router = require('express').Router();
const ensureAuthenticated = require('../Middleware/Auth');
const cloudinary = require('../utils/cloudinary')
const upload = require('../Middleware/Avatar') //multer
const {addbook, 
    showAllbooks, 
    updateBook,
     deleteBook, 
     SearchBooksByTitle,
      SearchBooksByIsbn,
       borrowBook, 
       displayBorrowedBooks,
        userBorrowedBooks,
        returnBooks
    , displayReturnedBooks,userReturnedBooks,displayStatus, overduebooks,
    contribution,displayContribution,reserveBook
,displayReservedBooks, 
userReservedBooks,fetchNotifications
,markNotification,checkOverdueBooksAndNotify,getAllUserNotifications, 
Payment} = require('../Controllers/BookController');
const { checkAvailableBooksAndNotify } = require('../tasks/Notify');


router.post('/addbook',upload.single('bookimage'),addbook);
router.get('/showallbooks',showAllbooks);
router.delete('/deletebook/:_id',deleteBook);
router.get('/search',SearchBooksByTitle);
router.get('/searchisbn',SearchBooksByIsbn)
router.post('/updatebook/:_id', upload.single('bookimage'), updateBook);
router.post('/borrowedbooks/:_id',ensureAuthenticated,borrowBook)
router.get('/showborrowedbooks',displayBorrowedBooks)
router.get('/userborrowedbooks',ensureAuthenticated,userBorrowedBooks)
router.post('/returnbooks',ensureAuthenticated,returnBooks)
router.get('/showreturnedbooks',displayReturnedBooks)
router.get('/userreturnedbooks',ensureAuthenticated,userReturnedBooks)
router.get('/status',displayStatus)
router.get('/overduebooks', overduebooks)
router.post('/contribution',ensureAuthenticated,contribution);
router.get('/contribution-list',displayContribution);
router.post('/reservation/:_id',ensureAuthenticated,reserveBook );
router.get('/reservedbooks',displayReservedBooks)
router.get('/userreservedbooks',ensureAuthenticated,userReservedBooks);
router.get('/notifications',ensureAuthenticated,fetchNotifications );
router.post('/marked-read-notifications',markNotification);
router.post('/payments',ensureAuthenticated,Payment)

router.get('/check-overdue-books', async (req, res) => {
    try {
      await checkOverdueBooksAndNotify();
      res.status(200).json({ message: 'Overdue books checked and notifications sent successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error checking overdue books or sending notifications', error: error.message });
    }
  });
  router.get('/notification', async (req, res) => {
    try {
      const allNotifications = await getAllUserNotifications();
      res.status(200).json({ notifications: allNotifications });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications', error: error.message });
    }
  });

module.exports= router;