import { MailOutlined } from '@ant-design/icons';
import { Avatar, Divider, message, Tooltip, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { DigitalAssistanceApi } from "../../../Services/Api";
// import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../Store/Action/DigitalAssistances';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function DigitalAssistance() {
    const [loading, setloading] = useState(true);
    const [theArray, setTheArray] = useState([]);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const { currentState } = useSelector(
        (state) => ({ currentState: state.DigitalAssistances }),
        shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchDigitalAssistances());
        // ApiCall();
        // setloading(false)
    }, [])



    async function update(data) {
        dispatch(actions.updateDigitalAssistance({
            Id: data._id, isRead: true
        }));


    }

    return (
        <>
            <Divider orientation="left" style={{color: '#9e1068' }}>All Messages {totalCount}</Divider>
            
            {listLoading ? (
                <div class="text-center">
                    <Spin></Spin>
                </div>
            ) : (
                <div>

                    {

                        entities ? (

                            entities.map((x) => {
                                return (

                                    <div class=" mt-2 d-flex justify-content-between align-items-center px-3 bg-light px-5 py-3  shadow-sm bg-white rounded">

                                        <h6>

                                            {/* <Avatar  icon="" className="mr-4" /> */}
                                            <Avatar size={54} className="mr-4 backgroundClass text-white" >{x.UserName[0]}</Avatar>
                                            <span className="ml-5" style={{ marginLeft: '10px' }}> {x.UserName}</span>
                                            {
                                                x.isRead ? (
                                                    <span style={{ marginLeft: '5PX' }} > </span>

                                                ) : (
                                                    <Tooltip title="Click to Mark as read">
                                                            <MailOutlined className="digitalAssistance-isRead" onClick={() => { update(x) }} />
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
                </div>
            )}
        </>
    );
}

export default DigitalAssistance;


const Data = [
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
    { name: "User-1", time: "23/23/23", isread: false },
]


const ReadStyle = {

    color: '#9e1068',
    fontSize: "20px", marginLeft: '8PX', marginBottom: '15px'
};