import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"

const Woodcutting = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);
  return (
    <div className="flex flex-col items-center">
      <p className="font-pixel text-sm text-center mt-4">
        You swing your hatchet...
      </p>

      <div className="mt-10">
        <h2 className="font-pixel text-lg font-bold text-center underline decoration-solid mb-2">
          Your Items
        </h2>

        <ul className="font-pixel text-sm mx-auto w-fit space-y-1">
          <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
            <span className="flex items-center gap-1">
              <ItemTag item="Wood" />
            </span>
            <span className="text-right tabular-nums">
              {playerInventory.Wood}
            </span>
          </li>

          <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
            <span className="flex items-center gap-1">
              <ItemTag item="TreeSap" />
            </span>
            <span className="text-right tabular-nums">
              {playerInventory.TreeSap}
            </span>
          </li>

          <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
            <span className="flex items-center gap-1">
              <ItemTag item="BirdsNest" />
            </span>
            <span className="text-right tabular-nums">
              {playerInventory.BirdsNest}
            </span>
          </li>

          <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
            <span className="flex items-center gap-1">
              <ItemTag item="GoldenEgg" />
            </span>
            <span className="text-right tabular-nums">
              {playerInventory.GoldenEgg}
            </span>
          </li>
        </ul>
      </div>

      <div className="font-pixel text-sm mx-auto w-fit space-y-1">
        <h3 className="font-pixel font-bold text-center underline decoration-solid text-lg">
          Action tracker
        </h3>

        <div className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
          <div className="flex items-center gap-1">
            Total actions
          </div>
          <div className="text-right tabular-nums">
            0
          </div>
        </div>

        <div className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
          <div className="flex items-center gap-1">
            Resources Gained
          </div>
          <div className="text-right tabular-nums">
            0
          </div>
        </div>
      </div>
      <div className="font-pixel items-center m-4">
        <button className="text-sm cursor-pointer hover:text-gray-700">[Reset]</button>
      </div>
    </div>
  );
};

export default Woodcutting;
