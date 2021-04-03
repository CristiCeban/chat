import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {MessageType} from "../../../../models/Message";
import {RoomType} from "../../../../models/roomType";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../store";
import {styles} from "./styles";
import Avatar from "../../../general/Avatar/Avatar";

type MessageItemParams = {
    item: MessageType & { room: RoomType }
}

const MessageItem = ({item}: MessageItemParams) => {
    const [isDisplayingTime, setDisplayingTime] = useState(false)
    const {_id} = useSelector((state: ApplicationState) => state.authReducer.user)
    const {content,author:{imagePath,last_name,first_name}} = item
    const isUser = item.author._id === _id

    return (
        <View style={styles.container}>
            {isUser ?
                <TouchableOpacity style={styles.containerUser}>
                    <View style={styles.flexRowStart}>
                        <View style={styles.messageContainerUser}>
                            <Text style={styles.textUser}>{content}</Text>
                        </View>
                        <Avatar width={30} height={30} fontSize={15} profile={{
                            name: first_name + ' ' + last_name, image: imagePath || ''
                        }}/>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.containerContact}>
                    <View style={styles.flexRowStart}>
                        <Avatar width={30} height={30} fontSize={15} profile={{
                            name: first_name + ' ' + last_name, image: imagePath || ''
                        }}/>
                        <View style={styles.messageContainerContact}>
                            <Text>{content}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

export default MessageItem
