import React, { useEffect, useState } from 'react';
import login1 from '../assets/images/loginpage.jpg';
import logo from '../assets/images/logo.png';
import { IoMdMail } from "react-icons/io";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in and navigate accordingly
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handlepassword = () => {
        setIsVisible(!isVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("All fields are required");
        }

        try {
            const url = `${import.meta.env.VITE_API_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, firstname, role, details, _id } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInuser', firstname);
                localStorage.setItem('role', role);
                setTimeout(() => {
                    if (role === 'admin') {
                        navigate('/admindashboard');
                    } else if (role === 'librarian') {
                        navigate('/librariandashboard');
                    } else  {
                        navigate('/dashboard');
                    }
                }, 1000);
            } else if (message === "Wrong password") {
                handleError("Incorrect password. Please try again.");
            } else if (message === "Invalid email") {
                handleError("Email not found. Please check and try again.");
            } else if (details) {
                const errorMessage = details.length > 0 ? details[0] : message;
                handleError(errorMessage);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
      const role = localStorage.getItem('role');
      if (role === 'admin') {
          navigate('/admindashboard');
      } else if (role === 'librarian') {
          navigate('/librariandashboard');
      } else if (role === 'user') {
          navigate('/dashboard');
      }
  }, [navigate]);

    return (
        <>
            <div className="flex items-center justify-center md:bg-white h-screen bg-blue">
                <div className="md:flex justify-between md:shadow-2xl">
                    <div className="bg-white md:flex-[0.4] flex-[0] items-center md:p-5 p-0">
                        <form className="flex flex-col gap-2 textsm p-6" onSubmit={handleLogin}>
                            <div className="flex flex-col text-center items-center">
                                <img src={logo} className="w-[100px] justify-center" alt="logo" />
                                <p className="text-sm text-brown">"Welcome Back!</p>
                                <p className="text-grey">Login to continue.</p>
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
                                        value={loginInfo.email}
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
                                        value={loginInfo.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <button className="bg-blue text-white text-sm p-2 rounded-md" type="submit">
                                Login
                            </button>
                            <p className="text-center"> Don't have an account?
                                <Link to='/signup'>Signup</Link>
                            </p>
                        </form>
                    </div>
                    <div className="md:flex-[0.6] flex-[0] md:visible invisible">
                        <img src={login1} alt="login" />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
