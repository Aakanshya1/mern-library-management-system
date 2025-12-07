import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser,FaBookOpen,FaStar, FaBriefcase } from "react-icons/fa";
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../../utils';
const User = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    avatar: '', // URL for the avatar image
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef(null); // Reference to the file input element

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setUserData(response.data);
        setAvatarPreview(response.data.avatar || 'default-avatar-url'); // Set the avatar URL or default
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setUserData((prevData) => ({
          ...prevData,
          avatar: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstname', userData.firstname);
      formData.append('lastname', userData.lastname);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      if (userData.avatar) {
        formData.append('avatar', userData.avatar);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserData(response.data);
      setAvatarPreview(response.data.avatar || 'default-avatar-url');
      toast.success('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update profile.');
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInuser');
    localStorage.removeItem('role');
    handleSuccess('Logged out successfully');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className='flex md:flex-row flex-col justify-between'>
        {/* User Dashboard Points */}
        <div className='border-4 text-blue gap-6 flex md:flex-col flex-row p-8 md:w-fit rounded-md justify-center items-center bg-white'>
          
            <div className='items-center flex flex-col justify-center'>
              <span className='md:text-2xl text-xl'><FaBookOpen /></span>
              <p>{userData.borrowedpoints}</p>
              <p className='md:text-sm text-xs'>Borrowed Points</p>
            </div>
            <div className='items-center flex flex-col justify-center'>
              <span className='md:text-2xl text-xl'><FaStar /></span>
              <p>{userData.totalPoints}</p>
              <p className='md:text-sm text-xs'>Points Earned</p>
            </div>
            <div className='items-center flex flex-col justify-center'>
              <span className='md:text-2xl text-xl'><FaBriefcase/></span>
              <p>{userData.contributionpoints}</p>
              <p className='md:text-sm text-xs'>Contribution</p>
            </div>
      
      
        </div>

        {/* User Profile Section */}
        <div className='bg-white flex flex-col gap-4 p-6 rounded-md items-center shadow-lg md:text-xl text-xs'>
          <h2 className='text-2xl text-blue font-bold'>User Profile</h2>
          <div className='flex flex-col items-center '>
            <div className='relative'>
              <img
                src={avatarPreview}
                alt="Avatar"
                className="h-[100px] w-[100px] rounded-full mt-2 cursor-pointer"
                onClick={handleAvatarClick} // Trigger file input click on image click
              />
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                ref={fileInputRef} // Reference to the file input
                style={{ display: 'none' }} // Hide the file input
              />
            </div>
          </div>

          {/* User Data Form */}
          <div className='bg-white p-6 gap-6 rounded-md grid grid-cols-2'>
            <div className='flex flex-col'>
              <label htmlFor="firstname" className='text-blue font-bold'>First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={userData.firstname}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-bgcolor text-grey"
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="lastname" className='text-blue font-bold'>Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={userData.lastname}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-bgcolor text-grey"
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="email" className='text-blue font-bold'>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-bgcolor text-grey"
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor="phone" className='text-blue font-bold'>Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="p-2 rounded-md bg-bgcolor s text-grey"
              />
            </div>
          </div>
<div className='flex flex-row gap-8'>
  <div>
  <button
            type="submit"
            className="bg-blue text-white rounded-md px-2 py-3 text-xs"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
  </div>
<div>
<Button text="Logout" onClick={handleLogout} />
</div>
         
</div>
          
        </div>
      

        <ToastContainer />
      </div>
    </>
  );
};

export default User;
