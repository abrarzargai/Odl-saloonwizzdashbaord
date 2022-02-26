import { Button, message, Modal, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ServicesApi } from "../../../Services/Api";
import '../../Css/Forms.css';
import ServicesSub from '../SubComponents/ServicesSub';


function Utilities() {
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setloading] = useState(true);
    const [image, setimage] = useState();
    const [Data, setData] = useState();
    const { Option } = Select;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    //useEffect
    useEffect(() => {
        ApiCall()
        setloading(false)
    }, [])


    const ApiCall = async () => {

        try {
            const GetHandler = await ServicesApi.GetAll()
            console.log("GetHandler", GetHandler)
            if (GetHandler) {
                setTheArray(GetHandler)
                setloading(false)

            }
            else {
                console.log("check")
                setTheArrayCheck(false)
                setloading(false)
            }

        } catch (error) {
            console.log("Server Error :", error)
            message.error("Server is Down")
            setloading(false)
        }

    }



    const onSubmit = async (data) => {
        console.log(data)
           
            try {
                const Response = await ServicesApi.Add({...data,Type:"MarketingService"})
                const GETUtilitiesHandler = await ServicesApi.GetAll()
                setTheArray(GETUtilitiesHandler)
                setTheArrayCheck(true)
                message.success("Added Successfully")
                setIsModalVisible(false);
            } catch (error) {
                message.error("Server Down...!")
                setIsModalVisible(false);
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
                    <Spin className="SpinClass" size="large" />
                </div>
            ) : (
                <>
                    <div class=" d-flex justify-content-between align-items-center px-3">

                            <h2>   Marketing Services  </h2>
                        <div>
                            <Button
                            
                                style={buttonstyle}
                                onClick={() => { setIsModalVisible(true) }}>
                                Add 
                            </Button>
                        </div>
                    </div>

                    <div className='container-fluid '>
                        <div className='row text-center' >


                            <div class="row">
                                {

                                    theArrayCheck ? (

                                        theArray.map((x) => {
                                            return (
                                               
                                                <ServicesSub id={x._id} Title={x.Title} Duration={x.Duration} Amount={x.Amount} Type={x.Type} Description={x.Description} ApiCall={ApiCall} />
                                           
                                                )
                                        })
                                    ) : (
                                        <div className="mt-4 text-center">
                                            <img src="/no item.png" width="200" height="200" />
                                            <h6> No Data Found </h6>
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
                                    <div class="col-12 ">
                                        <form onSubmit={handleSubmit(onSubmit)} >
                                            <div class="inputbox form-group mt-4">
                                                    <input type="text"  required="required" class="form-control" {...register("Title", { required: true })} />
                                                    <span>Title</span>
                                            </div>
                                             <div class="inputbox form-group mt-4">
                                                   
                                                    <textarea type="text" placeholder='Description' required="required" class="form-control" {...register("Description", { required: true })} />
                                                    
                                            </div>
                                             <div class="inputbox form-group mt-5">
                                                    <input type="text" required="required"  class="form-control" {...register("Amount", { required: true })} />
                                                    <span>Amount</span>
                                            </div>
                                                <div class="inputbox form-group mt-4">
                                                    <select class="form-control" {...register("Duration", { required: true })}>
                                                        <option value="Monthly">Monthly</option>
                                                        <option value="Yearly">Yearly</option>
                                                        <option value="semiYearly">semiYearly </option>
                                                    </select>
                                                   
                                                </div>
                                        
                                           
                                            <input type="submit" style={button2style} value="Add" />
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



