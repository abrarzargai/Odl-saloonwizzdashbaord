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
    const {authSuccess} = useSelector(state => state.AuthReducer);
  
  //checking if admin logged in or not
  useEffect(() => {
    const checkAdmin = () => {
      //let  user = []
      const user = JSON.parse(localStorage.getItem('profile'))
      console.log("user : ", user?.length)
      if (user) {
        setAdminLogin(true)
      } else {
        setAdminLogin(false)
      }
    }
    checkAdmin();
  }, [authSuccess])
  return (
    <>
    {console.log("isAdmin : ", isAdmin)}
        <Routes>

          {
              <Route exact path="/ClientDashboard/*" element={
                isAdmin ? (
                  <ClientDashboard/>
                ) : (
                  <Login/>
                )
              } />
            }

            {
              <Route exact path="/" element={
                isAdmin ? (
                  <ClientDashboard/>
                ) : (
                  <Login/>
                )
              } />
            }

            {
              <Route exact path="/*" element={
                isAdmin ? (
                  <ClientDashboard/>
                ) : (
                  <Login/>
                )
              } />
            }

            {
              <Route exact path="/AdminDashboard/*" element={
                isAdmin ? (
                  <AdminDashboard/>
                ) : (
                  <Login/>
                )
              } />
            }

            {
              <Route exact path="/signin" element={
                isAdmin ? (
                  <AdminDashboard/>
                ) : (
                  <Login/>
                )
              } />
            }

            {
              <Route exact path="/login" element={
                isAdmin ? (
                  <AdminDashboard/>
                ) : (
                  <SignIn/>
                )
              } />
            }


          {/* <Route path="/ClientDashboard/*" element={<ClientDashboard />} />
          <Route path="/AdminDashboard/*" element={<AdminDashboard />} /> */}
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/login" element={<SignIn />} /> */}
          {/* <Route path="/*" element={<Login />} /> */}
        </Routes>
    </>
  );
}

export default App;
