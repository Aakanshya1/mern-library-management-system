import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../../utils';
import logo from '../../assets/images/logo.png';
import { FaCalendarAlt,FaUsers,FaUser,FaBook } from 'react-icons/fa';
import { IoMdTime } from "react-icons/io";
import Books from '../../components/Librarian/Books';
import Home from '../../components/Librarian/Librarianhome';
import Users from '../../components/Librarian/Users';
import Profile from '../../components/Librarian/Profile';
import Button from '../../components/Button';
import Status from '../../components/Librarian/Status';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import { IoHomeSharp,  IoBagHandle } from 'react-icons/io5';
import { GiBookshelf } from 'react-icons/gi';



function Dashboardlibrarian() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState(null);

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
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInuser'));
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <>
      {/* Sidebar and Top Bar remain visible */}
      <div className="flex w-full md:flex-row flex-col-reverse h-fixed md:h-screen">
        {/* Sidebar */}
        <div className="flex flex-[0.2] md:h-screen h-fit md:flex-col gap-10 items-center  w-full drop-shadow-2xl fixed md:relative md:left-0 bottom-0 z-10 bg-white ">
          <img src={logo} className="w-[120px] md:inline-block hidden  m-4" alt="Logo" />
          <ul className="md:text-sm text-xl text-grey flex md:flex-col flex-row justify-around w-full md:gap-3 gap-8 md:p-2 p-4 ">
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/librariandashboard"  className="flex gap-2 cursor-pointer">   <IoHomeSharp /> <span className="md:inline-block hidden">Home</span></Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/librariandashboard/librarian-books"  className="flex gap-2 cursor-pointer">  <GiBookshelf /> <span className="md:inline-block hidden">Books</span></Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/librariandashboard/librarian-users"  className="flex gap-2 cursor-pointer"> <FaUsers /><span className="md:inline-block hidden"> Users</span></Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/librariandashboard/librarian-status"  className="flex gap-2 cursor-pointer"><FaBook/> <span className="md:inline-block hidden">Book Status</span></Link>
            </li>
            <li className='p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/librariandashboard/librarian-profile"  className="flex gap-2 cursor-pointer"><FaUser/> <span className="md:inline-block hidden">Profile</span></Link>
            </li>
          </ul>
          <div className="md:inline-block hidden">
            <Button text="Logout" onClick={handleLogout} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-[0.9] flex flex-col gap-6 p-4 bg-bgcolor md:overflow-y-auto">
          {/* Top Bar */}
          <div className="bg-white p-2 rounded-full shadow-sm gap-60 justify-between md:flex flex-row hidden">
            <div className="flex flex-row w-full justify-around">
              <p className="text-lg flex items-center gap-2">
                <span className="text-blue text-2xl"><FaCalendarAlt /></span>{formattedDate}
              </p>
              <p className="text-lg flex items-center gap-2">
                <span className="text-blue text-2xl"><IoMdTime /></span>{formattedTime}
              </p>
            </div>

            <div className="flex flex-row gap-6 rounded-full justify-center items-center p-1 hover:bg-bgcolor cursor-pointer">
              <div className="rounded-full w-[40px] h-[40px]">
                <img
                  src={avatarPreview || ''} 
                  alt="Avatar"
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <p className="uppercase text-sm">{loggedInUser}</p>
            </div>
          </div>

        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/librarian-books" element={<Books />} />
            <Route path="/librarian-users" element={<Users />} />
            <Route path="/librarian-status" element={<Status />} />
            <Route path="/librarian-profile" element={<Profile />} />
          </Routes>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}

export default Dashboardlibrarian;
