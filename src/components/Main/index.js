import React, {useEffect, useState} from 'react'
import {Input, Collapse, InputNumber} from 'antd';
import AdsList from "../AdsList";
import MainPageService from "../../services/MainPageService";
import {useHistory, useLocation} from "react-router-dom";
import Categories from "./Categories";
import {DownOutlined, RightOutlined} from '@ant-design/icons';

const {Search} = Input;
const {Panel} = Collapse;

function Main() {
    const history = useHistory();
    const location = useLocation();

    const [ads, setAds] = useState([]);
    const [listLoading, setListLoading] = useState(false);
    const [searchField, setSearchField] = useState(new URLSearchParams(location.search).get('searchText') === null ? '' : new URLSearchParams(location.search).get('searchText'));

    function getAllProducts(searchText) {
        history.push(`/main?searchText=${searchText}`)
        setListLoading(true);
        MainPageService().getAllProducts(searchText, (data) => {
            const listOfData = [];
            data.products.forEach((ad) => {
                listOfData.push({
                    id: ad.productID,
                    header: (<div style={{display: 'flex'}}>
                        <h3>{ad.title}</h3>
                        <div style={{marginLeft: 'auto'}}>
                            <span style={{
                                fontSize: '23px',
                                color: 'dimgray'
                            }}>{ad.price} TJS{ad.bargain ? '. Торг.' : ''}</span>
                        </div>
                    </div>),
                    title: ad.title,
                    price: ad.price,
                    bargain: ad.bargain,
                    content: ad.description,
                    pictures: ad.pictures,
                });
            })

            setAds(listOfData);
            setListLoading(false);
        })
    }

    useEffect(() => {
        setSearchField(searchField);
        getAllProducts(searchField);
    }, [])

    return (
        <>
            <div style={{width: '60vw'}}>
                <Search size={'large'} defaultValue={searchField} placeholder="Поиск по сайту"
                        onSearch={(searchText) => {
                            setSearchField(searchText);
                            getAllProducts(searchText);
                        }}/>
                <Collapse expandIconPosition="right" ghost>
                    <Panel header="Расширенный поиск" key="1">
                        <div style={{display: 'flex'}}>
                            <label>
                                <Input type="number" style={{width: 'fit-content'}} min={0}
                                       placeholder="Минимальная цена"
                                       suffix="TJS"/>
                            </label>
                            <label style={{marginLeft: '15px'}}>
                                <Input type="number" style={{width: 'fit-content'}} min={0}
                                       placeholder="Максимальная цена"
                                       suffix="TJS"/>
                            </label>
                        </div>
                    </Panel>
                </Collapse>
            </div>

            <Categories/>

            <AdsList listOfAds={ads} listLoading={listLoading} purpose={'view'}/>
        </>
    )
}

export default Main;