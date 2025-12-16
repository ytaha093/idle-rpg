import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { setTraining } from "../../slices/PlayerDataSlice"

function AttributesBox() {

    const training = useSelector((state: RootState) => state.playerData.trainingAttribute)
    const attributeData = useSelector((state: RootState) => state.skillData.Attributes)
    type AttributeName = keyof typeof attributeData

    const dispatch = useDispatch()

    return (
        <div className="text-xs">
            {(Object.keys(attributeData) as AttributeName[]).map((attribute) => {
                return (
                    <div className="flex justify-between hover:cursor-pointer hover:bg-grey2 transition-all duration-100" style={{ color: training == attribute ? "var(--color-rsgreen)" : "" }} onClick={() => dispatch(setTraining(attribute))}>
                        <span>{attribute}: {training == attribute ? <span className="text-neutral-500 font-bold">(training)</span> : ""}</span>
                        <span>
                            {(attribute == "Accuracy") ? 50 + (attributeData[attribute] / 100) + "%" : ""}
                            {(attribute == "Dodge") ? (attributeData[attribute] / 100) + "%" : ""}
                            {!(["Accuracy", "Dodge"].includes(attribute)) ? attributeData[attribute] : ""}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default AttributesBox