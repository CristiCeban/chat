import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {getProfile, onLogoutAction} from "../../../store/actions/authActions";
import {styles} from "./styles";

const ChatListScreen = () => {
    const dispatch = useDispatch()

    const onLogout = () => dispatch(onLogoutAction())
    const onGetProfile = () => dispatch(getProfile())
    return(
        <View style={styles.container}>
            <Text>Chat List Screen</Text>
            <TouchableOpacity onPress={onLogout}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatListScreen
