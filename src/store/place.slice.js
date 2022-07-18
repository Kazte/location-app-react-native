import { createSlice } from "@reduxjs/toolkit"
import * as FileSystem from "expo-file-system"
import Place from "../models/place"
import { URL_GEOCODING } from "../utils/maps"

const initialState = {
    places: [],
}

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        addPlace: (state, action) => {
            const NewPlace = new Place(Date.now(), action.payload.title, action.payload.image, action.payload.address, action.payload.coords)
            state.places.push(NewPlace)
        },
    },
})

export const { addPlace } = placeSlice.actions

export const savePlace = (title, image, coords) => {
    return async (dispatch) => {
        const response = await fetch(URL_GEOCODING(coords.lat, coords.lng))

        if (!response.ok) throw new Error("Error fetching geocoding")

        const data = await response.json()

        if (!data.results) throw new Error("Error getting address")

        const address = data.results[0].formatted_address

        const fileName = image.split("/").pop()
        const Path = FileSystem.documentDirectory + fileName

        try {
            await FileSystem.moveAsync({
                from: image,
                to: Path,
            })
        } catch (error) {
            console.log(error)
            throw error
        }

        dispatch(addPlace({ title, image: Path, address, coords }))
    }
}

export default placeSlice.reducer
