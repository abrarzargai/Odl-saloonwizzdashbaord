import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
//imports

import Utilities from "./Reducer/Utilities"
import AuthReducer from './Reducer/AuthReducer'

const rootReducers = combineReducers({
    Utilities: Utilities,
    AuthReducer
})
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
export default store;