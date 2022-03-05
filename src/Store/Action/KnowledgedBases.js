import { message } from 'antd';
import * as requestFromServer from "../Crud/KnowledgedBases";
import { callTypes, knowledgedBasesSlice } from "../Reducer/knowledgedBasesSlice";
const {actions} = knowledgedBasesSlice;

export const fetchKnowledgedBases = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllKnowledgedBases()
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.knowledgedBasesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find knowledgedBases";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchKnowledgedBase = id => dispatch => {
  if (!id) {
    return dispatch(actions.knowledgedBaseFetched({ knowledgedBaseForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getKnowledgedBaseById(id)
    .then(response => {
      const knowledgedBase = response.data;
      dispatch(actions.knowledgedBaseFetched({ knowledgedBaseForEdit: knowledgedBase }));
    })
    .catch(error => {
      error.clientMessage = "Can't find knowledgedBase";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteKnowledgedBase = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteKnowledgedBase(id)
    .then(response => {
      dispatch(actions.knowledgedBaseDeleted({ id }));
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete knowledgedBase";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createKnowledgedBase = knowledgedBaseForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createKnowledgedBase(knowledgedBaseForCreation)
    .then(response => {
      const { knowledgedBase } = response.data;
      dispatch(actions.knowledgedBaseCreated({ knowledgedBase }));
      message.info("Created")
    })
    .catch(error => {
      error.clientMessage = "Can't create knowledgedBase";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateKnowledgedBase = knowledgedBase => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateKnowledgedBase(knowledgedBase)
    .then(() => {
      dispatch(actions.knowledgedBaseUpdated({ knowledgedBase }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update knowledgedBase";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateKnowledgedBasesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForKnowledgedBases(ids, status)
    .then(() => {
      dispatch(actions.knowledgedBasesStatusUpdated({ ids, status }));
      message.info("Updated")
    })
    .catch(error => {
      error.clientMessage = "Can't update knowledgedBases status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteKnowledgedBases = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteKnowledgedBases(ids)
    .then(() => {
      dispatch(actions.knowledgedBasesDeleted({ ids }));
      message.info("Deleted")
    })
    .catch(error => {
      error.clientMessage = "Can't delete knowledgedBases";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
