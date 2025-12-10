import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    Skills: {
        Battling: 0,
        Dungeoneering: 0,
        Mining: 0,
        Woodcutting: 0,
        Quarrying: 0,
        Runecrafting: 0,
        Jewelcrafting: 0,
        Herblore: 0,
    },
    Attributes: {
        Health: 0,
        Attack: 0,
        Defence: 0,
        Accuracy: 0,
        Dodge: 0,
        "Gold Rush": 0,
        Mining: 0,
        Woodcutting: 0,
        Quarrying: 0,
        "Clan Boost": 0,
    }
}

const SkillDataSlice = createSlice({
    name: "skills data",
    initialState: initialState,
    reducers: {
        setBattling(state, action) {
            state.Skills.Battling = action.payload
        },
        addBattling(state, action) {
            state.Skills.Battling += action.payload
        },
        setDungeoneering(state, action) {
            state.Skills.Dungeoneering = action.payload
        },
        setMining(state, action) {
            state.Skills.Mining = action.payload
        },
        setWoodcutting(state, action) {
            state.Skills.Woodcutting = action.payload
        },
        setQuarrying(state, action) {
            state.Skills.Quarrying = action.payload
        },
        setRunecrafting(state, action) {
            state.Skills.Runecrafting = action.payload
        },
        setJewelcrafting(state, action) {
            state.Skills.Jewelcrafting = action.payload
        },
        setHerblore(state, action) {
            state.Skills.Herblore = action.payload
        },
        setAttribute(state, action: PayloadAction<{ name: keyof typeof initialState.Attributes, value: number }>) {
            const { name, value } = action.payload
            state.Attributes[name] = value
        },
        addAttribute(state, action: PayloadAction<{ name: keyof typeof initialState.Attributes, value: number }>) {
            const { name, value } = action.payload
            state.Attributes[name] += value
        },
    }
})

export const { setBattling, addBattling, setDungeoneering, setMining, setWoodcutting, setQuarrying, setRunecrafting, setJewelcrafting, setHerblore, setAttribute, addAttribute } = SkillDataSlice.actions

export default SkillDataSlice.reducer;
