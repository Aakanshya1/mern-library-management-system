import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../Button";
import { useNavigate } from 'react-router-dom';
const ReturnBook = ({ showReturnPopup, setShowReturnPopup, bookToReturn, setBorrowedBookList }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    setLoading(true);
  try {
    console.log('Book to Return:', bookToReturn._id); // Confirm book ID


    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/books/returnbooks`,
      { borrowId: bookToReturn._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );

  toast.success("Book returned successfully");
  setTimeout(() => {
    setShowReturnPopup(false);
  }, 4000); 

   

    const updatedBooksResponse = await axios.get(
      `${import.meta.env.VITE_API_URL}/books/userborrowedbooks`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    setBorrowedBookList(updatedBooksResponse.data.borrowedbooklist);

    
    
  } catch (error) {
    // Handle errors
    if (error.response) {
      console.error('Backend Error:', error.response.data);
      toast.error(error.response.data.message);
    } else {
      console.error('Unexpected Error:', error.message);
      toast.error('An error occurred while returning the book.');
    }
  } finally {
    setLoading(false);
  }
};


const handleFinePayment = () => {
  // Navigate to fake login page, passing the book details (borrowId)
  navigate('/payment-login', { state: { bookDetails: bookToReturn} });
  console.log(bookToReturn);
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Return Book</h2>

        <p><span className="font-bold">Title:</span> {bookToReturn.title}</p>
        <p><span className="font-bold">ISBN:</span> {bookToReturn.isbn}</p>
        <p><span className="font-bold">Borrowed On:</span> {new Date(bookToReturn.fromDate).toLocaleDateString()}</p>
        <p><span className="font-bold">Submission Date:</span> {new Date(bookToReturn.toDate).toLocaleDateString()}</p>
        <p>
  <span className="font-bold">Total Fine:</span> 
  {bookToReturn.fine > 0 ? `Rs.${bookToReturn.fine}` : "No fine"} 
  {bookToReturn.fine > 0 && (
    <span> 
<Button
                text={"Pay Now"}
                onClick={handleFinePayment} // Trigger the fine payment process
              />
    </span>
  )}
</p>

        <div className="flex justify-center gap-4 mt-6">
          <Button isprimary onClick={handleReturnBook}
          text={"Confirm Return"}
           
            disabled={loading}/>
         
          <Button text={"Cancel"} onClick={() => setShowReturnPopup(false)}/>
        
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReturnBook;
