import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
import { useSelector, useDispatch } from "react-redux";
import { DisplayUtilities } from "../../../Store/Action/Action";
import { useForm } from "react-hook-form";
import { DisplayUtilitiesApi } from "../../../Services/Api";
import UtilitiesSub from '../SubComponents/UtilitiesSub';


function Utilities() {
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setloading] = useState(true);
    const [image, setimage] = useState();
    const [Data, setData] = useState();
    const { Option } = Select;
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    //useEffect
    useEffect( () => {
        ApiCall()
        setloading(false)
    }, [])


     const ApiCall =async ()=>{

          try {
            const GETUtilitiesHandler = await DisplayUtilitiesApi.GetAll()
             console.log("GETUtilitiesHandler",GETUtilitiesHandler)
            if(GETUtilitiesHandler){
                console.log("GETUtilitiesHandler",GETUtilitiesHandler)
                setTheArray(GETUtilitiesHandler)
       
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

    function UploadHandler() {
        onSubmit()
        setIsModalVisible(false);
        message.success("Uploaded successfully")
    }

    const onSubmit = async (data) => {
        if (!image) {
            message.error("Must Upload Utility icon image")
        }
        else{
        let formData = new FormData();
        formData.append('image', image)
        formData.append('Title', data.Title)
        formData.append('Supplier', data.Supplier)
        try {
            const Response = await DisplayUtilitiesApi.AddUtilities(formData)
              const GETUtilitiesHandler = await DisplayUtilitiesApi.GetAll()
              setTheArray(GETUtilitiesHandler)
               setTheArrayCheck(true)
            message.success("New Utility added successfully")
            setIsModalVisible(false);
        } catch (error) {
            message.error("Cannot add new utility at this time")
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

    return (
        <>
            {loading ? (
                <div class="text-center">
                <Spin className="SpinClass" />
                </div>
            ) : (
                <>
                    <div class=" d-flex justify-content-between align-items-center px-3">

                        <h2>   Utilities {theArray.length } </h2>
                        <div>
                            <Button
                                style={buttonstyle}
                                onClick={() => { setIsModalVisible(true) }}>
                                Add Utility
                            </Button>
                        </div>
                    </div>

                    <div className='container-fluid '>
                        <div className='row text-center' >


                           <div class="row">
                               {
                               
                                    theArrayCheck ?(

                                            theArray.map((x)=>{
                                                return (
                                                    <UtilitiesSub id={x._id} name={x.Title} image={x.image} Supplier={x.Supplier} ApiCall={ApiCall}/>
                                                )
                                            })
                                    ):(
                                    <div className="mt-4 text-center">
                                          <img src="/no item.png"  width="200" height="200" />
                                          <h6> No Utility Added Yet </h6>
                                    </div>
                                    )


                               }
                                    
                                  
                            </div>                 


                        </div>
                    </div>
                    {/* Model Add New Password */}

                    <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                        footer={[
                            // <div div className='text-center' >
                            //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                            // </div>
                        ]}
                    >

                        {/* Form Stated Here */}


                        <div className=" text-center">
                            <h5 >Add New Utility</h5>
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

                                            <input type="submit" style={button2style} value="Add new Utility" />
                                        </form>

                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* Form Ended Here */}

                    </Modal >
                </>
            )}

        </>
    );
}

export default Utilities;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 35px",
    borderRadius: '8px',
    border: "none"
};

const button2style = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "10px 35px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};
const CardStyleUtilities = {
    width: '14rem',
    boxShadow: ' 0 5px 5px 1px rgb(138, 138, 138)',
    borderRadius: '10px'
};
const Cardimage = {

    borderRadius: ' 10px 10px 0px 0px'
};



const DemoData =[
    { name:"Gass", image:"/flame.svg", Supplier:["Supplier-1","Supplier-2","Supplier-3"]},
    { name: "Water", image: "/drop.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/flame.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Water", image: "/garbage.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/lightning.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/lightning.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/lightning.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/lightning.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/lightning.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
    { name: "Gass", image: "/lightning.svg", Supplier: ["Supplier-1", "Supplier-2", "Supplier-3", "Supplier-4"]},
]
