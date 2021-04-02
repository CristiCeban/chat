import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        padding: 10,
    },
    containerData:{
        display:'flex',
        flex:1,
    },
    list:{
        display:'flex',
        flex:1,
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
    },
    flexRow: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    containerTextInput: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flex:1,
        backgroundColor: Colors.lightBlue2,
    },
    emoji:{
        fontSize:20,
    },
    emojiContainer:{
        marginRight:5,
    },
    containerSend:{
        marginLeft:5,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
})
