import type { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { swordIcon, helmetIcon, armorIcon, gauntletsIcon, legsIcon, bootsIcon, } from "../../../assets/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { getArmorName, getWeaponName } from "../../../util/EquipmentCalcUtils";

function EquipmentTooltip({ children, item, }: { children: ReactNode, item: "MainWeapon" | "OffWeapon" | "Helm" | "Armor" | "Gauntlets" | "Legs" | "Boots" }) {
  const equipment = useSelector((state: RootState) => state.EquipmentData[item])
  const name = item == "MainWeapon" || item == "OffWeapon" ? getWeaponName(equipment.quality) : getArmorName(equipment.quality, item);

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

  // Placeholder values... replace them with states stuff later
  //Bug: Values dont push out box size correctly
  const power = 12
  const modifier = 3
  const total = Math.ceil(((modifier / 100) + 1) * power)

  const content = (
    <div className=" text-left max-w-90 font-inter relative">
      <div className="font-pixel flex gap-1 text-sm hover:cursor-pointer hover:bg-grey2 transition-all duration-100">
        <div className="text-rsgreen text-left text-[0.8rem]/5">
          {equipment.quality.toLocaleString()}
        </div>
        <div className="font-semibold">{name}</div>
        <div>
          [<span className="text-rsgreen font-semibold">{equipment.level.toLocaleString()}</span>]
        </div>
      </div>
      <div>
        {item.includes("Weapon") ? "Power" : "Armor"}: {power.toLocaleString()}{" "}
        (<span className="text-rsgreen font-semibold">{total.toLocaleString()}</span>)
      </div>
      <div>Modifier: {modifier.toLocaleString()}%</div>
      <img src={getIcon(item)} alt="" className="absolute bottom-0 right-0 h-7" />
    </div>
  );

  return (
    <>
      <Tooltip content={content}>{children}</Tooltip>
    </>
  );
}

export default EquipmentTooltip;
