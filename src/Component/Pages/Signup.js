import React , {useState} from 'react';
import {Link} from 'react-router-dom'
import {CircularProgress, Typography} from '@mui/material'
import './style.css'
import { useSelector , useDispatch } from 'react-redux'
import { SignMeUp } from '../../Store/Action/AuthActions'
import {useNavigate} from 'react-router-dom'



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
  const [userDetails, setUserDetails] = useState(init)
  const [ pass, setPass] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {  isAuthFetching , authSuccess , errMsg  , authError} = useSelector(state => state.AuthReducer);


    const handleData = async (e) => {
      if (pass !== userDetails?.Password){
        alert("Passwords Do Not Match")
        e.preventDefault();
      }else{
        const sendData = async () => {
            dispatch(SignMeUp({userDetails} , dispatch));
            if (authSuccess === true){
              navigate('./Login')
            }
            e.preventDefault();
        }
        sendData();
        e.preventDefault();
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
                                  <Typography  style={{color : 'green'}} >User Signed Up SuccessFully</Typography>
                            )
                    }

                    {
                          isAuthFetching === true && (
                              <CircularProgress style={{marginTop: '30px' , marginLeft : '150px' ,  }} size="5rem" />
                          )
                      }

                      {
                          authError === true && (
                            <Typography  style={{color : 'red'}} >{errMsg}</Typography>
                          )
                      }

                    <form className="form1 shadow-lg p-3 mb-5 bg-body rounded "  >
                      <div className="form-inline form-inline1">
                        <div className="mb-3 wd">
                          <label for="exampleInputEmail1" className="form-label">Fisrt name</label>
                          <input type="text" name="FirstName" value={userDetails?.FirstName} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="John"/>
                        </div>
                        <div className="mb-3 wd">
                          <label for="exampleInputEmail1" className="form-label">Last name</label>
                          <input type="text" name="LastName" value={userDetails?.LastName} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="cena"/>
                        </div>
                      </div>

                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" name="Email" value={userDetails?.Email} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Johncena@gmail.com"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" name="Password" value={userDetails?.Password} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="********"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                          <input type="password" name="pass" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="********"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputPassword1" className="form-label">Phone number</label>
                          <input type="text" name="ContactNumber" value={userDetails?.ContactNumber} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="+0-123-456-7"/>
                        </div>
                      
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Business name</label>
                          <input type="text" name="BusinessName" value={userDetails?.BusinessName} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Salon wizz"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Business address</label>
                          <input type="text" name="BusinessAddress" value={userDetails?.BusinessAddress} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Office#234, Hareley street, london, UK"/>
                        </div>
                        <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Post Code</label>
                          <input type="text" name="PostCode" value={userDetails?.PostCode} onChange={(e) => setUserDetails({...userDetails , [e.target.name] : e.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="44000"/>
                        </div>
                        <button type="submit" className="btn btn-primary btn2" onClick={handleData} >Submit</button>
                        <br />
                        <br />

                      <p  className="align">Or sign in with</p>

                      <div className="align">
                        <a className="btn btn-primary colord "  href="#!" role="button"
                      > <i className="fa-brands fa-google fa-xl	"></i>
                      Google</a>
                      <a className="btn btn-primary colorc"  href="#!" role="button"
                      > <i className="fa-brands fa-facebook fa-xl	"></i>
                      Facebook</a>
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