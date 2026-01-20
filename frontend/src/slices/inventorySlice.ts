import { createSlice } from "@reduxjs/toolkit"
import type { ItemId } from "../util/Descriptions/Items"
import type { PayloadAction } from "@reduxjs/toolkit"
import { hydrateUser } from "./AuthSlice"

type InventoryState = Record<ItemId, number>

const initialState: InventoryState = {
    // Currency
    Gold: 0,
    Credits: 0,
    DungeoneeringTokens: 0,
    GatheringSkillShard: 0,
    ArtisanShard: 0,
    ResourceCache: 0,

    // Materials
    Metal: 0,
    Wood: 0,
    Stone: 0,

    // Components
    WeaponComponent: 0,
    ArmorComponent: 0,
    ToolComponent: 0,
    GemFragment: 0,
    RunicLeather: 0,

    // Gems
    Ruby: 0,
    Diamond: 0,
    Dragonstone: 0,
    Onyx: 0,

    // Stones
    Sandstone: 0,
    Marble: 0,
    Malachite: 0,

    // Runes
    RuneOfLesserFocus: 0,
    RuneOfAdeptFocus: 0,
    RuneOfGreaterFocus: 0,
    RuneOfTheWarrior: 0,
    RuneOfTheGladiator: 0,
    RuneOfTheLegend: 0,
    RuneOfTheWarlord: 0,
    GreaterRuneOfTheWarlord: 0,

    // Dungeon keys
    GoblinCaveKey: 0,
    TrollStrongholdKey: 0,
    BarrowsTombKey: 0,
    DemonicRuinsKey: 0,
    DragonLairKey: 0,
    GodWarsKey: 0,
    AncientVaultKey: 0,

    // Alchemy ingredients
    TreeSap: 0,
    SpiderEgg: 0,
    BoneMeal: 0,
    AlchemicalDust: 0,
    VialOfTrollBlood: 0,
    UndeadHeart: 0,
    BirdsNest: 0,
    AlchemicEssence: 0,
    GoldenEgg: 0,
    DemonicDust: 0,
}

const inventorySlice = createSlice({
    name: "inventory data",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<{ id: ItemId; amount: number }>) {
            state[action.payload.id] += action.payload.amount
        },
        removeItem(state, action: PayloadAction<{ id: ItemId; amount: number }>) {
            state[action.payload.id] = Math.max(
                0,
                state[action.payload.id] - action.payload.amount
            )
        },
        setItemAmount(state, action: PayloadAction<{ id: ItemId; amount: number }>) {
            state[action.payload.id] = action.payload.amount
        },
    },
    extraReducers: (builder) => {
        builder.addCase(hydrateUser.fulfilled, (state, action) => {
            if (action.payload.inventory && Array.isArray(action.payload.inventory)) {
                // Reset to initial state first
                Object.keys(state).forEach(key => {
                    state[key as ItemId] = 0;
                })
                // Populate from inventory items
                action.payload.inventory.forEach((item: any) => {
                    state[item.itemId as ItemId] = item.amount;
                })
            }
        })
    }
})

export const { addItem, removeItem, setItemAmount } = inventorySlice.actions

export default inventorySlice.reducer
