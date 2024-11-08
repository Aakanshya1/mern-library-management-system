const cloudinary = require('../utils/cloudinary');
const BookModel = require('../Models/Books');
const {getAllBooks} = require('../Services/Bookservice')
const { quickSortBooks } = require('../utils/Sortbooks');
const { binarySearchBooks } = require('../utils/Searchbook');
const BookBorrow = require ('../Models/Borrow');
const UserModel = require('../Models/Userdata');
const addbook= async(req,res)=>{
    try{
        const{isbn,title,category,description,author,bookCount,bookimage,bookStatus}=req.body;
        const book = await BookModel.findOne({isbn});
        if(book){
            return res.status(409)
            .json({message:"book already exist", success:false})
        }
       
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'books',
                public_id: `${isbn}_bookimage`,
                width: 300,
                crop: "scale"
            });

            // Set Cloudinary URL as the user's avatar
            uploadedImageUrl = result.secure_url;
        }
        const bookModel = new BookModel({isbn,title,category,description,author,bookCount,bookStatus,bookimage:uploadedImageUrl})

        await bookModel.save();
        res.status(201)
        .json({
            message:"book added successfully",
            success:true
        })
    }catch(error){
        res.status(500)
        .json({
            message:"Internal Server error",
            success:false
        })
    }

    
};
const showAllbooks  = async(req,res)=>{
    try {
        const books = await BookModel.find();
        const sortedBooks = quickSortBooks(books, 'title'); 
        if(sortedBooks.length==0){
            return res.status(404).json({message:"No Books Found "})
        }
        res.status(200).json({
            success:true,
            message:"books retrived Successfully",
            books:sortedBooks,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
}
const updateBook = async(req,res)=>{
    try {
        const { _id } = req.params;
        const book = await BookModel.findById(_id);
    
        if(!book){
            return res.status(400).json({message:"Book id not found"});
        }

        book.isbn = req.body.isbn|| book.isbn;
        book.title= req.body.title|| book.title;
        book.description = req.body.description|| book.description;
        book.author= req.body.author||book.author;
        book.category = req.body.category|| book.category;
        book.bookCount= req.body.bookCount|| book.bookCount;
        book.bookStatus= req.body.bookStatus|| book.bookStatus;
        
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'books',
                public_id: `${BookModel._id}_bookimage`,
                width: 300,
                crop: "scale"
            });
            book.bookimage = result.secure_url;
        }
const updatedbook = await book.save();
res.json({
    _id:updatedbook._id,
    isbn:updatedbook.isbn,
    title:updatedbook.title,
    category:updatedbook.category,
    description:updatedbook.description,
    author:updatedbook.author,
    bookCount:updatedbook.bookCount,
    bookStatus:updatedbook.bookStatus,
    bookimage:updatedbook.bookimage,

})

    } catch (error) {
        console.error('Error updating book data:',error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}
const deleteBook = async (req, res) => {
    try {
        const { _id } = req.params;
        const book = await BookModel.findByIdAndDelete(_id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            deletedBook: book,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const SearchBooksByTitle = async (req, res) => {
    const { prefix } = req.query;
    
console.log(prefix);
    

    try {
        if (!prefix) {
            return res.status(400)
            .json({ success: false, message: "Title is required for search" });
        }

        const books = await getAllBooks(); 
        const sortedBooks = quickSortBooks(books); 

        const foundBooks = sortedBooks.filter(book =>
            book.title.toLowerCase().startsWith(prefix.toLowerCase())
        );

      
        if (foundBooks) {
            res.status(200).json({
                success: true,
                books: foundBooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const SearchBooksByIsbn = async (req, res) => {
    const { isbnPrefix } = req.query;

    try {
        if (!isbnPrefix) {
            return res.status(400).json({ success: false, message: "ISBN is required for search" });
        }

        const books = await getAllBooks(); // Fetch all books
        const sortedBooks = quickSortBooks(books, 'title'); // Sort books by title

        // Filter books based on whether their ISBN starts with the provided prefix
        const foundBooks = sortedBooks.filter(book =>
            book.isbn.startsWith(isbnPrefix)
        );

        if (foundBooks.length > 0) {
            res.status(200).json({
                success: true,
                books: foundBooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No books found with the given ISBN prefix'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const borrowBook = async (req, res)=>{
    const {bookId, fromDate, toDate}= req.body;
    try {
       const userId = req.user._id;
        const user = await UserModel.findById(userId);
        console.log(userId);
        console.log(bookId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookModel.findById(bookId);
        if(!book || book.bookCount <=0){
            return res.status(400)
            .json({message:"Book is not available for borrowing", available:false})
        }

        const borrowRecord = new BookBorrow({
            bookId,userId,fromDate,toDate
        })
         await borrowRecord.save();
         book.bookCount -= 1;
         if (book.bookCount === 0) {
            book.bookStatus = 'Borrowed'; // Update status if count is zero
        }
      
         await book.save();

         res.status(201).json({message :"Book borrowed Successfully", borrowRecord, available:true})
    } catch (error) {
        console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Failed to borrow book' });
    }
}
const displayBorrowedBooks = async (req,res)=>{
    try {
        const borrowedbook = await BookBorrow.find()
        .populate('bookId', 'isbn title')
        .populate('userId','firstname lastname email')
        .exec();

        const borrowedbooks = borrowedbook.map(BookBorrow =>({
            isbn: BookBorrow.bookId.isbn,
            title: BookBorrow.bookId.title,
            userId: BookBorrow.userId._id,
            firstname: BookBorrow.userId.firstname,
            lastname: BookBorrow.userId.lastname,
            email: BookBorrow.userId.email,
            toDate:BookBorrow.toDate,
            fromDate:BookBorrow.fromDate,
            returned:BookBorrow.returned
        }))
        if(borrowedbooks.length == 0){
            return res.status(404)
            .json({message:'Books not found'})
        }
        res.status(200).json({
            success:true,
            message:"Borrowed books retrived successfully",
            borrowedbooks:borrowedbooks,
        })
       
    } catch (error) {
        console.error('Error fetching borrowed books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { addbook , showAllbooks,updateBook,deleteBook,SearchBooksByTitle,SearchBooksByIsbn,borrowBook,displayBorrowedBooks};