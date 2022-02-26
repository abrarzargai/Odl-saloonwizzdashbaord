import React, { useState, useEffect } from 'react';
import { message, Button, Modal } from 'antd';
import { useForm } from "react-hook-form";
import '../../Css/Forms.css'
import { Tag, Divider } from 'antd';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Reminder } from "../../../Services/Api";
import { compareAsc, format } from 'date-fns'

function Calender() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [theArray, setTheArray] = useState([]);
    const [loading, setloading] = useState(true);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    const onSubmit = async (data) => {
    

        console.log(data.Date.getFullYear(),)
        console.log({
            Title: data.Title, Date: format(new Date(data.Date), 'MM/dd/yyyy'), Description: 'Description'
        })
      
     
        const Response = await Reminder.Add({
            Title: data.Title, Date: format( new Date(data.Date), 'MM/dd/yyyy'), Description:'Description'})
        if (Response){
            ApiCall()
            message.success("Added Successfully")
            setIsModalVisible(false);
        }else{
            message.error("Server Down...!")
            setIsModalVisible(false);
        }

    }

    
    return (
        <>

         <Divider  > Calender </Divider>
            <div class=" d-flex justify-content-between align-items-center px-3 mb-4">

                <h2>   </h2>
                <div>
                    <Button

                        style={buttonstyle}
                        onClick={() => { setIsModalVisible(true) }}>
                        Add
                    </Button>
                </div>
            </div>
            <div>
                <Calendar
                    localizer={localizer}
                    events={theArray}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
            <Modal visible={isModalVisible} onCancel={() => { setIsModalVisible(false); }}
                footer={[
                    // <div div className='text-center' >
                    //     <Button style={button2style} className="my-2" onClick={() => UploadHandler()}>  Add New Utility </Button>
                    // </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center">
                    <h5 >Add New Reminder</h5>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 ">
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <div class="inputbox form-group mt-4">
                                        <input type="text" required="required" class="form-control" {...register("Title", { required: true })} />
                                        <span>Title</span>
                                    </div>
                                    <div class="inputbox form-group mt-4">
                                        <input type="datetime-local" required="required" class="form-control" {...register("Date", { required: true })} />
                                       
                                    </div>
                                    
                                    <input type="submit" style={button2style} value="Add" />
                                </form>

                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >

        </>
    );
}

export default Calender;

const buttonstyle = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "0px 35px",
    borderRadius: '8px',
    border: "none"
};

const button2style = {
    background: "linear-gradient(to right, rgb(216, 93, 185),rgb(126, 3, 109), rgb(51, 1, 44))",
    color: 'white',
    padding: "10px 35px",
    borderRadius: '8px',
    border: "none",
    boxShadow: ' 0 3px 5px 1px rgb(138, 138, 138)',
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
