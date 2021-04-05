import {Platform} from 'react-native'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import axios from "axios";
import Config from "../config/Config";

export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

export const expoSubscribe = async (apiToken: string) => {
    try {
        const token = await registerForPushNotificationsAsync()
        console.log('token')
        console.log(token)
        await axios.post(
            `${Config.apiUrl}auth/expo`,
            {expoToken: token},
            {
                headers: {
                    Authorization: `Bearer ${apiToken}`
                }
            }
        )
    } catch (e) {
        console.log("Register push notification error");
        console.log(e);
    }
}
