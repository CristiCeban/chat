import {Dispatch} from "react";
import {User} from "../../models/user";
import ApiService from '../../services/api'

type contactsData = {
    currentPage:number,
    totalPages:number,
    users:Array<User>,
}

export interface IGetContacts {
    readonly type: 'NEW_CONVERSATION/GET_CONTACTS',
    payload: {
        data:contactsData,
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

export type NewConversationActions =
    | IGetContacts
    | ISetInProgress
    | ISetInProgressLazy


export const onGetContacts = (params: any = {}, initialLoading = true) => {
    const param = {page: 1, limit: 10};
    params = Object.assign(param, params);
    return async (dispatch: Dispatch<NewConversationActions>) => {
        const loadingType = initialLoading ? 'NEW_CONVERSATION/SET_IN_PROGRESS' : 'NEW_CONVERSATION/SET_IN_PROGRESS_LAZY'
        try {
            dispatch({type: loadingType, payload: true})
            const response = await ApiService.get('profile/users', params)
            console.log(response)
            dispatch({
                type: 'NEW_CONVERSATION/GET_CONTACTS',
                payload: {initialLoading, data: (response as any as contactsData)}
            })
        } catch (e) {

        } finally {
            dispatch({type: loadingType, payload: false})
        }
    }
}

