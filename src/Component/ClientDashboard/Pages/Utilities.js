import React, { useState, useEffect } from 'react';
import { message, Button, Tabs, Select, Image, Spin, Divider, Badge } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
// import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { DisplayUtilitiesApi } from "../../../Services/Api";
import UtilitiesSub from '../SubComponents/UtilitiesSub';
import ActiveUtility from '../SubComponents/ActiveUtility';
import * as actions from '../../../Store/Action/Utilities';
import { shallowEqual, useDispatch, useSelector } from "react-redux";


function Utilities() {
    const [theArray, setTheArray] = useState([]);

    const { TabPane } = Tabs;
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
    const { userUtilities, entities, listLoading } = currentState;
    const dispatch = useDispatch();
    //useEffect
    useEffect( () => {
        ApiCall()   
    }, [])
    const ApiCall = ()=>{
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(profile)
    dispatch(actions.getOneUserUtilities({ "User": profile._id || ''}));
}



    return (
        <>

        {/* Main Tab Code started Here */}
           
        {/* Main Tab Code ended Here */}
            {listLoading ? (
                <div class="text-center">
                <Spin className="SpinClass" size="large" />
                </div>
            ) : (
                <>
                 <Divider style={{color: '#9e1068' }} > Utilities  </Divider>
                    <div className='container-fluid '>
                        <div className='row text-center' >

                                <Tabs type="card" className='bg-white'>
                                    <TabPane tab="InActive Utilities" class="bg-white" style={{minHeight:'90vh'}}  key="1">
                                        <div class="row bg-white">
                                            {

                                                userUtilities ? (

                                                    userUtilities.inaactive.map((x) => {
                                                        console.log('x', x)
                                                        let object = {};
                                                        console.log('v', object)
                                                       if(x.Utilities){
                                                        object = x.Utilities
                                                       }
                                                       else{
                                                        object=x
                                                       }
                                                       console.log('object', object)
                                                        return (
                                                            <UtilitiesSub id={ object._id || ''} name={ object.Title || ''} image={object.image || ''} Supplier={ object.Supplier || ''} ApiCall={ApiCall} />
                                                        )
                                                    })
                                                ) : (
                                                    <div className="mt-4 text-center">
                                                        <img src="/no item.png" width="200" height="200" />
                                                        <h6> No Utility Added Yet </h6>
                                                    </div>
                                                )


                                            }


                                        </div>
                                    </TabPane>
                    {/* **************************Tab 2********************** */}
                                    <TabPane tab="Active Utilities" class="bg-white" style={{ minHeight: '90vh' }} key="2">
                                        <div class="row bg-white">
                                            {

                                                userUtilities?.active?.length || userUtilities ? (

                                                    userUtilities.active.map((x) => {
                                                        console.log('x', x)
                                                        let object = {};
                                                        if(x.Utilities){
                                                         object = x.Utilities
                                                        }
                                                        else{
                                                         object=x
                                                        }
                                                        return (
                                                            <ActiveUtility data={x} id={object._id || ''} name={object.Title || ''} image={ object.image || ''} Supplier={ object.Supplier || ''} ApiCall={ApiCall} />
                                                        )
                                                    })
                                                ) : (
                                                    <div className="mt-4 text-center">
                                                        <img src="/no item.png" width="200" height="200" />
                                                        <h6> No Utility Added Yet </h6>
                                                    </div>
                                                )


                                            }


                                        </div>
                                    </TabPane>
                                </Tabs>
                                        


                        </div>
                    </div>
                    {/* Model Add New Password */}

                  
                </>
            )}

        </>
    );
}

export default Utilities;



