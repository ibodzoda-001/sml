import {Breadcrumb} from 'antd';
import {useDispatch, useSelector} from "react-redux";

function CurrentCategoryRoute() {
    const dispatch = useDispatch();

    const currentRoute = useSelector((state) => {
        return state.currentCategoriesRoute;
    })
    const mapOfCategories = useSelector((state) => {
        return state.categories;
    })

    return (
        <Breadcrumb>
            <Breadcrumb.Item onClick={() => {
                dispatch({type: 'SET_ROUTES', data: null});
                dispatch({type: 'SET_CURRENT_CATEGORIES', data: mapOfCategories['null']});
            }} key={0}>
                <a>Все категории</a>
            </Breadcrumb.Item>
            {
                currentRoute !== null ? currentRoute.map((route, routeIndex) => {
                    return <Breadcrumb.Item onClick={() => {
                        console.log(mapOfCategories[String(route.id)]);
                        dispatch({type: 'SET_ROUTES', data: currentRoute.slice(0, routeIndex + 1)});
                        if(mapOfCategories[String(route.id)] !== undefined) {
                            dispatch({type: 'SET_CURRENT_CATEGORIES', data: mapOfCategories[String(route.id)]});
                        }
                    }} key={routeIndex + 1}><a>{route.label}</a></Breadcrumb.Item>
                }) : null
            }
        </Breadcrumb>
    )
}

export default CurrentCategoryRoute;