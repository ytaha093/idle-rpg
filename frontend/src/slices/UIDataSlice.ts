import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ItemId } from "../util/Descriptions/Items";
import type { EquipmentSlot, ToolSlot } from "./EquipmentSlice";
import { logoutUser } from "./thunks/authThunk";

type lastResultsType = {
    xp: { skill: string, amount: number },
    items: { itemId: ItemId, amount: number }[],
    attribute: { attribute: string } | null,
    battleData?: {
        win: boolean,
        player: { maxHP: number, currentHP: number, playerDamage: number, playerHits: number, playerMisses: number, playerDodges: number },
        mob: { maxHP: number, currentHP: number, mobDamage: number, mobHits: number, mobMisses: number, mobName: string }
    }
} | null

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
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, () => initialState)
    }
})

export const { setItemPopup, setCurrentView, setEquitmentPopup, setLastResults } = UIDataSlice.actions
export default UIDataSlice.reducer