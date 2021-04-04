import {Dispatch} from "react";
import ApiService from '../../services/api'
import {RoomType} from "../../models/roomType";
import {MessageType} from "../../models/Message";


type RoomData = {
    rooms: Array<RoomType>,
    totalPages: number,
    currentPage: number,
}

type MessageData = {
    messages: Array<MessageType>,
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

export interface ISetLoadingRoom {
    readonly type: 'CHAT/SET_LOADING_ROOM',
    payload: boolean,
}

export interface ISetLoadingRoomLazy {
    readonly type: 'CHAT/SET_LOADING_ROOM_LAZY',
    payload: boolean,
}

export interface IGetRoom {
    readonly type: 'CHAT/GET_ROOM'
    payload: {
        data: MessageData,
        initialLoading: boolean
    }
}

export interface ISelectRoom {
    readonly type: 'CHAT/SELECT_ROOM',
    payload: string | undefined,
}

export interface IUpdateLastMessage {
    readonly type: 'CHAT/UPDATE_LAST_MESSAGE',
    payload: string | undefined
}

export interface IPushMessage {
    readonly type: 'CHAT/PUSH_MESSAGE',
    payload: MessageType,
}

export interface IOnPusherMessage {
    readonly type: 'CHAT/ON_PUSHER_MESSAGE',
    payload: MessageType,
}

export type ChatActions =
    | IChatGetRooms
    | ISetLoadingRooms
    | ISetLoadingRoomsLazy
    | IGetRoom
    | ISetLoadingRoom
    | ISetLoadingRoomLazy
    | ISelectRoom
    | IPushMessage
    | IUpdateLastMessage
    | IOnPusherMessage

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
                payload: {
                    data: (response as any as RoomData),
                    initialLoading
                }
            })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch({type: loadingType, payload: false})
        }
    }
}

export const selectRoom = (room: RoomType) => {
    return async (dispatch: Dispatch<ChatActions>) => {
        dispatch({type: 'CHAT/SELECT_ROOM', payload: room._id})
    }
}

export const getRoomMessages = (roomId: string, params: any = {}, initialLoading: boolean = true) => {
    const param = {page: 1, limit: 10}
    params = Object.assign(param, params)
    return async (dispatch: Dispatch<ChatActions>) => {
        const loadingType = initialLoading ? 'CHAT/SET_LOADING_ROOM' : 'CHAT/SET_LOADING_ROOM_LAZY'
        try {
            dispatch({type: loadingType, payload: true})
            const response = await ApiService.get(`chat/message/room/${roomId}`, params)
            dispatch({
                type: 'CHAT/GET_ROOM',
                payload: {
                    data: (response as any as MessageData),
                    initialLoading
                }
            })
        } catch (e) {
            console.log(e)
        } finally {
            dispatch({type: loadingType, payload: false})
        }
    }
}

export const pushMessage = (message: MessageType) => {
    return async (dispatch: Dispatch<ChatActions>) => {
        dispatch({type: 'CHAT/PUSH_MESSAGE', payload: message})
    }
}

export const onPusherMessage = (message: MessageType) => {
    return async (dispatch: Dispatch<ChatActions>) => {
        dispatch({type:'CHAT/ON_PUSHER_MESSAGE',payload:message})
    }
}
