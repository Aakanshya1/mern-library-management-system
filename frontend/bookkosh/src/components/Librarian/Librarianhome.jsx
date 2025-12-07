import React,{useEffect, useState} from 'react'
import { FaUser,FaBookOpen} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import axios from 'axios'; 


function Librarianhome() {
  const [stats, setStats] = useState({
    bookStats: {
      totalbooks : 0,
      borrowedlist: 0,
      returnedlist: 0,
    },
    userStats: {
      totalusers: 0,
      admin: 0,
      librarian: 0,
      user: 0,
    },
  },[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=>{
    const fetchstats= async () =>{
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
    fetchstats();
  })
  const bookData ={
    labels:["Total Books","Borrowed Books", "Returned Books"],
    datasets:[
      {
        label:"Book Statistics",
        data: [
          stats.bookStats.totalbooks,
          stats.bookStats.borrowedlist,
          stats.bookStats.returnedlist,
        ],
        backgroundColor: "rgba(61,83,159,0.8)",
        borderColor: "rgba(61,83,159)",
        borderWidth: 3,
      }
    ]
  }
  const bookOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Books Statistics",
      },
    },
  };
  const userData ={
    labels:['admin','librarian','user'],
    datasets:[
      {
        label :"Users by Role",
        data:[
          stats.userStats.admin,
          stats.userStats.librarian,
          stats.userStats.user,
        ],
        backgroundColor: "rgba(61,83,159)",
        borderColor: "rgba(61,83,159,0.5)",
        borderWidth: 3,
      }
    ]
  }
  const userOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Users by Role",
      },
    },
  };
  return (
    <>
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row justify-around' >
        <div className='flex flex-row gap-8 items-center text-2xl border px-8 rounded-md bg-blue text-white py-6'>
        <span className='border w-fit p-2 rounded-md'><FaBookOpen/></span>
        <span><p>Total Books</p>
        <p>{stats.bookStats.totalbooks}</p></span>
        </div>
        <div className='flex flex-row gap-8 items-center text-2xl border px-8 rounded-md bg-white text-blue py-6'>
        <span className='border w-fit p-2 rounded-md'><FaBookOpen/></span>
        <span><p>Total Borrowed Books</p>
        <p>{ stats.bookStats.borrowedlist}</p></span>
        </div>
        <div className='flex flex-row gap-8 items-center text-2xl border px-8 rounded-md bg-blue text-white py-6'>
        <span className='border w-fit p-2 rounded-md'><FaBookOpen/></span>
        <span><p>Total Users</p>
        <p>{stats.userStats.totalusers}</p></span>
        </div>
      </div>
      <div className='text-center '>
      <h2 className='text-2xl font-bold  text-blue'>Library Statistics</h2>
      <div style={{ width: "45%", float: "left", marginRight: "5%" }}>
        <h3 className=' font-bold  text-blue'>Books Statistics</h3>
     
        <Bar data={bookData} options={bookOptions} />
      </div>
      <div style={{ width: "45%", float: "left" }}>
        <h3 className=' font-bold  text-blue'>Users by Role</h3>
        <Bar data={userData} options={userOptions} />
      </div>
    </div>
    </div>
    </>
  )
}


export default Librarianhome