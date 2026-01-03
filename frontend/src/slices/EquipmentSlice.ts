import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { hydrateUser } from "./AuthSlice"

export type ArmorSlot =
    | "Helm"
    | "Armor"
    | "Gauntlets"
    | "Legs"
    | "Boots"

export type WeaponSlot =
    | "MainWeapon"
    | "OffWeapon"

export type ToolSlot =
    | "Pickaxe"
    | "Hatchet"
    | "Hammer"

export type EquipmentSlot = ToolSlot | WeaponSlot | ArmorSlot

export type EquipData = { level: number; quality: number };

export type EquipmentState = Record<EquipmentSlot, EquipData>;

const defaultEquip: EquipData = { level: 1, quality: 1 };

const initialState: EquipmentState = {
    MainWeapon: { ...defaultEquip },
    OffWeapon: { ...defaultEquip },
    Helm: { ...defaultEquip },
    Armor: { ...defaultEquip },
    Gauntlets: { ...defaultEquip },
    Legs: { ...defaultEquip },
    Boots: { ...defaultEquip },
    Pickaxe: { ...defaultEquip },
    Hatchet: { ...defaultEquip },
    Hammer: { ...defaultEquip },
};

const equipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {
        setEquipment(state, action: PayloadAction<{ slot: EquipmentSlot; data: EquipData }>) {
            state[action.payload.slot] = action.payload.data;
        },
        upgradeLevel(state, action: PayloadAction<{ slot: EquipmentSlot; by?: number }>) {
            state[action.payload.slot].level += action.payload.by ?? 1;
        },
        upgradeQuality(state, action: PayloadAction<{ slot: EquipmentSlot; by?: number }>) {
            state[action.payload.slot].quality += action.payload.by ?? 1;
        },
        resetEquipment: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(hydrateUser.fulfilled, (state, action) => {
            if (action.payload.equipment) {
                const equip = action.payload.equipment;
                state.MainWeapon = { level: equip.MainWeaponLevel, quality: equip.MainWeaponQuality };
                state.OffWeapon = { level: equip.OffWeaponLevel, quality: equip.OffWeaponQuality };
                state.Helm = { level: equip.HelmLevel, quality: equip.HelmQuality };
                state.Armor = { level: equip.ArmorLevel, quality: equip.ArmorQuality };
                state.Gauntlets = { level: equip.GauntletsLevel, quality: equip.GauntletsQuality };
                state.Legs = { level: equip.LegsLevel, quality: equip.LegsQuality };
                state.Boots = { level: equip.BootsLevel, quality: equip.BootsQuality };
                state.Pickaxe = { level: equip.PickaxeLevel, quality: equip.PickaxeQuality };
                state.Hatchet = { level: equip.HatchetLevel, quality: equip.HatchetQuality };
                state.Hammer = { level: equip.HammerLevel, quality: equip.HammerQuality };
            }
        });
    }
});

export const { setEquipment, upgradeLevel, upgradeQuality, resetEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
// ...existing code...