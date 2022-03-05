import { message } from 'antd';
import * as requestFromServer from "../Crud/DigitalAssistances";
import { callTypes, digitalAssistancesSlice } from "../Reducer/digitalAssistancesSlice";
const {actions} = digitalAssistancesSlice;

//getall
export const fetchDigitalAssistances = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllDigitalAssistances()
    .then(response => {
      console.log(response)
      const data = response.data.Data;
      let totalCount = data.length;
      let entities = data;
      dispatch(actions.digitalAssistancesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find digitalAssistances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDigitalAssistance = id => dispatch => {
  if (!id) {
    return dispatch(actions.digitalAssistanceFetched({ digitalAssistanceForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDigitalAssistanceById(id)
    .then(response => {
      const digitalAssistance = response.data;
      dispatch(actions.digitalAssistanceFetched({ digitalAssistanceForEdit: digitalAssistance }));
    })
    .catch(error => {
      error.clientMessage = "Can't find digitalAssistance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDigitalAssistance = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDigitalAssistance(id)
    .then(response => {
      dispatch(actions.digitalAssistanceDeleted({ id }));
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete digitalAssistance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDigitalAssistance = digitalAssistanceForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDigitalAssistance(digitalAssistanceForCreation)
    .then(response => {
      const { digitalAssistance } = response.data;
      dispatch(actions.digitalAssistanceCreated({ digitalAssistance }));
      message.info("Created")
    })
    .catch(error => {
      error.clientMessage = "Can't create digitalAssistance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDigitalAssistance = digitalAssistance => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDigitalAssistance(digitalAssistance)
    .then(() => {
      dispatch(actions.digitalAssistanceUpdated( digitalAssistance ));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update digitalAssistance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDigitalAssistancesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDigitalAssistances(ids, status)
    .then(() => {
      dispatch(actions.digitalAssistancesStatusUpdated({ ids, status }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update digitalAssistances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDigitalAssistances = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDigitalAssistances(ids)
    .then(() => {
      dispatch(actions.digitalAssistancesDeleted({ ids }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't delete digitalAssistances";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
