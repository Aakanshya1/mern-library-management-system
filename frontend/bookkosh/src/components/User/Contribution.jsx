import React from 'react'
import Button from '../Button'
import bookimg from '../../assets/images/loginpage.jpg'
function Contribution() {
  return (
    <>
    <div className='flex flex-row justify-around '>
      <div className='flex flex-col gap-4 bg-white p-8 '>
        <h1>Fill up Book Details</h1>
        <form className='flex flex-col gap-4 text-sm' >
          <input type="text" placeholder='Book Name' className='text-grey rounded-md p-2 border' />
          <input type="text" placeholder='Author Name' className='text-grey rounded-md p-2 border' />
          <input type="textarea" placeholder='Reason For Your Contribution' className='text-grey rounded-md p-2 border' />
          <div className='text-grey'>
          <select className='text-xs p-3 rounded-md border'>
          <option value="All">All Categories</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Fiction">Fiction</option>
            <option value="History">History</option>
            <option value="Discipline">Discipline</option>
            <option value="Horror">Horror</option>
            <option value="Biography">Biography</option>
            <option value="Biography">Fantasy</option>
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