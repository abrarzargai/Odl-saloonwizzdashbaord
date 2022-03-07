import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom'
import Header from './CommonComponent/Header/Header';
import SideBar from './CommonComponent/SideBar/SideBar';
import MainContent from './CommonComponent/MainContent/MainContent';
import { useSelector, useDispatch } from 'react-redux'
function ClientDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { Login, } = useSelector(state => state.AuthReducer);
    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log(response)
        if (!response){
            navigate('/login')
        }
        if (response.Role === 'user') {
            navigate('/clientdashboard')
        }
    }, [])
    return (
        <>
                <>
                    <Layout>
                        <SideBar className="backgroundClass" />
                        <Layout>
                            {/* <Header /> */}
                            <MainContent />
                        </Layout>
                    </Layout>
                </>
            
        </>
    );
}

export default ClientDashboard;
