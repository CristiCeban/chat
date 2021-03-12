import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "../../types";
import ChatStackNavigator from "./ChatStackNavigator";

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={"Root"} component={ChatStackNavigator}/>
        </Stack.Navigator>
    )
}

export default RootNavigator
