import { createSlice } from "@reduxjs/toolkit"
import Place from "../models/place"

const initialState = {
    places: [{}],
}

const placeSlice = createSlice({
    name: "place",
    initialState,
    reducers: {
        addPlace: (state, action) => {
            const NewPlace = new Place(Date.now(), action.payload.title, action.payload.image)
            state.places.push(NewPlace)
        },
    },
})

export const { addPlace } = placeSlice.actions

export default placeSlice.reducer
