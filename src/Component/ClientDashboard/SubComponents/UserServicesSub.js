import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, message, Space, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import { UsrServicePackageApi } from '../../../Services/Api'

function ClientManagerTabel(props) {

    const [DetailModel, setDetailModel] = useState(false);
    const [Details, setDetails] = useState();
    const [dealsDeatils, setDealDetails] = useState([]);
    const [DealModel, setDealModel] = useState(false);
    const [isBill, setisBill] = useState(false);
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [myData, setMyData] = useState([])
    const [Id, setId] = useState('')
    const [LOAFormimage, setLOAFormimage] = useState('')
    const [Billimage, setbillimage] = useState('./No item.png')


    useEffect(() => {
        getData();
    }, [])
    

    const getData = async () => {
        await axios.get('https://odl-saloonwizz-app.herokuapp.com/api/UserServices/getall')
            .then(function (response) {
                console.log("UserServicesSub Call:",response)
                const User = JSON.parse(localStorage.getItem('profile'))
                console.log('User', User)
                    // setMyData(response?.data?.Data)
                    let temp = []
              Promise.all( response?.data?.Data.map((data)=>{
                    if (data.User[0]?.Email === User.Email){
                        temp.push(data)
                    }
              }))
                setMyData(temp)
            
                
            })
            .catch(function (error) {
                // handle error

            })
            .then(function () {
                // always executed
            });
    }

    const Delete = async (data) => {
        console.log(data)
        try {


            const Response = await UsrServicePackageApi.delete({
                Id: data._id
            })
            console.log("API aDD Response :", Response)

            if (Response) {
                message.info("Deleted")
                getData();
                

            }

        } catch (error) {
            console.log("API Error :", error)
            message.error("server down")

        }
        


    }


    const columns = [
        {
            title: 'ClientName',
            dataIndex: 'User',
            width: '20%',
            render: (item, record) => (
                <>
                    <Avatar size={54} className="mr-4 backgroundClass text-white ">{item[0]?.FirstName[0] || ''}</Avatar>
                    <span className="ml-5" style={{ marginLeft: '10px' }}> {item[0]?.FirstName || ''}</span>
                </>
            ),

        },
        {
            title: 'Phone',
            dataIndex: 'User',
            render: (item, record) => (
                <>
                    <span className="ml-5" style={{ marginLeft: '10px' }}> {item[0]?.ContactNumber || ''}</span>
                </>
            ),
        },
        {
            title: 'Package',
            dataIndex: 'Package',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            render: (t, r) => {
                if (t === 'Pending') {
                    return (<h6 className="text-danger">{t || ''}</h6>)
                } else {
                    return (<h6 className="text-success">{t || ''}</h6>)
                }
            },
        },
        {
            title: 'Delete',
            key: 'action',
            render: (text, record) => (
                <Space size="large " className="text-danger" onClick={() => Delete(record)}>
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                    Delete
                </Space>
            ),
        },
    ];


   

    return (
        <>
            {myData.length ? (
                <Table columns={columns} dataSource={myData} className="text-center" />
            ) : (
                <div className="mt-4 text-center">
                    <img src="/no item.png" width="200" height="200" />
                    <h6> No Data Found </h6>
                </div>
            )}

        </>
    );
}

export default ClientManagerTabel;






const button2style = {
    fontSize: '13px',
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "4px 20px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
};

 