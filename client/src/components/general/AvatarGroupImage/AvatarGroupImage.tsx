import React from "react";
import Utils from "../../../services/Utils";
import {Image, Text, View} from "react-native";
import {styles} from "./styles";

export type AvatarGroupImageParam = {
    width: number,
    height: number,
    fontSize: number,
    profile: { name: string, image: string },
    containerStyle: any
}

const AvatarGroupImage = ({fontSize, height, profile, width, containerStyle}: AvatarGroupImageParam) => {
    const profileLetters = Utils.getFirstLetters(profile.name);
    const profileColor = Utils.getUserColor(profile.name);

    const renderLetters = () => {
        return <Text style={{...styles.letters, fontSize}}>{profileLetters}</Text>
    }

    const renderAvatarImage = () => {
        return <Image source={{uri: profile.image}} style={{width, height, ...styles.avatarImage}}/>
    }

    return (
        <View style={{width, height, ...styles.avatarContainer, backgroundColor: profileColor,...containerStyle}}>
            {profile.image ? renderAvatarImage() : renderLetters()}
        </View>
    )
}

export default AvatarGroupImage
