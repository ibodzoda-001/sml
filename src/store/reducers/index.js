import {combineReducers} from "redux";
import isLoggedInReducer from "./IsLoggedIn";

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
})

export default allReducers
