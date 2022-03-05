import {createSlice} from "@reduxjs/toolkit";

const initialKnowledgedBasesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  knowledgedBaseForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const knowledgedBasesSlice = createSlice({
  name: "knowledgedBases",
  initialState: initialKnowledgedBasesState,
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
    knowledgedBaseFetched: (state, action) => {
      state.actionsLoading = false;
      state.knowledgedBaseForEdit = action.payload.knowledgedBaseForEdit;
      state.error = null;
    },
    // findKnowledgedBases
    knowledgedBasesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUtility
    knowledgedBaseCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.knowledgedBase);
    },
    // updateUtility
    knowledgedBaseUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.knowledgedBase.id) {
          return action.payload.knowledgedBase;
        }
        return entity;
      });
    },
    // deleteUtility
    knowledgedBaseDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteKnowledgedBases
    knowledgedBasesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // knowledgedBasesUpdateState
    knowledgedBasesStatusUpdated: (state, action) => {
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
