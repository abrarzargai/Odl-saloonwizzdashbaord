import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { SignMeIn } from '../../Store/Action/AuthActions'
import {useNavigate} from 'react-router-dom'
import { Typography} from '@mui/material'
import { Button, message, Spin } from 'antd';

const init = {
    FirstName: '',
    Password: ''
}
export default function () {
     const [userDetails, setUserDetails] = useState(init)
     const navigate = useNavigate();
    const dispatch = useDispatch();
    const {  isAuthFetching , authSuccess  , errMsg ,  authError} = useSelector(state => state.AuthReducer);

    const handleData = async (e) => {
        const sendData = async () => {
            dispatch(SignMeIn({userDetails} , dispatch));
            e.preventDefault()
            if (authSuccess === true){
              navigate('/')
            }
        }
          sendData();
          
  }

  return (
    <>
    
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
                            authSuccess  === true && (
                                  <Typography  style={{color : 'green'}} >User Signed In SuccessFully</Typography>
                            )
                    }

                      {
                          authError === true && (
                              <Typography  style={{color : 'red' , textAlign :'center'}} >{errMsg}</Typography>
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
              <button type="submit" className="btn btn-primary btn2" onClick={handleData} >Login</button>
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
    
    
    
    
    
    
    </>

  )
}
