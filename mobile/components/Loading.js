import { StyleSheet ,Text,View,ActivityIndicator} from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4ADE80" />
            <Text style={styles.text}>Chargement...</Text>
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
        color: '#94A3B8',
        fontSize: 16,
    },
});