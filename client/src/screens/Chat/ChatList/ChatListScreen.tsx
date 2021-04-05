import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from '@react-navigation/native';
import {styles} from "./styles";
import {ApplicationState} from "../../../store";
import {onGetRooms} from "../../../store/actions/chatActions";
import Colors from "../../../constants/Colors";
import Room from "../../../components/chat/Lists/Room/Room";
import {Ionicons} from "@expo/vector-icons";
import {Input} from "native-base";

const ChatListScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [search, setSearch] = useState<string>('')
    const {
        lastPageRooms,
        nextPageRooms,
        rooms,
        inProgressLazyRooms,
        inProgressRooms
    } = useSelector((state: ApplicationState) => state.chatReducer)

    useEffect(() => {
        dispatch(onGetRooms())
    }, [])

    useEffect(() => {
        dispatch(onGetRooms({search: search.toLowerCase()}))
    }, [search])

    const handleRefresh = () => dispatch(onGetRooms({search: search.toLowerCase()}))

    const renderItem = ({item}: any) => <Room room={item}/>

    const loadMore = () => {
        if (nextPageRooms <= lastPageRooms && !inProgressLazyRooms)
            dispatch(onGetRooms({page: nextPageRooms, search: search.toLowerCase()}, false))
    }

    const renderFooter = () => {
        if (inProgressLazyRooms)
            return <ActivityIndicator size={'large'} style={styles.listFooter} color={Colors.red}/>
        return null
    }

    const onCreate = () => navigation.navigate('CreateConversation')

    return (
        <View style={styles.container}>
            <View style={styles.tagInputContainer}>
                <Ionicons name={'ios-search'} size={24} color={'black'} style={{paddingLeft: 5, paddingTop: 0}}/>
                <Input
                    style={styles.tagInput}
                    placeholder="Search for user"
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={search}
                    onChangeText={(value: string) => setSearch(value)}
                />
                <TouchableOpacity
                    onPress={() => setSearch('')}
                >
                    <Ionicons name={'ios-close'} size={28} color={'black'} style={{paddingLeft: 10}}/>
                </TouchableOpacity>
            </View>
            {inProgressRooms ?
                <View style={styles.center}>
                    <ActivityIndicator size={'large'} color={Colors.red}/>
                </View>
                :
                <>
                    {!rooms?.length ?
                        <View style={styles.center}>
                            <View style={styles.containerInfo}>
                                <Text>Don't have a conversation yet?</Text>
                            </View>
                            <TouchableOpacity style={styles.containerCreate} onPress={onCreate}>
                                <Text style={styles.textCreate}>Create One!</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <>
                            < FlatList
                                data={rooms}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => (item._id)}
                                onRefresh={handleRefresh}
                                refreshing={inProgressRooms}
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter}
                            />
                        </>
                    }
                </>
            }
        </View>
    )
}

export default ChatListScreen
