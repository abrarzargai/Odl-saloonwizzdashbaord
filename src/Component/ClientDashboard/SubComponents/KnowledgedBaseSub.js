import React, { useState, useEffect } from 'react';
import { message, Button, Modal, Select, Image, Spin } from 'antd';

function KnowledgedBaseSub(props) {
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
                    <h5 class=" text-light">{props.desciption}</h5>
                </div>
            </div>
        </>
    );
}

export default KnowledgedBaseSub;
const CardStyleUtilities = {
    width: '14.1rem',
    boxShadow: ' 0 5px 5px 1px rgb(138, 138, 138)',

};
const Cardimage = {
    width: '14rem',
    borderRadius: ' 10px 10px 0px 0px'
};
const cardtext = {
    position: 'relative',
    top: '-50px',
    background: "black",
    width: "100%",
    padding: "0px",
    height: "10vh",
    color: "white"

};
