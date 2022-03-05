import * as requestFromServer from "../Crud/ClientManagers";
import {clientManagersSlice, callTypes} from "../Reducer/clientManagersSlice";

const {actions} = clientManagersSlice;

export const fetchClientManagers = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllClientManagers()
    .then(response => {
      const entities  = response.data.Data;
      const totalCount = response.data.Data.length;
      dispatch(actions.clientManagersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find clientManagers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchClientManager = id => dispatch => {
  if (!id) {
    return dispatch(actions.clientManagerFetched({ clientManagerForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getClientManagerById(id)
    .then(response => {
      const clientManager = response.data;
      dispatch(actions.clientManagerFetched({ clientManagerForEdit: clientManager }));
    })
    .catch(error => {
      error.clientMessage = "Can't find clientManager";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteClientManager = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteClientManager(id)
    .then(response => {
      dispatch(actions.clientManagerDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete clientManager";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createClientManager = clientManagerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createClientManager(clientManagerForCreation)
    .then(response => {
      const { clientManager } = response.data;
      dispatch(actions.clientManagerCreated({ clientManager }));
    })
    .catch(error => {
      error.clientMessage = "Can't create clientManager";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateClientManager = clientManager => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateClientManager(clientManager)
    .then(() => {
      dispatch(actions.clientManagerUpdated({ clientManager }));
    })
    .catch(error => {
      error.clientMessage = "Can't update clientManager";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateClientManagersStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForClientManagers(ids, status)
    .then(() => {
      dispatch(actions.clientManagersStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update clientManagers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteClientManagers = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteClientManagers(ids)
    .then(() => {
      dispatch(actions.clientManagersDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete clientManagers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
