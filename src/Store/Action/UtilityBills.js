import { message } from 'antd';
import * as requestFromServer from "../Crud/UtilityBills";
import { callTypes, utilityBillsSlice } from "../Reducer/utilityBillsSlice";
const {actions} = utilityBillsSlice;

export const fetchUtilityBills = (Email) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllUtilityBills(Email)
    .then(response => {
      console.log(response)
     let data = response.data.Data;
      let Temp = [];
      data.map((x) => {
       
          Temp.push(x)
        
      })
      let totalCount = Temp.length
      let entities = Temp
      dispatch(actions.utilityBillsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find utilityBills";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUtilityBill = id => dispatch => {
  if (!id) {
    return dispatch(actions.utilityBillFetched({ utilityBillForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUtilityBillById(id)
    .then(response => {
      const utilityBill = response.data;
      dispatch(actions.utilityBillFetched({ utilityBillForEdit: utilityBill }));
      
    })
    .catch(error => {
      error.clientMessage = "Can't find utilityBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUtilityBill = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUtilityBill(id)
    .then(response => {
      dispatch(actions.utilityBillDeleted({ id }));
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete utilityBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUtilityBill = utilityBillForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUtilityBill(utilityBillForCreation)
    .then(response => {
      console.log('response', response)
      console.log(response.data.filingsave.Filling)
      const data = response.data.filingsave.Filling;
      dispatch(actions.utilityBillCreated(data));
      message.info("Created")
    })
    .catch(error => {
      error.clientMessage = "Can't create utilityBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUtilityBill = utilityBill => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUtilityBill(utilityBill)
    .then(() => {
      dispatch(actions.utilityBillUpdated({ utilityBill }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update utilityBill";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUtilityBillsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUtilityBills(ids, status)
    .then(() => {
      dispatch(actions.utilityBillsStatusUpdated({ ids, status }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update utilityBills status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUtilityBills = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUtilityBills(ids)
    .then(() => {
      dispatch(actions.utilityBillsDeleted({ ids }));
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete utilityBills";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
