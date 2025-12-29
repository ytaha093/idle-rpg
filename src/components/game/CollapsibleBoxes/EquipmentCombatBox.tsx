import EquipmentTag from "../Tags/EquipmentTag"

function EquipmentCombatBox() {
    return (
        <>
            <EquipmentTag item="MainWeapon" />
            <EquipmentTag item="OffWeapon" />
            <EquipmentTag item="Helm" />
            <EquipmentTag item="Armor" />
            <EquipmentTag item="Gauntlets" />
            <EquipmentTag item="Legs" />
            <EquipmentTag item="Boots" />
        </>
    )
}

export default EquipmentCombatBox