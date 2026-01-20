import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"

const Mining = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);

  return (
<div className="flex flex-col items-center">

  <p className="font-pixel text-sm text-center mt-4">
    You swing your pickaxe...
  </p>

  <div className="mt-10">
    <h2 className="font-pixel text-lg font-bold text-center underline decoration-solid mb-2">
      Your Items
    </h2>

    <ul className="font-pixel text-sm mx-auto w-fit space-y-1">
      <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
        <span className="flex items-center gap-1">
          <ItemTag item="Metal" />
        </span>
        <span className="text-right tabular-nums">
          {playerInventory.Metal}
        </span>
      </li>

      <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
        <span className="flex items-center gap-1">
          <ItemTag item="GemFragment" />
        </span>
        <span className="text-right tabular-nums">
          {playerInventory.GemFragment}
        </span>
      </li>

      <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
        <span className="flex items-center gap-1">
          <ItemTag item="Sapphire" />
        </span>
        <span className="text-right tabular-nums">
          {playerInventory.Sapphire}
        </span>
      </li>

      <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
        <span className="flex items-center gap-1">
          <ItemTag item="Ruby" />
        </span>
        <span className="text-right tabular-nums">
          {playerInventory.Ruby}
        </span>
      </li>

      <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
        <span className="flex items-center gap-1">
          <ItemTag item="Emerald" />
        </span>
        <span className="text-right tabular-nums">
          {playerInventory.Emerald}
        </span>
      </li>



      <li className="grid grid-cols-[max-content_1fr] gap-4 items-center w-64">
        <span className="flex items-center gap-1">
          <ItemTag item="Diamond" />
        </span>
        <span className="text-right tabular-nums">
          {playerInventory.Diamond}
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

export default Mining;
