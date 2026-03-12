import { createSlice } from "@reduxjs/toolkit"
import type { AttributeName, SkillName } from "./SkillsDataSlice"
import type { ItemId } from "../util/Descriptions/Items"
import { hydrateUser, logoutUser } from "./thunks/authThunk"

type logType = "item" | "attribute" | "text" | "level"

type logEntry = { time?: string, type: logType, text?: string, text2?: string, item?: ItemId, itemAmount?: number, textRarity?: number }

const initialState = {
    name: "null",
    maxEnergy: 10,
    currentEnergy: 10,
    bonusCap: 5,
    bonusProgress: 0,
    trainingAttribute: "Health" as AttributeName,
    activeSkill: "Battling" as SkillName,
    activeAction: { action: "", options: "" }
}

const playerDataSlice = createSlice({
    name: "player data",
    initialState,
    reducers: {
        clearActiveAction: (state) => {
            state.activeAction = { action: "", options: "" };
        },
        setActiveAction: (state, action) => {
            state.activeAction = action.payload;
        },
        setActiveSkill: (state, action) => {
            state.activeSkill = action.payload;
        },
        setTraining: (state, action) => {
            state.trainingAttribute = action.payload;
        },
        setMaxEnergy: (state, action) => {
            state.maxEnergy = action.payload;
        },
        setCurrentEnergy: (state, action) => {
            state.currentEnergy = action.payload;
        },
        consumeEnergy: (state) => {
            state.currentEnergy--
        },
        setBonusData: (state, action: { type: string, payload: { bonusCap: number, bonusProgress: number } }) => {
            state.bonusCap = action.payload.bonusCap;
            state.bonusProgress = action.payload.bonusProgress;
        },

        resetPlayer: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(hydrateUser.fulfilled, (state, action) => {
                if (action.payload.stats) {
                    state.name = action.payload.username
                    state.maxEnergy = action.payload.stats.maxEnergy
                    state.currentEnergy = action.payload.stats.currentEnergy
                    state.bonusCap = action.payload.stats.bonusCap
                    state.bonusProgress = action.payload.stats.bonusProgress
                    state.trainingAttribute = action.payload.stats.trainingAttribute.replace("_", " ") as AttributeName
                }
            })
            .addCase(logoutUser.fulfilled, () => initialState)
    },
});

export const {
    clearActiveAction,
    setActiveAction,
    setActiveSkill,
    setTraining,
    setMaxEnergy,
    setCurrentEnergy,
    consumeEnergy,
    setBonusData,
    resetPlayer,
} = playerDataSlice.actions;

export default playerDataSlice.reducer;
