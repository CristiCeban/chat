import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.white2,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
})
