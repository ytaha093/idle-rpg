import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"

const Mining = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);

  return (
    <div className="flex flex-col items-center ">

      <div className="font-pixel text-center mt-1">You swing your pickaxe...</div>
      <div className="text-xs mt-1">
        <div className="font">+364 <span className="text-[#bff] font-pixel">[Mining Exp]</span></div>
        <div className="font">+102 <ItemTag item="Metal" /></div>
        <div className="font">+1 <ItemTag item="Ruby" /></div>
      </div>


      <div className="mt-6 text-sm font-inter">
        <div className="font-pixel font-semibold text-center mb-1">Your Items</div>

        <ul className="text-[0.8rem] space-y-0.5 min-w-50">
          <li className="flex justify-between gap-4">
            <ItemTag item="Metal" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Metal + 4118867).toLocaleString()})</span>
          </li>

          <li className="flex justify-between gap-4">
            <ItemTag item="GemFragment" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.GemFragment + 225256).toLocaleString()})</span>
          </li>


          <li className="flex justify-between gap-4">
            <ItemTag item="Ruby" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Ruby + 21).toLocaleString()})</span>
          </li>

          <li className="flex justify-between gap-4">
            <ItemTag item="Diamond" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Diamond + 2).toLocaleString()})</span>
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
            <span className="text-rsgreendim font-semibold">{(8).toLocaleString()}</span>
          </li>

          <li className="flex justify-between gap-4">
            <span>Resources Gained</span>
            <span className="text-rsgreendim font-semibold">{(625).toLocaleString()}</span>
          </li>

          <li>
            <div className="text-greywhitedim font-semibold text-center w-full">({(46305).toLocaleString()} per hour)</div>
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
