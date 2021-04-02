import React, {useEffect, useState} from "react";
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from "./RootNavigator";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {navigationRef} from "../services/RootNavigation";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthStorage from "../services/auth-storage";
import {getProfile, setTokenAction} from "../store/actions/authActions";
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;

const Navigation = () => {
    const dispatch = useDispatch()
    const {token, user} = useSelector((state: ApplicationState) => state.authReducer)
    const [initLoaded, setInitLoaded] = useState<boolean>(false);

    const loadInitRequest = async () => {
        if (!token)
            return
        dispatch(getProfile())
    }

    useEffect(()=>{
        if(token&&user._id){
            const pusher = new Pusher('e7b49de1db93e5713dc5', {
                cluster: 'eu'
            });
            const channel = pusher.subscribe(`user.${user._id}`)
            console.log(user._id)
            channel.bind('message',(data:any) => {
                Alert.alert('New Message',JSON.stringify(data))
                console.log('data received')
                console.log(data)
            })
            return () => channel.unsubscribe()
        }
    },[token,user._id])

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
