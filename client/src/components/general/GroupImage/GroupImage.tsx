import React from "react";
import {StyleSheet, View} from "react-native";
import {User} from "../../../models/user";
import AvatarGroupImage from "../AvatarGroupImage/AvatarGroupImage";


type GroupImageParams = {
    users: Array<User>,
    style: any,
    width: any,
}

const GroupImage = ({users, style, width}: GroupImageParams) => {
    const num = users.length > 4 ? 4 : users.length;

    const computedStyle = StyleSheet.flatten([{
        width: width,
        height: width,
        overflow: 'hidden',
        flexDirection: 'row'
    }, style])
    const finalWidth = computedStyle.width
    computedStyle.height = computedStyle.width
    computedStyle.borderRadius = computedStyle.borderRadius || finalWidth / 2
    computedStyle.borderWidth = 2;
    computedStyle.borderColor = 'white'

    const div = finalWidth / 2;

    const styles = StyleSheet.create({
        div: {},
        container: computedStyle,
        twoContainer: {
            width: div, overflow: 'hidden',
        },
        fourContainer: {
            width: div, height: div
        }
    })

    if (num === 1) {
        return (
            <View style={styles.container}>
                <AvatarGroupImage width={width} height={width} fontSize={width / 2} profile={{
                    name: users[0].first_name + ' ' + users[0].last_name,
                    image: users[0]?.imagePath || '',
                }} containerStyle={{}}/>
            </View>
        )
    }

    if (num === 2) {
        return (
            <View style={styles.container}>
                <View style={styles.twoContainer}>
                    <AvatarGroupImage width={width} height={width} fontSize={width / 2} profile={{
                        name: users[0].first_name + ' ' + users[0].last_name,
                        image: users[0]?.imagePath || '',
                    }} containerStyle={{marginRight: div / 2, left: 0}}/>
                </View>
                <View style={styles.twoContainer}>
                    <AvatarGroupImage width={width} height={width} fontSize={width / 2} profile={{
                        name: users[1].first_name + ' ' + users[1].last_name,
                        image: users[1]?.imagePath || '',
                    }} containerStyle={{marginLeft: div / 2, right: div}}/>
                </View>
            </View>
        )
    }
    if (num === 3) {
        return (
            <View style={styles.container}>
                <View style={styles.twoContainer}>
                    <AvatarGroupImage width={width} height={width} fontSize={width / 2} profile={{
                        name: users[0].first_name + ' ' + users[0].last_name,
                        image: users[0]?.imagePath || '',
                    }} containerStyle={{marginRight: div / 2, left: 0}}/>
                </View>
                <View style={styles.twoContainer}>
                    <AvatarGroupImage width={div} height={div} fontSize={div / 2} profile={{
                        name: users[1].first_name + ' ' + users[1].last_name,
                        image: users[1]?.imagePath || '',
                    }} containerStyle={styles.fourContainer}/>
                </View>
                <View style={styles.twoContainer}>
                    <AvatarGroupImage width={div} height={div} fontSize={div / 2} profile={{
                        name: users[2].first_name + ' ' + users[2].last_name,
                        image: users[2]?.imagePath || '',
                    }} containerStyle={styles.fourContainer}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <AvatarGroupImage width={div} height={div} fontSize={div / 2} profile={{
                    name: users[0].first_name + ' ' + users[0].last_name,
                    image: users[0]?.imagePath || '',
                }} containerStyle={styles.fourContainer}/>
                <AvatarGroupImage width={div} height={div} fontSize={div / 2} profile={{
                    name: users[1].first_name + ' ' + users[1].last_name,
                    image: users[1]?.imagePath || '',
                }} containerStyle={styles.fourContainer}/>
            </View>
            <View>
                <AvatarGroupImage width={div} height={div} fontSize={div / 2} profile={{
                    name: users[2].first_name + ' ' + users[2].last_name,
                    image: users[2]?.imagePath || '',
                }} containerStyle={styles.fourContainer}/>
                <AvatarGroupImage width={div} height={div} fontSize={div / 2} profile={{
                    name: users[3].first_name + ' ' + users[3].last_name,
                    image: users[3]?.imagePath || '',
                }} containerStyle={styles.fourContainer}/>
            </View>
        </View>
    )

}

export default GroupImage;
