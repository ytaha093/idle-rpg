import { useSelector } from "react-redux"
import type { RootState } from "../../../../store"
import ItemTag from "../../Tags/ItemTag"

const Quarrying = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);
  return (
    <div>
      <h1 className="font-pixel text-2xl text-center mb-2">Current Action</h1>
      <p className="font-pixel text-sm">You swing your hammer...</p>
      <div className="mt-10 text-center">
        <h3 className="font-pixel text-lg">Your Items: </h3>
        <ul className="font-pixel text-sm">
          <li className="font-pixel text-sm">
            <ItemTag item="Stone" />: {playerInventory.Stone}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="Sandstone" />: {playerInventory.Sandstone}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="Marble" /> : {playerInventory.Marble}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="Malachite" /> : {playerInventory.Malachite}
          </li>
        </ul>
      </div>
      <div className="mt-10 text-center">
        <h3 className="font-pixel text-lg">Action tracker: </h3>
      </div>
    </div>
  );
};

export default Quarrying;
