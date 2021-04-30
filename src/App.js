import React from 'react'
import { BackTop } from 'antd';
import {useLocation} from "react-router-dom";
import './App.less';
import Header from "./components/Header";
import RouterGuard from "./helpers/RouterGuard";

function App() {
    return (
        <div>
            <BackTop />
            {useLocation().pathname !== '/login' ? <Header/> : null}
            <div className="container" style={{paddingTop: '15px', paddingBottom: '100px'}}>
                <RouterGuard/>
            </div>
        </div>
    );
}

export default App;
