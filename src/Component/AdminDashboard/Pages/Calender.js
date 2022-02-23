import React, { useState } from 'react';
import { message, Button, Modal } from 'antd';
import '../../Css/Forms.css'
import { useForm } from "react-hook-form";
import { Tag, Divider } from 'antd';
function Calender() {

 
    return (
        <>

         <Divider  > Calender </Divider>
                 
              

        </>
    );
}

export default Calender;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "5px 35px",
    borderRadius: '8px',
};