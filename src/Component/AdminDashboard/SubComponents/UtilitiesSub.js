import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin } from 'antd';
import { useForm } from "react-hook-form";
import { Table, Divider, Space } from 'antd';
import  { DeleteOutlined } from '@ant-design/icons';
import { DisplayUtilitiesApi } from "../../../Services/Api";
import * as actions from '../../../Store/Action/Utilities';
import axios from 'axios';
import { shallowEqual, useDispatch, useSelector } from "react-redux";


function UtilitiesSub(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    var Data = []
       props.Supplier.map((x) => {
       Data.push({ SupplierName:x}) 
         })

    const onSubmit = async (data) => {
        dispatch(actions.AddSupplier({Id: props.id, ...data }));    
    }

     const Delete = async (data) => {
        console.log("delete",data)
         dispatch(actions.deleteSupplier({ Id: props.id, Supplier: data.SupplierName }));     
    }

    const DeleteUtility = async () => {
        console.log("delete", props.id)
        dispatch(actions.deleteUtilities({ Id: props.id }));
        setIsModalVisible(false)
    }


const columns = [
    {
        title: 'SupplierName',
        dataIndex: 'SupplierName'

    },
    {
        title: 'Delete',
        key: 'action',
        render: (text, record) => (
            <Space size="large " className="text-danger" onClick={()=>Delete(record)}>
                <DeleteOutlined style={{ fontSize: "20px" }} />
                Delete
            </Space>
        ),
    },
];



    return (
        <>
            <div class="col-sm-3 " onClick={() => setIsModalVisible(true)}>
                <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                    <div class="card-body">
                       
                        
                        <img class="card-img-top" src={props.image} alt="Card image cap" style={{ height: '50px' }} />
                        <h5 class="card-title">{props.name}</h5>
                        
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
                                <img class="card-img-top" src={props.image} alt="Card image cap" style={{ height: '50px' }} />
                                <h5 class="card-title">{props.name}</h5>
                                <button class='btn btn-outline-danger mb-2 px-4' style={buttondeletestyle} onClick={DeleteUtility} >
                                  
                                    Delete {props.name} Utility </button>
                                {/* Supplier */}
                                <Divider>Suppliers</Divider>
                                <div class="col-12 ">
                                    <div >
                                        <Table class="text-center" columns={columns} dataSource={Data} />
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        
                                        
                                        <div class="inputbox form-group mt-4">
                                            <input type="text" required="required" class="form-control" {...register("Supplier", { required: true })} />
                                            <span>Supplier Name</span>
                                        </div>

                                        <input type="submit" style={button2style} value="Add new Supplier" />
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

export default UtilitiesSub;


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


    


