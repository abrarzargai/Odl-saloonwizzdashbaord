import React, { useState, useEffect } from 'react';
import { message, Button, Modal } from 'antd';
import '../../Css/Forms.css'
import { useForm } from "react-hook-form";
import { Tag, Divider } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Reminder } from "../../../Services/Api";
function Calender() {
    const [theArray, setTheArray] = useState([]);
    const [loading, setloading] = useState(true);
    const [theArrayCheck, setTheArrayCheck] = useState(true);

    const localizer = momentLocalizer(moment)

    useEffect(() => {
        ApiCall()
        setloading(false)
    }, [])

    const ApiCall = async () => {

        try {
            const GetHandler = await Reminder.GetAll()
            console.log("GetHandler", GetHandler)
            if (GetHandler) {
                let X = [];
                GetHandler.map((data) => {
                    X.push({
                        id: data._id,
                        title: data.Title,
                        start: new Date(data.Date),
                        end: new Date(data.Date)
                    })
                })
                setTheArray(X)
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

         <Divider  > Calender </Divider>
            <div>
                <Calendar
                    localizer={localizer}
                    events={theArray}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
              

        </>
    );
}

export default Calender;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "5px 35px",
    borderRadius: '8px',
};

const initialEvents = [
    {
        id: 0,
        title: "All Day Event very long title",
        start: new Date(2022, 2, 3),
        end: new Date(2022, 2, 3)
    },
    {
        id: 1,
        title: "Long Event",
        start: new Date(2022, 2, 2),
        end: new Date(2022, 2, 2)
    },
];
