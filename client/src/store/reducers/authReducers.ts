import {AuthAction} from "../actions/authActions";
import {User} from "../../models/user";
import {ServerErrorType} from "../../models/errors";

type AuthState = {
    isLoading: boolean,
    token: string | undefined,
    user: User,
    isRegistering: boolean,
    registerErrors: Array<ServerErrorType>,
    loginErrors: Array<ServerErrorType>,
}

const defaultUser: User = {
    _id: '',
    email: '',
    first_name: '',
    last_name: '',
}

const initialState = {
    isLoading: false,
    token: undefined,
    user: defaultUser,
    isRegistering: false,
    registerErrors: [],
    loginErrors: []
}

const AuthReducer = (state: AuthState = initialState, action: AuthAction) => {
    switch (action.type) {
        case "AUTH/SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        case "AUTH/ON_LOGIN":
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            }
        case "AUTH/LOGOUT":
            return {
                ...state,
                token: undefined,
                user: defaultUser,
            }
        case "AUTH/SET_TOKEN":
            return {
                ...state,
                token: action.payload
            }
        case "AUTH/GET_PROFILE":
            return {
                ...state,
                user: action.payload
            }
        case "AUTH/SET_REGISTER":
            return {
                ...state,
                isRegistering: action.payload
            }
        case "AUTH/SET_ERRORS_LOGIN":
            return {
                ...state,
                loginErrors: action.payload,
            }
        case "AUTH/SET_ERRORS_REGISTER":
            return {
                ...state,
                registerErrors: action.payload
            }
        default:
            return state
    }
}

export {AuthReducer}
