import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'



function Users() {
const [users,setUsers]= useState([]);
const [error,setError]=useState(null);
const [showEditPopup, setShowEditPopup] = useState(false);
const [showDeletePopup, setShowDeletePopup] = useState(false);
const [currentUser, setCurrentUser] = useState(null); // For editing
const [userToDelete, setUserToDelete] = useState(null); // For deletion


useEffect(()=>{
  const fetchUsers = async()=>{
    try{
      const response = await axios.get('http://localhost:3000/api/alluser');
      setUsers(response.data.users);
    }catch(err){
        setError(err.message);
    }
  };
  fetchUsers();
},[]);
  return (
    <>
     <>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm flex md:flex-row flex-col gap-2 items-center justify-between'>
          <p className='font-bold text-blue text-xl'>Users Management</p>
          <div className='flex md:flex-row flex-col gap-2'>
            
            <input type="search" placeholder="Search by id" className='p-2 rounded-md shadow-lg text-grey' />
          </div>
        </div>

        <div className='flex flex-col  rounded-md  text-center gap-2'>
          <div className='md:grid grid-cols-4 border-b-2 text-blue  hidden'>
            <p>Firstname</p>
            <p>Phone no</p>
            <p>Email</p>
            <p>Role</p>
           
          </div>
          {users.length === 0 ? (
            <p>No books available</p>
          ) : (
            users.map((user) => (
              <div className='grid md:grid-cols-4 grid-cols-2 text-sm bg-white p-2 ' key={user._id}>
                <p>{user.firstname} <span>{user.lastname}</span> </p>
                <p>{user.phone}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
                
              </div>
            ))
          )}
        </div>

       

      </div>
    </>
    </>
  )
}

export default Users;