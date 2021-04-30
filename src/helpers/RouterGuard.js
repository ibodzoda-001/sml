import React from 'react'
import {useLocation} from 'react-router-dom'
import Login from "../components/Login";
import Main from "../components/Main";
import ProductsModerationList from "../components/ProductsModerationList";

function RouterGuard() {
    const routerComponents = {
        '/login': (<Login />),
        '/main': (<Main />),
        '/product-moderation': (<ProductsModerationList />),
    }

    return (
        routerComponents[useLocation().pathname]
    )
}

export default RouterGuard;