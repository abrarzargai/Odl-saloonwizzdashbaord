import React from 'react';
import { Layout } from 'antd';
import Header from './CommonComponent/Header/Header';
import SideBar from './CommonComponent/SideBar/SideBar';
import MainContent from './CommonComponent/MainContent/MainContent';

function ClientDashboard() {
    return (
        <Layout>
                <SideBar/>
                <Layout>
                     {/* <Header /> */}
                     <MainContent/>
                </Layout>
        </Layout>
    );
}

export default ClientDashboard;
