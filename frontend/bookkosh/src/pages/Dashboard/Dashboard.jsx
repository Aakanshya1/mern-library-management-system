import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { IoHomeSharp, IoSearch, IoBagHandle } from 'react-icons/io5';
import { IoIosNotifications } from "react-icons/io";
import { GiBookshelf } from 'react-icons/gi';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { IoMdTime } from "react-icons/io";
import logo from '../../assets/images/logo.png';
import Button from '../../components/Button';
import { handleError, handleSuccess } from '../../../utils';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import UserDashboard from '../../components/User/UserDashboard';
import Search from '../../components/User/Search';
import Myshelf from '../../components/User/Myshelf';
import Contribution from '../../components/User/Contribution';
import User from '../../components/User/User';
import Notification from '../../components/User/Notification';
export default function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [showDropdown, setShowDropdown] = useState(false); // Toggle for dropdown

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setAvatarPreview(response.data.avatar);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAvatar();
  }, []);

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInuser'));
  }, []);

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

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <>
      <div className="flex w-full md:flex-row flex-col-reverse h-fixed md:h-screen ">
        <div className="flex flex-[0.2] md:h-screen h-fit md:flex-col gap-10 items-center  w-full drop-shadow-2xl fixed md:relative md:left-0 bottom-0 z-10 bg-white ">
          {/* Logo */}
          <img src={logo} className="w-[120px] md:inline-block hidden m-4 " alt="Logo" />
          {/* Navigation Links */}
          <ul className="md:text-sm text-xl text-grey flex md:flex-col flex-row justify-around w-full md:gap-3 gap-8 md:p-2 p-4 ">
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/dashboard" className="flex cursor-pointer gap-2">
                <IoHomeSharp />
                <span className="md:inline-block hidden">Home</span>
              </Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md '>
              <Link to="/dashboard/user-search" className="flex cursor-pointer gap-2">
                <IoSearch />
                <span className="md:inline-block hidden">Search</span>
              </Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md '>
              <Link to="/dashboard/user-myshelf" className="flex cursor-pointer gap-2">
                <GiBookshelf />
                <span className="md:inline-block hidden">My Shelf</span>
              </Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/dashboard/user-contribution" className="flex cursor-pointer gap-2">
                <IoBagHandle />
                <span className="md:inline-block hidden">Contribute</span>
              </Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md '>
              <Link to="/dashboard/user-user" className="flex cursor-pointer gap-2">
                <FaUser />
                <span className="md:inline-block hidden">User</span>
              </Link>
            </li>
          </ul>
          <div className="md:inline-block hidden">
            <Button text="Logout" onClick={handleLogout} />
          </div>
        </div>

        <div className="flex-[0.9] flex flex-col gap-6 p-4 bg-bgcolor md:overflow-y-auto">
          <div className='bg-white p-2 rounded-full shadow-sm gap-60 justify-between md:flex flex-row hidden'>
            <div className='flex flex-row w-full justify-around'>
              <p className="text-lg flex items-center gap-2 "><span className='text-blue text-2xl'><FaCalendarAlt /></span>{formattedDate} </p>
              <p className="text-lg flex items-center gap-2"><span className='text-blue text-2xl'><IoMdTime /></span>{formattedTime}</p>
            </div>
            <div className='flex flex-row text-center justify-center align-middle'>
            <div className='p-2'>
             
             <span className="text-4xl text-blue" onClick={toggleDropdown}>
         <IoIosNotifications />
       </span>
             </div>
           <div className='flex flex-row gap-6 rounded-full justify-center items-center p-1 hover:bg-bgcolor cursor-pointer'>
           
             <div className='rounded-full w-[40px] h-[40px] flex'>
               
               <img
                 src={avatarPreview || ''} // Replace with your default avatar path
                 alt="Avatar"
                 className="w-[40px] h-[40px] rounded-full "
               />
             </div>
             <p className='uppercase text-sm'>{loggedInUser}</p>
           </div>
            </div>
          
          </div>
       
          {/* Define Routes for Each Page */}
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/user-search" element={<Search />} />
            <Route path="/user-myshelf" element={<Myshelf />} />
            <Route path="/user-contribution" element={<Contribution />} />
            <Route path="/user-user" element={<User />} />
          </Routes>
        </div>
    
{showDropdown && (
  <div className="absolute top-12 right-10 w-82  bg-white shadow-lg rounded-md p-4 z-10">
    <Notification />
  </div>
)}


      </div>
      <ToastContainer />
    </>
  );
}