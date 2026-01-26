import { createAsyncThunk } from "@reduxjs/toolkit"
import type { AttributeName } from "../SkillsDataSlice"
import type { ItemId } from "../../util/Descriptions/Items";

export const setAttribute = createAsyncThunk<{ attribute: AttributeName }, { newAttribute: AttributeName; oldAttribute: AttributeName }, { rejectValue: AttributeName }>
    ("action/setAttribute", async ({ newAttribute, oldAttribute }, { rejectWithValue }) => {
        //dispatch(setTraining(newAttribute))
        const response = await fetch("/api/action/train-attribute", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ attribute: newAttribute.replace(" ", "_") }),
        })
        if (!response.ok) {
            return rejectWithValue(oldAttribute);
        }
        return { attribute: newAttribute }
    }
    )

export type GatherTypes = "Mining" | "Woodcutting" | "Quarrying"

type gatherResponce = { xp: { xp: number, skill: GatherTypes }, item: Array<{ itemId: ItemId, amount: number }> }

export const gather = createAsyncThunk<gatherResponce, GatherTypes, { rejectValue: string }>("action/gather", async (type, { rejectWithValue }) => {
    const response = await fetch("/api/action/gathering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: type }),
    })

    if (!response.ok) {
        return rejectWithValue(await response.json())
    }

    return await response.json()
}
)