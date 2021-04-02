import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {MessageType} from "../../../../models/Message";
import {RoomType} from "../../../../models/roomType";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../store";
import {styles} from "./styles";

type MessageItemParams = {
    item: MessageType & { room: RoomType }
}

const MessageItem = ({item}: MessageItemParams) => {
    const [isDisplayingTime, setDisplayingTime] = useState(false)
    const {_id} = useSelector((state: ApplicationState) => state.authReducer.user)
    const isUser = item.author._id === _id

    return (
        <View style={styles.container}>
            {isUser ?
                <TouchableOpacity style={styles.containerUser}>
                    <Text>{item.content}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.containerContact}>
                    <Text>{item.content}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default MessageItem
