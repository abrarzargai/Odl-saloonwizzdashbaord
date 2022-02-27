import { Button, Divider, message, Modal } from 'antd';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useForm } from "react-hook-form";
import { Reminder } from "../../../Services/Api";
import '../../Css/Forms.css';

function Calender() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [theArray, setTheArray] = useState([]);
    const [loading, setloading] = useState(true);
    const [theArrayCheck, setTheArrayCheck] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ReminderModel, setReminderModel] = useState(false);
    const [ReminderData, setReminderData] = useState(false);
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
                    let date = new Date(data.Date)
                    date.setDate(date.getDate() + 1);
                    X.push({
                        id: data._id,
                        title: data.Title,
                        Description: data.Description,
                        start: date,
                        end: date
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
        let date = new Date(data.Date)
        date.setDate(date.getDate() + 1);

        const Response = await Reminder.Add({
            Title: data.Title, Date: format(date, 'MM/dd/yyyy'), Description: data.Description
})
        if (Response){
            ApiCall()
            message.success("Added Successfully")
            setIsModalVisible(false);
        }else{
            message.error("Server Down...!")
            setIsModalVisible(false);
        }

    }

    const Delete = async (data) => {
        console.log("delete function:", data)

        const Response = await Reminder.Delete({Id: data})
        if (Response) {
            ApiCall()
            message.success("Deleted")
            setReminderModel(false);
        } else {
            message.error("Server Down...!")
            setReminderModel(false);
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
                    popup={true}
                    onSelectEvent={(e) => { 
                       setReminderData(e);
                       setReminderModel(true);
                        console.log(e);
                     }}
                    
                />
            </div>
            {/* add reminder model */}
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
                                        <input type="text" required="required" class="form-control" {...register("Description", { required: true })} />
                                        <span>Description</span>
                                    </div>
                                    <div class="inputbox form-group mt-4">
                                        <input type="date" required="required" class="form-control" {...register("Date", { required: true })} />
                                       
                                    </div>
                                    
                                    <input type="submit" style={button2style} value="Add" />
                                </form>

                            </div>
                        </div>
                    </div>

                </div>


                {/* Form Ended Here */}

            </Modal >
            {/* view Reminder Model */}
            <Modal visible={ReminderModel} onCancel={() => { setReminderModel(false); }}
                footer={[
                    <div div className='text-center' >
                        <Button style={button2style} className="mb-2 " onClick={() => Delete(ReminderData.id)}>  Delete Reminder </Button>
                        <Button style={button2style} className="mb-2 " onClick={() => setReminderModel(false)}>  Cancel </Button>
                    </div>
                ]}
            >

                {/* Form Stated Here */}


                <div className=" text-center">
                    <i class="fa fa-bell text-warning fa-4x mb-3" aria-hidden="true"></i>
                    <h6>{ReminderData.title || ''}</h6>
                    <p>{ReminderData.Description || ''}</p>
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
    paddingBottm:'20px',
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
