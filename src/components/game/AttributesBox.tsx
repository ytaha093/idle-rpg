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
                    <div className="flex justify-between hover:cursor-pointer " style={{ color: training == attribute ? "var(--color-rsgreen)" : "" }} onClick={() => dispatch(setTraining(attribute))}>
                        <span>{attribute}: {training == attribute ? <span className="text-neutral-500 font-bold">(training)</span> : ""}</span>  <span>{attributeData[attribute]}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default AttributesBox