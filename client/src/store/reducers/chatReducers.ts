import {RoomType} from "../../models/roomType";
import {ChatActions} from "../actions/chatActions";

type chatState = {
    rooms: Array<RoomType>
    inProgressRooms: boolean,
    inProgressLazyRooms: boolean,
    nextPageRooms: number,
    lastPageRooms: number,
    selectedRoom: string | undefined,
}

const initialState = {
    rooms: [],
    inProgressRooms: false,
    inProgressLazyRooms: false,
    nextPageRooms: 1,
    lastPageRooms: 2,
    selectedRoom: undefined
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
                selectedRoom: action.payload
            }
        default:
            return state
    }
}

export {ChatReducer}
