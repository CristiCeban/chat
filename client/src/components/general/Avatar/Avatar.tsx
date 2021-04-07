import React from "react";
import Utils from "../../../services/Utils";
import {styles} from "./styles";
import {Image, Text, View} from "react-native";

export type AvatarParam = {
    width: number,
    height: number,
    fontSize: number,
    profile: { name: string, image: string },
}

const Avatar = ({width, height, fontSize, profile}: AvatarParam) => {
    const profileLetters = Utils.getFirstLetters(profile.name);
    const profileColor = Utils.getUserColor(profile.name);

    const renderLetters = () => {
        return <Text style={{...styles.letters, fontSize}}>{profileLetters}</Text>
    }

    const renderAvatarImage = () => {
        return <Image source={{uri: profile.image}} style={{width, height, ...styles.avatarImage}}/>
    }

    return (
        <View style={{width, height, ...styles.avatarContainer, backgroundColor: profileColor}}>
            {profile.image ? renderAvatarImage() : renderLetters()}
        </View>
    )
}

export default Avatar;
