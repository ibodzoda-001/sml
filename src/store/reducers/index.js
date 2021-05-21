import {combineReducers} from "redux";
import isLoggedInReducer from "./IsLoggedIn";
import userTypeReducer from "./UserType";

const allReducers = combineReducers({
    isLoggedIn: isLoggedInReducer,
    userType: userTypeReducer
})

export default allReducers
