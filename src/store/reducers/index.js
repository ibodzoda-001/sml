import {combineReducers} from "redux";
import userCredentialsReducer from "./UserCredentials";
import adsListTypeReducer from "./AdsListType";

const allReducers = combineReducers({
    adsListType: adsListTypeReducer,
    userCredentials: userCredentialsReducer
})

export default allReducers
