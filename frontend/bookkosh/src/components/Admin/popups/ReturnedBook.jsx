import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ReturnedBook() {
  const [returnedbooks, setReturnedBooks] = useState([]);  // Initializing to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books/showreturnedbooks');
        setReturnedBooks(response.data.returnedbooks);
        console.log(response);
        console.log(response.data.returnedbooks);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchReturnedBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<div className="flex flex-col text-left gap-2">
  <div className=" md:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border-b-2 text-center text-blue gap-4 font-semibold hidden">
    <p>ISBN</p>
    <p>Title</p>
    <p>Firstname</p>
    <p>Email</p>
    <p className='text-right'>Date</p>
    <p className='text-right'>Returned</p>
    <p className='text-right'>Fine Paid</p>
  </div>
  
  {returnedbooks.length === 0 ? (
    <p className="text-center mt-4">No borrowed books</p>
  ) : (
    returnedbooks.map((returnedbook) => (
      <div key={returnedbook._id} className="grid grid-cols-7 gap-10  text-left text-sm  bg-white  p-2 ">
        <p>{returnedbook.isbn}</p>
        <p>{returnedbook.title}</p>
        <p>
          {returnedbook.firstname} <span>{returnedbook.lastname}</span>
        </p>
        <p className=''>{returnedbook.email}</p>
        <span className='text-right'> <p className=''>{new Date(returnedbook.fromDate).toLocaleDateString()}</p>
        <p >{new Date(returnedbook.toDate).toLocaleDateString()}</p></span>
        
        <p className='text-right'>{returnedbook.returned ? "Yes" : "No"}</p>
        <p className='text-right'><span>Rs.</span>{returnedbook.finePaid}</p>
      </div>
    ))
  )}
</div>

  );
}

export default ReturnedBook