import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gold: 0,
    credits: 10,
    maxEnergy: 10,
    currentEnergy: 10,
    activeSkill: "Battling"
};

const playerDataSlice = createSlice({
    name: "player data",
    initialState,
    reducers: {
        setGold: (state, action) => {
            state.gold = action.payload;
        },
        addGold: (state, action) => {
            state.gold += action.payload;
        },
        setCredits: (state, action) => {
            state.credits = action.payload;
        },
        setActiveSkill: (state, action) => {
            state.activeSkill += action.payload;
        },
        setMaxEnergy: (state, action) => {
            state.maxEnergy = action.payload;
        },
        setCurrentEnergy: (state, action) => {
            state.currentEnergy = action.payload;
        },
        consumeEnergy: (state) => {
            if (state.currentEnergy > 0) {
                state.currentEnergy--;
            }
        },
        refillEnergy: (state) => {
            state.currentEnergy = state.maxEnergy;
        },
        resetPlayer: () => initialState
    }
});

export const {
    setGold,
    addGold,
    setCredits,
    setMaxEnergy,
    setCurrentEnergy,
    consumeEnergy,
    refillEnergy,
    resetPlayer } = playerDataSlice.actions;

export default playerDataSlice.reducer;
