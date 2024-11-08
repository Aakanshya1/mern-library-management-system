import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import RefrshHandler from '../RefrshHandler'; 
import Dashboardadmin from './pages/Dashboard/Dashboardadmin';
import Dashboardlibrarian from './pages/Dashboard/Dashboardlibrarian';
import AdminHome from './components/Admin/AdminHome';


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
        <Route path='/admindashboard/*' element={<PrivateRoute element={<Dashboardadmin/>} />} />
        <Route path='/librariandashboard/*' element={<PrivateRoute element={<Dashboardlibrarian />} />} />
        <Route path='/dashboard/*' element={<PrivateRoute element={<Dashboard />} />} />
        
      </Routes>
    </>
  );
}

export default App;
