import Home from "./views/Home";
import Inventory from "./views/Inventory";
import Market from "./views/Market";
import Battling from "./views/Battling";
import Dungeons from "./views/Dungeons";
import Gathering from "./views/Gathering";
import Crafting from "./views/Crafting";
import Land from "./views/Land";
import Clans from "./views/Clans";
import Mining from "./Gatheringresults/Mining";
import Woodcutting from "./Gatheringresults/Woodcutting";
import Quarrying from "./Gatheringresults/Quarrying";

function GameContent({ view }: { view: string }) {
  console.log("GameContent view: ", view);
  return (
    <div className="mx-1 h-full flex flex-col">
      <div className="text-center bg-linear-0 from-grey2 to-grey1 border-stone-800 border font-pixel text-xs leading-5 p-px [word-spacing:-2px]">
        Quick Links:
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]">
          {" "}
          Battling
        </span>{" "}
        -
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]">
          {" "}
          Mining
        </span>{" "}
        -
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]">
          {" "}
          Woodcutting
        </span>{" "}
        -
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]">
          {" "}
          Quarrying
        </span>{" "}
        -
        <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]">
          {" "}
          Stop Action
        </span>
      </div>

      <div
        className={` bg-black border border-stone-800 border-t-0 grow py-1 px-1.5`}
      >
        {view.includes("Home") && <Home />}
        {view.includes("Inventory") && <Inventory />}
        {view.includes("Market") && <Market />}
        {view.includes("Battling") && <Battling />}
        {view.includes("Dungeons") && <Dungeons />}
        {view.includes("Gathering") && <Gathering />}
        {view.includes("Crafting") && <Crafting />}
        {view.includes("Land") && <Land />}
        {view.includes("Clans") && <Clans />}

        {view.includes("Mining") && <Mining />}
        {view.includes("Woodcutting") && <Woodcutting />}
        {view.includes("Quarrying") && <Quarrying />}
      </div>
    </div>
  );
}

export default GameContent;
