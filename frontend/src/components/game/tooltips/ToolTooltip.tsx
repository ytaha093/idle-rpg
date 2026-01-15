import type { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { hammerIcon, hatchetIcon, pickaxeIcon } from "../../../assets/icons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { getToolName } from "../../../util/EquipmentCalcUtils";

function ToolTooltip({
  children,
  item,
}: {
  children: ReactNode;
  item: "Hammer" | "Pickaxe" | "Hatchet";
}) {
  const equipment = useSelector(
    (state: RootState) => state.EquipmentData[item]
  );

  function getIcon(name: string) {
    switch (name) {
      case "Hammer":
        return hammerIcon;
      case "Pickaxe":
        return pickaxeIcon;
      case "Hatchet":
        return hatchetIcon;
    }
  }
  function getMaterial(name: string) {
    switch (name) {
      case "Hammer":
        return "Stone";
      case "Pickaxe":
        return "Metal";
      case "Hatchet":
        return "Wood";
    }
  }
  function getSkill(name: string) {
    switch (name) {
      case "Hammer":
        return "Quarrying";
      case "Pickaxe":
        return "Mining";
      case "Hatchet":
        return "Woodcutting";
    }
  }

  const content = (
    <div className=" text-left max-w-90 font-inter relative">
      <div className="font-pixel flex gap-1 text-sm hover:cursor-pointer hover:bg-grey2 transition-all duration-100">
        <div className="text-rsgreen text-left text-[0.8rem]/5">
          {equipment.quality}
        </div>
        <div className="font-semibold">
          {getToolName(equipment.quality, item)}
        </div>
        <div>
          [<span className="text-rsgreen font-semibold">{equipment.level}</span>
          ]
        </div>
      </div>
      <div>+2% {getMaterial(item)}</div>
      <div>+2% {getSkill(item)} Exp</div>
      <div>+2% {getSkill(item)} Loot</div>

      <img
        src={getIcon(item)}
        alt=""
        className="absolute bottom-0 right-0 h-7"
      />
    </div>
  );

  return (
    <>
      <Tooltip content={content}>{children}</Tooltip>
    </>
  );
}

export default ToolTooltip;
