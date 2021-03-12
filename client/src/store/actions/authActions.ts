import {Dispatch} from "react";
import AuthStorage from "../../services/auth-storage";
import ApiService from "../../services/api"

export interface IAuthSetLoading {
    readonly type: 'AUTH/SET_LOADING',
    payload: boolean,
}

export interface IAuthLoginAction {
    readonly type: 'AUTH/ON_LOGIN',
    payload: any,
}

export interface IAuthLogout {
    readonly type: 'AUTH/LOGOUT',
    payload: undefined,
}

export interface ISetToken {
    readonly type : 'AUTH/SET_TOKEN',
    payload : string | undefined,
}

export type AuthAction =
    | IAuthLoginAction
    | IAuthSetLoading
    | IAuthLogout
    | ISetToken


export const authLoginAction = (body: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/login', body)
            //because of interceptors used in apiServices.
            const {token} = (response as any)
            await AuthStorage.setToken(token)
            dispatch({type:'AUTH/ON_LOGIN',payload:response})
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
