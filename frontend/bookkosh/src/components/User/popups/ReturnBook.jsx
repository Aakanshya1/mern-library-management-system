import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReturnBook = ({ showReturnPopup, setShowReturnPopup, bookToReturn, setBorrowedBookList }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  if (!bookToReturn) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">Error</h2>
          <p className="text-red-500">Book details not available.</p>
          <button
            onClick={() => setShowReturnPopup(false)}
            className="px-4 py-2 bg-white text-blue-500 border rounded-md mt-4"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  const handleReturnBook = async () => {

    try {
      // Send a request to return the book
      const response = await axios.post('http://localhost:3000/books/returnbook', 
        { bookId: bookToReturn._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Successfully returned the book
      toast.success(response.data.message); // Success message
      setTimeout(() => {
        setShowReturnPopup(false);
      }, 500); 
       // Close the popup

      // Optionally, you can fetch the updated borrowed books list
      const updatedBooksResponse = await axios.get('http://localhost:3000/books/userborrowedbooks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBorrowedBookList(updatedBooksResponse.data.borrowedbooklist);

    } catch (error) {
      console.error("Error returning book:", error);
      setError(error.response ? error.response.data.message : 'Failed to return the book');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Return Book</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <p><span className="font-bold">Title:</span> {bookToReturn.title}</p>
        <p><span className="font-bold">ISBN:</span> {bookToReturn.isbn}</p>
        <p><span className="font-bold">Borrowed On:</span> {new Date(bookToReturn.fromDate).toLocaleDateString()}</p>
        <p><span className="font-bold">Submission Date:</span> {new Date(bookToReturn.toDate).toLocaleDateString()}</p>
        <p><span className="font-bold">Total Fine:</span> {bookToReturn.fine > 0 ? `$${bookToReturn.fine}` : "No fine"}</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleReturnBook}
            className="px-4 py-2 bg-blue text-white rounded-md border disabled:opacity-50"
            disabled={loading}
          >
          Confirm Return
          </button>
          <button
            onClick={() => setShowReturnPopup(false)}
            className="px-4 py-2 bg-white text-blue-500 border rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReturnBook;
