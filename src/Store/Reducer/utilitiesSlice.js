import {createSlice} from "@reduxjs/toolkit";

const initialUtilitiesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userUtilities:null,
  utilityForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const utilitiesSlice = createSlice({
  name: "utilities",
  initialState: initialUtilitiesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getUtilityById
    utilityFetched: (state, action) => {
      state.actionsLoading = false;
      state.utilityForEdit = action.payload.utilityForEdit;
      state.error = null;
    },
     getOneUserUtilities: (state, action) => {
       console.log("action payload",action.payload)
      state.actionsLoading = false;
       state.listLoading = false;
       state.userUtilities = action.payload;
      state.error = null;
    },
    // findUtilities
    utilitiesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUtility
    utilityCreated: (state, action) => {
      console.log(action.payload)
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
   
    utilityUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload._id) {
          return action.payload;
        }
        return entity;
      });
    },
    
    utilityDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteUtilities
    utilitiesDeleted: (state, action) => {
      console.log(action.payload)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el._id !== action.payload);
    },
    // utilitiesUpdateState
    utilitiesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
