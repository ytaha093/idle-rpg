import type { ArmorSlot, ToolSlot } from "../slices/EquipmentSlice"

const metalTypes = ['Bronze', 'Iron', 'Steel', 'Mithril', 'Adamant', 'Rune', 'Dragon', 'Infernal', 'Crystal']

const swordTypes = ['Sword', 'Longsword', 'Scimitar']

const toolTyles = ['Worn', '', "Tempered"]

const armorTypes = ['Worn', '', "Full"]

export function getWeaponName(level: number) {
    level = level + 1
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
    level = level + 1
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
    level = level + 1
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

export function getPower(equipmentLevel: number): number {
    const equipment = equipmentIndex[equipmentLevel]
    return equipment ? equipment.power : 0
}

export function getModifier(modifierLevel: number): number {
    const modifier = equipmentModifierIndex[modifierLevel]
    return modifier ? modifier.modifier : 0
}

export function getTotalPower(equipmentLevel: number, modifierLevel: number): number {
    const equipment = equipmentIndex[equipmentLevel]
    const modifier = equipmentModifierIndex[modifierLevel]

    if (!equipment || !modifier) {
        return 0
    }

    return Math.round(equipment.power * (1 + modifier.modifier / 100))
}

export function getEquipmentUpgradeCost(equipmentLevel: number): number {
    const equipment = equipmentIndex[equipmentLevel]
    return equipment ? equipment.goldCost : 0
}

export function getWeaponUpgradeCost(modifierLevel: number): number {
    const modifier = equipmentModifierIndex[modifierLevel]
    return modifier ? modifier.weaponComp : 0
}

export function getArmorUpgradeCost(modifierLevel: number): number {
    const modifier = equipmentModifierIndex[modifierLevel]
    return modifier ? modifier.armorComp : 0
}

export const equipmentModifierIndex = [
    { level: 0, weaponComp: 0, armorComp: 0, modifier: 0.0 },
    { level: 1, weaponComp: 3, armorComp: 1, modifier: 3.0 },
    { level: 2, weaponComp: 5, armorComp: 2, modifier: 6.1 },
    { level: 3, weaponComp: 10, armorComp: 4, modifier: 9.3 },
    { level: 4, weaponComp: 20, armorComp: 8, modifier: 12.6 },
    { level: 5, weaponComp: 40, armorComp: 16, modifier: 15.9 },
    { level: 6, weaponComp: 60, armorComp: 24, modifier: 19.4 },
    { level: 7, weaponComp: 100, armorComp: 40, modifier: 23.0 },
    { level: 8, weaponComp: 140, armorComp: 56, modifier: 26.7 },
    { level: 9, weaponComp: 220, armorComp: 88, modifier: 30.5 },
    { level: 10, weaponComp: 300, armorComp: 120, modifier: 34.4 },
    { level: 11, weaponComp: 460, armorComp: 184, modifier: 38.4 },
    { level: 12, weaponComp: 620, armorComp: 248, modifier: 42.6 },
    { level: 13, weaponComp: 940, armorComp: 376, modifier: 46.9 },
    { level: 14, weaponComp: 1260, armorComp: 504, modifier: 51.3 },
    { level: 15, weaponComp: 1900, armorComp: 760, modifier: 55.8 },
    { level: 16, weaponComp: 2540, armorComp: 1016, modifier: 60.5 },
    { level: 17, weaponComp: 3820, armorComp: 1528, modifier: 65.3 },
    { level: 18, weaponComp: 5100, armorComp: 2040, modifier: 70.2 },
    { level: 19, weaponComp: 7660, armorComp: 3064, modifier: 75.4 },
    { level: 20, weaponComp: 10220, armorComp: 4088, modifier: 80.6 },
    { level: 21, weaponComp: 15340, armorComp: 6136, modifier: 86.0 },
    { level: 22, weaponComp: 20460, armorComp: 8184, modifier: 91.6 },
    { level: 23, weaponComp: 30700, armorComp: 12280, modifier: 97.4 },
    { level: 24, weaponComp: 40940, armorComp: 16376, modifier: 103.3 },
    { level: 25, weaponComp: 61420, armorComp: 24568, modifier: 109.4 },
    { level: 26, weaponComp: 81900, armorComp: 32760, modifier: 115.7 },
    { level: 27, weaponComp: 122860, armorComp: 49144, modifier: 122.2 },
    { level: 28, weaponComp: 163820, armorComp: 65528, modifier: 129.0 },
]

export const equipmentIndex = [
    { level: 0, power: 0, goldCost: 0 },
    { level: 1, power: 4, goldCost: 64 },
    { level: 2, power: 8, goldCost: 87 },
    { level: 3, power: 12, goldCost: 142 },
    { level: 4, power: 16, goldCost: 228 },
    { level: 5, power: 21, goldCost: 347 },
    { level: 6, power: 26, goldCost: 500 },
    { level: 7, power: 31, goldCost: 692 },
    { level: 8, power: 36, goldCost: 924 },
    { level: 9, power: 41, goldCost: 1200 },
    { level: 10, power: 47, goldCost: 1525 },
    { level: 11, power: 53, goldCost: 1903 },
    { level: 12, power: 59, goldCost: 2337 },
    { level: 13, power: 65, goldCost: 2834 },
    { level: 14, power: 71, goldCost: 3389 },
    { level: 15, power: 78, goldCost: 4037 },
    { level: 16, power: 85, goldCost: 4755 },
    { level: 17, power: 92, goldCost: 5560 },
    { level: 18, power: 99, goldCost: 6459 },
    { level: 19, power: 107, goldCost: 7459 },
    { level: 20, power: 115, goldCost: 8570 },
    { level: 21, power: 123, goldCost: 9799 },
    { level: 22, power: 132, goldCost: 11158 },
    { level: 23, power: 141, goldCost: 12656 },
    { level: 24, power: 150, goldCost: 14304 },
    { level: 25, power: 160, goldCost: 16114 },
    { level: 26, power: 170, goldCost: 18099 },
    { level: 27, power: 180, goldCost: 20272 },
    { level: 28, power: 190, goldCost: 22648 },
    { level: 29, power: 201, goldCost: 25243 },
    { level: 30, power: 213, goldCost: 28072 },
    { level: 31, power: 225, goldCost: 31154 },
    { level: 32, power: 237, goldCost: 34507 },
    { level: 33, power: 250, goldCost: 38152 },
    { level: 34, power: 263, goldCost: 42111 },
    { level: 35, power: 276, goldCost: 46405 },
    { level: 36, power: 290, goldCost: 51060 },
    { level: 37, power: 305, goldCost: 56101 },
    { level: 38, power: 320, goldCost: 61557 },
    { level: 39, power: 336, goldCost: 67457 },
    { level: 40, power: 352, goldCost: 73832 },
    { level: 41, power: 369, goldCost: 80717 },
    { level: 42, power: 386, goldCost: 88147 },
    { level: 43, power: 404, goldCost: 96161 },
    { level: 44, power: 422, goldCost: 104798 },
    { level: 45, power: 442, goldCost: 114102 },
    { level: 46, power: 462, goldCost: 124120 },
    { level: 47, power: 482, goldCost: 134899 },
    { level: 48, power: 504, goldCost: 146493 },
    { level: 49, power: 526, goldCost: 158956 },
    { level: 50, power: 548, goldCost: 172347 },
    { level: 51, power: 572, goldCost: 186730 },
    { level: 52, power: 596, goldCost: 202169 },
    { level: 53, power: 622, goldCost: 218737 },
    { level: 54, power: 648, goldCost: 236508 },
    { level: 55, power: 675, goldCost: 255563 },
    { level: 56, power: 703, goldCost: 275985 },
    { level: 57, power: 732, goldCost: 297864 },
    { level: 58, power: 762, goldCost: 321298 },
    { level: 59, power: 793, goldCost: 346386 },
    { level: 60, power: 825, goldCost: 373237 },
    { level: 61, power: 858, goldCost: 401965 },
    { level: 62, power: 892, goldCost: 432692 },
    { level: 63, power: 927, goldCost: 465546 },
    { level: 64, power: 964, goldCost: 500664 },
    { level: 65, power: 1002, goldCost: 538191 },
    { level: 66, power: 1041, goldCost: 578281 },
    { level: 67, power: 1081, goldCost: 621097 },
    { level: 68, power: 1123, goldCost: 666812 },
    { level: 69, power: 1166, goldCost: 715610 },
    { level: 70, power: 1210, goldCost: 767684 },
    { level: 71, power: 1256, goldCost: 823242 },
    { level: 72, power: 1304, goldCost: 882500 },
    { level: 73, power: 1353, goldCost: 945693 },
    { level: 74, power: 1404, goldCost: 1013063 },
    { level: 75, power: 1456, goldCost: 1084872 },
    { level: 76, power: 1510, goldCost: 1161396 },
    { level: 77, power: 1566, goldCost: 1242925 },
    { level: 78, power: 1624, goldCost: 1329769 },
    { level: 79, power: 1684, goldCost: 1422256 },
    { level: 80, power: 1746, goldCost: 1520732 },
    { level: 81, power: 1809, goldCost: 1625565 },
    { level: 82, power: 1875, goldCost: 1737142 },
    { level: 83, power: 1943, goldCost: 1855877 },
    { level: 84, power: 2013, goldCost: 1982205 },
    { level: 85, power: 2086, goldCost: 2116586 },
    { level: 86, power: 2161, goldCost: 2259509 },
    { level: 87, power: 2238, goldCost: 2411834 },
    { level: 88, power: 2316, goldCost: 2569336 },
    { level: 89, power: 2394, goldCost: 2731844 },
    { level: 90, power: 2473, goldCost: 2899361 },
    { level: 91, power: 2553, goldCost: 3071889 },
    { level: 92, power: 2633, goldCost: 3249433 },
    { level: 93, power: 2714, goldCost: 3431996 },
    { level: 94, power: 2796, goldCost: 3619581 },
    { level: 95, power: 2878, goldCost: 3812194 },
    { level: 96, power: 2961, goldCost: 4009838 },
    { level: 97, power: 3045, goldCost: 4212516 },
    { level: 98, power: 3129, goldCost: 4420234 },
    { level: 99, power: 3214, goldCost: 4632995 },
    { level: 100, power: 3300, goldCost: 4850804 },
    { level: 101, power: 3386, goldCost: 5073665 },
    { level: 102, power: 3473, goldCost: 5301582 },
    { level: 103, power: 3561, goldCost: 5534560 },
    { level: 104, power: 3649, goldCost: 5772604 },
    { level: 105, power: 3738, goldCost: 6015718 },
    { level: 106, power: 3828, goldCost: 6263906 },
    { level: 107, power: 3918, goldCost: 6517173 },
    { level: 108, power: 4009, goldCost: 6775525 },
    { level: 109, power: 4101, goldCost: 7038965 },
    { level: 110, power: 4193, goldCost: 7307498 },
    { level: 111, power: 4286, goldCost: 7581130 },
    { level: 112, power: 4380, goldCost: 7859865 },
    { level: 113, power: 4474, goldCost: 8143708 },
    { level: 114, power: 4569, goldCost: 8432664 },
    { level: 115, power: 4665, goldCost: 8726737 },
    { level: 116, power: 4761, goldCost: 9025934 },
    { level: 117, power: 4858, goldCost: 9330258 },
    { level: 118, power: 4956, goldCost: 9639716 },
    { level: 119, power: 5054, goldCost: 9954311 },
    { level: 120, power: 5153, goldCost: 10274050 },
    { level: 121, power: 5253, goldCost: 10598936 },
    { level: 122, power: 5353, goldCost: 10598936 },
    { level: 123, power: 5454, goldCost: 11264175 },
    { level: 124, power: 5556, goldCost: 11604537 },
    { level: 125, power: 5658, goldCost: 11950069 },
    { level: 126, power: 5761, goldCost: 12300774 },
    { level: 127, power: 5865, goldCost: 12656659 },
    { level: 128, power: 5969, goldCost: 13017730 },
    { level: 129, power: 6074, goldCost: 13383990 },
    { level: 130, power: 6180, goldCost: 13755446 },
    { level: 131, power: 6286, goldCost: 14132102 },
    { level: 132, power: 6393, goldCost: 14513965 },
    { level: 133, power: 6501, goldCost: 14901040 },
    { level: 134, power: 6609, goldCost: 15293332 },
    { level: 135, power: 6718, goldCost: 15690847 },
    { level: 136, power: 6828, goldCost: 16093590 },
    { level: 137, power: 6938, goldCost: 16501566 },
    { level: 138, power: 7049, goldCost: 16914782 },
    { level: 139, power: 7161, goldCost: 17333242 },
    { level: 140, power: 7273, goldCost: 17756953 },
    { level: 141, power: 7386, goldCost: 18185919 },
    { level: 142, power: 7500, goldCost: 18620147 },
    { level: 143, power: 7614, goldCost: 19059642 },
    { level: 144, power: 7729, goldCost: 19504410 },
    { level: 145, power: 7845, goldCost: 19954456 },
    { level: 146, power: 7961, goldCost: 20409786 },
    { level: 147, power: 8078, goldCost: 20870406 },
    { level: 148, power: 8196, goldCost: 21336321 },
    { level: 149, power: 8314, goldCost: 21807537 },
    { level: 150, power: 8433, goldCost: 22284061 },
    { level: 151, power: 8553, goldCost: 22765897 },
    { level: 152, power: 8673, goldCost: 23253051 },
    { level: 153, power: 8794, goldCost: 23745529 },
    { level: 154, power: 8916, goldCost: 24243338 },
    { level: 155, power: 9038, goldCost: 24746482 },
    { level: 156, power: 9161, goldCost: 25254968 },
    { level: 157, power: 9285, goldCost: 25768802 },
    { level: 158, power: 9409, goldCost: 26287989 },
    { level: 159, power: 9534, goldCost: 26812535 },
    { level: 160, power: 9660, goldCost: 27342447 },
    { level: 161, power: 9786, goldCost: 27877729 },
    { level: 162, power: 9913, goldCost: 28418389 },
    { level: 163, power: 10041, goldCost: 28964431 },
    { level: 164, power: 10169, goldCost: 29515862 },
    { level: 165, power: 10298, goldCost: 30072688 },
    { level: 166, power: 10428, goldCost: 30634915 },
    { level: 167, power: 10558, goldCost: 31202549 },
    { level: 168, power: 10689, goldCost: 31775596 },
    { level: 169, power: 10821, goldCost: 32354061 },
    { level: 170, power: 10953, goldCost: 32937952 },
    { level: 171, power: 11086, goldCost: 33527273 },
    { level: 172, power: 11220, goldCost: 34122031 },
    { level: 173, power: 11354, goldCost: 34722233 },
    { level: 174, power: 11489, goldCost: 35327883 },
    { level: 175, power: 11625, goldCost: 35938989 },
    { level: 176, power: 11761, goldCost: 36555556 },
    { level: 177, power: 11898, goldCost: 37177591 },
    { level: 178, power: 12036, goldCost: 37805099 },
    { level: 179, power: 12174, goldCost: 38438087 },
    { level: 180, power: 12313, goldCost: 39076561 },
    { level: 181, power: 12453, goldCost: 39720527 },
    { level: 182, power: 12593, goldCost: 40369992 },
    { level: 183, power: 12734, goldCost: 41024960 },
    { level: 184, power: 12876, goldCost: 41685440 },
    { level: 185, power: 13018, goldCost: 42351436 },
    { level: 186, power: 13161, goldCost: 43022956 },
    { level: 187, power: 13305, goldCost: 43700005 },
    { level: 188, power: 13449, goldCost: 44382589 },
    { level: 189, power: 13594, goldCost: 45070716 },
    { level: 190, power: 13740, goldCost: 45764390 },
    { level: 191, power: 13886, goldCost: 46463619 },
    { level: 192, power: 14033, goldCost: 47168409 },
    { level: 193, power: 14181, goldCost: 47878766 },
    { level: 194, power: 14329, goldCost: 48585619 },
    { level: 195, power: 14478, goldCost: 49316206 },
    { level: 196, power: 14628, goldCost: 50043302 },
    { level: 197, power: 14778, goldCost: 50775991 },
    { level: 198, power: 14929, goldCost: 51514278 },
    { level: 199, power: 15081, goldCost: 52258170 },
    { level: 200, power: 15233, goldCost: 53007674 },
]