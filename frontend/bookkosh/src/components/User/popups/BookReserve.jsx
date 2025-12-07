import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookReserve = ({ showReservePopup, setShowReservePopup, currentBook }) => {
  const handleReserve = async () => {
    try {
      // Construct ReserveData dynamically based on currentBook
      const reserveData = {
        bookId: currentBook._id,
      };

      // Send POST request to backend for book reservation
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/books/reservation/${currentBook._id}`,
        reserveData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach user token
          },
        }
      );
   
        
        toast.success("Book reserved successfully");
  
      
        setTimeout(() => {
          setShowReservePopup(false);
        }, 4000); 
     
    
    } catch (error) {
      console.error('Error reserving book:', error);
      toast.error(
        error.response?.data?.message || 'Failed to reserve the book'
      );
    }
  };

  return (
    <>
      {showReservePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-2xl p-10 w-96 text-xs">
            <h2 className="font-bold text-center text-xl mb-4">Reserve Book</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-blue font-semibold">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={currentBook.isbn}
                  readOnly
                  className="border rounded-md w-full p-2 bg-gray-200"
                />
              </div>

              <div>
                <label className="text-blue font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentBook.title}
                  readOnly
                  className="border rounded-md w-full p-2 bg-gray-200"
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="bg-blue p-2 rounded-md text-white"
                  onClick={handleReserve}
                >
                  Reserve
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-white text-blue border py-2 px-3 rounded-md"
                  onClick={() => setShowReservePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default BookReserve;
