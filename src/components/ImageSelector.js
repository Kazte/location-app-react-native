import { useState } from "react"

import { View, Text, Alert, Button, StyleSheet, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

import colors from "../utils/colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    preview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.primary,
        borderWidth: 1,
    },
    image: {
        width: "100%",
        height: "100%",
    },
})

const ImageSelector = ({ onImage }) => {
    const [pickedUrl, setPickedUrl] = useState("")

    const handleTakeImage = async () => {
        const isCameraPermissionGranted = await verifyPermissions()

        if (!isCameraPermissionGranted) {
            return
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.7,
        })

        setPickedUrl(image.uri)
        onImage(image.uri)
    }

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("No Garantizado", "Necesita dar permisos para la camara", [{ text: "Ok" }])
            return false
        }

        return true
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>{!pickedUrl ? <Text>No hay URL seleccionanda</Text> : <Image source={{ uri: pickedUrl }} style={styles.image} />}</View>
            <Button
                title="Tomar foto"
                onPress={() => {
                    handleTakeImage()
                }}
            />
        </View>
    )
}

export default ImageSelector
