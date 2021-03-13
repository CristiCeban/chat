import {AuthAction} from "../actions/authActions";
import {User} from "../../models/user";

type AuthState = {
    isLoading: boolean,
    token: string | undefined,
    user : User
}

const defaultUser : User = {
    _id : '',
    email : '',
    first_name : '',
    last_name : '',
}

const initialState = {
    isLoading: false,
    token: undefined,
    user : defaultUser,
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
                user : action.payload.user,
            }
        case "AUTH/LOGOUT":
            return {
                ...state,
                token: undefined,
                user: undefined,
            }
        case "AUTH/SET_TOKEN":
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}

export {AuthReducer}
