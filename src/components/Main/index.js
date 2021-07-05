import React, {useEffect, useState} from 'react'
import {Input, Collapse, Button} from 'antd';
import AdsList from "../AdsList";
import MainPageService from "../../services/MainPageService";
import {location, useHistory, useLocation} from "react-router-dom";
import Categories from "./Categories";
import {useDispatch, useSelector} from "react-redux";
import {SearchOutlined} from "@ant-design/icons";
import AdsListConverter from "../../helpers/AdsListConverter";

const {Search} = Input;
const {Panel} = Collapse;

function Main() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const [loadMoreButtonLoading, setLoadMoreButtonLoading] = useState(false);
    const [isLastPage, setLastPage] = useState(false);

    const searchParams = useSelector((state) => {
        return state.searchParams;
    });

    const mainAds = useSelector((state) => {
        return state.mainAds;
    })

    const mainListLoading = useSelector((state) => {
        return state.mainListLoading;
    })

    function getAllAds(calledFrom, inParams) {
        if (calledFrom !== 'useEffect') {
            history.push(`/main?category=${searchParams.category}&subCategory=${searchParams.subCategory}&searchField=${searchParams.searchField}&minPrice=${searchParams.minPrice}&maxPrice=${searchParams.maxPrice}&range=${searchParams.range}`);
        }
        if (calledFrom !== 'loadMoreButton') {
            dispatch({type: 'SET_LOADING'});
        }
        MainPageService().getAllAds(calledFrom === 'useEffect' ? inParams : searchParams, (data) => {
            setLastPage(data.products.length < 10);
            setLoadMoreButtonLoading(false);
            dispatch({type: 'SET_UNLOADING'});
            dispatch({type: 'SET_ADS', data: [...mainAds, ...AdsListConverter(data.products)]});
        }, calledFrom !== 'loadMoreButton', (error) => {
        })
    }

    useEffect(() => {
        const inParams = {
            category: new URLSearchParams(location.search).get('category') === null ? '' : new URLSearchParams(location.search).get('category'),
            subCategory: new URLSearchParams(location.search).get('subCategory') === null ? '' : new URLSearchParams(location.search).get('subCategory'),
            searchField: new URLSearchParams(location.search).get('searchField') === null ? '' : new URLSearchParams(location.search).get('searchField'),
            minPrice: new URLSearchParams(location.search).get('minPrice') === null ? '' : new URLSearchParams(location.search).get('minPrice'),
            maxPrice: new URLSearchParams(location.search).get('maxPrice') === null ? '' : new URLSearchParams(location.search).get('maxPrice'),
            range: new URLSearchParams(location.search).get('range') === null ? 0 : new URLSearchParams(location.search).get('range')
        }
        dispatch({
            type: "SET_PARAMS", data: inParams
        });
        history.push(`/main?category=${inParams.category}&subCategory=${inParams.subCategory}&searchField=${inParams.searchField}&minPrice=${inParams.minPrice}&maxPrice=${inParams.maxPrice}&range=${inParams.range}`);
        getAllAds('useEffect', inParams);
    }, [])

    return (
        <>
            <form style={{maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto'}}>
                <div style={{display: 'flex'}}>
                    <Input size={'large'} defaultValue={searchParams.searchField} onChange={(event) => {
                        searchParams.searchField = event.target.value;
                        dispatch({type: 'SET_PARAMS', data: searchParams});
                    }} placeholder="Поиск по сайту"/>
                    {
                        searchParams.category === '' ?
                            <Button htmlType="submit" style={{marginLeft: '10px'}} size={'large'}
                                    icon={<SearchOutlined/>} onClick={(event) => {
                                event.preventDefault();
                                getAllAds('searchField');
                            }} type="primary">Найти</Button> : ''
                    }
                </div>
                {
                    searchParams.category !== ''
                        ? <Collapse defaultActiveKey={['1']} expandIconPosition="right" ghost>
                            <Panel header="Расширенный поиск" key="1">
                                <div>
                                    <div style={{display: 'flex', width: '100%'}}>
                                        <label style={{width: '50%'}}>
                                            <Input type="number" min={0}
                                                   onChange={(event) => {
                                                       searchParams.minPrice = event.target.value;
                                                       dispatch({type: 'SET_PARAMS', data: searchParams});
                                                   }}
                                                   placeholder="Введите минимальную цену"
                                                   suffix="TJS"/>
                                        </label>
                                        <label style={{marginLeft: '15px', width: '50%'}}>
                                            <Input type="number" min={0}
                                                   onChange={(event) => {
                                                       searchParams.maxPrice = event.target.value;
                                                       dispatch({type: 'SET_PARAMS', data: searchParams});
                                                   }}
                                                   placeholder="Введите максимальную цену"
                                                   suffix="TJS"/>
                                        </label>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse> : null
                }

                {
                    searchParams.category !== ''
                        ? <div style={{textAlign: 'end', marginTop: '10px'}}>
                            <Button htmlType="submit" size={'large'}
                                    icon={<SearchOutlined/>} onClick={(event) => {
                                event.preventDefault();
                                getAllAds('searchField');
                            }} type="primary">Найти</Button>
                        </div> : null
                }
            </form>

            <Categories/>

            <AdsList listOfAds={mainAds}
                     listLoading={mainListLoading}
                     loadMoreButtonLoading={loadMoreButtonLoading}
                     purpose={'view'} loadMoreClicked={() => {
                setLoadMoreButtonLoading(true);
                searchParams.range = Number(searchParams.range) + 1;
                dispatch({type: 'SET_PARAMS', data: searchParams});
                getAllAds('loadMoreButton');
            }} isLastPage={isLastPage}/>
        </>
    )
}

export default Main;