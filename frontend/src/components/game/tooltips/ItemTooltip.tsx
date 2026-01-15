import type { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { ITEMS, type ItemId } from "../../../util/Descriptions/Items";
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";

function ItemTooltip({
  children,
  item,
}: {
  children: ReactNode;
  item: ItemId;
}) {
  const itemData = ITEMS[item];
  const itemQuantity = useSelector((state: RootState) => state.invData[item]);

  const content = (
    <div className=" text-left max-w-90 overflow font-inter">
      <div
        className="font-semibold text-sm font-pixel"
        style={{ color: `var(--color-${itemData.textColor})` }}
      >
        <span aria-hidden className="mr-px font-inter">
          {itemData.icon}
        </span>
        {itemData.name}
      </div>

      <div className="text-greywhite text-xs my-0.5 whitespace-pre-wrap">
        {itemData.description}
      </div>
      <div className="text-greywhitedim italic font-medium font-inter">
        You have: {itemQuantity.toLocaleString()}
      </div>
    </div>
  );

  return (
    <>
      <Tooltip content={content} boxColor={itemData.boxColor}>
        {children}
      </Tooltip>
    </>
  );
}

export default ItemTooltip;
