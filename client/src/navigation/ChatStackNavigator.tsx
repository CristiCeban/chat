import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {FontAwesome5} from '@expo/vector-icons';
import {Text, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import ChatListScreen from "../screens/Chat/ChatList/ChatListScreen";
import Avatar from "../components/general/Avatar/Avatar";
import {ChatStackParamList} from "../../types";
import {ApplicationState} from "../store";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import {onLogoutAction} from "../store/actions/authActions";


const Stack = createStackNavigator<ChatStackParamList>()

const ChatStackNavigator = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state: ApplicationState) => state.authReducer)

    const onLogout = () => dispatch(onLogoutAction())

    return (
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
                component={ChatListScreen}
                options={({navigation}: any) => ({
                    title: 'Chats',
                    headerLeft: () => (
                        <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.navigate('Profile')}>
                            <Avatar width={30} height={30} fontSize={16} profile={{
                                image: user?.imagePath ? user.imagePath : '',
                                name: user?.first_name ? user?.first_name + ' ' + user?.last_name : 'Guest'
                            }}/>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{marginRight: 20}}>
                            <FontAwesome5 name={'edit'} size={24} color={'black'}/>
                        </TouchableOpacity>
                    )
                })}
            />

            <Stack.Screen
                name={'Profile'}
                component={ProfileScreen}
                options={({navigation}: any) => ({
                    title: 'Profile',
                    headerRight: () => (
                        <TouchableOpacity onPress={onLogout} style={{marginRight:10}}>
                            <Ionicons name="exit" size={24} color={Colors.red}/>
                        </TouchableOpacity>
                    )
                })}
            />
        </Stack.Navigator>
    )
}

export default ChatStackNavigator
