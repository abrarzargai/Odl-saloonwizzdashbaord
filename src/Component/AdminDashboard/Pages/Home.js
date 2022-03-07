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
            
                <div class="container-fluid">
                  <div class="row">
                    <Divider orientation="center" style={{ color: '#9e1068' }} >Home</Divider>
                    <div class="main-content">
                        <div class="header bg-gradient-primary">
                            <div class="container-fluid">
                                <div class="header-body">
                                    <div class="row">
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Users</h5>
                                                            <span class="h2 font-weight-bold mb-0">{theArray.User || 0}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i class="fas fa-users"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span class="text-nowrap"> Total Users</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Utilities</h5>
                                                            <span class="h2 font-weight-bold mb-0">{theArray.Utilities || 0}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i class="fas fa-list"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span class="text-nowrap"> Total Utilities</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Users Utilities</h5>
                                                            <span class="h2 font-weight-bold mb-0">{theArray.UsersUtilities || 0}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i class="fas fa-th-list"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span class="text-nowrap"> Total Users Utilities</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0 shadow p-3 mb-5 bg-body rounded" >
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Services</h5>
                                                            <span class="h2 font-weight-bold mb-0">{theArray.Services || 0}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i class="fas fa-cog"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
                                                        <span class="text-nowrap"> Total Services</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>






                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0 mm shadow p-3 mb-5 bg-body rounded">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0 ">Reminders</h5>
                                                            <span class="h2 font-weight-bold mb-0">{theArray.Reminders || 0}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i class="fas fa-bell"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
                                                        <span class="text-nowrap"> Total Reminders</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6">
                                            <div class="card card-stats mb-4 mb-xl-0 mm shadow p-3 mb-5 bg-body rounded"  >
                                                <div class="card-body" >
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Digital Assistance</h5>
                                                            <span class="h2 font-weight-bold mb-0">{theArray.DigitalAssistance || 0}</span>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="icon icon-shape gg text-white rounded-circle shadow">
                                                                <i class="fas fa-user-o"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="mt-3 mb-0 text-muted text-sm">
                                                        <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                                                        <span class="text-nowrap"> Total Digital Assistance </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </>
    );
}

export default Home;
