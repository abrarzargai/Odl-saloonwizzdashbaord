import React, { useEffect, useState } from 'react';
import { Avatar, Menu, message, Modal, Spin } from 'antd';
import {
    EllipsisOutlined
} from '@ant-design/icons';
import { useForm } from "react-hook-form";
import Axios from "axios";
import { UserApi } from "../../../Services/Api";

function Settings() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [User, SetUser] = useState(null);
    const [linkModel, SetlinkModel] = useState(false);
    const [loading, Setloading] = useState(true);

    const ApiCall = async () => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log("response", response)
        SetUser(response)
    }
    
    useEffect(() => {
        ApiCall();

    },[])
    
    async function UpdateHandler(data) {
        console.log(User.Email, data)
        // try {
        //     const response = await UserApi.Update({ Email: User.Email,...data})
        //     console.log("update api:", response)
        //     message.info("profile updated")
        // } catch (error) {
        //     message.error("server down")
        // }
    }
    
    async function onSubmit(data) {
        console.log("Data",data)
    }

    return (
        
        <>
            {User?(
                <>
            <div className="container-fluid">
                <div className="row"> 
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        
                        <div className="bg-light py-4 mb-1 px-3 d-flex align-items-center justify-content-center" >
                            
                            <Avatar size={75} className="mx-4 backgroundClass text-white" >{User?.FirstName[0] || ''}</Avatar>
                           

                        </div>
                        <form className="bg-light py-5 px-3 ">
                            <div class="inputbox form-group my-4" >
                                <input type="text" required="required"  class="form-control" readonly />
                                <span>FirstName</span>
                            </div>
                        
                           
                        </form>
                        <div className='text-center bg-light pb-4'>
                            <button className='addButton' onClick={()=> SetlinkModel(true)}> Add New Link</button>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        
                                <form onSubmit={handleSubmit(UpdateHandler)} className="bg-light py-5 px-3 ">
                                    <h4 className="text-center">Profile</h4>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue={User?.FirstName || ''} {...register("FirstName", { required: true })} class="form-control" />
                                <span>FirstName</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue={User?.LastName || ''} {...register("LastName", { required: true })} class="form-control" />
                                <span>LastName</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue={User?.BusinessName || ''} {...register("BusinessName", { required: true })} class="form-control" />
                                <span>Business Name</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue={User?.BusinessAddress || ''} {...register("BusinessAddress", { required: true })} class="form-control" />
                                <span>Business Address</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue={User?.PostCode || ''} {...register("PostCode", { required: true })} class="form-control" />
                                <span>Post Code </span>
                            </div>
                           
                            
                            <div className='text-center'>
                            <input type="submit" className='addButton' value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal visible={linkModel} onCancel={() => { SetlinkModel(false); }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center">
                    <h5 >Add New Link</h5>
                    <div class="container">
                        <div class="row">
                           
                            <div class="col-12 ">
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("Title", { required: true })} />
                                        <span>Title</span>
                                    </div>
                                    {/* {errors?.Title?.type === "required" && <p className="text-danger">Must Enter Utility Title</p>} */}


                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("URL", { required: true })} />
                                        <span>URL</span>
                                    </div>
                                    {/*    {errors?.Supplier?.type === "required" && <p className="text-danger">Must Enter Supplier Name</p>} */}

                                    <input type="submit" className='addButton' value="Add new Utility" />
                                </form>

                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >
            </>
            ) : (
                <div>
                    <Spin></Spin>
                    </div>
            )}
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

