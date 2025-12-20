import { createSlice } from "@reduxjs/toolkit";
import type { AttributeName } from "./SkillsDataSlice";
import type { ItemId } from "../util/Descriptions/Items";

type logType = "item" | "attribute"

const initialState = {
    maxEnergy: 10,
    currentEnergy: 10,
    bonusCap: 5,
    bonusProgress: 0,
    activeSkill: "Battling",
    trainingAttribute: "Health" as AttributeName,
    log: [] as { time: string, type: logType, text: string, item?: ItemId }[]
};

const playerDataSlice = createSlice({
    name: "player data",
    initialState,
    reducers: {
        setActiveSkill: (state, action) => {
            state.activeSkill = action.payload
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
        log: (state, action: { type: string, payload: { type: logType, text: string, item?: ItemId } }) => {
            state.log.unshift({ time: new Date().toLocaleTimeString('en-GB'), type: action.payload.type, text: action.payload.text, item: action.payload.item })
        },
        clearLog: (state) => {
            state.log = []
        },

        resetPlayer: () => initialState
    }
});

export const {
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
