import Header from "../components/game/Header"
import logo from "../assets/banner.png"
import { useState } from "react"
import ExperienceBar from "../components/game/ExperienceBar"
import CollapsibleBox from "../components/game/CollapsibleBoxes/CollapsibleBox"
import { getTotalLevel } from "../util/LevelCalcUtil"
import AttributesBox from "../components/game/CollapsibleBoxes/AttributesBox"
import BonusBox from "../components/game/CollapsibleBoxes/BonusBox"
import LogBox from "../components/game/CollapsibleBoxes/LogBox"
import EquipmentCombatBox from "../components/game/CollapsibleBoxes/EquipmentCombatBox"
import EquipmentGatheringBox from "../components/game/CollapsibleBoxes/EquipmentGatheringBox"


function Dashboard() {

  const [view, setView] = useState("Home")

  return (
    <>
      <Header></Header>
      < div className="max-w-[1250px] min-h-[calc(100dvh-28px)] px-16.5 p- m-auto max-[1250px]:px-1 max-[1250px]:max-w-[1126px]" >
        <div data-section="main content" className=" shadow-[10px_15px_20px_-5px_rgb(0_0_0/0.3),3px_8px_10px_0px_rgb(0_0_0/0.3)]">

          <div data-section="banner" className="w-full bg-black border-0 border-stone-800 border-x-0 border-t-0">
            <img src={logo} alt="" className="w-8/10 mx-auto" />
          </div>

          <div data-section="main buttons" className="w-full flex gap-[-10px] text-center">
            {["Home", "Inventory", "Market", "Battling", "Dungeons", "Gathering", "Crafting", "Land", "Clans"].map((name) => {
              return <div key={name} className={`bg-grey1 border border-stone-800 flex-1 hover:bg-grey2 hover:cursor-pointer ${view === name ? "text-rsgreen hover:text-rsgreenlight" : "hover:text-white"}`} onClick={() => setView(name)}>{name}</div>
            })}
          </div>

          <ExperienceBar data-section="active xp bar" activeSkill={true} />

          <div className="flex bg-grey1">
            <div data-section="left sidebar" className="w-2/10">
              <CollapsibleBox boxName="Attributes">
                <AttributesBox />
              </CollapsibleBox>

              <CollapsibleBox boxName="Skills">
                <ExperienceBar skill="Battling" />
                <ExperienceBar skill="Dungeoneering" />
                <ExperienceBar skill="Mining" />
                <ExperienceBar skill="Woodcutting" />
                <ExperienceBar skill="Quarrying" />
                <ExperienceBar skill="Runecrafting" />
                <ExperienceBar skill="Jewelcrafting" />
                <ExperienceBar skill="Herblore" />
                <div className="font-pixel text-base text-neutral-400">Total Level: <span className="text-rsgreen">{getTotalLevel()}</span></div>
              </CollapsibleBox>
            </div>

            <div data-section="main content" className=" w-6/10">

            </div>

            <div data-section="right sidebar" className="w-2/10">
              <CollapsibleBox boxName="Combat Equipment">
                <EquipmentCombatBox />
              </CollapsibleBox>
              <CollapsibleBox boxName="Gathering Equipment">
                <EquipmentGatheringBox />
              </CollapsibleBox>
              <CollapsibleBox boxName="Action Bonus">
                <BonusBox />
              </CollapsibleBox>
              <CollapsibleBox boxName="Log">
                <LogBox />
              </CollapsibleBox>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard
