import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation(); // Access passed data
  const bookDetails = state?.bookDetails;
  console.log('Received state in Payment:', bookDetails);

  const handleLogin = () => {

    navigate('/payment-details', { state: { bookDetails } });
  };

  return (
    <div className="login-container  h-screen w-screen flex flex-col justify-center items-center">
      <div className="form-container border-2 p-8 rounded-md text-blue shadow-2xl  w-fit ">
        <p className='font-bold text-2xl'>Welcome To Payment Gateway</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="phone">Phone no.</label>
          <input type="text" className="p-2 border rounded-lg" placeholder="Phone no." required />
          <label htmlFor="password">Password</label>
          <input className=' p-2 border rounded-lg' type="password" placeholder="Password" required />
          <Button isprimary type="submit" text={"Login"} />
        </form>
      </div>
    </div>
  );
}

export default Payment;
