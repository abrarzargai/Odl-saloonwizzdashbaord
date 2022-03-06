import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
     <>
        
            <div className="container-fluid">
                <div className="row">
                    <div className="col left" >
                        <img src="/logo.png" alt="Salon-wizz-desktop-logo" className="logo img-fluid" />
                    </div>
                    <div className="col left-top ">
                        <img src="/logo.png" alt="Salon-wizz-mobile-logo" className="logo logo2" />

                        <h1 className="display-4"  style={{textAlign:'center'}}>Welcome to Salon Wizz</h1>
                        <br />  <br />
                        <form className="form1 shadow-lg p-3 mb-5 bg-body rounded "  >

                            <Link to="/login"><button type="submit" className="btn btn-primary btn2" >Sign in</button></Link>
                            <br />
                            <br />
                            <Link to="/signup">       <button type="submit" className="btn btn-primary btn3" >Register</button>
                            </Link>
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
                                <a href="#" className="colorb"><p>Don't have account? Register</p></a>

                            </div>


                        </form>
                        <a href="https://speckpro.com/" className="align colorb"><p>Ⓒ 2022. Powered By SpeckPro Digital</p></a>

                    </div>
                </div>
            </div>









        </>
  )
}

export default Login