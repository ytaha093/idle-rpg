import type { ReactNode } from "react"
import Tooltip from "./Tooltip"
import { ATTRIBUTES, type AttributeId } from "../../../util/Descriptions/Attributes"

function SkillTooltip({ children, attribute }: { children: ReactNode, attribute: AttributeId }) {
  const attributeData = ATTRIBUTES[attribute]

  const content = (
    <div className=" text-left max-w-65 font-inter">
      <div className="text-sm font-semibold font-pixel">{attributeData.name}</div>
      <div className="flex flex-col gap-2">
        {attributeData.description.map((description) => {
          return <div>{description}</div>
        })}
      </div>
    </div>
  )

  return (
    <>
      <Tooltip content={content}>{children}</Tooltip>
    </>
  )
}

export default SkillTooltip
