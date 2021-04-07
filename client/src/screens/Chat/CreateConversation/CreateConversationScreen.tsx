import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Text, TouchableOpacity, View} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {Input} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {styles} from "./styles";
import {onAddUserToNewConversation, onGetContacts} from "../../../store/actions/newConversationActions";
import {ApplicationState} from "../../../store";
import Avatar from "../../../components/general/Avatar/Avatar";
import Colors from "../../../constants/Colors";
import {ScrollView} from "react-native-gesture-handler";
import {User} from "../../../models/user";

const CreateConversationScreen = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState<string>('')
    const {
        lastPageContacts,
        nextPageContacts,
        newContactsList,
        inProgressLazyAllContacts,
        inProgressAllContacts,
        newUsersToCreateConversation
    } = useSelector((state: ApplicationState) => state.newConversationReducer)

    useEffect(() => {
        dispatch(onGetContacts())
    }, [])

    useEffect(() => {
        dispatch(onGetContacts({search}))
    }, [search])

    const handleRefresh = () => {
        dispatch(onGetContacts({search}))
    }

    const loadMore = () => {
        if (nextPageContacts <= lastPageContacts && !inProgressLazyAllContacts)
            dispatch(onGetContacts({page: nextPageContacts, search}, false));
    }

    const renderFooter = () => {
        if (inProgressLazyAllContacts)
            return <ActivityIndicator size={'large'} style={styles.listFooter} color={Colors.red}/>
        return null
    }

    const onPressUser = (user: User) => dispatch(onAddUserToNewConversation(user))

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity onPress={() => onPressUser(item)}>
                <View style={styles.flexRowBetween}>
                    <View style={styles.flexRow}>
                        <Avatar width={40} height={40} fontSize={20} profile={{
                            name: item.first_name + ' ' + item.last_name,
                            image: item?.imagePath ? item?.imagePath : ''
                        }}/>
                        <View>
                            <Text style={styles.textName}>{item.first_name + ' ' + item.last_name}</Text>
                        </View>
                    </View>

                    <View>
                        {newUsersToCreateConversation.filter(el => el._id === item._id).length ?
                            <Feather size={24} name={'check-circle'} color={'#AB1F25'}/>
                            :
                            <Feather size={24} name={'circle'} color={'#AB1F25'}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

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

            {newUsersToCreateConversation?.length ?
                <View style={styles.selectedUserContainer}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {newUsersToCreateConversation.map((user) =>
                            <TouchableOpacity style={styles.selectedUser} onPress={() => onPressUser(user)}
                                              key={user._id}>
                                <Avatar width={60} height={60} fontSize={25} profile={{
                                    name: user.first_name + ' ' + user.last_name,
                                    image: user?.imagePath ? user.imagePath : ''
                                }}/>
                                <Text style={{marginTop: 5}}>{user.first_name}</Text>
                            </TouchableOpacity>
                        )}

                    </ScrollView>
                </View>
                : null}

            {!newContactsList?.length ?
                <View style={styles.center}>
                    <ActivityIndicator size={'large'} color={Colors.red}/>
                </View>
                :
                <FlatList
                    data={newContactsList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    initialNumToRender={10}
                    refreshing={inProgressAllContacts}
                    onRefresh={handleRefresh}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            }
        </View>
    )
}

export default CreateConversationScreen
