import {combineReducers} from "redux";
import userCredentialsReducer from "./UserCredentials";
import adsListTypeReducer from "./AdsListType";
import currentCategoriesRouteReducer from "./CurrentCategoryRoute";
import currentCategoriesReducer from "./CurrentCategories";
import categoriesReducer from "./Categories";

const allReducers = combineReducers({
    adsListType: adsListTypeReducer,
    userCredentials: userCredentialsReducer,
    currentCategoriesRoute: currentCategoriesRouteReducer,
    currentCategories: currentCategoriesReducer,
    categories: categoriesReducer
})

export default allReducers
