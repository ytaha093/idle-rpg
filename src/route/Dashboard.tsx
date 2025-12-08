import Header from "../components/game/Header"
import logo from "../assets/banner.png"
import { useState } from "react"
import ExperenceBar from "../components/game/ExperenceBar"
import CollapsibleBox from "../components/game/CollapsibleBox"


function Dashboard() {

  const [view, setView] = useState("Home")

  return (
    <>
      <Header></Header>
      < div className="w-[1250px] min-h-[calc(100dvh-28px)] px-16.5 m-auto" >
        <div data-section="main content" className=" shadow-[10px_15px_20px_-5px_rgb(0_0_0/0.3),3px_8px_10px_0px_rgb(0_0_0/0.3)]">

          <div data-section="banner" className="w-full bg-black border-0 border-stone-800 border-x-0 border-t-0">
            <img src={logo} alt="" className="w-8/10 mx-auto" />
          </div>

          <div data-section="main buttons" className="w-full flex gap-[-10px] text-center">
            {["Home", "Invintory", "Market", "Battling", "Dungeons", "Gathering", "Crafting", "Land", "Clans"].map((name) => {
              return <div key={name} className={`bg-grey1 border border-stone-800 flex-1 hover:bg-grey2 hover:cursor-pointer ${view === name ? "text-rsgreen hover:text-rsgreenlight" : "hover:text-white"}`} onClick={() => setView(name)}>{name}</div>
            })}
          </div>

          <ExperenceBar activeSkill={true} skill="" />

          <CollapsibleBox boxName="test"></CollapsibleBox>

        </div>
      </div>
    </>
  )
}

export default Dashboard
