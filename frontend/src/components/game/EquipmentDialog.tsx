import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { setEquitmentPopup } from "../../slices/UIDataSlice";
import { useEffect } from "react";
import type {
  ArmorSlot,
  EquipmentSlot,
  ToolSlot,
  WeaponSlot,
} from "../../slices/EquipmentSlice";
import {
  getArmorName,
  getToolName,
  getWeaponName,
} from "../../util/EquipmentCalcUtils";
import {
  swordIcon,
  helmetIcon,
  armorIcon,
  gauntletsIcon,
  legsIcon,
  bootsIcon,
  hammerIcon,
  hatchetIcon,
  pickaxeIcon,
} from "../../assets/icons";
import ItemTag from "./Tags/ItemTag";
import type { ItemId } from "../../util/Descriptions/Items";

function EquipmentDialog({ item }: { item: EquipmentSlot | null }) {
  if (item == null) {
    return <></>;
  }

  const equipment = useSelector(
    (state: RootState) => state.EquipmentData[item]
  );
  const armorComponent = useSelector(
    (state: RootState) => state.invData.ArmorComponent
  );
  const weaponComponent = useSelector(
    (state: RootState) => state.invData.WeaponComponent
  );
  const toolComponent = useSelector(
    (state: RootState) => state.invData.ToolComponent
  );
  const gold = useSelector((state: RootState) => state.invData.Gold);
  const { wood, stone, metal } = useSelector((state: RootState) => ({
    wood: state.invData.Wood,
    stone: state.invData.Stone,
    metal: state.invData.Metal,
  }));
  const dispatch = useDispatch();

  async function fadeOutAndClose() {
    const modal = document.querySelector(".animate-scaleInFast") as HTMLElement;
    const bg = document.querySelector(".animate-fadeInFast") as HTMLElement;
    bg?.classList.add("animate-fadeOutFast");
    modal?.classList.add("animate-scaleOutFast");
    await new Promise((resolve) => setTimeout(resolve, 200));
    dispatch(setEquitmentPopup(null));
  }

  // Close on Escape key
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        fadeOutAndClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item]);

  const TOOL_SLOTS = ["Pickaxe", "Hatchet", "Hammer"];
  const EQUIPMENT_SLOTS = [
    "MainWeapon",
    "OffWeapon",
    "Helm",
    "Armor",
    "Gauntlets",
    "Legs",
    "Boots",
  ];

  function isToolSlot(item: string): item is ToolSlot {
    return TOOL_SLOTS.includes(item as ToolSlot);
  }

  function isEquipmentSlot(item: string): item is ArmorSlot | WeaponSlot {
    return EQUIPMENT_SLOTS.includes(item);
  }

  function getIcon(name: string) {
    switch (name) {
      case "MainWeapon":
        return swordIcon;
      case "OffWeapon":
        return swordIcon;
      case "Helm":
        return helmetIcon;
      case "Armor":
        return armorIcon;
      case "Gauntlets":
        return gauntletsIcon;
      case "Legs":
        return legsIcon;
      case "Boots":
        return bootsIcon;
      case "Hammer":
        return hammerIcon;
      case "Pickaxe":
        return pickaxeIcon;
      case "Hatchet":
        return hatchetIcon;
    }
  }

  function getToolInfo(tool: ToolSlot) {
    switch (tool) {
      case "Pickaxe":
        return { skill: "Mining", material: "Metal", ammount: metal };
      case "Hatchet":
        return { skill: "Woodcutting", material: "Wood", ammount: wood };
      case "Hammer":
        return { skill: "Quarrying", material: "Stone", ammount: stone };
    }
  }

  let header;
  let content;

  // dialog for weapons / armor
  if (isEquipmentSlot(item)) {
    const isWeapon = item.includes("Weapon");
    const name = isWeapon
      ? getWeaponName(equipment.quality)
      : getArmorName(equipment.quality, item as ArmorSlot);

    const goldCost = 590000;
    const armorCost = 590000;
    const canUpgradeLevel = gold >= goldCost;

    const armor = 12;
    const totalArmor = 13;

    const componentCost = 1000;
    const canUpgradeType = isWeapon
      ? weaponComponent >= componentCost
      : armorComponent >= componentCost;

    header = (
      <>
        <div className="font-pixel flex items-center gap-1 text-sm px-4 py-3  ">
          <img src={getIcon(item)} className="absolute left-3" />
          <div className="text-rsgreen text-left text-[0.9rem] px-0.5">
            {equipment.quality}
          </div>
          <div className="font-semibold text-base">{name}</div>
          <div>
            [
            <span className="text-rsgreen font-semibold">
              {equipment.level}
            </span>
            ]
          </div>
        </div>
      </>
    );
    content = (
      <>
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col">
            <span>{isWeapon ? "Power:" : "Armor:"}</span>
            <span>Modifier:</span>
            <span>{isWeapon ? "Total Power:" : "Total Armor:"}</span>
          </div>
          <div className="flex flex-col">
            <span>{armor.toLocaleString()}</span>
            <span>3%</span>
            <span className="text-rsgreen font-medium">
              {totalArmor.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="w-full flex gap-2 mt-1">
          <div className="text-xs p-1.5 border border-grey5 bg-grey1 rounded flex flex-col flex-1 justify-center  items-center">
            <div className="flex items-center gap-1 text-xs">
              <div className="text-rsgreen text-left text-[0.7rem]">
                {equipment.quality}
              </div>
              <div className="text-xs">{name}</div>
              <div>
                [
                <span className="text-rsgreen font-semibold ">
                  {equipment.level + 1}
                </span>
                ]
              </div>
            </div>
            <span>
              {isWeapon ? "Power:" : "Armor:"} {armorCost.toLocaleString()}
            </span>

            <div className="mt-1.5">
              <ItemTag item={"Gold"} />
              <span
                className={`pl-0.5 ${
                  canUpgradeLevel
                    ? "text-rsgreenlight"
                    : "text-red font-semibold"
                }`}
              >
                {goldCost.toLocaleString()}
              </span>
            </div>

            <button
              className={`rounded border-2 ${
                canUpgradeLevel
                  ? "bg-[#5a7e26] border-[#3a5218] hover:bg-[#72A22F] hover:cursor-pointer"
                  : " text-greywhitedim bg-[#243310] border-[#111707] hover:cursor-not-allowed"
              }  px-2 py-1 mt-0.5`}
            >
              Upgrade Level
            </button>
          </div>

          <div className="text-xs p-1.5 border border-grey5 bg-grey1 rounded flex flex-col flex-1 justify-center  items-center">
            <div className="flex items-center gap-1 text-xs">
              <div className="text-rsgreen text-left text-[0.7rem]">
                {equipment.quality + 1}
              </div>
              <div className="text-xs">
                {isWeapon
                  ? getWeaponName(equipment.quality + 1)
                  : getArmorName(equipment.quality + 1, item as ArmorSlot)}
              </div>
              <div>
                [
                <span className="text-rsgreen font-semibold ">
                  {equipment.level}
                </span>
                ]
              </div>
            </div>
            <span>Modifier: 6%</span>

            <div className="mt-1.5">
              <ItemTag item={isWeapon ? "WeaponComponent" : "ArmorComponent"} />
              <span
                className={`pl-0.5 ${
                  canUpgradeType
                    ? "text-rsgreenlight"
                    : "text-red font-semibold"
                }`}
              >
                {componentCost.toLocaleString()}
              </span>
            </div>

            <button
              className={`rounded border-2 ${
                canUpgradeType
                  ? "bg-[#5a7e26] border-[#3a5218] hover:bg-[#72A22F] hover:cursor-pointer"
                  : " text-greywhitedim bg-[#243310] border-[#111707] hover:cursor-not-allowed"
              }  px-2 py-1 mt-0.5`}
            >
              Upgrade Type
            </button>
          </div>
        </div>
      </>
    );

    // dialog for tools
  } else if (isToolSlot(item)) {
    const name = getToolName(equipment.quality, item);
    const { skill, material, ammount } = getToolInfo(item);

    const materialCost = 100;
    const canUpgradeLevel = ammount >= materialCost;

    const componentCost = 1;
    const canUpgradeType = toolComponent >= componentCost;

    header = (
      <>
        <div className="font-pixel flex items-center gap-1 text-sm px-4 py-3  ">
          <img src={getIcon(item)} className="absolute left-3" />
          <div className="text-rsgreen text-left text-[0.9rem] px-0.5">
            {equipment.quality}
          </div>
          <div className="font-semibold text-base">{name}</div>
          <div>
            [
            <span className="text-rsgreen font-semibold">
              {equipment.level}
            </span>
            ]
          </div>
        </div>
      </>
    );
    content = (
      <>
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col">
            <span>+2% {material}</span>
            <span>+2% {skill} Exp</span>
            <span>+2% {skill} Loot</span>
          </div>
        </div>

        <div className="w-full flex gap-2 mt-1">
          <div className="text-xs py-2 px-1 border border-grey5 bg-grey1 rounded flex flex-col flex-1 justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-1 text-xs">
                <div className="text-rsgreen text-left text-[0.7rem]">
                  {equipment.quality}
                </div>
                <div className="text-xs">{name}</div>
                <div>
                  [
                  <span className="text-rsgreen font-semibold ">
                    {equipment.level + 1}
                  </span>
                  ]
                </div>
              </div>
              <span>+4% {material}</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="mt-1.5">
                <ItemTag item={material as ItemId} />
                <span
                  className={`pl-0.5 ${
                    canUpgradeLevel
                      ? "text-rsgreenlight"
                      : "text-red font-semibold"
                  }`}
                >
                  {materialCost.toLocaleString()}
                </span>
              </div>

              <button
                className={`rounded border-2 ${
                  canUpgradeLevel
                    ? "bg-[#5a7e26] border-[#3a5218] hover:bg-[#72A22F] hover:cursor-pointer"
                    : " text-greywhitedim bg-[#243310] border-[#111707] hover:cursor-not-allowed"
                }  px-2 py-1 mt-0.5`}
              >
                Upgrade Level
              </button>
            </div>
          </div>

          <div className="text-xs py-2 px-1 border border-grey5 bg-grey1 rounded flex flex-col flex-1 justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center gap-1 text-xs">
                <div className="text-rsgreen text-left text-[0.7rem]">
                  {equipment.quality + 1}
                </div>
                <div className="text-xs">
                  {getToolName(equipment.quality + 1, item)}
                </div>
                <div>
                  [
                  <span className="text-rsgreen font-semibold ">
                    {equipment.level}
                  </span>
                  ]
                </div>
              </div>
              <span>+4% {skill} XP</span>
              <span>+4% {skill} Loot</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="mt-1.5">
                <ItemTag item={"ToolComponent"} />
                <span
                  className={`pl-0.5 ${
                    canUpgradeType
                      ? "text-rsgreenlight"
                      : "text-red font-semibold"
                  }`}
                >
                  {componentCost.toLocaleString()}
                </span>
              </div>

              <button
                className={`rounded border-2 ${
                  canUpgradeType
                    ? "bg-[#5a7e26] border-[#3a5218] hover:bg-[#72A22F] hover:cursor-pointer"
                    : " text-greywhitedim bg-[#243310] border-[#111707] hover:cursor-not-allowed"
                }  px-2 py-1 mt-0.5`}
              >
                Upgrade Type
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {item && (
        /* BG Overlay */
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black animate-fadeInFast opacity-60"
            onClick={() => fadeOutAndClose()}
          />
          {/* Modal */}
          <div className="relative z-10 animate-scaleInFast w-3/10">
            <div className=" text-left bg-grey2 text-sm shadow-lg">
              <header className=" bg-grey3 border-[#373737] border-b flex justify-center text-lg font-bold font-pixel">
                {header}
                <button
                  className=" absolute top-px right-0 mb-3 px-3 text-[#AAAAAA] hover:text-[#DDDDDD] hover:cursor-pointer font-pixelold text-xl"
                  onClick={fadeOutAndClose}
                >
                  x
                </button>
              </header>

              <div className="px-2 pt-2 pb-2.5 ">{content}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EquipmentDialog;
