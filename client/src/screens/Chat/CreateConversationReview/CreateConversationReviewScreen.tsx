import React, {useState, useLayoutEffect} from "react";
import {View, FlatList, TouchableOpacity, Text, ActivityIndicator} from "react-native";
import {styles} from "./styles";
import {Input} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native'
import ChatParticipantItem from "../../../components/chat/Lists/ChatParticipantItem/ChatParticipantItem";
import {ApplicationState} from "../../../store";
import {createConversationAction, resetNewConversationUsers} from "../../../store/actions/newConversationActions";
import Colors from "../../../constants/Colors";

const CreateConversationReviewScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {
        newUsersToCreateConversation,
        isCreatingConversation
    } = useSelector((state: ApplicationState) => state.newConversationReducer)
    const [name, setName] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onCreate} disabled={name.length < 4 || isCreatingConversation}
                                  style={{marginRight: 10}}>
                    {isCreatingConversation ?
                        <ActivityIndicator size={"small"} color={Colors.red} style={{marginRight: 5}}/>
                        :
                        <Text style={name.length < 4 ? styles.uncheck : styles.textRight}>Create</Text>
                    }
                </TouchableOpacity>
            )
        })
    }, [name, isCreatingConversation])

    const renderItem = ({item}: any) => <ChatParticipantItem user={item}/>

    const onCreate = async () => {
        await dispatch(createConversationAction(name))
        await dispatch(resetNewConversationUsers())
        navigation.navigate('ChatList')
    }

    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <Input
                    // style={styles.tagInput}
                    placeholder="Enter the name of the chat"
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={(value: string) => setName(value)}
                />
            </View>

            <FlatList
                data={newUsersToCreateConversation}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default CreateConversationReviewScreen
