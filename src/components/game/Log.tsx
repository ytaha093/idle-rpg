import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { clearLog } from "../../slices/PlayerDataSlice"

function Log() {

    const log = useSelector((state: RootState) => state.playerData.log)
    const dispatch = useDispatch()

    return (
        <>
            {log.length == 0 && (
                <div>
                    <div className="text-sm font-pixel">Your log is empty...</div>
                </div>
            )}
            {log.length != 0 && (
                <div className="flex flex-col">
                    <div className=" max-h-60 overflow-y-scroll">
                        {log.map((item) => {
                            return (
                                <>
                                    <div className="text-xs text-left">
                                        <span className=" text-neutral-500 text-[0.6rem] inline-block w-12 mr-1">[{item.time}]</span>
                                        <span>{item.content}</span>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="mt-1 text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => dispatch(clearLog())}>
                        <span className="text-greywhite">[</span>Clear<span className="text-greywhite">]</span>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Log