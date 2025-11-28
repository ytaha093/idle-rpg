import { useDispatch } from "react-redux"
import settingsIcon from "../assets/settings_icon.png"
import { logoutAction } from "../slices/AuthSlice"
import { useRef, useState } from "react"


function Dashboard() {

  const [settings, setSettings] = useState(false)
  const dispatch = useDispatch()
  const closeTimer = useRef<number>(null);


  function logout() {
    dispatch(logoutAction())
  }

  async function openSettings() {
    settings ? setSettings(false) : setSettings(true)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => { setSettings(false) }, 5000)
  }

  return (
    <>
      <div className="fixed w-full h-7 bg-grey1 border-b border-stone-700 px-3 flex justify-between text-sm ">
        <div data-section="currency" className="flex items-center">
          <div className="mr-5">
            <span className=" text-currency mr-2">[Gold]</span>
            <span>24,100</span>
          </div>
          <div>
            <span className=" text-currency mr-2">[Credits]</span>
            <span>72</span>
          </div>
        </div>


        <div data-section="progress bar" className="flex items-center w-3/5 p-[0.2rem]">
          <div className="w-full h-full bg-g bg-linear-0 to-stone-900 from-grey4 border border-grey3 relative">
            <div className="w-full h-full bg-g bg-linear-0 to-[#3d3225] from-[#574735]"></div>
            <div className=" absolute inset-0 flex justify-center items-center font-pixel ">Energy Remaining: 300</div>
          </div>
        </div>


        <div data-section="options" className="flex items-center">
          <div className="mr-4">
            <span className=" mr-1">Players Online:</span>
            <span className="text-rsgreen">126</span>
          </div>
          <img src={settingsIcon} alt="" className="cursor-pointer" onClick={openSettings} />

          {settings == true &&
            < div className="absolute right-0 top-7 w-32 bg-stone-900 flex-col border border-t-0 border-stone-700">
              <button className="w-full hover:bg-stone-700 p-1 border-b border-stone-700 cursor-pointer">Guide / Help</button>
              <button className="w-full hover:bg-stone-700 p-1 border-b border-stone-700 cursor-pointer">Settings</button>
              <button className="w-full hover:bg-stone-700 p-1 cursor-pointer" onClick={logout}>Logout</button>
            </div>
          }
        </div>
      </div >
    </>
  )
}

export default Dashboard
