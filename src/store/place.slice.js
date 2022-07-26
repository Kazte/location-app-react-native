import { createSlice } from "@reduxjs/toolkit"
import * as FileSystem from "expo-file-system"
import Place from "../models/place"
import { URL_GEOCODING } from "../utils/maps"
import { insertAddress, fetchAddress } from "../db"

const initialState = {
    places: [],
}

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        addPlace: (state, action) => {
            const NewPlace = new Place(action.payload.id.toString(), action.payload.title, action.payload.image, action.payload.address, action.payload.coords)
            state.places.push(NewPlace)
        },
        loadAddress: (state, action) => {
            state.places = action.payload
        },
    },
})

export const { addPlace, loadAddress } = placeSlice.actions

export const savePlace = (title, image, coords) => {
    return async (dispatch) => {
        let result

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

            result = await insertAddress(title, Path, address, coords)

            console.log("result insertAddress", result)
        } catch (error) {
            console.log(error)
            throw error
        }

        dispatch(addPlace({ id: result.insertId, title, image: Path, address, coords }))
    }
}

export const loadPlaces = () => {
    return async (dispatch) => {
        try {
            const result = await fetchAddress()

            dispatch(loadAddress(result.rows._array))
        } catch (error) {
            throw error
        }
    }
}

export default placeSlice.reducer
