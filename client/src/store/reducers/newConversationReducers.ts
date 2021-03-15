import {NewConversationActions} from "../actions/newConversationActions";
import {User} from "../../models/user";

type newConversationState = {
    newContactsList: Array<User>;
    inProgressAllContacts: boolean;
    inProgressLazyAllContacts: boolean,
    nextPageContacts: number,
    lastPageContacts: number,
}

const initialState = {
    newContactsList: [],
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
            if(action.payload.initialLoading) {
                return {
                    ...state,
                    newContactsList : action.payload.data.users,
                    //reset if refresh was called
                    nextPageContacts:2,
                    lastPageContacts:action.payload.data.totalPages,
                }
            } else {
                return{
                    ...state,
                    newContactsList:state.newContactsList.concat(action.payload.data.users),
                    nextPageContacts:state.nextPageContacts+1,
                    lastPageContacts : action.payload.data.totalPages,
                }
            }
        default:
            return state
    }

}

export {NewConversationReducer}
