import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as Location from "expo-location"

import { View, Button, Text, Alert, StyleSheet, ActivityIndicator } from "react-native"
import colors from "../utils/colors"
import MapPreview from "./MapPreview"

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
})

const LocationSelector = ({ onLocationSelected }) => {
    const [pickedLocation, setPickedLocation] = useState()
    const [isFetching, setIsFetching] = useState(false)
    const route = useRoute()
    const navigation = useNavigation()

    const mapLocation = route?.params?.mapLocation

    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== "granted") {
            Alert.alert("Permisos de localización", "Necesitas permisos de localización para usar esta aplicación")
            return false
        }
        return true
    }

    const handleGetLocation = async () => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        setIsFetching(true)

        const location = await Location.getCurrentPositionAsync({
            timeInterval: 5000,
        })

        setIsFetching(false)

        const { latitude, longitude } = location.coords

        setPickedLocation({
            lat: latitude,
            lng: longitude,
        })

        onLocationSelected({
            lat: latitude,
            lng: longitude,
        })
    }

    const handlePickedLocation = async (location) => {
        const hasPermission = await verifyPermissions()

        if (!hasPermission) {
            return
        }

        navigation.navigate("Map")
    }

    useEffect(() => {
        if (mapLocation) {
            setPickedLocation({
                lat: route.params.mapLocation.lat,
                lng: route.params.mapLocation.lng,
            })

            onLocationSelected({
                lat: route.params.mapLocation.lat,
                lng: route.params.mapLocation.lng,
            })
        }
    }, [mapLocation])

    return (
        <View style={styles.container}>
            {isFetching ? (
                <View style={styles.preview}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <MapPreview location={pickedLocation} style={styles.preview}>
                    <Text>Localizacion en proceso</Text>
                </MapPreview>
            )}

            <View style={styles.buttonContainer}>
                <Button title="Seleccionar ubicación" onPress={handleGetLocation} color={colors.secondary} />
                <Button title="Elegir desde mapa" onPress={handlePickedLocation} color={colors.secondary} />
            </View>
        </View>
    )
}

export default LocationSelector
