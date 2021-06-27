import AdCreationService from "../../services/AdCreationService";
import {useEffect, useState} from "react";
import {Button, Divider} from "antd";
import {CarOutlined, HomeOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const mapOfIcons = new Map([[275, <CarOutlined/>], [285, <HomeOutlined/>]]);
    const dispatch = useDispatch();
    const currentRoute = useSelector((state) => {
        return state.currentCategoriesRoute;
    })

    function getAllCategories() {
        AdCreationService().getCategories((data) => {
            setCategories(data.categories);
            setSelectedCategories(data.categories);
        })
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div style={{marginBottom: '15px'}}>
            {
                selectedCategories.map((category, categoryIndex) => {
                    return <Button onClick={() => {
                        dispatch({
                            type: 'SET_ROUTES',
                            data: currentRoute !== null ? [...currentRoute, {
                                id: category.id,
                                label: category.label
                            }] : [{id: category.id, label: category.label}]
                        });
                        setSelectedCategories(category.children);
                    }} style={{fontSize: '17px'}} icon={mapOfIcons.get(category.id)}
                                   type="link">{category.label}</Button>
                })
            }
            {
                selectedCategories.length !== 0 ? <Divider/> : null
            }
        </div>
    )
}

export default Categories;