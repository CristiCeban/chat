import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.lightBlue1,
    },
    containerFormik: {
        display: 'flex',
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
    },
    textContainer: {
        backgroundColor: Colors.blue1,
        marginTop: 20,
        marginBottom: 5,
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 100,
    },
    textInput: {
        color: 'white'
    },
    textError: {
        fontSize: 12,
        color: Colors.red
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blue2,
        height: 60,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
    },
    textWhite: {
        fontSize: 20,
        color: Colors.white1
    },
})
