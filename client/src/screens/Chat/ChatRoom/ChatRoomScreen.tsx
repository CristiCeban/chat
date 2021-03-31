import React, {useEffect, useLayoutEffect, useState} from "react";
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {ApplicationState} from "../../../store";
import io from "socket.io-client";
import Config from "../../../config/Config";
import RoomHeader from "../../../components/chat/Header/RoomHeader/RoomHeader";


const ChatRoomScreen = ({route}: any) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {selectedRoom} = useSelector((state: ApplicationState) => state.chatReducer)
    const {room} = route.params
    const {token} = useSelector((state: ApplicationState) => state.authReducer)
    const [socketClient, setSocketClient] = useState<any>(null)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props: any) => <RoomHeader room={room}/>
        })
        // navigation.setOptions({{heade}})
    }, [selectedRoom])
    useEffect(() => {
        const socket = io(Config.wsUrl)
        socket.on('hello', (data: any) => console.log(data))
        setSocketClient(socket)
    }, [selectedRoom])
    // console.log(token)

    return (
        <View>
            <Text>Chat Room</Text>
            {/*<Text>{JSON.stringify(room)}</Text>*/}
        </View>
    )
}

export default ChatRoomScreen
