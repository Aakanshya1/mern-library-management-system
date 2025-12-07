import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
function Returned() {
  const [returnedbooklist, setReturnedBookList] = useState([]);  // Initializing to empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
  
   useEffect(()=>{
    const fetchReturnedBooks = async()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/userreturnedbooks`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReturnedBookList(response.data.returnedbooklist);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };fetchReturnedBooks();
   },[])
   
  
    return (
  <div className="grid grid-cols-4 text-left gap-8  rounded-md  w-fit">
    
    
    {returnedbooklist.length === 0 ? (
      <p className="text-center mt-4">No returned books</p>
    ) : (
      returnedbooklist.map((returnedbooks) => (
        <div key={returnedbooks._id} className="flex text-sm text-grey flex-row gap-2 shadow-2xl p-4 bg-white ">
          <div className='text-center'>
          <img src={returnedbooks.bookimage} className='h-[200px] w-[140px]'  />
          <p><span className='text-black  font-bold'>Isbn:</span>{returnedbooks.isbn}</p>
            <p>{returnedbooks.title}</p>
          </div>
          <div className='flex flex-col justify-between'>
          <p className='flex flex-col'><span className='text-black  font-bold'>Borrowed On:</span>{new Date(returnedbooks.fromDate).toLocaleDateString()}</p>
          <p className='flex flex-col'><span className='text-black  font-bold'>Submission:</span>{new Date(returnedbooks.toDate).toLocaleDateString()}</p>
          <p className='flex flex-col'><span className='text-black  font-bold'>Status:</span>{returnedbooks.returned ? "Returned" : "Borrowed"}</p>
          <p className='flex flex-col'><span className='text-black  font-bold'>Total Fine:</span>{returnedbooks.fine}</p>
         
          </div>
         
         
    
       
          
        </div>
      ))
    )}
   
  </div>
    )  
}

export default Returned