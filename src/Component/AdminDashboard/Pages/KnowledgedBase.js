import React, { useState } from 'react';
import { message, Button, Modal, Select, Image, DatePicker, Space ,Divider} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { RightOutlined } from '@ant-design/icons';
var imgurl1 ='https://media.istockphoto.com/vectors/document-with-alert-or-error-notification-bubble-vector-id1192449401?k=20&m=1192449401&s=612x612&w=0&h=eG076te_eO6mmpQ_uPxfl-ORKqQ7p5HxKi-bHrS3hpQ='
var imgurl2 ='https://image.freepik.com/free-vector/online-art-tutorial-concept-distance-study-art-class-people-learning-draw-digital-program-online-vector-illustration-cartoon-style_277904-6899.jpg'
var imgurl3 ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvp4upGmcvdq4SOdUHQR2dgBs_Z0r-tHxDS4XKmz1isqsHT_JqbCKgYtNbUB2aX8Vymk&usqp=CAU'

function KnowledgedBase() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { Option } = Select;


    function UploadHandler() {
        setIsModalVisible(false);
        message.success("Uploaded successfully")
    }
    const onSubmit = async (data) => {
        console.log(data)
        message.success("New Deal added")
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <>  
         <Divider style={{color: '#9e1068' }} > Knowledged Base  </Divider>
            <div class=" d-flex justify-content-between align-items-center px-3 mb-3">
    
                <h4  >

                   
                </h4>

                <div>
                    <button
                        className='addButton'
                        onClick={() => { setIsModalVisible(true) }}>
                        Upload a File
                    </button>
                </div>
            </div>
           
           
            <div className='container-fluid'>
                <div className='row'>

                    {/* card */}
                    <div class=" col-xl-4 col-lg-4 col-sm-12 col-xs-6 ">
                        <div class="card">
                            <img class="card-img-top" src={imgurl1} height={180} alt="Card image cap" />
                            <div class="card-body">
                                <Link to="/AdminDashboard/KnowledgedBase/faqs">FAQ
                                    <RightOutlined className='RightOutlined' />

                                </Link> 
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div class="col-sm-4 col-xl-4 col-lg-4 col-sm-12 col-xs-6 ">
                        <div class="card">
                            <img class="card-img-top" src={imgurl2} height={180} alt="Card image cap" />
                            <div class="card-body">
                                <Link to="/AdminDashboard/KnowledgedBase/Articles">Articles
                                    <RightOutlined className='RightOutlined' />

                                </Link> 
                                

                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div class="col-sm-4 col-xl-4 col-lg-4 col-sm-12 col-xs-6 ">
                        <div class="card">
                            <img class="card-img-top" src={imgurl3} height={180} alt="Card image cap" />
                            <div class="card-body">
                                <Link to="/AdminDashboard/KnowledgedBase/tutorials">Tutorials
                                    <RightOutlined className='RightOutlined' />
                                
                                </Link>                               
                            </div>
                        </div>
                    </div>
                   

                </div>
            </div>

            {/* Model */}

            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }} footer={[]}>

                {/* Form Stated Here */}


                <div className=" text-center">
                    <h5 >Upload Form</h5>
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center">
                                <div class="form-group files">
                                    <input type="file" class="form-control" multiple="" />
                                </div>
                            </div>
                            <div class="col-12 d-flex align-items-center justify-content-center">


                            </div>
                        </div>
                    </div>
                    {/* //Form */}
                    <form onSubmit={handleSubmit(onSubmit)} >


                        <div class="inputbox form-group mt-4">
                            <input type="text" required="required" class="form-control" {...register("Supplier", { required: true })} />
                            <span>Name</span>
                        </div>
                        <div class="inputbox form-group mt-4">
                            <input type="text" required="required" class="form-control" {...register("Supplier", { required: true })} />
                            <span>Description</span>
                        </div>
                        <div class=" form-group mt-4 mb-3">
                            <Select defaultValue="faq" class="form-control" style={{ width: 420 }} {...register("Supplier", { required: true })} onChange={handleChange}>
                                <Option value="faq">FAQs</Option>
                                <Option value="articles">Articles</Option>
                                <Option value="tutorials" >  Tutorials </Option>
                            </Select>
                            
                        </div>
                        <input type="submit" className='addButton' value="Add " />
                    </form>

                </div>


                {/* Form Ended Here */}

            </Modal >
        </>
    );
}

export default KnowledgedBase;
