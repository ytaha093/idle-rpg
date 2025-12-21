import { createSlice } from "@reduxjs/toolkit";
import type { ItemId } from "../util/Descriptions/Items";


const initialState = {
    itemPopup: null as ItemId | null,
    currentView: "Home"
}

const UIDataSlice = createSlice({
    name: "UIData",
    initialState: initialState,
    reducers: {
        setItemPopup(state, action) {
            state.itemPopup = action.payload
        },
        setCurrentView(state, action) {
            state.currentView = action.payload

        }
    }
})

export const { setItemPopup, setCurrentView } = UIDataSlice.actions

export default UIDataSlice.reducer