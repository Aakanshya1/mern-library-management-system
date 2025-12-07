import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Contributionlist() {
  const [ contributionbooks, setContributionBooks] = useState([]);  // Initializing to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributionBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/contribution-list`);
        setContributionBooks(response.data.contributionbooks);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchContributionBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
     <>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm flex md:flex-row flex-col gap-2 items-center justify-between'>
          <p className='font-bold text-blue text-xl'>Users Management</p>
        </div>

        <div className='flex flex-col  rounded-md  text-center gap-2'>
          <div className='md:grid grid-cols-6 border-b-2 text-blue  hidden'>
            <p>Firstname</p>
            <p>Email</p>
            <p>Bookname</p>
            <p>Author</p>
            <p>Category</p>
            <p>Reason</p>
          </div>
          {contributionbooks.length === 0 ? (
            <p>No contibution available</p>
          ) : (
            contributionbooks.map((contributionbook) => (
              <div className='grid md:grid-cols-6 grid-cols-2 text-sm bg-white p-2 ' key={contributionbook._id}>
                <p>{contributionbook.firstname} <span>{contributionbook.lastname}</span> </p>
                <p>{contributionbook.email}</p>
                <p>{contributionbook.bookname}</p>
                <p>{contributionbook.authorname}</p>
                <p>{contributionbook.category}</p>
                <p>{contributionbook.reason}</p>
                
              </div>
            ))
          )}
        </div>

       
       

      </div>
    </>
    </>
  )
}

export default Contributionlist