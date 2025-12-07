import React from 'react'
import { useState,useEffect } from 'react';
import { FaBookOpen,FaStar, FaBriefcase, FaUser  } from "react-icons/fa";
import axios from 'axios';

function UserDashboard() {
  const [books,setBooks]= useState([]);
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(true);

  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInuser'))
}, [])


useEffect(()=>{
  const fetchBooks = async  ()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/showallbooks`);
      setBooks(response.data.books);
     
      setLoading(false);

    } catch (error) {
      setError(error.message)
      setLoading(false);
    }
  };fetchBooks();
},[]);


const [userData, setUserData] = useState({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  avatar: '',
});


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

  return (

    <>
    <div  className='flex flex-col gap-4  '>
     
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

       
         
      </div>
      <div>
         {/* New Arrivals */}
         <div className='gap-4 text-blue border  rounded-md flex flex-row overflow-hidden bg-white'>
  <div className='w-10 border bg-blue flex items-center justify-center'>
    <p className='transform text-white -rotate-90 whitespace-nowrap md:text-xl text-xs'>
      New Arrivals
    </p>
  </div>
  
  <div className='p-2 flex flex-nowrap gap-8 overflow-x-auto '>
    {books.length==0? 
    (<p>No books available</p>
    ):(
books.map((book) => (
  <div key={book._id} className=' flex flex-col justify-center border items-center gap-10 p-2 text-grey rounded-md h-auto hover:bg-bgcolor'>
    <span className='items-center w-[100px] h-[100px] p-2'> <img src={book.bookimage} alt="bookimage" style={{ width: '300px', height: 'auto' }}  /></span>
    <p className='text-xs text-center'>{book.title}</p>
  </div>
))
    )}
    
  </div>
</div>
      </div>

      <div className='gap-4  rounded-md overflow-hidden'>
 <p className='text-xl text-grey'>For you</p>
  
  <div className='grid md:grid-cols-5 grid-cols-2 gap-8 overflow-x-auto'>
  {books.length==0? 
    (<p>No books available</p>
    ):(
    books.map((book) => (
      <div key={book._id} className=' flex flex-col justify-center text-center items-center p-3 text-grey rounded-md  bg-white shadow-xl '>
        <span className=''>{books.img}</span>
        <p className='text-sm text-black'>
          <img src={book.bookimage} alt="bookimage" />{book.title} </p>
        <p className='text-xs text-grey'>{book.author}</p>
        <p className='text-xs text-grey'>{book.category}</p>
      	
        
      </div>
    ))
    )}
  </div>

</div>


    </div>
    </>
  )
}

export default UserDashboard