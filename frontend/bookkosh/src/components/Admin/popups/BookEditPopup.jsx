import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookEditPopup = ({ showEditPopup, setShowEditPopup, currentBook }) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    category: '',
    description: '',
    author: '',
    bookCount:0,
    bookStatus:'',
    bookimage: '',
  });
  const [file, setFile] = useState(null); // State to store selected file

  useEffect(() => {
    if (currentBook) {
      setFormData({
        isbn: currentBook.isbn,
        title: currentBook.title,
        category: currentBook.category,
        description: currentBook.description,
        author: currentBook.author,
        bookCount:currentBook.bookCount,
        bookStatus:currentBook.bookStatus||0,
        bookimage: currentBook.bookimage, // Set current book image URL
      });
    }
  }, [currentBook]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'bookimage') {
      // If file input is changed, handle the file
      setFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedFormData = new FormData();
    
    // Append form data fields
    updatedFormData.append('isbn', formData.isbn);
    updatedFormData.append('title', formData.title);
    updatedFormData.append('category', formData.category);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('author', formData.author);
    updatedFormData.append('bookCount',formData.bookCount);
    updatedFormData.append('bookStatus',formData.bookStatus);
    
    // Append file if there's a new image selected
    if (file) {
      updatedFormData.append('bookimage', file);
    }
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/books/updatebook/${currentBook._id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Book updated successfully');
      setTimeout(() => {
        setShowEditPopup(false);
      }, 500);
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update the book');
    }
  };

  return (
    <>
      {showEditPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-2xl p-10 w-96 text-xs">
            <h2 className="font-bold text-center text-xl mb-4">Edit Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 ">
              <div className='flex flex-row '>
                {/* Show current book image */}
                {formData.bookimage && (
                  <img
                    src={formData.bookimage}
                    alt="Current book"
                    style={{ width: '50px', height: 'auto', marginBottom: '10px' }}
                  />
                )}
               
                <input
                  type="file"
                  name="bookimage"
                  onChange={handleChange}
                  className=" rounded-md w-full p-2"
                />
              </div>
              {/* Form Fields */}
              <div className='flex flex-row gap-6'>
                <div>
                <label className="text-blue font-semibold">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                  className="border rounded-md w-full p-2"
                />
                </div>
                <div>
                <label className="text-blue font-semibold">No of copies</label>
                <input
                  type="number"
                  className="border rounded-md w-full p-1"
                  name="bookCount"
                  value={formData.bookCount}
                  onChange={handleChange}
                  
                />
              </div>
              </div>

               <div className='flex flex-row gap-6'>
               <div>
                <label className="text-blue font-semibold">BookStatus</label>
                
                <select
  name="bookStatus"
  className="border rounded-md w-full p-1"
  value={formData.bookStatus}
  onChange={handleChange}
  required
>
  <option value="" disabled>Select status</option>
  <option value="Available">Available</option>
  <option value="Borrowed">Borrowed</option>
</select>

              </div>

               <div>
                <label className="text-blue font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="border rounded-md w-full p-2"
                />
              </div>


               </div>
                
              
              
              <div>
                <label className="text-blue font-semibold">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div>
                <label className="text-blue font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border rounded-md w-full p-2"
                />
              </div>
             
              
             
              
              <div>
                <label className="text-blue font-semibold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border rounded-md w-full p-2"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue p-2 rounded-md text-white">
                  Update Book
                </button>
                <button
                  type="button"
                  className="bg-white text-blue border py-2 px-3 rounded-md"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default BookEditPopup;
