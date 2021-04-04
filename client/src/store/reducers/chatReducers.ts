import {RoomType} from "../../models/roomType";
import {ChatActions} from "../actions/chatActions";
import {MessageType} from "../../models/Message";
import Utils from "../../services/Utils";

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
                    messages: (Utils.unique([...state.messages, ...action.payload.data.messages], '_id') as Array<MessageType>),
                    nextPageMessage: state.nextPageMessage + 1,
                    lastPageMessage: action.payload.data.totalPages
                }
            }

        case "CHAT/PUSH_MESSAGE":
            const foundRoom = state.rooms.find(room => room._id === action.payload.room?._id)
            return {
                ...state,
                messages: [action.payload, ...state.messages],
                rooms: foundRoom ? [({
                        ...foundRoom,
                        lastMessage: action.payload,
                    }), ...state.rooms.filter(room => room._id !== action.payload.room?._id)]
                    :
                    state.rooms
            }


        case "CHAT/ON_PUSHER_MESSAGE":
            const foundRoomPusher = state.rooms.find(room => room._id === action.payload?.room?._id)
            console.log(foundRoomPusher?.nrUnread)
            if (action.payload.room?._id === state.selectedRoom)
                return {
                    ...state,
                    messages: [action.payload, ...state.messages],
                    rooms: [{
                        ...(action.payload as MessageType & { room: RoomType }).room,
                        lastMessage: {
                            content: action.payload.content,
                            room: action.payload.room,
                            date: action.payload.date,
                            _id: action.payload.date,
                            author: action.payload.author
                        }
                    }, ...state.rooms.filter(room => room._id !== action.payload.room?._id)]
                }
            else
                return {
                    ...state,
                    rooms: [{
                        ...(action.payload as MessageType & { room: RoomType }).room,
                        lastMessage: {
                            content: action.payload.content,
                            room: action.payload.room,
                            date: action.payload.date,
                            _id: action.payload.date,
                            author: action.payload.author
                        },
                        nrUnread: foundRoomPusher?.nrUnread ? foundRoomPusher.nrUnread + 1 : 1,
                        // nrUnread:1,
                        isRead: false,
                    }, ...state.rooms.filter(room => room._id !== action.payload.room?._id)]
                }

        case "CHAT/RESET_SELECTED_ROOM":
            return {
                ...state,
                selectedRoom: undefined
            }


        default:
            return state
    }
}

export {ChatReducer}
