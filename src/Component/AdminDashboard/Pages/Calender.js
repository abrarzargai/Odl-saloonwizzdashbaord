import { Divider, message, Modal, Spin } from 'antd';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from '../../../Store/Action/Calenders';
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
     const { currentState } = useSelector(
        (state) => ({ currentState: state.Calenders }),
        shallowEqual
      );
      const { totalCount, entities, listLoading } = currentState;
    const dispatch = useDispatch();
    useEffect(() => {
         dispatch(actions.fetchCalenders());
    }, [])

 

    const onSubmit = async (data) => {
       
        let date = new Date(data.Date)
        date.setDate(date.getDate() + 1);
        dispatch(actions.createCalender
            ({ Title: data.Title,
             Date: format(date, 'MM/dd/yyyy'),
              Description: data.Description, }, dispatch));
        setIsModalVisible(false);
    }

    const Delete = async (data) => {
        console.log("delete function:", data)
        dispatch(actions.deleteCalenders({ Id: data }, dispatch));
        setReminderModel(false);
        message.info("Deleted")
    }
   const  eventStyleGetter = (event, start, end, isSelected)=> {
      
       
        var style = {
            background: "linear-gradient(to right, #AC5288, #3F1254)" ,
            borderRadius: '10px',
            textAlign:'center',
            boxShadow:'0 3px 5px 1px rgb(138, 138, 138)',
            border:'none',
            opacity: 0.9,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }
    
    return (
        <>

      
           <Divider style={{color: '#9e1068' }} > Calender </Divider>
            <div class=" d-flex justify-content-between align-items-center px-3 mb-4">

                <h2>   </h2>
                <div>
                    <button

                       className='addButton'
                        onClick={() => { setIsModalVisible(true) }}>
                        Add
                    </button>
                </div>
            </div>
            <div>
                {listLoading?(
                    <div style={{ textAlign: 'center', padding: '100px 0px',color:'red' }}>
                    <Spin style={{color:'yellow',}}  ></Spin>
                    </div>
                ):(
                <Calendar
                    localizer={localizer}
                    events={entities}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    popup={true}
                    onSelectEvent={(e) => { 
                       setReminderData(e);
                       setReminderModel(true);
                        console.log(e);
                     }}
                            eventPropGetter={(eventStyleGetter)}
                />
                )}
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
                                    
                                    <input type="submit" className='addButton' value="Add" />
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
                        <button className='addButton mb-2 mx-4' onClick={() => Delete(ReminderData.id)}>  Delete Reminder </button>
                        <button className='addButton mb-2'  onClick={() => setReminderModel(false)}>  Cancel </button>
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

