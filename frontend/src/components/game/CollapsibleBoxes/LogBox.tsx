import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { clearLog } from "../../../slices/PlayerDataSlice";
import ItemTag from "../Tags/ItemTag";

function LogBox() {
  let log = useSelector((state: RootState) => state.playerData.log);
  const dispatch = useDispatch();

  return (
    <>
      {log.length == 0 && (
        <div>
          <div className="text-xs font-pixel">Your log is empty...</div>
        </div>
      )}
      {log.length != 0 && (
        <div className="flex flex-col">
          <div className=" max-h-50 overflow-y-scroll">
            {log.map((log, index) => {

              const attributeText = (log.type === "attribute" && (log.text == "Accuracy" || log.text == "Dodge")) ? "+0.01%" : "+1"

              return (
                <div className="text-[0.7rem]/3.5 text-left [word-spacing:-1px] flex items-center flex-wrap" key={`${log.time}-${index}`}>
                  <span className=" text-center text-neutral-500 text-[0.6rem] mr-0.5 tracking-tighter inline-block">
                    [{log.time}]
                  </span>
                  {log.type == "level" && (<span className="">Skill: {log.text} (<span className="text-rsgreen font-semibold">{log.text2}</span>)</span>)}
                  {log.type == "attribute" && (<span className="text-rsyellow">{attributeText} {log.text}</span>)}
                  {log.type == "item" && log.item && (<><span>{log.text}+{log.itemAmount?.toLocaleString()} </span><span className="leading-3"><ItemTag item={log.item} /></span></>)}
                </div>
              )
            })}
          </div>
          <div className="mt-1 text-xs hover:cursor-pointer text-[#7ae] hover:text-[#58c]" onClick={() => dispatch(clearLog())} >
            <span className="text-greywhite">[</span>Clear<span className="text-greywhite">]</span>
          </div>
        </div>
      )}
    </>
  );
}

export default LogBox