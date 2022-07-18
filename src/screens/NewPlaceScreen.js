import { useState } from "react"
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from "react-native"
import colors from "../utils/colors"
import { useDispatch } from "react-redux"
import { addPlace } from "../store/place.slice"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        margin: 20,
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
})

const NewPlaceSreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")

    const onHandleTitleChange = (text) => setTitle(text)

    const onHandleSubmit = () => {
        dispatch(addPlace(title))
        navigation.navigate("Place")
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Titulo</Text>
                <TextInput placeholder="Nueva Dirección" style={styles.input} onChangeText={onHandleTitleChange} value={title} />
                <Button title="Guardar" color={colors.primary} onPress={() => onHandleSubmit()} />
            </View>
        </ScrollView>
    )
}

export default NewPlaceSreen