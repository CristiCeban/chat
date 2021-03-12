import {AuthAction} from "../actions/authActions";

type AuthState = {
    isLoading: boolean,
    token: string | undefined,
}

const initialState = {
    isLoading: false,
    token: undefined,
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
            }
        case "AUTH/LOGOUT":
            return {
                ...state,
                token: undefined,
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
