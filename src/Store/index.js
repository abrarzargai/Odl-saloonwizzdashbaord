import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
//imports

import Utilities from "./Reducer/Utilities"
import AuthReducer from './Reducer/AuthReducer'
import { utilitiesSlice } from "./Reducer/utilitiesSlice";
import { calendersSlice } from "./Reducer/calendersSlice";
import { marketingServicesSlice } from "./Reducer/marketingServicesSlice";
import { clientManagersSlice } from "./Reducer/clientManagersSlice";
import { utilityBillsSlice } from "./Reducer/utilityBillsSlice";
import { knowledgedBasesSlice } from "./Reducer/knowledgedBasesSlice";
import { digitalAssistancesSlice } from "./Reducer/digitalAssistancesSlice";

const rootReducers = combineReducers({
    Utilities: Utilities,
    Utilities: utilitiesSlice.reducer,
    Calenders: calendersSlice.reducer,
    MarketingServices: marketingServicesSlice.reducer,
    ClientManagers: clientManagersSlice.reducer,
    UtilityBills: utilityBillsSlice.reducer,
    KnowledgedBases: knowledgedBasesSlice.reducer,
    DigitalAssistances: digitalAssistancesSlice.reducer,
    AuthReducer
})
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
export default store;