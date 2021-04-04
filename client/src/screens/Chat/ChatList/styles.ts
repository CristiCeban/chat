import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.white2,
        flex: 1,
        paddingHorizontal:20,
        paddingTop:20,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    containerInfo: {
        borderBottomWidth:1,
        borderColor:Colors.brown1,
    },
    containerCreate: {
        display: 'flex',
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.red,
        marginTop: 10,
    },
    textCreate: {
        fontSize: 18,
        color: Colors.white1,
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
    listFooter: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        height: 60
    },
})
