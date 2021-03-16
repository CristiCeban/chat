import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.white2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    textInputContainer: {
        flexDirection: 'row',
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
    textRight: {
        fontSize: 16,
        marginRight: 5,
        fontWeight: 'bold',
        color:'black'
    },
    uncheck:{
        fontSize: 16,
        marginRight: 5,
        fontWeight: 'bold',
        color:Colors.grey1
    }
})
