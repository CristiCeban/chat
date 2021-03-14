import React from "react";
import {User} from "../../models/user";
import {View} from "react-native";
import Avatar from "../general/Avatar/Avatar";
import {styles} from "./styles";

type ProfileAvatarParams = {
    user: User,
    width: number,
    height: number,
    fontSize: number,
}

const ProfileAvatar = ({fontSize, height, user, width}: ProfileAvatarParams) => {
    return (
        <View style={styles.container}>
            <Avatar width={width} height={height} fontSize={fontSize} profile={{
                image: user?.imagePath ? user.imagePath : '',
                name: user?.first_name ? user?.first_name + ' ' + user?.last_name : 'Guest'
            }}/>
        </View>
    )
}

export default ProfileAvatar
