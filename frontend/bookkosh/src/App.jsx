import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import RefrshHandler from '../RefrshHandler'; 

import Paymentdetails from './components/User/Paymentdetails';
import Payment from './components/Payment';
import UserDashboard from './components/User/UserDashboard';
import Search from './components/User/Search';
import Myshelf from './components/User/Myshelf';
import Contribution from './components/User/Contribution';
import User from './components/User/User';

import Dashboardadmin from './pages/Dashboard/Dashboardadmin'
import AdminHome from './components/Admin/AdminHome';
import AllBooks from './components/Admin/AllBooks';
import AllUsers from './components/Admin/AllUsers';
import Status from './components/Admin/Status';
import ContributionList from './components/Admin/ContributionList';
import Profile from './components/Admin/Profile';





import Dashboardlibrarian from './pages/Dashboard/Dashboardlibrarian'
import { elements } from 'chart.js';
import Librarianhome from './components/Librarian/Librarianhome';
import Books from './components/Librarian/Books';
import Users from './components/Librarian/Users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />;
  }

  return (
    <>
       <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/payment-login' element={ <PrivateRoute  element={<Payment/>}/>} />
        <Route path='/payment-details' element={ <PrivateRoute  element={<Paymentdetails/>}/>} />

        <Route path="/librariandashboard" element={<PrivateRoute element={<Dashboardlibrarian />} />}>
  <Route index element={<Librarianhome />} />
  <Route path="librarian-books" element={<Books />} />
  <Route path="librarian-users" element={<Users />} />
  <Route path="librarian-status" element={<Status />} />
  <Route path="librarian-profile" element={<Profile />} />
</Route>


    
       <Route path="/admindashboard" element={<PrivateRoute element={<Dashboardadmin />} />}>
  <Route index element={<AdminHome />} />
  <Route path="admin-books" element={<AllBooks />} />
  <Route path="admin-users" element={<AllUsers />} />
  <Route path="admin-status" element={<Status />} />
  <Route path="admin-contributions" element={<ContributionList />} />
  <Route path="admin-profile" element={<Profile />} />
</Route>

  
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}>
          <Route index element={<PrivateRoute element={<UserDashboard />} />} />
          <Route path="user-search" element={<Search />} />
          <Route path="user-myshelf" element={<Myshelf />} />
          <Route path="user-contribution" element={<Contribution />} />
          <Route path="user-user" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
