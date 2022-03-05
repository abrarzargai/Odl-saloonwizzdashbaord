import {createSlice} from "@reduxjs/toolkit";

const initialMarketingServicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userentities: null,
  userentitiesloading: true,
  marketingServiceForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const marketingServicesSlice = createSlice({
  name: "marketingServices",
  initialState: initialMarketingServicesState,
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
    marketingServiceFetched: (state, action) => {
      console.log(action.payload);
      state.actionsLoading = false;
      state.entities = action.payload;
      state.error = null;
      state.listLoading = false;
    },
    UsermarketingServicesFetched: (state, action) => {
      console.log(action.payload);
      state.userentitiesloading = false;
      state.userentities = action.payload;
      state.error = null;
      state.listLoading = false;
    },
    // findMarketingServices
    // marketingServicesFetched: (state, action) => {
    //   const { totalCount, entities } = action.payload;
    //   state.listLoading = false;
    //   state.error = null;
    //   state.entities = entities;
    //   state.totalCount = totalCount;
    // },
    // createUtility
    marketingServiceCreated: (state, action) => {
      console.log(action.payload)
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUtility
    marketingServiceUpdated: (state, action) => {
      console.log(action.payload)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.Id) {
          
          delete action.payload.Id
          return state.entities ={
            ...action.payload, _id: entity._id
          }
        }
        return entity;
      });
    },
    // deleteUtility
    marketingServiceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el._id !== action.payload);
    },
    // deleteMarketingServices
    marketingServicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // marketingServicesUpdateState
    marketingServicesStatusUpdated: (state, action) => {
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
