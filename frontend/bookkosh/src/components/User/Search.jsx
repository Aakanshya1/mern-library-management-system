import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import Button from '../Button'; // Custom Button component
import axios from 'axios';
import BookPreview from './Preview'; // Import the new BookPreview component

function Search() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBorrowPopup, setShowBorrowPopup] = useState(false);
  const [showReservePopup, setShowReservePopup] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/showallbooks`);
        setBooks(response.data.books);
        setFilteredBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handlePreview = (bookDetails) => {
    setSelectedBook(bookDetails);
  };

  const handleBackToList = () => {
    setSelectedBook(null);
  };
useEffect(()=>{
  
})
const handleSearch = async (e) => {
  const bookPrefix = e.target.value; // Get trimmed input value
  setSearchQuery(bookPrefix); // Update the search query state

  if (bookPrefix) {
      try {
          // Update the search parameter to 'prefix' if that's what your backend expects
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/search?prefix=${bookPrefix}`);
          console.log("Response from server:", response.data); // Log the complete response for debugging

          if (response.data.success && response.data.books.length > 0) {
              console.log("Books found:", response.data.books);
              setFilteredBooks(response.data.books); // Directly set the books without wrapping in an array
          } else {
              console.error("No books found in the response:", response.data.message || "No details provided");
              setFilteredBooks([]); // Clear the books array if no books are found
          }
      } catch (error) {
          console.error("Error fetching search results:", error); // Handle error fetching results
          setFilteredBooks([]); // Reset to an empty array on error
      }
  } else {
      setFilteredBooks(books); // Reset to all books if the query is empty
  }
};

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterBooks(searchQuery, category);
  };

  const filterBooks = (query, category) => {
    let filtered = books;

    if (category !== 'All') {
      filtered = filtered.filter((book) =>
        book.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
    }

    setFilteredBooks(filtered);
  };

  if (selectedBook) {
    return (
      <BookPreview
        selectedBook={selectedBook}
        onBack={handleBackToList}
        showBorrowPopup={showBorrowPopup}
        setShowBorrowPopup={setShowBorrowPopup}
        showReservePopup={showReservePopup}
        setShowReservePopup={setShowReservePopup}
      />
    );
  }

  return (
    <>
      <div className='flex md:flex-row flex-col gap-6 mb-4'>
        <div className='flex relative w-full'>
          <span className='text-grey mt-1 z-10 absolute p-2 right-3'>
            <IoSearch />
          </span>
          <input
            type="text"
            placeholder="Search for books"
            value={searchQuery}
            onChange={handleSearch}
            className="rounded-full text-grey border p-2 drop-shadow-lg w-full"
          />
        </div>
        <div className='text-grey'>
          <select
            className='text-xs p-3 rounded-full'
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Fiction">Fiction</option>
            <option value="History">History</option>
            <option value="Discipline">Discipline</option>
            <option value="Horror">Horror</option>
            <option value="Biography">Biography</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>
      </div>

      <div className='p-2'>
        <div className='grid grid-cols-6 text-xs font-semibold mb-4'>
          <p className='justify-center flex'>Image</p>
          <p className='justify-center flex'>Title</p>
          <p className='justify-center flex'>Author</p>
          <p className='justify-center flex'>Category</p>
          <p className='justify-center flex'>Status</p>
          <p className='justify-center flex'>Action</p>
        </div>
      </div>

      <div className='flex flex-col gap-4 overflow-x-auto'>
        {filteredBooks.length === 0 ? (
          <p>No books available</p>
        ) : (
          filteredBooks.map((book) => (
            <div key={book._id} className='grid md:grid-cols-6 grid-cols-2 items-center p-2 rounded-md bg-white text-sm'>
              <span className='p-6'>
                <img src={book.bookimage} alt={book.title} />
              </span>
              <p>{book.title}</p>
              <span className='text-xs text-blue'>{book.author}</span>
              <p className='justify-center flex'>{book.category}</p>
              <span className={book.bookStatus === "Available" ? "bg-green text-white py-2 text-center rounded-md" : "border text-blue py-2 text-center rounded-md"}>
                {book.bookStatus}
              </span>
              <Button text="Preview" isprimary onClick={() => handlePreview(book)} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Search;
