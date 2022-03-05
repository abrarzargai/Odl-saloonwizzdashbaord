import {createSlice} from "@reduxjs/toolkit";

const initialCalendersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  calenderForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const calendersSlice = createSlice({
  name: "calenders",
  initialState: initialCalendersState,
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
    // findCalenders
    calendersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUtility
    calenderCreated: (state, action) => {
      const { totalCount, entities } = state
      state.actionsLoading = false;
      state.error = null;
      console.log(entities, totalCount)
      state.entities.push(action.payload);
    },
    // updateUtility
    calenderUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.calender.id) {
          return action.payload.calender;
        }
        return entity;
      });
    },
    // deleteUtility
    calenderDeleted: (state, action) => {
      console.log()
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteCalenders
    calendersDeleted: (state, action) => {
      console.log(action.payload)
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.Id.includes(el.id)
      );
    },
    // calendersUpdateState
    calendersStatusUpdated: (state, action) => {
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
