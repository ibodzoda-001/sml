import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Login from "../components/Login";
import Main from "../components/Main";
import AdsModeration from "../components/AdsModeration";
import AdProfile from "../components/AdProfile";
import UserCreation from "../components/UserCreation";
import AdCreation from "../components/AdCreation";
import UserConfirmation from "../components/UserConfirmation";
import {useSelector} from "react-redux";

function RouterGuard() {
    const userCredentials = useSelector(((state) => {
        return state.userCredentials;
    }));

    const routesByUserType = new Map([
            ['unauthorized', UnauthorisedUserRoutes()],
            ['admin', AdministratorRoutes()],
            ['user', UserRoutes()]
        ])

    return (
        routesByUserType.get(userCredentials === null ? 'unauthorized' : userCredentials.userType)
    )
}

function AdministratorRoutes() {
    return (
        <Switch>
            <Route component={Main} path="/main"/>
            <Route exact component={AdsModeration} path="/ad-moderation"/>
            <Route component={AdCreation} path="/new-ad"/>
            <Route component={AdProfile} path="/ad/:adId"/>
            <Redirect to='/main'/>
        </Switch>
    )
}

function UserRoutes() {
    return (
        <Switch>
            <Route component={Main} path="/main"/>
            <Route component={AdCreation} path="/new-ad"/>
            <Route component={AdProfile} path="/ad/:adId"/>
            <Redirect to='/main'/>
        </Switch>
    )
}

function UnauthorisedUserRoutes() {
    return (
        <Switch>
            <Route component={Login} path="/login"/>
            <Route component={Main} path="/main"/>
            <Route component={UserCreation} path="/user-creation"/>
            <Route component={UserConfirmation} path="/confirmation/:email/:code"/>
            <Redirect to='/main'/>
        </Switch>
    )
}

export default RouterGuard;