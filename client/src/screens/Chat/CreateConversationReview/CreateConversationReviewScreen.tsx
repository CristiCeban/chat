import React, {useState,useLayoutEffect} from "react";
import {View, FlatList, TouchableOpacity, Text} from "react-native";
import {styles} from "./styles";
import {Input} from "native-base";
import {useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native'
import ChatParticipantItem from "../../../components/chat/Lists/ChatParticipantItem/ChatParticipantItem";
import {ApplicationState} from "../../../store";

const CreateConversationReviewScreen = () => {
    const navigation = useNavigation()
    const {newUsersToCreateConversation} = useSelector((state: ApplicationState) => state.newConversationReducer)
    const [name, setName] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onCreate} disabled={name.length < 4}>
                    <Text style={name.length <4 ?  styles.uncheck : styles.textRight}>Create</Text>
                </TouchableOpacity>
            )
        })
    },[name])

    const renderItem = ({item}: any) => <ChatParticipantItem user={item}/>

    const onCreate = () => {

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
