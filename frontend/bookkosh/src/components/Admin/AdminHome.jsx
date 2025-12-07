import React, { useEffect, useState } from 'react';
import { FaUser, FaBookOpen } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from "chart.js";
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function AdminHome() {
  const [stats, setStats] = useState({
    bookStats: {
      totalbooks: 0,
      borrowedlist: 0,
      returnedlist: 0,
    },
    userStats: {
      totalusers: 0,
      admin: 0,
      librarian: 0,
      user: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInuser'))
}, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/status`);
        setStats(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log(error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const bookData = {
    labels: ["Total Books", "Borrowed Books", "Returned Books"],
    datasets: [
      {
        label: "Book Statistics",
        data: [
          stats.bookStats.totalbooks,
          stats.bookStats.borrowedlist,
          stats.bookStats.returnedlist,
        ],
        backgroundColor: "rgba(61,83,159,0.8)",
        borderColor: "rgba(61,83,159)",
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const bookOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Books Statistics",
      },
    },
  };

  const userData = {
    labels: ['Admin', 'Librarian', 'User'],
    datasets: [
      {
        label: "Users by Role",
        data: [
          stats.userStats.admin,
          stats.userStats.librarian,
          stats.userStats.user,
        ],
        backgroundColor: "rgba(61,83,159)",
        borderColor: "rgba(61,83,159,0.5)",
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const userOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Users by Role",
      },
    },
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div className='flex flex-col gap-6'>
            <div className='flex  md:flex-row  flex-col gap-4 '>
        <div className='flex-[0.5] bg-blue p-3 rounded-md text-white '>
          <p className='text-white text-2xl  '> <span className=' font-bold italic'>Welcome,</span> {loggedInUser} </p>
          <div className='flex flex-col gap-2 text-sm'>
            <p>Today's quote</p>
          <p>"There is more books than all of the pirate's loot on Treasure Island." </p>
          <p className='text-right'>- Disney</p>

          </div>
        </div>
        <div className='border-4 text-blue gap-6 flex flex-row flex-[0.5] rounded-md justify-center items-center bg-white '>
        
        <div className='items-center flex flex-col justify-center'>
              <span className='md:text-2xl text-xl'><FaBookOpen /></span>
              <p>{stats.bookStats.totalbooks}</p>
              <p className='md:text-sm text-xs'>Total Books</p>
            </div>
            <div className='items-center flex flex-col justify-center'>
              <span className='md:text-2xl text-xl'><FaBookOpen /></span>
              <p>{stats.bookStats.borrowedlist}</p>
              <p className='md:text-sm text-xs'>Borrowed Books</p>
            </div>
            <div className='items-center flex flex-col justify-center'>
              <span className='md:text-2xl text-xl'><FaUser /></span>
              <p>{stats.userStats.totalusers}</p>
              <p className='md:text-sm text-xs'>Total Users</p>
            </div>
      
      
        
         </div>

       
         
      </div>
      
 

     
  
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-blue'>Library Statistics</h2>
        <div className='flex flex-col  md:flex-row justify-around '>

        <div className='h-full md:w-[500px] ' >
       <h3 className='font-bold text-blue'>Books Statistics</h3>

       <div className='flex text-xs gap-2 justify-around text-grey'>
        <span className='flex'>Total Books:<p>{stats.bookStats.totalbooks}</p></span>
        <span className='flex'>Total borrowed:<p>{stats.bookStats.borrowedlist}</p></span>
        <span className='flex'>Total Returned:<p>{stats.bookStats.returnedlist}</p></span>
       
       </div>
  
       <Line data={bookData} options={bookOptions} />
     </div>
     <div className='h-full md:w-[500px]'>
       <h3 className='font-bold text-blue'>Users by Role</h3>
       <div className='flex text-xs gap-2 justify-around text-grey'>
        <span className='flex'>Total Users:<p>{stats.userStats.totalusers}</p></span>
        <span className='flex'>Admin:<p>{stats.userStats.admin}</p></span>
        <span className='flex'>Librarian:<p>{stats.userStats.librarian}</p></span>
        <span className='flex'>User:<p>{stats.userStats.user}</p></span>
       </div>
       <Line data={userData} options={userOptions} />
     </div>
        </div>
     
      </div>
    </div>
  );
}

export default AdminHome;
