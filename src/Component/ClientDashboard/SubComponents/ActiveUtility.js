import { Divider, message, Badge, Modal, Radio, Select, Table, Tag } from 'antd';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import UrlImageDownloader from 'react-url-image-downloader';
import { UserutilitiesApi } from '../../../Services/Api'

function ActiveUtility(props) {
   
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [DealModelVisible, setDealModelVisible] = useState(false);
    const [LOAForm, setLOAForm] = useState(null);
    const [LastBill, setLastBill] = useState(null);
    const [isPaid, setIsPaid] = useState('True');
    const [Supplier, setSupplier] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { Option } = Select;


    var Data = []
    props.Supplier.map((x) => {
        Data.push({ SupplierName: x })
    })

    const onSubmit = async (data) => {
        console.log('done', isPaid)
        // dispatch(actions.AddSupplier({ Id: props.id, ...data }));
        const profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile)
      
        if (!Supplier) { message.error('must select Supplier'); }
        if (isPaid && Supplier && LOAForm && LastBill) {

            let formData = new FormData();
            console.log(data.ExpirayData)
            formData.append('UtilitiesTitle', props.name)
            formData.append('UtilitiesSupplier', Supplier)
            formData.append('User', profile._id)
            formData.append('image', LOAForm)
            formData.append('image', LastBill)
            formData.append('IsPaid', isPaid)
            formData.append('ContractExpiryDate', data.ExpirayData.toString())
            const Response = await UserutilitiesApi.Add(formData)
            console.log('Response', Response)
            if (Response) {
                message.success("Applied SuccessFully")
            }
        }
    }



    //Upload LOAForm
    const LOAFormHandler = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setLOAForm(img)
        }
    };
    //LastBill Upload
    const LastBillHandler = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setLastBill(img)
        }
    };

    const isPaidHandler = e => {
        console.log('radio checked', e.target.value);
        setIsPaid(e.target.value);
    };

    const GetDeal = async (data) => {
        console.log('deal click', data, props.data.UserUtility._id);
            const ApiResponse = await UserutilitiesApi.AcceptDeal({
                Id: props.data.UserUtility._id,
                Title: data.Title,
                Description: data.Description    })
        if (ApiResponse){
            message.info("Deal Accepted")
            setDealModelVisible(false);
            props.ApiCall()

        }
    };

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
                <button size="large " className="addButton" onClick={() => GetDeal(record)}>
                    Get Deal
                </button>
            ),
        },
    ];

    return (
        <>

            <div class="col-sm-3 mt-4 " >
                <div class="card py-4 mx-2 shadow-lg mb-3 bg-white rounded">
                    {props.data.Missing.length?(
                        <Badge  count={`${props.data.Missing.length || 0} Missing`}>
                           
                                <div class="card-body">
                                    <img class="card-img-top" src={props.image} alt="Card image cap" style={{ height: '50px' }} />
                                    <h5 class="card-title">{props.name}</h5>
                                </div>
                            
                        </Badge>
                    ):(
                          
                  <Badge style={{ backgroundColor: '#52c41a' }} count={`${props.data.UserUtility.DealList.length || 0} Deal`} >
                                    <div class="card-body">
                                        <img class="card-img-top" src={props.image} alt="Card image cap" style={{ height: '50px' }} />
                                        <h5 class="card-title">{props.name}</h5>
                                    </div>
                                </Badge>
                          
                    )

                    }
                    {/* <Badge count={props.data.Missing.length || 0}>
                        <Badge style={{ backgroundColor: '#52c41a' }} count={props.data.UserUtility.DealList.length || 0} >
                            <div class="card-body">
                                <img class="card-img-top" src={props.image} alt="Card image cap" style={{ height: '50px' }} />
                                <h5 class="card-title">{props.name}</h5>
                            </div>
                        </Badge>
                    </Badge> */}
                </div>
                {
                    props.data.Missing.length > 0 ? (
                        <button className='addButton mt-2' onClick={() => setIsModalVisible(true)}> Submit Missing Data</button>

                    ) : (
                            <button className='addButton mt-2' onClick={() => setDealModelVisible(true)}> Get Deal</button>

                    )
                }
            </div>

            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center pt-3">
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center">

                                <Divider>{props.name}</Divider>
                                <div class="col-12 ">

                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        {/* Supplier */}
                                        <Select style={{ width: 420, height: "30px" }} required onChange={(e) => { setSupplier(e) }}>
                                            {props.Supplier.map(x => {
                                                return (
                                                    <Option value={x}>{x}</Option>
                                                )
                                            })}

                                        </Select>
                                        {/* LastBill */}

                                        <div class="col-12   text-left mt-2">
                                            <p className="text-left">Upload Your LastBill</p>
                                            <div class="form-group">
                                                <input type="file" required class="form-control" multiple="" onChange={LastBillHandler} />
                                            </div>
                                        </div>

                                        <div class="inputbox form-group mt-5 pt-2">
                                            <input type="Date" defaultValue={new Date().toISOString().slice(0, 10)} required="required" class="form-control" {...register("ExpirayData", { required: true })} />
                                            <span>Contract Expiration Date</span>
                                        </div>

                                        < UrlImageDownloader imageUrl="/003.jpg" />

                                        <div class="col-12  text-left mt-2">
                                            <p className="text-left">Upload LOA Form</p>
                                            <div class="form-group ">
                                                <input type="file" required class="form-control" multiple="" onChange={LOAFormHandler} />
                                            </div>
                                        </div>

                                        <div>
                                            <span>LastBill Paid</span>
                                            <Radio.Group required onChange={isPaidHandler} value={isPaid}>
                                                <Radio value={true}>Yes</Radio>
                                                <Radio value={false}>No</Radio>
                                            </Radio.Group>

                                        </div>


                                        <input type="submit" className='addButton mt-2' value="Submit" />
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >

            {/* Deal Model */}
            <Modal visible={DealModelVisible} onCancel={() => { setDealModelVisible(false); }} footer={[]} >

                {/* Form Stated Here */}


                <div className=" text-center pt-3">
                    <div class="container">
                        <div class="row">
                            <div class="col-12  align-items-center justify-content-center">


                                <div>
                                    <Divider>Accepted Deal</Divider>
                                    {
                                        props.data.UserUtility?.Deal ? (
                                            <>
                                                <Tag color="red" >{props.data.UserUtility?.Deal.Title || ''}</Tag>
                                                {/* <h6>{props.data.UserUtility?.Deal.Title || ''}</h6> */}
                                                <p>{props.data.UserUtility?.Deal.Description || ''}</p>
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

                                    props.data.UserUtility.DealList[0] ? (

                                        <Table class="text-center" columns={Dealscolumns} dataSource={props.data.UserUtility.DealList} />

                                    ) : (
                                        <div className="mt-4 text-center">
                                            <img src="/no item.png" width="200" height="200" />
                                            <h6> No Deal yet </h6>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal>
        </>

    );
}

export default ActiveUtility;






