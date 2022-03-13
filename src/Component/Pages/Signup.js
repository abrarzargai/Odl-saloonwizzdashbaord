import { CircularProgress, Typography } from '@mui/material';
import { message, Spin } from 'antd';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SignMeUp } from '../../Store/Action/AuthActions';
import './style.css';


const init = {
  FirstName : '',
  LastName: '',
  Email: '',
  Password: '',
  ContactNumber: '',
  BusinessName: '',
  BusinessAddress: '',
  PostCode: '',
}

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [userDetails, setUserDetails] = useState(init)
  const [ pass, setPass] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {  isAuthFetching , authSuccess , errMsg  , authError} = useSelector(state => state.AuthReducer);


  const handleData = async (data) => {
    console.log(data);
    if(data.ConfirmPassword == data.Password){
      delete data.ConfirmPassword
//e.preventDefault();
  
        const sendData = async () => {
          dispatch(SignMeUp({ ...data} , dispatch));
            if (authSuccess === true){
              navigate('/signin')
            }
          //  e.preventDefault();
        }
        sendData();
      //  e.preventDefault();
    }else{
      message.error('confirm Password not Match')
    }
  }

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    dispatch(SignMeUp({ 
      Email: response.profileObj.email,
      Base: "google",
      FirstName: response.profileObj.givenName,
      LastName: response.profileObj.familyName,
    
    }, dispatch));
    if (authSuccess === true) {
      navigate('/signin')
    }
  }

  const responseFacebook = (response) => {
    console.log(response.email);
    console.log(response.name);
      dispatch(SignMeUp({ 
      Email: response.email,
      Base: "facebook",
        FirstName: response.name,
    
    }, dispatch));
    if (authSuccess === true) {
      navigate('/signin')
    }
  }

    return (
        <>
        
            <div className="container-fluid">
            <div className="row">
                <div className="col left" >
                  <img src="/logo.png" alt="Salon-wizz-desktop-logo" className="logo img-fluid"/>
                  </div>
                <div className="col left-top1 ">
                  <img src="/logo.png" alt="Salon-wizz-mobile-logo" className="logo logo2"/>

                    <h1 className="display-4" style={{textAlign:'center'}}>Register To Saloon Wizz</h1>
                    <br />
                    <br />

                    {
                            authSuccess  === true && (
                      <div className='text-center'>
                                  <Typography  style={{color : 'green'}} >User Signed Up SuccessFully</Typography>
                            </div>
                            )
                    }

                    

                      {
                          authError === true && (
                        <div className='text-center'>
                            <Typography  style={{color : 'red'}} >{errMsg}</Typography>
                  </div>
                          )
                      }

              <form className="form1 shadow-lg p-3 mb-5 bg-body rounded " onSubmit={handleSubmit(handleData)}  >
                      <div className="form-inline form-inline1">
                        <div className="mb-3 wd">
                          <label for="exampleInputEmail1" className="form-label">Fisrt name</label>
                    <input type="text" name="FirstName"  {...register("FirstName", { required: true })}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="John"/>
                        </div>
                        <div className="mb-3 wd">
                          <label for="exampleInputEmail1" className="form-label">Last name</label>
                    <input type="text" name="LastName"  {...register("LastName", { required: true })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="cena"/>
                        </div>
                      </div>

                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" name="Email"   {...register("Email", { required: true })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Johncena@gmail.com"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" name="Password"   {...register("Password", { required: true })} className="form-control" id="exampleInputPassword1" placeholder="********"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                  <input type="password" name="pass"   {...register("ConfirmPassword", { required: true })}  className="form-control" id="exampleInputPassword1" placeholder="********"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Phone number</label>
                  <input type="text" name="ContactNumber"   {...register("ContactNumber", { required: true })}  className="form-control" id="exampleInputPassword1" placeholder="+0-123-456-7"/>
                        </div>
                      
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Business name</label>
                  <input type="text" name="BusinessName"   {...register("BusinessName", { required: true })}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Salon wizz"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Business address</label>
                  <input type="text" name="BusinessAddress"   {...register("BusinessAddress", { required: true })}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Office#234, Hareley street, london, UK"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Post Code</label>
                  <input type="text" name="PostCode"   {...register("PostCode", { required: true })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="44000"/>
                        </div>
                {isAuthFetching ? (
                  <div style={{ padding: '40px 0px', textAlign: 'center' }}>
                    <Spin></Spin>
                  </div>
                ) : (
                        <button type="submit" className="btn btn-primary btn2" >Submit</button>
                )}
                        <br />
                        <br />

                      <p  className="align">Or sign in with</p>

                      <div className="align">
                  <GoogleLogin
                    clientId="506589582667-94hb4t7qen5o2cr7jkdcqj10ilnv24vl.apps.googleusercontent.com"
                     buttonText="Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                        {/* <a className="btn btn-primary colord "  href="#!" role="button"
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
                      {/* <a className="btn btn-primary colorc"  href="#!" role="button"
                      > <i className="fa-brands fa-facebook fa-xl	"></i>
                      Facebook</a> */}
                      <br />
                      <br />
                      <a href="#" className="colora" ><p>Forgot your password</p></a>
                      <Link to="/login" className="colorb"><p>Login</p></Link>

                      </div>
                      
                    
                      </form>
                      <a href="https://speckpro.com/" className="align colorb"><p>Ⓒ 2022. Powered By SpeckPro Digital</p></a>

                </div>
              </div>
          </div>
        </>
    );
  
}

export default Signup;