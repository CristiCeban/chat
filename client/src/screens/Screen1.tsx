import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {onLogoutAction} from "../store/actions/authActions";

const Screen1 = () => {

    const dispatch = useDispatch()

    const onLogout = () => dispatch(onLogoutAction())
    return(
        <View>
            <Text>
                Screen1
            </Text>
            <TouchableOpacity onPress={onLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Screen1
