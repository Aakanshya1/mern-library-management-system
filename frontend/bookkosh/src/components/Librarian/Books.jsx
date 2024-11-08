import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import axios from 'axios';



function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allBooks,setAllBooks] = useState([]);
  const [searchQuery,SetSearchQuery]= useState('');
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books/showallbooks');
        setAllBooks(response.data.books);
        setBooks(response.data.books);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false); 
      }
    };
    fetchBooks();
  }, []);
  const handleSearch = async (e)=>{
    const isbnPrefix = e.target.value;
    SetSearchQuery(isbnPrefix);
    if(isbnPrefix){
      try {
        const response = await axios.get(`http://localhost:3000/books/searchisbn?isbnPrefix=${isbnPrefix}`);
        if(response.data.success && response.data.books.length >0){
          console.log("response from server:", response.data);
          setBooks(response.data.books);
        }else{
          console.error("No books found in the response:", response.data.message || '');
          setBooks([]);
        }
      } catch (error) {
        console.log("Error Fetching books:",error);
        setBooks([]);
      }
    }else{
      setBooks(allBooks);
    }
   }
  
  
  return (
    <>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm flex md:flex-row flex-col gap-2 items-center justify-between'>
          <p className='font-bold text-blue text-xl'>Book Management</p>
          <div className='flex md:flex-row flex-col gap-2'>
       
            <input type="search" value={searchQuery} onChange={handleSearch} placeholder="Search by isbn" className='p-2 rounded-md shadow-lg text-grey' />
          </div>
        </div>

        <div className='flex flex-col  rounded-md  text-center gap-2'>
          <div className='md:grid grid-cols-5 border-b-2 text-blue  hidden'>
            <p>ISBN</p>
            <p>Title</p>
            <p>Author</p>
            <p>Category</p>
            <p>Status</p>
          </div>
          {books.length === 0 ? (
            <p>No books available</p>
          ) : (
            books.map((book) => (
              <div className='md:grid md:grid-cols-5 p-4 flex flex-row justify-between text-sm bg-white' key={book._id}>
                
                <p className=''>{book.isbn}</p>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <p>{book.category}</p>
                <span className=' ' >Available</span>
              
              </div>
            ))
          )}
        </div>

       

      </div>
    </>
  );
}

export default Books;
