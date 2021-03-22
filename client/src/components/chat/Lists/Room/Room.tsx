import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {RoomType} from "../../../../models/roomType";
import {styles} from "./styles";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../store";
import GroupImage from "../../../general/GroupImage/GroupImage";

type RoomParams = {
    room: RoomType
}

const Room = ({room}: RoomParams) => {
    const {user: {_id}} = useSelector((state: ApplicationState) => state.authReducer)
    const users = room.users.filter(user => user._id !== _id)
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <GroupImage users={users} style={{}} width={60}/>
            </TouchableOpacity>
        </View>
    )
}

export default Room
