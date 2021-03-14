import React, {useEffect, useState} from "react";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootNavigator from "./RootNavigator";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {navigationRef} from "../services/RootNavigation";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthStorage from "../services/auth-storage";
import {getProfile, setTokenAction} from "../store/actions/authActions";

const Navigation = () => {
    const dispatch = useDispatch()
    const {token, user} = useSelector((state: ApplicationState) => state.authReducer)
    const [initLoaded, setInitLoaded] = useState<boolean>(false);

    const loadInitRequest = async () => {
        if (!token)
            return
        dispatch(getProfile())
    }

    useEffect(() => {
        (async () => {
            const token = await AuthStorage.getToken()

            if (token)
                dispatch(setTokenAction(token))
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await loadInitRequest()
        })()
    }, [token])

    useEffect(() => {
        if (!token)
            setInitLoaded(true)
        if (token && user?._id)
            setInitLoaded(true)

    }, [token, user])

    return (
        <>
            {initLoaded ? <NavigationContainer
                ref={navigationRef}
            >
                {token ? <RootNavigator/> : <AuthStackNavigator/>}
            </NavigationContainer> : null}
        </>
    )
}

export default Navigation
