import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function PaymentDetails({ setCurrentComponent }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [fineToPay, setFineToPay] = useState(null); // Adjust initial state to null
  const bookDetails = state?.bookDetails;

  console.log('Received state in Payment:', bookDetails);
  if (!bookDetails) {
    navigate('dashboard/user-myshelf')
  }

  const handlePayment = async () => {
    try {
      console.log('Paying fine for book:', bookDetails._id);
      const response = await axios.post(
        'http://localhost:3000/books/payments',
        { borrowId: bookDetails._id, finePaid: bookDetails?.fine },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the state with the response
      setFineToPay(response.data.fineToPay);

      // Log the response to verify
      console.log('Payment Response:', response);

      // Show a success toast and navigate back
      toast.success('Book returned successfully');
      setTimeout(() => {
        navigate('/dashboard/user-myshelf')
      }, 4000);
    } catch (error) {
      if (error.response) {
        console.error('Backend Error:', error.response.data);
        toast.error(error.response.data.message);
      } else {
        console.error('Unexpected Error:', error.message);
        toast.error('An error occurred while processing the payment.');
      }
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Details</h1>
      <p><strong>Book ID:</strong> {bookDetails._id}</p>
      <p><strong>Book Title:</strong> {bookDetails.title}</p>
      <p><strong>Isbn:</strong> {bookDetails.isbn}</p>
      <p><strong>Fine:</strong> Rs.{bookDetails.fine}</p>
      {fineToPay !== null && (
        <p><strong>Fine Status:</strong> {fineToPay === 0 ? 'Fine Cleared' : `Pending Fine: Rs.${fineToPay}`}</p>
      )}
      <Button onClick={handlePayment} text="Pay Now" />
      <ToastContainer />
    </div>
  );
}

export default PaymentDetails;
