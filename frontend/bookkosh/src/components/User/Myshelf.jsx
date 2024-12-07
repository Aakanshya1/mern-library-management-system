import React from 'react'
import { useState } from 'react'
import Borrowed from '../User/popups/Borrowed'
import Returned from '../User/popups/Returned'
import Reserved from '../User/popups/Reserved'
function Myshelf() {
  
  const [selectedStatus,SetSelectedStatus]=useState('borrowed')
  const status ={
    borrowed:{
      statusname:<Borrowed/>
    },
    returned:{
      statusname:<Returned/>
    },
    reserved:{
      statusname:<Reserved/>
    }
  }
  const handleBookStatus=(statu)=>{
    SetSelectedStatus(statu);
  }
  const currentStatus = status[selectedStatus];
  return (
   <>
   <div className=''>
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row gap-10'>
        <button onClick={()=>handleBookStatus('borrowed')} className={`px-4 py-2 rounded-md ${selectedStatus=='borrowed'?'bg-blue text-white ':'bg-white text-blue '}`}>Borrowed Books</button>
        <button onClick={()=>handleBookStatus('returned')} className={`px-4 py-2 rounded-md ${selectedStatus=='returned'?'bg-blue text-white ':'bg-white text-blue '}`}>Returned Books</button>
        <button onClick={()=>handleBookStatus('reserved')} className={`px-4 py-2 rounded-md ${selectedStatus=='reserved'?'bg-blue text-white ':'bg-white text-blue '}`}>Reserved Books</button>
      </div>
      <div >
        {currentStatus.statusname}
      </div>
    </div>
   </div>
   </>
  )
}

export default Myshelf