import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        padding: 10,
        paddingTop:5,
        backgroundColor:Colors.grey3,
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
        paddingTop:10,
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
        // backgroundColor: Colors.lightBlue2,
        // backgroundColor:'#86c3d7',
        backgroundColor:'#96c3f4'
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
    },
    listFooter: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        height: 60
    },
})
