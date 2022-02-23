import React, { useState } from 'react';
import { message, Button, Modal, Select, Image, DatePicker, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../Css/Forms.css'
import dateFormat from 'dateformat';
function UtilityBills() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [DateVariable, setDateVariable] = useState(dateFormat("2019-04-30T08:59:00.000Z", "mmmm d, yyyy"));
    const [Timepicker, setTimepicker] = useState(false);
    
    function UploadHandler() {
        setIsModalVisible(false);
        message.success("Uploaded successfully")
    }

    function onChange(date, dateString) {
        setTimepicker(false)
        setDateVariable(dateFormat(date._d, "mmmm d, yyyy")+1)
        
    }

    return (
        <>

            <div class=" d-flex justify-content-between align-items-center px-3">

                <h4  >  
                    
                    <span onClick={() => {  setTimepicker(true); }} style={{ background:" #f0f2f5 "}}> {DateVariable} </span>

                    <DatePicker  open={Timepicker}  className="timepickerstyle text-danger invisible" allowClear={true} onChange={onChange} />
                    
                     </h4>

                <div>
                    <Button
                        style={buttonstyle}
                        onClick={() => { setIsModalVisible(true) }}>
                        Upload a File
                    </Button>
                </div>
            </div>

            <div className='container-fluid '>
                <div className='row text-center' >

                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            src="https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg"
                        />
                    </div>
                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnIbbatsfj4E90wdE7aFV2w4Hu0RukmUXmTGv-CCs7ZoEO6PrZ4XrwjMgC1insvexhhs&usqp=CAU"
                        />
                    </div>
                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            src="https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg"
                        />
                    </div>
                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnIbbatsfj4E90wdE7aFV2w4Hu0RukmUXmTGv-CCs7ZoEO6PrZ4XrwjMgC1insvexhhs&usqp=CAU"
                        />
                    </div>
                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            src="https://i.pinimg.com/originals/bf/12/39/bf1239938e99faa94fedc6d2c10fc3f6.jpg"
                        />
                    </div>
                    <div class="card m-2  m-1 d-flex align-items-center justify-content-center" style={CardStyleUtilities}>
                        <Image
                            style={Cardimage}
                            class="card-img-top"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnIbbatsfj4E90wdE7aFV2w4Hu0RukmUXmTGv-CCs7ZoEO6PrZ4XrwjMgC1insvexhhs&usqp=CAU"
                        />
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
                               

                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >
        </>
    );
}

export default UtilityBills;

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
    width: '14.1rem',
    boxShadow: ' 0 5px 5px 1px rgb(138, 138, 138)',

};
const Cardimage = {
    width: '14rem',
    borderRadius: ' 10px 10px 0px 0px'
};
