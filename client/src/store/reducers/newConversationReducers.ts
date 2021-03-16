import {NewConversationActions} from "../actions/newConversationActions";
import {User} from "../../models/user";

type newConversationState = {
    newContactsList: Array<User>;
    newUsersToCreateConversation: Array<User>
    inProgressAllContacts: boolean;
    inProgressLazyAllContacts: boolean,
    nextPageContacts: number,
    lastPageContacts: number,
}

const initialState = {
    newContactsList: [],
    newUsersToCreateConversation: [],
    inProgressAllContacts: true,
    inProgressLazyAllContacts: false,
    nextPageContacts: 1,
    lastPageContacts: 2,
}

const NewConversationReducer = (state: newConversationState = initialState, action: NewConversationActions) => {
    switch (action.type) {
        case "NEW_CONVERSATION/SET_IN_PROGRESS":
            return {
                ...state,
                inProgressAllContacts: action.payload,
            }
        case "NEW_CONVERSATION/SET_IN_PROGRESS_LAZY":
            return {
                ...state,
                inProgressLazyAllContacts: action.payload
            }
        case "NEW_CONVERSATION/GET_CONTACTS":
            if (action.payload.initialLoading) {
                return {
                    ...state,
                    newContactsList: action.payload.data.users,
                    //reset if refresh was called
                    nextPageContacts: 2,
                    lastPageContacts: action.payload.data.totalPages,
                }
            } else {
                return {
                    ...state,
                    newContactsList: state.newContactsList.concat(action.payload.data.users),
                    nextPageContacts: state.nextPageContacts + 1,
                    lastPageContacts: action.payload.data.totalPages,
                }
            }
        case "NEW_CONVERSATION/ADD_USER_TO_NEW_CONVERSATION":
            return {
                ...state,
                newUsersToCreateConversation: state.newUsersToCreateConversation.find(user => user._id === action.payload._id) ?
                    [...state.newUsersToCreateConversation.filter(user => user._id !== action.payload._id)]
                    :
                    [...state.newUsersToCreateConversation, action.payload]
            }
        default:
            return state
    }

}

export {NewConversationReducer}
