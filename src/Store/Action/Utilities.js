import * as requestFromServer from "../Crud/Utilities";
import {utilitiesSlice, callTypes} from "../Reducer/utilitiesSlice";

const {actions} = utilitiesSlice;
//getall
export const fetchUtilities = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllUtilities()
    .then(response => {
      const Data = response.data.Data;
      let entities = Data
      let totalCount = Data.length
      dispatch(actions.utilitiesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find utilities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUtility = id => dispatch => {
  if (!id) {
    return dispatch(actions.utilityFetched({ utilityForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUtilityById(id)
    .then(response => {
      const utility = response.data;
      dispatch(actions.utilityFetched({ utilityForEdit: utility }));
    })
    .catch(error => {
      error.clientMessage = "Can't find utility";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUtility = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUtility(id)
    .then(response => {
      dispatch(actions.utilityDeleted( id ));
    })
    .catch(error => {
      error.clientMessage = "Can't delete utility";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUtility = utilityForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUtility(utilityForCreation)
    .then(response => {
      
      const  utility  = response.data.Record;
      console.log(utility)
      dispatch(actions.utilityCreated( utility ));
    })
    .catch(error => {
      error.clientMessage = "Can't create utility";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUtility = utility => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUtility(utility)
    .then(() => {
      dispatch(actions.utilityUpdated({ utility }));
    })
    .catch(error => {
      error.clientMessage = "Can't update utility";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUtilitiesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUtilities(ids, status)
    .then(() => {
      dispatch(actions.utilitiesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update utilities status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
//delete
export const deleteUtilities = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUtility(ids)
    .then(() => {
      dispatch(actions.utilitiesDeleted( ids.Id ));
    })
    .catch(error => {
      error.clientMessage = "Can't delete utilities";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const deleteSupplier = utility => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSupplier(utility)
    .then((response) => {
       dispatch(actions.utilityUpdated( response.data.Data ));
    })
    .catch(error => {
      error.clientMessage = "Can't update utility";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const AddSupplier = utility => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .AddSupplier(utility)
    .then((response) => {
      dispatch(actions.utilityUpdated(response.data.Data));
      
    })
    .catch(error => {
      error.clientMessage = "Can't update utility";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};