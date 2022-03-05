import * as requestFromServer from "../Crud/Calenders";
import {calendersSlice, callTypes} from "../Reducer/calendersSlice";
import { Button, Divider, message, Modal, Spin } from 'antd';

const {actions} = calendersSlice;

export const fetchCalenders = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllCalenders()
    .then(response => {
      console.log(response)
      const { Data } = response.data;
      const totalCount = Data.length
      let X = [];
      Data.map((data) => {
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
      const entities = X;
      dispatch(actions.calendersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find calenders";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


export const deleteCalender = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCalender(id)
    .then(response => {
      dispatch(actions.calenderDeleted({ id }));
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete calender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCalender = calenderForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCalender(calenderForCreation)
    .then(response => {
      const  calender  = response.data.Record;
      let date = new Date(calender.Date)
      date.setDate(date.getDate() + 1);
      const X = {
        id: calender._id,
        title: calender.Title,
        Description: calender.Description,
        start: date,
        end: date
      }
      dispatch(actions.calenderCreated( X ));
    
      message.info("Created")
    })
    .catch(error => {
      error.clientMessage = "Can't create calender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCalender = calender => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCalender(calender)
    .then(() => {
      dispatch(actions.calenderUpdated({ calender }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update calender";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCalendersStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCalenders(ids, status)
    .then(() => {
      dispatch(actions.calendersStatusUpdated({ ids, status }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update calenders status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

//delete
export const deleteCalenders = ids => dispatch => {
  console.log(ids)
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCalenders(ids)
    .then(() => {
      dispatch(actions.calendersDeleted({ ids }))
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete calenders";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
