import type { ArmorSlot, ToolSlot } from "../slices/EquipmentSlice"

const metalTypes = ['Bronze', 'Iron', 'Steel', 'Mithril', 'Adamant', 'Rune', 'Dragon', 'Infernal', 'Crystal']

const swordTypes = ['Sword', 'Longsword', 'Scimitar']

const toolTyles = ['Worn', '', "Tempered"]

const armorTypes = ['Worn', '', "Full"]

export function getWeaponName(level: number) {
    if (level >= 1 && level <= 27) {
        const metal = metalTypes[Math.floor((level - 1) / 3)]
        const type = swordTypes[(level - 1) % 3]
        return `${metal} ${type}`
    } else if (level == 28) {
        return "Abyssal Whip"
    } else if (level == 29) {
        return "Twisted Bow"
    } else return "ERROR invalid weapon level"
}

export function getArmorName(level: number, peice: ArmorSlot) {
    if (level >= 1 && level <= 27) {
        const metal = metalTypes[Math.floor((level - 1) / 3)]
        const type = armorTypes[(level - 1) % 3]
        return `${type} ${metal} ${peice}`
    } else if (level == 28) {
        return `Barrows ${peice}`
    } else if (level == 29) {
        return `Celestial ${peice}`
    } else return "ERROR invalid weapon level"
}

export function getToolName(level: number, tool: ToolSlot) {
    if (level >= 1 && level <= 27) {
        const metal = metalTypes[Math.floor((level - 1) / 3)]
        const type = toolTyles[(level - 1) % 3]
        return `${type} ${metal} ${tool}`
    } else if (level == 28) {
        return `Infernal ${tool}`
    } else if (level == 29) {
        return `Crystal ${tool}`
    } else return "ERROR invalid weapon level"
}