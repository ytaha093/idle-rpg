import { createSlice } from "@reduxjs/toolkit";

const initialState: Record<string, number> = {
    Battling: 0,
    Dungeoneering: 0,
    Mining: 0,
    Woodcutting: 0,
    Quarrying: 0,
    Runecrafting: 0,
    Jewelcrafting: 0,
    Herblore: 0,
}

const SkillDataSlice = createSlice({
    name: "skills data",
    initialState: initialState,
    reducers: {
        setBattling(state, action) {
            state.Battling = action.payload
        },
        addBattling(state, action) {
            state.Battling += action.payload
        },
        setDungeoneering(state, action) {
            state.Dungeoneering = action.payload
        },
        setMining(state, action) {
            state.Mining = action.payload
        },
        setWoodcutting(state, action) {
            state.Woodcutting = action.payload
        },
        setQuarrying(state, action) {
            state.Quarrying = action.payload
        },
        setRunecrafting(state, action) {
            state.Runecrafting = action.payload
        },
        setJewelcrafting(state, action) {
            state.Jewelcrafting = action.payload
        },
        setHerblore(state, action) {
            state.Herblore = action.payload
        }
    }
})

export const { setBattling, addBattling, setDungeoneering, setMining, setWoodcutting, setQuarrying, setRunecrafting, setJewelcrafting, setHerblore } = SkillDataSlice.actions

export default SkillDataSlice.reducer;
