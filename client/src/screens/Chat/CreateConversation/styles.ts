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
    flexRowBetween: {
        flexDirection: 'row',
        minHeight: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textName: {
        fontSize: 16,
        marginLeft: 10
    },
    listFooter: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        height: 60
    },
    selectedUser: {
        marginLeft: 5,
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
    },
    selectedUserContainer: {
        marginBottom: 10,
    }
})
