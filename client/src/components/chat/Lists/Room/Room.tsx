import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {RoomType} from "../../../../models/roomType";
import {styles} from "./styles";
import {ApplicationState} from "../../../../store";
import GroupImage from "../../../general/GroupImage/GroupImage";
import {selectRoom} from "../../../../store/actions/chatActions";
import {Badge} from "native-base";
import Utils from "../../../../services/Utils";

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
        navigation.navigate('ChatRoom', {room})
    }
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.image}>
                <GroupImage users={users} style={{}} width={60}/>
            </View>
            <View style={styles.details}>
                <View style={styles.flexBetween}>
                    <Text style={styles.roomName}>{roomName}</Text>
                    {room?.lastMessage ?
                        <Text style={styles.messageDate}>{Utils.momentParseDateCalendar(room?.lastMessage.date)}</Text>
                        : null
                    }
                </View>
                {room?.lastMessage ?
                    <View>

                        <View style={styles.flexBetween}>
                            <View style={styles.flexRowStart}>
                                <Text
                                    style={styles.textMsgName}>{`${room.lastMessage.author.first_name} ${room.lastMessage.author.last_name} : `}</Text>
                                <Text style={room.isRead ? styles.messageDetails : styles.messageDetailsUnread}>
                                    {room.lastMessage.content.length < 20 ?
                                        room.lastMessage.content
                                        :
                                        room.lastMessage.content.substring(0, 20) + '...'}</Text>
                            </View>
                            {room.nrUnread ?
                                <Badge style={styles.containerNrUnread}>
                                    <Text style={styles.textNrUnread}>{room.nrUnread}</Text>
                                </Badge>
                                :
                                null
                            }
                        </View>
                    </View>
                    : null
                }
            </View>
        </TouchableOpacity>
    )
}

export default Room
