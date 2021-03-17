import {Dispatch} from "react";
import {User} from "../../models/user";
import ApiService from '../../services/api'
import Utils from "../../services/Utils";
import {ApplicationState} from "../reducers";

type contactsData = {
    currentPage: number,
    totalPages: number,
    users: Array<User>,
}

export interface IGetContacts {
    readonly type: 'NEW_CONVERSATION/GET_CONTACTS',
    payload: {
        data: contactsData,
        initialLoading: boolean,
    }
}

export interface ISetInProgress {
    readonly type: 'NEW_CONVERSATION/SET_IN_PROGRESS',
    payload: boolean,
}

export interface ISetInProgressLazy {
    readonly type: 'NEW_CONVERSATION/SET_IN_PROGRESS_LAZY',
    payload: boolean,
}

export interface IAddUserToNewConversation {
    readonly type: 'NEW_CONVERSATION/ADD_USER_TO_NEW_CONVERSATION',
    payload: User
}

export interface ICreateConversation {
    readonly type: 'NEW_CONVERSATION/CREATE_CONVERSATION',
    payload: undefined
}

export interface ISetCreatingConversation {
    readonly type: 'NEW_CONVERSATION/SET_CREATING_CONVERSATION',
    payload: boolean
}

export interface IResetNewConversationUsers {
    readonly type: 'NEW_CONVERSATION/RESET_NEW_CONVERSATION_USERS',
    payload: undefined
}

export type NewConversationActions =
    | IGetContacts
    | ISetInProgress
    | ISetInProgressLazy
    | IAddUserToNewConversation
    | ICreateConversation
    | ISetCreatingConversation
    | IResetNewConversationUsers


export const onGetContacts = (params: any = {}, initialLoading = true) => {
    const param = {page: 1, limit: 10};
    params = Object.assign(param, params);
    return async (dispatch: Dispatch<NewConversationActions>) => {
        const loadingType = initialLoading ? 'NEW_CONVERSATION/SET_IN_PROGRESS' : 'NEW_CONVERSATION/SET_IN_PROGRESS_LAZY'
        try {
            dispatch({type: loadingType, payload: true})
            const response = await ApiService.get('profile/users', params)
            dispatch({
                type: 'NEW_CONVERSATION/GET_CONTACTS',
                payload: {initialLoading, data: (response as any as contactsData)}
            })
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch({type: loadingType, payload: false})
        }
    }
}

export const onAddUserToNewConversation = (user: User) => {
    return async (dispatch: Dispatch<NewConversationActions>) => {
        dispatch({type: 'NEW_CONVERSATION/ADD_USER_TO_NEW_CONVERSATION', payload: user})
    }
}

export const createConversationAction = (name?: string) => {
    return async (dispatch: Dispatch<NewConversationActions>, getState: () => ApplicationState) => {
        try {
            dispatch({type: 'NEW_CONVERSATION/SET_CREATING_CONVERSATION', payload: true})
            if (!name)
                name = Utils.randomString()
            const {newUsersToCreateConversation} = getState().newConversationReducer
            const users = newUsersToCreateConversation.map(user => user._id)
            const payload = {name, users}
            await ApiService.post('chat/room/create', payload)
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch({type: 'NEW_CONVERSATION/SET_CREATING_CONVERSATION', payload: false})
        }
    }
}

export const resetNewConversationUsers = () => {
    return async (dispatch: Dispatch<NewConversationActions>) => {
        dispatch({type:'NEW_CONVERSATION/RESET_NEW_CONVERSATION_USERS',payload:undefined})
    }
}

