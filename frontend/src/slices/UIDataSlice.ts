import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ItemId } from "../util/Descriptions/Items";
import type { EquipmentSlot, ToolSlot } from "./EquipmentSlice";
import { hydrateUser, logoutUser } from "./thunks/authThunk";

type logType = "item" | "attribute" | "text" | "level"
type logEntry = { time?: string, type: logType, text?: string, text2?: string, item?: ItemId, itemAmount?: number, textRarity?: number }

type lastResultsType = {
    xp: { skill: string, amount: number },
    items: { itemId: ItemId, amount: number }[],
    attribute: { attribute: string } | null,
    battleData?: {
        win: boolean,
        player: { maxHP: number, currentHP: number, playerDamage: number, playerHits: number, playerMisses: number, playerDodges: number },
        mob: { maxHP: number, currentHP: number, mobDamage: number, mobHits: number, mobMisses: number, mobName: string }
    }
} | null

type chatLog = {
    sender: { name: string, id: number },
    message: string,
    time: string
}

const initialState = {
    equitmentPopup: null as EquipmentSlot | ToolSlot | null,
    itemPopup: null as ItemId | null,
    currentView: "Home",
    lastResults: null as lastResultsType,
    log: [] as logEntry[],
    lastMob: 1,
    chatLog: [] as chatLog[]
}

const UIDataSlice = createSlice({
    name: "UIData",
    initialState: initialState,
    reducers: {
        setItemPopup(state, action) {
            state.itemPopup = action.payload
        },
        setCurrentView(state, action) {
            state.currentView = action.payload
        },
        setEquitmentPopup(state, action) {
            state.equitmentPopup = action.payload
        },
        setLastResults(state, action: PayloadAction<lastResultsType>) {
            state.lastResults = action.payload
        },
        log: (state, action: { type: string, payload: logEntry }) => {
            state.log.unshift({
                time: new Date().toLocaleTimeString("en-GB"),
                type: action.payload.type,
                text: action.payload.text,
                text2: action.payload.text2,
                item: action.payload.item,
                itemAmount: action.payload.itemAmount,
                textRarity: action.payload.textRarity
            })
        },
        clearLog: (state) => {
            state.log = [];
        },
        setLastMob: (state, action: PayloadAction<number>) => {
            state.lastMob = action.payload
        },
        addChat: (state, action: { type: string, payload: chatLog }) => {
            state.chatLog.push({
                time: new Date().toLocaleTimeString("en-GB"),
                message: action.payload.message,
                sender: {
                    name: action.payload.sender.name,
                    id: action.payload.sender.id
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, () => initialState)
            .addCase(hydrateUser.fulfilled, (state, action) => {
                state.lastMob = action.payload.stats.lastMobId
            })
    }
})

export const { setItemPopup, setCurrentView, setEquitmentPopup, setLastResults, log, clearLog, setLastMob, addChat } = UIDataSlice.actions
export default UIDataSlice.reducer