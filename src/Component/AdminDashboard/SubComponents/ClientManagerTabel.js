import React, { useState  , useEffect} from 'react';
import { Table, Input, Image, Button, Modal, message, Space } from 'antd';
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'; 
import { Menu, Dropdown } from 'antd';  
import { useForm } from "react-hook-form";
import { DeleteOutlined } from '@ant-design/icons';
import { Tag, Divider } from 'antd';
import axios from 'axios'



function ClientManagerTabel() {
    const [DetailModel, setDetailModel] = useState(false);
    const [Details, setDetails] = useState();
    const [dealsDeatils, setDealDetails] = useState();
    const [DealModel, setDealModel] = useState(false);
    const [isBill, setisBill] = useState(false);
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ myData , setMyData ] = useState([])
    const [ myImage , setMyImage ] = useState('')
    const [ LOAFormimage , setLOAFormimage ] = useState('')
    const [ Billimage , setbillimage ] = useState('./No')
    

    useEffect(() => {
        const getData = async () => {
            await axios.get('https://odl-saloonwizz-app.herokuapp.com/api/userutilities/getall')
                .then(function (response) {
                    // handle success
                    console.log("response : ", response?.data?.Data);
                    setMyData(response?.data?.Data)
                })
                .catch(function (error) {
                    // handle error
                    console.log("error : " , error);
                })
                .then(function () {
                    // always executed
                });
        }
        getData();
    },[])


    const onSubmit = async (data) => {
        console.log(data)
        message.success("New Deal added")
    }

    const columns = [
        {
            title: 'ClientName',
            dataIndex: 'User',
            width: '20%',
            render: (item, record) => (
                <>
                    <Avatar size={50} icon="" className="mr-4" />
                    <span className="ml-5" style={{ marginLeft: '10px' }}> {item[0].FirstName}</span>
                </>
            ),

        },
        {
            title: 'Utility',
            dataIndex: 'Utilities',
            render: (item) => item.Title,
        },
        // {
        //     title: 'Supplier',
        //     dataIndex: 'address',
        // },
        {
            title: 'ExpirationDate',
            dataIndex: 'ContractExpiryDate',
            //sorter: (a, b) => a.address.length - b.address.length,
            render: (item) => item,
        },
        {
            title: 'LastBillPaid',
            dataIndex: 'IsPaid',
            render: (t, r) => {
                console.log("t",t)
                if(t){
                    return(<h6 className="text-success">Yes</h6>)
                }else{
                    return (<h6 className="text-danger">No</h6>)
                }
            } ,
            sorter: (a, b) => a.address.length - b.address.length,
        },
        {
            title: 'Details',
            dataIndex: 'key',
            render: (text, index) => (
                <input type="Button" style={button2style} value="View Details"
                    onClick={() => {
                        setDetails(index)
                        setDetailModel(true)
                    }}
                />

            ),
        },
        {
            title: 'Deals',
            render: (text, index) => (
                <input type="Button" style={button2style} value="View Deals"
                    onClick={() => {
                        console.log("index",index)
                        setDealDetails(index.DealList)
                        setDealModel(true)
                    }}
                />
            ),
        },


    ];


    const Dealscolumns = [
        {
            title: 'Title',
            dataIndex: 'Title'

        },
        {
            title: 'Description',
            dataIndex: 'Description'

        },
        {
            title: 'Delete',
            key: 'action',
            render: (text, record) => (
                <Space size="large " className="text-danger" >
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    Delete
                </Space>
            ),
        },
    ];

    return (
        <>
           
            <Table columns={columns} dataSource={myData} className="text-center" />

            {/* BILL IMAGE     */}
            <Image
                width={200}
                style={{ display: 'none' }}
                src={myImage|| '/no item.png'}
                preview={{
                    visible: visible,
                    src: myImage,
                    onVisibleChange: value => {
                        setVisible("onchange==>",value);
                    },
                }}
            />
       

            {/* //DetailsModel */}
            <Modal visible={DetailModel} onCancel={() => { setDetailModel(false); }} footer={[]} >
                {/* Form Stated Here */}


                <div className=" text-center">
                    <h5 >User Details</h5>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.User[0]?.FirstName} class="form-control" readonly />
                        <span>FirstName</span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.User[0]?.LastName} class="form-control" readonly />
                        <span>LastName</span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.User[0]?.BusinessName} class="form-control" readonly />
                        <span>Business Name</span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value="Demo City" class="form-control" readonly />
                        <span>City</span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.User[0]?.BusinessAddress} class="form-control" readonly />
                        <span>Office Address</span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.User[0]?.ContactNumber} class="form-control" readonly />
                        <span>Phone Numer</span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.Utilities?.Title} class="form-control" readonly />
                        <span>UtilitityName </span>
                    </div>
                    <div class="inputbox form-group my-4">
                        <input type="text" required="required" value={Details?.Utilities?.Supplier} class="form-control" readonly />
                        <span>Supplier Name </span>
                    </div>
                  
                    <div>
                        
                        <Button type="primary" style={button2style} className="mx-3"
                onClick={() => {
                    setMyImage(Details?.LOAForm);
                    setVisible(true)
                }}>
                            View LOAForm
                        </Button>   
                        <Button type="primary" style={button2style} className="mx-3"
                        onClick={() => {
                            setMyImage(Details?.LastBill)
                            setVisible(true)
                            }}>
                            View LastBill
                        </Button>   
                    
                    </div>
                  
                   
                 

                </div>


                {/* Form Ended Here */}

            </Modal>

            {/* //Deal */}
            <Modal visible={DealModel} onCancel={() => { setDealModel(false); }} footer={[]} >

                {/* Form Stated Here */}


                <div className=" text-center pt-3">
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center">


                            <div>
                             <Divider>Accepted Deal</Divider>

                                <p> <Tag color="magenta">{"dealsDeatils?.DealList?.Title"}</Tag>
                                :  <Tag color="magenta"> {"dealsDeatils?.DealList?.Description"}
                                </Tag>
                                </p>
                               
                         </div>
                             <Divider>All Deal</Divider>
                                            {/* Supplier */}
                                            {/* <div class="col-12 ">
                                                <div >
                                                    <Table class="text-center" columns={DealColumn} dataSource={Dealdata} />
                                                </div> */}
                                            {/* Accepted Deal */}

                             {
                               
                                 dealsDeatils[0]?(
                                       
                                        <Table class="text-center" columns={Dealscolumns} dataSource={dealsDeatils} />
                                
                                 ):(
                                <div className="mt-4 text-center">
                                    <img src="/no item.png" width="200" height="200" />
                                    <h6> No Deal sent yet </h6>
                                </div>
                                 )
                             }

                                <form onSubmit={handleSubmit(onSubmit)} >


                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("Supplier", { required: true })} />
                                        <span>Deal</span>
                                    </div>
                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("Supplier", { required: true })} />
                                        <span>Description</span>
                                    </div>

                                    <input type="submit" style={button2style} value="Add new Deal" />
                                </form>


                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal>
        </>
    );
}

export default ClientManagerTabel;






const button2style = {
    fontSize:'13px',
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "4px 20px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};

