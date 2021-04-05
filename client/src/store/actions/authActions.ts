import {Dispatch} from "react";
import AuthStorage from "../../services/auth-storage";
import ApiService from "../../services/api"
import {User} from "../../models/user";
import Config from "../../config/Config";
import {ServerErrorType} from "../../models/errors";
import {expoSubscribe} from "../../services/expo";

export interface IAuthSetLoading {
    readonly type: 'AUTH/SET_LOADING',
    payload: boolean,
}

export interface IAuthLoginAction {
    readonly type: 'AUTH/ON_LOGIN',
    payload: {
        token: string,
        user: User
    },
}

export interface IAuthLogout {
    readonly type: 'AUTH/LOGOUT',
    payload: undefined,
}

export interface ISetToken {
    readonly type: 'AUTH/SET_TOKEN',
    payload: string | undefined,
}

export interface IGetProfile {
    readonly type: 'AUTH/GET_PROFILE',
    payload: User
}

export interface ISetRegister {
    readonly type: 'AUTH/SET_REGISTER',
    payload: boolean
}

export interface ISetErrorsRegister {
    readonly type: 'AUTH/SET_ERRORS_REGISTER',
    payload: Array<ServerErrorType>
}

export interface ISetErrorsLogin {
    readonly type: 'AUTH/SET_ERRORS_LOGIN',
    payload: Array<ServerErrorType>
}

export type AuthAction =
    | IAuthLoginAction
    | IAuthSetLoading
    | IAuthLogout
    | ISetToken
    | IGetProfile
    | ISetRegister
    | ISetErrorsRegister
    | ISetErrorsLogin


export const authLoginAction = (body: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/login', body)
            //because of interceptors used in apiServices.
            const {token} = (response as any)
            await expoSubscribe(token)
            await AuthStorage.setToken(token)
            dispatch({type: 'AUTH/ON_LOGIN', payload: (response as any)})
        } catch (e) {
            console.warn(e)
            dispatch({type: 'AUTH/SET_ERRORS_LOGIN', payload: e.response.data.errors})

        } finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})
        }
    }
}

export const onLogoutAction = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            await ApiService.get('auth/logout')
            await AuthStorage.removeToken()
            dispatch({type: 'AUTH/LOGOUT', payload: undefined})
        } catch (e) {
            console.warn(e)
        }
    }
}

export const setTokenAction = (token: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_TOKEN', payload: token})
        } catch (e) {
            console.warn(e)
        }
    }
}

export const onFacebookLogin = (facebook_token: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/facebook', {token: facebook_token})
            const {token} = (response as any)
            await expoSubscribe(token)
            await AuthStorage.setToken(token)
            dispatch({type: 'AUTH/ON_LOGIN', payload: (response as any)})
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})

        }
    }
}

export const onGoogleLogin = (google_token: string, user: Object) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            const response = await ApiService.post('auth/google', {token: google_token, user})
            const {token} = (response as any)
            await expoSubscribe(token)
            await AuthStorage.setToken(token)
            dispatch({type: 'AUTH/ON_LOGIN', payload: (response as any)})
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})
        }
    }
}

export const getProfile = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await ApiService.get('profile/me', {})
            dispatch({type: 'AUTH/GET_PROFILE', payload: ((response as any)?.user as User)})
        } catch (e) {
            console.warn(e)
        }
    }
}

export const onEditProfile = (values: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_LOADING', payload: true})
            let body;
            if (values.thumbnail) {
                const base64Img = `data:image/jpg;base64,${values.thumbnail.base64}`;

                let data = {
                    "file": base64Img,
                    "upload_preset": Config.cloudinaryUploadPreset,
                }

                const response = await fetch(Config.cloudinaryApi, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST'
                })

                const jsonResponse = await response.json()
                body = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    imagePath: jsonResponse.url
                }
            } else {
                body = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                }
            }
            const serverResponse = await ApiService.post('profile/edit', body)
            dispatch({type: 'AUTH/GET_PROFILE', payload: ((serverResponse as any)?.user as User)})
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch({type: 'AUTH/SET_LOADING', payload: false})
        }
    }
}

export const onRegisterAction = (body: any, navigation: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: 'AUTH/SET_REGISTER', payload: true})
            await ApiService.post('auth/register', body)
            navigation.goBack()
        } catch (e) {
            console.warn(e)
            dispatch({type: 'AUTH/SET_ERRORS_REGISTER', payload: e.response.data.errors})
        } finally {
            dispatch({type: 'AUTH/SET_REGISTER', payload: false})
        }
    }
}
