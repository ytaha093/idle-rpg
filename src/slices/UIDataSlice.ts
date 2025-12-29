import { createSlice } from "@reduxjs/toolkit";
import type { ItemId } from "../util/Descriptions/Items";
import type { EquipmentSlot, ToolSlot } from "./EquipmentSlice";


const initialState = {
    equitmentPopup: null as EquipmentSlot | ToolSlot | null,
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
        },
        setEquitmentPopup(state, action) {
            state.equitmentPopup = action.payload
        }
    }
})

export const { setItemPopup, setCurrentView, setEquitmentPopup } = UIDataSlice.actions
export default UIDataSlice.reducer