import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { getArmorName, getWeaponName } from "../../../util/EquipmentCalcUtils"
import { armorIcon, bootsIcon, gauntletsIcon, helmetIcon, legsIcon, swordIcon } from "../../../assets/icons"
import EquipmentTooltip from "../tooltips/EquipmentTooltip"
import { setEquitmentPopup } from "../../../slices/UIDataSlice"
import type { ArmorSlot, WeaponSlot } from "../../../slices/EquipmentSlice"


function EquipmentTag({ item }: { item: ArmorSlot | WeaponSlot }) {

    const equipment = useSelector((state: RootState) => state.EquipmentData[item])
    const dispatch = useDispatch()
    const name = item.includes("Weapon") ? getWeaponName(equipment.quality) : getArmorName(equipment.quality, item as ArmorSlot)

    function getIcon(name: string) {
        switch (name) {
            case "MainWeapon": return swordIcon
            case "OffWeapon": return swordIcon
            case "Helm": return helmetIcon
            case "Armor": return armorIcon
            case "Gauntlets": return gauntletsIcon
            case "Legs": return legsIcon
            case "Boots": return bootsIcon
        }
    }

    return (
        <EquipmentTooltip item={item}>
            <div onClick={() => dispatch(setEquitmentPopup(item))} className="flex justify-between px-0.5 text-xs hover:cursor-pointer hover:bg-grey2 transition-all duration-100 h-4">
                <div className="flex items-center">
                    <img src={getIcon(item)} alt="" className="h-9/10" />
                    <div className="text-rsgreen text-left text-[0.7rem] px-0.5">{equipment.quality}</div>
                    <div>{name}</div>
                </div>
                <div>[<span className="text-rsgreen font-semibold ">{equipment.level}</span>]</div>
            </div>
        </EquipmentTooltip>
    )
}

export default EquipmentTag