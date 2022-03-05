import React from 'react';
import { Layout, Menu, message, Popconfirm, Modal, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import './SideBarstyle.css'
import {
    SignMeOut
} from '../../../../Store/Action/AuthActions'
import {
    useDispatch, useSelector
} from 'react-redux'
import './SideBarstyle.css'

import {
    UserOutlined, DeploymentUnitOutlined, SettingOutlined, LogoutOutlined, AppstoreOutlined,
    LineChartOutlined, ShopOutlined, CalculatorOutlined, ExceptionOutlined, KeyOutlined, IdcardOutlined,
    FormOutlined, ContainerOutlined, ToolOutlined, AreaChartOutlined
} from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;

const mystyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    minHeight: "100vh",
};
const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color:'white'
};

function SideBar() {
    const navigate = useNavigate()
    const {authSuccess} = useSelector(state => state.AuthReducer);
    const [LogoutModel, setLogoutModel] = useState(false);
    const dispatch = useDispatch();
    const [theArray, setTheArray] = useState([]);

    
    const showModal = () => {
        setLogoutModel(true);
    };

    const handleOk = () => {
        //const getLogout = async () => {
            console.log("going in side bar")
            dispatch(SignMeOut(dispatch));
            //e.preventDefault()
            localStorage.removeItem("profile");
            if (authSuccess === false) {
                message.success("Logout")
                setLogoutModel(false);
                 navigate('/signin')
                
            }
        // }
        // getLogout();
    };

    const handleCancel = () => {
        setLogoutModel(false);
        navigate('/AdminDashboard/')
        
    };

    return (
        <>

            <Modal title="Logout Confirmation" visible={LogoutModel} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <button className=' whitebutton mx-2' onClick={handleCancel}>
                        Cancel
                    </button>,
                    <button className='addButton' key="Logout"
                       
                    onClick={handleOk}>
                        Logout
                    </button>
                ]}
            >
                <p>Are Your Sure ?</p>
                
            </Modal>

            <Sider width={260} className="backgroundClass" breakpoint="sm" collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}

            >

                <div className=" d-flex justify-content-center align-items-center">
                    <h2 className='text-white Saloon'> Saloon</h2>
                </div>
                <div className=" d-flex justify-content-center align-items-center">
                    <h2 className='text-white Wizz'> Wizz</h2>
                </div>


                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                    <Menu.Item key="1" icon={<AppstoreOutlined />}>
                        <Link to="/AdminDashboard/">Home</Link>

                    </Menu.Item>


                    <SubMenu key="sub1" icon={<FormOutlined />} title="Filling"  >
                        <Menu.Item key="2" icon={<CalculatorOutlined />} >
                            <Link to="/AdminDashboard/UtilityBills">Utility Bills</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ExceptionOutlined />} >
                            <Link to="/AdminDashboard/SupplierInvoices">Supplier Invoices</Link>
                        </Menu.Item>
                      
                    </SubMenu>

                    <Menu.Item key="4" icon={<ContainerOutlined />}>
                        <Link to="/AdminDashboard/Utilities">Utilities</Link>
                    </Menu.Item>

                    <Menu.Item key="6" icon={<ContainerOutlined />}>
                        <Link to="/AdminDashboard/ClientManager">Client Manager</Link>
                    </Menu.Item>

                    <SubMenu key="sub2" icon={<ToolOutlined />} title="Services"  >
                        <Menu.Item key="7" icon={<ShopOutlined />}>
                            <Link to="/AdminDashboard/MarketingServices">Marketing Services</Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<LineChartOutlined />}>
                            <Link to="/AdminDashboard/AccountingServices">Accounting Services</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="9" icon={<AreaChartOutlined />}>
                        <Link to="/AdminDashboard/Reports">Reports</Link>
                    </Menu.Item>

                    <Menu.Item key="10" icon={<UserOutlined />}>
                        <Link to="/AdminDashboard/DigitalAssistance">Digital Assistance</Link>
                    </Menu.Item>

                    <Menu.Item key="11" icon={<DeploymentUnitOutlined />}>
                        <Link to="/AdminDashboard/KnowledgedBase">Knowledged Base</Link>
                    </Menu.Item>
                     <Menu.Item key="23" icon={<ExceptionOutlined />} >
                            <Link to="/AdminDashboard/Calender">Calender</Link>
                        </Menu.Item>

                    <Menu.Item key="12" icon={<SettingOutlined />}>
                        <Link to="/AdminDashboard/Settings">Settings</Link>
                    </Menu.Item>
                    <Menu.Item key="14" icon={<ToolOutlined/>}>
                        <Link to="/AdminDashboard/Password">Password</Link>
                    </Menu.Item>

                    <Menu.Item key="13" onClick={() => showModal()} icon={< LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    );
}

export default SideBar;
