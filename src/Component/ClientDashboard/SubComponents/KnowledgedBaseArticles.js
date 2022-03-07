import React, { useState ,useEffect } from 'react';
import { message, Button, Modal, Select, Image, DatePicker, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
import dateFormat from 'dateformat';
import KnowledgedBaseSub from '../SubComponents/KnowledgedBaseSub';
import { useSelector, useDispatch } from "react-redux";
import { KnowledgedBaseApi } from "../../../Services/Api";
import { useForm } from "react-hook-form";
import { Breadcrumb } from 'antd';
import {  Routes, Link } from 'react-router-dom';


function UTILITYBILL() {
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [loading, setloading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [DateVariable, setDateVariable] = useState(dateFormat("2019-04-30T08:59:00.000Z", "mmmm d, yyyy"));
    const [Timepicker, setTimepicker] = useState(false);
     const [image, setimage] = useState();
      const { register, handleSubmit, watch, formState: { errors } } = useForm()
    //useEffect
    useEffect(() => {
        ApiCall()
        setloading(false)
    
    }, [])

       const ApiCall =async ()=>{

          try {
            const GETUtilitiesHandler = await KnowledgedBaseApi.GetAll()
             console.log("GETUtilitiesHandler",GETUtilitiesHandler)
            if(GETUtilitiesHandler){
               let Temp = []
               GETUtilitiesHandler.map((x)=>{
                   if(x.Type === 'Articles'){
                       Temp.push(x)
                       }
                   
               })

                setTheArray(Temp)
                   if(Temp.length <1)  {
                     setTheArrayCheck(false)
                }  

       
            }
            else{
                console.log("check")
                setTheArrayCheck(false)
            }
              
                    } catch (error) {
                            console.log("Server Error :",error)
                            message.error("Server is Down")
                    }

        }

        const onSubmit = async (data) => {
        if (!image) {
            message.error("Must Upload Utility image")
        }
        else{
        let formData = new FormData();
        formData.append('image', image)
        formData.append('Type', "Articles")
        formData.append('Title', data.Title)
        formData.append('Description', data.Description)
        try {
            const Response = await KnowledgedBaseApi.Add(formData)
             ApiCall()
               setTheArrayCheck(true)
            message.success("New  added successfully")
            setIsModalVisible(false);
        } catch (error) {
            message.error("Cannot add at this time")
            setIsModalVisible(false);
        }
}
    }

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setimage(img)
        }
    };

    
    function UploadHandler() {
        setIsModalVisible(false);
        message.success("Uploaded successfully")
    }

    function onChange(date, dateString) {

        setTimepicker(false)
        setDateVariable(dateFormat(dateString, "mmmm d, yyyy"))
        
    }

    return (
        <>

            <div class=" d-flex justify-content-between align-items-center px-3">

                <h4  >  
                    
                    {/* <span onClick={() => {  setTimepicker(true); }} style={{ background:" #f0f2f5 "}}> {DateVariable} </span>

                    <DatePicker  open={Timepicker}  className="timepickerstyle text-danger invisible" allowClear={true} onChange={onChange} />
                     */}

                      <Breadcrumb>
    <Breadcrumb.Item>

       <Link to="/AdminDashboard/KnowledgedBase">Knowledged Base</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>Articles</Breadcrumb.Item>
  </Breadcrumb>
                     </h4>

                <div>
                    {/* <button
                       className='addButton'
                        onClick={() => { setIsModalVisible(true) }}>
                        Upload a File
                    </button> */}
                </div>
            </div>

            <div className='container-fluid '>
                <div className='row text-center' >

                    {
                               theArrayCheck ?(

                                    theArray.map((x)=>{
                                        return(
                                            <KnowledgedBaseSub name={x.Title } image={x.URL} desciption={x.Description} />
                                        )
                                    })


                            ):(
                                    <div className="mt-4 text-center">
                                          <img src="/no item.png"  width="200" height="200" />
                                          <h6> No Data Added Yet </h6>
                                    </div>
                                    )
                    }
                    






                </div>
            </div>
            {/* Model Add New Password */}

            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Upload </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center">
                    <h5 >Upload Form</h5>
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
                                                <span>Name</span>
                                            </div>
                                            <div class="inputbox form-group mt-4">
                                                <input type="text" required="required" class="form-control" {...register("Description", { required: true })} />
                                                <span>Description</span>
                                            </div>
                                    
                                    <input type="submit" className='addButton' value="Add " />
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

export default UTILITYBILL;
