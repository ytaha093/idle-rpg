import Home from "./views/Home"
import Inventory from "./views/Inventory"
import Market from "./views/Market"
import Battling from "./views/Battling"
import Dungeons from "./views/Dungeons"
import Gathering from "./views/Gathering"
import Crafting from "./views/Crafting"
import Land from "./views/Land"
import Clans from "./views/Clans"
import Woodcutting from "./views/Results/Woodcutting"
import Quarrying from "./views/Results/Quarrying"
import Mining from "./views/Results/Mining"
import { useDispatch } from "react-redux"
import { setCurrentView, setLastResults } from "../../slices/UIDataSlice"
import { setActiveAction, setActiveSkill } from "../../slices/PlayerDataSlice"
import type { SkillName } from "../../slices/SkillsDataSlice"

function GameContent({ view }: { view: string }) {
  const dispatch = useDispatch()

  function startAction(name: SkillName, view: string, action: { action: string, options: string }) {
    dispatch(setLastResults(null))
    dispatch(setActiveSkill(name))
    dispatch(setActiveAction({ action: action.action, options: action.options }))
    dispatch(setCurrentView(`Gathering ${name}`))
  }

  function stopAction() {
    dispatch(setActiveAction({ action: "", options: "" }))
  }


  return (
    <div className="mx-1 h-full flex flex-col">
      <div className="text-center bg-linear-0 from-grey2 to-grey1 border-stone-800 border font-pixel text-xs leading-5 p-px [word-spacing:-2px]">
        <span>Quick Links: </span>
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]">Battling</span>
        <span> - </span>
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => startAction("Mining", "Gathering Mining", { action: "Gathering", options: "Mining" })}>Mining</span>
        <span> - </span>
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => startAction("Woodcutting", "Gathering Woodcutting", { action: "Gathering", options: "Woodcutting" })}>Woodcutting</span>
        <span> - </span>
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => startAction("Quarrying", "Gathering Quarrying", { action: "Gathering", options: "Quarrying" })}>Quarrying</span>
        <span> - </span>
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={stopAction}>Stop Action</span>
      </div>

      <div className={` bg-black border border-stone-800 border-t-0 grow py-1 px-1.5`}>
        {view == ("Home") && <Home />}
        {view == ("Inventory") && <Inventory />}
        {view == ("Market") && <Market />}
        {view == ("Battling") && <Battling />}
        {view == ("Dungeons") && <Dungeons />}
        {view == ("Gathering") && <Gathering />}
        {view == ("Crafting") && <Crafting />}
        {view == ("Land") && <Land />}
        {view == ("Clans") && <Clans />}
        {view == ("Gathering Mining") && <Mining />}
        {view == ("Gathering Woodcutting") && <Woodcutting />}
        {view == ("Gathering Quarrying") && <Quarrying />}
      </div>
    </div>
  )
}

export default GameContent;
