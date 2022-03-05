import {createSlice} from "@reduxjs/toolkit";

const initialDigitalAssistancesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  digitalAssistanceForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const digitalAssistancesSlice = createSlice({
  name: "digitalAssistances",
  initialState: initialDigitalAssistancesState,
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
    digitalAssistanceFetched: (state, action) => {
      state.actionsLoading = false;
      state.digitalAssistanceForEdit = action.payload.digitalAssistanceForEdit;
      state.error = null;
    },
    // findDigitalAssistances
    digitalAssistancesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUtility
    digitalAssistanceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.digitalAssistance);
    },
    // updateUtility
    digitalAssistanceUpdated: (state, action) => {
      console.log(action.payload)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.Id) {
          return {
             UserName: entity.UserName,
            isRead: action.payload.isRead,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            _id: entity._id,
          }
        }
        return entity;
      });
    },
    // deleteUtility
    digitalAssistanceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteDigitalAssistances
    digitalAssistancesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // digitalAssistancesUpdateState
    digitalAssistancesStatusUpdated: (state, action) => {
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
