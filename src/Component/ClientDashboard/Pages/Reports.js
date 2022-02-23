import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{ name: '20', followers: 500 },
{ name: '21', followers: 300 },
{ name: '22', followers: 600 },
{ name: '23', followers: 100 },
{ name: '24', followers: 300 },
{ name: '25', followers: 600 },
{ name: '26', followers: 700 }];

function Reports() {
    return (
        <>
            <h4>Reports</h4>
   
                <div className="bg-light py-4">
                    <h6 className="my-3 ">Followers Last 7 days</h6>
                    <div className="  d-flex align-items-center justify-content-center">


                        <LineChart width={600} height={300} data={data} className="bg-light" >
                            <Line type="monotone" dataKey="followers" stroke="#19024f" dot={{ stroke: '#800080', strokeWidth: 3 }} />
                            <CartesianGrid vertical={false} stroke="#ccc" />
                            <XAxis dataKey="name" stroke="#19024f" />
                            <YAxis stroke="#19024f" />
                            <Tooltip itemStyle={{ color: "white" }} 
                            contentStyle={{ background:"#800080", color:"white",textAlign:'center'}} />
                        </LineChart>

                    </div>
                </div>
            
        </>
    );
}

export default Reports;
