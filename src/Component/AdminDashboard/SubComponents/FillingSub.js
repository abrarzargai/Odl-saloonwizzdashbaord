import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin } from 'antd';
import { useForm } from "react-hook-form";
import { Table, Tag, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import  '../../Css/FillingSub.css';


function FillingSub(props) {
 console.log("props",props)
    

    return (
        <>
            <div class="card m-2  m-1 d-flex align-items-center justify-content-center mb-4 container" style={CardStyleUtilities}>
                <Image
                    style={Cardimage}
                    class="card-img-top"
                    src={props.image}
                />
                
                <div class="content text-white">
                    <h4 class=" text-light">{props.name}</h4>
                </div>
            </div>
        </>

    );
}

export default FillingSub;


const CardStyleUtilities = {
    width: '14.1rem',
    boxShadow: ' 0 5px 5px 1px rgb(138, 138, 138)',

};
const Cardimage = {
    width: '14rem',
    borderRadius: ' 10px 10px 0px 0px'
};
const cardtext = {
    position:'relative',
   top:'-50px',
   background: "black",
   width:"100%",
   padding:"0px",
   height:"10vh",
   color:"white"

};



