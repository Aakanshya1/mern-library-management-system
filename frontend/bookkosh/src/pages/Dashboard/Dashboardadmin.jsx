import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { handleSuccess } from '../../../utils';
import logo from '../../assets/images/logo.png';
import { FaCalendarAlt,FaUsers,FaUser,FaBook } from 'react-icons/fa';
import { IoMdTime } from "react-icons/io";

import Button from '../../components/Button';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import { IoHomeSharp,  IoBagHandle } from 'react-icons/io5';
import { GiBookshelf } from 'react-icons/gi';



function Dashboardadmin() {
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
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
     
      <div className="flex w-full md:flex-row flex-col-reverse h-fit md:h-screen ">

        <div className="flex flex-[0.2] md:h-screen h-fit md:flex-col gap-10 items-center  w-full drop-shadow-2xl fixed md:relative md:left-0 bottom-0 z-10 bg-white ">
          <img src={logo} className="w-[120px] md:inline-block hidden m-4" alt="Logo" />
          <ul className="md:text-sm text-xl text-grey flex md:flex-col flex-row justify-around w-full md:gap-3 gap-4 md:p-2 py-2 ">
            <li className=' p-2 hover:bg-bgcolor hover:shadow-xl rounded-md' >
              <Link to="/admindashboard"  className="flex gap-2 cursor-pointer">   <IoHomeSharp /> <span className="md:inline-block hidden">Home</span></Link>
            </li>
            <li className=' p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/admindashboard/admin-books"  className="flex gap-2 cursor-pointer">  <GiBookshelf /> <span className="md:inline-block hidden">Books</span></Link>
            </li>
            <li className=' p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/admindashboard/admin-users"  className="flex gap-2 cursor-pointer"> <FaUsers /><span className="md:inline-block hidden"> Users</span></Link>
            </li>
            <li className=' p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/admindashboard/admin-status"  className="flex gap-2 cursor-pointer"><FaBook/> <span className="md:inline-block hidden">Book Status</span></Link>
            </li>
            <li className=' p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/admindashboard/admin-contributions"  className="flex gap-2 cursor-pointer"><IoBagHandle/> <span className="md:inline-block hidden">Contributions</span></Link>
            </li>
            <li className=' p-2 hover:bg-bgcolor hover:shadow-xl rounded-md'>
              <Link to="/admindashboard/admin-profile"  className="flex gap-2 cursor-pointer"><FaUser/> <span className="md:inline-block hidden">Profile</span></Link>
            </li>
          </ul>
          <div className="md:inline-block hidden">
            <Button text="Logout" onClick={handleLogout} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-[0.9] flex flex-col gap-6 p-4 pt-0 bg-bgcolor md:overflow-y-auto overflow-y-auto md:h-auto h-screen ">
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

        
          {/* <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/admin-books" element={<AllBooks />} />
            <Route path="/admin-users" element={<AllUsers />} />
            <Route path="/admin-status" element={<Status />} />
            <Route path="/admin-contributions" element={<ContributionList />} />
            <Route path="/admin-profile" element={<Profile />} />
          </Routes> */}
          <Outlet/>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}

export default Dashboardadmin;
