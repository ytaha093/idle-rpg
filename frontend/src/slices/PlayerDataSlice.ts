import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AttributeName } from "./SkillsDataSlice";
import type { ItemId } from "../util/Descriptions/Items";
import { hydrateUser } from "./AuthSlice"

export const setAttribute = createAsyncThunk<AttributeName, { newAttribute: AttributeName, oldAttribute: AttributeName }, { rejectValue: AttributeName }>(
    "action/setAttribute",
    async ({ newAttribute, oldAttribute }, { rejectWithValue, dispatch }) => {
        //dispatch(setTraining(newAttribute))
        const response = await fetch("http://localhost:3000/api/action/train-attribute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ attribute: newAttribute.replace("", "") }),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            return rejectWithValue(oldAttribute);
        }

        console.log("Response status:", response.status);
        return await response.json();
    }
)



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
    },
    extraReducers: (builder) => {
        builder.addCase(hydrateUser.fulfilled, (state, action) => {
            if (action.payload.stats) {
                state.maxEnergy = action.payload.stats.maxEnergy
                state.currentEnergy = action.payload.stats.currentEnergy
                state.bonusCap = action.payload.stats.bonusCap
                state.bonusProgress = action.payload.stats.bonusProgress
                state.trainingAttribute = action.payload.stats.trainingAttribute as AttributeName
            }
        }),
            builder.addCase(setAttribute.fulfilled, (state, action) => {
                state.trainingAttribute = action.payload
            }),
            builder.addCase(setAttribute.rejected, (state, action) => {
                state.trainingAttribute = action.payload ?? state.trainingAttribute
            })
    },
})


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
