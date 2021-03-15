import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Dimensions, ActivityIndicator} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {Input} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {styles} from "./styles";
import {onGetContacts} from "../../../store/actions/newConversationActions";
import {FlatList} from "react-native-gesture-handler";
import {ApplicationState} from "../../../store";
import Avatar from "../../../components/general/Avatar/Avatar";

const CreateConversationScreen = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState<string>('')
    const {
        lastPageContacts,
        nextPageContacts,
        newContactsList,
        inProgressLazyAllContacts,
        inProgressAllContacts
    } = useSelector((state: ApplicationState) => state.newConversationReducer)

    useEffect(() => {
        dispatch(onGetContacts())
    }, [])

    const handleRefresh = () => {
        console.log('refresh')
        dispatch(onGetContacts())
    }

    const loadMore = () => {
        if (nextPageContacts <= lastPageContacts && !inProgressLazyAllContacts)
            dispatch(onGetContacts({page: nextPageContacts}, false));
    }
    console.log(inProgressAllContacts)

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity
                // onPress={() => dispatch(onAddUserToNewConversation(item))}
                // style={{width:width}}
            >
                <View style={{flexDirection: 'row', minHeight: 70, justifyContent: 'space-between'}} key={item.id}>
                    <View style={{flexDirection: 'row'}}>
                        <Avatar width={30} height={30} fontSize={15} profile={{
                            name: item.first_name + ' ' + item.last_name,
                            image: item?.imagePath ? item?.imagePath : ''
                        }}/>
                        {/*<CustomImage uri={item.thumbnail} defaultImage={defaultImageEnum.placeholder} styles={styles.thumbnail}/>*/}
                        <View style={{marginTop: 20}}>
                            <Text style={{marginLeft: 10}}>{item.first_name + ' ' + item.last_name}</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20, marginRight: 20}}>
                        {/*{newUsersToCreateConversation.filter(el => el.id === item.id).length ?*/}
                        {/*    <Feather size={24} name={'check-circle'} color={'#AB1F25'}/>*/}
                        {/*    :*/}
                        <Feather size={24} name={'circle'} color={'#AB1F25'}/>

                        {/*}*/}
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
                    <Ionicons name={'ios-close'} size={28} color={'black'} style={{paddingTop: 0, paddingLeft: 10}}/>
                </TouchableOpacity>
            </View>

            {!newContactsList?.length ?
                <ActivityIndicator size={'large'} color={'red'}/>
                :
                <FlatList
                    data={newContactsList}
                    renderItem={renderItem}
                    // showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    // initialNumToRender={10}
                    refreshing={!inProgressAllContacts}
                    onRefresh={handleRefresh}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            }

        </View>
    )
}

export default CreateConversationScreen
