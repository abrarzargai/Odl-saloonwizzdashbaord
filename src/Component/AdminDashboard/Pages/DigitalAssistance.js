
import React, { useState } from 'react';
import { Avatar } from 'antd';
import { Tag, Divider } from 'antd';
function DigitalAssistance() {
    return (
        <>
       <Divider orientation="left" >All Messages</Divider>
        {
                Data.map(x=>{

                    return(
                        <div class=" mt-2 d-flex justify-content-between align-items-center px-3 bg-light px-5 py-3" >

                            <h6  >

                                <Avatar size={54} icon="" className="mr-4" />
                                <span className="ml-5" style={{ marginLeft: '10px' }}> {x.name}</span>
                            </h6>

                            <div>
                            {x.time}
                            <div style={ReadStyle}> 
                             
                             </div>                          </div>
                        </div>
                    )
                })
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
    fontSize: '13px',
    background: "linear-gradient(to right,rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
    width:'20px',height:'20px',borderRadius:'20px'
};