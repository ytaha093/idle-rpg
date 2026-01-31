import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { settingsIcon } from "../../assets/icons";
import ItemTag from "./Tags/ItemTag";
import { logoutUser } from "../../slices/thunks/authThunk";
import { executeAction, refillEnergy } from "../../slices/thunks/actionThunks";

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
  const animationFrameRef = useRef<number | null>(null)
  const lastActionTimeRef = useRef<number | null>(null)

  useEffect(() => {
    document.title = `[${playerData.currentEnergy}] Idle Quest`

    activeActionRef.current = playerData.activeAction
    currentEnergyRef.current = playerData.currentEnergy

    // make sure bar is full if no action active with energy remaining
    if (activeActionRef.current.action == "" && intervalRef.current == null && currentEnergyRef.current > 0) {
      setProgress(100)
    }

    // start action bar fuction if action is active and no interval started yet
    if (intervalRef.current === null && activeActionRef.current.action !== "" && currentEnergyRef.current > 0) {

      // The timer has 2 functions, the first is just for the action bar animation, the second is to trigger the action event
      // both use lastActionTimeRef to track time for 1 src of truth


      // start animation function
      animationFrameRef.current = requestAnimationFrame(step)

      function step(timestamp: number) {
        // if no timer keep looping till timer set by interval function
        if (lastActionTimeRef.current != null) {

          // moves the progress bar
          const elapsed = Date.now() - lastActionTimeRef.current
          const progress = 100 - (elapsed / duration * 100)
          setProgress(progress)


          // when done reset the timer
          if (progress <= 0) {
            // if stop action selected or out of energy, then stop once bar empty.
            if (activeActionRef.current.action === "") {
              cancelAnimationFrame(animationFrameRef.current as number)
              animationFrameRef.current = null
              console.log("action stopped")
              setProgress(100)
              return
            } else if (currentEnergyRef.current <= 0) {
              cancelAnimationFrame(animationFrameRef.current as number)
              animationFrameRef.current = null
              console.log("action stopped")
              setProgress(0)
              return
            }
          }
        }
        animationFrameRef.current = requestAnimationFrame(step)
      }

      // timer for action event trigger
      intervalRef.current = window.setInterval(() => {
        // if no time / time reset use current time and execute action
        if (lastActionTimeRef.current === null) {
          lastActionTimeRef.current = Date.now()
          dispatch(executeAction(activeActionRef.current))
        }

        // timer
        const now = Date.now()
        const elapsed = now - (lastActionTimeRef.current as number)

        // when timer completes reset timer or stop interval if no energy or action
        if (elapsed >= duration) {
          lastActionTimeRef.current = null
          if (currentEnergyRef.current <= 0) {
            clearInterval(intervalRef.current as number)
            intervalRef.current = null
            setProgress(0)
          } else if (activeActionRef.current.action == "") {
            clearInterval(intervalRef.current as number)
            intervalRef.current = null
            setProgress(100)
          }
        }
      }, 25)
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
