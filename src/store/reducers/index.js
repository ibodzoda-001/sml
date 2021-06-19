import {combineReducers} from "redux";
import userCredentialsReducer from "./UserCredentials";

const allReducers = combineReducers({
    userCredentials: userCredentialsReducer,
})

export default allReducers
