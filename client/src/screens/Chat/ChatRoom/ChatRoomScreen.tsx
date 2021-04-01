import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons';
import io from "socket.io-client";
import Config from "../../../config/Config";
import {ApplicationState} from "../../../store";
import RoomHeader from "../../../components/chat/Header/RoomHeader/RoomHeader";
import {styles} from "./styles";
import Colors from "../../../constants/Colors";


const ChatRoomScreen = ({route}: any) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {selectedRoom} = useSelector((state: ApplicationState) => state.chatReducer)
    const {room} = route.params
    const {token,user} = useSelector((state: ApplicationState) => state.authReducer)
    const [socketClient, setSocketClient] = useState<any>(null)
    const inputRef = useRef<TextInput>(null)
    const [inputText, setInputText] = useState<string>('')
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props: any) => <RoomHeader room={room}/>
        })
    }, [selectedRoom])
    useEffect(() => {
        const socket = io(Config.wsUrl,{
            reconnectionDelayMax: 10000,
            query:{
                _id: user._id,
            }
        })
        socket.on('hello', (data: any) => console.log(data))
        setSocketClient(socket)
        return () => {
            socket.disconnect()
            setSocketClient(null)
        }
    }, [selectedRoom])

    const onSendMessage = async () => {
        console.log(inputText)
        if(inputRef){
            socketClient.emit('message',{
                content:inputText,
                user,
                roomId: selectedRoom
            })
            setInputText('')
        }
        inputRef?.current?.blur()
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>

            <View style={styles.footer}>
                <View style={styles.flexRow}>
                    <TouchableOpacity style={styles.emojiContainer}>
                        <Text style={styles.emoji}>{String.fromCodePoint(0x1F600)}</Text>
                    </TouchableOpacity>
                    <View style={styles.containerTextInput}>
                        <TextInput
                            ref={inputRef}
                            underlineColorAndroid={'transparent'}
                            placeholder={'Your Message'}
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={onSendMessage}
                        />
                    </View>
                    <TouchableOpacity style={styles.containerSend} onPress={onSendMessage}>
                        <FontAwesome name="send" size={20} color={Colors.red}/>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default ChatRoomScreen