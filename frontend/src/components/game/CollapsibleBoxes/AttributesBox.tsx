import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { setAttribute, setTraining } from "../../../slices/PlayerDataSlice";
import AttributesTooltip from "../tooltips/AttributesTooltip";
import type { AttributeName } from "../../../slices/SkillsDataSlice";

function AttributesBox() {
  const training = useSelector((state: RootState) => state.playerData.trainingAttribute)
  const attributeData = useSelector((state: RootState) => state.skillData.Attributes)

  const dispatch = useDispatch<AppDispatch>();

  function handleSetTraining(newAttribute: AttributeName) {
    const oldAttribute = training;
    dispatch(setAttribute({ newAttribute, oldAttribute }));
  }

  return (
    <div className="text-xs">
      {(Object.keys(attributeData) as AttributeName[]).map((attribute) => {
        const value = attributeData[attribute]; //Number value of attribute

        return (
          <AttributesTooltip attribute={attribute} key={attribute}>
            <div className="flex justify-between hover:cursor-pointer hover:bg-grey2 transition-all duration-100"
              style={{ color: training == attribute ? "var(--color-rsgreen)" : "", }} onClick={() => handleSetTraining(attribute)}>
              <span>
                {attribute}:{" "}
                {training == attribute && (
                  <span className="text-neutral-500 font-bold">(training)</span>
                )}
              </span>
              <span>
                {attribute == "Accuracy" && 50 + value / 100 + "%"}
                {attribute == "Dodge" && value / 100 + "%"}
                {!["Accuracy", "Dodge"].includes(attribute) &&
                  value.toLocaleString()}
              </span>
            </div>
          </AttributesTooltip>
        );
      })}
    </div>
  );
}

export default AttributesBox;
