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
    <div className="login-container flex flex-col w-fit justify-center">
      <div className="form-container border-2 p-4 justify-center w-fit text-center">
        <h1>Login to Payment Gateway</h1>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="phone">Phone no.</label>
          <input type="text" className="border" placeholder="Phone no." required />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" required />
          <Button type="submit" text={"Login"} />
        </form>
      </div>
    </div>
  );
}

export default Payment;
