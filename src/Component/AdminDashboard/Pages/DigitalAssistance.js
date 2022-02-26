import { MailOutlined } from '@ant-design/icons';
import { Avatar, Divider, message, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { DigitalAssistanceApi } from "../../../Services/Api";

function DigitalAssistance() {
    const [loading, setloading] = useState(true);
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);

    //useEffect
    useEffect(() => {
        ApiCall();
        setloading(false)
    }, [])


    const ApiCall = async () => {

        try {
            const GetHandler = await DigitalAssistanceApi.GetAll()
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

   async function update(data){

        const APIHandler = await DigitalAssistanceApi.Update({
            Id: data._id, isRead: true
        })
        if (APIHandler) {
            ApiCall()
            message.info(" Message mark as Read")


        }
        else {
            message.error(" System Down..!")

        }

    }

    return (
        <>
            <Divider orientation="left" >All Messages</Divider>
            {

                theArrayCheck ? (

                    theArray.map((x) => {
                        console.log("x",x)
                        return (

                            <div class=" mt-2 d-flex justify-content-between align-items-center px-3 bg-light px-5 py-3  shadow-sm bg-white rounded">

                                <h6>

                                    {/* <Avatar  icon="" className="mr-4" /> */}
                                    <Avatar size={54} className="mr-4" style={{ color: '#fff0f6', backgroundColor: '#9e1068' }}>{x.UserName[0]}</Avatar>
                                    <span className="ml-5" style={{ marginLeft: '10px' }}> {x.UserName}</span>
                                    {
                                        x.isRead ? (
                                            <span style={{ marginLeft: '5PX' }} > </span>

                                        ) : (
                                            <Tooltip title="Click to Mark as read">
                                                    <MailOutlined style={ReadStyle}  onClick={() => { update(x)}} />
                                                </Tooltip>
                                        )
                                    } 
                                </h6>

                                <div>
                                    {x.createdAt} 
                                 
                                      
                                   
                                </div>
                            </div>

                        )
                    })
                ) : (
                    <div className="mt-4 text-center">
                        <img src="/no item.png" width="200" height="200" />
                        <h6> No Data Found </h6>
                    </div>
                )


            }

        </>
    );
}

export default DigitalAssistance;


const Data =[
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
    {name:"User-1", time:"23/23/23", isread:false},
]


const ReadStyle = {

    color: '#9e1068',
    fontSize: "20px", marginLeft: '8PX', marginBottom: '15px'
};