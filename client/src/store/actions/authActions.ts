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

export type AuthAction =
    | IAuthLoginAction
    | IAuthSetLoading
    | IAuthLogout


export const authLoginAction = (body: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth', body)
            const {token} = response.data
            await AuthStorage.setToken(token)
            console.log(response)
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
        }
        catch (e) {
            console.warn(e)
        }
        finally {
            dispatch({type:'AUTH/LOGOUT',payload:undefined})
        }
    }
}
