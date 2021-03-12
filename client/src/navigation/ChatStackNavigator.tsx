import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {ChatStackParamList} from "../../types";
import Colors from "../constants/Colors";
import Screen1 from "../screens/Screen1";

const Stack = createStackNavigator<ChatStackParamList>()

const ChatStackNavigator = () =>{
    return(
        <Stack.Navigator
            initialRouteName={'ChatList'}
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
                name={'ChatList'}
                component={Screen1}
                />
        </Stack.Navigator>
    )
}

export default ChatStackNavigator
