import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Button from '../Button'
import bookimg from '../../assets/images/loginpage.jpg'
function Contribution() {
  const[formData,setFormData]= useState({
    bookname:'',
    authorname:'',
    reason:'',
    category:'',
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitContribution = async (e) => {
    e.preventDefault();
    if (!formData.bookname || !formData.authorname || !formData.reason || !formData.category) {
      toast.error('Please fill all fields');
      return;
    }
    const form = new FormData();
    form.append('bookname', formData.bookname.trim());
    form.append('authorname', formData.authorname.trim());
    form.append('reason', formData.reason.trim());
    form.append(' category', formData.category.trim());
    console.log('Form Data:', {
      bookname: formData.bookname,
      authorname: formData.authorname,
      reason: formData.reason,
      category: formData.category,
    }); // Debugging log
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/books/contribution`, form, {
        headers: {
         'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    
      
      if (response.status === 201) {
        toast.success('Book Contributed successfully');
        setFormData({
          bookname: '',
          authorname: '',
          reason: '',
          category: '',
        });
        
    }
   
    } catch (error) {
      console.error('Error contributing book:', error);
      toast.error('Failed to add the book');
    }
  };

  return (
    <>
    <div className='flex flex-row justify-around '>
      <div className='flex flex-col gap-4 bg-white p-8 '>
        <h1>Fill up Book Details</h1>
        <form onSubmit={handleSubmitContribution} className='flex flex-col gap-4 text-sm' >
          <input 
          name='bookname'
          value={formData.bookname}
          onChange={handleChange} 
          type="text"
          placeholder='Book Name'
          className='text-grey rounded-md p-2 border' />

          <input type="text"
          name='authorname'
          value={formData.authorname}
          onChange={handleChange} 
          placeholder='Author Name' 
          className='text-grey rounded-md p-2 border' />

          <input type="textarea" 
          name='reason'
          value={formData.reason}
          onChange={handleChange} placeholder='Reason For Your Contribution' className='text-grey rounded-md p-2 border' />
          <div className='text-grey'>
          <select
  name="category"
  className="text-xs p-3 rounded-md border w-full"
  value={formData.category} // Bind to state
  onChange={handleChange}  // Handle changes
  required
>
  <option value="All">Select a Category</option>
  <option value="Sci-Fi">Sci-Fi</option>
  <option value="Thriller">Thriller</option>
  <option value="Romance">Romance</option>
  <option value="Fiction">Fiction</option>
  <option value="History">History</option>
  <option value="Discipline">Discipline</option>
  <option value="Horror">Horror</option>
  <option value="Biography">Biography</option>
  <option value="Fantasy">Fantasy</option>
  <option value="Comedy">Comedy</option>
</select>
        </div>
        <Button isprimary text="Submit"/>
        </form>

      </div>
      <div className=' md:visible hidden'>
        <h1 className='text-4xl  font-bold'>Your <span className='text-blue'>Contribution</span> <br /> Helps Other to learn </h1>
        <img src={bookimg} className='w-[300px]' />
      </div>
    </div>
    
    </>
  )
}

export default Contribution