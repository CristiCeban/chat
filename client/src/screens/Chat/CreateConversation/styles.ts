import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        backgroundColor:Colors.white2,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
    },
    tagInputContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.white1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1E2025',
        height: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    tagInput: {
        height: 50,
        color: '#1E2025',
        fontSize: 14,
        flex: 1
    },
})
