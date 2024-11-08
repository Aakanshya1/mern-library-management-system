import React from 'react'
import { useState } from 'react';
import login1 from '../assets/images/loginpage.jpg';
import logo from '../assets/images/logo.png';
import { IoMdMail } from "react-icons/io";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { Link,useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

function Signup() {
    const [isVisible, setIsVisible] = useState(false);
    const [signupInfo, setSignupInfo] = useState({
        firstname: '',
        lastname:'',
        phone:'',
        email: '',
        password: '',
        confirmpassword:'',
    })
   const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const handlepassword = () => {
        setIsVisible(!isVisible);
      };
      const handleSignup = async (e)=>{
        e.preventDefault();
        const{ firstname,
            lastname,
            phone,
            email,
            password,
            confirmpassword,}= signupInfo;
            if(!firstname || !lastname || !phone ||!email || !password || !confirmpassword){
                return handleError("all fields are required");
            }

            try {
                const url = 'http://localhost:3000/auth/signup';
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(signupInfo)
                });
                const result = await response.json();
                const  {success,message,details }=result;
                if (success) {
                    handleSuccess(message);
                    setTimeout(()=>{
                        navigate('/login')
                    },1000)
                } else if(details) {
                  const errorMessage = details && details.length > 0 ? details[0] : message;
                  handleError(errorMessage); // Show the specific validation error in toas
                }else if(!success){
                  handleError(message);
                }
             
                console.log(result);
            } catch (err) {
                handleError(err);
            }
      }

  return (
    <>
    <div className="flex items-center justify-center md:bg-white h-full bg-blue ">
    <div className="md:flex justify-between md:shadow-2xl">
      <div className="bg-white md:flex-[0.4] flex-[0] items-center md:p-5 p-0    ">
      <form action="" className="flex flex-col gap-2 textsm p-6" onSubmit={handleSignup} >
            <div className="flex flex-col text-center items-center">
            <img src={logo} className="w-[100px] justify-center" />
            <p className="text-sm text-brown">Register</p>
            <p className="text-grey">"Signin to continue"</p>
    </div>


  <div className="text-xs">
    <label htmlFor="first-name">First Name</label>
    <input
      type="text"
      placeholder="First name"
      className="rounded-md text-grey border p-2 textsm drop-shadow-lg w-full"
      id="first-name" 
      name="firstname"
      value={signupInfo.firstname}
      onChange={handleChange}
    />
  </div>

  <div className="text-xs">
    <label htmlFor="last-name">Last Name</label>
    <input
      type="text"
      placeholder="Last Name"
      className="rounded-md text-grey border p-2 textsm drop-shadow-lg w-full"
      id="last-name" 
      name="lastname"
      value={signupInfo.lastname}
      onChange={handleChange}
    />
  </div>

  <div className="text-xs">
    <label htmlFor="phone-no">Phone no</label>
    <input
      type="text"
      placeholder="9876532466"
      className="rounded-md text-grey border p-2 textsm drop-shadow-lg w-full"
      id="phone-no" 
      name="phone"
      value={signupInfo.phone}
      onChange={handleChange}
    />
  </div>


<div className="text-xs">
<label htmlFor="email">Email</label>
<div className="flex relative">
  <IoMdMail className="text-grey mt-3 absolute z-10 right-2" />
  <input
    type="email"
    placeholder="login@gmail.com"
    className="rounded-md text-grey border p-2 textsm drop-shadow-lg w-full"
    id="email" 
    name="email"
    value={signupInfo.email}
    onChange={handleChange}
  />
</div>
</div>

<div className="text-xs">
<label htmlFor="password">Password</label><br />
<div className="flex relative">
  <button
    className="text-grey mt-3 absolute z-10 right-2"
    type="button"
    onClick={handlepassword}
  >
    {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
  </button>
  <input
    type={isVisible ? "text" : "password"}
    placeholder="password"
    className="rounded-md text-grey border p-2 drop-shadow-lg w-full textsm"
    id="password" 
    name="password"
    value={signupInfo.password}
    onChange={handleChange}
  />
</div>
</div>

<div className="text-xs">
  <label htmlFor="confirm-password">Confirm Password</label><br />
  <div className="flex relative">
    <button
      className="text-grey mt-3 absolute z-10 right-2"
      type="button"
      onClick={handlepassword}
    >
      {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
    </button>
    <input
      type={isVisible ? "text" : "password"}
      placeholder="password"
      className="rounded-md text-grey border p-2 drop-shadow-lg w-full textsm"
      id="confirm-password" // Correct ID
      name="confirmpassword"
      value={signupInfo.confirmpassword}
      onChange={handleChange}
    />
  </div>
</div>


<button className="bg-blue text-white text-sm p-2 rounded-md" type="submit">
Signup
</button>
<p className="text-center">
             Already have an account?
             <Link to='/login'>Login</Link>
           
          </p>
</form>

      </div>

      <div className="md:flex-[0.6] flex-[0] md:visible invisible  flex justify-center items-center ">
        <img src={login1} className='p-4 justify-center items-center' />
      </div>
    </div>
  </div>
  <ToastContainer/>
</>
  )
}

export default Signup