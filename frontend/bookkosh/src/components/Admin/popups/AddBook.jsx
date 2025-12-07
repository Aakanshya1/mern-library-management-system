import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = ({ showAddPopup, setShowAddPopup }) => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    category: '',
    description: '',
    author:'',
    bookCount:'',
    bookStatus:'Available',
    bookimage: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      bookimage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('isbn', formData.isbn);
    form.append('title', formData.title);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('author',formData.author);
    form.append('bookimage', formData.bookimage);
    form.append('bookCount', formData.bookCount);
    form.append('bookStatus', formData.bookStatus);
    console.log({
      isbn: formData.isbn,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      author: formData.author,
      bookCount: formData.bookCount,
      bookStatus: formData.bookStatus,
      bookimage: formData.bookimage,
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/books/addbook`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Book added successfully');
      setTimeout(() => {
        setShowAddPopup(false);
      }, 500); 
   
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add the book');
    }
  };

  return (
    <>
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-2xl p-8 w-96">
            <h2 className="font-bold text-center text-xl mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
              <div  className='flex flex-row gap-6'>
              <div>
                <label className="text-blue font-semibold">ISBN</label>
                <input
                  type="text"
                  className="border rounded-md w-full p-1"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>
              </div>
             
             <div>
               <div>
                <label className="text-blue font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  className="border rounded-md w-full p-1"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

             </div>
             
              <div>
                <label className="text-blue font-semibold">Author</label>
                <input
                  type="text"
                  name="author"
                  className="border rounded-md w-full p-1"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='flex flex-row gap-4'>
              <div>
                <label className="text-blue font-semibold">BookStatus</label>
                
                <select
  name="bookStatus"
  className="border rounded-md w-full p-1"
  value={formData.bookStatus}
  onChange={handleChange}
  required
>
  
  <option value="Available">Available</option>
  <option value="Borrowed">Borrowed</option>
</select>

              </div>

              <div>
                <label className="text-blue font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  className="border rounded-md w-full p-1"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              </div>
             
              <div>
                <label className="text-blue font-semibold">Description</label>
                <textarea
                  name="description"
                  className="border rounded-md w-full p-1"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-blue font-semibold">Book Image</label>
                <input
                  type="file"
                  name="bookimage"
                  className=" rounded-md w-full "
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue p-2 rounded-md text-white">
                  Add Book
                </button>
                <button
                  type="button"
                  className="bg-white text-blue border py-2 px-3 rounded-md"
                  onClick={() => setShowAddPopup(false)}
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

export default AddBook;