// services/bookService.js
const BookModel = require('../Models/Books');
const { quickSortBooks } = require('../utils/Sortbooks');
const { binarySearchBooks,binarySearchbyIsbn} = require('../utils/Searchbook');

// Fetch all books from the database
const getAllBooks = async () => {
    try {
        const books = await BookModel.find({});
        return books;
    } catch (error) {
        throw new Error('Error fetching books from the database');
    }
};



const searchBookByTitle = async (searchTitle) => {
    const books = await getAllBooks();
    const sortedBooks = quickSortBooks(books);
    return binarySearchBooks(sortedBooks, searchTitle);  
};
const searchBookbyIsbn = async(searchIsbn)=>{
    const books = getAllBooks();
    const sortedBooks = quickSortBooks(books);
     return binarySearchbyIsbn;
}
// Sort books by title (case-insensitive)
const sortByTitle = async (title) => {
    const books = await getAllBooks();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    return filteredBooks.length > 1 ? quickSortBooks(filteredBooks) : filteredBooks;
};


module.exports = {
    getAllBooks,
    searchBookByTitle,
    sortByTitle,
    searchBookbyIsbn
};
