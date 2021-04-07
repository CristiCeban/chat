import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/Login/LoginScreen";
import {AuthStackParamList} from "../../types";
import Colors from "../constants/Colors";
import RegisterScreen from "../screens/Auth/Register/RegisterScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={{
                headerTintColor: Colors.dark1,
                headerStyle: {
                    backgroundColor: Colors.lightBlue1,
                    shadowOpacity: 0,
                    elevation: 0,
                    borderBottomWidth: 0
                }
            }}
        >
            <Stack.Screen
                name={'Login'}
                component={LoginScreen}
            />
            <Stack.Screen
                name={'Register'}
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator
