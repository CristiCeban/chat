import {StyleSheet} from "react-native";
import Colors from "../../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 40,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#86c3d7',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    image: {
        marginLeft: 10,
    },
    details: {
        display: 'flex',
        flex: 1,
        marginLeft: 10,
    },
    center: {
        display: 'flex',
        alignSelf: 'center',
        marginRight: 40,
    },
    roomName: {
        fontSize: 16,
    },
    messageDetails: {
        fontSize: 12,
        color: Colors.brown2
    },
    messageDetailsUnread: {
        fontSize: 12,
        color: Colors.coffeeLight,
    },
    flexBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flexRowStart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerNrUnread: {
        marginRight: 10,
        minWidth: 27,
        minHeight: 27,
        backgroundColor: Colors.red,
    },
    textNrUnread: {
        color: Colors.white1,
        textAlign: 'center',
        fontSize: 12,
    },
    textMsgName: {
        fontSize: 14,
        color: Colors.dark1,
    },
    messageDate: {
        fontSize: 12,
        marginRight: 15,
        color: Colors.brown2,
    }

})
