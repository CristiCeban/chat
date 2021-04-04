import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {MessageType} from "../../../../models/Message";
import {RoomType} from "../../../../models/roomType";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../store";
import {styles} from "./styles";
import Avatar from "../../../general/Avatar/Avatar";
import Utils from "../../../../services/Utils";

type MessageItemParams = {
    item: MessageType & { room: RoomType }
    index: number,
}

const MessageItem = ({item, index}: MessageItemParams) => {
    const [isDisplayingTime, setDisplayingTime] = useState(false)
    const {_id} = useSelector((state: ApplicationState) => state.authReducer.user)
    const {messages} = useSelector((state: ApplicationState) => state.chatReducer)
    const {content, author: {imagePath, last_name, first_name,}, author, date,} = item
    const isUser = item.author._id === _id

    const onPressDisplay = () => setDisplayingTime(prev => !prev)

    return (
        <View style={styles.container}>
            {messages[index + 1]?.author._id !== author._id && !isUser ?
                <Text style={styles.name}>{first_name + ' ' + last_name}</Text>
                :
                null
            }
            {isDisplayingTime ?
                <View style={{alignSelf: 'center'}}>
                    <Text>{Utils.momentParseDateCalendar(date)}</Text>
                </View>
                :
                null
            }
            {isUser ?
                <TouchableOpacity style={styles.containerUser} onPress={onPressDisplay}>
                    <View style={styles.flexRowStart}>
                        <View style={isDisplayingTime ? styles.messageContainerUserTime : styles.messageContainerUser}>
                            <Text style={styles.textUser}>{content}</Text>
                        </View>
                        <View style={{width:10}}/>
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.containerContact} onPress={onPressDisplay}>
                    <View style={styles.flexRowStart}>
                        {messages[index - 1]?.author._id === _id || messages[index - 1]?.author._id !== author._id || index === 0 ?

                            <Avatar width={30} height={30} fontSize={15} profile={{
                                name: first_name + ' ' + last_name, image: imagePath || ''
                            }}/>
                            : <View style={{width: 30}}/>}
                        <View
                            style={isDisplayingTime ? styles.messageContainerContactTime : styles.messageContainerContact}>
                            <Text>{content}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }

        </View>
    )
}

export default MessageItem
