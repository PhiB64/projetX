import { StyleSheet ,Text,View,ActivityIndicator} from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007c2e" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {         
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 16,
        color: '#229d2e',
        fontSize: 16,
    },
});