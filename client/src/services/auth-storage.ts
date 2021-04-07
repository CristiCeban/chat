import AsyncStorage from "@react-native-community/async-storage";
import Config from "../config/Config";

export default class AuthStorage {
    static async getToken() {
        const bodyString = await AsyncStorage.getItem(Config.tokenVariableName);
        const body = bodyString ? JSON.parse(bodyString as string) : null
        return body ? body.token : null;
    }

    static async setToken(token: string) {
        const body = JSON.stringify({token});
        return await AsyncStorage.setItem(Config.tokenVariableName, body);
    }

    static async removeToken() {
        return await AsyncStorage.removeItem(Config.tokenVariableName);
    }

}
