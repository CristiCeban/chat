import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.lightBlue1,
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
    containerFormik: {
        display: 'flex',
        flex: 1,
        marginRight: 20,
        marginLeft: 20,
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
    facebookContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.facebook,
        height: 60,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
    },
    googleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
    },
    textWhite: {
        fontSize: 20,
        color: Colors.white1
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10,
    },
    textGoogle: {
        fontSize: 20,
        color: Colors.brown1
    },
    register: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        color: 'white'
    },
    textError: {
        fontSize: 12,
        color: Colors.red
    }
})
