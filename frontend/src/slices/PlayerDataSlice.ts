import { createSlice } from "@reduxjs/toolkit"
import type { AttributeName, SkillName } from "./SkillsDataSlice"
import type { ItemId } from "../util/Descriptions/Items"
import { hydrateUser } from "./thunks/authThunk"

type logType = "item" | "attribute" | "text" | "level"

type logEntry = { time?: string, type: logType, text?: string, text2?: string, item?: ItemId, itemAmount?: number }

const initialState = {
    maxEnergy: 10,
    currentEnergy: 10,
    bonusCap: 5,
    bonusProgress: 0,
    trainingAttribute: "Health" as AttributeName,
    log: [] as logEntry[],
    activeSkill: "Battling" as SkillName,
    activeAction: { action: "", options: "" }
}

const playerDataSlice = createSlice({
    name: "player data",
    initialState,
    reducers: {
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
            if (state.currentEnergy > 0) {
                state.currentEnergy--;
            }
        },
        refillEnergy: (state) => {
            state.currentEnergy = state.maxEnergy;
        },
        setBonusData: (state, action: { type: string, payload: { bonusCap: number, bonusProgress: number } }) => {
            state.bonusCap = action.payload.bonusCap;
            state.bonusProgress = action.payload.bonusProgress;
        },
        log: (state, action: { type: string, payload: logEntry }) => {
            state.log.unshift({
                time: new Date().toLocaleTimeString("en-GB"),
                type: action.payload.type,
                text: action.payload.text,
                text2: action.payload.text2,
                item: action.payload.item,
                itemAmount: action.payload.itemAmount,
            })
        },
        clearLog: (state) => {
            state.log = [];
        },

        resetPlayer: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(hydrateUser.fulfilled, (state, action) => {
                if (action.payload.stats) {
                    state.maxEnergy = action.payload.stats.maxEnergy
                    state.currentEnergy = action.payload.stats.currentEnergy
                    state.bonusCap = action.payload.stats.bonusCap
                    state.bonusProgress = action.payload.stats.bonusProgress
                    state.trainingAttribute = action.payload.stats.trainingAttribute.replace("_", " ") as AttributeName
                }
            })
    },
});

export const {
    setActiveAction,
    setActiveSkill,
    setTraining,
    setMaxEnergy,
    setCurrentEnergy,
    consumeEnergy,
    refillEnergy,
    setBonusData,
    log,
    clearLog,
    resetPlayer,
} = playerDataSlice.actions;

export default playerDataSlice.reducer;
