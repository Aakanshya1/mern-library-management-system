import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ReservedBook() {
    const [reservationbooks, setReservationBooks] = useState([]);  // Initializing to empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchReservedBooks = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/reservedbooks`);
          setReservationBooks(response.data.reservationbooks);
          console.log(response);
          console.log(response.data.reservationbooks);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchReservedBooks();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
  <div className="flex flex-col text-left gap-2">
    <div className=" md:grid sm:grid-cols-2 md:grid-cols-5 border-b-2  text-blue gap-4 font-semibold hidden">
      <p>ISBN</p>
      <p>Title</p>
      <p>Firstname</p>
      <p>Reserved At</p>
      <p>Status</p>
     
    </div>
    
    {reservationbooks.length === 0 ? (
      <p className="text-center mt-4">No reserved books</p>
    ) : (
        reservationbooks.map((reservedbook) => (
        <div key={reservedbook._id} className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-4 text-left text-sm  bg-white  p-2 ">
          <p>{reservedbook.isbn}</p>
          <p>{reservedbook.title}</p>
          <p>{reservedbook.firstname} <span>{reservedbook.lastname}</span>
          </p>
          <p>
     
        {new Date(reservedbook.reservedAt).toLocaleDateString()}{" "}
        {new Date(reservedbook.reservedAt).toLocaleTimeString()}
      </p>
      <p>{reservedbook.status}</p>
    
        </div>
      ))
    )}
  </div>
    );
}

export default ReservedBook