import React, {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import * as Notifications from 'expo-notifications';
import Pusher from 'pusher-js/react-native';
import {ApplicationState} from "../store";
import {navigationRef} from "../services/RootNavigation";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthStorage from "../services/auth-storage";
import RootNavigator from "./RootNavigator";
import {getProfile, setTokenAction} from "../store/actions/authActions";
import {MessageType} from "../models/Message";
import {onPusherMessage} from "../store/actions/chatActions";

Pusher.logToConsole = true;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

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
        if (token && user?._id) {
            const pusher = new Pusher('e7b49de1db93e5713dc5', {
                cluster: 'eu'
            });
            const channel = pusher.subscribe(`user.${user._id}`)
            channel.bind('message', (message: MessageType) => {
                console.log('data received')
                dispatch(onPusherMessage(message))
            })
            return () => channel.unsubscribe()
        }
    }, [token, user?._id])

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
        if (!token && !user?._id)
            setInitLoaded(true)
        if (token && user?._id)
            setInitLoaded(true)

    }, [token, user])

    return (
        <>
            {initLoaded ? <NavigationContainer
                ref={navigationRef}
            >
                {token && user?._id ? <RootNavigator/> : <AuthStackNavigator/>}
            </NavigationContainer> : null}
        </>
    )
}

export default Navigation
