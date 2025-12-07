import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Reserved() {
  const [reservedbooklist, setReservedBookList] = useState([]);  // Initializing to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReturnPopup,setShowReturnPopup]= useState(false);
  const [bookToReturn,setBookToReturn]=useState(null);

 useEffect(()=>{
  const fetchBooks = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/userreservedbooks`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
   
      setReservedBookList(response.data.reservedbooklist);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };fetchBooks();
 },[])

// const handleReturnClick = (borrowed) => {
// console.log('Book selected for return:', borrowed._id); 
// setBookToReturn(borrowed);
// setShowReturnPopup(true);
// };

  return (
<div className="grid grid-cols-4 text-left gap-8  rounded-md  w-fit">
  
  
  {reservedbooklist.length === 0 ? (
    <p className="text-center mt-4">No Reserved books</p>
  ) : (
    reservedbooklist.map((reservedbooks) => (
      <div key={reservedbooks._id} className="flex text-sm text-grey flex-row gap-2 shadow-2xl p-4 bg-white ">
        <div className='text-center'>
        <img src={reservedbooks.bookimage} className='h-[200px] w-[140px]'  />
       
        </div>
        <div className='flex flex-col justify-between '>
        <p><span className='text-black  font-bold'>Isbn:</span>{reservedbooks.isbn}</p>
          <p>{reservedbooks.title}</p>
        <p className='flex flex-col'><span className='text-black  font-bold'>Status:</span>{reservedbooks.status}</p>
        <p className='flex flex-col'><span className='text-black  font-bold'>Status:</span>   {new Date(reservedbooks.reservedAt).toLocaleDateString()}{" "}
        {new Date(reservedbooks.reservedAt).toLocaleTimeString()}</p>
      

        {reservedbooks.status === 'reserved' && (
  <button className="py-2 border bg-blue rounded-md text-white uppercase hover:bg-white hover:text-blue hover:border">
    Cancel
  </button>
)}
        </div>
       
       
  
     
        
      </div>
    ))
  )}
 
</div>
  )  
}

export default Reserved