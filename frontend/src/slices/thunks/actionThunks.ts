import { createAsyncThunk } from "@reduxjs/toolkit"
import { addAttribute, addSkillXP, type AttributeName } from "../SkillsDataSlice"
import type { ItemId } from "../../util/Descriptions/Items"
import { setBonusData, setCurrentEnergy, setTraining } from "../PlayerDataSlice"
import { addItem, removeItem } from "../inventorySlice"
import { log, setLastResults } from "../UIDataSlice"
import { setEquipment, type EquipmentSlot } from "../EquipmentSlice"


export const executeAction = createAsyncThunk("actions/execute", async (action: { action: string; options: string }, { dispatch }) => {
    if (action.action === "Gathering") {
        dispatch(gather(action.options as GatherTypes))
    } else if (action.action === "Battling") {
        dispatch(battle(parseInt(action.options)))
    }
})

type energyResponse = { energy: number }

export const refillEnergy = createAsyncThunk<void>("action/refillEnergy", async (_, { dispatch }) => {
    const response = await fetch("/api/action/refill-energy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    })
    if (!response.ok) {
        return console.error("Failed to refill energy")
    }

    const data = await response.json() as energyResponse
    dispatch(setCurrentEnergy(data.energy))
})

type upgradeResponse = {
    equipment: EquipmentSlot, level: number, quality: number,
    item: { itemId: ItemId, amount: number }[],
}

export const upgradeEquipment = createAsyncThunk<void, { equipment: EquipmentSlot, type: "level" | "quality" }>("action/upgradeEquipment", async ({ equipment, type }, { dispatch }) => {
    const response = await fetch("/api/action/upgrade-equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ equipment, type })
    })
    if (!response.ok) {
        return console.error("Failed to upgrade equipment")
    }

    const data = await response.json() as upgradeResponse
    dispatch(setEquipment({ slot: data.equipment, data: { level: data.level, quality: data.quality } }))
    data.item.forEach(item => {
        dispatch(removeItem({ id: item.itemId, amount: item.amount }))
    })
})


export const setAttribute = createAsyncThunk<void, { newAttribute: AttributeName }>("action/setAttribute", async ({ newAttribute }, { dispatch }) => {
    const response = await fetch("/api/action/train-attribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ attribute: newAttribute.replace(" ", "_") }),
    })
    if (!response.ok) {
        return console.error("Failed to set attribute")
    }
    dispatch(setTraining(newAttribute))
})

export type GatherTypes = "Mining" | "Woodcutting" | "Quarrying"

type gatherResponse = {
    xp: { amount: number, skill: GatherTypes, levelUp: boolean, level: number | false },
    item: { itemId: ItemId, amount: number, log: boolean, text?: string, rarity?: number }[],
    actionBonus: { bonusProgress: number, bonusCap: number, triggerBonus: boolean, bonusItem: { itemId: ItemId, amount: number } | null },
    attribute: { attribute: string, amount: number } | null,
    energyRemaining: number
}

export const gather = createAsyncThunk<void, GatherTypes, { rejectValue: string }>("action/gather", async (type, { dispatch }) => {
    const response = await fetch("/api/action/gathering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: type }),
    })

    if (!response.ok) {
        return console.error("Action failed:", response)
    }

    const data = await response.json() as gatherResponse

    // update xp and log level up if needed
    dispatch(addSkillXP({ name: data.xp.skill, value: data.xp.amount }))
    if (data.xp.levelUp) dispatch(log({ type: "level", text: data.xp.skill, text2: (data.xp.level as number).toString() }))
    // update item drops
    data.item.forEach(item => {
        dispatch(addItem({ id: item.itemId, amount: item.amount }))
        if (item.log) {
            dispatch(log({ type: "item", item: item.itemId, itemAmount: item.amount, text: item.text, textRarity: item.rarity }))
        }
    })
    // update action bonus
    dispatch(setBonusData({ bonusProgress: data.actionBonus.bonusProgress, bonusCap: data.actionBonus.bonusCap }))
    if (data.actionBonus.triggerBonus && data.actionBonus.bonusItem) {
        dispatch(addItem({ id: data.actionBonus.bonusItem.itemId, amount: data.actionBonus.bonusItem.amount }))
        dispatch(log({ type: "item", text: `Action Bonus: `, item: data.actionBonus.bonusItem.itemId, itemAmount: data.actionBonus.bonusItem.amount }))
    }
    // update attribute if amy
    if (data.attribute) {
        dispatch(addAttribute({ name: data.attribute.attribute as AttributeName, value: 1 }))
        dispatch(log({ type: "attribute", text: data.attribute.attribute }))
    }
    // set current results
    if (data.actionBonus.bonusItem) data.item.push({ itemId: data.actionBonus.bonusItem.itemId, amount: data.actionBonus.bonusItem.amount, log: false })
    dispatch(setLastResults({ xp: { skill: data.xp.skill, amount: data.xp.amount }, items: data.item, attribute: data.attribute }))
    dispatch(setCurrentEnergy(data.energyRemaining))
})

type battleResponse = {
    xp: { amount: number, skill: GatherTypes, levelUp: boolean, level: number | false },
    item: { itemId: ItemId, amount: number, log: boolean, text?: string, rarity?: number }[],
    actionBonus: { bonusProgress: number, bonusCap: number, triggerBonus: boolean, bonusItem: { itemId: ItemId, amount: number } | null },
    attribute: { attribute: string, amount: number } | null,
    energyRemaining: number,
    battleData: {
        win: boolean,
        player: { maxHP: number, currentHP: number, playerDamage: number, playerHits: number, playerMisses: number, playerDodges: number },
        mob: { maxHP: number, currentHP: number, mobDamage: number, mobHits: number, mobMisses: number, mobName: string }
    }
}

export const battle = createAsyncThunk<void, number, { rejectValue: string }>("action/battle", async (mobID, { dispatch }) => {
    const response = await fetch("/api/action/battling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mobID: mobID }),
    })

    if (!response.ok) {
        return console.error("Action failed:", response)
    }

    const data = await response.json() as battleResponse

    // update xp and log level up if needed
    dispatch(addSkillXP({ name: data.xp.skill, value: data.xp.amount }))
    if (data.xp.levelUp) dispatch(log({ type: "level", text: data.xp.skill, text2: (data.xp.level as number).toString() }))
    // update item drops
    data.item.forEach(item => {
        dispatch(addItem({ id: item.itemId, amount: item.amount }))
        if (item.log) {
            dispatch(log({ type: "item", item: item.itemId, itemAmount: item.amount, text: item.text, textRarity: item.rarity }))
        }
    })
    // update action bonus
    dispatch(setBonusData({ bonusProgress: data.actionBonus.bonusProgress, bonusCap: data.actionBonus.bonusCap }))
    if (data.actionBonus.triggerBonus && data.actionBonus.bonusItem) {
        dispatch(addItem({ id: data.actionBonus.bonusItem.itemId, amount: data.actionBonus.bonusItem.amount }))
        dispatch(log({ type: "item", text: `Action Bonus: `, item: data.actionBonus.bonusItem.itemId, itemAmount: data.actionBonus.bonusItem.amount }))
    }
    // update attribute if amy
    if (data.attribute) {
        dispatch(addAttribute({ name: data.attribute.attribute as AttributeName, value: 1 }))
        dispatch(log({ type: "attribute", text: data.attribute.attribute }))
    }
    // set current results
    if (data.actionBonus.bonusItem) data.item.push({ itemId: data.actionBonus.bonusItem.itemId, amount: data.actionBonus.bonusItem.amount, log: false })
    dispatch(setLastResults({ xp: { skill: data.xp.skill, amount: data.xp.amount }, items: data.item, attribute: data.attribute, battleData: data.battleData }))
    dispatch(setCurrentEnergy(data.energyRemaining))
})