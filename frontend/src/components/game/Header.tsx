import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { settingsIcon } from "../../assets/icons";
import ItemTag from "./Tags/ItemTag";
import { logoutUser } from "../../slices/thunks/authThunk";
import { executeAction, refillEnergy } from "../../slices/thunks/actionThunks";
import { consumeEnergy } from "../../slices/PlayerDataSlice";

function Header() {
  const playerData = useSelector((state: RootState) => state.playerData);
  const invData = useSelector((state: RootState) => state.invData);

  const dispatch = useDispatch<AppDispatch>()

  const [settings, setSettings] = useState(false);
  const [progress, setProgress] = useState<number>(100);

  const settingTimer = useRef<number | null>(null)
  const activeActionRef = useRef<{ action: string, options: string }>(playerData.activeAction)
  const currentEnergyRef = useRef<number>(playerData.currentEnergy)

  const duration = 5500 // 5.5s

  const intervalRef = useRef<number | null>(null)
  const lastActionTimeRef = useRef<number | null>(null)

  useEffect(() => {
    document.title = `[${playerData.currentEnergy}] Idle Quest`

    activeActionRef.current = playerData.activeAction
    currentEnergyRef.current = playerData.currentEnergy

    // make sure bar is full if no action active with energy remaining
    if (activeActionRef.current.action == "" && intervalRef.current == null && currentEnergyRef.current > 0) {
      setProgress(100)
    }

    // start action fuction if action is active and no interval started yet
    if (intervalRef.current === null && activeActionRef.current.action !== "" && currentEnergyRef.current > 0) {

      intervalRef.current = window.setInterval(() => {
        // if no time / time reset use current time and execute action
        if (lastActionTimeRef.current === null) {
          lastActionTimeRef.current = Date.now()
          dispatch(consumeEnergy())
        }

        // handle progress bar
        const now = Date.now()
        const elapsed = now - (lastActionTimeRef.current as number)
        const progress = 100 - (elapsed / duration * 100)
        setProgress(Math.max(0, Math.min(100, progress)))

        // when timer completes reset timer or stop interval if no energy or action
        if (progress <= 0) {
          lastActionTimeRef.current = null
          if (currentEnergyRef.current <= 0) {
            clearInterval(intervalRef.current as number)
            intervalRef.current = null
          } else if (activeActionRef.current.action == "") {
            clearInterval(intervalRef.current as number)
            intervalRef.current = null
            setProgress(100)
          }
        }

      }, 10) // update every 10ms
    }

  }, [playerData.activeAction, playerData.currentEnergy])


  async function openSettings() {
    settings ? setSettings(false) : setSettings(true);
    if (settingTimer.current) clearTimeout(settingTimer.current);
    settingTimer.current = setTimeout(() => { setSettings(false) }, 5000)
  }

  const playerOnline = 126;
  return (
    <>
      <div className="sticky z-10 top-0 w-full h-7 bg-grey1 border-b border-stone-700 px-3 flex justify-between text-sm ">
        <div data-section="currency" className="flex items-center">
          <div className="mr-5 ">
            <span className="mr-2">
              <ItemTag item={"Gold"} />
            </span>
            <span>{invData.Gold.toLocaleString()}</span>
          </div>
          <div>
            <span className="mr-2">
              <ItemTag item={"Credits"} />
            </span>
            <span>{invData.Credits.toLocaleString()}</span>
          </div>
        </div>

        <div data-section="progress bar" className="flex items-center w-1/2 p-[0.2rem]">
          <div className={`w-full h-full bg-linear-0  ${(playerData.currentEnergy != 0 || progress != 0) ? "to-stone-900 from-grey4" : "to-red-950 from-red-900"} from-grey4 border border-grey3 relative cursor-pointer`} onClick={() => dispatch(refillEnergy())}>
            <div id="meter" className={`w-full h-full bg-g bg-linear-0 to-[#392f23] from-[#5c4b38] transition-all duration-0`} style={{ width: `${progress}%` }}></div>
            <div className=" absolute inset-0 flex justify-center items-center font-pixel text-[0.8rem] ">
              Energy Remaining: {playerData.currentEnergy.toLocaleString()}
            </div>
          </div>
        </div>

        <div data-section="options" className="flex items-center">
          <div className="mr-5 hover:cursor-pointer">
            <span className=" mr-1 ">Players Online:</span>
            <span className="text-rsgreen ">
              {playerOnline.toLocaleString()}
            </span>
          </div>
          <img src={settingsIcon} alt="Settings Icon" className="cursor-pointer" onClick={openSettings} />

          {settings == true && (
            <div className="absolute right-0 top-7 w-32 bg-stone-900 flex-col border border-t-0 border-stone-700">
              <button className="w-full hover:bg-stone-700 p-1 border-b border-stone-700 cursor-pointer">
                Guide / Help
              </button>
              <button className="w-full hover:bg-stone-700 p-1 border-b border-stone-700 cursor-pointer">
                Settings
              </button>
              <button className="w-full hover:bg-stone-700 p-1 cursor-pointer" onClick={() => dispatch(logoutUser())}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
