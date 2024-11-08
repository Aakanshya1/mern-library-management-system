import React from 'react'
import { useState } from 'react'
import axios from 'axios'
function ReturnedBook() {
  return (
    <>
    <div className='flex flex-col text-center'>
    <div className='md:grid grid-cols-6 border-b-2 text-blue  hidden '>
      <p>isbn</p>
      <p>title</p>
      <p>Firstname</p>
      <p>Email</p>
      <p>From</p>
      <p>To</p>
   
    </div>
    <div className='grid grid-cols-6 '>
      <p>isbn</p>
      <p>title</p>
      <p>Firstname</p>
      <p>Email</p>
      <p>From</p>
      <p>To</p>
   
    </div>
  </div>
  </>
  )
}

export default ReturnedBook