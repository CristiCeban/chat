import {RoomType} from "../../models/roomType";
import {ChatActions} from "../actions/chatActions";
import {MessageType} from "../../models/Message";

type chatState = {
    rooms: Array<RoomType>
    inProgressRooms: boolean,
    inProgressLazyRooms: boolean,
    nextPageRooms: number,
    lastPageRooms: number,
    selectedRoom: string | undefined,
    isLoadingRoom: boolean,
    isLoadingRoomLazy: boolean,
    messages: Array<MessageType>
    nextPageMessage: number,
    lastPageMessage: number
}

const initialState = {
    rooms: [],
    inProgressRooms: false,
    inProgressLazyRooms: false,
    nextPageRooms: 1,
    lastPageRooms: 2,
    selectedRoom: undefined,
    isLoadingRoom: false,
    isLoadingRoomLazy: false,
    messages: [],
    nextPageMessage: 1,
    lastPageMessage: 2,
}

const ChatReducer = (state: chatState = initialState, action: ChatActions) => {
    switch (action.type) {

        case "CHAT/SET_LOADING_ROOMS":
            return {
                ...state,
                inProgressRooms: action.payload
            }

        case "CHAT/SET_LOADING_ROOMS_LAZY":
            return {
                ...state,
                inProgressLazyRooms: action.payload,
            }

        case "CHAT/GET_ROOMS":
            if (action.payload.initialLoading) {
                return {
                    ...state,
                    rooms: action.payload.data.rooms,
                    //reset if refresh was called
                    nextPageRooms: 2,
                    lastPageRooms: action.payload.data.totalPages
                }
            } else {
                return {
                    ...state,
                    rooms: [...state.rooms, ...action.payload.data.rooms],
                    nextPageRooms: state.nextPageRooms + 1,
                    lastPageRooms: action.payload.data.totalPages
                }
            }

        case "CHAT/SELECT_ROOM":
            return {
                ...state,
                selectedRoom: action.payload,
                rooms: state.rooms.map(room => {
                    if (room._id === action.payload)
                        return {
                            ...room,
                            nrUnread: 0,
                            isRead: true,
                        }
                    return room
                })
            }

        case "CHAT/SET_LOADING_ROOM":
            return {
                ...state,
                isLoadingRoom: action.payload
            }

        case "CHAT/SET_LOADING_ROOM_LAZY":
            return {
                ...state,
                isLoadingRoomLazy: action.payload
            }

        case "CHAT/GET_ROOM":
            if (action.payload.initialLoading) {
                return {
                    ...state,
                    messages: action.payload.data.messages,
                    nextPageMessage: 2,
                    lastPageMessage: action.payload.data.totalPages,
                }
            } else {
                return {
                    ...state,
                    messages: [...state.messages, ...action.payload.data.messages],
                    nextPageMessage: state.nextPageMessage + 1,
                    lastPageMessage: action.payload.data.totalPages
                }
            }


        default:
            return state
    }
}

export {ChatReducer}
