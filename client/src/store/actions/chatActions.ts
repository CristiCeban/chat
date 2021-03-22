import {Dispatch} from "react";
import ApiService from '../../services/api'
import {RoomType} from "../../models/roomType";


type RoomData = {
    rooms: Array<RoomType>,
    totalPages: number,
    currentPage: number,
}

export interface IChatGetRooms {
    readonly type: 'CHAT/GET_ROOMS',
    payload: {
        data: RoomData,
        initialLoading: boolean
    }
}

export interface ISetLoadingRooms {
    readonly type: 'CHAT/SET_LOADING_ROOMS'
    payload: boolean,
}

export interface ISetLoadingRoomsLazy {
    readonly type: 'CHAT/SET_LOADING_ROOMS_LAZY',
    payload: boolean

}

export type ChatActions =
    | IChatGetRooms
    | ISetLoadingRooms
    | ISetLoadingRoomsLazy

export const onGetRooms = (params: any = {}, initialLoading = true) => {
    const param = {page: 1, limit: 10}
    params = Object.assign(param, params)
    return async (dispatch: Dispatch<ChatActions>) => {
        const loadingType = initialLoading ? 'CHAT/SET_LOADING_ROOMS' : 'CHAT/SET_LOADING_ROOMS_LAZY'
        try {
            dispatch({type: loadingType, payload: true})
            const response = await ApiService.get('chat/room/rooms', params)
            dispatch({
                type: 'CHAT/GET_ROOMS',
                payload: {data: (response as any as RoomData), initialLoading}
            })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch({type: loadingType, payload: false})
        }
    }
}
