import {Breadcrumb} from 'antd';
import {useSelector} from "react-redux";

function CurrentCategoryRoute() {
    const currentRoute = useSelector((state) => {
        return state.currentCategoriesRoute;
    })

    return (
        <Breadcrumb style={{marginBottom: '5px', marginTop: '15px'}}>
            <Breadcrumb.Item key={0}>
                <a>Все категории</a>
            </Breadcrumb.Item>
            {
                currentRoute !== null ? currentRoute.map((route, routeIndex) => {
                    return <Breadcrumb.Item key={routeIndex + 1}><a>{route.label}</a></Breadcrumb.Item>
                }) : null
            }
        </Breadcrumb>
    )
}

export default CurrentCategoryRoute;