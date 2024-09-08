import { combineReducers } from "redux";
import userReducer from "./userReducer/slice";


const rootReducer = combineReducers({ userReducer })

export default rootReducer  