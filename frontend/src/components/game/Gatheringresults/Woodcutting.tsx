import React from "react";
import ItemTag from "../Tags/ItemTag";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const Woodcutting = () => {
  const playerInventory = useSelector((state: RootState) => state.invData);
  return (
    <div>
      <h1 className="font-pixel text-2xl text-center mb-2">Current Action</h1>
      <p className="font-pixel text-sm">You swing your hammer...</p>
      <div className="mt-10 text-center">
        <h3 className="font-pixel text-lg">Your Items: </h3>
        <ul className="font-pixel text-sm">
          <li className="font-pixel text-sm">
            <ItemTag item="Wood" />: {playerInventory.Wood}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="TreeSap" />: {playerInventory.TreeSap}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="BirdsNest" /> : {playerInventory.BirdsNest}
          </li>
          <li className="font-pixel text-sm">
            <ItemTag item="GoldenEgg" /> : {playerInventory.GoldenEgg}
          </li>
        </ul>
      </div>
      <div className="mt-10 text-center">
        <h3 className="font-pixel text-lg">Action tracker: </h3>
      </div>
    </div>
  );
};

export default Woodcutting;
