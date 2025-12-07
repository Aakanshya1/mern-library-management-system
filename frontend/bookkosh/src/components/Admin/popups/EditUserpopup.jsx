import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserpopup = ({ showEditPopup, setShowEditPopup, currentUser }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role:'',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstname:currentUser.firstname,
        lastname:currentUser.lastname,
        email:currentUser.email,
        phone:currentUser.phone, 
        role:currentUser.role,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/updateuser/${currentUser._id}`, formData);
      toast.success('user  updated successfully');
      setTimeout(() => {
        setShowEditPopup(false);
      }, 500); 
    } catch (error) {
      console.log('Error updating user:', error);
      toast.error('Failed to update the user');
    }
  };

  return (
    <>
      {showEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-2xl p-8 w-96">
            <h2 className="font-bold text-center text-xl mb-4">Edit Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Form Fields */}
              <div>
  <label className="text-blue font-semibold">Role</label>
  <select
                  
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="border rounded-md w-full p-2"
                >
                <option value="admin">admin</option>
                <option value="user">user</option>
                <option value="librarian">librarian</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue p-2 rounded-md text-white">
                  Update User
                </button>
                <button
                  type="button"
                  className="bg-white text-blue border py-2 px-3 rounded-md"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default EditUserpopup;
