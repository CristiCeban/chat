import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    avatarContainer: {
        borderRadius: 150 / 2,
        borderWidth: 2,
        borderColor: "white",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center"
    },
    letters: {
        color: "white",
        fontWeight: "bold"
    },
    avatarImage: {
        resizeMode: "cover",
    }
})
