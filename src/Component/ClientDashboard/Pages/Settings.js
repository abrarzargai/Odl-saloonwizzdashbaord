import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
    EllipsisOutlined
} from '@ant-design/icons';

function Settings() {
    return (
        <>
            
            <div className="container-fluid">
                <div className="row"> 
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        <h3 className="text-center">Personal</h3>
                        <div className="bg-light py-4 mb-1 px-3 d-flex align-items-center justify-content-center" >
                            <Avatar size={100} src="https://joeschmoe.io/api/v1/fr" />
                            <h6 >
                                <p className="pt-5">Update Avatar</p>
                                <p style={{marginTop:"-15px"}}>or Import from Facebook or Instagram</p>
                            </h6>
                            <Dropdown overlay={dropdownmenu} className='text-dark' >
                                <a className="ant-dropdown-link " onClick={e => e.preventDefault()}>
                                    <EllipsisOutlined style={{ fontSize: '26px',color:"gray", marginLeft:"10px" }} 
                                    className="mt-5 ml-2"/>
                                </a>
                            </Dropdown>

                        </div>
                        <form className="bg-light py-5 px-3 ">
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required"  value="first Name" class="form-control" readonly />
                                <span>FirstName</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="last Name" class="form-control" readonly />
                                <span>LastName</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="Date" required="required" value="2013-01-08" class="form-control" readonly />
                                <span>Date Of Birth</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Demo Business" class="form-control" readonly />
                                <span>Business Name</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Demo City" class="form-control" readonly />
                                <span>City</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Demo Office Address" class="form-control" readonly />
                                <span>Office Address</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Demo Supplier Name" class="form-control" readonly />
                                <span>Supplier Name </span>
                            </div>

                        </form>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        <h3 className="text-center">Contact</h3>
                        
                        <form className="bg-light py-5 px-3 ">
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="first Name" class="form-control" readonly />
                                <span>Email Address</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="+1 987 654 321" class="form-control" readonly />
                                <span>Phone</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Facebook/yourName" class="form-control" readonly />
                                <span>Facebook</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Instagram/yourname" class="form-control" readonly />
                                <span>Instagram</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Linkdin/YourName" class="form-control" readonly />
                                <span>Linkdin</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Twitter/yourName" class="form-control" readonly />
                                <span>Twitter</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <button type="text" required="required" value="last Name" class="form-control"  >
                                    Add New Link
                                </button>
                            </div>
                            

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;

const dropdownmenu = (
    <Menu className='mx-2'>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
                Instagram
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
               FaceBook
            </a>
        </Menu.Item>

    </Menu>
);