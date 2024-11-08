import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookReserve = ({ showReservePopup, setShowReservePopup, currentBook }) => {
  
  const handleReserve = async () => {
    // Create a request payload for reservation
    const reserveData = {
      isbn: currentBook.isbn,
      title: currentBook.title,
    };

    // try {
    //   await axios.post(`http://localhost:3000/books/reserve/${currentBook._id}`, reserveData);
    //   toast.success('Book reserved successfully');
    //   setShowReservePopup(false);
    // } catch (error) {
    //   console.error('Error reserving book:', error);
    //   toast.error('Failed to reserve the book');
    // }
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
