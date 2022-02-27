import React, { useEffect, useState } from 'react';
import { message, Divider } from 'antd';
import { Statistics } from "../../../Services/Api";
import "./Homestatistics.css";

function Home() {
    const [loading, setloading] = useState(true);
    const [theArray, setTheArray] = useState({});
    const [theArrayCheck, setTheArrayCheck] = useState(true);

    useEffect(() => {
        ApiCall();
        setloading(false)
    }, [])

    const ApiCall = async () => {

        try {
            const GetHandler = await Statistics.GetAll()
            console.log("GetHandler", GetHandler)
            if (GetHandler) {
                setTheArray(GetHandler)
                setloading(false)

            }
            else {
                console.log("check")
                setTheArrayCheck(false)
                setloading(false)
            }

        } catch (error) {
            console.log("Server Error :", error)
            message.error("Server is Down")
            setloading(false)
        }

    }

    return (
        <>
            
                <div class="container">
                  <div class="row">
                    <Divider orientation="center" style={{ color: '#9e1068' }} >Home</Divider>
                      {/* Card-start */}
                    <div class="col-3 ">
                        <div class="card py-4 shadow-lg mb-3 bg-white rounded Cardbodyhomestatistics">
                            <div class="card-body">
                                <div class="row  ">
                                    
                                    <div class="col d-flex justify-content-between align-items-center px-1">
                                        <div className='px-3'>
                                            <h4 class="card-title text-uppercase mb-0" style={{ color: '#9e1068' }}>Users</h4>
                                            <span class="h2 font-weight-bold mb-0">{theArray.User || 0} </span>
                                        </div>
                                        <div class="col-auto text-center mx-auto">
                                            <div class="icon icon-shape text-white rounded-circle shadow p-2 " style={{ background: '#9e1068' }}>
                                                <i class="fa fa-users fa-2x"></i>
                                            </div>
                                        </div>
                                       
                                    </div>
                                   
                                </div>
                                <p class="mt-3 mb-0  text-sm">
                                    <span class=" mr-2" style={{ color: '#9e1068' }}><i class="fa fa-arrow-up"></i> 3.48% </span>
                                    <span class="text-nowrap ml-1"> Total Users</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card-end */}
                    {/* Card-start */}
                    <div class="col-sm-4 ">
                        <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                            <div class="card-body">
                                <div class="row  ">

                                    <div class="col d-flex justify-content-between align-items-center px-3">
                                        <div className='px-3'>
                                            <h4 class="card-title text-uppercase mb-0" style={{ color: '#9e1068' }}>Utilities</h4>
                                            <span class="h2 font-weight-bold mb-0">{theArray.Utilities || 0}</span>
                                        </div>
                                        <div class="col-auto text-center mx-auto">
                                            <div class="icon icon-shape text-white rounded-circle shadow p-2 " style={{ background: '#9e1068' }}>
                                                <i class="fa fa-bars fa-2x"></i>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <p class="mt-3 mb-0 text-sm">
                                    <span class=" mr-2" style={{ color: '#9e1068' }}><i class="fa fa-arrow-up"></i> 3.48%</span>
                                    <span class="text-nowrap ml-1"> Total Utilities</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card-end */}
                    {/* Card-start */}
                    <div class="col-sm-5 ">
                        <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                            <div class="card-body">
                                <div class="row  ">

                                    <div class="col d-flex justify-content-between align-items-center px-3">
                                        <div className='px-3'>
                                            <h4 class="card-title text-uppercase mb-0" style={{ color: '#9e1068' }}>UsersUtilities</h4>
                                            <span class="h2 font-weight-bold mb-0">{theArray.UsersUtilities || 0}</span>
                                        </div>
                                        <div class="col-auto text-center mx-auto">
                                            <div class="icon icon-shape text-white rounded-circle shadow p-2 " style={{ background: '#9e1068' }}>
                                                <i class="fa fa-users fa-2x"></i>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <p class="mt-3 mb-0 text-sm">
                                    <span class=" mr-2" style={{ color: '#9e1068' }}><i class="fa fa-arrow-up"></i> 3.48%</span>
                                    <span class="text-nowrap ml-1"> Total UsersUtilities</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card-end */}
                    {/* Card-start */}
                    <div class="col-sm-4 ">
                        <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                            <div class="card-body">
                                <div class="row  ">

                                    <div class="col d-flex justify-content-between align-items-center px-3">
                                        <div className='px-3'>
                                            <h4 class="card-title text-uppercase mb-0" style={{ color: '#9e1068' }}>Services</h4>
                                            <span class="h2 font-weight-bold mb-0">{theArray.Services || 0}</span>
                                        </div>
                                        <div class="col-auto text-center mx-auto">
                                            <div class="icon icon-shape text-white rounded-circle shadow p-2 " style={{ background: '#9e1068' }}>
                                                <i class="fa fa-cogs fa-2x"></i>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <p class="mt-3 mb-0  text-sm">
                                    <span class=" mr-2" style={{ color: '#9e1068' }}><i class="fa fa-arrow-up"></i> 3.48%</span>
                                    <span class="text-nowrap ml-1"> Total Services</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card-end */}
                    {/* Card-start */}
                    <div class="col-sm-4 ">
                        <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                            <div class="card-body">
                                <div class="row  ">

                                    <div class="col d-flex justify-content-between align-items-center px-1">
                                        <div className='px-3'>
                                            <h4 class="card-title text-uppercase  mb-0" style={{ color: '#9e1068' }} >Reminders</h4>
                                            <span class="h2 font-weight-bold mb-0">{theArray.Reminders || 0}</span>
                                        </div>
                                        <div class="col-auto text-center mx-auto">
                                            <div class="icon icon-shape  text-white rounded-circle shadow p-2 " style={{ background:'#9e1068'}}>
                                                <i class="fa fa-calendar fa-2x"></i>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <p class="mt-3 mb-0  text-sm">
                                    <span class="mr-2" style={{ color: '#9e1068' }}><i class="fa fa-arrow-up"></i> 3.48%</span>
                                    <span class="text-nowrap ml-1"> Reminders Users</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card-end */}
                    {/* Card-start */}
                    <div class="col-sm-5 ">
                        <div class="card py-4 shadow-lg mb-3 bg-white rounded">
                            <div class="card-body">
                                <div class="row  ">

                                    <div class="col d-flex justify-content-between align-items-center px-3">
                                        <div className='px-3'>
                                            <h4 class="card-title text-uppercase mb-0" style={{ color: '#9e1068' }}>Digital Assistance</h4>
                                            <span class="h2 font-weight-bold mb-0">{theArray.DigitalAssistance || 0}</span>
                                        </div>
                                        <div class="col-auto text-center mx-auto">
                                            <div class="icon icon-shape text-white rounded-circle shadow p-2 " style={{ background: '#9e1068' }}>
                                                <i class="fa fa-envelope-o fa-2x"></i>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <p class="mt-3 mb-0  text-sm "  >
                                    <span class=" mr-2" style={{ color: '#9e1068' }}><i class="fa fa-arrow-up"></i> 3.48%</span>
                                    <span class="text-nowrap ml-1"> Total DigitalAssistance</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card-end */}
                    </div>
                </div>
        </>
    );
}

export default Home;
