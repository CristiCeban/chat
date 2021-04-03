import {StyleSheet, Dimensions} from "react-native";
import Colors from "../../../../constants/Colors";

const width = Dimensions.get('window').width

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    containerUser: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    messageContainerUser: {
        backgroundColor: Colors.tiffany,
        padding: 10,
        margin:7,
        borderRadius: 30,
    },
    textUser: {
        maxWidth: width * 0.6,
        color:Colors.text1,
    },
    containerContact: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    messageContainerContact: {
        backgroundColor:'#96BDF4',
        padding: 10,
        margin:7,
        borderRadius: 30,
    },
    flexRowStart: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
