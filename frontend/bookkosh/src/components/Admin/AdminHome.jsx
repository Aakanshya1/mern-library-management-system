import React from 'react'
import { FaUser,FaBookOpen} from "react-icons/fa";

function AdminHome() {
  return (
    <>
    <div>
      <div className='flex flex-row justify-around'>
        <div className='flex flex-row gap-8 items-center text-2xl border px-8 rounded-md bg-blue text-white py-6'>
        <span className='border w-fit p-2 rounded-md'><FaBookOpen/></span>
        <span><p>Total Books</p>
        <p>18</p></span>
        </div>
        <div className='flex flex-row gap-8 items-center text-2xl border px-8 rounded-md bg-white text-blue py-6'>
        <span className='border w-fit p-2 rounded-md'><FaBookOpen/></span>
        <span><p>Total Borrowed Books</p>
        <p>18</p></span>
        </div>
        <div className='flex flex-row gap-8 items-center text-2xl border px-8 rounded-md bg-blue text-white py-6'>
        <span className='border w-fit p-2 rounded-md'><FaBookOpen/></span>
        <span><p>Total Users</p>
        <p>18</p></span>
        </div>
      </div>
      <div></div>
    </div>
    </>
  )
}

export default AdminHome