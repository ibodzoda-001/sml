import {Breadcrumb} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import MainPageService from "../../services/MainPageService";
import AdsListConverter from "../../helpers/AdsListConverter";

function CurrentCategoryRoute() {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentRoute = useSelector((state) => {
        return state.currentCategoriesRoute;
    })
    const mapOfCategories = useSelector((state) => {
        return state.categories;
    })
    const searchParams = useSelector((state) => {
        return state.searchParams;
    })

    function getAllAds() {
        dispatch({type: 'SET_LOADING'});
        history.push(`/main?category=${searchParams.category}&subCategory=${searchParams.subCategory}&searchField=${searchParams.searchField}&minPrice=${searchParams.minPrice}&maxPrice=${searchParams.maxPrice}&range=${searchParams.range}`);
        MainPageService().getAllAds(searchParams, (data) => {
            dispatch({type: 'SET_UNLOADING'});
            dispatch({type: 'SET_ADS', data: AdsListConverter(data.products)});
        })
    }

    return (
        <Breadcrumb>
            <Breadcrumb.Item onClick={() => {
                dispatch({type: 'SET_ROUTES', data: null});
                dispatch({type: 'SET_CURRENT_CATEGORIES', data: mapOfCategories['null']});
                searchParams.category = '';
                searchParams.subCategory = '';
                dispatch({type: 'SET_PARAMS', data: searchParams});
                getAllAds();
            }} key={0}>
                <a>Все категории</a>
            </Breadcrumb.Item>
            {
                currentRoute !== null ? currentRoute.map((route, routeIndex) => {
                    return <Breadcrumb.Item onClick={() => {
                        if (currentRoute.length === 2) {
                            searchParams.subCategory = '';
                        } else if (currentRoute.length > 2) {
                            searchParams.subCategory = currentRoute[currentRoute.length - 2].id;
                        }
                        dispatch({type: 'SET_ROUTES', data: currentRoute.slice(0, routeIndex + 1)});
                        dispatch({type: 'SET_PARAMS', data: searchParams});
                        if (mapOfCategories[String(route.id)] !== undefined) {
                            dispatch({type: 'SET_CURRENT_CATEGORIES', data: mapOfCategories[String(route.id)]});
                        }
                        getAllAds();
                    }} key={routeIndex + 1}><a>{route.label}</a></Breadcrumb.Item>
                }) : null
            }
        </Breadcrumb>
    )
}

export default CurrentCategoryRoute;