import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, message, Space, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UsrServicePackageApi } from '../../../Services/Api';


function ClientManagerTabel(props) {
    const [myData, setMyData] = useState([])

    useEffect(() => {
        getData();
    }, [])
    

    const getData = async () => {
        await axios.get('https://odl-saloonwizz-app.herokuapp.com/api/UserServices/getall')
            .then(function (response) {

                const User = JSON.parse(localStorage.getItem('profile'))

                    let temp = []
              Promise.all( response?.data?.Data.map((data)=>{
                    if (data.User[0]?.Email === User.Email){
                        temp.push(data)
                    }
                    return data
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
        // {
        //     title: 'Delete',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space size="large " className="text-danger" onClick={() => Delete(record)}>
        //             <DeleteOutlined style={{ fontSize: "20px" }} />
        //             Delete
        //         </Space>
        //     ),
        // },
    ];


   

    return (
        <>
            {myData.length ? (
                <Table columns={columns} dataSource={myData} className="text-center" />
            ) : (
                <div className="mt-4 text-center">
                   
                </div>
            )}

        </>
    );
}

export default ClientManagerTabel;



 