import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EquipmentSlot =
    | "MainWeapon"
    | "OffWeapon"
    | "Helm"
    | "Armor"
    | "Gauntlets"
    | "Boots"
    | "Axe"
    | "Pickaxe"
    | "Hatchet";

export type EquipData = { level: number; quality: number };

export type EquipmentState = Record<EquipmentSlot, EquipData>;

const defaultEquip: EquipData = { level: 1, quality: 0 };

const initialState: EquipmentState = {
    MainWeapon: { ...defaultEquip },
    OffWeapon: { ...defaultEquip },
    Helm: { ...defaultEquip },
    Armor: { ...defaultEquip },
    Gauntlets: { ...defaultEquip },
    Boots: { ...defaultEquip },
    Axe: { ...defaultEquip },
    Pickaxe: { ...defaultEquip },
    Hatchet: { ...defaultEquip },
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
});

export const { setEquipment, upgradeLevel, upgradeQuality, resetEquipment } = equipmentSlice.actions;
export default equipmentSlice.reducer;
// ...existing code...