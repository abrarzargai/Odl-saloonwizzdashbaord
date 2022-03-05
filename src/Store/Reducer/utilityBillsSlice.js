import {createSlice} from "@reduxjs/toolkit";

const initialUtilityBillsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entitiesUtilitiesBill: null,
  entities: null,
  entitiesSupplierInvoice: null,
  utilityBillForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const utilityBillsSlice = createSlice({
  name: "utilityBills",
  initialState: initialUtilityBillsState,
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
    utilityBillFetched: (state, action) => {
      state.actionsLoading = false;
      state.utilityBillForEdit = action.payload.utilityBillForEdit;
      state.error = null;
    },
    // findUtilityBills
    utilityBillsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUtility
    utilityBillCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities = action.payload;
    },
    // updateUtility
    utilityBillUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.utilityBill.id) {
          return action.payload.utilityBill;
        }
        return entity;
      });
    },
    // deleteUtility
    utilityBillDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteUtilityBills
    utilityBillsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // utilityBillsUpdateState
    utilityBillsStatusUpdated: (state, action) => {
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
