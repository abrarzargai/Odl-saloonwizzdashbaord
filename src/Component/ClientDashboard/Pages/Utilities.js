import React, { useState } from 'react';
import { message, Button, Modal, Select, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
import axios from 'axios'
function Utilities() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setloading] = useState(false);
    const [imageUrl, setimageUrl] = useState(false);
    const { Option } = Select;


    function UploadHandler() {
        setIsModalVisible(false);
        message.success("Uploaded successfully")
    }
    function handleChange(value) {
        message.success(`selected ${value}`);
    }
    function DownloadButton(ImgURL) {
        message.success(`Download clicked`);
        axios({
            url: ImgURL,
            method: 'GET',
            responseType: 'blob'
        })
            .then((response) => {
                console.log("response", response)
                let url = window.URL.createObjectURL(new Blob([response.data]));
                let a = document.createElement('a');
                a.href = url;
                a.download = `file.jpg`;
                a.click();
            })
    }
    return (
        <>

            <div class=" d-flex justify-content-between align-items-center px-3">

                <h2>   Deals </h2>
                <div>
                    <Button
                        style={buttonstyle}
                        onClick={() => { setIsModalVisible(true) }}>
                        Upload COT Form
                    </Button>
                </div>
            </div>

            <div className='container-fluid '>
                <div className='row text-center' >

                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHi3F-ydfuRlqN-hGkBBi8Mi9vjwxmDkoyYZ5ALsA-Xoh3p-Fcon24T-B74iSnaD-vXI&usqp=CAU"
                        />
                        <div class="card-body">
                            <Button style={button2style}
                                onClick={() => DownloadButton("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHi3F-ydfuRlqN-hGkBBi8Mi9vjwxmDkoyYZ5ALsA-Xoh3p-Fcon24T-B74iSnaD-vXI&usqp=CAU")}>
                                Download COT Form </Button>
                        </div>
                    </div>

                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://images-platform.99static.com//PkTaYd2uVTNfwFdN8PeZUplscE8=/107x89:1092x1074/fit-in/500x500/99designs-contests-attachments/81/81514/attachment_81514499"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>

                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8jxXkxHMZwzFkMxGHAObQwPaIbmUIEl92A&usqp=CAU"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>

                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHi3F-ydfuRlqN-hGkBBi8Mi9vjwxmDkoyYZ5ALsA-Xoh3p-Fcon24T-B74iSnaD-vXI&usqp=CAU"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>

                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://images-platform.99static.com//PkTaYd2uVTNfwFdN8PeZUplscE8=/107x89:1092x1074/fit-in/500x500/99designs-contests-attachments/81/81514/attachment_81514499"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>

                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8jxXkxHMZwzFkMxGHAObQwPaIbmUIEl92A&usqp=CAU"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>
                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image

                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHi3F-ydfuRlqN-hGkBBi8Mi9vjwxmDkoyYZ5ALsA-Xoh3p-Fcon24T-B74iSnaD-vXI&usqp=CAU"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>

                    <div class="card m-2 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            width="14rem"
                            src="https://images-platform.99static.com//PkTaYd2uVTNfwFdN8PeZUplscE8=/107x89:1092x1074/fit-in/500x500/99designs-contests-attachments/81/81514/attachment_81514499"
                        />
                        <div class="card-body">
                            <Button style={button2style} onClick={() => { message.success("clicked") }}>  Download COT Form </Button>
                        </div>
                    </div>






                </div>
            </div>
            {/* Model Add New Password */}

            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                footer={[
                    <div div className='text-center' >
                        <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Upload </Button>
                    </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center">
                    <h5 >Upload Form</h5>
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center">
                                <div class="form-group files">
                                    <input type="file" class="form-control" multiple="" />
                                </div>
                            </div>
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <Select defaultValue="Crown Gass and Power" style={{ width: 250, marginTop: '20px', font: '27px' }} onChange={handleChange}>
                                    <Option value="SSE">SSE</Option>
                                    <Option value="Hudson Energy">Hudson Energy</Option>
                                    <Option value="Engie">Engie</Option>
                                    <Option value="eDF Energy">eDF Energy</Option>
                                    <Option value="Haven Power">Haven Power</Option>
                                    <Option value="nPower">nPower</Option>
                                    <Option value="Crown Gass and Power">Crown Gass and Power</Option>
                                </Select>

                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >
        </>
    );
}

export default Utilities;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 35px",
    borderRadius: '8px',
    border: "none"
};

const button2style = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 35px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};
const CardStyleUtilities = {
    width: '14rem',
    boxShadow: ' 0 5px 5px 1px rgb(138, 138, 138)',
    borderRadius: '10px'
};
const Cardimage = {

    borderRadius: ' 10px 10px 0px 0px'
};
