import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {onLogoutAction} from "../../../store/actions/authActions";
import {styles} from "./styles";
import {ApplicationState} from "../../../store";

const ChatListScreen = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((state:ApplicationState)=>state.authReducer)
    // console.log(token)

    const onLogout = () => dispatch(onLogoutAction())
    return (
        <View style={styles.container}>
            <Text>Chat List Screen</Text>
            <TouchableOpacity onPress={onLogout}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatListScreen
