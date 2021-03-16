import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        backgroundColor: Colors.white2
    },
    thumbnailContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    saveContainer: {
        marginRight: 20,
    },
    saveText: {
        fontSize: 18,
        fontWeight: '600'
    },
    thumbnail: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    formikContainer: {
        display: 'flex',
        flex: 1
    },
    dataContainer: {
        marginTop: 30,
    },
    textInputContainer: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
    },
    textInput: {
        marginLeft: 10,
    },
    textProfileData: {
        fontSize: 20,
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    buttonContainer: {
        height: 60,
        marginTop: 20,
        backgroundColor: Colors.facebook,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSave: {
        color: Colors.white1,
        fontSize: 26,
    },
    center: {
        display: 'flex',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textError: {
        fontSize: 12,
        color: Colors.red
    }
})
