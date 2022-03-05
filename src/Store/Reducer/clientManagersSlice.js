import {createSlice} from "@reduxjs/toolkit";

const initialClientManagersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  clientManagerForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const clientManagersSlice = createSlice({
  name: "clientManagers",
  initialState: initialClientManagersState,
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
    clientManagerFetched: (state, action) => {
      state.actionsLoading = false;
      state.clientManagerForEdit = action.payload.clientManagerForEdit;
      state.error = null;
    },
    // findClientManagers
    clientManagersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      console.log(totalCount, entities)
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUtility
    createClientManagerDeal: (state, action) => {
      console.log(action.payload)
      state.actionsLoading = false;
      state.error = null;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.data.Id) {
          return{ 
            DealList: action.payload.DealList,
            ContractExpiryDate: entity.ContractExpiryDate,
            User: entity.User,
            _id: entity._id,
            updatedAt: entity.updatedAt,
            createdAt: entity.createdAt,
            LOAForm: entity.LOAForm,
            LastBill: entity.LastBill,
          }
        }
        return entity;
      });
    },
    // updateUtility
    clientManagerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.clientManager.id) {
          return action.payload.clientManager;
        }
        return entity;
      });
    },
    // deleteUtility
    clientManagerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteClientManagers
    deleteClientManagerDeal: (state, action) => {
      const { _id } = action.payload;
      console.log(_id)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        console.log(_id, _id === entity._id)
        if (_id=== entity._id) {
          entity.DealList = action.payload.DealList;
        }
        return entity;
      });
    },
    // clientManagersUpdateState
    clientManagersStatusUpdated: (state, action) => {
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
