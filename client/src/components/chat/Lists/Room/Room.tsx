import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {RoomType} from "../../../../models/roomType";
import {styles} from "./styles";
import {ApplicationState} from "../../../../store";
import GroupImage from "../../../general/GroupImage/GroupImage";
import {selectRoom} from "../../../../store/actions/chatActions";

type RoomParams = {
    room: RoomType
}

const Room = ({room}: RoomParams) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {user: {_id}} = useSelector((state: ApplicationState) => state.authReducer)

    const users = room.users.filter(user => user._id !== _id)
    const roomName = users.length === 1 ? users[0].first_name + ' ' + users[0].last_name : room.name

    const onPress = () => {
        dispatch(selectRoom(room))
        navigation.navigate('ChatRoom',{room})
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.image}>
                <GroupImage users={users} style={{}} width={60}/>
            </View>
            <Text>{roomName}</Text>
        </TouchableOpacity>
    )
}

export default Room
