import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin } from 'antd';
import { useForm } from "react-hook-form";
import { Table, Divider, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ServicesApi } from "../../../Services/Api";
import axios from 'axios';

function ServicesSub(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        const APIHandler = await ServicesApi.Update({
            Id: props.id, ...data
        })
        if (APIHandler) {
          await props.ApiCall()
            setIsModalVisible(false)
            message.success("Updated")
            

        }
        else {

            message.error(" System Down...!")
            setIsModalVisible(false)
        }

    }


    const Delete = async (data) => {
        console.log("delete", data)

        const APIHandler = await ServicesApi.Delete({
            Id: props.id
        })
        if (APIHandler) {
            props.ApiCall()
            message.success(" deleted")
            setIsModalVisible(false)

        }
        else {
            message.error(" System Down..!")
            setIsModalVisible(false)
        }

    }



    return (
        <>
            <div class="col-sm-3 " onClick={() => setIsModalVisible(true)}>
                <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                    <div class="card-body">
                        <h5 class="card-title">{props.Title}</h5>
                        <h5 class="card-title">{props.Duration}</h5>
                        <h5 class="card-title">{props.Type}</h5>
                        <h5 class="card-title"> $ {props.Amount}</h5>
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
                                <button class='btn btn-outline-danger mb-2 px-4' style={buttondeletestyle} onClick={Delete} >

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


                                       

                                        <input type="submit" style={button2style} value="Update" />
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


const button2style = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "10px 35px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};
const buttondeletestyle = {

};





