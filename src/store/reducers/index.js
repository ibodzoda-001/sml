import {combineReducers} from "redux";
import userCredentialsReducer from "./UserCredentials";
import adsListTypeReducer from "./AdsListType";
import currentCategoriesRouteReducer from "./CurrentCategoryRoute";
import currentCategoriesReducer from "./CurrentCategories";
import categoriesReducer from "./Categories";
import searchParamsReducer from "./SearchParams";
import mainAdsReducer from "./MainAds";
import mainListLoadingReducer from "./MainListLoading";
import isLoadMoreButtonVisibleReducer from "./IsLoadMoreButtonVisible";

const allReducers = combineReducers({
    adsListType: adsListTypeReducer,
    userCredentials: userCredentialsReducer,
    currentCategoriesRoute: currentCategoriesRouteReducer,
    currentCategories: currentCategoriesReducer,
    categories: categoriesReducer,
    searchParams: searchParamsReducer,
    mainAds: mainAdsReducer,
    mainListLoading: mainListLoadingReducer,
    isLoadMoreButtonVisible: isLoadMoreButtonVisibleReducer
})

export default allReducers
