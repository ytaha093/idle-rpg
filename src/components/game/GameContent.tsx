import Home from './Home'
import Inventory from './Inventory'
import Market from './Market'
import Battling from './Battling'
import Dungeons from './Dungeons'
import Gathering from './Gathering'
import Crafting from './Crafting'
import Land from './Land'
import Clans from './Clans'

function GameContent({ view }: { view: string }) {

    return (
        <div className="mx-1 h-full flex flex-col">
            <div className="text-center font-p bg-linear-0 from-grey2 to-grey1 border-stone-800 border font-pixel text-sm">
                Quick Links:
                <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]"> Battle Hill Giant</span> -
                <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]"> Mining</span> -
                <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]"> Woodcutting</span> -
                <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]"> Quarrying</span> -
                <span className="hover:cursor-pointer text-[#7ae] hover:text-[#58c]"> Stop Action</span>
                <span className="text-base" />
            </div>


            <div className={` bg-black border border-stone-800 border-t-0 grow py-1 px-1.5`}>
                {view.includes("Home") && <Home />}
                {view.includes("Inventory") && <Inventory />}
                {view.includes("Market") && <Market />}
                {view.includes("Battling") && <Battling />}
                {view.includes("Dungeons") && <Dungeons />}
                {view.includes("Gathering") && <Gathering />}
                {view.includes("Crafting") && <Crafting />}
                {view.includes("Land") && <Land />}
                {view.includes("Clans") && <Clans />}
            </div>

        </div>
    )
}

export default GameContent