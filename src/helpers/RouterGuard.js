import React from 'react'
import {useLocation} from 'react-router-dom'
import Login from "../components/Login";
import Main from "../components/Main";

function RouterGuard() {
    const routerComponents = {
        '/login': (<Login />),
        '/main': (<Main />)
    }

    return (
        routerComponents[useLocation().pathname]
    )
}

export default RouterGuard;