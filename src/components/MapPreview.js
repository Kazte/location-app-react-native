import { View, Image, StyleSheet } from "react-native"
import { URL_MAPS } from "../utils/maps"
import colors from "../utils/colors"

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    mapImage: {
        width: "100%",
        height: "100%",
    },
})

const MapPreview = ({ children, location, style }) => {
    const { lat, lng } = location || {}

    const mapPreviewUrl = URL_MAPS(lat, lng)

    return <View style={[styles.container, style]}>{location ? <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} /> : children}</View>
}

export default MapPreview
