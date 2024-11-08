const router = require('express').Router();
const ensureAuthenticated = require('../Middleware/Auth');
const cloudinary = require('../utils/cloudinary')
const upload = require('../Middleware/Avatar') //multer
const {addbook, showAllbooks, updateBook, deleteBook, SearchBooksByTitle, SearchBooksByIsbn, borrowBook, displayBorrowedBooks} = require('../Controllers/BookController');


router.post('/addbook',upload.single('bookimage'),addbook);
router.get('/showallbooks',showAllbooks);
router.delete('/deletebook/:_id',deleteBook);
router.get('/search',SearchBooksByTitle);
router.get('/searchisbn',SearchBooksByIsbn)
router.post('/updatebook/:_id', upload.single('bookimage'), updateBook);
router.post('/borrowedbooks/:_id',ensureAuthenticated,borrowBook)
router.get('/showborrowedbooks',displayBorrowedBooks)


module.exports= router;