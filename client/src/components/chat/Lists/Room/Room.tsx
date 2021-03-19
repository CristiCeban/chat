import React from "react";
import {Text, View} from "react-native";
import {RoomType} from "../../../../models/roomType";

type RoomParams = {
    room : RoomType
}

const Room = ({room}:RoomParams) => {
    return(
        <View>
            <Text>{room._id}</Text>
        </View>
    )
}

export default Room
