import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { hydrateUser } from "./thunks/authThunk"

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
        Defense: 0,
        Accuracy: 0,
        Dodge: 0,
        "Gold Rush": 0,
        Mining: 0,
        Woodcutting: 0,
        Quarrying: 0,
        "Clan Boost": 0,
    }
}

export type AttributeName = keyof typeof initialState.Attributes
export type SkillName = keyof typeof initialState.Skills
export type SkillDataState = typeof initialState;

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
        setSkillXP(state, action: PayloadAction<{ name: keyof typeof initialState.Skills, value: number }>) {
            const { name, value } = action.payload
            state.Skills[name] = value
        },
        addSkillXP(state, action: PayloadAction<{ name: keyof typeof initialState.Skills, value: number }>) {
            const { name, value } = action.payload
            state.Skills[name] += value
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(hydrateUser.fulfilled, (state, action) => {
                if (action.payload.skills) {
                    state.Skills = action.payload.skills;
                }
                if (action.payload.attributes) {
                    // Map Prisma attribute names to frontend names
                    state.Attributes = {
                        Health: action.payload.attributes.Health,
                        Attack: action.payload.attributes.Attack,
                        Defense: action.payload.attributes.Defense,
                        Accuracy: action.payload.attributes.Accuracy,
                        Dodge: action.payload.attributes.Dodge,
                        "Gold Rush": action.payload.attributes.Gold_Rush,
                        Mining: action.payload.attributes.Mining,
                        Woodcutting: action.payload.attributes.Woodcutting,
                        Quarrying: action.payload.attributes.Quarrying,
                        "Clan Boost": action.payload.attributes.Clan_Boost,
                    }
                }
            })
    }
})

export const { setBattling, addBattling, setDungeoneering, setMining, setWoodcutting, setQuarrying, setRunecrafting, setJewelcrafting, setHerblore, setAttribute, addAttribute, setSkillXP, addSkillXP } = SkillDataSlice.actions

export default SkillDataSlice.reducer;
