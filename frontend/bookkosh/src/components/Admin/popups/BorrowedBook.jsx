import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BorrowedBook() {
  const [borrowedbooks, setBorrowedBooks] = useState([]);  // Initializing to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books/showborrowedbooks');
        setBorrowedBooks(response.data.borrowedbooks);
        console.log(response);
        console.log(response.data.borrowedbooks);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<div className="flex flex-col text-left gap-2">
  <div className=" md:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border-b-2  text-blue gap-4 font-semibold hidden">
    <p>ISBN</p>
    <p>Title</p>
    <p>Firstname</p>
    <p>Email</p>
    <p>From</p>
    <p>To</p>
    <p>Returned</p>
  </div>
  
  {borrowedbooks.length === 0 ? (
    <p className="text-center mt-4">No borrowed books</p>
  ) : (
    borrowedbooks.map((borrowedbook) => (
      <div key={borrowedbook._id} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 text-left text-sm  bg-white  p-2 ">
        <p>{borrowedbook.isbn}</p>
        <p>{borrowedbook.title}</p>
        <p>
          {borrowedbook.firstname} <span>{borrowedbook.lastname}</span>
        </p>
        <p >{borrowedbook.email}</p>
        <p>{new Date(borrowedbook.fromDate).toLocaleDateString()}</p>
        <p>{new Date(borrowedbook.toDate).toLocaleDateString()}</p>
        <p>{borrowedbook.returned ? "Yes" : "No"}</p>
      </div>
    ))
  )}
</div>

  );
}

export default BorrowedBook;
