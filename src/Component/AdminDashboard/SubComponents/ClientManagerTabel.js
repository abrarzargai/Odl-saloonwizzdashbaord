import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Divider, Image, message, Modal, Space, Table, Tag, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import * as actions from '../../../Store/Action/ClientManagers';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function ClientManagerTabel(props) {
  
    const [DetailModel, setDetailModel] = useState(false);
    const [Details, setDetails] = useState();
    const [dealsDeatils, setDealDetails] = useState([]);
    const [DealModel, setDealModel] = useState(false);
    const [isBill, setisBill] = useState(false);
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ myData , setMyData ] = useState(null)
    const [ myImage , setMyImage ] = useState('')
    const [ LOAFormimage , setLOAFormimage ] = useState('')
    const [ Billimage , setbillimage ] = useState('./No item.png')
    const { currentState } = useSelector(
        (state) => ({ currentState: state.ClientManagers }),
        shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(actions.fetchClientManagers());
    }, [])

    useEffect(() => {
        let ArrayData = []
        if (props.Utilities === 'All') {
            setMyData(null)
        } else {
            entities.map((X) => {
                if (X.Utilities.Title == props.Utilities) {
                    console.log("else hit")
                    ArrayData.push(X)
                }
            })
            setMyData(ArrayData)
        }
    }, [props.Utilities])


  


    const onSubmit = async (data) => {
        console.log(Details._id, data.Title, data.Description)
        dispatch(actions.createClientManagerDeal({
                Id: Details._id,
                Title: data.Title,
                Description: data.Description
             }));
        setDealModel(false);     
    }

    const DeleteDeal = async (data) => {
        console.log(Details._id,data)
        dispatch(actions.deleteClientManagerDeal({
               Id: Details._id,
                Title: data.Title
            }))
            setDealModel(false);


    }



    const columns = [
         {
            title: 'ClientName',
            dataIndex: 'User',
            width: '20%',
            render: (item, record) =>{
                console.log('item', item[0].FirstName)
                if(!item){
                    return (<h6 className="text-danger"> - </h6>)
                }
                else{ 
                            return(
                        <>
                            <Avatar size={50} className="mr-4 backgroundClass text-white" >{ ' - ' }</Avatar>
                            <span className="ml-5" style={{ marginLeft: '10px' }}> { ' -'}</span>
                        </>
                    )
            }

            }
        },
        {
            title: 'Utility',
            dataIndex: 'Utilities',
            render: (item, record) => {
                if (!item) {
                    return (<h6 className="text-danger"> - </h6>)
                }
                else{
                    return (<p> {item.Title} </p>) 
                }
            }
        },
        // {
        //     title: 'Supplier',
        //     dataIndex: 'address',
        // },
        {
            title: 'ExpirationDate',
            dataIndex: 'ContractExpiryDate',
            render: (item) => {   
                if (!item)   {
                    return (<h6 className="text-danger"> - </h6>)
                }else{    
                let date = new Date(item)            
                var newdate = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate()
                );
                if (newdate.toISOString() > date.toISOString()){
                  
                    return (<h6 className="text-success">{`${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`}</h6>)
                } else {
                    return (<h6 className="text-danger">{`${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`}</h6>)
                }
                }
            }
        },

        {
            title: 'LastBillPaid',  
            dataIndex: 'IsPaid',
            key: "IsPaid",
           
            render: (t, r) => {
                
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
                <input type="Button" className='addButton' value="View Details"
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
                <input type="Button" className='addButton' value="View Deals"
                    onClick={() => {
                        setDetails(index ||'')
                        setDealDetails(index.DealList || [])
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
                <Space size="large " className="text-danger" onClick={()=>DeleteDeal(record)}>
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    Delete
                </Space>
            ),
        },
    ];

    return (
        <>
            {listLoading?(
                
                <div className='text-center'>
                <Spin></Spin>
                </div>
            ):(
                <>
                        {totalCount?(
                            <div>
                                {
                                    myData?(
                                       
                                         <Table columns={columns} dataSource={myData } className="text-center" />
                                    ):(
                                        
                                             <Table columns={columns} dataSource={ entities} className="text-center" />
                                    ) 
                                }
                                {/* <Table columns={columns} dataSource={myData || entities} className="text-center" /> */}

                                {/* BILL IMAGE     */}
                                <Image
                                    width={200}
                                    style={{ display: 'none' }}
                                    src={myImage || '/no item.png'}
                                    preview={{
                                        visible: visible,
                                        src: myImage,
                                        onVisibleChange: value => {
                                            setVisible("onchange==>", value);
                                        },
                                    }}
                                />


                                {/* //DetailsModel */}
                                <Modal visible={DetailModel} onCancel={() => { setDetailModel(false); }} footer={[]} >
                                    {/* Form Stated Here */}


                                    <div className=" text-center">
                                        <h5 >User Details</h5>
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.User[0]?.FirstName || '-'} class="form-control" readonly />
                                            <span>FirstName</span>
                                        </div>
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.User[0]?.LastName || '-'} class="form-control" readonly />
                                            <span>LastName</span>
                                        </div>
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.User[0]?.BusinessName || '-'} class="form-control" readonly />
                                            <span>Business Name</span>
                                        </div>
                                        {/* <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value="Demo City" class="form-control" readonly />
                                            <span>City</span>
                                        </div> */}
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.User[0]?.BusinessAddress || '-'} class="form-control" readonly />
                                            <span>Office Address</span>
                                        </div>
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.User[0]?.ContactNumber || '-'} class="form-control" readonly />
                                            <span>Phone Numer</span>
                                        </div>
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.Utilities?.Title || '-'} class="form-control" readonly />
                                            <span>UtilitityName </span>
                                        </div>
                                        <div class="inputbox form-group my-4">
                                            <input type="text" required="required" value={Details?.Utilities?.Supplier || '-'} class="form-control" readonly />
                                            <span>Supplier Name </span>
                                        </div>

                                        <div>

                                            {/* images */}
                                            <div class=' d-flex justify-content-between align-items-center '>
                                                <div>
                                                    
                                                    <Image
                                                        width={200}
                                                        src={Details?.LOAForm || '-'}
                                                    />
                                                    <p>LOAForm</p>
                                                </div>
                                                <div>
                                                    <Image
                                                        width={200}
                                                        src={Details?.LastBill || '-'}
                                                    />
                                                    <p>LastBill</p>
                                                </div>
                                            </div>



                                            {/* <Button type="primary" style={button2style} className="mx-3"
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
                        </Button>    */}

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
                                                        {
                                                            Details?.Deal ? (
                                                                <>
                                                                    <h6>{Details?.Deal.Title || ''}</h6>
                                                                    <p>{Details?.Deal.Description || ''}</p>
                                                                </>
                                                            ) : (
                                                                <Tag color="red" >No Deal Accepted by user yet</Tag>

                                                            )
                                                        }


                                                    </div>
                                                    <Divider>All Deal</Divider>
                                                    {/* Supplier */}
                                                    {/* <div class="col-12 ">
                                                <div >
                                                    <Table class="text-center" columns={DealColumn} dataSource={Dealdata} />
                                                </div> */}
                                                    {/* Accepted Deal */}

                                                    {

                                                        dealsDeatils[0] ? (

                                                            <Table class="text-center" columns={Dealscolumns} dataSource={dealsDeatils} />

                                                        ) : (
                                                            <div className="mt-4 text-center">
                                                                <img src="/no item.png" width="200" height="200" />
                                                                <h6> No Deal sent yet </h6>
                                                            </div>
                                                        )
                                                    }

                                                    <form onSubmit={handleSubmit(onSubmit)} >


                                                        <div class="inputbox form-group mt-4">
                                                            <input type="text" required="required" class="form-control" {...register("Title", { required: true })} />
                                                            <span>Title</span>
                                                        </div>
                                                        <div class="inputbox form-group mt-4">
                                                            <input type="text" required="required" class="form-control" {...register("Description", { required: true })} />
                                                            <span>Description</span>
                                                        </div>

                                                        <input type="submit" className='addButton' value="Add new Deal" />
                                                    </form>


                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    {/* Form Ended Here */}

                                </Modal>
               </div>
            ):(
               <div className="mt-4 text-center">
                        <img src="/no item.png" width="200" height="200" />
                        <h6> No Data Found </h6>
               </div> 
            )}
            </>
           )}
        </>
    );
}

export default ClientManagerTabel;


