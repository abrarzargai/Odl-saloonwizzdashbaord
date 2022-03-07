import { Divider, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UsrServicePackageApi } from '../../../Services/Api'
import * as actions from '../../../Store/Action/MarketingServices';
import axios from "axios";

function ServicesSub(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ThanksModel, setThanksModel] = useState(false);
    const [Activate, SetActivate] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    
    useEffect(() => {
        getData();
    }, [])



    console.log("===>Props",props)
    const getData = async () => {
        await axios.get('https://odl-saloonwizz-app.herokuapp.com/api/UserServices/getall')
            .then(function (response) {
                console.log("UserServicesSub Call:", response)
                const User = JSON.parse(localStorage.getItem('profile'))
                console.log('User', User)
                
                Promise.all(response?.data?.Data.map((data) => {
                    if (data.User[0]?.Email === User.Email) {
                        if (data.Package === props.Title){
                            SetActivate(true);
                        }
                    }
                }))
               


            })
            .catch(function (error) {
                // handle error

            })
            .then(function () {
                // always executed
            });
    }


    const onSubmit = async (data) => {
        console.log(data)
        const User = JSON.parse(localStorage.getItem('profile'))
        console.log('User', User)
        try {
            
        
        const Response = await UsrServicePackageApi.Add({
            User:User._id,
            Package: props.Title, Status:'Pending'
        })
        console.log("API aDD Response :", Response)
            
            if (Response){
                message.info("Applied SuccessFully")
                
                setThanksModel(true)
               
            }
            
        } catch (error) {   
            console.log("API Error :",error)
            message.error("server down")

        }
    }

    
    return (
        <>
            <div class="col-sm-3 " onClick={() => setIsModalVisible(true)}>
                <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                    <div class="card-body">
                        <h3 class="card-title" style={{ color: '#9e1068' }} >{props.Title}</h3>
                        <p class="card-title" style={{ color: '#9e1068' }}> £{props.Amount} per {props.Duration} </p>
                        {
                            Activate?(<>
                                <button className='addButton mt-2'> Activated </button>
                            </>):(
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center ">
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center" style={{ color: '#9e1068' }}>
                                 <Divider  >
                                    <h4 style={{ color: '#9e1068' }}>   {props.Title} </h4>  
                                    </Divider> 
                                <p class="card-title">{props.Description}</p>
                                <h4 class="card-title"> £{props.Amount}
                                    <span style={{ fontSize: "16px" }}>  per  </span>
                                   <span style={{fontSize: "18px"}} class="card-title">{props.Duration}</span>
                                </h4>
                                
                         
                                <button className='addButton mt-2' onClick={onSubmit}>Get Package </button>

                        </div>
                    </div>

                </div>
                </div>


                {/* Form Ended Here */}

            </Modal >
            <Modal visible={ThanksModel} onCancel={() => { setThanksModel(false); setIsModalVisible(false); }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}


                
                            <div class="col-12  align-items-center justify-content-center text-center">
                             
                                    <p style={{ color: '#9e1068',fontSize:'18px' }}>   
                                    Thank You for your interest. 
                                     </p>
                    <p style={{ color: '#9e1068', fontSize: '18px',marginBottom:"-5px",marginTop:'-14px' }}>   
                        Our Representative will contact you soon
                                     </p>
                                  
                                

                                <button className='addButton mt-2' onClick={()=>{
                                    setIsModalVisible(false);
                                    setThanksModel(false)
                                }}>Ok </button>

                            </div>
               


                {/* Form Ended Here */}

            </Modal >
        </>

    );
}

export default ServicesSub;







