import React from "react";
import {User} from "../../../../models/user";
import {Text, View} from "react-native";
import Avatar from "../../../general/Avatar/Avatar";
import {styles} from "./styles";

type ChatParticipantItemParams = {
    user: User
}

const ChatParticipantItem = ({user}: ChatParticipantItemParams) => {
    return (
        <View style={styles.container}>
            <Avatar width={40} height={40} fontSize={20} profile={{
                name: user.first_name + ' ' + user.last_name,
                image: user?.imagePath ? user.imagePath : ''
            }}/>
            <Text style={styles.name}>{user.first_name + ' ' + user.last_name}</Text>
        </View>
    )
}

export default ChatParticipantItem
