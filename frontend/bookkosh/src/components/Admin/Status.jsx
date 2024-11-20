import React from 'react'
import { useState } from 'react'
import BorrowedBook from './popups/BorrowedBook'
import ReturnedBook from './popups/ReturnedBook'
import ReservedBook from './popups/ReservedBook'
function Status() {
  const [selectedStatus,SetSelectedStatus]= useState('borrowed');
  const  books={
    borrowed:{
      statusname:<BorrowedBook/>
    },
    returned:{
      statusname:<ReturnedBook/>
    },
    reserved:{
      statusname:<ReservedBook/>
    }
 
  }
   
  const handleStatusClick=(book)=>{
    SetSelectedStatus(book)
  }

  const currentStatus= books[selectedStatus];
  return (
    <>
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <div>
        <button onClick={()=>handleStatusClick('borrowed')} className={`px-4 py-2 rounded-md ${selectedStatus=='borrowed'?'bg-blue text-white ':'bg-white text-blue '}`}>Borrowed Book</button>
        <button onClick={()=>handleStatusClick('returned')} className={`px-4 py-2 rounded-md ${selectedStatus=='returned'?'bg-blue text-white ':'bg-white text-blue '}`}>Returned Book</button>
        <button onClick={()=>handleStatusClick('reserved')} className={`px-4 py-2 rounded-md ${selectedStatus=='reserved'?'bg-blue text-white ':'bg-white text-blue '}`}>Reserved Book</button>
        </div>
        {/* <div>
          <input type="Search " placeholder='Search by isbn' className='p-2 rounded-md shadow-lg text-grey'/>
        </div> */}
       
      </div>
    
      <div className=''>
        <div>
          {currentStatus.statusname}
        </div>
      </div>
    </div>
    </>
  )
}

export default Status