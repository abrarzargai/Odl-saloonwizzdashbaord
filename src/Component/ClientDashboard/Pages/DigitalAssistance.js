import { MailOutlined } from '@ant-design/icons';
import { Avatar, Divider, message, Tooltip, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { DigitalAssistanceApi } from "../../../Services/Api";
// import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../Store/Action/DigitalAssistances';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ReactWhatsapp from 'react-whatsapp';
import { Affix, Button } from 'antd';
function DigitalAssistance() {
   
    const App = () => (
        message.info("hello")
        
    );

    return (
        <>
            Digital Assistance
            <ReactWhatsapp number="+923155591241" message="Hello World!!!" class="floatwhatsapp ">
                <i class="fa fa-whatsapp my-floatwhatsapp"></i>
                </ReactWhatsapp>
          
          
        </>
    );
}

export default DigitalAssistance;
