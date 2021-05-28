import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Login from "../components/Login";
import Main from "../components/Main";
import AdsModerationList from "../components/AdsModerationList";
import AdProfile from "../components/AdProfile";
import UserCreation from "../components/UserCreation";
import UserConfirmation from "../components/UserConfirmation";
import {useDispatch, useSelector} from "react-redux";
import Actions from '../store/actions'

function RouterGuard() {
    const userType = useSelector(((state) => {
        return state.userType !== null ? state.userType : 'unauthorized';
    }));
    const dispatch = useDispatch();
    dispatch(Actions().setSignIn());

    const routesByUserType = new Map([
            ['unauthorized', UnauthorisedUserRoutes()],
            ['administrator', AdministratorRoutes()],
            ['user', UserRoutes()]
        ])

    return (
        routesByUserType.get(userType)
    )
}

function AdministratorRoutes() {
    return (
        <Switch>
            <Route component={Main} path="/main"/>
            <Route exact component={AdsModerationList} path="/ad-moderation"/>
            <Route component={AdProfile} path="/ad/:adId"/>
            <Redirect to='/main'/>
        </Switch>
    )
}

function UserRoutes() {
    return (
        <Switch>
            <Route component={Main} path="/main"/>
            <Route component={AdProfile} path="/ad-profile"/>
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
            <Route component={UserConfirmation} path="/confirmation"/>
            <Redirect to='/main'/>
        </Switch>
    )
}

export default RouterGuard;