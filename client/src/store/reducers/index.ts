import {combineReducers} from 'redux';
import {AuthReducer} from "./authReducers";
import {NewConversationReducer} from "./newConversationReducers";

const rootReducer = combineReducers({
    authReducer: AuthReducer,
    newConversationReducer: NewConversationReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>
export {rootReducer}
