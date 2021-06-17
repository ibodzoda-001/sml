import React from 'react'
import { BackTop } from 'antd';
import './App.less';
import Header from "./components/Header";
import RouterGuard from "./helpers/RouterGuard";

function App() {
    return (
        <div>
            <BackTop />
            <Header/>
            <div className="container" style={{paddingTop: '15px', paddingBottom: '100px'}}>
                <RouterGuard/>
            </div>
        </div>
    );
}

export default App;
