import {Radio} from "antd";
import {TableOutlined, UnorderedListOutlined} from "@ant-design/icons";
import React from "react";
import {useDispatch} from "react-redux";

function ListType({listType}) {
    const dispatch = useDispatch();

    return (
        <Radio.Group onChange={(event) => {
            localStorage.setItem('adsListType', event.target.value);
            if (event.target.value === 'gallery') {
                dispatch({type: 'SET_GALLERY'});
            } else {
                dispatch({type: 'SET_LIST'});
            }
        }} defaultValue={listType} buttonStyle="solid">
            <Radio.Button value="gallery"><TableOutlined/> Галерея</Radio.Button>
            <Radio.Button value="list"><UnorderedListOutlined/> Список</Radio.Button>
        </Radio.Group>
    )
}

export default ListType;