import {Spin} from "antd";
import React from "react";

function ListLoading() {
    return (
        <div style={{textAlign: 'center', paddingTop: '30vh'}}>
            <Spin size="large"/>
        </div>
    )
}

export default ListLoading;