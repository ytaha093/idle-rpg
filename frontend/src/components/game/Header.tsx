import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from "../../slices/AuthSlice"
import type { RootState } from "../../store"
import { refillEnergy, consumeEnergy, increaseBonus, log, resetPlayer } from "../../slices/PlayerDataSlice"
import settingsIcon from "../../assets/settings_icon.png"
import { addAttribute, addBattling } from "../../slices/SkillsDataSlice"
import ItemTag from "./Tags/ItemTag"
import { addItem } from "../../slices/inventorySlice"


function Header() {

    const playerData = useSelector((state: RootState) => state.playerData)
    const invData = useSelector((state: RootState) => state.invData)

    const dispatch = useDispatch()

    const [settings, setSettings] = useState(false)
    const [progress, setProgress] = useState<number>(100)
    const [activeAction, setActive] = useState(true)

    const currentEnergyRef = useRef<number>(playerData.currentEnergy);
    const settingTimer = useRef<number>(null);
    const actionTimer = useRef<number>(null);
    const trainingAttrRef = useRef(playerData.trainingAttribute);
    const bonusProgressRef = useRef<number>(playerData.bonusProgress);
    const bonusCapRef = useRef<number>(playerData.bonusCap);



    useEffect(() => {
        if (activeAction) {
            progressAction();
        }
        trainingAttrRef.current = playerData.trainingAttribute
        bonusProgressRef.current = playerData.bonusProgress
        bonusCapRef.current = playerData.bonusCap

    }, [activeAction, playerData.trainingAttribute, playerData.bonusProgress, playerData.bonusCap])


    function logout() {
        dispatch(resetPlayer())
        dispatch(logoutAction())
    }

    async function openSettings() {
        settings ? setSettings(false) : setSettings(true)
        if (settingTimer.current) clearTimeout(settingTimer.current)
        settingTimer.current = setTimeout(() => { setSettings(false) }, 5000)
    }


    async function resetActionCount() {
        if (progress == 0) actionTimer.current = null
        dispatch(refillEnergy())
        currentEnergyRef.current = playerData.maxEnergy
        setActive(true)
        // TODO: send request to server for server side energy update
    }

    async function progressAction() {
        const duration = 5500 // should be 5.5 sec note incase i forget while testing
        let currentProgress = 100
        let lastUpdate = 0

        const process = (time: number) => {
            if (currentEnergyRef.current > 0) {

                // set start time if unset, get current time, set last update time
                const currentTime = time;
                if (!actionTimer.current) actionTimer.current = currentTime

                // prevent state from updating more then 40 times a second to prevent excessive re-renders
                if ((time - lastUpdate) > 25 || currentProgress == 0) {
                    // move progress bar based on time
                    currentProgress = Math.max(100 - (((currentTime - actionTimer.current) / duration) * 100), 0)
                    setProgress(currentProgress)
                    lastUpdate = time

                }


                // when progress bar hits 0 if actions remain, reset timer
                if (currentProgress === 0 && currentEnergyRef.current > 1) {
                    // trigger on complete action
                    dispatch(addItem({ id: "Gold", amount: 24 }))
                    dispatch(addBattling(23))
                    if (Math.random() < 0.5) {
                        dispatch(addAttribute({ name: trainingAttrRef.current, value: 1 }))
                        dispatch(log({ type: "attribute", text: `+1 ${trainingAttrRef.current}` }))

                    }

                    dispatch(increaseBonus())
                    bonusProgressRef.current++
                    if (bonusProgressRef.current == bonusCapRef.current) {
                        const bonus = bonusCapRef.current * 15
                        dispatch(addItem({ id: "Gold", amount: bonus }))
                        dispatch(log({ type: "item", text: `Action Bonus: +${bonus}`, item: "Gold" }))

                    }


                    // reset timer
                    actionTimer.current = null
                    dispatch(consumeEnergy())
                    currentEnergyRef.current--
                    // when the last action is completed dont reset timer
                } else if (currentProgress === 0 && currentEnergyRef.current <= 1) {
                    // trigger on complete action
                    dispatch(addItem({ id: "Gold", amount: 24 }))
                    dispatch(addBattling(23))
                    if (Math.random() < 0.5) {
                        dispatch(addAttribute({ name: trainingAttrRef.current, value: 1 }))
                        dispatch(log({ type: "attribute", text: `+1 ${trainingAttrRef.current}` }))

                    }

                    dispatch(increaseBonus())
                    bonusProgressRef.current++
                    if (bonusProgressRef.current == bonusCapRef.current) {
                        const bonus = bonusCapRef.current * 15
                        dispatch(addItem({ id: "GreaterRuneOfTheWarlord", amount: bonus }))
                        dispatch(log({ type: "item", text: `Action Bonus: +${bonus}`, item: "GreaterRuneOfTheWarlord" }))

                    }


                    // reduce the display number but dont reset and stop animation
                    dispatch(consumeEnergy())
                    currentEnergyRef.current--
                    setActive(false)
                }
                requestAnimationFrame(process)
            }
        }
        requestAnimationFrame(process)
    }



    return (
        <>
            <div className="sticky z-10 top-0 w-full h-7 bg-grey1 border-b border-stone-700 px-3 flex justify-between text-sm ">
                <div data-section="currency" className="flex items-center">
                    <div className="mr-5 ">
                        <span className="mr-2"><ItemTag item={"Gold"} /></span>
                        <span>{invData.Gold}</span>
                    </div>
                    <div>
                        <span className="mr-2"><ItemTag item={"Credits"} /></span>
                        <span>{invData.Credits}</span>
                    </div>
                </div>


                <div data-section="progress bar" className="flex items-center w-1/2 p-[0.2rem]">
                    <div className={`w-full h-full bg-linear-0  ${playerData.currentEnergy != 0 ? "to-stone-900 from-grey4" : "to-red-950 from-red-900"} from-grey4 border border-grey3 relative cursor-pointer`} onClick={resetActionCount}>
                        <div id="meter" className={`w-full h-full bg-g bg-linear-0 to-[#392f23] from-[#5c4b38] transition-all ${progress > 99 ? "duration-0" : "duration-25"} ease-linear`} style={{ width: `${progress}%` }}></div>
                        <div className=" absolute inset-0 flex justify-center items-center font-pixel text-[0.8rem] ">Energy Remaining: {playerData.currentEnergy}</div>
                    </div>
                </div>


                <div data-section="options" className="flex items-center">
                    <div className="mr-5 hover:cursor-pointer">
                        <span className=" mr-1 ">Players Online:</span>
                        <span className="text-rsgreen ">126</span>
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

export default Header