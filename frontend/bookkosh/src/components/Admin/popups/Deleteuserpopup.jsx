import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deleteuserpopup = ({ showDeletePopup, setShowDeletePopup, userToDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/userdelete/${userToDelete._id}`);
      toast.success('Book deleted successfully');
      setTimeout(() => {
        setShowDeletePopup(false);
      }, 500); 
      
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete the book');
    }
  };

  return (
    <>
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-2xl p-8 w-96">
            <h2 className="font-bold text-center text-xl ">Delete User</h2>
            <p className="text-center">Are you sure you want to delete this user: <strong>{userToDelete.firstname}</strong>?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleDelete}
                className="bg-blue p-2 rounded-md text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="bg-white text-blue border py-2 px-3 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Deleteuserpopup;
