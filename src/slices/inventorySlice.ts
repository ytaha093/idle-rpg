import { createSlice } from "@reduxjs/toolkit"
import type { ItemId } from "../util/Descriptions/Items"
import type { PayloadAction } from "@reduxjs/toolkit"

type InventoryState = Record<ItemId, number>

const initialState: InventoryState = {
    Gold: 0,
    Credits: 0,
    Metal: 0,
    Wood: 0,
    Stone: 0,
}

const inventorySlice = createSlice({
    name: "inventory data",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<{ id: ItemId; amount: number }>) {
            state[action.payload.id] += action.payload.amount
        },
        removeItem(state, action: PayloadAction<{ id: ItemId; amount: number }>) {
            state[action.payload.id] = Math.max(
                0,
                state[action.payload.id] - action.payload.amount
            )
        },
        setItemAmount(state, action: PayloadAction<{ id: ItemId; amount: number }>) {
            state[action.payload.id] = action.payload.amount
        },
    },
})

export const { addItem, removeItem, setItemAmount } = inventorySlice.actions

export default inventorySlice.reducer
