import React from 'react';
import { Layout, Menu, message, Popconfirm, Modal, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { SignMeOut } from '../../../../Store/Action/AuthActions'
import {  useDispatch } from 'react-redux'
import './SideBarstyle.css'
import { useSelector } from 'react-redux'
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
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [LogoutModel, setLogoutModel] = useState(false);
    const {authSuccess} = useSelector(state => state.AuthReducer);

    const showModal = () => {
        setLogoutModel(true);
    };

    const handleOk = async (e) => {
        // const getLogout = async () => {
        //     console.log("modal closing")
        //     dispatch(SignMeOut(dispatch));
        //     e.preventDefault()
        //     console.log("authSuccess : ", authSuccess)
        //     if (authSuccess == false) {
        //         navigate('/ClientDashboard/')
        //         console.log("success false")
        //         setLogoutModel(false);
        //         message.success("Logout")
        //         localStorage.removeItem("profile");
        // }
        // getLogout();
        // }
    };

    const handleCancel = () => {
        setLogoutModel(false);
        navigate('/ClientDashboard/')
        
    };

    return (
        <>

            <Modal title="Logout Confirmation" visible={LogoutModel} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="Logout"
                        style={buttonstyle}
                    onClick={handleOk}>
                        Logout
                    </Button>
                ]}
            >
                <p>Are Your Sure ?</p>
                
            </Modal>

            <Sider width={260} style={mystyle} breakpoint="sm" collapsedWidth="0"
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


                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} SelectedKeysc  >
                    <Menu.Item key="1" icon={<AppstoreOutlined />}>
                        <Link to="/ClientDashboard/">Home</Link>

                    </Menu.Item>


                    <SubMenu key="sub1" icon={<FormOutlined />} title="Filling"  >
                        <Menu.Item key="2" icon={<CalculatorOutlined />} >
                            <Link to="/ClientDashboard/UtilityBills">Utility Bills</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ExceptionOutlined />} >
                            <Link to="/ClientDashboard/SupplierInvoices">Supplier Invoices</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<KeyOutlined />}  >
                            <Link to="/ClientDashboard/Password">Password</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<IdcardOutlined />}  >
                            <Link to="/ClientDashboard/General">General</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="6" icon={<ContainerOutlined />}>
                        <Link to="/ClientDashboard/Utilities">Utilities</Link>
                    </Menu.Item>

                    <SubMenu key="sub2" icon={<ToolOutlined />} title="Services"  >
                        <Menu.Item key="7" icon={<ShopOutlined />}>
                            <Link to="/ClientDashboard/MarketingServices">Marketing Services</Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<LineChartOutlined />}>
                            <Link to="/ClientDashboard/AccountingServices">Accounting Services</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="9" icon={<AreaChartOutlined />}>
                        <Link to="/ClientDashboard/Reports">Reports</Link>
                    </Menu.Item>

                    <Menu.Item key="10" icon={<UserOutlined />}>
                        <Link to="/ClientDashboard/DigitalAssistance">Digital Assistance</Link>
                    </Menu.Item>

                    <Menu.Item key="11" icon={<DeploymentUnitOutlined />}>
                        <Link to="/ClientDashboard/KnowledgedBase">Knowledged Base</Link>
                    </Menu.Item>

                    <Menu.Item key="12" icon={<SettingOutlined />}>
                        <Link to="/ClientDashboard/Settings">Settings</Link>
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
