import AdCreationService from "../../services/AdCreationService";
import {useEffect, useState} from "react";
import {Button, Divider} from "antd";
import {CarOutlined, HomeOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import MainPageService from "../../services/MainPageService";
import AdsListConverter from "../../helpers/AdsListConverter";

function Categories() {

    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const mapOfIcons = new Map([[275, <CarOutlined/>], [285, <HomeOutlined/>]]);
    const dispatch = useDispatch();

    const categoriesRoute = useSelector((state) => {
        return state.currentCategoriesRoute;
    });
    const currentCategories = useSelector((state) => {
        return state.currentCategories;
    });
    const mapOfCategories = useSelector((state) => {
        return state.categories;
    })
    const searchParams = useSelector((state) => {
        return state.searchParams;
    });

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

    function getAllAds() {
        dispatch({type: 'SET_LOADING'});
        history.push(`/main?category=${searchParams.category}&subCategory=${searchParams.subCategory}&searchField=${searchParams.searchField}&minPrice=${searchParams.minPrice}&maxPrice=${searchParams.maxPrice}&range=${searchParams.range}`);
        MainPageService().getAllAds(searchParams, (data) => {
            dispatch({type: 'SET_UNLOADING'});
            dispatch({type: 'SET_ADS', data: AdsListConverter(data.products)});
        })
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div style={{marginBottom: '15px', marginTop: '20px'}}>
            {
                currentCategories && currentCategories.length !== 0 ? <Divider style={{marginTop: '0px'}}/> : null
            }
            {
                currentCategories && currentCategories.map((category, categoryIndex) => {
                    return <Button onClick={() => {
                        if (categoriesRoute === null) {
                            searchParams.category = category.id;
                            dispatch({type: 'SET_PARAMS', data: searchParams})
                        } else {
                            searchParams.subCategory = category.id;
                            dispatch({type: 'SET_PARAMS', data: searchParams})
                        }

                        dispatch({
                            type: 'SET_ROUTES',
                            data: categoriesRoute !== null ? [...categoriesRoute, {
                                id: category.id,
                                label: category.label
                            }] : [{id: category.id, label: category.label}]
                        });
                        dispatch({type: 'SET_CURRENT_CATEGORIES', data: category.children});
                        getAllAds();
                    }} style={{fontSize: '19px', color: 'dimgray'}} icon={mapOfIcons.get(category.id)}
                                   type="link">{category.label}</Button>
                })}

            {
                currentCategories && currentCategories.length !== 0 ? <Divider/> : null
            }
        </div>
    )
}

export default Categories;