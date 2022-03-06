import React , {useEffect , useState} from 'react';
import {useNavigate} from 'react-router-dom'
import ReactDOM from 'react-dom';
import ClientDashboard from './Component/ClientDashboard/ClientDashboard';
import AdminDashboard from './Component/AdminDashboard/AdminDashboard';
import { BrowserRouter, Routes, Route, Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Login from './Component/Pages/Login';
import Signup from './Component/Pages/Signup';
import SignIn from './Component/Pages/Signin'
import './App.css'
function App() {
  const location = useNavigate();
  const [isAdmin, setAdminLogin] = useState(false)


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
