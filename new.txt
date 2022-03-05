import React, { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
    EllipsisOutlined
} from '@ant-design/icons';
import { useForm } from "react-hook-form";

function Settings() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [User, SetUser] = useState({});

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log(response)
        SetUser(response)

    },[])
    async function onSubmit(data) {
        console.log("Data",data)
    }
    return (
        <>
            
            <div className="container-fluid">
                <div className="row"> 
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        <h3 className="text-center">Personal</h3>
                        <div className="bg-light py-4 mb-1 px-3 d-flex align-items-center justify-content-center" >
                            
                            <Avatar size={50} className="mx-4" style={{ color: '#fff0f6', backgroundColor: '#9e1068',fontSize:'30px' }}>{User.FirstName[0]}</Avatar>
                            <h6 class='ml-2' >
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
                                <input type="text" required="required" value={User.FirstName} class="form-control" readonly />
                                <span>FirstName</span>
                            </div>
                        

                        </form>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        <h3 className="text-center">Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-light py-5 px-3 ">  
                        <div class="inputbox form-group my-4">
                                <input type="text" required="required" value={User.FirstName} {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>FirstName</span>
                        </div>
                        <div class="inputbox form-group my-4">
                                <input type="text" required="required" value={User.LastName} {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>LastName</span>
                        </div>
                        <div class="inputbox form-group my-4">
                                <input type="Date" required="required" value="2013-01-08" {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>Date Of Birth</span>
                        </div>
                        <div class="inputbox form-group my-4">
                                <input type="text" required="required" value={User.BusinessName} {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>Business Name</span>
                        </div>
                        <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Demo City" {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>City</span>
                        </div>
                        <div class="inputbox form-group my-4">
                                <input type="text" required="required" value={User.BusinessAddress} {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>Office Address</span>
                        </div>
                        <div class="inputbox form-group my-4">
                                <input type="text" required="required" value="Demo Supplier Name" {...register("OldPassword", { required: true })} class="form-control"  />
                            <span>Supplier Name </span>
                        </div>
                            <input type="submit" style={buttonstyle} value="Update" />
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

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "5px 35px",
    borderRadius: '8px',
};