import React from "react";
import {RoomType} from "../../../../models/roomType";
import {Text, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../store";
import {styles} from "./styles";
import GroupImage from "../../../general/GroupImage/GroupImage";

type RoomHeaderParams = {
    room: RoomType,
}

const RoomHeader = ({room}: RoomHeaderParams) => {
    const {user: {_id}} = useSelector((state: ApplicationState) => state.authReducer)
    const users = room.users.filter(user => user._id !== _id)
    const roomName = users.length === 1 ? users[0].first_name + ' ' + users[0].last_name : room.name
    return (
        <TouchableOpacity style={styles.container}>
            <GroupImage users={users} style={{}} width={30}/>
            <Text style={styles.text}>{roomName}</Text>
        </TouchableOpacity>
    )
}

export default RoomHeader
