import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"

const Quarrying = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);
  return (
    <div className="flex flex-col items-center ">

      <div className="font-pixel text-center mt-1">You swing your Hammer...</div>
      <div className="text-xs mt-1">
        <div className="font">+364 <span className="text-[#bff] font-pixel">[Quarrying Exp]</span></div>
        <div className="font">+102 <ItemTag item="Stone" /></div>
        <div className="font">+1 <ItemTag item="Sandstone" /></div>
      </div>


      <div className="mt-6 text-sm font-inter">
        <div className="font-pixel font-semibold text-center mb-1">Your Items</div>

        <ul className="text-[0.8rem] space-y-0.5 min-w-50">
          <li className="flex justify-between gap-4">
            <ItemTag item="Stone" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Stone).toLocaleString()})</span>
          </li>

          <li className="flex justify-between gap-4">
            <ItemTag item="Sandstone" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Sandstone).toLocaleString()})</span>
          </li>

          <li className="flex justify-between gap-4">
            <ItemTag item="Marble" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Marble).toLocaleString()})</span>
          </li>


          <li className="flex justify-between gap-4">
            <ItemTag item="Malachite" />
            <span className="text-greywhitedim font-semibold">({(playerInventory.Malachite).toLocaleString()})</span>
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
};

export default Quarrying;
