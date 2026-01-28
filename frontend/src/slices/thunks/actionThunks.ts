import { createAsyncThunk } from "@reduxjs/toolkit"
import { addAttribute, addSkillXP, type AttributeName } from "../SkillsDataSlice"
import type { ItemId } from "../../util/Descriptions/Items";
import { log, setBonusData, setTraining } from "../PlayerDataSlice";
import { addItem } from "../inventorySlice";
import { setLastResults } from "../UIDataSlice";

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
    item: { itemId: ItemId, amount: number, log: boolean }[],
    actionBonus: { bonusProgress: number, bonusCap: number, triggerBonus: boolean, bonusItem: { itemId: ItemId, amount: number } | null },
    attribute: { attribute: string, amount: number } | null
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
            dispatch(log({ type: "item", item: item.itemId as ItemId, itemAmount: item.amount }))
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
        dispatch(addAttribute({ name: data.attribute.attribute.replace("_", " ") as AttributeName, value: 1 }))
        dispatch(log({ type: "attribute", text: data.attribute.attribute }))
    }
    // set current results
    if (data.actionBonus.bonusItem) data.item.push({ itemId: data.actionBonus.bonusItem.itemId, amount: data.actionBonus.bonusItem.amount, log: false })
    dispatch(setLastResults({ xp: { skill: data.xp.skill, amount: data.xp.amount }, items: data.item, attribute: data.attribute }))
})