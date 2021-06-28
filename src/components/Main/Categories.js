import AdCreationService from "../../services/AdCreationService";
import {useEffect, useState} from "react";
import {Button, Divider} from "antd";
import {CarOutlined, HomeOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";

function Categories() {

    const [categories, setCategories] = useState([]);
    const mapOfIcons = new Map([[275, <CarOutlined/>], [285, <HomeOutlined/>]]);
    const dispatch = useDispatch();

    const currentRoute = useSelector((state) => {
        return state.currentCategoriesRoute;
    });
    const currentCategories = useSelector((state) => {
        return state.currentCategories;
    });

    const mapOfCategories = useSelector((state) => {
        return state.categories;
    })

    function getAllCategories() {
        AdCreationService().getCategories((data) => {
            setCategories(data.categories);
            mapOfCategories['null'] = data.categories;
            dispatch({type: 'SET_CATEGORIES', data: mapOfCategories});
            dispatch({type: 'SET_CURRENT_CATEGORIES', data: data.categories});
            createMapOfCategories(data.categories);
        })
    }

    function createMapOfCategories(categories) {
        categories.forEach((category) => {
            if (category.children.length !== 0) {
                mapOfCategories[String(category.id)] = category.children;
                dispatch({type: 'SET_CATEGORIES', data: mapOfCategories});
                createMapOfCategories(category.children);
            }
        })
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div style={{marginBottom: '15px'}}>
            {
                currentCategories && currentCategories.length !== 0 ? <Divider style={{marginTop: '0px'}}/> : null
            }
            {
                currentCategories && currentCategories.map((category, categoryIndex) => {
                    return <Button onClick={() => {
                        dispatch({
                            type: 'SET_ROUTES',
                            data: currentRoute !== null ? [...currentRoute, {
                                id: category.id,
                                label: category.label
                            }] : [{id: category.id, label: category.label}]
                        });
                        dispatch({type: 'SET_CURRENT_CATEGORIES', data: category.children});
                    }} style={{fontSize: '17px', color: 'dimgray'}} icon={mapOfIcons.get(category.id)}
                                   type="link">{category.label}</Button>
                })}

            {
                currentCategories && currentCategories.length !== 0 ? <Divider/> : null
            }
        </div>
    )
}

export default Categories;