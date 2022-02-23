import React, { useState } from 'react';
import { Modal, Button } from 'antd';


function MarketingServices() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ThankYouModel, setThankYouModel] = useState(false);
    const [ModelData, SetModelData] = useState();

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    function ButtonClick(PackageData) {
        setIsModalVisible(true);
        SetModelData(PackageData)
    }

    return (
        <>

            <h2>  Packages </h2>
            <div className='container-fluid '>
                <div className='row' >

                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={() => ButtonClick(BasicModel)}>
                        <div class="card d-flex align-items-center justify-content-center MarketingServicesButton">
                            <div class="card-body text-center">
                                <h3 className='text-center'>Basic</h3>
                                <h6 style={{ marginTop: '-10px' }}>£50 per month</h6>
                                <a type="button" style={Activatebuttonstyle} class=" ">Activated</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={() => ButtonClick(PremiumModel)}>
                        <div class="card d-flex align-items-center justify-content-center MarketingServicesButton">
                            <div class="card-body text-center">
                                <h3 >Premium</h3>
                                <h6 style={{ marginTop: '-10px' }}>£100 per month</h6>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={() => ButtonClick(UltraModel)}>
                        <div class="card d-flex align-items-center justify-content-center MarketingServicesButton">
                            <div class="card-body text-center">
                                <h3 >Ultra</h3>
                                <h6 style={{ marginTop: '-10px' }}>£150 per month</h6>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Model GetPackage Define Here */}
            <Modal className="text-center" visible={isModalVisible} onCancel={handleCancel}
                footer={[
                    <div div className='text-center' >
                        <Button
                            style={buttonstyle}
                            onClick={() => { setThankYouModel(true); setIsModalVisible(false); }}>
                            Get Package
                        </Button>
                    </div>
                ]}
            >

                <p>{ModelData}</p>

            </Modal>

            {/* Model ThankYou Define Here */}
            <Modal className="text-center" visible={ThankYouModel} onCancel={()=>{setThankYouModel(false)}}
                footer={[
                ]}
            >
                <p>Thank You For Your interest</p>
                <p>We will contact you soon</p>
                <Button
                    style={buttonstyle}
                    onClick={() => { setThankYouModel(false); setIsModalVisible(false); }}>
                    Ok
                </Button>
            </Modal>
        </>
    );
}

export default MarketingServices;



const Activatebuttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    border: 'none',
    padding: "0px 20px",
    borderRadius: '20px',
    marginTop: '15px'
};
const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 30px",
    borderRadius: '20px',
};

const BasicModel =
    <>
        <h3 >BasicModel</h3>
        <h5 >£50 per month</h5>
    </>
const PremiumModel =
    <>
        <h3 >Premium</h3>
        <h5 >£100 per month</h5>
    </>
const UltraModel =
    <>
        <h3 >Ultra</h3>
        <h5 >£150 per month</h5>
    </>
