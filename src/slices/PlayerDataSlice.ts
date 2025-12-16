import { createSlice } from "@reduxjs/toolkit";
import type { SkillDataState } from "./SkillsDataSlice";
import type { ReactNode } from "react";

const initialState = {
    gold: 0,
    credits: 10,
    maxEnergy: 10,
    currentEnergy: 10,
    bonusCap: 5,
    bonusProgress: 0,
    activeSkill: "Battling",
    trainingAttribute: "Health" as keyof SkillDataState["Attributes"],
    log: [] as { time: string, content: ReactNode }[]
};

const playerDataSlice = createSlice({
    name: "player data",
    initialState,
    reducers: {
        setGold: (state, action) => {
            state.gold = action.payload
        },
        addGold: (state, action) => {
            state.gold += action.payload
        },
        setCredits: (state, action) => {
            state.credits = action.payload
        },
        setActiveSkill: (state, action) => {
            state.activeSkill += action.payload
        },
        setTraining: (state, action) => {
            state.trainingAttribute = action.payload
        },
        setMaxEnergy: (state, action) => {
            state.maxEnergy = action.payload
        },
        setCurrentEnergy: (state, action) => {
            state.currentEnergy = action.payload
        },
        consumeEnergy: (state) => {
            if (state.currentEnergy > 0) {
                state.currentEnergy--
            }
        },
        refillEnergy: (state) => {
            state.currentEnergy = state.maxEnergy;
        },
        increaseBonus: (state) => {
            state.bonusProgress++
            if (state.bonusProgress == state.bonusCap) {
                console.log("trigger action bonus")
            } else if (state.bonusProgress > state.bonusCap) {
                state.bonusCap++
                state.bonusProgress = 1
            }
        },
        log: (state, action) => {
            state.log.push({ time: new Date().toLocaleTimeString('en-GB'), content: action.payload })
        },
        clearLog: (state) => {
            state.log = []
        },

        resetPlayer: () => initialState
    }
});

export const {
    setGold,
    addGold,
    setCredits,
    setActiveSkill,
    setTraining,
    setMaxEnergy,
    setCurrentEnergy,
    consumeEnergy,
    refillEnergy,
    increaseBonus,
    log,
    clearLog,
    resetPlayer } = playerDataSlice.actions;

export default playerDataSlice.reducer;
