import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/Login/LoginScreen";
import {AuthStackParamList} from "../../types";
import Colors from "../constants/Colors";


const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'Login'}
                         screenOptions={{
                             headerTintColor: Colors.text,
                             headerStyle: {
                                 backgroundColor: Colors.darkBlue,
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

        </Stack.Navigator>
    )
}

export default AuthStackNavigator
