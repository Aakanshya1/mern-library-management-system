import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

import { MdEdit, MdDeleteForever} from "react-icons/md";
import EditUserpopup from './popups/EditUserpopup';
import Deleteuserpopup from './popups/Deleteuserpopup';

function AllUsers() {
const [users,setUsers]= useState([]);
const [error,setError]=useState(null);
const [loading, setLoading] = useState(true);
const [showEditPopup, setShowEditPopup] = useState(false);
const [showDeletePopup, setShowDeletePopup] = useState(false);
const [currentUser, setCurrentUser] = useState(null); // For editing
const [userToDelete, setUserToDelete] = useState(null); // For deletion
const [searchQuery,SetSearchQuery] = useState('')
const [AllUsers,setAllUsers] = useState([]);

useEffect(()=>{
  const fetchUsers = async()=>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/alluser`);
      setAllUsers(response.data.users);
      setUsers(response.data.users);
      setLoading(false);
    }catch(err){
        setError(err.message);
        setLoading(false);
    }
  };
  fetchUsers();
},[]);

const handleSearch = async (e)=>{
  const firstnameprefix = e.target.value;
  SetSearchQuery(firstnameprefix);
  if(firstnameprefix){
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/searchedUser?firstnameprefix=${firstnameprefix}`)
      if (response.data.success && response.data.users.length >0) {
        console.log("response from server:", response.data);
        setUsers(response.data.users);
        
      } else {
        console.error("No books found in the response:", response.data.message || '');
        setUsers([]);
      }
    } catch (error) {
      console.error("Error Fetching users:", error);
        setUsers([]);
    }
  }else{
    setUsers(AllUsers);
  }
}
  return (
    <>
     <>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm flex md:flex-row flex-col gap-2 items-center justify-between'>
          <p className='font-bold text-blue text-xl'>Users Management</p>
          <div className='flex md:flex-row flex-col gap-2'>
            
            <input type="search" value={searchQuery} onChange={handleSearch}  placeholder="Search by name" className='p-2 rounded-md shadow-lg text-grey' />
          </div>
        </div>

        <div className='flex flex-col  rounded-md  text-center gap-2'>
          <div className='md:grid grid-cols-5 border-b-2 text-blue  hidden'>
            <p>Firstname</p>
            <p>Phone no</p>
            <p>Email</p>
            <p>Role</p>
            <p>Action</p>
          </div>
          {users.length === 0 ? (
            <p>No Users available</p>
          ) : (
            users.map((user) => (
              <div className='grid md:grid-cols-5 grid-cols-2 text-sm bg-white p-2 ' key={user._id}>
                <p>{user.firstname} <span>{user.lastname}</span> </p>
                <p>{user.phone}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <div className='flex flex-row justify-center text-xl gap-2'>
                  <button onClick={() => { setCurrentUser(user); setShowEditPopup(true); }}><MdEdit /></button>
                  <button onClick={() => { setUserToDelete(user); setShowDeletePopup(true); }}><MdDeleteForever /></button>
                
                </div>
              </div>
            ))
          )}
        </div>

       
         {showEditPopup && <EditUserpopup showEditPopup={showEditPopup} setShowEditPopup={setShowEditPopup} currentUser={currentUser} />}
      
        {showDeletePopup && <Deleteuserpopup  showDeletePopup={showDeletePopup} setShowDeletePopup={setShowDeletePopup} userToDelete={userToDelete} />}

      </div>
    </>
    </>
  )
}

export default AllUsers