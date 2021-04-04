import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {FontAwesome5} from '@expo/vector-icons';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Ionicons} from '@expo/vector-icons';
import Colors from "../constants/Colors";
import ChatListScreen from "../screens/Chat/ChatList/ChatListScreen";
import Avatar from "../components/general/Avatar/Avatar";
import {ChatStackParamList} from "../../types";
import {ApplicationState} from "../store";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import {onLogoutAction} from "../store/actions/authActions";
import CreateConversationScreen from "../screens/Chat/CreateConversation/CreateConversationScreen";
import CreateConversationReviewScreen from "../screens/Chat/CreateConversationReview/CreateConversationReviewScreen";
import {
    createConversationAction,
    resetNewConversationUsers
} from "../store/actions/newConversationActions";
import ChatRoomScreen from "../screens/Chat/ChatRoom/ChatRoomScreen";
import {onGetRooms} from "../store/actions/chatActions";


const Stack = createStackNavigator<ChatStackParamList>()

const ChatStackNavigator = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state: ApplicationState) => state.authReducer)
    const {
        newUsersToCreateConversation,
        isCreatingConversation
    } = useSelector((state: ApplicationState) => state.newConversationReducer)

    const onLogout = () => dispatch(onLogoutAction())

    const createConversation = async (navigation: any) => {
        await dispatch(createConversationAction())
        await dispatch(onGetRooms())
        await dispatch(resetNewConversationUsers())
        navigation.navigate('ChatList')
    }

    const onPressCreateConversation = async (navigation: any) => {
        if (newUsersToCreateConversation.length === 0)
            return
        else if (newUsersToCreateConversation.length === 1) {
            await createConversation(navigation)
        } else {
            navigation.navigate('CreateConversationReview')
        }
    }


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
                        <TouchableOpacity style={{marginRight: 20}}
                                          onPress={() => navigation.navigate('CreateConversation')}>
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
                        <TouchableOpacity onPress={onLogout} style={{marginRight: 10}}>
                            <Ionicons name="exit" size={24} color={Colors.red}/>
                        </TouchableOpacity>
                    )
                })}
            />

            <Stack.Screen
                name={'CreateConversation'}
                component={CreateConversationScreen}
                options={({navigation}: any) => ({
                    title: 'Create Conversation',
                    headerRight: () => (
                        <TouchableOpacity style={{marginRight: 10}}
                                          onPress={() => onPressCreateConversation(navigation)}
                                          disabled={newUsersToCreateConversation.length < 1}>
                            {isCreatingConversation ?
                                <ActivityIndicator size={"small"} color={Colors.red} style={{marginRight: 5}}/>
                                :
                                <>
                                    {newUsersToCreateConversation.length === 0 ?
                                        <Text style={{...styles.textRight, color: Colors.grey1}}>Next</Text> : null}
                                    {newUsersToCreateConversation.length === 1 ?
                                        <Text style={styles.textRight}>Create</Text> : null}
                                    {newUsersToCreateConversation.length > 1 ?
                                        <Text style={styles.textRight}>Next</Text> : null}
                                </>
                            }

                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen
                name={'CreateConversationReview'}
                component={CreateConversationReviewScreen}
                options={({navigation}: any) => ({
                    title: 'Conversation Review',
                })}
            />
            <Stack.Screen
                name={'ChatRoom'}
                component={ChatRoomScreen}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    textRight: {
        fontSize: 16,
        marginRight: 5,
        fontWeight: 'bold'
    }
})

export default ChatStackNavigator
