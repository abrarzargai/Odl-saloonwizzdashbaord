import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
    UserOutlined,
    BellOutlined
} from '@ant-design/icons';


import { Avatar } from 'antd';
import './Header.css'
const { Header } = Layout;

  

function HeaderComp() {

     const [User, SetUser] = useState(null);
     const ApiCall = async () => {
        const response = JSON.parse(localStorage.getItem('profile'))
        console.log("response", response)
        SetUser(response)
    
    }

    useEffect(() => {
        ApiCall();

    }, [])
    return (
       
              <nav class="navbar navbar-light bg-light px-3">
            <p  >Welcome to Dashboard</p>
                <div>
                    
                 <Avatar size={40} className="mr-4 backgroundClass text-white" >{User?.FirstName[0] || ''}</Avatar> 
                </div>
            </nav>

    );
}

export default HeaderComp;
