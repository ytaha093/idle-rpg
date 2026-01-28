import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ItemId } from "../util/Descriptions/Items";
import type { EquipmentSlot, ToolSlot } from "./EquipmentSlice";

type lastResultsType = { xp: { skill: string, amount: number }, items: { itemId: ItemId, amount: number }[], attribute: { attribute: string } | null } | null

const initialState = {
    equitmentPopup: null as EquipmentSlot | ToolSlot | null,
    itemPopup: null as ItemId | null,
    currentView: "Home",
    lastResults: null as lastResultsType
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
        },
        setLastResults(state, action: PayloadAction<lastResultsType>) {
            state.lastResults = action.payload
        }
    }
})

export const { setItemPopup, setCurrentView, setEquitmentPopup, setLastResults } = UIDataSlice.actions
export default UIDataSlice.reducer