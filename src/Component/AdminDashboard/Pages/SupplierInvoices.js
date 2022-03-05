import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, DatePicker, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
import dateFormat from 'dateformat';
import FillingSub from '../SubComponents/FillingSub';
import { DisplayUtilitiyBillApi } from "../../../Services/Api";
import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../Store/Action/UtilityBills';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function SupplierInvoices() {
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [loading, setloading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [DateVariable, setDateVariable] = useState(dateFormat("2019-04-30T08:59:00.000Z", "mmmm d, yyyy"));
    const [Timepicker, setTimepicker] = useState(false);
    const [image, setimage] = useState();
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { currentState } = useSelector(
        (state) => ({ currentState: state.UtilityBills }),
        shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;
    const dispatch = useDispatch();

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile)
        dispatch(actions.fetchUtilityBills(profile.Email));
        // ApiCall()
        // setloading(false)

    }, [])



    const onSubmit = async (data) => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile)

        if (!image) {
            message.error("Must Upload Utility image")
        }
        else {
            var currentTime = new Date();
            let formData = new FormData();
            console.log(currentTime)
            formData.append('Email', profile.Email)
            formData.append('image', image)
            formData.append('Type', "SUPPLIERINVOICES")
            formData.append('Title', data.Title)
            formData.append('Date', currentTime.toString())
            dispatch(actions.createUtilityBill(formData));
            setIsModalVisible(false);
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
                    <span></span>
                    {/* <span onClick={() => {  setTimepicker(true); }} style={{ background:" #f0f2f5 "}}> {DateVariable} </span>

                    <DatePicker  open={Timepicker}  className="timepickerstyle text-danger invisible" allowClear={true} onChange={onChange} /> */}

                </h4>

                <div>
                    <Button
                        style={buttonstyle}
                        onClick={() => { setIsModalVisible(true) }}>
                        Upload a File
                    </Button>
                </div>
            </div>

            {listLoading ? (
                <div class="text-center">
                    <Spin></Spin>
                </div>
            ) : (
                <div className='container-fluid '>
                    <div className='row text-center' >

                        {
                            entities ? (

                                entities.map((x) => {
                                    if (x.Type === 'SUPPLIERINVOICES') {
                                        return (
                                            <FillingSub name={x.Title} image={x.URL} />
                                        )
                                    }
                                })


                            ) : (
                                <div className="mt-4 text-center">
                                    <img src="/no item.png" width="200" height="200" />
                                    <h6> No Data Added Yet </h6>
                                </div>
                            )
                        }







                    </div>
                </div>
            )}
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

                                    <input type="submit" style={button2style} value="Add " />
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

export default SupplierInvoices;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "5px 35px",
    borderRadius: '8px',
    border: "none"
};

const button2style = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 35px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};
const CardStyleUtilities = {
    width: '14.1rem',
    boxShadow: ' 0 5px 5px 1px rgb(138, 138, 138)',

};
const Cardimage = {
    width: '14rem',
    borderRadius: ' 10px 10px 0px 0px'
};

const Data = [
    { name: "Image-1", image: "https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg" },
    { name: "Image-2", image: "https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg" },
    { name: "Image-3", image: "https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg" },
    { name: "Image-4", image: "https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg" },
    { name: "Image-5", image: "https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg" },
    { name: "Image-6", image: "https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg" },
]