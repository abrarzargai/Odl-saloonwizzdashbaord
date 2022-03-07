import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Header from './CommonComponent/Header/Header';
import SideBar from './CommonComponent/SideBar/SideBar';
import MainContent from './CommonComponent/MainContent/MainContent';
import { useNavigate } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import { DigitalAssistanceApi } from '../../Services/Api'

function ClientDashboard() {
 const navigate = useNavigate();
        useEffect(() => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log(response)
        if (!response){
            navigate('/login')
        }
        if (response.Role === 'admin') {
            navigate('/admindashboard')
            }
    }, [])

    const MessageHandler=async ()=>{
        console.log('message')
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log(response)
        const ApiResponse = await DigitalAssistanceApi.Add({
            UserName: response.FirstName +' '+response.LastName,
            isRead:false
        })
        if (ApiResponse){
                console.log("ApiResponse",ApiResponse)
        }
        
    }


    return (
        <Layout>
                <SideBar/>
                <Layout>
                     {/* <Header /> */}
                     <MainContent/>
                <ReactWhatsapp number="+923155591241" message="Hello!!!" onClick={MessageHandler} class="floatwhatsapp ">
                    <i class="fa fa-whatsapp my-floatwhatsapp"></i>
                </ReactWhatsapp>
                </Layout>
        </Layout>
    );
}

export default ClientDashboard;
