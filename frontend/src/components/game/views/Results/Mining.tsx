import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"
import CurrentResults from "./CurrentResults";

const Mining = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);

  return (
    <div className="flex flex-col items-center ">

      <div className="font-pixel text-center mt-1">You swing your pickaxe...</div>
      <div className="text-xs mt-1">
        <CurrentResults />
      </div>


      <div className="mt-6 text-sm font-inter">
        <div className="font-pixel font-semibold text-center mb-1">Your Items</div>

        <ul className="text-[0.8rem] space-y-0.5 min-w-50">
          <li className="flex justify-between gap-4">
            <ItemTag item="Metal" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Metal).toLocaleString()})</span>
          </li>

          <li className="flex justify-between gap-4">
            <ItemTag item="GemFragment" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.GemFragment).toLocaleString()})</span>
          </li>


          <li className="flex justify-between gap-4">
            <ItemTag item="Ruby" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Ruby).toLocaleString()})</span>
          </li>

          <li className="flex justify-between gap-4">
            <ItemTag item="Diamond" />
            <span className="text-greywhitedim font-semibold">({playerInventory.Diamond.toLocaleString()})</span>
          </li>



          <li className="flex justify-between gap-4">
            <ItemTag item="Dragonstone" />
            <span className="text-greywhitedim font-semibold">({playerInventory.Dragonstone.toLocaleString()})</span>
          </li>


          <li className="flex justify-between gap-4">
            <ItemTag item="Onyx" />
            <span className="text-greywhitedim font-semibold">({playerInventory.Onyx.toLocaleString()})</span>
          </li>
        </ul>

      </div>

      <div className="mt-6 font-inter">
        <div className="font-pixel font-semibold text-sm text-center mb-px">Action tracker</div>

        <ul className="text-[0.8rem]/4.5 min-w-40">
          <li className="flex justify-between gap-4">
            <span className="font-inter">Total Actions</span>
            <span className="text-rsgreendim font-semibold">{(0).toLocaleString()}</span>
          </li>

          <li className="flex justify-between gap-4">
            <span>Resources Gained</span>
            <span className="text-rsgreendim font-semibold">{(0).toLocaleString()}</span>
          </li>

          <li>
            <div className="text-greywhitedim font-semibold text-center w-full">({(0).toLocaleString()} per hour)</div>
          </li>
        </ul>

        <div className="flex justify-center mt-1">
          <div className="text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c] w-fit" >
            <span className="text-greywhite">[</span>Reset<span className="text-greywhite">]</span>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Mining;
