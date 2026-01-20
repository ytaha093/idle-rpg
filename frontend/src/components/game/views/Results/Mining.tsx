import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"

const Mining = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);
  return (
    <div>
      <h1 className="font-pixel text-2xl text-center mb-2">Current Action</h1>
      <p className="font-pixel text-sm">You swing your pickaxe...</p>
      <div className="mt-10 text-center">
        <h3 className="font-pixel text-lg">Your Items: </h3>
        <ul className="font-pixel text-sm">
          <li className="font-pixel text-sm">
            <ItemTag item="Metal" />: {playerInventory.Metal}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="GemFragment" />: {playerInventory.GemFragment}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="Ruby" /> : {playerInventory.Ruby}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="Diamond" /> : {playerInventory.Diamond}
          </li>
        </ul>
      </div>
      <div className="mt-10 text-center">
        <h3 className="font-pixel text-lg">Action tracker: </h3>
      </div>
    </div>
  );
};

export default Mining;
