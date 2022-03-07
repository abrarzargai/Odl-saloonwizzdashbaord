import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin,Divider } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
// import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { DisplayUtilitiesApi } from "../../../Services/Api";
import UtilitiesSub from '../SubComponents/UtilitiesSub';
import * as actions from '../../../Store/Action/Utilities';
import { shallowEqual, useDispatch, useSelector } from "react-redux";


function Utilities() {
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setloading] = useState(true);
    const [image, setimage] = useState();
    const [Data, setData] = useState();
    const { Option } = Select;
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { currentState } = useSelector(
        (state) => ({ currentState: state.Utilities }),
        shallowEqual
      );
      const { totalCount, entities, listLoading } = currentState;
    const dispatch = useDispatch();
    //useEffect
    useEffect( () => {
         dispatch(actions.fetchUtilities());        
    }, [])


    const onSubmit = async (data) => {
        if (!image) {
            message.error("Must Upload Utility icon image")
        }
        else{
        let formData = new FormData();
        formData.append('image', image)
        formData.append('Title', data.Title)
        formData.append('Supplier', data.Supplier)
            dispatch(actions.createUtility(formData));
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
            {listLoading ? (
                <div class="text-center">
                <Spin className="SpinClass" size="large" />
                </div>
            ) : (
                <>
                 <Divider style={{color: '#9e1068' }} > Utilities  </Divider>
                    <div class=" d-flex justify-content-between align-items-center px-3">
            <h6></h6>
                         
                        <div>
                            {/* <button
                                    className='addButton'
                                onClick={() => { setIsModalVisible(true) }}>
                                Add Utility
                            </button > */}
                        </div>
                    </div>

                    <div className='container-fluid '>
                        <div className='row text-center' >


                           <div class="row">
                               {
                               
                                        entities ?(

                                            entities.map((x)=>{
                                                return (
                                                    <UtilitiesSub id={x._id} name={x.Title} image={x.image} Supplier={x.Supplier} ApiCall={"ApiCall"}/>
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

                                                <input type="submit" className='addButton' value="Add new Utility" />
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
