import {Dispatch} from "react";
import AuthStorage from "../../services/auth-storage";
import ApiService from "../../services/api"
import {User} from "../../models/user";
import Utils from "../../services/Utils";

export interface IAuthSetLoading {
    readonly type: 'AUTH/SET_LOADING',
    payload: boolean,
}

export interface IAuthLoginAction {
    readonly type: 'AUTH/ON_LOGIN',
    payload: {
        token : string,
        user : User
    },
}

export interface IAuthLogout {
    readonly type: 'AUTH/LOGOUT',
    payload: undefined,
}

export interface ISetToken {
    readonly type : 'AUTH/SET_TOKEN',
    payload : string | undefined,
}

export interface IGetProfile {
    readonly type: 'AUTH/GET_PROFILE',
    payload : User
}

export type AuthAction =
    | IAuthLoginAction
    | IAuthSetLoading
    | IAuthLogout
    | ISetToken
    | IGetProfile


export const authLoginAction = (body: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/login', body)
            //because of interceptors used in apiServices.
            const {token} = (response as any)
            await AuthStorage.setToken(token)
            dispatch({type:'AUTH/ON_LOGIN',payload:(response as any)})
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})
        }
    }
}

export const onLogoutAction = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try{
            await AuthStorage.removeToken()
            dispatch({type:'AUTH/LOGOUT',payload:undefined})
        }
        catch (e) {
            console.warn(e)
        }
    }
}

export const setTokenAction = (token : string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try{
            dispatch({type:'AUTH/SET_TOKEN',payload:token})
        }
        catch (e) {
            console.warn(e)
        }
    }
}

export const onFacebookLogin = (facebook_token : string) => {
    return async (dispatch : Dispatch<AuthAction>) =>{
        try{
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/facebook',{token:facebook_token})
            const {token} = (response as any)
            await AuthStorage.setToken(token)
            dispatch({type:'AUTH/ON_LOGIN',payload:(response as any)})
        }
        catch (e) {
            console.warn(e)
        }
        finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})

        }
    }
}

export const onGoogleLogin = (google_token:string,user:Object) => {
    return async (dispatch:Dispatch<AuthAction>) =>{
        try{
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/google',{token:google_token,user})
            const {token} = (response as any)
            await AuthStorage.setToken(token)
            dispatch({type:'AUTH/ON_LOGIN',payload:(response as any)})
        }
        catch (e) {
            console.warn(e)
        }
        finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})
        }
    }
}

export const getProfile = () => {
    return async (dispatch:Dispatch<AuthAction>) => {
        try{
            const response = await ApiService.get('profile/me',{})
            dispatch({type:'AUTH/GET_PROFILE',payload:(response?.user as User)})
        }
        catch (e) {
            console.warn(e)
        }
    }
}

export const onEditProfile = (values : any) => {
    return async (dispatch:Dispatch<AuthAction>) => {
        try{
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const body = Utils.createFormDataChangeProfile(values)
            console.log(body)
            const response = await ApiService.postFormData('profile/edit',body)
            console.log(response)
        }
        catch (e) {
            console.warn(e)
        }
        finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})
        }
    }
}
