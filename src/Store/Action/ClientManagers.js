import * as requestFromServer from "../Crud/ClientManagers";
import {clientManagersSlice, callTypes} from "../Reducer/clientManagersSlice";

const {actions} = clientManagersSlice;

export const fetchClientManagers = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllClientManagers()
    .then(response => {
      console.log(response)
      const entities  = response.data.Data;
      const totalCount = response.data.Data.length;
      dispatch(actions.clientManagersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find clientManagers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


export const createClientManagerDeal = clientManagerForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createClientManagerDeal(clientManagerForCreation)
    .then(response => {
      console.log(response)
      const DealList = response.data.Data.DealList;
      dispatch(actions.createClientManagerDeal({ DealList, data: clientManagerForCreation}));
    })
    .catch(error => {
      error.clientMessage = "Can't create clientManager";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


export const deleteClientManagerDeal = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteClientManagerDeal(ids)
    .then((res) => {
      console.log("res",res)
      dispatch(actions.deleteClientManagerDeal(res.data.Data));
    })
    .catch(error => {
      error.clientMessage = "Can't delete clientManagers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
