import logo from "../assets/logo.png"
import button from "../assets/button.png"
import { chatIcon, clansIcon, marketIcon, herbloreIcon, jewelcraftingIcon, runecraftingIcon, quarryingIcon, woodcuttingIcon, miningIcon, dungioneeringIcon, battleIcon } from "../assets/icons.ts"
import { useState } from "react"
import AuthPopup from "../components/auth/AuthForm"

function Login() {
  const [activeForm, setActiveForm] = useState("")



  return (
    <>
      <AuthPopup form={activeForm} formSelector={(form: string) => setActiveForm(form)} />

      < div className=" max-w-[1250px] min-h-[calc(100dvh-28px)] px-16.5 m-auto max-[1250px]:px-1 max-[1250px]:max-w-[1126px] " >

        <img src={logo} alt="" className="w-[63%] mx-auto" />

        <div className=" text-center p-2 font-pixel text-lg font-medium">
          There are currently 67,420 players online!
        </div>

        <div className="flex justify-center gap-5 text-[1.8rem] font-semibold mb-11 mt-3 h-[150px]">
          <button className="relative hover:cursor-pointer" onClick={() => setActiveForm("login")}>
            <img src={button} alt="" className="h-full -z-1" />
            <span className=" rounded-md hover:bg-[#00000033] z-1 absolute inset-0 pb-1.5 flex justify-center items-center hover:underline">Login</span>
          </button>
          <button className="relative hover:cursor-pointer" onClick={() => setActiveForm("register")}>
            <img src={button} alt="" className="h-full" />
            <span className=" rounded-md hover:bg-[#00000033] z-1 absolute inset-0 pb-1.5 flex justify-center items-center hover:underline">Register</span>
            <div className="absolute inset-0 top-24 font-pixel text-[#FFEF60] text-[0.87rem] outline-text [word-spacing:-3px] ">no email required</div>
          </button>
        </div>

        <div className="bg-black border-2 border-[#382418] py-2 px-2.5 m-auto mb-2.5 w-[87%] rounded-xs">
          <div className=" underline underline-offset-4 text-[1.45rem]/6">Skilling&nbsp;&nbsp;&nbsp;</div>
          <div className="text-[1.1rem]/5 my-px">
            Battle through various areas and dungeons, level up skills, and obtaining valuable items as you progress...
          </div>
          <ul className="text-[1.1rem]/5.5 my-1.5 mx-0.5">
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={battleIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Battling</span>: Fight monsters, collecting dungeon keys and components to increase your power...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={dungioneeringIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Dungeoneering</span>: Make your way through dungeons to obtain loot from the chest at the end...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={miningIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Mining</span>: Gather metal for your clan, and collect gems to craft rings...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={woodcuttingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Woodcutting</span>: Gather wood for your clan, collecting sap to craft potions...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={quarryingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Quarrying</span>: Gather stone for your clan, collecting valuable stones to craft runes...</span></li>
          </ul>
          <div className=" underline underline-offset-4 text-[1.45rem] leading-6">Crafting&nbsp;&nbsp;&nbsp;</div>
          <div className="text-[1.1rem]/5 my-px">
            All items are crafted by players. Only the highest level crafters can make the highest level items. Choose your crafting skills, power up, and supply the items on the market.
          </div>
          <ul className="text-[1.1rem]/5.5 my-1.5 mx-0.5">
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={runecraftingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Runecrafting</span>: Craft runes to provide benefits in battling...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={jewelcraftingIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Jewelcrafting</span>: Craft rings to increase your power...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={herbloreIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Herblore</span>: Craft potions that boost resources, experience and more...</span></li>
          </ul>
          <div className=" underline underline-offset-4 text-[1.45rem] leading-6">Multiplayer&nbsp;&nbsp;&nbsp;</div>
          <div className="text-[1.1rem]/5 my-px">
            Talk with other players, team up in clans, and trade on the player market
          </div>
          <ul className="text-[1.1rem]/5.5 my-1.5 mx-0.5">
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={marketIcon} alt="" className="inline-block h-5 m-auto" /><span><span className="text-rsgreen">Market</span>: Buy and Sell items on the player market... </span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={clansIcon} alt="" className="inline-block h-5 m-auto" /><span><span className="text-rsgreen">Clans</span>: Team up with players, level up your clan, and more...</span></li>
            <li className="grid grid-cols-[0.34fr_10fr]"><img src={chatIcon} alt="" className="inline-block max-h-5 max-w-6 m-auto" /><span><span className="text-rsgreen">Chat</span>: Talk with other players...</span></li>
          </ul>
        </div>
      </div >
    </>
  )
}

export default Login
