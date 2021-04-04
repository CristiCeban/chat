import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {FontAwesome} from '@expo/vector-icons';
import io from "socket.io-client";
import Config from "../../../config/Config";
import {ApplicationState} from "../../../store";
import RoomHeader from "../../../components/chat/Header/RoomHeader/RoomHeader";
import {styles} from "./styles";
import Colors from "../../../constants/Colors";
import {getRoomMessages, pushMessage, resetSelectedRoom} from "../../../store/actions/chatActions";
import MessageItem from "../../../components/chat/Lists/MessageItem/MessageItem";
import {MessageType} from "../../../models/Message";
import Utils from "../../../services/Utils";


const ChatRoomScreen = ({route}: any) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {selectedRoom} = useSelector((state: ApplicationState) => state.chatReducer)
    const {room} = route.params
    const {token, user} = useSelector((state: ApplicationState) => state.authReducer)
    const {
        messages,
        isLoadingRoomLazy,
        isLoadingRoom,
        lastPageMessage,
        nextPageMessage
    } = useSelector((state: ApplicationState) => state.chatReducer)
    const [socketClient, setSocketClient] = useState<any>(null)
    const inputRef = useRef<TextInput>(null)
    const [inputText, setInputText] = useState<string>('')

    useEffect(() => {
        if (selectedRoom)
            dispatch(getRoomMessages(selectedRoom))
        return () => {
            dispatch(resetSelectedRoom())
        }
    }, [selectedRoom])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <RoomHeader room={room}/>
        })
    }, [selectedRoom])

    useEffect(() => {
        const socket = io(Config.wsUrl, {
            reconnectionDelayMax: 10000,
            query: {
                _id: user._id,
            }
        })
        setSocketClient(socket)
        return () => {
            socket.disconnect()
            setSocketClient(null)
        }
    }, [selectedRoom])

    const loadMore = () => {
        if (nextPageMessage <= lastPageMessage && !isLoadingRoomLazy && selectedRoom)
            dispatch(getRoomMessages(selectedRoom, {page: nextPageMessage}, false))
    }

    const onSendMessage = async () => {
        if (inputRef) {
            const message: MessageType = {
                author: user,
                content: inputText,
                _id: Utils.randomString(15),
                date: new Date().toUTCString(),
                room
            }
            socketClient.emit('message', {...message})
            setInputText('')
            inputRef?.current?.blur()
            dispatch(pushMessage(message))
        }
    }

    const renderFooter = () => {
        if (isLoadingRoomLazy)
            return <ActivityIndicator size={'large'} style={styles.listFooter} color={Colors.red}/>
        return null
    }

    const renderItem = ({item, index}: any) => <MessageItem item={item} index={index}/>

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            {isLoadingRoom ?
                <View style={styles.center}>
                    <ActivityIndicator size={'large'} color={Colors.red}/>
                </View>
                :
                <View style={styles.containerData}>
                    <FlatList
                        data={messages}
                        inverted={true}
                        style={styles.list}
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end',}}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={10}
                        onEndReachedThreshold={0.2}
                        onEndReached={loadMore}
                        ListFooterComponent={renderFooter}
                    />
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
                </View>
            }

        </KeyboardAvoidingView>
    )
}

export default ChatRoomScreen
