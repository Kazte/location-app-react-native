import React, { useLayoutEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import MapView, { Marker } from "react-native-maps"
import IonicIcons from "@expo/vector-icons/Ionicons"
import MapPreview from "../components/MapPreview"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const MapScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState()

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const handlePickLocation = (e) => {
        setSelectedLocation({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude,
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSafeLocation}>
                    <IonicIcons name="ios-checkmark" size={30} color="white" />
                </TouchableOpacity>
            ),
        })
    }, [selectedLocation])

    const handleSafeLocation = () => {
        if (selectedLocation) {
            navigation.navigate("NewPlace", {
                mapLocation: selectedLocation,
            })
        }
    }

    return (
        <MapView initialRegion={initialRegion} style={styles.container} onPress={handlePickLocation}>
            {selectedLocation && (
                <Marker
                    title="Picked Location"
                    coordinate={{
                        ...selectedLocation,
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                />
            )}
        </MapView>
    )
}

export default MapScreen
