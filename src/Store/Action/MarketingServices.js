import * as requestFromServer from "../Crud/MarketingServices";
import {marketingServicesSlice, callTypes} from "../Reducer/marketingServicesSlice";

const {actions} = marketingServicesSlice;

export const fetchMarketingServices = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllMarketingServices()
    .then(response => {
      console.log("response==>", response)
      const marketingService = response.data.Data;
      dispatch(actions.marketingServiceFetched(marketingService));
    })
    .catch(error => {
      error.clientMessage = "Can't find marketingServices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

// export const fetchMarketingService = id => dispatch => {
//   if (!id) {
//     return dispatch(actions.marketingServicesFetched({ marketingServiceForEdit: undefined }));
//   }

//   dispatch(actions.startCall({ callType: callTypes.action }));
//   return requestFromServer
//     .getMarketingServiceById(id)
//     .then(response => {
//       console.log("response==>", response)
//       const marketingService = response.data.Data;
//       dispatch(actions.marketingServiceFetched(marketingService));
//     })
//     .catch(error => {
//       error.clientMessage = "Can't find marketingService";
//       dispatch(actions.catchError({ error, callType: callTypes.action }));
//     });
// };


export const UsermarketingServicesFetched = data => dispatch => {
  if (!data) {
    return dispatch(actions.marketingServicesFetched({ marketingServiceForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMarketingServiceById(data)
    .then(response => {
      console.log(response)
      const data = response.data.Data;
      dispatch(actions.UsermarketingServicesFetched(data));
    })
    .catch(error => {
      error.clientMessage = "Can't find marketingService";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteMarketingService = data => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMarketingService(data)
    .then(response => {
    
      dispatch(actions.marketingServiceDeleted(data.Id));
      
    })
    .catch(error => {
      error.clientMessage = "Can't delete marketingService";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createMarketingService = marketingServiceForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMarketingService(marketingServiceForCreation)
    .then(response => {
      console.log(response)
      const  marketingService  = response.data.Record;
      console.log(marketingService)
      dispatch(actions.marketingServiceCreated( marketingService ));
    })
    .catch(error => {
      error.clientMessage = "Can't create marketingService";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};



export const updateMarketingService = marketingService => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMarketingService(marketingService)
    .then((res) => {
      console.log(res)
       dispatch(actions.marketingServiceUpdated( marketingService ));
    })
    .catch(error => {
      error.clientMessage = "Can't update marketingService";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateMarketingServicesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMarketingServices(ids, status)
    .then(() => {
      dispatch(actions.marketingServicesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update marketingServices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


