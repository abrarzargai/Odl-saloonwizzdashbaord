import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import { useSelector, useDispatch } from 'react-redux'
import { SignMeIn } from '../../Store/Action/AuthActions'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { Button, message, Spin, Modal } from 'antd';
import { useForm } from "react-hook-form";
import { UserApi } from '../../Services/Api';
import { GoogleLogin } from 'react-google-login';
import {
  addData, getAuthError, getAuthStart, removeUser, signup, login, LoginErrorHandler
} from '../../Store/Reducer/AuthReducer';
const init = {
  Email: '',
  Password: ''
}
export default function () {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [userDetails, setUserDetails] = useState(init)
  const [resetPassword, setresetPassword] = useState(false);
  const [restmassage, setrestmassage] = useState(null);
  const [loader, setloader] = useState(true);
  const [user, setuser] = useState(false);
  const [admin, setadmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseFacebook = async(response) => {
    console.log(response);
    try {
      const User = await UserApi.Getoneuser({ Email: response.email })
      console.log("User", User)

      if (User.data.Data[0]) {
        console.log("User", User?.data?.Data[0])
        localStorage.setItem("profile", JSON.stringify(User?.data?.Data[0]));
        dispatch(login({ User: User?.data?.Data[0] }))
        if (User?.data?.Data[0]?.Role) {
          if (User?.data?.Data[0]?.Role === 'admin' || User?.data?.Data[0]?.Role === 'ADMIN') {
            setadmin(true)
          }
          if (User?.data?.Data[0]?.Role === 'user' || User?.data?.Data[0]?.Role === 'USER') {

            setuser(true)
          }
        }
      }
    } catch (error) {
      message.error('User Not Registered Yet')
    }
  }

  const responseGoogle =async (response) => {
    console.log(response);
    try {
      const User = await UserApi.Getoneuser({ Email: response.profileObj.email})
      console.log("User", User)
      
      if(User.data.Data[0]){
        console.log("User", User?.data?.Data[0])
        localStorage.setItem("profile", JSON.stringify(User?.data?.Data[0]));
        dispatch(login({ User: User?.data?.Data[0] }))
        if (User?.data?.Data[0]?.Role) {
          if (User?.data?.Data[0]?.Role === 'admin' || User?.data?.Data[0]?.Role === 'ADMIN') {
            setadmin(true)
          }
          if (User?.data?.Data[0]?.Role === 'user' || User?.data?.Data[0]?.Role === 'USER') {

            setuser(true)
          }
        }
      }
    } catch (error) {
      message.error('User Not Registered Yet')
    }
  }

  const { isAuthFetching, LoginSuccess, Login, errMsg, LoginError, User, adminRole, userRole
  } = useSelector(state => state.AuthReducer);

  const response = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('profile'))
    console.log('response', response)
    if (response) {
      if (response.Role === 'admin' || response.Role === 'ADMIN') {
        setadmin(true)
      }
      if (response.Role === 'user' || response.Role === 'USER') {

        setuser(true)
      }
    }

  }, [])


  const handleData = async (e) => {

    if (userDetails.Email == '' || userDetails.Email == null) {
      message.error('Must Enter Email')
      e.preventDefault()
    }
    if (userDetails.Password == '' || userDetails.Password == null) {
      message.error('Must Enter Password')
      e.preventDefault()
    }
    else {
      console.log(userDetails)
      const sendData = () => {
        Promise.all(dispatch(SignMeIn({ userDetails }, dispatch)))
        console.log('User', User)
        if (User) {
          if (User.Role === 'admin' || User.Role === 'ADMIN') {
            Promise.all(setadmin(true))
            console.log('admin', admin)
          }
          if (User.Role === 'user' || User.Role === 'USER') {

            Promise.all(setuser(true));
            console.log('user', user)
          }
        }

      }
      sendData();
    }

  }
  const HandleResetPassword = async (e) => {
    console.log(userDetails)
    // e.preventDefault()
    if (userDetails.Email == '' || userDetails.Email == null) {
      message.error('Must Enter Email')

    }
    else {
      try {
        const response = await UserApi.ResetPassword({ Email: userDetails.Email });
        console.log(response)
      //  message.info('Please Check your Email')
        setrestmassage('Please Check your Email')
      } catch (error) {
        setrestmassage('User with this Email Not Register yet with Saloonwizz App')
      //  message.error('User with this Email Not Register yet with Saloonwizz App')
        console.log("error==>", error)
      }

    }

  }

  

  return (

    <>
      {userRole ? (
        navigate('/clientdashboard')
      ) : adminRole ? (
        navigate('/admindashboard')
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col left" >
              <img src="/logo.png" alt="Salon-wizz-desktop-logo" className="logo img-fluid" />
            </div>
            <div className="col left-top ">
              <img src="/logo.png" alt="Salon-wizz-mobile-logo" className="logo logo2" />

              <h1 className="display-4" style={{ textAlign: 'center' }}
              >Sign in To Saloon Wizz</h1>
              <br />  <br />

              {
                LoginSuccess === true && (
                  <div className='text-center'>
                    <Typography style={{ color: 'green', textAlign: 'center' }} >User Signed In SuccessFully</Typography>
                  </div>
                )
              }

              {
                LoginError === true && (
                  <div className='text-center'>
                    <Typography style={{ color: 'red', textAlign: 'center' }} >{errMsg}</Typography>
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
                ) : (
                  <button className="btn btn-primary btn2" onClick={handleData} >Login</button>
                )}
                <br />
                <br />

                <p className="align">Or sign in with</p>

                <div className="align">
                  {/* <a className="btn btn-primary colord " href="#!" role="button"
                  >  */}
                        <GoogleLogin
                        clientId="506589582667-94hb4t7qen5o2cr7jkdcqj10ilnv24vl.apps.googleusercontent.com"
                          buttonText="Google"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                    {/* </a> */}
                  {/* <a className="btn btn-primary colord " href="#!" role="button"
                  > <i className="fa-brands fa-google fa-xl	"></i>
                    Google
                    </a> */}
                      <FacebookLogin
                        class="ml-2"
                        appId="363147242343621"
                        autoLoad={true}
                        fields="name,email,picture"
                        icon="fa-facebook"
                        textButton="Facebook"
                        size="small  "
                        cssClass="facebookloginbutton"
                        callback={responseFacebook} />
                  {/* <a className="btn btn-primary colorc" href="#!" role="button"
                  > <i className="fa-brands fa-facebook fa-xl	"></i>
                    Facebook</a> */}
                  <br />
                  <br />
                  <a className="colora" onClick={() => setresetPassword(true)}><p>Forgot your password</p></a>
                  <Link to="/signup" className="colorb"><p>Don't have account? Register</p></Link>

                </div>


              </form>

              <a href="https://speckpro.com/" className="align colorb"><p>Ⓒ 2022. Powered By SpeckPro Digital</p></a>

            </div>
          </div>
        </div>
      )
      }
      <Modal visible={resetPassword} onCancel={() => { setrestmassage(''); setresetPassword(false); }}
        footer={[

        ]}
      >

        {/* Form Stated Here */}

        <div className="container-fluid text-center">
          <div className="row">

            <div class="col-12  align-items-center justify-content-center">

              <div   >
                <p >Please Enter Your Email to Reset the Password</p>

                <div className="mb-3">

                  <input type="email" name="Email" placeholder='Email' onChange={(e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value })} className="form-control" />
                </div>
                
                  <p className="text-primary">{restmassage || ''}</p>
               
                <button className="btn btn-primary btn2" onClick={HandleResetPassword} >Rest Password</button>

              </div>
            </div>
          </div>
        </div>



        {/* Form Ended Here */}

      </Modal >
    </>


  )
}
