import React, { useEffect, useState } from 'react';
import { Avatar, Menu, message, Modal, Spin, Tag, Divider,Space,Tooltip} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useForm } from "react-hook-form";
import Axios from "axios";
import { UserApi } from "../../../Services/Api";

function Settings() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [User, SetUser] = useState(null);
    const [Profile, SetProfile] = useState(null);
   const [linkModel, SetlinkModel] = useState(false);
    const [loading, Setloading] = useState(true);
    const [Title, SetTitle] = useState(null);
    const [URL, SetURL] = useState(null);

    const ApiCall = async () => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log("response", response)
        SetUser(response)
        SetProfile(response)
    }

    useEffect(() => {
        ApiCall();

    }, [])

    async function UpdateHandler(data) {
        console.log(User.Email, data)
        try {
            const response = await UserApi.Update({ Email: User.Email, ...data })
            console.log("update api:", response)

            const UserTemp = Object.assign({ ...Profile, ...data })
            localStorage.setItem('profile', JSON.stringify(UserTemp))
            console.log(UserTemp)
            SetUser(UserTemp)
            message.info("profile updated")
        } catch (error) {
            console.log(error)
            message.error("server down")
        }
    }

    const AddLinkHandler =async () => {
        console.log(User.Email, URL, Title)
        if (!URL) { message.error('must enter URL of a link') }
        if (!Title) { message.error('must enter Title of a link') }
        if (URL && Title) {
            try {
                const response = await UserApi.AddLink({
                    Email: User.Email, Title: Title,
                    URL: URL })
                console.log(response)
                console.log(response.data.Data)
                localStorage.setItem('profile', JSON.stringify(response.data.Data))
               
                SetUser(response.data.Data)
                message.info("New social Media Link Added")
                SetlinkModel(false)
            } catch (error) {
                message.error("Link with this Title already added")
                console.log(error)
            }
        }
    }

    const Delete = async (data) => {
        console.log(User.Email, data)
      
            try {
                const response = await UserApi.DeleteLink({
                    Email: User.Email, Title: data.Title })
                console.log(response)
                localStorage.setItem('profile', JSON.stringify(response.data.Data))
               
                SetUser(response.data.Data)
                message.info(" social Media Link Deleted")
                SetlinkModel(false)
            } catch (error) {
                message.error("SERVER DOWN")
                console.log(error)
            }
        
    }

    return (

        <>
            {User || Profile ? (
                <>
                    <div className="container-fluid">
                      <Divider style={{color: '#9e1068' }} > Setting </Divider>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">

                                <div className="bg-light py-4 mb-1 px-3 d-flex align-items-center justify-content-center" >

                                    <Avatar size={75} className="mx-4 backgroundClass text-white" >{User?.FirstName[0] || ''}</Avatar>


                                </div>
                                <form className=" pb-5 pt-2 px-3 bg-light ">
                                    <Divider style={{color: '#9e1068' }} >Social Media Links</Divider>
                                    {User.SocialMedia.length>0 ?  (
                                        <>
                                            {User.SocialMedia.map(entity => {
                                                return(
                                                    
                                                      <div className='my-2'>
                                                       <Tooltip placement="topLeft" title={entity.URL || ''}>
                                                    <Tag style={{ width: '85%' }} className='px-3' color="magenta" >   
                                                        <a href={`http://${entity.URL || ''}`} className='linkTag py-1' target='_blank' rel="noreferrer noopener" >{entity.Title.toUpperCase() || ''} </a>
                                                        </Tag> 
                                                         </Tooltip>
                                                        <span size="large " className="text-danger linkTagDeleteButton align-items-center justify-content-center text-center" onClick={() => Delete(entity)}>
                                                            <DeleteOutlined style={{ fontSize: "20px" }}  />
                                                            <span>
                                                            Delete
                                                            </span>
                                                        </span>
                                                     
                                                  </div>   
                                                
                                                )
                                            })}
                                        </>
                                    ) : (

                                        <p className='text-center'> No SocialMedia Link Added yet </p>
                                    )

                                    }




                                </form>
                                <div className='text-center bg-light pb-4'>
                                    <button className='addButton' onClick={() => SetlinkModel(true)}> Add New Social Media Link</button>
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-12 col-12 col-sm-12 col-xs-12 ">

                                <form onSubmit={handleSubmit(UpdateHandler)} className="bg-light pb-5 px-3 pt-2 ">
                                    <Divider color="magenta" style={{ color: '#9e1068' }}>Profile</Divider>
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
                                        <form >
                                            <div class="inputbox form-group mt-4">
                                                <input type="text" required class="form-control" onChange={e => SetTitle(e.target.value)} />
                                                <span>Title</span>
                                            </div>
                                            {/* {errors?.Title?.type === "required" && <p className="text-danger">Must Enter Utility Title</p>} */}


                                            <div class="inputbox form-group mt-4">
                                                <input type="text" required class="form-control" onChange={e => SetURL(e.target.value)} />
                                                <span>URL</span>
                                            </div>
                                            {/*    {errors?.Supplier?.type === "required" && <p className="text-danger">Must Enter Supplier Name</p>} */}

                                            <input type="button" className='addButton' value="Add new Link" onClick={AddLinkHandler} />
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

