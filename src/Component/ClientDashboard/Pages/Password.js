import React, { useState } from 'react';
import { message, Button, Modal } from 'antd';
import '../../Css/Forms.css'
function Password() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    function ButtonClick(res) {
        message.success(res)
    }
    function AddNewPassword() {
        setIsModalVisible(false);
        message.success("Data Saved")
    }
    return (
        <>

            <div class=" d-flex justify-content-between align-items-center px-3">

                <h2>   Password </h2>
                <div>
                    <Button
                        style={buttonstyle}
                        onClick={() => { setIsModalVisible(true) }}>
                        Add New Password
                    </Button>
                </div>
            </div>

            <div className='container-fluid '>
                <div className='row text-center' >
                    <div className=" m-1 p-1 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={() => ButtonClick("X Account Password Click")}>
                        <div class="card d-flex align-items-center justify-content-center PasswordCardButton">

                            <h5 >X Account Password</h5>

                        </div>
                    </div>

                    <div className=" m-1 p-1 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={() => ButtonClick("AlphaAccount Password Click")}>
                        <div class="card d-flex align-items-center justify-content-center PasswordCardButton">

                            <h5 >Alpha Account Password</h5>


                        </div>
                    </div>
                </div>
            </div>
            {/* Model Add New Password */}
            
            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                footer={[
                    <div div className='text-center' >
                        <Button style={buttonstyle} onClick={() => AddNewPassword()}>  Save </Button>
                    </div>
                ]}
            >

                {/* Form Stated Here */}




                
                    <h3 className="text-center  font-up font-bold">Add Password</h3>
                    <form>
                        <div class="inputbox form-group">
                            <input type="text" required="required" class="form-control"/>
                                <span>Title</span>
                        </div>
                        <div class="inputbox form-group">
                            <input type="text" required="required" class="form-control" />
                                <span>UserName</span>
                        </div>
                        <div class="inputbox form-group">
                            <input type="text" required="required" class="form-control" />
                            <span>Email</span>
                        </div>
                        <div class="inputbox form-group">
                            <input type="password" required="required" class="form-control" />
                                <span>Password</span>
                        </div>
                        <div class="inputbox form-group">
                            <input type="password" required="required" class="form-control" />
                            <span>Confirm Password</span>
                        </div>
                       
                    </form>
                




                {/* Form Ended Here */}

            </Modal >
        </>
    );
}

export default Password;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 35px",
    borderRadius: '8px',
};