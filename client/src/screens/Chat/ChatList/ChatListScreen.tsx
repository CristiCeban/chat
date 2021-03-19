import React, {useEffect} from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {onLogoutAction} from "../../../store/actions/authActions";
import {styles} from "./styles";
import {ApplicationState} from "../../../store";
import {onGetRooms} from "../../../store/actions/chatActions";
import Colors from "../../../constants/Colors";
import Room from "../../../components/chat/Lists/Room/Room";

const ChatListScreen = () => {
    const dispatch = useDispatch()
    const {token} = useSelector((state: ApplicationState) => state.authReducer)
    const {
        lastPageRooms,
        nextPageRooms,
        rooms,
        inProgressLazyRooms,
        inProgressRooms
    } = useSelector((state: ApplicationState) => state.chatReducer)
    // console.log(token)

    useEffect(() => {
        dispatch(onGetRooms())
    }, [])

    const renderItem = ({item}: any) => <Room room={item}/>

    return (
        <View style={styles.container}>
            {!rooms?.length ?
                <View style={styles.center}>
                    <ActivityIndicator size={'large'} color={Colors.red}/>
                </View>
                :
                < FlatList
                    data={rooms}
                    renderItem={renderItem}
                    keyExtractor={item => (item._id)}
                />
            }
        </View>
    )
}

export default ChatListScreen
