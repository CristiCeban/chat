import {combineReducers} from 'redux';
import {AuthReducer} from "./authReducers";
import {NewConversationReducer} from "./newConversationReducers";
import {ChatReducer} from "./chatReducers";

const rootReducer = combineReducers({
    authReducer: AuthReducer,
    newConversationReducer: NewConversationReducer,
    chatReducer: ChatReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>
export {rootReducer}
