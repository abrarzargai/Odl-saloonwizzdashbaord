import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import { DigitalAssistanceApi } from '../../Services/Api';
import MainContent from './CommonComponent/MainContent/MainContent';
import SideBar from './CommonComponent/SideBar/SideBar';
import * as actions from '../../Store/Action/Utilities';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Checkbox, message, Modal, Select, Image, Spin, Divider, Badge } from 'antd';
import UtilitiesModelLogin from './SubComponents/UtilitiesModelLogin';
import { UserutilitiesApi, UserApi } from '../../Services/Api';

function ClientDashboard() {

    const navigate = useNavigate();
    const { currentState } = useSelector(
        (state) => ({ currentState: state.Utilities }),
        shallowEqual
    );
    const { userUtilities, entities, listLoading } = currentState;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUtilties, setselectedUtilties] = useState([]);
    const dispatch = useDispatch();
    const ButtonModelHandler = () => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile)
        dispatch(actions.getOneUserUtilities({ "User": profile._id || '' }));
        setIsModalVisible(true)
    }
    
    useEffect(() => {
       console.log('response', localStorage.getItem('profile'))
        const response = JSON.parse(localStorage.getItem('profile'))
     //   const response = { Role:'user'}
        console.log('response',response)
        if (!response) {
            navigate('/login')
        }
        if (response.Role === 'admin') {
            navigate('/admindashboard')
        }
        if (response.InitLogin === false){
        dispatch(actions.getOneUserUtilities({ "User": response._id || '' }));
        setIsModalVisible(true)
        }
       
    }, [])

    const MessageHandler = async () => {
        console.log('message')
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log(response)
        const ApiResponse = await DigitalAssistanceApi.Add({
            UserName: response.FirstName + ' ' + response.LastName,
            isRead: false
        })
        if (ApiResponse) {
            console.log("ApiResponse", ApiResponse)
        }

    }
    const submitHandler = async () => {
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile)
        console.log('data', selectedUtilties._id);
        if (selectedUtilties.length <1){
            message.error("must select one utility")
        }else{
        Promise.all(
            selectedUtilties.map(async (x) => {
                let formData = new FormData();
                formData.append('UtilitiesTitle', x)
                formData.append('User', profile._id)
                await UserutilitiesApi.Add(formData)

            })
        )
            setIsModalVisible(false)
            await UserApi.Update({ Email: profile.Email, InitLogin: true })
            profile.InitLogin = true
            localStorage.setItem('profile', JSON.stringify(profile))
        }
       
    }


    function onChange(e, object) {
        // console.log(selectedUtilties);
        console.log(`checked = ${e.target.checked}`);
        // console.log(JSON.parse(object).Title);
        if (e.target.checked === true) {
            selectedUtilties.push(JSON.parse(object).Title)
        }
        else {
            const index = selectedUtilties.indexOf(JSON.parse(object).Title);
            selectedUtilties.splice(index, 1);
        }

    }

    return (
        <Layout>
            {/* <button onClick={ButtonModelHandler}>model</button> */}
            <SideBar />
            <Layout>
                {/* <Header /> */}
                <MainContent />
                <ReactWhatsapp number="+923155591241" message="Hello!!!" onClick={MessageHandler} class="floatwhatsapp ">
                    <i class="fa fa-whatsapp my-floatwhatsapp"></i>
                </ReactWhatsapp>
            </Layout>

            {/* Model on firstTime Login start */}
            <Modal width={1000} visible={isModalVisible} onCancel={() => { message.info("Must submit form ") }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}

                <div className='container-fluid '>
                
                    <div class="row bg-white">
                        {

                            userUtilities ? (

                                userUtilities.inaactive.map((x) => {
                                    console.log('x', x)
                                    let object = {};
                                    console.log('v', object)
                                    if (x.Utilities) {
                                        object = x.Utilities
                                    }
                                    else {
                                        object = x
                                    }
                                    console.log('object', object)
                                    return (

                                        <div class="col-sm-3 mt-4 " >
                                            <Checkbox onChange={(e) => onChange(e, JSON.stringify(object))}> </Checkbox>
                                            <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                                                <div class="card-body">


                                                    <img class="card-img-top" src={object.image || ''} alt="" style={{ height: '50px' }} />
                                                    <h5 class="card-title">{object.Title || ''}</h5>
                                                </div>

                                            </div>

                                        </div>


                                    )
                                })
                            ) : (
                                <div className="mt-4 text-center">
                                    <img src="/no item.png" width="200" height="200" />
                                    <h6> No Utility Added Yet </h6>
                                </div>
                            )


                        }

                        <input type="submit" className='addButton mt-2' onClick={submitHandler} />

                    </div>
                </div>


                {/* Form Ended Here */}

            </Modal >
            {/* Model on firstTime Login ended */}
        </Layout>
    );
}

export default ClientDashboard;
