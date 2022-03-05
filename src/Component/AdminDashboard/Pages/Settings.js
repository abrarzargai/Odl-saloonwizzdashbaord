import React, { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import {
    EllipsisOutlined
} from '@ant-design/icons';
import { useForm } from "react-hook-form";

function Settings() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [User, SetUser] = useState({});
    const [linkModel, SetlinkModel] = useState(false);

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log("response", response)
        SetUser(response)

    },[])
    async function onSubmit(data) {
        console.log("Data",data)
    }
    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substr(0, 10);
    return (
        <>
            
            <div className="container-fluid">
                <div className="row"> 
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        <h3 className="text-center">Personal</h3>
                        <div className="bg-light py-4 mb-1 px-3 d-flex align-items-center justify-content-center" >
                            
                            <Avatar size={75} className="mx-4 backgroundClass text-white" >sddsfsdf</Avatar>
                           

                        </div>
                        <form className="bg-light py-5 px-3 ">
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required"  class="form-control" readonly />
                                <span>FirstName</span>
                            </div>
                        
                            <div className='text-center'>
                                <button type="submit" className='addButton'> Add New Link</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">
                        <h3 className="text-center">Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-light py-5 px-3 ">
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue='Demo' {...register("OldPassword", { required: true })} class="form-control" />
                                <span>FirstName</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue='Demo' {...register("OldPassword", { required: true })} class="form-control" />
                                <span>LastName</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="date" required="required" defaultValue={date} {...register("OldPassword", { required: true })} class="form-control" />
                                <span>Date Of Birth</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue='Demo' {...register("OldPassword", { required: true })} class="form-control" />
                                <span>Business Name</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue="Demo City" {...register("OldPassword", { required: true })} class="form-control" />
                                <span>City</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue='Demo' {...register("OldPassword", { required: true })} class="form-control" />
                                <span>Office Address</span>
                            </div>
                            <div class="inputbox form-group my-4">
                                <input type="text" required="required" defaultValue="Demo Supplier Name" {...register("OldPassword", { required: true })} class="form-control" />
                                <span>Supplier Name </span>
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
                            <div class="col-12  align-items-center justify-content-center">
                                <div class="form-group files">
                                    <input type="file" class="form-control" multiple="" onChange={onImageChange} />
                                </div>
                            </div>
                            <div class="col-12 ">
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("Title", { required: true })} />
                                        <span>Utility Title</span>
                                    </div>
                                    {/* {errors?.Title?.type === "required" && <p className="text-danger">Must Enter Utility Title</p>} */}


                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("Supplier", { required: true })} />
                                        <span>Supplier Name</span>
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

