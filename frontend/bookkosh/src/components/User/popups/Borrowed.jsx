import React , { useEffect, useState } from 'react'
import axios from 'axios';
import ReturnBookPopup from './ReturnBook'
function Borrowed() {
    const [borrowedbooklist, setBorrowedBookList] = useState([]);  // Initializing to empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReturnPopup,setShowReturnPopup]= useState(false);
    const [bookToReturn,setBookToReturn]=useState(null);
  
   useEffect(()=>{
    const fetchBooks = async()=>{
      try {
        const response = await axios.get('http://localhost:3000/books/userborrowedbooks',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBorrowedBookList(response.data.borrowedbooklist);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };fetchBooks();
   },[])

const handleReturnClick = (book) => {
  setBookToReturn(book);
  setShowReturnPopup(true);
};
  
    return (
  <div className="flex flex-row text-left gap-8  rounded-md  w-fit">
    
    
    {borrowedbooklist.length === 0 ? (
      <p className="text-center mt-4">No borrowed books</p>
    ) : (
      borrowedbooklist.map((borrowedbooks) => (
        <div key={borrowedbooks._id} className="flex text-sm text-grey flex-row gap-2 shadow-2xl p-4 bg-white ">
          <div className='text-center'>
          <img src={borrowedbooks.bookimage} className='h-[200px] w-[140px]'  />
          <p><span className='text-black  font-bold'>Isbn:</span>{borrowedbooks.isbn}</p>
            <p>{borrowedbooks.title}</p>
          </div>
          <div className='flex flex-col justify-between'>
          <p className='flex flex-col'><span className='text-black  font-bold'>Borrowed On:</span>{new Date(borrowedbooks.fromDate).toLocaleDateString()}</p>
          <p className='flex flex-col'><span className='text-black  font-bold'>Submission:</span>{new Date(borrowedbooks.toDate).toLocaleDateString()}</p>
          <p className='flex flex-col'><span className='text-black  font-bold'>Status:</span>{borrowedbooks.returned ? "Returned" : "Borrowed"}</p>
          <p className='flex flex-col'><span className='text-black  font-bold'>Total Fine:</span>{borrowedbooks.fine}</p>
          <button onClick={() => handleReturnClick(borrowedbooks)} className=' py-2 border bg-blue rounded-md text-white uppercase hover:bg-white hover:text-blue hover:border'>Return</button>
          </div>
         
         
    
       
          
        </div>
      ))
    )}
    {showReturnPopup && (
                <ReturnBookPopup 
                showReturnPopup={showReturnPopup}
                setShowReturnPopup={setShowReturnPopup}
                bookToReturn={bookToReturn}
                setBorrowedBookList={setBorrowedBookList}
                />
            )}
  </div>
    )  
}

export default Borrowed
