import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { SignMeIn } from '../../Store/Action/AuthActions'
import {useNavigate} from 'react-router-dom'
import { Typography} from '@mui/material'
import { Button, message, Spin } from 'antd';
import { useForm } from "react-hook-form";
const init = {
    Email: '',
    Password: ''
}
export default function () {

   const { register, handleSubmit, watch, formState: { errors } } = useForm();
     const [userDetails, setUserDetails] = useState(init)
     const [loader, setloader] = useState(true)
     const navigate = useNavigate();
    const dispatch = useDispatch();
  const { isAuthFetching, LoginSuccess, Login, errMsg, LoginError
} = useSelector(state => state.AuthReducer);
  const response = JSON.parse(localStorage.getItem('profile'))
     useEffect(() => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log(response)
        if (response){
            navigate('/admindashboard')
        }
        setloader(false)
    }, [])
    const handleData = async (e) => {
    
      if (userDetails.Email == '' || userDetails.Email == null ){
          message.error('Must Enter Email')
        e.preventDefault()
      }
      if (userDetails.Password == '' || userDetails.Password == null) {
        message.error('Must Enter Password')
        e.preventDefault()
      }
      else{
      console.log(userDetails)
        const sendData = async () => {
            dispatch(SignMeIn({userDetails} , dispatch));
            e.preventDefault()
          if (Login === true){
              navigate('/')
            }
        }
          sendData();
      }
     
  }

  return (
    <>
    {Login || response ?(
        navigate('/admindashboard')
    ):(
    <div className="container-fluid">
        <div className="row">
            <div className="col left" >
<img src="/logo.png" alt="Salon-wizz-desktop-logo" className="logo img-fluid"/>
</div>
            <div className="col left-top ">
              <img src="/logo.png" alt="Salon-wizz-mobile-logo" className="logo logo2"/>

                <h1 className="display-4" style={{textAlign:'center'}}
                >Sign in To Saloon Wizz</h1>
                  <br/>  <br/>

                    {
              LoginSuccess  === true && (
                              <div className='text-center'>
                              <Typography style={{ color: 'green', textAlign: 'center'}} >User Signed In SuccessFully</Typography>
                              </div>
                            )
                    }

                      {
                          LoginError === true && (
                                <div className='text-center'>
                              <Typography  style={{color : 'red' , textAlign :'center'}} >{errMsg}</Typography>
                             </div>
                          )
                      }

         <form className="form1 shadow-lg p-3 mb-5 bg-body rounded "  >


              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="Email" value={userDetails?.Email} onChange={(e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Johncena@gmail.com" />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="Password" value={userDetails?.Password} onChange={(e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value })} className="form-control" id="exampleInputPassword1" placeholder="********" />
              </div>
              {isAuthFetching ? (
                <div style={{ padding: '40px 0px', textAlign: 'center' }}>
                  <Spin></Spin>
                </div>
              ):(
              <button className="btn btn-primary btn2" onClick={handleData} >Login</button>
              )}
              <br />
              <br />

              <p className="align">Or sign in with</p>

              <div className="align">
                <a className="btn btn-primary colord " href="#!" role="button"
                > <i className="fa-brands fa-google fa-xl	"></i>
                  Google</a>
                <a className="btn btn-primary colorc" href="#!" role="button"
                > <i className="fa-brands fa-facebook fa-xl	"></i>
                  Facebook</a>
                <br />
                <br />
                <a href="#" className="colora" ><p>Forgot your password</p></a>
                <Link to="/signup" className="colorb"><p>Don't have account? Register</p></Link>

              </div>


            </form> 
               
                  <a href="https://speckpro.com/" className="align colorb"><p>Ⓒ 2022. Powered By SpeckPro Digital</p></a>

            </div>
          </div>
      </div>
    
    
    
    
    )
}
    
    </>

  )
  
}
