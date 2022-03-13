import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Component/AdminDashboard/AdminDashboard';
import ClientDashboard from './Component/ClientDashboard/ClientDashboard';
import Login from './Component/Pages/Login';
import SignIn from './Component/Pages/Signin';
import Signup from './Component/Pages/Signup';
function App() {

  return (
    <>
     
        <Routes>
         <Route  path="/" element={<Login />} />
          <Route  path="/ClientDashboard/*" element={<ClientDashboard />} />
          <Route  path="/AdminDashboard/*" element={<AdminDashboard />} /> 
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/login" element={<SignIn />} />
           <Route path="*" element={<Login />} />
          
        </Routes>
    </>
  );
}

export default App;
