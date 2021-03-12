import React,{useEffect} from "react";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import RootNavigator from "./RootNavigator";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../store";
import {navigationRef} from "../services/RootNavigation";
import AuthStackNavigator from "./AuthStackNavigator";
import AuthStorage from "../services/auth-storage";
import {setTokenAction} from "../store/actions/authActions";

const Navigation = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((state: ApplicationState) => state.authReducer)

    useEffect(()=>{
        (async ()=>{
            const token = await AuthStorage.getToken()

            if(token)
                dispatch(setTokenAction(token))
        })()
    },[])

    return (
        <>
            <NavigationContainer
                ref={navigationRef}
            >
                {token ? <RootNavigator/> : <AuthStackNavigator/>}
            </NavigationContainer>
        </>
    )
}

export default Navigation
