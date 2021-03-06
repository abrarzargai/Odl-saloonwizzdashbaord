import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin } from 'antd';
import { useForm } from "react-hook-form";
import { Table, Divider, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ServicesApi } from "../../../Services/Api";
import axios from 'axios';
import * as actions from '../../../Store/Action/MarketingServices';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function ServicesSub(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    

    const onSubmit = async (data) => {
        console.log(data, props.id)
        dispatch(actions.updateMarketingService({ Id: props.id, ...data }));
        setIsModalVisible(false)
    }


    const Delete = async (data) => {
        dispatch(actions.deleteMarketingService({ Id: props.id}));
        setIsModalVisible(false);
    }



    return (
        <>
            <div class="col-sm-3 " onClick={() => setIsModalVisible(true)}>
                <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                    <div class="card-body">
                        <h3 class="card-title" style={{ color: '#9e1068' }} >{props.Title}</h3>
                        <p class="card-title" style={{ color: '#9e1068' }}> £{props.Amount} per {props.Duration} </p>
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


                <div className=" text-center pt-3">
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center">
                                <h5 class="card-title">{props.Title}</h5>
                                <h5 class="card-title">{props.Duration}</h5>
                                <h5 class="card-title"> $ {props.Amount}</h5>
                                <h5 class="card-title">{props.Description}</h5>
                                <button class='btn btn-outline-danger mb-2 px-4'  onClick={Delete} >

                                    Delete {props.Title} Service </button>
                                {/* Supplier */}
                                <Divider>Suppliers</Divider>
                                <div class="col-12 ">
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" defaultValue={props.Title} {...register("Title", { required: true })} />
                                        <span>Title</span>
                                    </div>
                                    <div class="inputbox form-group mt-4">

                                        <textarea type="text" placeholder='Description' defaultValue={props.Description } required="required" class="form-control" {...register("Description", { required: true })} />

                                    </div>
                                    <div class="inputbox form-group mt-5">
                                        <input type="text" required="required" defaultValue={props.Amount } class="form-control" {...register("Amount", { required: true })} />
                                        <span>Amount</span>
                                    </div>
                                    <div class="inputbox form-group mt-4">
                                        <select class="form-control" defaultValue={props.Duration} {...register("Duration", { required: true })}>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                            <option value="semiYearly">semiYearly </option>
                                        </select>

                                    </div>


                                       

                                        <input type="submit" className='addButton' value="Update" />
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >
        </>

    );
}

export default ServicesSub;







