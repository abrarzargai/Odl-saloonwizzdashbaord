import { message } from 'antd';
import * as requestFromServer from "../Crud/ClientManagers";
import { callTypes, clientManagersSlice } from "../Reducer/clientManagersSlice";
const {actions} = clientManagersSlice;

export const fetchClientManagers = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllClientManagers()
    .then(response => {
      console.log("response==> ",response.data)
      const entities  = response.data.Active;
      const totalCount = response.data.Active.length;
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
      message.info("Created")
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
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete clientManagers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
