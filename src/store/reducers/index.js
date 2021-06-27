import {combineReducers} from "redux";
import userCredentialsReducer from "./UserCredentials";
import adsListTypeReducer from "./AdsListType";
import currentCategoriesRouteReducer from "./CurrentCategoryRoute";

const allReducers = combineReducers({
    adsListType: adsListTypeReducer,
    userCredentials: userCredentialsReducer,
    currentCategoriesRoute: currentCategoriesRouteReducer
})

export default allReducers
