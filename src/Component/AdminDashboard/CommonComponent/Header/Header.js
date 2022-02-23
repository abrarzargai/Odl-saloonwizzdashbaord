import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
    UserOutlined,
    BellOutlined
} from '@ant-design/icons';


import { Avatar } from 'antd';
import './Header.css'
const { Header } = Layout;

const dropdownmenu = (
    <Menu className='mx-2'>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.google.com">
                2nd menu item
            </a>
        </Menu.Item>

    </Menu>
);
function HeaderComp() {
    return (
       
                <Header className="site-layout-sub-header-background" style={{ padding: 0, }} >
                    <div className='container '>
                        <div className='row  d-flex justify-content-center align-items-center' >
                            <div className='col-8 col-xs-4 col-xl-10 col-lg-8 '>
                                <div class="form-group px-4 ">

                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" />
                         
                                </div>
                            </div>
                    <div className='col-4 col-xl-2 col-xs-8 d-flex justify-content-end align-items-center text-right'>
                        <Dropdown overlay={dropdownmenu} className='text-dark' >
                                    <a className="ant-dropdown-link " onClick={e => e.preventDefault()}>
                                        Client
                                    </a>
                                </Dropdown>

                        <Avatar size={40} icon={<UserOutlined  />} className='mx-3' />
                            </div>
                        </div>

                    </div>
                </Header  >

    );
}

export default HeaderComp;
